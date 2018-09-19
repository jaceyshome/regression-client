import {Strings} from './../../lib/helpers/helpers';

export default class Component {

    constructor(options) {
        this._id = Strings.random(8);
        this._options = options;
        this._element = undefined;
        this._bindThisToHandlers();

        return this._element;
    }


    getOptions() {
        return this._options;
    }

    getElement() {
        return this._element;
    }

    destroy() {
        this._element.destroy();
    }



    /*------------------------------- Helpers -------------------------------- */
    /**
     * Bind this to public functions
     * @private
     */
    _bindThisToHandlers() {
        for (let name of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            let method = this[name];
            // Supposedly you'd like to skip constructor
            if (!(method instanceof Function) || method === this || !this._validateHandlerProperty(name)) {
                continue;
            }
            this[name] = this[name].bind(this);
        }
    }

    /**
     * Helper to exclude functions from view handlers
     * @param property
     * @returns {boolean}
     * @private
     */
    _validateHandlerProperty(property) {
        let excludedNames = ['on', 'off'];
        return !(property.startsWith('_') ||
            (typeof this[property] !== 'function') ||
            !Object.is(excludedNames.find((name)=>{return name === property;}), undefined));
    }


}
