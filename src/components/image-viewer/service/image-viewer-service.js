import * as PIXI from 'pixi.js';
import AbstractDataService from './../../../lib/abstract-data-service';
import DataService from './../../service/data-service';
import {Strings, Objects} from './../../../lib/helpers/helpers';

/**
 * Image viewer service
 */

const FLAG_RESET = 0;
const FLAG_VISUAL_TEST_UPDATE = 1;
const FLAG_VISUAL_TEST_REFERENCE_UPDATE = 2;
const FLAG_READY_UPDATE = 3;
const FLAG_LOADING = 4;
const FLAG_LOADED = 7;

class ImageViewerService extends AbstractDataService {

    constructor() {
        super();

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

    handleImagesLoaded(loader, resources) {
        this._updateStateFlag(FLAG_LOADED);

        Objects.empty(this._data.testScreenshot);
        Objects.empty(this._data.referenceScreenshot);

        Object.assign(this._data.testScreenshot, resources[this._data.testScreenshotId]);
        Object.assign(this._data.referenceScreenshot, resources[this._data.referenceScreenshotId]);

        this.broadcastDataChanges('testScreenshot');
        this.broadcastDataChanges('referenceScreenshot');

    }


    /*---------------------------- Helpers -----------------------*/
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

    _getNewScreenshotIds() {
        this._data.testScreenshotId = Strings.random(8);
        this._data.referenceScreenshotId = Strings.random(8);
    }


}

module.exports = new ImageViewerService();
