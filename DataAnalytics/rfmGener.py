import pandas as pd
import datetime as dt
from db_connector import DB


# Arguments (x = value, p = recency, monetary_value, frequency, d = quartiles dict)
def RScore(x, p, d):
    if x <= d[p][0.25]:
        return 4
    elif x <= d[p][0.50]:
        return 3
    elif x <= d[p][0.75]:
        return 2
    else:
        return 1


# Arguments (x = value, p = recency, monetary_value, frequency, k = quartiles dict)
def FMScore(x, p, d):
    if x <= d[p][0.25]:
        return 1
    elif x <= d[p][0.50]:
        return 2
    elif x <= d[p][0.75]:
        return 3
    else:
        return 4


def rfm_generater():
    try:
        db = DB()
        db.retrive_invoice()
        cust_id= db.customer_id_get()

        df = pd.read_csv('invoice.csv')
        recency = {'CustomerId': [], 'LastDate': []}
        for i in cust_id:
            recency['CustomerId'].append(i)
            recency['LastDate'].append(df[df['CustomerId'] == i]['Date'].max())

        recency_df = pd.DataFrame(recency)

        recency_df['LastDate'] = pd.to_datetime(recency_df['LastDate'])

        today = dt.datetime.today()

        recency_df['Recency'] = recency_df['LastDate'].apply(lambda x: (today - x).days)

        a = df[df['CustomerId'] == 1].groupby(by=['Date'], as_index=False)['InvoiceNumber'].count()

        frequency = {'CustomerId': [], 'Frequency': []}
        for i in cust_id:
            frequency['CustomerId'].append(i)
            a = df[df['CustomerId'] == i].groupby(by=['Date'], as_index=False)['InvoiceNumber'].count()
            fre = a['InvoiceNumber'].sum()
            frequency['Frequency'].append(fre)

        frequency_df = pd.DataFrame(frequency)

        monetry = {'CustomerId': [], 'Monetry': []}
        for i in cust_id:
            monetry['CustomerId'].append(i)
            b = df[df['CustomerId'] == i]
            b['Total'] = b['Quantity'] * b['Price']
            tot = b['Total'].sum()
            monetry['Monetry'].append(tot)

        monetry_df = pd.DataFrame(monetry)

        temp_df = recency_df.merge(frequency_df, on='CustomerId')
        rfm_df = temp_df.merge(monetry_df, on='CustomerId')
        rfm_df = rfm_df.drop('LastDate', axis=1)
        rfm_df.set_index('CustomerId', inplace=True)

        quantiles = rfm_df.quantile(q=[0.25, 0.5, 0.75])

        rfm_segmentation = rfm_df
        rfm_segmentation['R_Quartile'] = rfm_segmentation['Recency'].apply(RScore, args=('Recency', quantiles,))
        rfm_segmentation['F_Quartile'] = rfm_segmentation['Frequency'].apply(FMScore, args=('Frequency', quantiles,))
        rfm_segmentation['M_Quartile'] = rfm_segmentation['Monetry'].apply(FMScore, args=('Monetry', quantiles,))

        rfm_segmentation['RFMScore'] = rfm_segmentation.M_Quartile.map(str) \
                                       + rfm_segmentation.R_Quartile.map(str) \
                                       + rfm_segmentation.F_Quartile.map(str)

        rfm_segmentation['RFM'] = rfm_segmentation['RFMScore'].apply(
            lambda x: 'H' if x > '400' else ('M' if x > '200' else 'L'))

        db.customer_segment_push(rfm_segmentation['RFM'].to_dict())

        return rfm_segmentation


    except Exception as e:
        return e


# if __name__ == '__main__':
#     print(rfm_generater())