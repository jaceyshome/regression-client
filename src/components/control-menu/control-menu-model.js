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
        if(DataService.isDetailsPanelVisible()){
            StateService.hideDetailsPanel();
        } else {
            StateService.showDetailsPanel();
        }
    }

    isResultFailed() {
        return !DataService.getCurrentVisualTest().pass;
    }

    isResultApproved() {
        return DataService.getCurrentVisualTest().pass && DataService.getCurrentVisualTest().approvedAt;
    }

    isResultPass() {
        return DataService.getCurrentVisualTest().pass && !DataService.getCurrentVisualTest().approvedAt;
    }

}

module.exports = new ControlMenuModel();

