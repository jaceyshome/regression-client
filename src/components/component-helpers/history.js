import _ from 'lodash';

/**
 * History helper class
 */
class History {

    static sortHistory (histories) {
        return _.orderBy(histories, ['weight'],['desc']);
    }

}

export {History};