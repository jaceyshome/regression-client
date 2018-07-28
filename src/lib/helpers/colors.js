import Booleans from './booleans';
/**
 * Colors helper class
 */
class Colors {
    /**
     * Convert rgb color to rgba color with adding alpha channel
     * @param {string} rgb - 'rgb(red, green, blue)' (e.g.: rgb(85,85,85))
     * @param {number} alpha - [0 - 1], default is 1
     * @returns {string} rgba - 'rgb(red, green, blue, alpha)' (e.g.: rgb(85,85,85, 1))
     * @example
     * rbg2rgba('rgb(85,85,85)', 0.5)
     * //-> rgba(85,85,85, 0.5)
     */
    static rgb2rgba (rgb, alpha) {
        let rgba;
        if (!rgb) {
            return null;
        }
        alpha = Booleans.isTruthyValue(alpha) ? alpha : 1;
        rgba = rgb.replace(/rgb/i, 'rgba');
        return rgba.replace(/\)/i, `, ${alpha})`);
    }

    /**
     * Covert hex code to rgb color, hex code supported formats: "#FFF", "FFF", "#fff", "fff", "FFFFFF", "#FFFFFF"
     * @param {string} hex - hex code
     * @returns {String|null} - return rgb color if it is valid, else null
     * @example
     * hex2rgb("#FFF000") result "rgb(255,240,0)"
     */
    static hex2rgb (hex) {
        if(!hex){
            return null;
        }
        var result, shorthandRegex;
        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.toString().replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            return `gb(${parseInt(result[1], 16)},${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`;
        } else {
            return null;
        }
    }

    /**
     * Covert hex code to rgb color object, hex code supported formats: "#FFF", "FFF", "#fff", "fff", "FFFFFF", "#FFFFFF"
     * @param {string} hex - hex code
     * @returns {String|null} - return rgb color if it is valid, else null
     * @example
     * hex2rgb("#FFF000") result "{ r:255, g:240, b:0 }"
     */
    static hex2rgbObj(hex) {
        if(!hex){
            return null;
        }
        let result, shorthandRegex;
        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.toString().replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result) {
            return {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            };
        } else {
            return null;
        }
    }

    /**
     * Convert rgb color to hex code
     * @param {!number} r - rgb color red
     * @param {!number} g - rgb color green
     * @param {!number} b - rgb color blue
     * @returns {string} - hex code
     * @example
     * rgb2hex(175,210,80);
     * // -> "#afd250"
     */
    static rgb2hex (r, g, b) {
        if(!r || !g || !b) {
            return null;
        }
        if( r > 255 || g > 255 || b > 255) {
            return null;
        }
        if( r < 0 || g < 0 || b < 0) {
            return null;
        }
        let componentToHex;
        componentToHex = function(c) {
            let hex;
            hex = c.toString(16);
            if (hex.length === 1) {
                return '0' + hex;
            } else {
                return hex;
            }
        };
        return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    /**
     * Change color luminance
     * @param {string} hex - hex code (e.g. "#afd250")
     * @param {number} lum - [-1 ~ 1]
     * @returns {string} - new hex code
     */
    static colorLuminance (hex, lum) {
        if(!this.hex2rgb(hex) || lum > 1 || lum < -1){
            return null;
        }
        let c, i, j, rgb = '#';
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        lum = lum || 0;
        for (i = j = 0; j <= 2; i = j += 1) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ('00' + c).substr(c.length);
        }
        return rgb;
    }

}

export {Colors};
