/**
 * Images helper class
 */
class Images {

    /**
     * get image ratio: width / height
     * @param {Object} data - loaded image data object
     */
    static getRatio(data) {
        return data.width / data.height;
    }

    /**
     * fixed width, auto height
     * @param {Object} data - image data object
     * @param {Object} container - dom element
     * @param {Boolean} isOriginal - is original image data or not
     */
    static getImageCenterParams(data, container, isOriginal=false) {
        let originParams = data.originParams;
        if(isOriginal){
            originParams = {
                width: data.width,
                height: data.height,
                ratio: Images.getRatio(data),
            };
        }

        let result = {
            originParams: originParams,
            ratio: originParams.ratio || Images.getRatio(data),
            width: originParams.width || data.width,
            height: originParams.height || data.height,
            positionX: 0,
            positionY: 0,
        };
        let containerWidth = container.offsetWidth;

        if(result.width > containerWidth){
            result.width = containerWidth;
            result.height = result.width / result.ratio;
        } else {
            result.positionX = (containerWidth - data.width) / 2;
        }

        return result;
    }
}

export {Images};
