import pyodbc
import csv
import pandas as pd


class DB:
    def __init__(self):
        # Connect to the database
        self.connection = pyodbc.connect(r'DRIVER={ODBC Driver 17 for SQL Server};'
                                         r'SERVER=localhost;'
                                         r'DATABASE=InventorySystem;'
                                         r'UID=nirau;'
                                         r'PWD=niru3;'
                                         r'Trusted_Connection=yes')

        self.cursor = self.connection.cursor()

    def retrive_invoice(self):
        df = pd.read_sql_query("select * from [dbo].[Invoice]", self.connection)
        return df

    def pname_to_pid(self, name):
        tables = self.cursor.execute("select Id from [dbo].[Product] where Description=?", name)
        tables = tables.fetchall()
        if len(tables) > 0:
            return tables[0][0]
        else:
            return None

    def customer_segment_push(self, data):
        for key, value in data.items():
            q = self.cursor.execute('UPDATE [dbo].[Customer] set Segment=? where Id=?', (value, key))
            self.cursor.commit()

    def customer_id_get(self):
        tables = self.cursor.execute("select Id from [dbo].[Customer]")
        tables = tables.fetchall()
        customer_id = []
        for row in tables:
            customer_id.append(row[0])
        return customer_id

    def association_rules_push(self, df):
        tables = self.cursor.execute("delete from [dbo].[Rules]")
        self.cursor.commit()
        for index, row in df.iterrows():
            self.cursor.execute("INSERT INTO [dbo].[Rules] VALUES (?,?,?,?,?)", row['PreviousItems'],
                                row['PredictedItems'], row['Support'], row['Confidence'], row['Lift'])
            self.cursor.commit()

    def association_rules_retrive(self):
        df = pd.read_sql_query("SELECT * FROM [dbo].[Rules]", self.connection)
        return df

    def product_id_name_get(self, pid):
        tables = self.cursor.execute("select Description from [dbo].[Product] where Id=?", pid)
        tables = tables.fetchall()
        return tables
