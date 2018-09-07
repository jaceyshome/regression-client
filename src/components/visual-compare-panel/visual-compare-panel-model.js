import StateService from '../service/state-service';
import DataService from '../service/data-service';


class VisualComparePanelModel {

    constructor() {
    }

    getVisualTest() {
        return DataService.getCurrentVisualTest();
    }

    getVisualTestImage() {
        return `${DataService.getAssetRootPath()}${DataService.getCurrentVisualTest().visualScreenshotPath}`;
    }

    getVisualTestReferenceImage() {
        return `${DataService.getAssetRootPath()}${DataService.getCurrentVisualTestReference().visualScreenshotPath}`;
    }

}

module.exports = new VisualComparePanelModel();
