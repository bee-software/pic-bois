import sys
import os

from picbois import APP as picbois_app

from daemon import runner


class App():
    def __init__(self, host='0.0.0.0', port=5000):
        self.stdin_path = os.devnull
        self.stdout_path = '/tmp/picbois_out.log'
        self.stderr_path = '/tmp/picbois_err.log'
        self.pidfile_path = '/tmp/picbois.pid'
        self.pidfile_timeout = 2
        self.host = host
        self.port = port

    def run(self):
        picbois_app.run(host=self.host, port=self.port)


def is_starting():
    return sys.argv[1] == 'start'

if is_starting():
    host = sys.argv[2]
    port = int(sys.argv[3])
    app = App(host, port)
else:
    app = App()
daemon_runner = runner.DaemonRunner(app)
daemon_runner.do_action()
