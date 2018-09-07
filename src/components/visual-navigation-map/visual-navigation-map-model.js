import StateService from '../service/state-service';
import DataService from '../service/data-service';

class VisualNavigationMapModel {

    constructor(){
    }

    getScreenShot() {
        let test = DataService.getCurrentVisualTest();
        if(test.pass) {
            return `${DataService.getAssetRootPath()}${DataService.getCurrentVisualTest().visualScreenshotPath}`;
        } else {
            return `${DataService.getAssetRootPath()}${DataService.getCurrentVisualTest().visualDifferPath}`;
        }
    }

}

module.exports = new VisualNavigationMapModel();
