from ast import arg
import psycopg2 
from flask import Flask, jsonify, request
import sys

app = Flask(__name__)

conn = psycopg2.connect("dbname=recipes user=postgres password=4385")
cursor = conn.cursor()
cursor.execute("SELECT * FROM recipes")
rows = cursor.fetchall()

@app.route('/search', methods=['GET'])
def search():
    
    args = request.args
    ingredients = args['ingredients']
    ingredlist = ingredients.split(",")
    ingdict = dict()
    for ing in ingredlist: ingdict[ing] = "Yeeet"
    conn = psycopg2.connect("dbname=recipes user=postgres password=4385")
    cursor = conn.cursor()


    #cursor.execute("SELECT * FROM recipes WHERE name LIKE '%"+ingredients+"%'")
    cursor.execute("SELECT * FROM public.recipes")
    rows = cursor.fetchall()
    rowdict = dict()
    #for count, row in enumerate(rows):
        #rowdict[count] = row
    #return rowdict
    for count, row in enumerate(rows):
        
        ings = row[10]
        newings = ings[2:-2]
        ings = newings.split("', '")
        add = True
        for ing in ings:
            if not ing in ingdict.keys():
                add = False
        if add:
            rowdict[count] = row
    return rowdict
