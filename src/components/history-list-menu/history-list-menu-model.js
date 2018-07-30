import StateService from '../service/state-service';
import DataService from '../service/data-service';

class HistoryListMenuModel {

    constructor() {

    }

    initState() {
        return new Promise((resolve, reject)=> {
            DataService.fetchHistoryList().then((results)=> {

                StateService.setCurrentHistory(results[0]).then((history)=> {

                    resolve(results);
                });
            });
        });
    }

    setCurrentHistory(history) {
        return StateService.setCurrentHistory(history);
    }
}

module.exports = new HistoryListMenuModel();