import _ from 'lodash';
import queryString from 'query-string';
import DataService from './data-service';

/**
 * Application state services, manage features' states
 * includes:
 *  1. showing the details of a history (current history)
 *  2. control url query parameters
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
                //reset index to 0
                this._currentTestIndex = parseInt(m.route.param('test')) || 0;
                //set current visual test as the first visual test
                if(!_.isEmpty(DataService.getCurrentHistory().visualTests)){
                    DataService.setCurrentVisualTest(DataService.getCurrentHistory().visualTests[this._currentTestIndex]);
                    DataService.setCurrentVisualTestReference(DataService.getCurrentVisualTest());
                }
                //Update url parameters
                this.updateRouteParams({
                    history: result._id,
                    test: this._currentTestIndex,
                });

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
            this.updateRouteParams();
        }

    }

    setNextVisualTest() {
        if(!_.isEmpty(DataService.getCurrentHistory().visualTests) &&
            DataService.getCurrentHistory().visualTests.length !== this._currentTestIndex + 1 ){
            this._currentTestIndex = this._currentTestIndex + 1;
            DataService.setCurrentVisualTest(DataService.getCurrentHistory().visualTests[this._currentTestIndex]);
            DataService.setCurrentVisualTestReference(DataService.getCurrentVisualTest());
            this.updateRouteParams();
        }
    }

    /**
     * Update route parameters
     * @param {Object} params 
     */
    updateRouteParams(params={
        history : DataService.getCurrentHistory()._id,
        test : this._currentTestIndex,
    }) {
        let location = m.route.get().replace(/\?(.*)/g, '');
        m.route.set(`${location}?${queryString.stringify(params)}`);
    }

    getCurrentTestIndex() {
        return this._currentTestIndex;
    }

    getNextTestIndex() {
        let length = DataService.getCurrentHistory().visualTests.length;
        return length !== this._currentTestIndex + 1 ? this._currentTestIndex + 1 : length;
    }

    approveCurrentTest() {
        this.hideDetailsPanel();
        return new Promise((resolve, reject)=>{
            DataService.approveTest(DataService.getCurrentVisualTest()).then((result)=> {
                this.setNextVisualTest();
                resolve(result);
            }).catch(reject);
        });
    }

    showDetailsPanel() {
        DataService.setDetailsPanelVisibility(true);
    }

    hideDetailsPanel() {
        DataService.setDetailsPanelVisibility(false);
    }

    showHistoryListMenu() {
        DataService.setHistoryListMenuVisibility(true);
    }

    hideHistoryListMenu() {
        DataService.setHistoryListMenuVisibility(false);
    }


}

module.exports = new StateService();

