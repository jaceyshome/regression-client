import StateService from '../service/state-service';
import DataService from '../service/data-service';
import Constant from './../constant/constant';
import ImageViewer from './../image-viewer/image-viewer';

class VisualComparePanelModel {

    constructor() {
        this._imageViewer;
    }

    getImageViewerId () {
        return Constant.imageViewerId;
    }

    createImageViewer() {
        if(this._imageViewer){
            return this._imageViewer;
        }
        this._imageViewer = new ImageViewer(Constant.imageViewerId);
    }

    showResult() {
        console.log('show current result!!!!');
        if(this._imageViewer){
            return this._imageViewer.showResult();
        }
    }

}

module.exports = new VisualComparePanelModel();
