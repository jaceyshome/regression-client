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

    getTestCreateDateTime() {
        let date = Dates.getDate(DataService.getCurrentVisualTest().createdAt);
        let hours = Dates.getHourMinute(DataService.getCurrentVisualTest().createdAt);
        return `${hours}, ${date}`;
    }

    getTestApprovedDateTime() {
        if(!DataService.getCurrentVisualTest().approvedAt) {
            return '';
        }
        let date = Dates.getDate(DataService.getCurrentVisualTest().approvedAt);
        let hours = Dates.getHourMinute(DataService.getCurrentVisualTest().approvedAt);
        return `${hours}, ${date}`;
    }

    getReferenceCreateDate() {
        let date = Dates.getDate(DataService.getCurrentVisualTestReference().createdAt);
        let hours = Dates.getHourMinute(DataService.getCurrentVisualTestReference().createdAt);
        return `${hours}, ${date}`;
    }

    getTestBrowserInfo() {
        return DataService.getCurrentVisualTest().browser;
    }

    getReferenceBrowserInfo() {
        return DataService.getCurrentVisualTestReference().browser;

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

module.exports = new DetailsPanelModel();

