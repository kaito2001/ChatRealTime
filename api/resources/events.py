from api import socketio
from flask_socketio import emit, join_room

@socketio.on('logged_in')
def join_all_convs(convs):
    for conv in convs:
        join_room(conv['guid'])
    emit('logged_in',convs, broadcast=True)

@socketio.on('server_listening')
def handle_message(msg):
    join_room(msg['guid'])
    emit('client_listening', msg, to=msg['guid'], broadcast=True )
    # emit('server_listening', msg['guid'], broadcast=True)
