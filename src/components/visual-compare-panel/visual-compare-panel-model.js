import StateService from '../service/state-service';
import DataService from '../service/data-service';
import Constant from './../constant/constant';
import ImageViewer from './../image-viewer/image-viewer';

class VisualComparePanelModel {

    constructor() {
    }

    getVisualTest() {
        return DataService.getCurrentVisualTest();
    }



    getContainerStyle() {

    }

    createImageViewer(){
        this._imageViewer = new ImageViewer(Constant.imageViewerId);
    }

    getImageViewerId () {
        return Constant.imageViewerId;
    }
}

module.exports = new VisualComparePanelModel();
