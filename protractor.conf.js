'use strict';

// Protractor configuration
var config = {
    troubleshoot: true,
    baseUrl: 'http://staging.nvipani.com/#!/',
    onPrepare: function () {
        browser.driver.manage().window().maximize();
        /* browser.get('#!/register');*/
        /* browser.get('!#/register');*/
    },
    suites: {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        registration: ['ee/ee/account/signup/*.js',
            'ee/ee/account/signin/*.js'],
        contacts: ['e2e/contacts/createcontact/*.spec.js*',
            'e2e/contacts/editcontact/*.spec.js*',
            'e2e/contacts/creategroup/*.spec.js*'],
        products: ['e2e/products/createproduct/*.spec.js',
            'e2e/products/editproduct/*.spec.js',
            'e2e/products/importproducts/*.spec.js'],
        all: ['e2e/account/signup/*.spec.js',
            'e2e/account/signin/*.spec.js',
            'e2e/products/createproduct/*.spec.js',
            'e2e/products/editproduct/*.spec.js',
            'e2e/products/importproducts/*.spec.js',
            'e2e/contacts/createcontact/*.spec.js*',
            'e2e/contacts/editcontact/*.spec.js*',
            'e2e/contacts/creategroup/*.spec.js*',
            'e2e/businessuser/createbusinessuser/*.spec.js*',
            'e2e/businessuser/editbusinessuser/*.spec.js*',
            'e2e/businessunit/createbusinessunit/*.spec.js*',
            'e2e/businessunit/editbusinessunit/*.spec.js*',
            'e2e/updatecompanyinfo/*.spec.js*']
||||||| parent of 39ae980... Integrate all modules of account into conf file
        registration: ['ee/ee/account/signup/*.js',
            'ee/ee/account/signin/*.js'],
        contacts: ['e2e/contacts/createcontact/*.js*',
            'e2e/contacts/editcontact/*.js*',
            'e2e/contacts/creategroup/*.js*'],
        products: ['e2e/products/createproduct/*.js',
            'e2e/products/editproduct/*.js',
            'e2e/products/importproducts/*.js'],
        all: ['e2e/account/signup/*.js',
            'e2e/account/signin/*.js',
            'e2e/products/createproduct/*.js',
            'e2e/products/editproduct/*.js',
            'e2e/products/importproducts/*.js',
            'e2e/contacts/createcontact/*.js*',
            'e2e/contacts/editcontact/*.js*',
            'e2e/contacts/creategroup/*.js*',
            'e2e/businessuser/createbusinessuser/*.js*',
            'e2e/businessuser/editbusinessuser/*.js*',
            'e2e/businessunit/createbusinessunit/*.js*',
            'e2e/businessunit/editbusinessunit/*.js*',
            'e2e/updatecompanyinfo/*.js*']
=======
        registration: ['ee/ee/account/signup/signup.js',
||||||| parent of 196e523... Fix suite name in conf file
        registration: ['ee/ee/account/signup/signup.js',
=======
        account: ['ee/ee/account/signup/signup.js',
>>>>>>> 196e523... Fix suite name in conf file
            'ee/ee/account/signin/signin.js',
            'ee/ee/account/signin/forgotpassword.js'
||||||| parent of 651c742... Temporary Changes to Integrate Contacts Suite
        account: ['ee/ee/account/signup/signup.js',
            'ee/ee/account/signin/signin.js',
            'ee/ee/account/signin/forgotpassword.js'
=======
        account: ['ee/ee/account/signup/signup.js'
            //'ee/ee/account/signin/signin.js',
            //'ee/ee/account/signin/forgotpassword.js'
>>>>>>> 651c742... Temporary Changes to Integrate Contacts Suite
        ],
>>>>>>> 39ae980... Integrate all modules of account into conf file
    },
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
