import pyodbc
import csv



class DB:
    def __init__(self):
        # Connect to the database
        connection = pyodbc.connect(r'DRIVER={ODBC Driver 17 for SQL Server};'
                                    r'SERVER=localhost;'
                                    r'DATABASE=InventorySystem;'
                                    r'UID=nirau;'
                                    r'PWD=niru3;'
                                    r'Trusted_Connection=yes')

        # Query the Database
        self.cursor = connection.cursor()

    def retrive_invoice(self):
        file_name = "invoice.csv"
        file = open(file_name, 'w', newline='')
        csv_writer = csv.writer(file)

        tables = self.cursor.execute("SELECT * FROM [dbo].[Invoice]")

        columns = (column[0] for column in tables.description)
        csv_writer.writerow(columns)

        tables = tables.fetchall()
        for row in tables:
            csv_writer.writerow(row)

    def customer_data_retrive(self):
        pass

    def product_data_retrive(self):
        pass

    def pname_to_pid(self, name):
        tables = self.cursor.execute("select Id from [dbo].[Product] where Description=?", name)
        tables = tables.fetchall()
        if len(tables) > 0:
            return tables[0][0]
        else:
            return None

    def customer_segment_push(self, data):
        for key, value in data.items():
            # q = self.cursor.execute("update [dbo].[Customer] set CustomerSegment="+str(value)+ "where Id=1")
            q = self.cursor.execute('UPDATE [dbo].[Customer] set Segment=? where Id=?', (value, key))
            self.cursor.commit()

    def customer_id_get(self):
        tables = self.cursor.execute("select Id from [dbo].[Customer]")
        tables = tables.fetchall()
        customer_id = []
        for row in tables:
            customer_id.append(row[0])
        return customer_id

    def product_id_get(self):
        pass

    def invoice_push(self, record):
        tables = self.cursor.execute("insert into [dbo].[Invoice] values(?, ?, ?, ?, ?)", record)
        self.cursor.commit()

    def invoice_delete(self):
        tables = self.cursor.execute("delete from [dbo].[Invoice]")
        self.cursor.commit()

    def association_rules_push(self, df):
        tables = self.cursor.execute("delete from [dbo].[Rules]")
        self.cursor.commit()
        for index, row in df.iterrows():
            self.cursor.execute("INSERT INTO [dbo].[Rules] VALUES (?,?,?,?,?)", row['PreviousItems'],
                                row['PredictedItems'], row['Support'], row['Confidence'], row['Lift'])
            self.cursor.commit()

    def association_rules_retrive(self):
        file_name = "rules.csv"
        file = open(file_name, 'w', newline='')
        csv_writer = csv.writer(file)

        tables = self.cursor.execute("SELECT * FROM [dbo].[Rules]")

        columns = (column[0] for column in tables.description)
        csv_writer.writerow(columns)

        tables = tables.fetchall()
        for row in tables:
            csv_writer.writerow(row)


    def product_id_name_get(self, pid):
        tables = self.cursor.execute("select Description from [dbo].[Product] where Id=?", pid)
        tables = tables.fetchall()
        return tables


# if __name__ == '__main__':
#     db = DB()
#     print(db.association_rules_retrive())
