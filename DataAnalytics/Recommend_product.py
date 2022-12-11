import numpy as np
import pandas as pd
from db_connector import DB
from itertools import permutations


def find_satisfy_rules(plist):
    db = DB()
    rules_df = db.association_rules_retrive()
    previous_item = rules_df['PreviousItems'].values
    predict_item = rules_df['PredictedItems'].values
    support_values = rules_df['Support'].values

    index = 0
    for i in previous_item:
        if plist == i.split(','):
            return predict_item[index]
        index += 1
    return None


def recommend_product(pitems):
    db = DB()
    p = permutations(pitems.split(','))

    res = []
    for j in p:
        recommeded_product = find_satisfy_rules(list(j))
        res.append(recommeded_product)

    if not all(x is None for x in res):
        prod_id = [x for x in res if x != None][0]
        pname = db.product_id_name_get(prod_id)[0][0]
        return pname
    else:
        return None
