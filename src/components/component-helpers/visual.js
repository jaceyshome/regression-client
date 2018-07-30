import _ from 'lodash';

/**
 * Visual helper class
 */
class Visual {

    static sortTestResults (tests) {
        return _.sortBy(tests, ['pass']);
    }

}

export {Visual};