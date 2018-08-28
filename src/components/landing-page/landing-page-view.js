import LandingPageModel from './landing-page-model';
import HistoryListMenuView from './../history-list-menu/history-list-menu-view';
import VisualResultContainerView from '../visual-result-container/visual-result-container-view';
import ControlMenuView from './../control-menu/control-menu-view';

module.exports = class LandingPageView {

    constructor(){
        this.title = 'Landing page';
    }

    oninit(vnode) {
        LandingPageModel.initState().then((results)=> {
            vnode.state.histories = results;
            m.redraw();
        });
    }

    view(vnode) {
        return m('div.b-landing-page', LandingPageModel.isReady() ? [
            m('h1', `${vnode.state.title}`),
            m(HistoryListMenuView),
            m(VisualResultContainerView),
            m(ControlMenuView),
        ]: []);
    }

};