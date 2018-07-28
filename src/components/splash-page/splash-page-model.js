import HistoryDataService from './../history/history-data-service';

class SplashPageModel {

    constructor() {

    }

    listHistory() {
        return HistoryDataService.listHistory();
    }

}

module.exports = new SplashPageModel();

