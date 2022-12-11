import pandas as pd
import datetime as dt
from db_connector import DB


def RScore(x, p, d):
    if x <= d[p][0.25]:
        return 4
    elif x <= d[p][0.50]:
        return 3
    elif x <= d[p][0.75]:
        return 2
    else:
        return 1


def FMScore(x, p, d):
    if x <= d[p][0.25]:
        return 1
    elif x <= d[p][0.50]:
        return 2
    elif x <= d[p][0.75]:
        return 3
    else:
        return 4


def rfm_generator():
    try:
        db = DB()
        df = db.retrive_invoice()
        cust_id = db.customer_id_get()

        # Recency
        recency = {'CustomerId': [], 'LastDate': []}
        for i in cust_id:
            recency['CustomerId'].append(i)
            recency['LastDate'].append(df[df['CustomerId'] == i]['Date'].max())

        recency_df = pd.DataFrame(recency)
        recency_df['LastDate'] = pd.to_datetime(recency_df['LastDate'])
        today = dt.datetime.today()
        recency_df['Recency'] = recency_df['LastDate'].apply(lambda x: (today - x).days)

        # Frequency
        frequency = {'CustomerId': [], 'Frequency': []}
        for i in cust_id:
            frequency['CustomerId'].append(i)
            count_df = df[df['CustomerId'] == i].groupby(by=['Date'], as_index=False)['InvoiceNumber'].count()
            fre = count_df.shape[0]
            frequency['Frequency'].append(fre)

        frequency_df = pd.DataFrame(frequency)

        # Monetary
        monetry = {'CustomerId': [], 'Monetry': []}
        for i in cust_id:
            monetry['CustomerId'].append(i)
            cus_df = df[df['CustomerId'] == i]
            cus_df['Total_amount'] = cus_df['Quantity'] * cus_df['Price']
            tot = cus_df['Total_amount'].sum()
            monetry['Monetry'].append(tot)

        monetry_df = pd.DataFrame(monetry)

        # Merge all R,F,M data frame
        rfm_df = recency_df.merge(frequency_df, on='CustomerId')
        rfm_df = rfm_df.merge(monetry_df, on='CustomerId')
        rfm_df = rfm_df.drop('LastDate', axis=1)
        rfm_df.set_index('CustomerId', inplace=True)

        # Scoring
        quantiles = rfm_df.quantile(q=[0.25, 0.5, 0.75])
        rfm_segmentation = rfm_df
        rfm_segmentation['R_Quartile'] = rfm_segmentation['Recency'].apply(RScore, args=('Recency', quantiles,))
        rfm_segmentation['F_Quartile'] = rfm_segmentation['Frequency'].apply(FMScore, args=('Frequency', quantiles,))
        rfm_segmentation['M_Quartile'] = rfm_segmentation['Monetry'].apply(FMScore, args=('Monetry', quantiles,))

        # segment string concat as one
        rfm_segmentation['RFMScore'] = rfm_segmentation.M_Quartile.map(str) \
                                       + rfm_segmentation.R_Quartile.map(str) \
                                       + rfm_segmentation.F_Quartile.map(str)

        # put H,M,L
        rfm_segmentation['RFM'] = rfm_segmentation['RFMScore'].apply(
            lambda x: 'H' if x > '400' else ('M' if x > '200' else 'L'))

        db.customer_segment_push(rfm_segmentation['RFM'].to_dict())

        return rfm_segmentation

    except Exception as e:
        return e
