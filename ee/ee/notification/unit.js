
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
                });
            });

        });
    });
});
