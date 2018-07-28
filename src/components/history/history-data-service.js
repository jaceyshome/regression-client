import config from './../../config';
const endpoint = `${config.apiRootPath}/history`;

class HistoryDataService {

    constructor() {
        this._histories = undefined;
        this._history = undefined;
    }

    listHistory() {

        return new Promise((resolve, reject)=> {

            if(Object.is(this._histories, undefined)) {
                m.request({
                    method: 'GET',
                    url: endpoint,
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

    getHistory(id) {
        return new Promise((resolve, reject)=> {
            if(Object.is(this._history.id, id)) {
                resolve(this._history);
            } else {

                m.request({
                    method: 'GET',
                    url: `${endpoint}?id=${id}`,
                }).then((result)=> {
                    if(result && result.data) {
                        this._history = result.data;
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


}

module.exports = new HistoryDataService();

