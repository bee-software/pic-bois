import unittest
from features import phantomjs
from hamcrest import assert_that, equal_to
from picbois_server import PicboisServer
from splinter import Browser


class MarkGoal(unittest.TestCase):
    def test_it_offers_a_way_to_mark_a_goal(self):
        self.browser.visit("http://localhost:8000/#new_goal")
        self.browser.fill("scoredBy", "23")
        self.browser.fill("assistedBy", "10")
        self.browser.find_by_id('markGoal').click()

        assert_that(self.browser.find_by_id("message").text, equal_to("Goal marked"))


    @classmethod
    def setUpClass(cls):
        cls.server = PicboisServer(port=8000)
        cls.server.start()
        cls.browser = Browser(driver_name='phantomjs', executable_path=phantomjs())

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.browser.quit()