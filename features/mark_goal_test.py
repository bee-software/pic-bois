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

        assert_that(self.browser.find_by_id("message").text,
                    equal_to("Marked: Goal scored by player 23 and assisted by player 10"))


    @classmethod
    def setUpClass(cls):
        cls.server = PicboisServer(port=8000)
        cls.server.start()
        cls.browser = Browser(driver_name='phantomjs', executable_path=phantomjs())

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.browser.quit()



        #
        # it("displays the players' numbers in the saved message", function (done) {
        #     browser.visit("http://localhost:5000/goals/new", function () {
        #     browser.fill("#scoredBy", "99");
        # browser.fill("#assistedBy", "66");
        # browser.pressButton("#submit", function () {
        #     expect(browser.text("#message")).toEqual("saved: goal scored by player 99 and assisted by player 66");
        # done();
        # });
        # });
        # });
        #
        # });