import * as PIXI from 'pixi.js';
import {Images, Strings} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';

class SwipeBar {

    constructor(id=Strings.random(8)) {
        this._params = {id: id};
        this._element = undefined;
    }

    init(){
        let graphics = new PIXI.Graphics();

        // set a fill and line style
        graphics.beginFill(0xFF3300);
        graphics.lineStyle(4, 0xffd900, 1);

        // draw a shape
        graphics.moveTo(50,50);
        graphics.lineTo(250, 50);
        graphics.lineTo(100, 100);
        graphics.lineTo(50, 50);
        graphics.endFill();
    }

    getParams() {
        return this._params;
    }

    getElement() {
        return this._element;
    }

    update() {
        if(!this._sprite){
            return;
        }
        this.resize();
    }

    resize() {

    }

    reset() {

    }

    destroy() {
        this._sprite.destroy();
    }

}

module.exports = SwipeBar;
