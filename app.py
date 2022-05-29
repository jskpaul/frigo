from ast import arg
import psycopg2 
from flask import Flask, jsonify, request
from flask_cors import CORS

import sys
import math
app = Flask(__name__)
cors = CORS(app)

  

#conn = psycopg2.connect("dbname=smallrecipes user=postgres password=4385")
#cursor = conn.cursor()
#cursor.execute("SELECT * FROM smallrecipe")
#rows = cursor.fetchall()


@app.route("/")
def index():
    return "Hello World"

@app.route('/alltags', methods=['GET'])
def alltags():
    conn = psycopg2.connect("postgresql://bkajobnssdigmz:9b2d5a529654f5da198abae2da464742c6f0525d4c52dc18c7041b5b5a3fd61b@ec2-44-196-223-128.compute-1.amazonaws.com:5432/de246nvqoro4o6", sslmode='require')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM recipes")
    rows = cursor.fetchall()
    rowdict = dict()
    for row in rows:
        row=row[5]
        newr = row[2:-2]
        row = newr.split("', '")
        for item in row:
            if item not in rowdict.keys():
                rowdict[item] = " "
        
    return rowdict

@app.route('/search',methods=['GET'])
def search():
    ingcheck =request.args.get("ingredients")
    if ingcheck == None:
        return {}

    tagcheck = request.args.get("tags")
    notag = False
    if tagcheck == None:
        notag=True

    

    args = request.args
    ingredients = args['ingredients']
    if not notag:
        tags = args['tags']
        taglist = tags.split(",")
        tagdict = dict()
        for tag in taglist: tagdict[tag.replace("%20", " ")] = "Yeeet"

    ingredlist = ingredients.split(",")
    ingdict = dict()
    
    for ing in ingredlist: ingdict[ing.replace("%20", " ")] = "Yeeet"
   
    conn = psycopg2.connect("postgresql://bkajobnssdigmz:9b2d5a529654f5da198abae2da464742c6f0525d4c52dc18c7041b5b5a3fd61b@ec2-44-196-223-128.compute-1.amazonaws.com:5432/de246nvqoro4o6", sslmode='require')
    
    cursor = conn.cursor()


    #cursor.execute("SELECT * FROM recipes WHERE name LIKE '%"+ingredients+"%'")
    cursor.execute("SELECT * FROM recipes")
    rows = cursor.fetchall()
    rowdict = dict()
    #for count, row in enumerate(rows):
        #rowdict[count] = row
    #return rowdict
    def tagval(tags):
        if notag:
            return True
        eval = True
        newtags = tags[2:-2]
        tags = newtags.split("', '")
        for key in tagdict.keys():
            if key not in tags:
                eval = False
        return eval

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
            if tagval(row[5]):
                realdict[counter]=row
                counter = counter + 1
    
    if counter > 20:
        return realdict
     
    for i in range(1,100):
        index = 100-i
        if index in rowdict.keys():
            for row in rowdict[index]:
                if tagval(row[5]):
                    realdict[counter] = row
                    counter = counter + 1
                if counter > 20:
                    return realdict
    return realdict
