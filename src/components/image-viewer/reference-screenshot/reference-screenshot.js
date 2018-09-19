import * as PIXI from 'pixi.js';
import {Images, Strings} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';
import ImageViewerService from './../service/image-viewer-service';
import Component from './../component';


const MASK_COLOUR = 0x00aaff;
const MASK_ALPHA = 1;

class ReferenceScreenshot extends Component{

    constructor(options={
        id:Strings.random(8),
        subscribeKey: 'testScreenshot',
        isReference: false,
    }) {
        super();
        this._options = options;
        this._element = new PIXI.Container();

        this._screenshot = undefined;
        this._text = undefined;
        this.createText();

        this._mask = undefined;
        this.createMask();

        ImageViewerService.subscribe('referenceScreenshot', this.handleScreenshotChange, 'ReferenceScreenshot');
        this._swipeBarPositionSubscriber = ImageViewerService.subscribe('swipeBarPosition', this.handleSwipeBarPositionChange, 'ReferenceScreenshot');
        window.addEventListener('resize', this.resize);
    }

    createText() {
        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: 'normal',
            fill: ['#00aaff', '#00aaff'], // gradient
            stroke: '#00aaff',
            strokeThickness: 0.2,
        });

        this._text = new PIXI.Text('REFERENCE', style);
        this._text.position.x = 5;
        this._text.position.y = 5;
        this._element.addChild(this._text);

    }

    createMask() {
        this._mask = new PIXI.Graphics();

        // set a fill and line style
        this._mask.beginFill(MASK_COLOUR, MASK_ALPHA);
        this._mask.lineStyle(1, MASK_COLOUR, 1);

        // draw a shape
        let positionX = 0;
        let positionY = 0;
        let width = ImageViewerHelper.getContainer().clientWidth;
        let height = 500;
        // let height = ImageViewerHelper.getContainer().clientHeight;
        this._mask.moveTo(positionX, positionY);
        this._mask.lineTo(positionX + width, positionY);
        this._mask.lineTo(positionX + width, height);
        this._mask.lineTo(positionX, height);
        this._mask.endFill();

        this._mask.position.x = 0;
        this._mask.position.y = 0;
        this._element.addChild(this._mask);
        this._element.mask = this._mask;
    }

    handleScreenshotChange(ketPath, img){
        if(this._screenshot){
            this._element.removeChild(this._text);
            this._text.destroy();
            this._element.removeChild(this._screenshot);
            this._screenshot.destroy();
        }
        this._screenshot = new PIXI.Sprite(img.texture);
        this._options = Object.assign(this._options, Images.getImageCenterParams(img.data, ImageViewerHelper.getContainer(), true));
        this._element.addChild(this._screenshot);
        this.createText();
        this.resize();
    }

    /**
     * For test reference, handle the mask position and size update
     */
    handleSwipeBarPositionChange() {
        this._resizeMask();
    }

    resize() {
        this._resizeMask();
        if(!this._screenshot){
            return;
        }
        this._options = Object.assign(this._options, Images.getImageCenterParams(this._options, ImageViewerHelper.getContainer()));
        this._screenshot.width = this._options.width;
        this._screenshot.height = this._options.height;
        this._screenshot.position.x = this._options.positionX;
        this._screenshot.position.y = this._options.positionY;
    }

    _resizeMask() {
        this._mask.width = this._swipeBarPositionSubscriber.proxy.x;
        this._mask.height = ImageViewerHelper.getContainer().clientHeight;
    }
}

module.exports = ReferenceScreenshot;
