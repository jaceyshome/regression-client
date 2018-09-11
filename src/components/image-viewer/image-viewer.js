import * as PIXI from 'pixi.js';

import ImageViewerService from './service/image-viewer-service';
import ImageViewerHelper from './image-viewer-helper';

import Screenshot from './screenshot/screenshot';
import Component from './component';

//Global config
PIXI.utils.skipHello();

class ImageViewer {

    constructor() {
        this.resize = this.resize.bind(this);

        this._children = {};
        this._element = new PIXI.Application({
            autoResize: true,
            width:  ImageViewerHelper.getContainer().clientWidth,
            height: ImageViewerHelper.getBodyHeight(),
        });

        this._loadComponents();

        ImageViewerService.showCurrentResult();
        ImageViewerHelper.getContainer().appendChild(this._element.view);
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    _loadComponents() {
        this._children.testScreenshot = new Screenshot({subscribeKey:'testScreenshot'});
        this._children.referenceScreenshot = new Screenshot({subscribeKey:'referenceScreenshot'});

        //The loading sequence is from bottom to top
        this._element.stage.addChild(this._children.testScreenshot.getElement());
        this._element.stage.addChild(this._children.referenceScreenshot.getElement());
    }

    getElement() {
        return this._element;
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
