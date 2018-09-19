import * as PIXI from 'pixi.js';

import ImageViewerService from './service/image-viewer-service';
import ImageViewerHelper from './image-viewer-helper';

import Component from './component';
import TestScreenshot from './test-screenshot/test-screenshot';
import ReferenceScreenshot from './reference-screenshot/reference-screenshot';
import SwipeBar from './swipe-bar/swipe-bar';

const BACKGROUND_COLOUR = '0x363636';

//Global config
PIXI.utils.skipHello();

class ImageViewer extends Component{

    constructor() {
        super();
        this._children = {};
        this._app = new PIXI.Application({
            autoResize: true,
            antialias: true,
            backgroundColor: BACKGROUND_COLOUR,
            width:  ImageViewerHelper.getContainer().clientWidth,
            height: ImageViewerHelper.getBodyHeight(),
        });

        this._data = {
            targetBlur: 0,
            speedBlur: 10,
        };

        this._loadComponents();

        ImageViewerHelper.getContainer().appendChild(this._app.view);
        ImageViewerService.subscribe('testScreenshot', this.handleScreenshotChange, 'ImageViewer');
        ImageViewerService.subscribe('referenceScreenshot', this.handleScreenshotChange, 'ImageViewer');
        ImageViewerService.subscribe('state', this.handleStateChange, 'ImageViewer');
        window.addEventListener('resize', this.resize);
        this.resize();

        //init ticker
        this._app.ticker.add(this.update);
    }

    handleScreenshotChange() {
        this.resize();
    }

    handleStateChange(keyPath, data){
        this._data.targetBlur = data.showingBlur ? 10 : 0;
    }
    
    getContainerHeight() {
        return Math.max(
            ImageViewerHelper.getBodyHeight(),
            this._children.testScreenshot.getElement().height,
            this._children.referenceScreenshot.getElement().height
        );
    }

    getElement() {
        return this._app;
    }

    resize(){
        this._app.renderer.resize(
            ImageViewerHelper.getContainer().clientWidth,
            this.getContainerHeight()
        );
    }

    update() {
        if(this._filter.blur === this._data.targetBlur) {
            return;
        }

        if( (this._filter.blur - this._data.targetBlur) < 0) {
            this._filter.blur = this._filter.blur + this._data.speedBlur;
        } else {
            this._filter.blur = this._filter.blur - this._data.speedBlur;
        }

    }


    /* -------------------------- Helpers ---------------------------- */
    _loadComponents() {
        this._children.testScreenshot = new TestScreenshot();
        this._children.referenceScreenshot = new ReferenceScreenshot();
        this._children.swipeBar = new SwipeBar();
        this._filter = this._createBlurFilter();

        //The loading sequence is from bottom to top
        this._app.stage.addChild(this._children.testScreenshot.getElement());
        this._app.stage.addChild(this._children.referenceScreenshot.getElement());
        this._app.stage.addChild(this._children.swipeBar.getElement());
        this._app.stage.filters = [this._filter];

    }

    _createBlurFilter() {
        let filter = new PIXI.filters.BlurFilter();
        filter.blur = 0;
        return filter;
    }

}

module.exports = ImageViewer;
