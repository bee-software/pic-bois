from hamcrest import assert_that, is_not
from hamcrest.core.base_matcher import BaseMatcher
import os
import pkg_resources
import socket
import subprocess
import sys
import time


class PicboisServer(object):
    def __init__(self, port=8000, ip='0.0.0.0'):
        self.port = port
        self.ip = ip

    def start(self, workers=1):
        self._start(pkg_resources.resource_filename('picbois', 'run.py'), workers)

    def shutdown(self):
        self.proc.terminate()
        print "========== Begin Picbois Server Output =========="
        print self.proc.communicate()[0]
        print "=========== End Picbois Server Output ==========="

    def _start(self, executable, workers):
        os.getcwd()
        assert_that((self.ip, self.port), is_not(in_use()))

        current_python_interpreter = sys.executable
        self.proc = subprocess.Popen(
            [current_python_interpreter, executable, '-w', str(workers), '-b', self.ip + ':' + str(self.port)])
        self._wait_until_port_is_opened(self.port)

    def _run_and_wait(self, command, working_dir):
        print 'waiting for <' + command + '> in ' + working_dir
        subprocess.check_call(command, cwd=working_dir, shell=True)

    def _wait_until_port_is_opened(self, port):
        for i in range(0, 10):
            host = '127.0.0.1'
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            try:
                s.connect((host, port))
                s.close()
                break
            except:
                time.sleep(1)

def in_use():
    return IpPortInUseMatcher()

class IpPortInUseMatcher(BaseMatcher):
    def _matches(self, item):
        self.ip, self.port = item
        return self._port_in_use()

    def _port_in_use(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        timeout = socket.timeout
        socket.timeout = 1
        try:
            s.connect((self.ip, self.port))
            return True
        except:
            return False
        finally:
            s.close()
            socket.timeout = timeout

    def describe_to(self, description):
        description.append_text('{ip}:{port} in use'.format(ip=self.ip, port=self.port))

    def describe_mismatch(self, item, mismatch_description):
        ip, port = item
        mismatch_description.append_text('{ip}:{port} not in use'.format(ip=ip, port=port))
