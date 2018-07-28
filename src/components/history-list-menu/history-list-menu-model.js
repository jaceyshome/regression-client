import DataService from '../data/data-service';

class HistoryListMenuModel {

    constructor(){
        this.selectedHistory = null;
    }

    fetchHistoryList() {
        return DataService.fetchHistoryList();
    }

}

module.exports = new HistoryListMenuModel();