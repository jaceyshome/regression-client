import StateService from '../service/state-service';
import DataService from '../service/data-service';

class LandingPageModel {

    constructor() {
        this._isReady = false;
    }

    initState() {
        return new Promise((resolve, reject)=> {
            DataService.fetchConfig().then(()=>{
                DataService.fetchHistoryList().then((results)=> {
                    StateService.setCurrentHistory(results[0]).then((history)=> {
                        this._isReady = true;
                        resolve(results);
                    });
                });
            });

        });
    }

    isReady() {
        return this._isReady;
    }
}

module.exports = new LandingPageModel();
