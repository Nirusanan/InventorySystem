import random
import pandas as pd
from db_connector import DB
customers = [1, 3, 4, 5, 7, 8, 9, 10]
product = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

dates = pd.date_range('1/1/2021', periods=365).to_list()

pickDates = [3, 4, 7, 5]

datesCount = random.choice(pickDates)

pickpurchase = [1, 2, 4, 5]

quty = [1, 2, 3]
unitprice = {1: 130, 2: 100, 3: 800, 4: 140, 5: 120, 6: 30, 7: 32, 8: 780, 9: 220, 10: 80}

db = DB()

for u in customers:
    print("CustomerId:", u)

    temdate = []
    for i in range(0, datesCount):
        temdate.append(random.choice(dates))

    uniquedates = list(set(temdate))
    uniquedates.sort()
    # print(uniquedates)

    for i in uniquedates:
        # print(i)
        countpurchase = random.choice(pickpurchase)
        # print(countpurchase)

        temproID = []
        for j in range(0, countpurchase):
            temproID.append(random.choice(product))

        productlist = list(set(temproID))
        # print(productlist)

        for k in productlist:
            print(i, k, unitprice[k], random.choice(quty))
            db.invoice_push([k,u,random.choice(quty), unitprice[k], i])
            # print(unitprice[k])
            # print("Quantity:", random.choice(quty))

        print()


# for i in range(0, datesCount):
#     print(random.choice(dates))
#
#     countpurchase = random.choice(pickpurchase)
#     # print(countpurchase)
#
#     temproID = []
#     for j in range(0, countpurchase):
#         temproID.append(random.choice(product))
#
#     productlist = list(set(temproID))
#     print(productlist)
#
#     for k in productlist:
#         print(unitprice[k])
