from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
from tinydb import TinyDB

app = Flask(__name__)
CORS(app)
api = Api(app)

db = TinyDB('chatdb.json')


class ChatAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str, location='json')
        self.reqparse.add_argument('text', type=str, location='json')
        super(ChatAPI, self).__init__()

    def get(self):
        return db.all()

    def post(self):
        db.insert(self.reqparse.parse_args())
        return "Success"


class DataPurge(Resource):
    def get(self):
        db.purge()
        return "Data purged"


api.add_resource(ChatAPI, '/api')
api.add_resource(DataPurge, '/api/deleteData')

if __name__ == "__main__":
    app.run(port=80)
