import os

from setuptools import setup


def parse_requirements_from_file(requirements_file):
    if os.path.exists(requirements_file):
        return [i.strip() for i in open(requirements_file, 'r').readlines()]

requires = parse_requirements_from_file('requirements.txt')

setup(
    name='picbois',
    install_requires=requires,
)
