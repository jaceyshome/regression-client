import * as PIXI from 'pixi.js';
import AbstractDataService from './../../../lib/abstract-data-service';
import DataService from './../../service/data-service';
import {Strings, Objects} from './../../../lib/helpers/helpers';

/**
 * State constants
 */
const FLAG_RESET = 0;
const FLAG_VISUAL_TEST_UPDATE = 1;
const FLAG_VISUAL_TEST_REFERENCE_UPDATE = 2;
const FLAG_READY_UPDATE = 3;
const FLAG_LOADING = 4;
const FLAG_LOADED = 7;

/**
 * Image viewer data service
 * Centralised data service manages shared data and states between components
 */
class ImageViewerService extends AbstractDataService {

    constructor() {
        super();

        //NOTE: image will assign with unique id on each time loader loading an image, no matter it is the same image or not.
        this._data = {
            testScreenshotId: '',
            referenceScreenshotId: '',
            swipeBarPosition: {},
            testScreenshot: {},
            referenceScreenshot: {},
            state: {
                showingBlur: false,
            },
        };

        this._currentState = FLAG_RESET;

        DataService.subscribe('currentVisualTest', this.handleCurrentTestUpdate, 'imageViewerStateService');
        DataService.subscribe('currentVisualReference', this.handleCurrentTestReferenceUpdate, 'imageViewerStateService');
        DataService.subscribe('componentStates', this.handleComponentStateChanges, 'imageViewerStateService');
    }

    handleCurrentTestUpdate(){
        this._updateStateFlag(FLAG_VISUAL_TEST_UPDATE);
    }

    handleCurrentTestReferenceUpdate() {
        this._updateStateFlag(FLAG_VISUAL_TEST_REFERENCE_UPDATE);
    }

    handleComponentStateChanges(keyPath, data) {
        let newBlurState = (data.detailsPanelVisibility || data.historyListMenuVisibility );
        if(this._data.state.showingBlur !== newBlurState){
            this._data.state.showingBlur = newBlurState;
            this.broadcastDataChanges('state');
        }
    }

    /**
     * Show current result of the image
     */
    showCurrentResult() {
        this._currentState = FLAG_LOADING;
        this._getNewScreenshotIds();
        PIXI.loader.destroy();
        PIXI.loader
            .add(this._data.testScreenshotId, this.getVisualTestImage())
            .add(this._data.referenceScreenshotId, this.getVisualTestReferenceImage())
            .load(this.handleImagesLoaded);
    }

    setSwipeBarPosition(position) {
        this._data.swipeBarPosition.x = position.x;
        this.broadcastDataChanges('swipeBarPosition');
    }

    getVisualTestImage() {
        return `${DataService.getTestResultRootPath()}/${DataService.getCurrentVisualTest().visualScreenshotPath}`;
    }

    getVisualTestReferenceImage() {
        return`${DataService.getTestResultRootPath()}/${DataService.getCurrentVisualTestReference().visualScreenshotPath}`;
    }

    /**
     * change screenshot
     * @param {*} loader 
     * @param {Object} resources - image resources
     */
    handleImagesLoaded(loader, resources) {

        //Set current state
        this._updateStateFlag(FLAG_LOADED);

        //Remove old images
        Objects.empty(this._data.testScreenshot);
        Objects.empty(this._data.referenceScreenshot);

        //Assign new images
        Object.assign(this._data.testScreenshot, resources[this._data.testScreenshotId]);
        Object.assign(this._data.referenceScreenshot, resources[this._data.referenceScreenshotId]);

        //Broadcast new images
        this.broadcastDataChanges('testScreenshot');
        this.broadcastDataChanges('referenceScreenshot');

    }


    /*---------------------------- Helpers -----------------------*/
    /**
     * Update state, it tells the PixiJS that images loading states
     * @param {number} flag 
     */
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
            return;
        }

    }

    /**
     * each of a group of test and reference images will assign unique ids 
     */
    _getNewScreenshotIds() {
        this._data.testScreenshotId = Strings.random(8);
        this._data.referenceScreenshotId = Strings.random(8);
    }


}

module.exports = new ImageViewerService();
