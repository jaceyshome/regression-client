import * as PIXI from 'pixi.js';
import {Images, Strings} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';

class Screenshot {

    constructor(id=Strings.random(8)) {
        this._params = {id: id};
        this._sprite = undefined;
    }

    init(img){
        this._params = Object.assign(this._params, Images.getImageCenterParams(img.data, ImageViewerHelper.getContainer(), true));
        this._sprite = new PIXI.Sprite(img.texture);
        this.resizeSprite();
    }

    getParams() {
        return this._params;
    }

    getSprite() {
        return this._sprite;
    }

    update() {
        if(!this._sprite){
            return;
        }
        this._params = Object.assign(this._params, Images.getImageCenterParams(this._params, ImageViewerHelper.getContainer()));
        this.resizeSprite();

    }

    resizeSprite() {
        this._sprite.width = this._params.width;
        this._sprite.height = this._params.height;
        this._sprite.position.x = this._params.positionX;
        this._sprite.position.y = this._params.positionY;
    }

    destroy() {
        this._sprite.destroy();
    }

    createTextureContainer(texture) {
        let container = new PIXI.Container();
        let sprite = new new PIXI.Sprite(texture);
        container.addChild(texture);
        return container;
    }

}

module.exports = Screenshot;
