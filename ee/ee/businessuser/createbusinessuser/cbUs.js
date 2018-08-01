var config = browser.params;

describe('Add Business User',function () {

    var i=0;
    var data=require('./customData');
    var sign=require('../account/common/sign.common');

    var tab=element(by.xpath('//md-tab-item[text()=\'Business Users\']'));
    var addBusinessUser=element(by.id('add-business-user'));
    var userGroup=element(by.xpath('//md-select[@ng-model=\'businessUser.userGroup\']'));
    var emailId=element(by.model('businessUser.username'));
    var createBusinessUser=element(by.id('create-business-user'));
    var verifyBusinessUser=element(by.xpath('//div[@data-ng-show=\'success\' and ../../../@name=\'addBusinessUserForm\']'));
    //div[@data-ng-show='success' and ../../../@name='addBusinessUserForm']
    var closeButton=element(by.id('close-add-business-user'));

    beforeAll(function () {
    });

    beforeEach(function () {
        browser.get('');
        
    });

    afterEach(function () {
        //console.log("refreshedd")
        browser.sleep(1000);
        sign.logout()
    });

    afterAll(function () {
    });

    function VerifyBusinessUser(password,email){
        console.log("entereddd")
        var EC = protractor.ExpectedConditions;

        var uname=element(by.xpath('//td[contains(text(),\''+email+'\')]'))
        uname.click();
        var resendLink=element(by.xpath('//h6[@ng-click=\'resendLink()\']'))
        resendLink.click()
        var extractText=element(by.xpath('//div[@data-ng-show=\'success\']'))
        extractText.getText().then(function(txt){
            console.log(txt)
            var text=txt.split(" :");
            console.log(text)
            cancel=element(by.xpath('//button[@ng-click=\'cancel();\']'))
            cancel.click();
            sign.logout();
            browser.get(text[1]);
            var passWord = element(by.id('businessuserpassword'));
            browser.wait(EC.visibilityOf(passWord), 5000);
            passWord.sendKeys(password);
            var activateButton=element(by.id('activate'));
            activateButton.click();
            //sign.logout();
        });
        

        
    }

    function userGroupFunction(Usergroup,done){
        //console.log("gp anme")
        userGroup.click();
        if(Usergroup){
        if(userGroup.isDisplayed()){
            var selectusergroup=element(by.id(Usergroup));
            sign.isClickable(selectusergroup,function (error,ele) {
                if(ele) {
                    selectusergroup.click();
                    done(null,null);
                }
                else
                    done(error,ele);
            });
        }
        
        }
        else{
            //closeButton.click()
            done("missing type")
    }
    }
    function emailFunction(email,done){
        if(email){
            emailId.sendKeys(email);
            emailId.getAttribute('aria-invalid').then(function (attr) {
                if(attr === 'true')
                    emailId.clear().then(function () {
                        emailId.sendKeys('');
                        done("Invalid Email ",email);
                    });
                else
                    done(null,null);
            });
        }
        else
            done("Missing Email ");
    }

    data.forEach(function (data) {
        
        it('should add a Business User', function () {
            console.log("Test "+i);
            i++;
            browser.get('')
            sign.login(data)
            sign.companyProfile()
            tab.click();
            //VerifyBusinessUser(data.buserpwd,data.email)
            addBusinessUser.click();    
            userGroupFunction(data.usergroup,function (error,ele) {
                if(error){
                    console.log(error);
                    //closeButton.click()
                    sign.logout()
                    console.log("signed out")
                    return;
                }
                console.log("finished 1");

                emailFunction(data.email,function (error,ele) {
                    if(error){
                        console.log(error);
                        return;
                    }
                    console.log("finished 2");
                    sign.isClickable(createBusinessUser,function (error,ele) {
                        if(ele){
                            createBusinessUser.click();
                            console.log("button clickedd")
                            
                            //closeButton.click()
                            browser.sleep(5000);
                            VerifyBusinessUser(data.buserpwd,data.email)
                        }
                        else {
                            console.log(error);
                            return;
                        }
                        

                    });

                });
            });
        });
    });

});
