import {Dates} from './../../lib/helpers/helpers';
import HistoryListMenuModel from './../history-list-menu/history-list-menu-model';

module.exports = class VisualNavigationMapView {

    constructor(){
        this.title = 'VisualNavigationMapView';
        this.histories = [];
    }

    oninit(vnode){
        console.log('HistoryListView init');
    }

    view(vnode) {
        return m('div.b-visual-navigation-map', [
            m('h3', `${vnode.state.title}`),
        ]);
    }

    onupdate() {
        console.log('onupdate history list view');
    }

};