import StateService from '../service/state-service';
import DataService from '../service/data-service';

class VisualNavigationMapModel {

    constructor(){
    }

    getScreenShot() {
        let test = DataService.getCurrentVisualTest();
        if(test.pass) {
            return `${DataService.getTestResultRootPath()}${DataService.getCurrentVisualTest().visualScreenshotPath}`;
        } else {
            return `${DataService.getTestResultRootPath()}${DataService.getCurrentVisualTest().visualDifferPath}`;
        }
    }

}

module.exports = new VisualNavigationMapModel();
