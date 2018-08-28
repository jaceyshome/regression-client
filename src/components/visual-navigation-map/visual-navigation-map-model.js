import StateService from '../service/state-service';
import DataService from '../service/data-service';

class VisualNavigationMapModel {

    constructor(){
    }

    getScreenShot() {
        let test = DataService.getCurrentVisualTest();
        if(test.pass) {
            return test.visualScreenshotPath;
        } else {
            return test.visualDifferPath;
        }
    }

}

module.exports = new VisualNavigationMapModel();