import json
import unittest
from hamcrest import assert_that, equal_to
from picbois import APP as app


class NewGoalTest(unittest.TestCase):
    def test_goals_returns_a_saved_message(self):
        webapp = app.test_client()
        result = webapp.post('/goals')
        assert_that(json.loads(result.data),
                    equal_to({'message': "saved: goal scored by player 23 and assisted by player 10"}))