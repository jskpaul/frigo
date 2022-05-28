import psycopg2 
from flask import Flask, jsonify, request

app = Flask(__name__)

conn = psycopg2.connect("dbname=recipes user=postgres password=4385")
cursor = conn.cursor()
cursor.execute("SELECT * FROM recipes")
rows = cursor.fetchall()

@app.route('/search', methods=['GET'])
def search():
    
    conn = psycopg2.connect("dbname=recipes user=postgres password=4385")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM recipes WHERE name LIKE '%shrimp%'")
    rows = cursor.fetchall()
    rowdict = dict()
    for count, row in enumerate(rows):
        rowdict[count] = row
    return rowdict
