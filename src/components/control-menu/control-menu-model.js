import StateService from './../service/state-service';
import DataService from './../service/data-service';
import {History} from './../component-helpers/component-helpers';

class ControlMenuModel {

    constructor(){
        this.title = 'ControlMenuModel';
    }

    approveTest() {
        StateService.approveCurrentTest().then((result)=>{
            console.log('Approve a test');
        });
    }

    toggleDetailsPanel() {
        if(DataService.isDetailsPanelVisible()){
            StateService.hideDetailsPanel();
        } else {
            StateService.showDetailsPanel();
        }
    }

    getFailedTotal() {
        console.log('get failed total', History.getHistoryFailedTests(DataService.getCurrentHistory()).length);

        return History.getHistoryFailedTests(DataService.getCurrentHistory()).length;
    }

    getDetailsButtonText() {
        return this.isShowingDetails() ? 'hide details' : 'show details';
    }

    isShowingDetails() {
        return DataService.isDetailsPanelVisible();
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

