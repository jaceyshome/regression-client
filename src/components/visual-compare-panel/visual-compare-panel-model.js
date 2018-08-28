import StateService from '../service/state-service';
import DataService from '../service/data-service';


class VisualComparePanelModel {

    constructor() {
    }

    getVisualTest() {
        return DataService.getCurrentVisualTest();
    }

    getVisualTestReference() {
        return DataService.getCurrentVisualTestReference();
    }

}

module.exports = new VisualComparePanelModel();