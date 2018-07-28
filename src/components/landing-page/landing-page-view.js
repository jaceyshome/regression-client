import LandingPageModel from './landing-page-model';
import HistoryListMenuView from '../history-list-menu/history-list-menu-view';
import VisualResultContainerView from '../visual-result-container/visual-result-container-view';
import ControlMenuView from '../control-menu/control-menu-view';

module.exports = class LandingPageView {

    constructor(){
        this.title = 'Landing page';
        this.historyId = null;
    }

    oninit() {
        console.log('landing page oninit');
    }

    view(vnode) {
        return m('div.b-landing-page', [
            m('h1', `${vnode.state.title}`),
            m(HistoryListMenuView),
            m(VisualResultContainerView),
            m(ControlMenuView),
        ]);
    }

    onupdate() {
        console.log('landing page onupdate !!!!!!!!!!!!!!!!!!', m.route.param('history'));

    }

};