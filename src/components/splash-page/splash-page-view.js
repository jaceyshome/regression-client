import SplashPageModel from './splash-page-model';
import SpinnerView from './../spinner/spinner-view';

module.exports = class SplashPageView {

    constructor() {
        this._looper = null;
        this._dataLoaded = false;
        this._routeToMainInvokedCount = 0;
    }

    oninit() {
        this._dataLoaded = false;
        Promise.all([
            SplashPageModel.fetchConfig(),
            SplashPageModel.fetchHistoryList(),
        ]).then(() => {
            this._dataLoaded = true;
            if (this._routeToMainInvokedCount) {
                this.routeToMain();
            }
        });
    }

    view() {
        return m('.b-page.b-page--bg-dark.b-page--position-fixed', [
            m('.b-container.b-container--center.b-container--size-full', [
                m(SpinnerView),
            ]),
        ]);
    }

    oncreate() {
        this._looper = setTimeout(this.routeToMain.bind(this), 2000);
    }

    routeToMain() {
        this._routeToMainInvokedCount++;
        if (this._dataLoaded) {
            clearTimeout(this._looper);
            m.route.set('/landing');
        }
    }

};
