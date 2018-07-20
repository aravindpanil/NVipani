'use strict';

var config = {
    troubleshoot: true,
    baseUrl: 'http://staging.nvipani.com/#!/',
    onPrepare: function () {
        browser.driver.manage().window().maximize();
    },
    suites: {
        "Contact": [
            "/ee/ee/contact/groupactions/contactGroupActions.js"
        ]
    },

    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        defaultTimeoutInterval: 360000
    }
};

config.multiCapabilities = [
    { browserName: 'chrome' }
];

exports.config = config;