from api import create_app, socketio
from flask_socketio import emit

app = create_app()

if __name__ == '__main__':
    socketio.run(app, debug=True)
