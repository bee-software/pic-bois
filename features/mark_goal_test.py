import unittest
from features import phantomjs
from hamcrest import assert_that, equal_to
from drivers.server_driver import ServerDriver
from splinter import Browser

PICBOIS_COMMAND = ['gunicorn', 'picbois:APP', '-w', '1', '-b', '0.0.0.0:8000']

class MarkGoal(unittest.TestCase):
    def test_it_offers_a_way_to_mark_a_goal(self):
        self.browser.visit("http://localhost:8000/#new_goal")
        self.browser.fill("scoredBy", "23")
        self.browser.fill("assistedBy", "10")
        self.browser.find_by_id('markGoal').click()

        assert_that(self.browser.find_by_id("message").text, equal_to("Goal marked"))


    @classmethod
    def setUpClass(cls):
        cls.server = ServerDriver(name='Picbois', port=8000)
        cls.server.start(cmd=PICBOIS_COMMAND)
        cls.browser = Browser(driver_name='phantomjs', executable_path=phantomjs())

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.browser.quit()