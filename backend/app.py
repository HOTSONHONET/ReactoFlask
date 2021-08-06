from flask import Flask, json, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
# To allow cross platform data transfer
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:postgres@localhost/reactnFlaskDB"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id  = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.now())


    def __init__(self, title, body):
        self.title = title
        self.body = body

class ArticlesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')

article_schema = ArticlesSchema()
articles_schema = ArticlesSchema(many = True)



"""
All routes

"""

@app.route("/", methods = ["GET"])
def get_article():
    return jsonify({"Statement" : "Hello World"})


@app.route('/add', methods = ['POST'])
def add_article():
    title = request.json['title']
    body  = request.json['body']

    obj_articles = Articles(title, body)
    db.session.add(obj_articles)
    db.session.commit()
    return article_schema.jsonify(obj_articles)

@app.route("/showall", methods = ['GET'])
def showall():
    all_articles = jsonify(articles_schema.dump(Articles.query.all()))
    return all_articles

@app.route("/showall/<id>/", methods = ['GET'])
def post_details(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)

@app.route("/update/<id>/", methods = ['PUT'])
def update_articles(id):
    article = Articles.query.get(id)
    
    article.title = request.json['title']
    article.body = request.json['body']

    db.session.commit()
    return article_schema.jsonify(article)

@app.route("/delete/<id>/", methods = ['DELETE'])
def delete_article(id):
    article = Articles.query.get(id)

    db.session.delete(article)
    db.session.commit()
    return article_schema.jsonify(article)


if __name__ == "__main__":
    app.run(debug = True)