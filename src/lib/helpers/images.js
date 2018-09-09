/**
 * Images helper class
 */
class Images {

    /**
     * get image ratio: width / height
     * @param {Object} img - loaded image object
     */
    static getRatio(img) {
        return img.data.width / img.data.height;
    }

    /**
     * fixed width, auto height
     * @param {Object} img - image
     * @param {Object} container - dom element
     */
    static getImageCenterParams(img, container) {
        let result = {
            ratio: Images.getRatio(img),
            width: img.data.width,
            height: img.data.height,
            positionY: 0,
        };
        let containerWidth = container.offsetWidth;

        if(result.width > containerWidth){
            result.width = containerWidth;
            result.height = result.width / result.ratio;
        } else {
            result.positionX = (containerWidth - img.data.width) / 2;
        }

        return result;
    }
}

export {Images};
