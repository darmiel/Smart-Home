import sqlite3

try:
    sqliteConnection = sqlite3.connect('users.db')
    cursor = sqliteConnection.cursor()
    print("Successfully Connected to SQLite")

    sqlite_insert_query = "INSERT INTO wine (name, year, color, grape, country, taste, available, row, column) VALUES ('RITMO DE LA VIDA', 2020, 'red','Tempranillo', 'spain', 'semi-dry', 'yes', 2, 7)"

    count = cursor.execute(sqlite_insert_query)
    sqliteConnection.commit()
    print("Record inserted successfully into SqliteDb_developers table ", cursor.rowcount)
    cursor.close()

except sqlite3.Error as error:
    print("Failed to insert data into sqlite table", error)
finally:
    if sqliteConnection:
        sqliteConnection.close()
        print("The SQLite connection is closed")
