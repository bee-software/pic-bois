import inspect
import unittest
from features.picbois_server import PicboisServer
from hamcrest import assert_that, is_
from nose.tools import nottest
from picbois.utils import get_current_file_dir
import requests
from splinter import Browser

@nottest
class ServeTest(unittest.TestCase):
    def test_serves_homepage(self):
        self._browser.visit('http://localhost:8000/')
        assert_that(self._browser.is_text_present('This is the content of the homepage'))

    def test_serves_page_from_url(self):
        self._browser.visit('http://localhost:8000/#page1')
        assert_that(self._browser.is_text_present('This is the content of page1'))

    def test_serves_page_on_click(self):
        self._browser.visit('http://localhost:8000/')
        self._browser.find_by_id('page1').click()
        assert_that(self._browser.is_text_present('This is the content of page1'))

    def test_serves_page_on_history_navigation(self):
        self._browser.visit('http://localhost:8000/')
        self._browser.find_by_id('page1').click()
        self._browser.find_by_id('page2').click()
        self._browser.back()
        assert_that(self._browser.is_text_present('This is the content of page1'))
        self._browser.forward()
        assert_that(self._browser.is_text_present('This is the content of page2'))

    def test_serves_javascript_libraries(self):
        result = requests.get('http://localhost:8000/static/libs/jquery-1.9.1.js')
        assert_that(result.status_code, is_(200))

    @classmethod
    def setUpClass(cls):
        cls._server = PicboisServer(port=8000)
        cls._server.start()
        cls._browser = Browser(driver_name='phantomjs', executable_path=phantomjs())

    @classmethod
    def tearDownClass(cls):
        cls._server.shutdown()
        cls._browser.quit()


def phantomjs():
    return get_current_file_dir(inspect.currentframe()) + '/../node_modules/.bin/phantomjs'
