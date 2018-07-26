import { ajax } from 'noquery-ajax';


/**
 * noquery-ajax api  https://www.npmjs.com/package/noquery-ajax
 */
class Http {

    /**
     * @param url {string}  - request url
     * @param data {object} - data to send to server
     * @param cb {function} - callback function
     * @param type {string} - default 'json', 'jsonp', 'html'
     */
    static get(url, {type = 'json', data, cb} = {}) {
        console.log('url!!!!', url);
        return new Promise(function(resolve, reject, onCancel) {
            // Get the content from the server
            ajax({
                url,
                method: 'GET',
                data: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                success: (data, statusText, xhr)=> {
                    resolve(data);
                },
                error: (xhr, statusText)=> {
                    console.error('Error occurred');
                    reject(undefined);
                },
                statusCode: {
                    '400': function() {
                        console.log('Bad input parameter!');
                    },
                },
            });
        });
    }

    /**
     * Performs an AJAX request to get JSON data from the specified URL & method
     * @param url {string}  - request url
     * @param data {object} - data to send to server
     * @param cb {function} - callback function
     * @param type {string} - default json
     */
    static post(url, {type = 'json', data, cb}) {
        return new Promise((resolve, reject, onCancel) => {
            type = type || 'json';
            // Get the content from the server
            ajax(url, {
                method: 'post',
                data: data,
                dataType: type,
                contentType: type,
            }).then((data) => {
                resolve(data);
                if(typeof cb === 'function') {
                    cb(data);
                }
            }, (jqXHR, textStatus, errorThrown) => {
                reject(new Error(errorThrown));
            });

        });
    }

    static list() {}

    static put() {}
    
}

module.exports = Http;