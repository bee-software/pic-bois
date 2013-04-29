import unittest
from picbois.matchers import equal_to_response
from picbois.web_test_client import json_of, web_test_client, assert_options_result_headers

from hamcrest import assert_that, equal_to


class NewGoalTest(unittest.TestCase):
    def test_creating_a_goal_returns_a_success_response(self):
        webapp = web_test_client()
        result = webapp.post('/goals', data=json_of(scoredBy="23", assistedBy="11"), content_type='application/json')
        assert_that(result, equal_to_response(201, {'success': True}))

    def test_creating_an_unassisted_goal_returns_success_response(self):
        webapp = web_test_client()
        result = webapp.post('/goals', data=json_of(scoredBy="23"), content_type='application/json')
        assert_that(result, equal_to_response(201, {'success': True}))

    def test_cannot_create_a_goal_with_the_same_player_numbers(self):
        webapp = web_test_client()
        result = webapp.post('/goals', data=json_of(scoredBy="23", assistedBy="23"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

    def test_creating_a_goal_without_data_returns_a_400(self):
        webapp = web_test_client()
        result = webapp.post('/goals')
        assert_that(result.status_code, equal_to(400))

    def test_creating_a_goal_with_data_other_than_numbers_from_00_to_99_returns_a_400(self):
        webapp = web_test_client()
        result = webapp.post('/goals', data=json_of(scoredBy="23", assistedBy="sada"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

    def test_failed_response_on_invalid_player_numbers(self):
        webapp = web_test_client()

        result = webapp.post('/goals', data=json_of(scoredBy="0a", assistedBy="12aa"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

        result = webapp.post('/goals', data=json_of(scoredBy="a0", assistedBy="a12"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

        result = webapp.post('/goals', data=json_of(scoredBy="a0a", assistedBy="a12a"), content_type='application/json')
        assert_that(result.status_code, equal_to(400))

    def test_server_supports_client_from_other_domains(self):
        webapp = web_test_client()

        # pylint: disable=E1101
        result = webapp.options('/goals', headers=dict(origin='http://remotesite.com'))
        assert_options_result_headers(result, method='POST')

        result = webapp.post('/goals', data=json_of(scoredBy="23", assistedBy="11"), content_type='application/json',
                             headers=dict(origin='http://remotesite.com'))
        assert_that('Access-Control-Allow-Origin' in result.headers)
        assert_that('http://remotesite.com', equal_to(result.headers['Access-Control-Allow-Origin']))
