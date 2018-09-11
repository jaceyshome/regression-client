import StateService from '../service/state-service';
import DataService from '../service/data-service';
import Constant from './../constant/constant';
import ImageViewer from './../image-viewer/image-viewer';

class VisualComparePanelModel {

    constructor() {

    }

    getImageViewerId () {
        return Constant.imageViewerId;
    }

    createImageViewer() {
        if(this._imageViewer){
            return this._imageViewer;
        }
        this._imageViewer = new ImageViewer();
    }

}

module.exports = new VisualComparePanelModel();
