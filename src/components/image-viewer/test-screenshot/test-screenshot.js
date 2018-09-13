import * as PIXI from 'pixi.js';
import {Images, Strings} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';
import ImageViewerService from './../service/image-viewer-service';
import Component from './../component';

class TestScreenshot extends Component{

    constructor(options={id:Strings.random(8)}) {
        super();
        this._options = options;
        this._element = new PIXI.Container();
        this._screenshot = undefined;
        ImageViewerService.subscribe('testScreenshot', this.handleScreenshotChange, 'TestScreenshot');
        window.addEventListener('resize', this.resize);
    }

    handleScreenshotChange(ketPath, img){
        if(this._screenshot){
            this._element.removeChild(this._screenshot);
            this._screenshot.destroy();
        }
        this._screenshot = new PIXI.Sprite(img.texture);
        this._options = Object.assign(this._options, Images.getImageCenterParams(img.data, ImageViewerHelper.getContainer(), true));
        this._element.addChild(this._screenshot);
        this.resize();
    }

    resize() {
        if(!this._screenshot){
            return;
        }
        this._options = Object.assign(this._options, Images.getImageCenterParams(this._options, ImageViewerHelper.getContainer()));
        this._element.width = this._options.width;
        this._element.height = this._options.height;
        this._element.position.x = this._options.positionX;
        this._element.position.y = this._options.positionY;
    }


}

module.exports = TestScreenshot;
