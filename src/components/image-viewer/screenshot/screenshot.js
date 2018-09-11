import * as PIXI from 'pixi.js';
import {Images, Strings} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';

class Screenshot {

    constructor(id=Strings.random(8)) {
        this._params = {id: id};
        this._element = undefined;
    }

    init(img){
        this._params = Object.assign(this._params, Images.getImageCenterParams(img.data, ImageViewerHelper.getContainer(), true));
        this._element = new PIXI.Sprite(img.texture);
        this.resize();
    }

    getParams() {
        return this._params;
    }

    getElement() {
        return this._element;
    }

    update() {
        if(!this._element){
            return;
        }
        this._params = Object.assign(this._params, Images.getImageCenterParams(this._params, ImageViewerHelper.getContainer()));
        this.resize();

    }

    resize() {
        this._element.width = this._params.width;
        this._element.height = this._params.height;
        this._element.position.x = this._params.positionX;
        this._element.position.y = this._params.positionY;
    }

    destroy() {
        this._element.destroy();
    }

    createTextureContainer(texture) {
        let container = new PIXI.Container();
        let sprite = new new PIXI.Sprite(texture);
        container.addChild(texture);
        return container;
    }

}

module.exports = Screenshot;
