from flask import request
import requests
import threading

class FlaskServer(threading.Thread):
    def __init__(self, server, port=9123, *args, **kwargs):
        threading.Thread.__init__(self, *args, **kwargs)
        self.port = port
        self.server = server
        self.server.add_url_rule('/__shutdown', view_func=self.shutdown)

    def run(self):
        self.server.run(port=self.port)

    def stop(self):
        requests.get('http://localhost:{0}/__shutdown'.format(self.port))

    def shutdown(self):
        func = request.environ.get('werkzeug.server.shutdown')
        if func is None:
            raise RuntimeError('Not running with the Werkzeug Server')
        func()
