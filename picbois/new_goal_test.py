import unittest
from hamcrest import assert_that, equal_to
from picbois import APP as app


class NewGoalTest(unittest.TestCase):
    def test_creating_a_goal_returns_a_201(self):
        webapp = app.test_client()
        result = webapp.post('/goals', data=dict(
            scoredBy=23,
            assistedBy=11
        ))
        assert_that(result.status_code, equal_to(201))


    def test_creating_an_unassisted_goal_returns_a_201(self):
        webapp = app.test_client()
        result = webapp.post('/goals', data=dict(
            scoredBy=23
        ))
        assert_that(result.status_code, equal_to(201))


    def test_creating_a_goal_without_data_returns_a_400(self):
        webapp = app.test_client()
        result = webapp.post('/goals')
        assert_that(result.status_code, equal_to(400))

    def test_creating_a_goal_with_data_other_than_numbers_from_00_to_99_returns_a_400(self):
        webapp = app.test_client()
        result = webapp.post('/goals', data=dict(
            scoredBy=23,
            assistedBy="sada"
        ))
        assert_that(result.status_code, equal_to(400))
