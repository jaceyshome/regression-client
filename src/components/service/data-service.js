import ComponentHelpers from './../component-helpers/component-helpers';
import config from './../../config';

const historyEndpoint = `${config.apiRootPath}/history`;
const visualEndpoint = `${config.apiRootPath}/history`;

class DataService {

    constructor() {
        this._histories = undefined;
        this._currentHistory = undefined;
    }

    fetchHistoryList() {

        return new Promise((resolve, reject)=> {

            if(Object.is(this._histories, undefined)) {
                m.request({
                    method: 'GET',
                    url: historyEndpoint,
                }).then((result)=> {
                    if(result && result.data) {
                        this._histories = ComponentHelpers.History.sortHistory(result.data);
                        resolve(this._histories);
                    } else {
                        reject(undefined);
                    }
                }).catch((err)=> {
                    console.warn('List history err', err);
                    reject(undefined);
                });
            } else {
                resolve(this._histories);
            }
        });

    }


    setCurrentHistory(id) {
        return new Promise((resolve, reject)=> {
            m.request({
                method: 'GET',
                url: `${historyEndpoint}?id=${id}`,
            }).then((result)=> {
                if(result && result.data) {
                    this._currentHistory = Object.assign(
                        result.data,
                        {visualTests: ComponentHelpers.Visual.sortTestResults(result.data.visualTests)}
                    );
                    resolve(this._currentHistory);
                } else {
                    reject(undefined);
                }
            }).catch((err)=> {
                console.warn('setCurrentHistory err', err);
                reject(undefined);
            });
        });
    }

    getCurrentHistory() {
        return this._currentHistory;
    }



    /*---------------------- helpers -------------------------*/

}

module.exports = new DataService();

