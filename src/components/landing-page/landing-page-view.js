import HistoryListMenuView from '../history-list-menu/history-list-menu-view';

module.exports = class LandingPageView {

    constructor(){
        this.title = 'Landing page';
    }

    oninit() {
        console.log('landing page oninit');
    }

    view(vnode) {
        return m('div.b-landing-page', [
            m('h2', `${vnode.state.title}`),
            m(HistoryListMenuView),
        ]);
    }

    oncreate() {
        console.log('landing page oncreate');
    }


};

