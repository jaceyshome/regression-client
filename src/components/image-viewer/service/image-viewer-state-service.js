import * as PIXI from 'pixi.js';
import _ from 'lodash';
import DataService from './../../service/data-service';
import ImageViewerService from './image-viewer-service';
import {Images} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';

const TEST_IMAGE = 'TEST_IMAGE';
const REFERENCE_IMAGE = 'REFERENCE_IMAGE';
/**
 * Image viewer state service
 * It controls image viewer state changes
 */
class ImageViewerStateService {

    constructor() {
        window.addEventListener('resize', this._onresize.bind(this));
    }

    showCurrentResult() {
        PIXI.loader
            .add(TEST_IMAGE, this.getVisualTestImage())
            .add(REFERENCE_IMAGE, this.getVisualTestReferenceImage())
            .load(this._onImagesLoaded.bind(this));
    }

    getVisualTestImage() {
        return `${DataService.getAssetRootPath()}${DataService.getCurrentVisualTest().visualScreenshotPath}`;
    }

    getVisualTestReferenceImage() {
        return`${DataService.getAssetRootPath()}${DataService.getCurrentVisualTestReference().visualScreenshotPath}`;
    }


    _onImagesLoaded(loader, res) {
        let testImageParams = Images.getImageCenterParams(res.TEST_IMAGE, ImageViewerHelper.getContainer());
        let referenceImageParams = Images.getImageCenterParams(res.REFERENCE_IMAGE, ImageViewerHelper.getContainer());

        let background = new PIXI.Sprite.fromImage(this.getVisualTestImage());
        console.log('background', background);
        background.width = testImageParams.width;
        background.height = testImageParams.height;
        ImageViewerService.getImageViewer().stage.addChild(background);
    }



    _onresize(){
        if(!ImageViewerService.getImageViewer()){
            return;
        }
        const parent = ImageViewerService.getImageViewer().view.parentNode;
        ImageViewerService.getImageViewer().renderer.resize(
            ImageViewerHelper.getContainer().clientWidth,
            ImageViewerHelper.getBodyHeight()
        );
    }


}

module.exports = new ImageViewerStateService();

