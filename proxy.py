import requests
from flask import Flask, send_from_directory

server = Flask(__name__)


@server.get("/<string:file>")
def startpage(file = None):
    if not file:
        return send_from_directory("/", "startpage.html")
    else:
        return send_from_directory("/", file)


@server.get("/ac/<string:query>")
def deal_with_cors(query):
    return {"data": requests.get(f"https://ac.duckduckgo.com/ac/?q={query}&type=list").json()[1]}


@server.after_request
def actually_deal_with_cors(res):
    res.headers["Access-Control-Allow-Origin"] = "startpage.galax.tech"
    return res
