import * as PIXI from 'pixi.js';

import ImageViewerStateService from './service/image-viewer-state-service';
import ImageViewerService from './service/image-viewer-service';

class ImageViewer {

    constructor() {
        ImageViewerService.init();
    }

}

module.exports = ImageViewer;
