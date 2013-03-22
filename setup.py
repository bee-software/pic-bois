from setuptools import setup

setup(
    name='picbois',
    setup_requires=['nose'],
    install_requires=[
        'nose',
        'requests',
        'pyhamcrest',
        'flask',
        'gunicorn',
#        'selenium==2.29.0',
#        'pyvirtualdisplay==0.1.2'
    ],
)
