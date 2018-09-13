import * as PIXI from 'pixi.js';
import {Images, Strings} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';
import Component from './../component';
import ImageViewerService from './../service/image-viewer-service';

const COLOUR = 0x0148A4;
const WIDTH = 2;

class SwipeBar extends Component {

    constructor() {
        super();

        //default options
        this._options = {
            width:  WIDTH,
            height: ImageViewerHelper.getBodyHeight(),
            positionX: 0,
            positionY: 0,
        };

        this._draggingData = undefined;

        this._element = undefined;
        this._createButtonStyle();
        this._registerEventHandlers();
        this.resetPosition();

        ImageViewerService.subscribe('testScreenshot', this.handleScreenshotChange, 'Screenshot');
        ImageViewerService.subscribe('referenceScreenshot', this.handleScreenshotChange, 'Screenshot');

        window.addEventListener('resize', this.resize);
        this.resize();
    }

    _createButtonStyle(){
        this._element = new PIXI.Graphics();

        // set a fill and line style
        this._element.beginFill(COLOUR);
        this._element.lineStyle(1, COLOUR, 1);

        // draw a shape
        this._element.moveTo(this._options.positionX, this._options.positionY);
        this._element.lineTo(this._options.positionX + this._options.width, this._options.positionY);
        this._element.lineTo(this._options.positionX + this._options.width, this._options.height);
        this._element.lineTo(this._options.positionX, this._options.height);
        this._element.endFill();

        //enable button mode
        this._element.interactive = true;
        this._element.buttonMode = true;
    }

    _registerEventHandlers() {
        this._element.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }

    resetPosition() {
        this._element.position.x = (ImageViewerHelper.getContainer().clientWidth - WIDTH) / 2;
        ImageViewerService.setSwipeBarPosition({
            x: this._element.position.x,
        });
    }

    handleScreenshotChange(keyPath, data){
        this.resize();
        this.resetPosition();
    }

    resize() {
        if(!this._element){
            return;
        }
        let scale = this._element.height / ImageViewerHelper.getContainer().clientHeight;
        this._element.position.x = this._element.position.x / scale;
        this._element.height = ImageViewerHelper.getContainer().clientHeight;
        ImageViewerService.setSwipeBarPosition({
            x: this._element.position.x,
        });
    }


    /*-------------------- handlers ---------------------*/
    onDragStart(event) {
        this._draggingData = event.data;
    }

    onDragEnd() {
        this._draggingData = undefined;
    }

    onDragMove() {
        if(this._draggingData) {
            let newPositionX = this._draggingData.getLocalPosition(this._element.parent).x;
            if(newPositionX <= WIDTH){
                this._element.position.x = WIDTH;
            }
            if(newPositionX >= ImageViewerHelper.getContainer().clientWidth - WIDTH) {
                newPositionX = ImageViewerHelper.getContainer().clientWidth - WIDTH;
            }
            this._element.position.x = newPositionX;
            ImageViewerService.setSwipeBarPosition({
                x: this._element.position.x,
            });
        }
    }

}

module.exports = SwipeBar;
