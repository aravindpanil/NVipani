'use strict';

// Protractor configuration
var config = {
    troubleshoot: true,
    baseUrl: 'http://staging.nvipani.com/#!/',
    onPrepare: function () {
        browser.driver.manage().window().maximize();
    },
    suites: {
        business: ['ee/ee/businessunit/createbusinessunit/cb.js']
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