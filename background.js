// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var current = false;

function updateIcon() {
    var x = current?1:2;
    chrome.browserAction.setIcon({path: "icon_" + x + ".png"});
    current = !current;
}

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    if (request.msg == "getDisabled") {
        sendResponse({enabled: current});
        return true;
    }
});