import DataService from '../service/data-service';

class SplashPageModel {

    constructor() {

    }

    fetchHistoryList() {
        return DataService.fetchHistoryList();
    }

    fetchConfig() {
        return DataService.fetchConfig();
    }
}

module.exports = new SplashPageModel();

