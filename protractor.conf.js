'use strict';

var config = {
    troubleshoot: true,
    baseUrl: 'http://staging.nvipani.com/#!/',
    onPrepare: function() {
        browser.driver.manage().window().maximize();
    },
    suites: {
<<<<<<< HEAD
        suite1: ['js file1',
            'js file 2',
            'js file 3'],

        suite2: ['js file1',
            'jsfile2']
||||||| merged common ancestors
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
=======
        "Account": ['ee/ee/account/signup/signup.js',
            'ee/ee/account/signin/signin.js',
            'ee/ee/account/signin/forgotpassword.js'
        ]
>>>>>>> Account
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
