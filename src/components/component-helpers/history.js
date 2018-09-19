import _ from 'lodash';

/**
 * History helper class
 */
class History {

    static sortHistory (histories) {
        return _.orderBy(histories, ['weight'],['desc']);
    }

    static getHistoryFailedTests(history) {
        return history.visualTests.filter((test)=> {
            return test.pass === false;
        });
    }
}

export {History};
