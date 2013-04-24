import inspect
import unittest
from features import phantomjs, get_current_file_dir
from hamcrest import assert_that, equal_to
from drivers.server_driver import ServerDriver
from splinter import Browser

API_SERVER_PORT = 8000
API_SERVER_CMD = ['gunicorn', 'picbois:APP', '-w', '1', '-b', '0.0.0.0:{port}'.format(port=API_SERVER_PORT)]
CLIENT_SERVER_PORT = 5000
CLIENT_SERVER_CMD = ['python', '-m', 'SimpleHTTPServer', str(CLIENT_SERVER_PORT)]

class MarkGoal(unittest.TestCase):
    def test_it_offers_a_way_to_mark_a_goal(self):
        self.browser.visit("http://localhost:{port}/#new_goal".format(port=CLIENT_SERVER_PORT))
        self.browser.fill("scoredBy", "23")
        self.browser.fill("assistedBy", "10")
        self.browser.find_by_id('markGoal').click()

        assert_that(self.browser.find_by_id("message").text, equal_to("Goal marked"))


    @classmethod
    def setUpClass(cls):
        cls.server = ServerDriver(name='Picbois', port=API_SERVER_PORT)
        cls.server.start(cmd=API_SERVER_CMD)

        cls.client_app_server = ServerDriver(name='Picbois client', port=CLIENT_SERVER_PORT)
        cls.client_app_server.start(cmd=CLIENT_SERVER_CMD, cwd=client_path())

        cls.browser = Browser(driver_name='phantomjs', executable_path=phantomjs())

    @classmethod
    def tearDownClass(cls):
        cls.client_app_server.shutdown()
        cls.server.shutdown()
        cls.browser.quit()

def client_path():
    return get_current_file_dir(inspect.currentframe()) + '/../client'
