import * as PIXI from 'pixi.js';

import ImageViewerService from './service/image-viewer-service';
import ImageViewerHelper from './image-viewer-helper';

import Component from './component';
import Screenshot from './screenshot/screenshot';
import SwipeBar from './swipe-bar/swipe-bar';

//Global config
PIXI.utils.skipHello();

class ImageViewer extends Component{

    constructor() {
        super();
        this._children = {};
        this._element = new PIXI.Application({
            autoResize: true,
            antialias: true,
            width:  ImageViewerHelper.getContainer().clientWidth,
            height: ImageViewerHelper.getBodyHeight(),
        });

        this._loadComponents();

        ImageViewerHelper.getContainer().appendChild(this._element.view);
        ImageViewerService.subscribe('testScreenshot', this.handleScreenshotChange, 'Screenshot');
        ImageViewerService.subscribe('referenceScreenshot', this.handleScreenshotChange, 'Screenshot');
        window.addEventListener('resize', this.resize);
        this.resize();

    }

    _loadComponents() {
        this._children.testScreenshot = new Screenshot({subscribeKey:'testScreenshot'});
        this._children.referenceScreenshot = new Screenshot({subscribeKey:'referenceScreenshot'});
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
