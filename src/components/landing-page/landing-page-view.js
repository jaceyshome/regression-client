import HistoryListMenuView from '../history-list-menu/history-list-menu-view';
import VisualResultContainerView from '../visual-result-container/visual-result-container-view';
import ControlMenuView from '../control-menu/control-menu-view';

module.exports = class LandingPageView {

    constructor(){
        this.title = 'Landing page';
    }

    view(vnode) {
        return m('div.b-landing-page', [
            m('h1', `${vnode.state.title}`),
            m(HistoryListMenuView),
            m(VisualResultContainerView),
            m(ControlMenuView),
        ]);
    }

};