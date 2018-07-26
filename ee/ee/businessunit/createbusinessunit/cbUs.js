var config = browser.params;

describe('Add Business User',function () {

    var i=0;
    var data=require('./cbUser');
    var sign=require('../../account/common/sign.common');

    var tab=element(by.xpath('//md-tab-item[text()=\'Business Users\']'));
    var addBusinessUser=element(by.id('add-business-user'));
    var userGroup=element(by.xpath('//md-select[@ng-model=\'businessUser.userGroup\']'));
    var emailId=element(by.model('businessUser.username'));
    var createBusinessUser=element(by.id('create-business-user'));
    var verifyBusinessUser=element(by.xpath('//div[@data-ng-show=\'success\' and ../../../@name=\'addBusinessUserForm\']'));
    var closeButton=element(by.id('close-add-business-user'));

    beforeAll(function () {
        browser.get('');
        sign.login(data[0]);
        sign.companyProfile();
    });

    beforeEach(function () {
        tab.click();
    });

    afterEach(function () {
        browser.refresh();
    });

    afterAll(function () {
        sign.logout();
    });

    function userGroupFunction(Usergroup,done){
        userGroup.click();
        //console.log(Usergroup)
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

    function VerifyBusinessUser(password){

        //var EC = protractor.ExpectedConditions;
        //browser.wait(EC.visibilityOf(verifyBusinessUser), 5000);

        verifyBusinessUser.getText().then(function (txt) {
            console.log('hi');
            var text = txt.split(". ");
            text.then(function (slices) {
                console.log('hey');
                var verify=slices[1].split(" is");
                console.log(verify[0]);
                closeButton.click();
                sign.logout();
                browser.getCurrentUrl().then(function () {
                    browser.set(verify[0]);
                    var passWord = element(by.id('businessuserpassword'));
                    browser.wait(EC.visibilityOf(passWord), 5000);
                    passWord.sendKeys(password);
                    var activateButton=element(by.id('activate'));
                    activateButton.click();
                    sign.logout();
                });
            });
        });
    }

    function checkUser()
    {
        console.log("enteredd");
        alreadyUsedUser=element(by.xpath('//mvard-toast[.//span[contains(text(),\'User is already used for some other company\')]]'));
        alreadyUsedUser.isPresent().then(function (res) {
            if(res){
                console.log("User is already used for some other company");
            }
            else {
                if (data.password && (data.password.length > 7)) {
                    //browser.sleep(5000);
                    VerifyBusinessUser(data.password);
                    sign.login(data[0]);
                    sign.companyProfile();
                }
            }
        });
    }

    data.forEach(function (data) {
        console.log("Test "+i);
        i++;
        it('should add a Business User', function () {
            addBusinessUser.click();    
            userGroupFunction(data.usergroup,function (error,ele) {
                if(error){
                    console.log(error);
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
                            
                            var alreadyUsedUser=element(by.xpath('//md-toast[.//span[contains(text(),\'User is already used for some other company\')]]'));
                            var EC = protractor.ExpectedConditions;

                            browser.driver.wait(function () {
                                browser.wait(EC.visibilityOf(alreadyUsedUser), 10000);
                                if(alreadyUsedUser)
                                {
                                    console.log("User already present");
                                }
                            });

                            /*alreadyUsedUser.isPresent().then(function (res) {
                                if(res){
                                    console.log("User is already used for some other company");
                                }
                                else {
                                    if (data.password && (data.password.length > 7)) {
                                        browser.sleep(5000);
                                        VerifyBusinessUser(data.password);
                                        sign.login(data[0]);
                                        sign.companyProfile();
                                    }
                                }
                            });*/

                        
                            
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
