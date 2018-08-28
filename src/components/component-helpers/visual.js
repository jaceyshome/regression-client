import _ from 'lodash';

/**
 * Visual helper class
 */
class Visual {

    static sortTestResults (tests) {
        return _.sortBy(tests, ['pass']);
    }

    static findTestReference(test, references) {
        return references.find((reference)=> Object.is(reference.visualScreenshot, test.visualScreenshot));
    }
}

export {Visual};