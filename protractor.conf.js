'use strict';

// Protractor configuration
var config = {
    troubleshoot: true,
    baseUrl: 'http://staging.nvipani.com/#!/',
    onPrepare: function () {
        browser.driver.manage().window().maximize();
    },
    suites: {},
    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        defaultTimeoutInterval: 360000
    }
};
/*config.capabilities = {
    //browserName: 'chrome',
    browserName: 'chrome',
        /!*
         * Can be used to specify the phantomjs binary path.
         * This can generally be ommitted if you installed phantomjs globally.
         *!/
        'phantomjs.binary.path': require('phantomjs-prebuilt').path,

        /!*
         * Command line args to pass to ghostdriver, phantomjs's browser driver.
         * See https://github.com/detro/ghostdriver#faq
         *!/
        'phantomjs.ghostdriver.cli.args': ['--loglevel=Error']
};*/



config.multiCapabilities = [
    { browserName: 'chrome' }
];
exports.config = config;
