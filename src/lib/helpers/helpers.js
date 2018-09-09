import {Booleans} from './booleans';
import {Colors} from './colors';
import {Dates} from './dates';
import {Images} from './images';
import {Numbers} from './numbers';
import {Strings} from './strings';


/**
 * A collection of the helpers classes: Strings, Booleans, Colors and Numbers
 * @example
 *  Helpers.Numbers.isNumber(0);
 *  // -> true
 *  Helpers.Strings.random(4);
 *  // -> af2d
 * @type {{Booleans: Booleans, Numbers: Numbers, Colors: Colors, Strings: Strings}}
 */
let Helpers = {
    Booleans,
    Colors,
    Dates,
    Images,
    Numbers,
    Strings,
};

module.exports = Helpers;
