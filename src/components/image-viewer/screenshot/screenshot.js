import * as PIXI from 'pixi.js';
import {Images, Strings} from './../../../lib/helpers/helpers';
import ImageViewerHelper from './../image-viewer-helper';

class Screenshot {

    constructor(id=Strings.random(8)) {
        this._params = {id: id};
        this._sprite = undefined;
    }

    init(data){
        this._params = Object.assign(this._params, Images.getImageCenterParams(data, ImageViewerHelper.getContainer()));
        this._sprite = new PIXI.Sprite(data.texture);
        this._sprite.width = this._params.width;
        this._sprite.height = this._params.height;
    }

    getParams() {
        return this._params;
    }

    getSprite() {
        return this._sprite;
    }

    createTextureContainer(texture) {
        let container = new PIXI.Container();
        let sprite = new new PIXI.Sprite(texture);
        container.addChild(texture);
        return container;
    }

}

module.exports = Screenshot;
