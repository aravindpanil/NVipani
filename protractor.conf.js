'use strict';

var config = {
    troubleshoot: true,
    baseUrl: 'http://staging.nvipani.com/#!/',
    onPrepare: function() {
        browser.driver.manage().window().maximize();
    },
    suites: {
        notification: ['ee/ee/notification/user.js',
            'ee/ee/notification/unit.js']
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
