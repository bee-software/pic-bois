import unittest
from features.picbois_server import PicboisServer
from hamcrest import assert_that, is_
import requests
from splinter import Browser


class ServeTest(unittest.TestCase):
    def test_serves_homepage(self):
        self._browser.visit('http://localhost:5000/')
        assert_that(self._browser.is_text_present('Homepage'))

    def test_serves_page1(self):
        self._browser.visit('http://localhost:5000/')
        self._browser.find_by_id('page1').click()
        assert_that(self._browser.is_text_present('This is the content of page1', wait_time=1))

    def test_serves_javascript_libraries(self):
        result = requests.get('http://localhost:5000/static/libs/jquery-1.9.1.js')
        assert_that(result.status_code, is_(200))

    @classmethod
    def setUpClass(cls):
        cls._server = PicboisServer(port=5000)
        cls._server.start()
        cls._browser = Browser(driver_name='phantomjs', executable_path='./node_modules/.bin/phantomjs')
        # cls._browser = Browser(driver_name='phantomjs', executable_path='../node_modules/.bin/phantomjs')

    @classmethod
    def tearDownClass(cls):
        cls._server.shutdown()
        cls._browser.quit()
