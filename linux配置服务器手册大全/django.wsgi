"""
WSGI config for HMWeb project.

This module contains the WSGI application used by Django's development server
and any production WSGI deployments. It should expose a module-level variable
named ``application``. Django's ``runserver`` and ``runfcgi`` commands discover
this application via the ``WSGI_APPLICATION`` setting.

Usually you will have the standard Django WSGI application here, but it also
might make sense to replace the whole Django WSGI application with a custom one
that later delegates to the Django one. For example, you could introduce WSGI
middleware here, or combine a Django application with an application of another
framework.

"""
import os
import sys

sys.path = sys.path + ["/home/hmamis/www/amis/"]
os.environ['DJANGO_SETTINGS_MODULE'] = 'amis.settings'
#os.environ['PYTHON_EGG_CACHE'] = '/tmp/.python-eggs'
##current_dir = os.path.dirname(__file__)
current_dir = '/home/hmamis/www/amis/wsgi/'

sys.stdout = sys.stderr

DEBUG = True

if current_dir not in sys.path:
    sys.path.append(current_dir) 
    import django.core.handlers.wsgi
    application = django.core.handlers.wsgi.WSGIHandler()
#
## Apply WSGI middleware here.
   # from helloworld.wsgi import HelloWorldApplication
   # application = HelloWorldApplication(application)
















