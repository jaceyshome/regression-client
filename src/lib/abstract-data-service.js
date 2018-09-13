import _ from 'lodash';
import {Strings} from './helpers/helpers';
import ObservableSlim from 'observable-slim';

/**
 * DataService handles shared data and methods between components
 * It observers shared data changes and notify changes to other components
 */
export default class AbstractDataService {

    constructor() {

        /**
         *
         * @type {function(this:AbstractDataService)}
         * @private
         */
        this._handleObservingDataChanges = this._handleObservingDataChanges.bind(this);

        /**
         *
         * @type {Object}
         * @private
         */
        this._data = {};

        /**
         * Observers
         * @type {Set}
         * @private
         */
        this._observers = new Map();

        /**
         * Subscribers
         * @type {Array}
         * @private
         */
        this._subscribers = new Set();
    }



    /*---------------------------- public functions -------------------------*/
    /**
     * Subscribe changes
     * @param keyPath
     * @param handler
     * @param instance
     * @returns {{id: *, key: *, proxy: *, fn: *}}
     */
    subscribe(keyPath, handler, instance) {

        if ( Object.is(keyPath, undefined) ) {
            throw new Error('keyPath is required to subscribe data service');
        }
        if( Object.is(handler, undefined)) {
            throw new Error('fn is required to subscribe data service');
        }
        const subscriber = {
            instance: instance,
            id: Strings.random(6),
            keyPath: keyPath,
            handler: handler,
            proxy: this._createObservableProxy(keyPath),
        };
        this._subscribers.add(subscriber);
        return subscriber;
    }

    /**
     * Unsubscribe a subscriber
     * @param subscriber
     */
    unsubscribe(subscriber) {
        this._subscribers.delete(subscriber);
    }

    /**
     * Unsubscribe all subscribers
     */
    unsubscribeAll() {
        this._subscribers.clear();
    }

    /**
     * Notify all subscribers data object changes
     * Use it after loading the data from the server.
     * @param {String} keyPath - key path of the this._data
     * @param {Object} excluded - subscriber, excluded subscriber
     * @example
     * ```
     * this._data.currentSite = {name: "corporate"};
     * //subscribers listen to the currentSite changes
     *
     * this.broadcastDataChanges("currentSite");
     * //tell all subscribers "currentSite" which has changed
     *
     * ```
     *
     * An example `/src/components/style-guide/style-guide-service.js`
     *
     * @private
     */
    broadcastDataChanges(keyPath, excluded) {
        let data = this._data[keyPath];

        for (let subscriber of this._subscribers) {
            if(Object.is(subscriber, undefined)) {
                return;
            }
            if(Object.is(subscriber.keyPath, keyPath) && !Object.is(excluded, subscriber)) {
                subscriber.handler(keyPath, data);
            }
        }
    }
    
    /**
     * Destroy this service
     */
    destroy() {
        this.unsubscribeAll();
        for (const prop in this) {
            if(this.hasOwnProperty(prop)){
                delete this[prop];
            }
        }
    }

    /*-------------------------- private functions -------------------------*/
    /**
     * Create subscriber proxy
     * @param keyPath {String}
     * @param handler
     * @returns {*}
     * @private
     */
    _createObservableProxy(keyPath , handler=this._handleObservingDataChanges) {
        if(!this._observers.has(keyPath)) {
            this._observers.set(keyPath, ObservableSlim.create(
                this._data[keyPath], true, (changes)=> {
                    handler(changes, keyPath);
                }
            ));
        }
        return this._observers.get(keyPath);
    }

    /**
     * Subscriber proxy set handler
     * @param changes
     * @returns {boolean} - default true
     * @private
     * @override
     */
    _handleObservingDataChanges(changes, keyPath) {
        this.broadcastDataChanges(keyPath);
        return true;
    }

}
