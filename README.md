# nVipani
Protractor Test Cases for the nVipani Website 

To execute test cases, use the **protractor.conf.js** in the root directory.
The command to execute the conf file is 
 
 ## `protractor protractor.conf.js`
 
The conf file has a suite enabled for each branch. Enter the suite you want to execute. 

```
suites: {
        "Account": ['ee/ee/Account/signin/signin.js',
            'ee/ee/Account/signin/forgotpassword.js',
            'ee/ee/Account/signup/signup.js'
        ]
    }
``` 
The following suite will execute signin.js, signup.js and forgotpassword.js from the Accounts section. 
 
#### *Note - Multiple Suites can be used. Since suites is a json object, the suites must be seperated by commas.Each suite must be an array with the list of files with full relative path* 
 
 Each file has it's own test cases. But each suite is modular and can be run indivudal of other suites. Hence for each run,you may encounter multiple test cases from different files but under the same suite. If you want to run multiple suites, include them in the conf file of the master branch
