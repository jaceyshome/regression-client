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
                        this._histories = result.data;
                        resolve(result.data);
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
            if(Object.is(this._currentHistory.id, id)) {
                resolve(this._currentHistory);
            } else {
                m.request({
                    method: 'GET',
                    url: `${historyEndpoint}?id=${id}`,
                }).then((result)=> {
                    if(result && result.data) {
                        this._currentHistory = result.data;
                        resolve(result.data);
                    } else {
                        reject(undefined);
                    }
                }).catch((err)=> {
                    console.warn('getHistory err', err);
                    reject(undefined);
                });
            }
        });

    }

    getCurrentHistory() {
        return this._currentHistory;
    }

}

module.exports = new DataService();

