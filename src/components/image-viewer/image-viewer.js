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
        this._element = new PIXI.Application({
            autoResize: true,
            antialias: true,
            backgroundColor: BACKGROUND_COLOUR,
            width:  ImageViewerHelper.getContainer().clientWidth,
            height: ImageViewerHelper.getBodyHeight(),
        });

        this._loadComponents();

        ImageViewerHelper.getContainer().appendChild(this._element.view);
        ImageViewerService.subscribe('testScreenshot', this.handleScreenshotChange, 'TestScreenshot');
        ImageViewerService.subscribe('referenceScreenshot', this.handleScreenshotChange, 'ReferenceScreenshot');
        window.addEventListener('resize', this.resize);
        this.resize();

    }

    _loadComponents() {
        this._children.testScreenshot = new TestScreenshot();
        this._children.referenceScreenshot = new ReferenceScreenshot();
        this._children.swipeBar = new SwipeBar();

        //The loading sequence is from bottom to top
        this._element.stage.addChild(this._children.testScreenshot.getElement());
        this._element.stage.addChild(this._children.referenceScreenshot.getElement());
        this._element.stage.addChild(this._children.swipeBar.getElement());
    }

    handleScreenshotChange() {
        this.resize();
    }
    
    getContainerHeight() {
        return Math.max(
            ImageViewerHelper.getBodyHeight(),
            this._children.testScreenshot.getElement().height,
            this._children.referenceScreenshot.getElement().height
        );
    }

    resize(){
        this._element.renderer.resize(
            ImageViewerHelper.getContainer().clientWidth,
            this.getContainerHeight()
        );
    }

}

module.exports = ImageViewer;
