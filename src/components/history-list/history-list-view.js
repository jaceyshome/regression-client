import {Dates} from './../../lib/helpers/helpers';
import HistoryListModel from './history-list-model';


module.exports = class HistoryListView {

    constructor(){
        this.title = 'History List view';
        this.histories = [];
    }

    oninit(vnode){
        console.log('HistoryListView init');
        HistoryListModel.listHistory().then((results)=> {
            vnode.state.histories = results;
            m.redraw();
        });
    }

    view(vnode) {
        return m('div.b-history-list', [
            m('h2', `${vnode.state.title}`),
            m('ul', vnode.state.histories.map((history) =>
                m('li', [
                    m(`a[href=/landing?history=${history._id}]`, {oncreate: m.route.link}, [
                        m('span', `${history.instance}`),
                        m('span', `${history.server}`),
                        m('span', `${Dates.getDate(history.createdAt)}`),
                        m('span', `${history.allPass}`),
                    ]),
                ])
            )),
        ]);
    }

    onupdate() {
        console.log('onupdate history list view !!');


    }

};

