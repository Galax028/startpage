import requests
from flask import Flask, send_from_directory

app = Flask(__name__)


@app.get("/")
@app.get("/<string:file>")
def startpage(file = None):
    if not file:
        return send_from_directory("./", "startpage.html")
    else:
        return send_from_directory("./", file)


@app.get("/ac/<string:query>")
def deal_with_cors(query):
    return {"data": requests.get(f"https://ac.duckduckgo.com/ac/?q={query}&type=list").json()[1]}


@app.after_request
def actually_deal_with_cors(res):
    res.headers["Access-Control-Allow-Origin"] = "startpage.galax.tech"
    return res
