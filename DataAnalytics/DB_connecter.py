import pyodbc

# MSsql database connect
conn = pyodbc.connect(
    r'DRIVER={ODBC Driver 17 for SQL Server};'
    r'SERVER=localhost;'
    r'DATABASE=InventerySystem;'
    r'UID=niru;'
    r'PWD=1234'
    )

# MSsql database cursor
cursor = conn.cursor()


# # MSsql database execute
# cursor.execute("select top 10 * from [dbo].[data]")
#
# # MSsql database fetchall
# rows = cursor.fetchall()
#
# print(rows)

import pandas as pd

df = pd.read_csv('data.csv',encoding = "ISO-8859-1", engine='python')




for index, row in df.iterrows():
    cursor.execute("INSERT INTO [dbo].[Transcation] values (?,?,?,?,?,?,?,?)",
                   row['InvoiceNo'], row['StockCode'], row['Description'],
                  row['Quantity'], row['InvoiceDate'], row['UnitPrice'],
                  row['CustomerID'], row['Country']
                  )
    conn.commit()
    print("Updating.. ",index)