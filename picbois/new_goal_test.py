import json
import unittest

import types
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

    def test_cannot_create_a_goal_with_the_same_player_numbers(self):
        webapp = app.test_client()
        result = webapp.post('/goals', data=json_of(scoredBy="23", assistedBy="23"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

    def test_creating_a_goal_without_data_returns_a_400(self):
        webapp = app.test_client()
        result = webapp.post('/goals')
        assert_that(result.status_code, equal_to(400))

    def test_creating_a_goal_with_data_other_than_numbers_from_00_to_99_returns_a_400(self):
        webapp = app.test_client()
        result = webapp.post('/goals', data=json_of(scoredBy="23", assistedBy="sada"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

    def test_failed_response_on_invalid_player_numbers(self):
        webapp = app.test_client()

        result = webapp.post('/goals', data=json_of(scoredBy="0a", assistedBy="12aa"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

        result = webapp.post('/goals', data=json_of(scoredBy="a0", assistedBy="a12"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

        result = webapp.post('/goals', data=json_of(scoredBy="a0a", assistedBy="a12a"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

    def test_server_supports_client_from_other_domains(self):
        webapp = app.test_client()
        patch_with_options(webapp)

        # pylint: disable=E1101
        result = webapp.options('/goals', headers=dict(origin='http://remotesite.com'))
        assert_that(result.status_code, equal_to(204))
        assert_that('Access-Control-Allow-Origin' in result.headers)
        assert_that(result.headers['Access-Control-Allow-Origin'] == 'http://remotesite.com')
        assert_that('Access-Control-Allow-Methods' in result.headers)
        assert_that('Access-Control-Allow-Headers' in result.headers)


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


def patch_with_options(target):
    def options(target, *args, **kw):
        """Like open but method is enforced to OPTIONS."""
        kw['method'] = 'OPTIONS'
        return target.open(*args, **kw)

    target.options = types.MethodType(options, target)

