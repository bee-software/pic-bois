import json
import unittest
from hamcrest import assert_that, equal_to
from hamcrest.core.base_matcher import BaseMatcher
from picbois import APP as app


class NewGoalTest(unittest.TestCase):
    def test_creating_a_goal_returns_a_success_response(self):
        webapp = app.test_client()
        result = webapp.post('/goals', data=json_of(scoredBy="23", assistedBy="11"), content_type='application/json')
        assert_that(result, equal_to_response(201, {'success': True}))


    def test_creating_an_unassisted_goal_returns_success_response(self):
        webapp = app.test_client()
        result = webapp.post('/goals', data=json_of(scoredBy="23"), content_type='application/json')
        assert_that(result, equal_to_response(201, {'success': True}))


    def test_creating_a_goal_without_data_returns_a_400(self):
        webapp = app.test_client()
        result = webapp.post('/goals')
        assert_that(result.status_code, equal_to(400))

    def test_creating_a_goal_with_data_other_than_numbers_from_00_to_99_returns_a_400(self):
        webapp = app.test_client()
        result = webapp.post('/goals', data=json_of(scoredBy="23", assistedBy="sada"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

class EqualToResponse(BaseMatcher):

    def __init__(self, status, data):
        self.status = status
        self.data = data

    def _matches(self, result):
        if result.status_code == self.status and json.loads(result.data) == self.data:
            return True
        return False

    def describe_to(self, description):
        description.append_text("result " + str(self.status) + " : " + str(self.data))

    def describe_mismatch(self, result, mismatch_description):
        mismatch_description.append_text("was result " + str(result.status_code) + " : " + result.data)

def equal_to_response(status, data):
    return EqualToResponse(status, data)

def json_of(**kwargs):
    return json.dumps(dict(**kwargs))