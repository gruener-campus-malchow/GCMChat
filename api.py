import bcrypt
from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse
from tinydb import TinyDB, Query

app = Flask(__name__)
CORS(app)
api = Api(app)

chatdb = TinyDB('chatdb.json')
userdb = TinyDB('userdb.json')


class ChatAPI(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str)
        self.reqparse.add_argument('text', type=str)
        super(ChatAPI, self).__init__()

    def get(self):
        return chatdb.all()

    def post(self):
        chatdb.insert(self.reqparse.parse_args())
        return "Success"


class DataPurge(Resource):
    def get(self):
        chatdb.purge()
        return "Data purged"


class Register(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str)
        self.reqparse.add_argument('password', type=str)
        super(Register, self).__init__()

    def post(self):
        username = self.reqparse.parse_args()['username']

        ExistiertBenutzer = Query()
        if not userdb.search(ExistiertBenutzer.username == username):
            password = self.reqparse.parse_args()['password']
            password_hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
            userdb.insert({'username': username, 'passwordhash': password_hashed.decode()})
            return "Success"
        else:
            return "ExistingUsername"


class Login(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('username', type=str)
        self.reqparse.add_argument('password', type=str)
        super(Login, self).__init__()

    def post(self):
        password = self.reqparse.parse_args()['password']
        username = self.reqparse.parse_args()['username']
        UserInDB = Query()
        password_hashed = userdb.search(UserInDB.username == username)[0]['passwordhash'].encode()
        if bcrypt.checkpw(password.encode(), password_hashed):
            return "Success"
        else:
            return "Wrong"


api.add_resource(ChatAPI, '/api')
api.add_resource(DataPurge, '/api/deleteData')
api.add_resource(Register, '/api/register')
api.add_resource(Login, '/api/login')

if __name__ == "__main__":
    app.run(port=80)
