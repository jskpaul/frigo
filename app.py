from ast import arg
import psycopg2 
from flask import Flask, jsonify, request
import sys
import math
from urllib.parse import urlparse

app = Flask(__name__)

  

conn = psycopg2.connect("dbname=smallrecipes user=postgres password=4385")
cursor = conn.cursor()
cursor.execute("SELECT * FROM smallrecipe")
rows = cursor.fetchall()
@app.route("/")
def index():
    return "Hello World"
@app.route('/search', methods=['GET'])
def search():
    
    args = request.args
    ingredients = args['ingredients']
    ingredlist = ingredients.split(",")
    ingdict = dict()
    for ing in ingredlist: ingdict[ing.replace("%20", " ")] = "Yeeet"
    
    result = urlparse("postgresql://bkajobnssdigmz:9b2d5a529654f5da198abae2da464742c6f0525d4c52dc18c7041b5b5a3fd61b@ec2-44-196-223-128.compute-1.amazonaws.com:5432/de246nvqoro4o6")
    username = result.username
    password = result.password
    database = result.path[1:]
    hostname = result.hostname
    port = result.port

    conn = psycopg2.connect(
        database = database,
        user = username,
        password = password,
        host = hostname,
        port = port
    )
    '''
    conn = psycopg2.connect("dbname=recipes user=postgres password=4385")
    '''
    cursor = conn.cursor()


    #cursor.execute("SELECT * FROM recipes WHERE name LIKE '%"+ingredients+"%'")
    cursor.execute("SELECT * FROM recipes")
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
    if 100 in rowdict.keys():
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
