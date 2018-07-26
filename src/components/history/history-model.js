import Http from './../../lib/http';
import config from './../../config';

const endpoint = `${config.apiRootPath}/history`;

class HistoryModel {

    constructor(){
        this._data = {
            histories: [],
        };
    }

    listHistory() {
        return new Promise((resolve, reject)=> {
            Http.get(endpoint).then((result)=> {
                if(result.data){
                    this._data.histories = result.data;
                    resolve(this._data.histories);

                } else {
                    reject(undefined);
                }
            }).catch((err)=> {
                console.error('list history err: ', err);
                reject(undefined);
            });
        });
    }

    getHistory(id) {
        return new Promise((resolve, reject)=> {
            Http.get(`${endpoint}?id=${id}`).then((result)=> {
                resolve(result);
            }).catch((err)=> {
                console.error('list history err: ', err);
                reject(undefined);
            });
        });
    }


}

module.exports = new HistoryModel();

