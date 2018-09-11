import * as PIXI from 'pixi.js';
import {Images, Strings} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';
import ImageViewerService from './../service/image-viewer-service';
import Component from './../component';

class Screenshot extends Component{

    constructor(options={id:Strings.random(8), subscribeKey: 'testScreenshot'}) {
        super();
        this._options = options;
        this._sprite = undefined;
        this._element = new PIXI.Container();
        ImageViewerService.subscribe(options.subscribeKey, this.handleScreenshotChange, 'Screenshot');
        window.addEventListener('resize', this.resize);
    }

    handleScreenshotChange(ketPath, img){
        console.log('handleScreenshotChange: ', ketPath, img);
        if(this._sprite){
            this._element.removeChild(this._sprite);
            this._sprite.destroy();
        }
        this._sprite = new PIXI.Sprite(img.texture);
        this._options = Object.assign(this._options, Images.getImageCenterParams(img.data, ImageViewerHelper.getContainer(), true));
        this._element.addChild(this._sprite);
        this.resize();
    }

    resize() {
        if(!this._sprite){
            return;
        }
        this._options = Object.assign(this._options, Images.getImageCenterParams(this._options, ImageViewerHelper.getContainer()));
        this._element.width = this._options.width;
        this._element.height = this._options.height;
        this._element.position.x = this._options.positionX;
        this._element.position.y = this._options.positionY;
    }


}

module.exports = Screenshot;
