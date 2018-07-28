/**
 * Helper utility methods
 */

/**
 * Booleans helper class
 */
class Booleans {
    /**
     * Check if the variable has a truthy value or not,
     * will evaluate to true if value is not: null/undefined/NaN/empty string ("")/0/false
     * @see http://stackoverflow.com/questions/3571717/javascript-negative-number
     * @see http://stackoverflow.com/questions/6449611/how-to-check-whether-a-value-is-a-number-in-javascript-or-jquery
     *
     * @param {Number|*} val - The value to test
     * @returns {boolean} - true if the value is "truthy", else false
     */
    static isTruthyValue (val) {
        return (val || parseInt(val, 10) === 0) ? true : false;
    }

}

export {Booleans};