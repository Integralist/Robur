/*
    BE WARNED THAT 'BROWSER SNIFFING' THE USER-AGENT STRING IS BOTH FUGLY AND UNRELIABLE!
    USE ONLY IF YOU ABSOLUTELY MUST...
 */
(function(global){
    var ua = global.navigator.userAgent;
    var html = document.documentElement;
    var windows = /Windows/i.test(ua);
    var mac = /Macintosh/i.test(ua);
    
    // The 'window.opera' global property has been available since Opera Version 5.0
    if (!!global.opera) {
        html.className += ' opera';
    }
    
    // If Windows Firefox
    if (windows && /Firefox/i.test(ua)) {
        html.className += ' win-firefox';
    }
    // If Firefox
    else if (/Firefox/i.test(ua)) {
        html.className += ' firefox';
    }

    // If Windows WebKit
    if (windows && /WebKit/i.test(ua)) {
        html.className += ' win-webkit';
    }
    // If WebKit
    else if (/WebKit/i.test(ua)) {
        html.className += ' webkit';
    }
    
    // If Windows Google Chrome
    if (windows && /Chrome/i.test(ua)) {
        html.className += ' win-chrome';    
        return; // I return here because the User-Agent String displays BOTH Chrome and Safari, so if I find Chrome then don't continue
    }
    // If Google Chrome
    else if (/Chrome/i.test(ua)) {
        html.className += ' chrome';
        return; // I return here because the User-Agent String displays BOTH Chrome and Safari, so if I find Chrome then don't continue
    }    

    // If Windows Apple Safari
    if (windows && /Safari/i.test(ua)) {
        html.className += ' win-safari';
    }
    // If Apple Safari
    else if (/WebKit/i.test(ua)) {
        html.className += ' safari';
    }
    
    /*
        The browser specific CSS styles (for Opera or PC based Firefox/WebKit browsers) will only be applied if it sees the relevant class names added to the <html> element.
        Also, Safari doesn't seem to have a problem with some things that Chrome does, so I've had to test for specific WebKit browsers.
     */
}(window));