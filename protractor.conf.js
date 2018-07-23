'use strict';

var config = {
    troubleshoot: true,
    baseUrl: 'http://staging.nvipani.com/#!/',
    onPrepare: function() {
        browser.driver.manage().window().maximize();
    },
    suites: {
        suite1: ['js file1',
            'js file 2',
            'js file 3'],

        suite2: ['js file1',
            'jsfile2']
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
