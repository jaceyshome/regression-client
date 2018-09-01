import _ from 'lodash';
import queryString from 'query-string';
import DataService from './data-service';

/**
 * Application state services, manage features' states
 * including showing the details of a history (current history)
 */
class StateService {

    constructor() {
        this._currentTestIndex = 0;
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
                return;
            }

            DataService.setCurrentHistory(candidate._id).then((result)=> {

                if(result && result._id) {
                    const parsed = {history: result._id};
                    let location = m.route.get().replace(/\?(.*)/g, '');
                    m.route.set(`${location}?${queryString.stringify(parsed)}`);
                }

                //reset index to 0
                this._currentTestIndex = 0;

                //set current visual test as the first visual test
                if(!_.isEmpty(DataService.getCurrentHistory().visualTests)){
                    DataService.setCurrentVisualTest(DataService.getCurrentHistory().visualTests[this._currentTestIndex]);
                    DataService.setCurrentVisualTestReference(DataService.getCurrentVisualTest());
                }
                resolve(DataService.getCurrentHistory());

            }).catch((err)=> {
                console.warn('StateService.setCurrentHistory err', err);
                reject(err);
            });
        });

    }

    setPreviousVisualTest() {
        if(!_.isEmpty(DataService.getCurrentHistory().visualTests) && this._currentTestIndex !== 0){
            this._currentTestIndex = this._currentTestIndex - 1;
            DataService.setCurrentVisualTest(DataService.getCurrentHistory().visualTests[this._currentTestIndex]);
            DataService.setCurrentVisualTestReference(DataService.getCurrentVisualTest());
        }
    }

    setNextVisualTest() {
        if(!_.isEmpty(DataService.getCurrentHistory().visualTests) &&
            DataService.getCurrentHistory().visualTests.length !== this._currentTestIndex + 1 ){
            this._currentTestIndex = this._currentTestIndex + 1;
            DataService.setCurrentVisualTest(DataService.getCurrentHistory().visualTests[this._currentTestIndex]);
            DataService.setCurrentVisualTestReference(DataService.getCurrentVisualTest());
        }
    }

    approveCurrentTest() {
        return DataService.approveTest(DataService.getCurrentVisualTest()).then(()=> this.setNextVisualTest());
    }
}

module.exports = new StateService();

