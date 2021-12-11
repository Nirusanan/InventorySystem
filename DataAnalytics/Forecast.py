import datetime

import numpy as np
import pandas as pd
from darts import TimeSeries
from darts.models import RNNModel
from darts.dataprocessing.transformers import Scaler
from darts.metrics import mape
import matplotlib.pyplot as plt

timeseries_data = [1, 4, 3, 16, 5, 36, 49, 8, 81, 10, 121, 12, 169, 14, 225, 16, 289, 18, 361, 20, 441, 22, 529, 24,
                   625]


def create_date_list(start_date, end_date):
    date_list = []
    start_date = datetime.datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.datetime.strptime(end_date, "%Y-%m-%d")
    while start_date <= end_date:
        date_list.append(start_date.strftime("%Y-%m-%d"))
        start_date += datetime.timedelta(days=1)
    return date_list


date = create_date_list('2021-01-01', '2021-01-25')
df = pd.DataFrame({'Date': date, 'Values': timeseries_data})

series = TimeSeries.from_dataframe(df, 'Date', 'Values')

series.plot()
plt.show()

train, val = series.split_after(pd.Timestamp('2021-01-20'))

# Normalize the time series (note: we avoid fitting the transformer on the validation set)
transformer = Scaler()
train_transformed = transformer.fit_transform(train)
val_transformed = transformer.transform(val)
series_transformed = transformer.transform(series)

my_model = RNNModel(
    model='LSTM',
    hidden_dim=20,
    dropout=0,
    batch_size=4,
    n_epochs=2000,
    optimizer_kwargs={'lr': 1e-3},
    model_name='Air_RNN',
    log_tensorboard=True,
    random_state=42,
    training_length=5,
    input_chunk_length=4,
    force_reset=True
)

my_model.fit(train_transformed,
             verbose=True)

predicted = my_model.predict(n=len(val_transformed))

print(predicted)

series_transformed.plot(label='actual')
predicted.plot(label='forecast')
plt.title('MAPE: {:.2f}%'.format(mape(predicted, val_transformed)))
plt.legend()
plt.show()