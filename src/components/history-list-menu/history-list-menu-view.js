import {Dates} from './../../lib/helpers/helpers';
import HistoryListMenuModel from './history-list-menu-model';

module.exports = class HistoryListMenuView {

    constructor(){
        this.title = 'History List view';
        this.histories = [];
    }

    oninit(vnode){
        console.log('HistoryListView init');
        HistoryListMenuModel.getHistoryList().then((results)=> {
            vnode.state.histories = results;
            m.redraw();
        });
    }

    view(vnode) {
        return m('div.b-history-list-menu', [
            m('h2.sr-only', `${vnode.state.title}`),
            m('ul.b-item-list', vnode.state.histories.map((history) => {
                return m(`li..b-history-list-menu__item.b-item-list__item${(history.visualFailedTotal > 0) && '.b-history-list-menu__item--failed'}`, [
                    m('a.b-link.b-link--block.b-box.b-box--padding-brick-sm.b-text.b-text--label[href=javascript:void(0);]',
                        {
                            onclick() {
                                HistoryListMenuModel.setCurrentHistory(history);
                            },
                        },
                        [
                            m('span.b-text.b-text--uppercase', `${history.server}`),
                            m('span.sr-only', ` | ${history.visualFailedTotal}`),
                        ]
                    ),
                ]);}
            )),
        ]);
    }

};

