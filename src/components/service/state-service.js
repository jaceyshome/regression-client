import queryString from 'query-string';
import DataService from './data-service';

/**
 * Application state services, manage features' states
 * including showing the details of a history (current history)
 */
class StateService {

    constructor() {

    }

    /**
     * Replace or add the current history which all components are showing its details with the candidate history
     * @param {Object} candidate - history object
     */
    setCurrentHistory(candidate) {

        return new Promise((resolve, reject)=> {

            if( DataService.getCurrentHistory() &&
                Object.is(DataService.getCurrentHistory()._id, candidate._id)
            ) {
                resolve(DataService.getCurrentHistory());
            }

            DataService.setCurrentHistory(candidate._id).then((result)=> {
                if(result && result._id) {
                    const parsed = {history: result._id};
                    let location = m.route.get().replace(/\?(.*)/g, '');
                    m.route.set(`${location}?${queryString.stringify(parsed)}`);
                }
                resolve(DataService.getCurrentHistory());

            }).catch((err)=> {
                console.warn('StateService.setCurrentHistory err', err);
                reject(err);
            });
        });


    }



}

module.exports = new StateService();

