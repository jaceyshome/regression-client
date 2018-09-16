import LandingPageModel from './landing-page-model';
import HistoryListMenuView from './../history-list-menu/history-list-menu-view';
import VisualResultContainerView from '../visual-result-container/visual-result-container-view';

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
        return m('.b-page.b-page--bg-dark', LandingPageModel.isReady() ? [
            m('h1.sr-only', `${vnode.state.title}`),
            m('.b-section-container', [
                m(HistoryListMenuView),
                m('.b-animation', {
                    'class' : LandingPageModel.getMainColumnClass(),
                }, [m(VisualResultContainerView)]
                ),
            ]),
        ]: []);
    }

};
