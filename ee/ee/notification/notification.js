'use strict';

var config = browser.params;

describe('Check for notification', function () {

    var i = 0;
    var data = require('./notifiationdata');
    var sign = require('../account/common/sign.common');
    

    beforeAll(function(){
        browser.get('');
    })

    afterEach(function () {
        browser.sleep(1000);
        sign.logout();
    });
    
    data.forEach(function (data) {

        it('should check ', function () {
            sign.login(data); 
            console.log(data.username)          
            console.log("Test case ", i);
            i++;

            var notifButton=element(by.xpath('//button[@aria-label=\'toggle-notification\']'));
            notifButton.click()
            var offer=element(by.xpath('//button[contains(@aria-label,\''+data.offername+'\')]'))
            offer.isDisplayed().then(function (result) {
                if(result)
                    console.log("Offer notified");
                else
                    console.log("Not notified");
            });
            element(by.xpath('//md-tab-item[contains(text(),\'Notification\')]')).sendKeys(protractor.Key.ESCAPE);
        });
    });
});
