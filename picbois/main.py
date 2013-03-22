#!/usr/bin/env python
from flask.app import Flask
from gunicorn.app.base import Application
from werkzeug.contrib.fixers import ProxyFix


class WSGIServer(Application):
    def __init__(self):
        super(WSGIServer, self).__init__("%prog [OPTIONS]")

    def init(self, parser, opts, args):
        pass

    def load(self):
        self.app = Flask("picbois")
        self._bootstrap_endpoints()
        self.app.wsgi_app = ProxyFix(self.app.wsgi_app)
        return self.app

    def _bootstrap_endpoints(self):
        pass
        #self._add_route('/clients/<client_id>/devices', function=self._get_client_devices, methods=["GET"])
        #self._add_route('/devices/<device_id>', function=self._get_devices, methods=["GET"])

    def _add_route(self, route, function, methods):
        self.app.add_url_rule(route, view_func=function, methods=methods)

def run():
    server = WSGIServer()
    server.run()


if __name__ == '__main__':
    run()
