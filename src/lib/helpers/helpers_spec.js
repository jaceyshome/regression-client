import { Helpers } from './helpers';
import { Utils } from '../../../spec/utils';
import 'chromedriver';      //Import browser drivers
import webdriver  from 'selenium-webdriver';

const url = 'http://localhost:9000/demo/spec/filter-component/dates-filter-component.html';

describe("/src/js/helpers/helpers", () => {

    let driver = null;

    beforeEach((done) => {

        //mock current date and time
        // jasmine.clock().mockDate(MockConstants.CURRENT_DATE);
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();

        //Set window size & load page
        driver.manage().window().setSize(1280, 1024);
        driver.get(url).then(done);
    });

    afterEach( (done) => {
        driver.quit().then(done);
    });


    /** @test {Booleans} */
    describe("Booleans Class", () => {

        /** @test {Booleans#isTruthyValue} */
        describe("isTruthyValue", () => {
            it("It should return true if the value is 'truthy'.", () => {
                expect(Helpers.Booleans.isTruthyValue(0)).toBe(true);
                expect(Helpers.Booleans.isTruthyValue(123)).toBe(true);
                expect(Helpers.Booleans.isTruthyValue("test")).toBe(true);
                expect(Helpers.Booleans.isTruthyValue(new Date())).toBe(true);
            });

            it("It should return false if the value is not 'truthy'.", () => {
                expect(Helpers.Booleans.isTruthyValue(null)).toBe(false);
                expect(Helpers.Booleans.isTruthyValue(undefined)).toBe(false);
                expect(Helpers.Booleans.isTruthyValue(NaN)).toBe(false);
                expect(Helpers.Booleans.isTruthyValue("")).toBe(false);
            });
        });

    });

    /** @test {Browser} */
    describe("Browser Class", () => {

        /** @test {Browser#getAgent} */
        describe("getAgent", () => {
            it("It should return testing browser version.", () => {
                expect( Helpers.Browser.getAgent() ).toEqual(`${Utils.Browser.getBrowser().name} ${Utils.Browser.getBrowser().version}`);
            });
        });

    });

    /** @test {Colors} */
    describe("Colors Class", () => {

        /** @test {Colors#rgb2rgba} */
        describe("rgb2rgba", () => {
            it("It should convert rgb color to rgba color.", () => {
                expect( Helpers.Colors.rgb2rgba('rgb(85,85,85)', 0.5) ).toEqual("rgba(85,85,85, 0.5)");
            });

            it("It should return null if rgb is null.", () => {
                expect( Helpers.Colors.rgb2rgba(null, 0.5) ).toEqual(null);
                expect( Helpers.Colors.rgb2rgba('', 0.5) ).toEqual(null);
            });
        });

        /** @test {Colors#hex2rgb} */
        describe("hex2rgb", () => {
            it("It should covert hex code to rgb color.", () => {
                expect( Helpers.Colors.hex2rgb("#FFF000") ).toEqual("rgb(255,240,0)");
                expect( Helpers.Colors.hex2rgb("#fff") ).toEqual("rgb(255,255,255)");
                expect( Helpers.Colors.hex2rgb("FFF") ).toEqual("rgb(255,255,255)");
                expect( Helpers.Colors.hex2rgb("123") ).toEqual("rgb(17,34,51)");
            });

            it("It should return null if hex code is null.", () => {
                expect( Helpers.Colors.hex2rgb(null) ).toEqual(null);
                expect( Helpers.Colors.hex2rgb('') ).toEqual(null);
            });

            it("It should return null for invalid hex code.", () => {
                expect( Helpers.Colors.hex2rgb("FF12") ).toEqual(null);
            });
        });

        /** @test {Colors#rgb2hex} */
        describe("hex2rgb", () => {
            it("It should covert rgb color to hex color.", () => {
                expect( Helpers.Colors.rgb2hex(175,210,80) ).toEqual("#afd250");
            });

            it("It should return null for missing one of the colours.", () => {
                expect( Helpers.Colors.rgb2hex(175) ).toEqual(null);
                expect( Helpers.Colors.rgb2hex(null,210) ).toEqual(null);
                expect( Helpers.Colors.rgb2hex(null,null,80) ).toEqual(null);
                expect( Helpers.Colors.rgb2hex() ).toEqual(null);
            });

            it("It should return null for invalid colour code.", () => {
                expect( Helpers.Colors.rgb2hex(256,255,255) ).toEqual(null);
                expect( Helpers.Colors.rgb2hex(255,256,255) ).toEqual(null);
                expect( Helpers.Colors.rgb2hex(255,255,256) ).toEqual(null);
                expect( Helpers.Colors.rgb2hex(-1,255,255) ).toEqual(null);
                expect( Helpers.Colors.rgb2hex(255,-1,255) ).toEqual(null);
                expect( Helpers.Colors.rgb2hex(255,255,-1) ).toEqual(null);
            });

        });

        /** @test {Colors#colorLuminance} */
        describe("colorLuminance", () => {
            it("It should change color luminance with valid hex code and lum.", () => {
                expect( Helpers.Colors.colorLuminance("#FFFFFE", -0.5) ).toEqual("#80807f");
                expect( Helpers.Colors.colorLuminance("#FFF", -0.2) ).toEqual("#cccccc");
                expect( Helpers.Colors.colorLuminance("#fFf", -0.3) ).toEqual("#b3b3b3");
                expect( Helpers.Colors.colorLuminance("#aaa", 0.2) ).toEqual("#cccccc");
                expect( Helpers.Colors.colorLuminance("#fffeee", 0.1) ).toEqual("#ffffff");
            });

            it("It should return null for invalid hex code.", () => {
                expect( Helpers.Colors.colorLuminance(null, -0.5) ).toEqual(null);
            });

            it("It should return null if luminance is out of the range from -1 to 1.", () => {
                expect( Helpers.Colors.colorLuminance("aaa", -1.1) ).toEqual(null);
                expect( Helpers.Colors.colorLuminance("aaa", 1.1) ).toEqual(null);
            });

        });

    });

    /** @test {Numbers} */
    describe("Numbers Class", () => {

        /** @test {Numbers#isNumber} */
        describe("isNumber", () => {
            it("It should return true if the value is number.", () => {
                expect(Helpers.Numbers.isNumber(+123)).toBe(true);
                expect(Helpers.Numbers.isNumber(123)).toBe(true);
                expect(Helpers.Numbers.isNumber("123")).toBe(true);
            });

            it("It should return true if the number is negative.", () => {
                expect(Helpers.Numbers.isNumber(-123)).toBe(true);
                expect(Helpers.Numbers.isNumber("-123")).toBe(true);
            });

            it("It should return false if the value is not 'truthy'.", () => {
                expect(Helpers.Numbers.isNumber(null)).toBe(false);
                expect(Helpers.Numbers.isNumber(undefined)).toBe(false);
                expect(Helpers.Numbers.isNumber(NaN)).toBe(false);
                expect(Helpers.Numbers.isNumber("")).toBe(false);
                expect(Helpers.Numbers.isNumber("#@")).toBe(false);
            });
        });

        /** @test {Numbers#stripNonNumericCharacters} */
        describe("stripNonNumericCharacters", () => {
            it("It should return a 10 bit float point number.", () => {
                expect(Helpers.Numbers.stripNonNumericCharacters("abc123.80<blah>")).toEqual(123.8);
                expect(Helpers.Numbers.stripNonNumericCharacters("abc123.00<blah>")).toEqual(123);
            });

            it("It should support negative number.", () => {
                expect(Helpers.Numbers.stripNonNumericCharacters("<span>-12</span>")).toEqual(-12);
            });
        });

    });

    /** @test {Strings} */
    describe("Strings Class", () => {

        /** @test {Strings#random} */
        describe("random", () => {
            it("It should return a random string.", () => {
                expect( Helpers.Strings.random() === Helpers.Strings.random() ).toBe(false);
            });

            it("It should return a random string, the default length is the maximum 12.", () => {
                expect( Helpers.Strings.random().length ).toEqual(12);
            });

            it("It should return a random string with the input length.", () => {
                expect( Helpers.Strings.random(8).length ).toEqual(8);
                expect( Helpers.Strings.random(12).length ).toEqual(12);
            });

            it("When the input length is larger than the maximum 12, it should return a random string with the maximum length 12.", () => {
                expect( Helpers.Strings.random(16).length ).toEqual(12);
            });
        });

        /** @test {Strings#truncate} */
        describe("truncate", () => {
            it("It should truncate a string.", () => {
                expect( Helpers.Strings.truncate("Maecenas tempus tellus eget condimentum", 12) ).toEqual("Maecenas...");
                expect( Helpers.Strings.truncate("Maecs to tellus eget condimentum", 12, false) ).toEqual("Maecs to...");
            });
        });

    });

    /** @test {URI} */
    describe("URI Class", () => {

        let param = {
            category: "administration",
            topic: "honnours"
        };

        afterEach(() => {
            Helpers.URI.setUriParams("");
        });

        /** @test {URI#getParams} */
        describe("getParams", () => {

            it("It should return url query params.", () => {

                Helpers.URI.setUriParams("category=administration&topic=honnours");
                expect( Helpers.URI.getParams() ).toEqual(param);
            });

        });

        /** @test {URI#setUriParams} */
        describe("setUriParams", () => {
            it("It should return a random string.", () => {

                Helpers.URI.setUriParams("category=administration&topic=honnours");
                expect( Helpers.URI.getParams() ).toEqual(param);

            });

        });

    });

    /** @test {Dates} */
    describe("Dates Class", () => {

    });

});
