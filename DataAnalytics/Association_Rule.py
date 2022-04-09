import numpy as np
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
from db_connector import DB


def transaction_matrix_create(df):
    df['Date'] = pd.to_datetime(df['Date'])
    df_grouped = df.groupby(['Date', 'CustomerId'])['ProductId'].apply(list).reset_index()

    product_list = []
    for i in df_grouped['ProductId'].values:
        product_list.append(i)

    te = TransactionEncoder()
    te_ary = te.fit(product_list).transform(product_list)

    df = pd.DataFrame(te_ary, columns=te.columns_)

    return df


def association_rules_generation(df):
    # get 4% frequent support items
    res = apriori(df, min_support=0.04, use_colnames=True)

    rules = association_rules(res, metric="confidence", min_threshold=0.002)

    rules = rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']]
    rules.rename(columns={'antecedents': 'PreviousItems', 'consequents': 'PredictedItems', 'support': 'Support',
                          'confidence': 'Confidence', 'lift': 'Lift'}, inplace=True)
    rules.reset_index(drop=True, inplace=True)

    rules['PreviousItems'] = rules['PreviousItems'].apply(lambda x: ','.join(str(e) for e in x))
    rules['PredictedItems'] = rules['PredictedItems'].apply(lambda x: ','.join(str(e) for e in x))

    return rules


if __name__ == "__main__":
    db = DB()
    db.retrive_invoice()
    df = pd.read_csv("invoice.csv")
    print(df.head())

    trs_df = transaction_matrix_create(df)

    rules = association_rules_generation(trs_df)
    print(rules)

    db.association_rules_push(rules)
