import DataService from './../service/data-service';
import StateService from './../service/state-service';

class VisualSlideNextModel {

    constructor(){

    }

    setNextTest() {
        StateService.setNextVisualTest();
    }

}

module.exports = new VisualSlideNextModel();