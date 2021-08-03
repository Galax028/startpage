import requests
from flask import Flask, jsonify

cors = Flask(__name__)


@cors.get("/<string:query>")
def deal_with_cors(query):
    return {"data": requests.get(f"https://ac.duckduckgo.com/ac/?q={query}&type=list").json()[1]}


@cors.after_request
def actually_deal_with_cors(res):
    res.headers["Access-Control-Allow-Origin"] = "*"
    return res


if __name__ == "__main__":
    cors.run("localhost", 8080)
