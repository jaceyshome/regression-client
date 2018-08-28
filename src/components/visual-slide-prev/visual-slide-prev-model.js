import DataService from './../service/data-service';
import StateService from './../service/state-service';

class VisualSlidePrevModel {

    constructor() {

    }

    setPreviousTest() {
        StateService.setPreviousVisualTest();
    }

}

module.exports = new VisualSlidePrevModel();