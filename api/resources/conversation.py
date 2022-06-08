from flask import (
    Blueprint, flash, g, json, redirect, render_template, request, session
)
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required, JWTManager
from api.resources.db import get_db

bp = Blueprint('conversation', __name__, url_prefix='/api') 
api = Api(bp)

def get_table_to_json(query):
    db = get_db()
    cursor = db.cursor()
    jsonform = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute(query)]
    return jsonform
    
class conversation(Resource): #Lấy tất cả các message từ 1 conversation của 1 user
    @jwt_required()
    def get(self,guid): #Nhận token của user, id của cuộc trò chuyện(guid) nếu user thuộc cuộc trò chuyện thì return
        db = get_db()
        query = f"SELECT * FROM message WHERE guid = {guid}"
        message = db.execute(query).fetchone()
        if not message:
            return {"msg":"Message not found..."},404
        
        user = get_jwt_identity()
        
        # if user != message['uid']:    
        #     return {"msg":"You don't have permission to edit this message"},401

        cursor = db.cursor()
        messages = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute(query)]
        return messages,200


class chatList(Resource): # lấy tất cả các conversation của một user liệt kê theo thứ tự thời gian update gần nhất
    @jwt_required()
    def get(self,uid): #nhận token của user, id của user muốn lấy conversation để so sánh nếu đúng thì return 
        uid1 = get_jwt_identity()
        #if uid1 != int(uid): return{"msg":"Not have access"},203
        db = get_db()
        cursor = db.cursor()
        mess = [dict((cursor.description[i][0], val) for i, val in enumerate(row)) for row in cursor.execute('SELECT conversation.* FROM member_of,conversation WHERE member_of.uid = ? and conversation.guid = member_of.guid ORDER BY conversation.last_updated DESC',(uid))]
        if len(mess):
            return mess,200
        return {"msg":"No message"},404

class room(Resource):
    @jwt_required()
    def post(self): 
        db = get_db()
        last_action = get_table_to_json('SELECT MAX(last_updated) FROM conversation')
        print(last_action)
        if  last_action[0].get('MAX(last_updated)') == None :
            current_action = 1
        else :
            current_action = last_action[0].get('MAX(last_updated)') + 1
        parse = reqparse.RequestParser()
        parse.add_argument('name',required = False)
        args = parse.parse_args()
        if args['name']:
            name = args['name']
        else:
            user = get_table_to_json(f"SELECT * FROM user WHERE uid={get_jwt_identity()}")
            name = f"{user[0].get('display_name')}'s chatroom"
        query = f'INSERT INTO conversation (type,last_updated) VALUES("{name}",{current_action})'
        db.execute(query)
        db.commit()
        room = get_table_to_json(f"SELECT * FROM conversation WHERE last_updated = {current_action}")
        query = f"INSERT INTO member_of (uid,guid) VALUES ({get_jwt_identity()},{room[0].get('guid')})"
        db.execute(query)
        db.commit()
        return room,201
    
class join(Resource):
    @jwt_required()
    def post(self,guid):
        room = get_table_to_json(f"SELECT * FROM conversation WHERE guid = {guid}")
        if not room :
            return {'msg':f'Room {guid} does not exist'},404
        member = get_table_to_json(f"SELECT * FROM member_of WHERE uid = {get_jwt_identity()} AND guid = {guid}")
        if member :
            return {'msg':f'User {get_jwt_identity()} is already in room {guid}'},200
        else :
            db = get_db()
            db.execute(f'INSERT INTO member_of (uid,guid) VALUES ({get_jwt_identity()},{guid})')
            db.commit()
            return {'msg':'User joined successfully'},201