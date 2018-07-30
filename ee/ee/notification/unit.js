
'use strict';

var config = browser.params;

describe('Create Business User', function () {

    var i = 0;
    var data = require('./cbu');
    var sign = require('../account/common/sign.common');
    var tab = element(by.xpath('//md-tab-item[text()=\'Business Units\']'));
    var addBunit = element(by.id('add-business-unit'));
    var incharge = element(by.id('addBunitIncharge'));
    var BunitName = element(by.model('businessUnit.name'));
    var createBunit = element(by.id('createBunit'));

    beforeAll(function(){
        browser.get('');
    })

    afterEach(function () {
        browser.sleep(1000);
        sign.logout();
    });

    function BunitNameFunction(bunitName, done) {
        if (bunitName) {
            BunitName.sendKeys(bunitName);
            done(null, null);
        }
        else
            done("Missing Business Unit Name", BunitName);
    }

    function inchargeFunction(Incharge, done) {
        incharge.click();
        if (Incharge) {
            var op = element(by.id(Incharge));
            op.isPresent().then(function (res) {
                if (res) {
                    op.click();
                    done(null, null);
                }
                
                else {
                    console.log("Using default incharge as" + Incharge + " not a business user");
                    var option = element(by.id(data[0].username));
                    option.click();
                    done(null, null);
                }
            });
        }
        else {
            var option = element(by.id(data[0].username));
            option.click();
            done(null, null);
        }
    }
    
    function addUsers(users,businessUnitName,done){
        if(users){
            var unitName=element(by.xpath('//td/span[contains(text(),\''+businessUnitName+' (RegisteredOffice)\')]'))
            sign.isClickable(unitName,function (error,ele) {
                if(ele) {
                    unitName.click();
                    done(null,null);
                }
                else
                    done(error,ele);
            });

            var buserTab=element(by.xpath('//md-tab-item[contains(text(),\'Business User\') and ..//md-tab-item[contains(text(),\'Basic Info\')]]'))
            buserTab.click();

            var addUnitUser=element(by.xpath('//button[@aria-label=\'addUnitUsers\']'))
            addUnitUser.click();
            
            var input=element(by.xpath('//input[@aria-label=\'Search for Users\']'))
            users.forEach(function(user){
                console.log(user);
                input.sendKeys(user);

                var selectuser=element(by.xpath('//li[.//text()=\''+user+'\']'));
                selectuser.isPresent().then(function (res) {
                if(res)
                    selectuser.click();
                });
                
                //li[.//text()='gs@g.com']
                
            })

            var addButton=element(by.xpath('//button[@aria-label=\'AddUser\' and @aria-hidden=\'false\']'))
            addButton.click();
            var updateButton=element(by.xpath('//button[@aria-label=\'Update\']'))
            updateButton.click();
        }
        else
        {
            done("No additional users")
        }

    }
    data.forEach(function (data) {

        it('should create a business unit', function () {
            sign.login(data);
            sign.companyProfile();
            tab.click();
            addBunit.click();
            console.log("Test case ", i);
            i++;

            BunitNameFunction(data.businessUnitName, function (error, ele) {
                if (error) {
                    console.log(error);
                    return;
                }

                inchargeFunction(data.incharge, function (error, ele) {
                    if (error) {
                        console.log(error);
                        return;
                    }
                    createBunit.click();
                    console.log("\n");

                    addUsers(data.users,data.businessUnitName,function(error,ele){
                        if(error){
                            console.log(error);
                            return;
                        }
                    });
                });
            });

        });
    });
});
