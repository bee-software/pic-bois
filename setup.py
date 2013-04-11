import re
import sys
import os

from setuptools import setup

from setuptools.command.test import test as TestCommand


class Tox(TestCommand):
    def finalize_options(self):
        TestCommand.finalize_options(self)
        self.test_args = []
        self.test_suite = True

    def run_tests(self):
        #import here, cause outside the eggs aren't loaded
        import tox

        errno = tox.cmdline(self.test_args)
        sys.exit(errno)

# Get requirements from the first file that exists
def get_reqs_from_files(requirements_files):
    for requirements_file in requirements_files:
        if os.path.exists(requirements_file):
            with open(requirements_file, 'r') as fil:
                return fil.read().split('\n')
    return []

def parse_requirements(requirements_files):
    requirements = []
    for line in get_reqs_from_files(requirements_files):
        # For the requirements list, we need to inject only the portion
        # after egg= so that distutils knows the package it's looking for
        # such as:
        # -e git://github.com/openstack/nova/master#egg=nova
        if re.match(r'\s*-e\s+', line):
            requirements.append(re.sub(r'\s*-e\s+.*#egg=(.*)$', r'\1',
                                       line))
        # such as:
        # http://github.com/openstack/nova/zipball/master#egg=nova
        elif re.match(r'\s*https?:', line):
            requirements.append(re.sub(r'\s*https?:.*#egg=(.*)$', r'\1',
                                       line))
        # -f lines are for index locations, and don't get used here
        elif re.match(r'\s*-f\s+', line):
            pass
        # argparse is part of the standard library starting with 2.7
        # adding it to the requirements list screws distro installs
        elif line == 'argparse' and sys.version_info >= (2, 7):
            pass
        else:
            requirements.append(line)

    return requirements

requires = parse_requirements(['requirements.txt'])

setup(
    name='picbois',
    install_requires=requires,
    # packages=find_packages(exclude=["*.tests", "*.tests.*", "tests.*", "tests"]),
    # entry_points={'console_scripts': [
    #     'picbois=pyweb.main:run',
    #     ]},
    # package_data={
    #     'picbois': [
    #         'resources/config/*.cfg',
    #         'resources/init-script',
    #         'salesforce/resources/*.wsdl',
    #         ],
    # },
    cmdclass={'test': Tox},
)
