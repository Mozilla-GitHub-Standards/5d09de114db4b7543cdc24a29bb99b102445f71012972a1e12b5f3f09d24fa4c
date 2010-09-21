
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Raindrop.
 *
 * The Initial Developer of the Original Code is
 * Mozilla Messaging, Inc..
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 * */

/*jslint */
/*global require: false, window: false, location: false */
"use strict";

require.def("oauth",
        [],
function () {
    var authDone;

    //Handle communication from the auth window, when it completes.
    window.addEventListener("message", function (evt) {
        //TODO: ideally lock down the domain check on evt.origin.
        if (evt.data === 'authDone') {
            if (authDone) {
                authDone();
                authDone = null;
            }
        }
    }, false);  

    return function oauth(domain, callback) {
        if (callback) {
            authDone = callback;
        }
        var url = location.protocol + "//" + location.host + "/send/auth.html";
        window.open(url + "?domain=" + domain,
                            "Firefox Share OAuth",
                            "dialog=yes, modal=yes, width=800, height=480");
    };
});