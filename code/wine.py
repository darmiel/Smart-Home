import sqlite3
from flask import Blueprint, render_template, session,abort


def create_wine():

#Connecting to sqlite
    conn = sqlite3.connect('users.db')

#Creating a cursor object using the cursor() method
    cursor = conn.cursor()

#Creating table as per requirement
    sql ='''CREATE TABLE IF NOT EXISTS wine(
       name CHAR(100) NOT NULL,
       year INT,
       color CHAR(10),
       grape CHAR(50),
       country CHAR(50),
       taste CHAR(20),
       rating INT,
       available CHAR(3),
       row INT,
       column INT
     )'''
    cursor.execute(sql)

# Commit your changes in the database
    conn.commit()

#Closing the connection
    conn.close()


wine = Blueprint('wine',__name__)

create_wine()

name = []
year = []
color = []
grape  = []
country = []
taste = []
rating = []
available = []
rowno = []
column = []

def nested_list():
    nestlist = [name, year, color, grape, country, taste, rating, available, rowno, column]
    return(nestlist)

@wine.route('/wine', methods=['GET'])
def dropdown():
    return render_template('wine.html', winelist=nested_list())

def read_wine():
    try:
       sqliteConnection = sqlite3.connect('users.db')
       cursor = sqliteConnection.cursor()

       sqlite_select_query = """SELECT * from wine"""
       cursor.execute(sqlite_select_query)
       records = cursor.fetchall()

       for row in records:
           name.append(row[0])
           year.append(row[1])
           color.append(row[2])
           grape.append(row[3])
           country.append(row[4])
           taste.append(row[5])
           rating.append(row[6])
           available.append(row[7])
           rowno.append(row[8])
           column.append(row[9])

       cursor.close()

    except sqlite3.Error as error:
       print("Failed to read data from sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()

def select_wine(selected_data):
    names = ['name', 'year', 'color', 'grape', 'country', 'taste', 'rating', 'available', 'rowno', 'column']
    statement = []
    for i in range(0, len(names)):
        if selected_data[i] != '':
            selected_data[i] = f"'{selected_data[i]}'"
            cond = names[i] + '=' + selected_data[i] + ' AND'
            statement.append(cond)

    statement = ', '.join(statement).replace(",","")[:-4]

    try:
       sqliteConnection = sqlite3.connect('users.db')
       cursor = sqliteConnection.cursor()
       sqlite_select_query = f"""SELECT * from wine WHERE {statement};"""
       cursor.execute(sqlite_select_query)
       records = cursor.fetchall()
       cursor.close()

    except sqlite3.Error as error:
       print("Failed to read data from sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()

read_wine()
