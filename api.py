from flask import Flask
from flask_restful import Api, Resource, reqparse
import sqlite3

app = Flask(__name__)
api = Api(app)

db = sqlite3.connect('gcmchatdata.db', check_same_thread=False)
c = db.cursor()

c.execute(
    '''CREATE TABLE IF NOT EXISTS messages(id INT PRIMARY KEY, username VARCHAR(64), text VARCHAR(255), UNIQUE(id))''')
db.commit()

class ChatAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str, location='json')
        self.reqparse.add_argument('text', type=str, location='json')
        super(ChatAPI, self).__init__()

    def get(self):
        c.execute('''SELECT username, text FROM messages''')
        return c.fetchall()
        # return [
        #     {
        #         "username": "testuser1",
        #         "text": "text1"
        #     },
        #     {
        #         "username": "testuser2",
        #         "text": "text2"
        #     }
        # ]

    def post(self):
        # print(self.reqparse.parse_args())
        return "POST successful"


api.add_resource(ChatAPI, '/api')

if __name__ == "__main__":
    app.run(port=80)
