import DataService from './../data/data-service';

module.exports = class LandingPageModel {

    constructor(){

    }

    setCurrentHistory(id) {
        DataService.setCurrentHistory(id);
    }
};

