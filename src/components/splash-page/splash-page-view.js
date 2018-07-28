import SplashPageModel from './splash-page-model';

module.exports = class SplashPageView {

    constructor() {
        this._looper = null;
        this._dataLoaded = false;
        this._routeToMainInvokedCount = 0;
    }

    oninit() {
        this._dataLoaded = false;
        Promise.all([
            SplashPageModel.fetchHistoryList(),
        ]).then(() => {
            this._dataLoaded = true;
            if (this._routeToMainInvokedCount) {
                this.routeToMain();
            }
        });
    }

    view(/*vnode*/) {
        return m('.holder', [
            m('.preloader', [
                m('div'),
                m('div'),
                m('div'),
                m('div'),
                m('div'),
                m('div'),
                m('div'),
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