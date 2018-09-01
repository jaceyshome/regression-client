import ComponentHelpers from './../component-helpers/component-helpers';
import config from './../../config';

const historyEndpoint = `${config.apiRootPath}/history`;
const visualEndpoint = `${config.apiRootPath}/visual`;

class DataService {

    constructor() {
        this._histories = undefined;
        this._currentHistory = undefined;
        this._currentVisualReference = undefined;
        this._currentVisualTest = undefined;
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

    setCurrentVisualTest(test) {
        this._currentVisualTest = test;
        return this._currentVisualTest;
    }

    getCurrentVisualTest() {
        return this._currentVisualTest;
    }

    approveTest(test) {
        return new Promise((resolve, reject)=> {

            m.request({
                method: 'PUT',
                url: visualEndpoint,
                data: {
                    historyId: test.historyId,
                    visualReferenceId: test.visualReferenceId,
                    visualScreenshot: test.visualScreenshot,
                    browser: test.browser,
                    url: test.url,
                    name: test.name,
                    visualScreenshotPath: test.visualScreenshotPath,
                    _id: test._id,
                },
            }).then((result)=> {
                if(result && result.data) {
                    Object.assign(test, result.data);
                    resolve(result.data);
                } else {
                    reject(undefined);
                }
            }).catch((err)=> {
                console.warn('Approve test err', err);
                reject(undefined);
            });

        });
    }

    setCurrentVisualTestReference(test) {
        this._currentVisualReference = ComponentHelpers.Visual.findTestReference(test, this._currentHistory.visualReferences);
        console.log('this current visual reference::', this._currentVisualReference);
        return this._currentVisualReference;

    }

    getCurrentVisualTestReference() {
        return this._currentVisualReference;
    }

    updateVisualReference(reference) {

    }

    /*---------------------- helpers -------------------------*/

}

module.exports = new DataService();

