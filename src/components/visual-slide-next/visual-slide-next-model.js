import StateService from './../service/state-service';

class VisualSlideNextModel {

    constructor() {

    }

    setNextTest() {
        StateService.setNextVisualTest();
    }

    getNextResultIndex() {
        return StateService.getNextTestIndex();
    }
}

module.exports = new VisualSlideNextModel();
