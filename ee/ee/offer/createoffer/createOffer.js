'use strict';

var config = browser.params;

describe('Create an Offer', function () {

    var data = require('./createofferdata');
    var sign = require('../../account/common/sign.common');
    var fs = require('fs');
    var selectedData = require('./selectedProducts');
    var continueButton = element(by.xpath('//button[@aria-label=\'Continue\' and @aria-hidden=\'false\']'));
    var i = 0;
    beforeAll(function () {
        browser.get('');
        sign.login(data[0]);
    });

    beforeEach(function () {
        element(by.id('nav-products')).click();

    });

    afterEach(function () {
        browser.sleep(1000);
    });

    afterAll(function(){
        browser.sleep(100);
        sign.logout();

    });

    function selectProductFunction(productDetails, done) {

        if (productDetails) {

            selectedData = [];
            productDetails.forEach(function (product) {
                var selectProduct = element(by.xpath('//*[@ng-model=\'inventory.selected\' and ../..//h5[text()=\'' + product.productName + ' - ' + product.productUOM + '\'] and ../..//h6[text()=\'' + product.productBrand + '\']]'));
                if (product.productName && product.productBrand && product.productUOM) {
                    selectProduct.isPresent().then(function (res) {
                        if (res) {

                            selectProduct.click();
                            //console.log("Selecteddd");

                            /*selectedData.push({
                                productName: product.productName,
                                productBrand: product.productBrand,
                                productUOM: product.productUOM,
                                productQuantity: product.productQuantity
                            });
                            fs.writeFile('./selectedProducts.json', JSON.stringify(selectedData), 'utf-8', function (err) {
                                if (err) throw err;
                            });*/
                        }
                        else
                            done("Invalid details for Product-" + productDetails.indexOf(product), selectProduct);
                    });
                }
                else
                    done("Missing details for Product-" + productDetails.indexOf(product), selectProduct);
            });
            done(null, null);
        }
        else
            done("Missing ProductDetails", null);
    }

    function dateConversion(date) {
        var slices = date.split("-");
        var convertedDate = slices[2] + "-" + slices[1] + "-" + slices[0];
        return convertedDate;
    }

    function offerDetailsFunction(name, type, validity, done) {
        //console.log(validity)
        if (name) {
            var offername = element(by.model('offerName'));
            offername.sendKeys(name);

            if (type) {
                //console.log("enteredd type")
                var offertype = element(by.xpath('//h5[text()=\'' + type + '\' and ../@aria-hidden=\'false\']'));
                offertype.isPresent().then(function (res) {
                    if (res) {
                        offertype.click();
                        //console.log("type clicked")
                        if (validity) {
                            if (validity.validFrom && validity.validTill) {
                                //console.log("enteredddd");
                                var today = new Date();
                                var from = new Date(dateConversion(validity.validFrom));
                                var till = new Date(dateConversion(validity.validTill));
                                if (from <= today && from <= till) {
                                    var setvalidity = element(by.xpath('//md-checkbox[@aria-label=\'offer validation\']'));
                                    setvalidity.click();
                                    var validFrom = element(by.model('validFrom')).element(by.xpath('.//input[@class=\'md-datepicker-input\']'));
                                    validFrom.clear().then(function () {
                                        validFrom.sendKeys(validity.validFrom);
                                    });
                                    var validTill = element(by.model('validTill')).element(by.xpath('.//input[@class=\'md-datepicker-input\']'));
                                    validTill.clear().then(function () {
                                        validTill.sendKeys(validity.validTill);
                                    });
                                }
                            }
                        }

                        continueButton.click();

                        done(null, null);
                    }
                    else
                        done("Invalid Offer Type", offertype);
                });
            }
            else
                done("Missing Offer Type", null);
        }
        else
            done("Missing Offer Name", null);
    }

    function selectQuantityFunction(type) {
        if (type === "Buy") {
            selectedData.forEach(function (product) {
                var stock = element(by.xpath('//input[@ng-model=\'product.numberOfUnits\' and ../..//h5[text()=\'' + product.productName + ' - ' + product.productUOM + '\'] and ../..//h6[text()=\'' + product.productBrand + '\']]'));
                if (product.productQuantity && !isNaN(product.productQuantity) && product.productQuantity > 0) {
                    stock.clear().then(function () {
                        stock.sendKeys(product.productQuantity);
                    });
                }
            });
        }

        continueButton.click();
    }

    function selectContacts(contacts) {
        contacts.forEach(function (contact) {
            var search = element(by.xpath('//input[@aria-label=\'Search for Contacts ,Groups\']'));
            search.sendKeys(contact);
            var selectcontact = element(by.xpath('//li[.//text()=\'' + contact + '\']'));
            selectcontact.isPresent().then(function (res) {
                if (res)
                    selectcontact.click();
            });
        });
    }

    function visibilityFunction(visibility, contacts, businessUnits, done) {
        if (visibility) {

            var selectvisibility = element(by.xpath('//h5[text()=\'' + visibility + '\']'));
            selectvisibility.isPresent().then(function (res) {
                if (res) {
                    selectvisibility.click();

                    if (visibility === 'BusinessUnit') {
                        var businesscontact = element(by.xpath('//md-select[@ng-model=\'businessContacts\']'));
                        businesscontact.click();
                        if (businesscontact.isPresent() && businesscontact.isDisplayed()) {
                            if (businessUnits) {
                                var lastTerm;
                                businessUnits.forEach(function (businessContact) {
                                    lastTerm = businessContact
                                    browser.sleep(5000);
                                    var selectbusinescontact = element(by.xpath('//md-option[.//text()=\'' + businessContact + '\'and @aria-hidden=\'false\']'));
                                    selectbusinescontact.isPresent().then(function (res) {
                                        if (res)
                                            selectbusinescontact.click();

                                    });

                                });
                                element(by.xpath('//md-option[.//text()=\'' + lastTerm + '\'  and @aria-hidden=\'false\']')).sendKeys(protractor.Key.ESCAPE);
                            }
                        }

                        continueButton.click();

                        done(null, null);
                    }
                    else {
                        if (contacts)
                            selectContacts(contacts);

                        continueButton.click();

                        if (visibility === 'Private') {
                            var privateoffervalidation = element(by.xpath('//*[@ng-model=\'selectedContacts\']//strong'));
                            privateoffervalidation.isPresent().then(function (res) {
                                if (res)
                                    done(null, null);
                                else
                                    done('At least one Contact is required to Open Private offer', privateoffervalidation);
                            });
                        }
                        else
                            done(null, null);
                    }
                }
                else
                    done("Invalid Visibility", selectvisibility);
            });
        }
        else {
            if (contacts)
                selectContacts(contacts);

            continueButton.click();

            done(null, null);
        }
        //console.log("Finished");

    }

    function paymentFunction(paymentTerms, paymentModes) {
        if (paymentTerms) {
            var paymentterms = element(by.model('paymentTerms'));
            paymentterms.click();
            if (paymentTerms && paymentterms.isPresent() && paymentterms.isDisplayed()) {
                var lastTerm;
                paymentTerms.forEach(function (term) {
                    lastTerm = term;
                    var selectpaymentterm = element(by.xpath('//md-option[.//text()=\'' + term + '\' and @aria-hidden=\'false\']'));
                    browser.driver.executeScript("arguments[0].scrollIntoView();", selectpaymentterm.getWebElement());
                    selectpaymentterm.click();
                    //console.log("clickedd "+term);
                });
                element(by.xpath('//md-option[.//text()=\'' + lastTerm + '\' ]')).sendKeys(protractor.Key.ESCAPE);
            }
        }


        if (paymentModes) {
            //browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
            var paymentmodes = element(by.model('paymentModes'));
            paymentmodes.click();
            //console.log("Clicked Payment mode");
            if (paymentModes && paymentmodes.isPresent() && paymentmodes.isDisplayed()) {
                var lastTerm;
                paymentModes.forEach(function (mode) {
                    lastTerm = mode;
                    var selectpaymentmode = element(by.xpath('//md-option[.//text()=\'' + mode + '\' and @aria-hidden=\'false\']'));
                    browser.driver.executeScript("arguments[0].scrollIntoView();", selectpaymentmode.getWebElement());
                    selectpaymentmode.click();
                });
                element(by.xpath('//md-option[.//text()=\'' + lastTerm + '\']')).sendKeys(protractor.Key.ESCAPE);
            }
        }
    }

    data.forEach(function (data) {
        it('should create an offer', function () {
            console.log("Test" + i)
            i++;
            selectProductFunction(data.productDetails, function (error, ele) {
                if (error) {
                    console.log(error);
                    return;
                }


                var createOffer = element(by.xpath('//button[@aria-label=\'Create Offer\' and @aria-expanded=\'false\']'));
                sign.isClickable(createOffer, function (error, ele) {
                    if (ele) {

                        createOffer.click();
                        var selectType = element(by.xpath('//button[@aria-label=\'' + data.offerType + '\']'))
                        selectType.click();
                        offerDetailsFunction(data.offerName, data.offerType, data.validity, function (error, ele) {
                            if (error) {
                                console.log(error);
                                return;
                            }

                            selectQuantityFunction(data.offerType);

                            visibilityFunction(data.visibility, data.contacts, data.businessUnits, function (error, ele) {
                                if (error) {
                                    console.log(error);
                                    return;
                                }

                                paymentFunction(data.paymentTerms, data.paymentModes);

                                var placeOffer = element(by.xpath('//button[@aria-label=\'Place Offer\']'));
                                //browser.driver.executeScript("arguments[0].scrollIntoView();", placeOffer.getWebElement());
                                placeOffer.click();
                            });
                        });
                    }
                    else
                        console.log("Select atleast one Product");
                });
            });
        });
    });
});
