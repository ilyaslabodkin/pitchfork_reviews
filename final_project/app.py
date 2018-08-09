# Imports
import numpy as np
import pandas as pd
import datetime as dt
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta
import os 
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc, select, extract
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.sql import label
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()
import json 

app = Flask(__name__)

#################################################
# Database Setup
#################################################
dbfile = os.path.join('db', 'database.sqlite')
engine = create_engine(f"sqlite:///{dbfile}")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
#################################################
# Database Setup
#################################################
#genres_table = Base.classes.genres
#content_table= Base.classes.content

# Create our session (link) from Python to the DB
session = Session(engine)

@app.route("/")
def index():
   return render_template("index.html")

@app.route("/genres")
def genre():
    result = engine.execute("select genre, count(genre) as count from genres group by genre ")
    genre=[]

    for genres in result:
        genre.append({"genre":genres[0], "count": genres[1]})
    return jsonify(genre)



@app.route("/artists")
def artists():
    result = engine.execute("select  artist, count(artist) from artists group by artist  order by  count(artist)")
    artists=[]
    for artist in result:
        artists.append({"artist":artist[0], "count":artist[1]})
    return jsonify(artists)

@app.route("/TopTenArtists")
def TopTenArtists():
    result = engine.execute("select  artist, count(artist) from artists group by artist  order by  count(artist) desc limit 10")
    artists=[]
    for artist in result:
        artists.append({"artist":artist[0], "count":artist[1]})
    return jsonify(artists)

@app.route("/labels")
def labels():
    result = engine.execute("select label, count(label )from labels group by label ")
    labels=[]
    for label in result:
        labels.append({"label":label[0], "count":label[1]})
    return jsonify(labels)   

@app.route("/TopTenLabels")
def TopTenLabels():
    result = engine.execute("select  label, count(label ) from labels group by label  order by  count(label) desc limit 10 ")
    labels=[]
    for label in result:
        labels.append({"label":label[0], "count":label[1]})
    return jsonify(labels)   


@app.route("/years")
def years():
    result = engine.execute("select  year, count(year) from years group by year ")
    years=[]
    for year in result:
        years.append({"year":year[0], "count":year[1]})
    return jsonify(years)  


@app.route("/all_data")
def data():
    result = engine.execute("select content,genre,artist, score, author,pub_year from reviews inner join genres on reviews.reviewid = genres.reviewid inner join content on reviews.reviewid= content.reviewid")
    data_dcit=[]
    for data in result:
        data_dcit.append({"content":data[0], "genre": data[1],"artist": data[2], "score":data[3],"author":data[4],"pub_year": data[5]})
    return jsonify(data_dcit)

@app.route("/text_analysis")
def analysis():
    result = engine.execute("select content,genre,artist, score, author,pub_year from reviews inner join genres on reviews.reviewid = genres.reviewid inner join content on reviews.reviewid= content.reviewid")
    data_dcit=[]
    for data in result:
        results = analyzer.polarity_scores(data[0])
        compound = results["compound"]
        data_dcit.append({"content":data[0], "genre": data[1],"artist": data[2], "score":data[3],"author":data[4],"pub_year": data[5], "Vader_Score":compound})
   #works but is very slow probably wont be used 
    return jsonify(data_dcit)
    

@app.route("/all_contributor")
def AllContributor():
    result = engine.execute("select    author, count(author) from reviews group by author order by count(author) desc")
    data_dcit=[]
    for data in result:
        data_dcit.append({"author":data[0],"count":data[1]})
    return jsonify(data_dcit)

@app.route("/top_contributor")
def TopContributor():
    result = engine.execute("select    author, count(author) from reviews group by author order by count(author) desc limit 10")
    data_dcit=[]
    for data in result:
        data_dcit.append({"author":data[0],"count":data[1]})
    return jsonify(data_dcit)

@app.route("/table_data")
def table_data():
    result = engine.execute("select genre,title,artist, score, author,pub_year from reviews inner join genres on reviews.reviewid = genres.reviewid inner join content on reviews.reviewid= content.reviewid")
    data_list=[]
    #data_dcit={"keys":["genre","artist","score","author","pub_year"],"data": data_list}
    for data in result:
        data_list.append({"genre": data[0],"title":data[1],"artist": data[2], "score":data[3],"author":data[4],"pub_year": data[5]})
    data_dcit={"keys":["genre","title","artist","score","author","pub_year"],"data": data_list}
    return jsonify(data_dcit)



@app.route("/top_contributor_JoeTangari")
def TopContributorJoeTangari():
    result = engine.execute("select  (author),  count(score ), score from reviews  where author = 'joe tangari' group by score")
    data_dcit=[]
    for data in result:
        data_dcit.append({"author":data[0],"count":data[1],"score":data[2]})
    return jsonify(data_dcit)










if __name__ == "__main__":
    app.run(debug=True)