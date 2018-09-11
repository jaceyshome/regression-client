import * as PIXI from 'pixi.js';
import _ from 'lodash';
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

        this.handleCurrentTestUpdate = this.handleCurrentTestUpdate.bind(this);
        this.handleCurrentTestReferenceUpdate = this.handleCurrentTestReferenceUpdate.bind(this);
        this.handleImagesLoaded = this.handleImagesLoaded.bind(this);

        this._data = {
            testScreenshotId: '',
            referenceScreenshotId: '',
            testScreenshot: {},
            referenceScreenshot: {},
        };

        this._currentState = FLAG_RESET;

        DataService.subscribe('currentVisualTest', this.handleCurrentTestUpdate, 'imageViewerStateService');
        DataService.subscribe('currentVisualReference', this.handleCurrentTestReferenceUpdate, 'imageViewerStateService');
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
            return;
        }

    }

    _getNewScreenshotIds() {
        this._data.testScreenshotId = Strings.random(8);
        this._data.referenceScreenshotId = Strings.random(8);
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

    getVisualTestImage() {
        return `${DataService.getAssetRootPath()}${DataService.getCurrentVisualTest().visualScreenshotPath}`;
    }

    getVisualTestReferenceImage() {
        return`${DataService.getAssetRootPath()}${DataService.getCurrentVisualTestReference().visualScreenshotPath}`;
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

}

module.exports = new ImageViewerService();
