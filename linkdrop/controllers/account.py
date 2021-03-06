# ***** BEGIN LICENSE BLOCK *****
# Version: MPL 1.1
#
# The contents of this file are subject to the Mozilla Public License Version
# 1.1 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at
# http://www.mozilla.org/MPL/
#
# Software distributed under the License is distributed on an "AS IS" basis,
# WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
# for the specific language governing rights and limitations under the
# License.
#
# The Original Code is Raindrop.
#
# The Initial Developer of the Original Code is
# Mozilla Messaging, Inc..
# Portions created by the Initial Developer are Copyright (C) 2009
# the Initial Developer. All Rights Reserved.
#
# Contributor(s):
#   Rob Miller (rmiller@mozilla.com)
#

import urllib
import json
from datetime import datetime
from uuid import uuid1
import hashlib

from webob.exc import HTTPException
from webob.exc import HTTPFound

from linkoauth.errors import AccessException
from linkdrop import log
from linkdrop.controllers import get_services
from linkdrop.lib.base import BaseController
from linkdrop.lib.helpers import get_redirect_response
from linkdrop.lib.metrics import metrics


class AccountController(BaseController):
    """
Accounts
========

OAuth authorization api.

"""
    __api_controller__ = True  # for docs

    def _create_account(self, request, domain, userid, username):
        acct_hash = hashlib.sha1(
            "%s#%s" % ((username or '').encode('utf-8'),
                       (userid or '').encode('utf-8'))).hexdigest()
        acct = dict(key=str(uuid1()), domain=domain, userid=userid,
                    username=username)
        metrics.track(request, 'account-create', domain=domain,
                      acct_id=acct_hash)
        return acct

    # this is not a rest api
    def authorize(self, request, *args, **kw):
        provider = request.POST['domain']
        log.info("authorize request for %r", provider)
        services = get_services(self.app.config)
        session = request.environ.get('beaker.session', {})
        return services.request_access(provider, request, request.urlgen,
                                       session)

    # this is not a rest api
    def verify(self, request, *args, **kw):
        provider = request.params.get('provider')
        log.info("verify request for %r", provider)

        acct = dict()
        try:
            services = get_services(self.app.config)
            session = request.environ.get('beaker.session', {})
            user = services.verify(provider, request, request.urlgen, session)

            account = user['profile']['accounts'][0]
            if (not user.get('oauth_token')
                and not user.get('oauth_token_secret')):
                raise Exception('Unable to get OAUTH access')

            acct = self._create_account(request,
                                        provider,
                                        str(account['userid']),
                                        account['username'])
            acct['profile'] = user['profile']
            acct['oauth_token'] = user.get('oauth_token', None)
            if 'oauth_token_secret' in user:
                acct['oauth_token_secret'] = user['oauth_token_secret']
            acct['updated'] = datetime.now().isoformat()
        except AccessException, e:
            self._redirectException(request, e)
        # lib/oauth/*.py throws redirect exceptions in a number of
        # places and we don't want those "exceptions" to be logged as
        # errors.
        except HTTPException, e:
            log.info("account verification for %s caused a redirection: %s",
                     provider, e)
            raise
        except Exception, e:
            log.exception('failed to verify the %s account', provider)
            self._redirectException(request, e)
        resp = get_redirect_response(request.config.get('oauth_success'))
        resp.set_cookie('account_tokens', urllib.quote(json.dumps(acct)))
        raise resp.exception

    def _redirectException(self, request, e):
        err = urllib.urlencode([('error', str(e))])
        url = request.config.get('oauth_failure').split('#')
        raise HTTPFound(location='%s?%s#%s' % (url[0], err, url[1]))
