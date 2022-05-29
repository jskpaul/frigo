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
    tags = args[5]
    taglist = tags.split(",")
    