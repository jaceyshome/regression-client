import * as PIXI from 'pixi.js';
import _ from 'lodash';
import DataService from './../../service/data-service';
import Constants from './../../constant/constant';
import ImageViewerHelper from './../image-viewer-helper';

/**
 * Image viewer state service
 * It controls image viewer state changes
 */
class ImageViewerService {

    constructor() {
        //Global config
        PIXI.utils.skipHello();
        this._imageViewer = undefined;
    }

    init() {
        if(this._imageViewer){
            return this._imageViewer;
        }
        this._imageViewer = new PIXI.Application({
            autoResize: true,
            width:  ImageViewerHelper.getContainer().clientWidth,
            height: ImageViewerHelper.getBodyHeight(),
        });
        ImageViewerHelper.getContainer().appendChild(this._imageViewer.view);
        return this._imageViewer;
    }

    getImageViewer() {
        return this._imageViewer;
    }

}

module.exports = new ImageViewerService();

