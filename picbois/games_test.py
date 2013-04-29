import unittest

from hamcrest import assert_that, equal_to
from picbois.matchers import equal_to_response
from picbois.new_goal_test import json_of
from picbois.web_test_client import web_test_client, assert_options_result_headers


class GamesTest(unittest.TestCase):
    def test_an_empty_game_returns_no_goals(self):
        webapp = web_test_client()
        result = webapp.get('/games/1/goals/')
        assert_that(result, equal_to_response(200, {'goals': []}))

    def test_games_with_a_goal_returns_it(self):
        webapp = web_test_client()
        webapp.post('/goals', data=json_of(scoredBy="24", assistedBy="12"), content_type='application/json')

        result = webapp.get('/games/1/goals/')
        assert_that(result, equal_to_response(200, {'goals': [{'scoredBy': '24', 'assistedBy': '12'}]}))

    def test_server_supports_client_from_other_domains(self):
        webapp = web_test_client()

        # pylint: disable=E1101
        result = webapp.options('/games/1/goals/', headers=dict(origin='http://remotesite.com'))
        assert_options_result_headers(result, method='GET')

        result = webapp.get('/games/1/goals/', headers=dict(origin='http://remotesite.com'))
        assert_that('Access-Control-Allow-Origin' in result.headers)
        assert_that('http://remotesite.com', equal_to(result.headers['Access-Control-Allow-Origin']))
