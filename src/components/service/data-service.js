import _ from 'lodash';

import {Objects} from './../../lib/helpers/helpers';
import config from './../../config';
import Constant from './../constant/constant';
import ComponentHelpers from './../component-helpers/component-helpers';
import AbstractDataService from './../../lib/abstract-data-service';

const historyEndpoint = `${config.apiRootPath}/history`;
const visualEndpoint = `${config.apiRootPath}/visual`;

class DataService extends AbstractDataService {

    constructor() {
        super();

        this._data = {
            apiConfig: {},
            histories : [],
            currentHistory : {},
            currentVisualTest: {},
            currentVisualReference: {},
        };

        this._detailsPanelVisibility = false;
    }

    getTestResultRootPath() {
        if(config.env !== 'PROD') {
            return Constant.devTestResultRootPath ;
        }
        return this._data.apiConfig.testResult.outputRoot;
    }

    fetchConfig() {
        return new Promise((resolve, reject)=> {
            m.request({
                method: 'GET',
                url: `${config.apiRootPath}/`,
            }).then((result)=> {
                if(result) {
                    Object.assign(
                        this._data.apiConfig,
                        result
                    );
                    resolve(this._data.apiConfig);
                } else {
                    reject(undefined);
                }
            }).catch((err)=> {
                console.warn('Get api config wrong', err);
                reject(undefined);
            });

        });
    }

    fetchHistoryList() {
        return new Promise((resolve, reject)=> {
            if(_.isEmpty(this._data.histories)) {
                m.request({
                    method: 'GET',
                    url: historyEndpoint,
                }).then((result)=> {
                    if(result && result.data) {
                        Object.assign(
                            this._data.histories,
                            ComponentHelpers.History.sortHistory(result.data)
                        );
                        this.broadcastDataChanges('histories');
                        resolve(this._data.histories);
                    } else {
                        reject(undefined);
                    }
                }).catch((err)=> {
                    console.warn('List history err', err);
                    reject(undefined);
                });
            } else {
                resolve(this._data.histories);
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
                    Objects.empty(this._data.currentHistory);
                    Object.assign(
                        this._data.currentHistory,
                        result.data,
                        {visualTests: ComponentHelpers.Visual.sortTestResults(result.data.visualTests)}
                    );
                    this.broadcastDataChanges('currentHistory');
                    resolve(this._data.currentHistory);
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
        return this._data.currentHistory;
    }

    setCurrentVisualTest(test) {
        Objects.empty(this._data.currentVisualTest);
        Object.assign(this._data.currentVisualTest, test);
        this.broadcastDataChanges('currentVisualTest');
        return this._data.currentVisualTest;
    }

    getCurrentVisualTest() {
        return this._data.currentVisualTest;
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
        Objects.empty(this._data.currentVisualReference);
        Object.assign(this._data.currentVisualReference,
            ComponentHelpers.Visual.findTestReference(test, this._data.currentHistory.visualReferences));
        this.broadcastDataChanges('currentVisualReference');
        return this._data.currentVisualReference;

    }

    getCurrentVisualTestReference() {
        return this._data.currentVisualReference;
    }

    setDetailsPanelVisibility(value=true) {
        this._detailsPanelVisibility = value;
    }

    isDetailsPanelVisible() {
        return this._detailsPanelVisibility;
    }

    /*---------------------- helpers -------------------------*/

}

module.exports = new DataService();

