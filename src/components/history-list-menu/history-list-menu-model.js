import StateService from '../service/state-service';
import DataService from '../service/data-service';

class HistoryListMenuModel {

    constructor() {

    }

    getHistoryList() {
        return DataService.fetchHistoryList();
    }

    setCurrentHistory(history) {
        return StateService.setCurrentHistory(history);
    }
}

module.exports = new HistoryListMenuModel();