import StateService from './../service/state-service';
import DataService from './../service/data-service';


class LandingPageModel {

    constructor() {
        this._isReady = false;
    }

    initState() {

        return new Promise((resolve, reject)=> {
            DataService.fetchConfig().then(()=>{
                DataService.fetchHistoryList().then((results)=> {
                    let routingHistory = results.find((result) => Object.is(m.route.param('history'), result._id));

                    if(!routingHistory) {
                        routingHistory = results[0];
                    }

                    StateService.setCurrentHistory(routingHistory).then(()=> {
                        this._isReady = true;
                        resolve(results);
                    });
                }).catch(reject);
            });

        });
    }

    isReady() {
        return this._isReady;
    }

    _getHistory(histories) {
    }

}

module.exports = new LandingPageModel();
