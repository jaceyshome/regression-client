import Constant from './../constant/constant';

/**
 * Images helper class
 */
class ImageViewerHelper {

    static getContainer() {
        return document.getElementById(Constant.imageViewerId);
    }

    static getBodyHeight() {
        return document.body.clientHeight;
    }

}

module.exports = ImageViewerHelper;
