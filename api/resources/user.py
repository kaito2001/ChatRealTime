from flask import (
    Blueprint, g, json
)
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import check_password_hash, generate_password_hash
from api.resources.db import get_db

bp = Blueprint('user', __name__, url_prefix='/api')
api = Api(bp)

def user_in_conversation(uid,guid):
    members =  get_table_to_json(f'SELECT * FROM member_of WHERE guid = {guid}')
    for member in members:
        if member['uid'] == uid:
            return True
    return False
def get_table_to_json(query):
    db = get_db()
    cursor = db.cursor()
    jsonform = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute(query)]
    return jsonform

def execute_query(query):
    db=get_db()
    db.execute(query)
    db.commit()
    return
class user(Resource):
    @jwt_required()
    def get(self):
        parse = reqparse.RequestParser()
        parse.add_argument('name',required=False)
        parse.add_argument('uid',required=False,type=int,help="User id is missing")
        
        args = parse.parse_args()
        
        query = 'SELECT uid,username,display_name,role FROM user '
        if len(args):
            query += 'WHERE '
        
        if args['name']:
            query += f"display_name LIKE '%{args['name']}%' AND "
        if args['uid']:
            query += f"uid ={args['uid']} AND "
            
        if len(args):
            query = query[0:-4]
            
        users = get_table_to_json(query)
        if len(users):
            return users,200
        return {"msg":"No users found..."},404
    @jwt_required()
    def put(self):
        uid = get_jwt_identity()
        user = get_table_to_json(f"SELECT * FROM user WHERE uid={uid}")
        parse = reqparse.RequestParser()
        parse.add_argument('password',required = False)
        parse.add_argument('display_name',required = False)
        parse.add_argument('role',required = False)
        args = parse.parse_args()

        # old_password = reqparse.RequestParser()
        # old_password.add_argument('opassword',required = True,help = "Password is required for changes!")
        # old_pass = old_password.parse_args()      
        # if not check_password_hash(user[0].get('password'),old_pass['opassword']):
        #     return {'msg': 'Password is incorrect'}, 401
        
        if args['password']:
            execute_query(f"UPDATE user SET password = '{generate_password_hash(args['password'])}' WHERE uid = {uid}")
        if args['display_name']:
            execute_query(f"UPDATE user SET display_name = '{args['display_name']}' WHERE uid = {uid}")
        if args['role']:
            execute_query(f"UPDATE user SET role = '{args['role']}' WHERE uid = {uid}")
            
        user = get_table_to_json(f"SELECT uid,username,display_name,role FROM user WHERE uid={uid}")
        return user,201
