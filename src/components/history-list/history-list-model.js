import HistoryDataService from './../history/history-data-service';

class HistoryModel {

    constructor(){
        this.selectedHistory = null;
    }

    listHistory() {
        return HistoryDataService.listHistory();
    }

    selectHistory(history) {
        return HistoryDataService.getHistory(history._id);
    }
}

module.exports = new HistoryModel();

