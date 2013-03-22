import unittest
from hamcrest import assert_that, is_, equal_to
from picbois.system_test.picbois_test_server import PicboisTestServer
import requests


class NewGoalScoredTest(unittest.TestCase):
    def test_new_goal_is_added_to_a_player_stats(self):
        player_id = 23
        url = '{server_url}/goal'.format(server_url=self.server_url)
        data = {'scored_by': player_id}
        r = requests.post(url, data)
        assert_that(r.status_code, is_(201))

        url = '{server_url}/player/{player_id}/stats'.format(server_url=self.server_url, player_id=player_id)
        r = requests.get(url)
        assert_that(r.status_code, is_(200))
        player_stats = r.json()
        assert_that(player_stats['goals'], is_(1))

    def setUp(self):
        self.server = PicboisTestServer()
        self.server.start()
        self.server_url = 'http://{host}:{port}'.format(host=self.server.ip, port=self.server.port)

    def tearDown(self):
        self.server.stop()