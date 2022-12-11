import pandas as pd
import numpy as np
import torch.nn as nn
import torch
from sklearn.preprocessing import MinMaxScaler
from torch.autograd import Variable
from db_connector import DB


def sliding_windows(data, seq_length):
    x = []
    y = []
    for i in range(len(data) - seq_length):
        _x = data[i:(i + seq_length)]
        _y = data[i + seq_length]
        x.append(_x)
        y.append(_y)

    return np.array(x), np.array(y)


torch.manual_seed(0)


class LSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes, num_layers):
        super().__init__()
        self.num_classes = num_classes  # output size
        self.num_layers = num_layers  # number of recurrent layers in the lstm
        self.input_size = input_size  # input size
        self.hidden_size = hidden_size  # neurons in each lstm layer
        # LSTM layer
        self.lstm = nn.LSTM(input_size=input_size, hidden_size=hidden_size, num_layers=num_layers, batch_first=True,
                            dropout=0.2)  # lstm
        self.fc_1 = nn.Linear(hidden_size, 128)  # fully connected
        self.fc_2 = nn.Linear(128, num_classes)  # fully connected last layer
        self.relu = nn.ReLU()

    def forward(self, x):
        # hidden state
        h_0 = Variable(torch.zeros(self.num_layers, x.size(0), self.hidden_size))
        # cell state
        c_0 = Variable(torch.zeros(self.num_layers, x.size(0), self.hidden_size))
        # propagate input through LSTM
        output, (hn, cn) = self.lstm(x, (h_0, c_0))  # (input, hidden, and internal state)
        hn = hn.view(-1, self.hidden_size)  # reshaping the data for Dense layer next
        out = self.relu(hn)
        out = self.fc_1(out)  # first dense
        out = self.relu(out)  # relu
        out = self.fc_2(out)  # final output
        return out


def forecast(proid, nmonth):
    db = DB()
    df = db.retrive_invoice()
    print(df.head())

    prod_df = df[df['ProductId'] == proid]
    prod_df = prod_df.sort_values('Date')
    prod_df['Date'] = pd.to_datetime(prod_df['Date'])

    prod_df_month_group = prod_df.groupby(pd.Grouper(key='Date', freq='M')).sum()
    scaler = MinMaxScaler()
    series = scaler.fit_transform(np.expand_dims(prod_df_month_group['Quantity'].values, axis=1))

    x, y = sliding_windows(series, 4)

    lstm = LSTM(1, 100, 1, 1)
    criterion = torch.nn.MSELoss()
    optimizer = torch.optim.Adam(lstm.parameters(), lr=0.001)

    dataX = Variable(torch.Tensor(x))
    dataY = Variable(torch.Tensor(y))

    # Train
    for epoch in range(500):
        optimizer.zero_grad()
        outputs = lstm(dataX)
        loss = criterion(outputs, dataY)
        loss.backward()
        optimizer.step()
        if epoch % 100 == 0:
            print("Epoch: %d, loss: %1.5f" % (epoch, loss.item()))

    res = []
    data = series.tolist()

    for i in range(0, nmonth):
        test = torch.Tensor(np.array(data[-4:]))

        predict = lstm(test.unsqueeze(0)).data.numpy()
        res.append(predict.item())

        data.append(predict.tolist()[0])

    result = np.array(res)
    final = scaler.inverse_transform(np.expand_dims(result, axis=1))
    output = np.squeeze(final, axis=1).tolist()

    output = list(map(lambda x: round(x), output))
    print("result", output)
    output = [abs(x) for x in output]
    print("result1", output)

    return prod_df_month_group['Quantity'].values.tolist(), output, prod_df_month_group.index.tolist()


if __name__ == '__main__':
    a, b, c = forecast(1, 3)
    print(a)
    print(b)
    print(c)
