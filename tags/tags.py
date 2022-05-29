from ast import arg
import psycopg2 
from flask import Flask, jsonify, request
import sys
import math
from urllib.parse import urlparse

app = Flask(__name__)

conn = psycopg2.connect("dbname=recipes user=postgres password=4385")
cursor = conn.cursor()
cursor.execute("SELECT * FROM recipes")
rows = cursor.fetchall()

def filter():
    args = request.args
    tags = args["tags"]
    taglist = tags.split(",")
    tagdict = dict()
    for tag in taglist: tagdict[tag.replace("%20", " ")] = "ugh"
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

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM public.recipes")
    rows = cursor.fetchall()
    rowdict = dict()
    for count, row in enumerate(rows):
        



