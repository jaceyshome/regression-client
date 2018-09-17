import StateService from './../service/state-service';
import DataService from './../service/data-service';
import {Dates} from './../../lib/helpers/helpers';

class DetailsPanelModel {

    getTestPageUrl() {
        return DataService.getCurrentVisualTest().url;
    }

    getTestName() {
        return DataService.getCurrentVisualTest().name;
    }

    getHistoryDetails() {
        if(!DataService.getCurrentHistory()) {
            return;
        }

        return {
            instance: DataService.getCurrentHistory().instance,
            server: DataService.getCurrentHistory().server,
        };
    }

    getTestScreenshotDetails() {
        return DataService.getCurrentVisualTest();
    }

    getReferenceScreenshotDetails() {
        return DataService.getCurrentVisualTestReference();
    }

}

module.exports = new DetailsPanelModel();

