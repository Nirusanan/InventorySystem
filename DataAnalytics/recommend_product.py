import pandas as pd
import numpy as np
import pandas as pd
from db_connector import DB
from itertools import permutations


def recommend_product(pitems):
    db = DB()
    db.association_rules_retrive()
    rules_df = pd.read_csv('rules.csv')

    previous_item = rules_df['PreviousItems'].values
    predict_item = rules_df['PredictedItems'].values
    support_values = rules_df['Support'].values

    p = permutations(pitems.split(','))

    # Print the obtained permutations
    for j in list(p):
        pitem_cmb = ','.join(j)
        # print(pitem_cmb)

        result = {}

        for i in range(0, len(previous_item)):
            if previous_item[i] == pitem_cmb:
                # print(predict_item[i])
                # print(support_values[i])
                result[predict_item[i]] = support_values[i]

        if len(result) != 0:
            final_pid = sorted(result.items(), key=lambda x: x[1])[-1][0]

            print(final_pid)

            if len(final_pid) == 0:
                pname = db.product_id_name_get(final_pid)[0][0]

            else:
                multi_final_pid = final_pid.split(',')
                pname = ''
                for x in multi_final_pid:
                    pname = pname + str(db.product_id_name_get(x)[0][0]) + ", "


            return pname



    return None


# print(recommend_product('2,4'))
