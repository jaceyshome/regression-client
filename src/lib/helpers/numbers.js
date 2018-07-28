
/**
 * Numbers helper class
 */
class Numbers {
    /**
     * Check if the variable is a valid negative or positive number or not,
     * @see http://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in
     * @param {Number|*} val - value to test, support string type number like "123"
     * @returns {boolean} true if the value is a number, else false
     */
    static isNumber (val) {
        return ( !isNaN(parseFloat(val))) && isFinite(val);
    }

    /**
     * Strip non-numeric characters from string
     * @param {string} val - non-numeric characters string, for example: '<span>123.8</span>'
     * @returns {Float} 10 bit digital positive or negative float point number
     * @see http://stackoverflow.com/questions/1862130/strip-non-numeric-characters-from-string
     */
    static stripNonNumericCharacters(val) {
        return parseFloat(val.toString().replace(/[^\d.-]/g, ''), 10);
    }
}

export {Numbers};