import {Dates} from './../../lib/helpers/helpers';
import HistoryListMenuModel from './history-list-menu-model';

module.exports = class HistoryListMenuView {

    constructor(){
        this.title = 'History List view';
        this.histories = [];
    }

    oninit(vnode){
        console.log('HistoryListView init');
        HistoryListMenuModel.initState().then((results)=> {
            vnode.state.histories = results;
            m.redraw();
        });
    }

    view(vnode) {
        return m('div.b-history-list-menu', [
            m('h2', `${vnode.state.title}`),
            m('ul', vnode.state.histories.map((history) =>
                m('li', [
                    m('a[href=javascript:void(0);]',
                        {
                            onclick() {
                                HistoryListMenuModel.setCurrentHistory(history);
                            },
                        },
                        [
                            m('span', `${history.instance}`),
                            m('span', `| ${history.server}`),
                            m('span', `| ${Dates.getDate(history.createdAt)}`),
                            m('span', `| ${history.visualFailedTotal}`),
                        ]
                    ),
                ])
            )),
        ]);
    }

    onupdate() {
        console.log('onupdate history list view');
    }

};

