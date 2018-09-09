import * as PIXI from 'pixi.js';

import ImageViewerStateService from './service/image-viewer-state-service';
import ImageViewerService from './service/image-viewer-service';
import DataService from '../service/data-service';

class ImageViewer {

    constructor(id) {
        this._imageViewer = ImageViewerService.getImageViewer();
        ImageViewerStateService.showCurrentResult();
    }

    onupdate() {

    }

    onresize() {

    }


    createTextureContainer(texture) {
        let container = new PIXI.Container();
        let sprite = new new PIXI.Sprite(texture);
        container.addChild(texture);
        return container;
    }

}

module.exports = ImageViewer;
