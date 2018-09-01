import StateService from './../service/state-service';
import DataService from './../service/data-service';

class ControlMenuModel {

    constructor(){
        this.title = 'ControlMenuModel';
    }

    approveTest() {
        StateService.approveCurrentTest();
    }

    toggleDetailsPanel() {

    }

}

module.exports = new ControlMenuModel();

