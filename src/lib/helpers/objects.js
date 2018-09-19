import _ from 'lodash';

class Objects {

    /**
     * Filter properties of the candidate object, remain the properties if the target instance has the property
     * @param candidate {!Object} - candidate object
     * @param target {!Object} - mapping target instance
     * @returns {undefined|Object} - result a new object
     */
    static filterObjectProperties(candidate, target) {
        let result = {};

        if(_.isUndefined(candidate) || _.isUndefined(target)){
            return undefined;
        }

        if(!_.isObject(candidate)){
            console.warn('invalid object to convert: ', candidate);
            return undefined;
        }
        _.forOwn(candidate, (value, key)=> {
            if(target.hasOwnProperty(key)){
                result[key] = value;
            }
        });

        return result;
    }

    /**
     * Empty an object properties
     * @param {Object} candidate - candidate object
     */
    static empty(candidate) {
        for (const key in candidate) {
            if(candidate.hasOwnProperty(key)){
                delete candidate[key];
            }
        }
        return candidate;
    }

    /**
     * Make enum object
     * @reference: https://github.com/gergob/jsProxy/blob/master/03-enum-nameof.js
     * @param name
     * @param values
     * @returns {*}
     */
    static makeEnum(name, values) {
        function nameOf(value) {
            let keys = Object.keys(values);
            for (let index = 0; index < keys.length; index += 1) {
                let key = keys[index];
                if (values[key] === value) {
                    return `${name}.${key}`;
                }
            }
        }
        const handler = {
            set () {
                throw new TypeError('Enum is read only');
            },
            get (obj, prop) {
                if (prop === 'nameOf') {
                    return nameOf.bind(obj);
                }
                if (!(prop in obj)) {
                    throw new ReferenceError(`Unknown enum key "${prop}"`);
                }
                return Reflect.get(obj, prop);
            },
            deleteProperty () {
                throw new TypeError('Enum is read only');
            },
        };
        return new Proxy(values, handler);
    }
    
}

export {Objects};
