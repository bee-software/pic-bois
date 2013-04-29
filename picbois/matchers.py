import json
from hamcrest.core.base_matcher import BaseMatcher


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
