import json
from hamcrest import assert_that, equal_to
import types
from picbois import APP as app


def web_test_client():
    webapp = app.test_client()
    patch_with_options(webapp)
    return webapp


def patch_with_options(target):
    def options(target, *args, **kw):
        """Like open but method is enforced to OPTIONS."""
        kw['method'] = 'OPTIONS'
        return target.open(*args, **kw)

    target.options = types.MethodType(options, target)


def json_of(**kwargs):
    return json.dumps(dict(**kwargs))

def assert_options_result_headers(result, method):
    assert_that(result.status_code, equal_to(204))
    assert_that('Access-Control-Allow-Origin' in result.headers)
    assert_that(result.headers['Access-Control-Allow-Origin'] == 'http://remotesite.com')
    assert_that('Access-Control-Allow-Methods' in result.headers)
    assert_that('Access-Control-Allow-Headers' in result.headers)
    allowed_methods = result.headers['Access-Control-Allow-Methods']
    assert_that(method in allowed_methods)

