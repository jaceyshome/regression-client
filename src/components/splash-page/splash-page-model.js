import DataService from '../service/data-service';

class SplashPageModel {

    constructor() {

    }

    fetchHistoryList() {
        return DataService.fetchHistoryList();
    }

}

module.exports = new SplashPageModel();

