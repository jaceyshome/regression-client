import * as PIXI from 'pixi.js';
import _ from 'lodash';
import DataService from './../../service/data-service';
import ImageViewerService from './image-viewer-service';
import {Images, Strings} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';
import Screenshot from '../screenshot/screenshot';


const FLAG_RESET = 0;
const FLAG_VISUAL_TEST_UPDATE = 1;
const FLAG_VISUAL_TEST_REFERENCE_UPDATE = 2;
const FLAG_READY_UPDATE = 3;
const FLAG_LOADING = 4;
const FLAG_LOADED = 7;

/**
 * Image viewer state service
 * It controls image viewer state changes
 */
class ImageViewerStateService {

    constructor() {

        this.onImagesLoaded = this.onImagesLoaded.bind(this);
        this.handleCurrentTestUpdate = this.handleCurrentTestUpdate.bind(this);
        this.update = this.update.bind(this);

        this._currentState = FLAG_RESET;
        this._testScreenshot = undefined;
        this._referenceScreenshot = undefined;

        DataService.subscribe('currentVisualTest', this.handleCurrentTestUpdate.bind(this), 'imageViewerStateService');
        DataService.subscribe('currentVisualReference', this.handleCurrentTestReferenceUpdate.bind(this), 'imageViewerStateService');

        window.addEventListener('resize', this.update);
    }

    handleCurrentTestUpdate(keyPath, data){
        this._updateStateFlag(FLAG_VISUAL_TEST_UPDATE);
    }

    handleCurrentTestReferenceUpdate(keyPath, data) {
        this._updateStateFlag(FLAG_VISUAL_TEST_REFERENCE_UPDATE);
    }

    _updateStateFlag(flag) {
        if(flag === FLAG_LOADED || this._currentState === FLAG_LOADED) {
            this._currentState = flag;
            return;
        }

        if(flag < FLAG_READY_UPDATE && this._currentState > FLAG_READY_UPDATE){
            this._currentState = FLAG_RESET;
        }

        this._currentState += flag;

        if(this._currentState === FLAG_READY_UPDATE) {
            this.showCurrentResult();
            this._currentState = FLAG_LOADING;
            return;
        }

    }

    showCurrentResult() {
        if(this._testScreenshot){
            this._testScreenshot.destroy();
        }
        if(this._referenceScreenshot){
            this._referenceScreenshot.destroy();
        }
        this._testScreenshot = new Screenshot();
        this._referenceScreenshot = new Screenshot();
        PIXI.loader.destroy();
        PIXI.loader
            .add(this._testScreenshot.getParams().id, this.getVisualTestImage())
            .add(this._referenceScreenshot.getParams().id, this.getVisualTestReferenceImage())
            .load(this.onImagesLoaded);
    }

    getVisualTestImage() {
        return `${DataService.getAssetRootPath()}${DataService.getCurrentVisualTest().visualScreenshotPath}`;
    }

    getVisualTestReferenceImage() {
        return`${DataService.getAssetRootPath()}${DataService.getCurrentVisualTestReference().visualScreenshotPath}`;
    }

    update(){
        if(!ImageViewerService.getImageViewer()){
            return;
        }
        ImageViewerService.getImageViewer().renderer.resize(
            ImageViewerHelper.getContainer().clientWidth,
            this.getContainerHeight()
        );
        this._testScreenshot.update();
        this._referenceScreenshot.update();
    }

    getContainerHeight() {
        return Math.max(
            ImageViewerHelper.getBodyHeight(),
            this._testScreenshot.getParams().height,
            this._referenceScreenshot.getParams().height
        );
    }

    onImagesLoaded(loader, resources) {
        this._updateStateFlag(FLAG_LOADED);
        this._testScreenshot.init(resources[this._testScreenshot.getParams().id]);
        ImageViewerService.getImageViewer().stage.addChild(this._testScreenshot.getElement());

        this._referenceScreenshot.init(resources[this._referenceScreenshot.getParams().id]);
        ImageViewerService.getImageViewer().stage.addChild(this._referenceScreenshot.getElement());
        this.update();
    }

}

module.exports = new ImageViewerStateService();

