import inspect
from flask import Flask, render_template
from gunicorn.app.base import Application
from picbois.utils import get_current_file_dir
from werkzeug.contrib.fixers import ProxyFix


class WSGIServer(Application):
    def __init__(self):
        super(WSGIServer, self).__init__("%prog [OPTIONS]")

    def init(self, parser, opts, args):
        pass

    def load(self):
        self.app = Flask(import_name="picbois",
                         static_folder=static_folder(),
                         template_folder=templates_folder())
        self.app.debug = True
        self._bootstrap_endpoints()
        self.app.wsgi_app = ProxyFix(self.app.wsgi_app)
        return self.app

    def _bootstrap_endpoints(self):
        self._add_route(route='/', function=home, methods=["GET"])

    def _add_route(self, route, function, methods):
        self.app.add_url_rule(route, view_func=function, methods=methods)


def home():
    return render_template('main.html')

def static_folder():
    return get_current_file_dir(inspect.currentframe()) + '/www/static'

def templates_folder():
    return get_current_file_dir(inspect.currentframe()) + '/www/static/templates'

def run():
    server = WSGIServer()
    server.run()


if __name__ == '__main__':
    run()