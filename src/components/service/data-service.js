import _ from 'lodash';

import {Objects} from './../../lib/helpers/helpers';
import config from './../../config';
import Constant from './../constant/constant';
import ComponentHelpers from './../component-helpers/component-helpers';
import AbstractDataService from './../../lib/abstract-data-service';

const historyEndpoint = `${config.apiRootPath}history`;
const visualEndpoint = `${config.apiRootPath}visual`;

class DataService extends AbstractDataService {

    constructor() {
        super();

        this._data = {
            componentStates: {
                detailsPanelVisibility: false,
                historyListMenuVisibility: false,
                loadingCurrentHistory: false,
            },
            apiConfig: {},
            histories : [],
            currentHistory : {},
            currentVisualTest: {},
            currentVisualReference: {},
        };

    }

    getTestResultRootPath() {
        return config.outputPath;
    }

    fetchConfig() {
        return new Promise((resolve, reject)=> {
            m.request({
                method: 'GET',
                url: `${config.apiRootPath}`,
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

    fetchHistoryList(limit=10) {
        return new Promise((resolve, reject)=> {
            if(_.isEmpty(this._data.histories)) {
                m.request({
                    method: 'GET',
                    url: `${historyEndpoint}?limit=${limit}`,
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

        this.setLoadingCurrentHistoryState(true);

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
            }).finally(()=> {
                this.setLoadingCurrentHistoryState(false);
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
                    Object.assign(
                        this._data.currentHistory.visualTests.find((test)=> {
                            return test._id === result.data.approvedVisualTest._id;
                        }), result.data.approvedVisualTest);
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

    setLoadingCurrentHistoryState(state=true) {
        this._data.componentStates.loadingCurrentHistory = state;
        this.broadcastDataChanges('componentStates');
    }

    getCurrentVisualTestReference() {
        return this._data.currentVisualReference;
    }

    setDetailsPanelVisibility(value=true) {
        this._data.componentStates.detailsPanelVisibility = value;
        this.broadcastDataChanges('componentStates');
    }

    isDetailsPanelVisible() {
        return this._data.componentStates.detailsPanelVisibility;
    }

    setHistoryListMenuVisibility(value=true) {
        this._data.componentStates.historyListMenuVisibility = value;
        this.broadcastDataChanges('componentStates');
    }

    isHistoryListMenuVisible() {
        return this._data.componentStates.historyListMenuVisibility;
    }

    isLoadingHistory() {
        return this._data.componentStates.loadingCurrentHistory;
    }

    /*---------------------- helpers -------------------------*/

}

module.exports = new DataService();

