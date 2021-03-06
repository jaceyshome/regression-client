import DataService from './../service/data-service';

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
            report: DataService.getCurrentHistory().report,
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

