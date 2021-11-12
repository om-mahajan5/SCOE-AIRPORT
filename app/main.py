from flask import Flask
from dbConnect.dbInteract import get
app = Flask(__name__)


@app.route("/")
def home_view():
    return "<h1>Welcome to DBMS</h1>"


@app.route('/api/<string:query>')
def api(query):
    destinationList = []
    for row in get(query):
        destinationList.append(row[1])
    print({"Dest":destinationList})
    return {"Dest":destinationList}
