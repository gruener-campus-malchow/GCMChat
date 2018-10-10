from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)


class ChatAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str, location='json')
        self.reqparse.add_argument('text', type=str, location='json')
        super(ChatAPI, self).__init__()

    def get(self):
        return [
            {
                "username": "testuser1",
                "text": "text1"
            },
            {
                "username": "testuser2",
                "text": "text2"
            }
        ]

    def post(self):
        # print(self.reqparse.parse_args())
        return "POST successful"


api.add_resource(ChatAPI, '/api')

if __name__ == "__main__":
    app.run(port=80)
