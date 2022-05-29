from ast import arg
import psycopg2 
from flask import Flask, jsonify, request
import sys
import math

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
    for ing in ingredlist: ingdict[ing.replace("%20", " ")] = "Yeeet"
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
        add = 0
        for ing in ings:
            if ing in ingdict.keys():
                add += 1
        percentage = math.ceil((add/len(ings))*100)
        if percentage in rowdict.keys():
            rowdict[percentage].append(row)
        else:
            rowdict[percentage] = [row]

    realdict = dict()
    counter = 0
    for row in rowdict[100]:
        realdict[counter]=row
        counter = counter + 1
    
    if counter > 5:
        return realdict
     
    for i in range(1,100):
        index = 100-i
        if index in rowdict.keys():
            for row in rowdict[index]:
                realdict[counter] = row
                counter = counter + 1
                if counter > 5:
                    return realdict
