import Component from './../../lib/component';

module.exports = class SplashPage extends Component{

    constructor(vnode) {
        super(vnode);

        this._looper = null;
        this._dataLoaded = false;
        this._routeToMainInvokedCount = 0;
    }

    routeToMain() {
        this._routeToMainInvokedCount++;
        if (this._dataLoaded) {
            clearTimeout(this._looper);
            m.route.set('/landing');
        }
    }

    oninit(vnode) {
        this._dataLoaded = false;
        Promise.all([
            // Fetch all necessary data here
        ]).then(() => {
            this._dataLoaded = true;
            if (this._routeToMainInvokedCount) {
                this.routeToMain();
            }
        });
    }

    oncreate(vnode) {
        this._looper = setTimeout(this.routeToMain.bind(this), 2000);
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

};