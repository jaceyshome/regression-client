import HistoryListMenuModel from './history-list-menu-model';
import HistoryDetailsView from './../history-details/history-details-view';

module.exports = class HistoryListMenuView {

    constructor(){
        this.title = 'History list';
        this.histories = [];
    }

    oninit(vnode){
        HistoryListMenuModel.getHistoryList().then((results)=> {
            vnode.state.histories = results;
            m.redraw();
        });
    }

    view(vnode) {
        return m(`.b-history-list-menu.b-box
            ${HistoryListMenuModel.isShowingHistoryDetails() && 
            '.b-history-list-menu--showing-details'}`, [

            m('.b-container.b-container--section', [

                m('.b-history-list-menu__top-bar', [
                    m('.b-history-list-menu__top-bar-wrapper', [
                        m('h2.b-title.b-history-list-menu__title', [

                            !HistoryListMenuModel.isShowingHistoryDetails() &&
                            m('a.b-history-list-menu__button.b-link.b-link--block' +
                                '[href=javascript:void(0);]', {
                                onclick() {
                                    HistoryListMenuModel.showHistoryDetails();
                                },
                            },[
                                m('span', `${vnode.state.title}`),
                            ]),

                            HistoryListMenuModel.isShowingHistoryDetails() &&
                            m('span', `${vnode.state.title}`),
                        ]),

                    ]),
                ]),

                HistoryListMenuModel.isShowingHistoryDetails() &&
                m('.b-history-list-menu__content', [
                    m('p', 'Latest 10 histories.'),
                    m('.grid.grid--flush', [
                        m('.1/5.grid__cell.b-rule.b-rule--heavy-right', [
                            m('.b-box.b-box--padding-right-base', [
                                m('ul.b-item-list.b-box--padding-right-base', vnode.state.histories.map((history) => {
                                    return m('li.b-item-list__item', [
                                        m(`a.b-history-list-menu__link.b-link.b-link--block.b-link--primary-to-right
                                .b-link--no-underline.b-box.b-box--padding-brick-sm
                                .b-icon.b-icon--fa.b-icon--position-base-left.fa-exclamation-circle
                                [href=javascript:void(0);]
                                ${HistoryListMenuModel.isSelectedHistory(history) &&
                                '.b-history-list-menu__link--selected'}
                                ${(history.visualFailedTotal > 0) &&
                                        '.b-history-list-menu__link--show-icon'}`, {
                                            onclick() {
                                                HistoryListMenuModel.setCurrentHistory(history);
                                            },
                                            onmouseover() {
                                                HistoryListMenuModel.setHoverHistory(history);
                                            },
                                            onfocus() {
                                                HistoryListMenuModel.setHoverHistory(history);
                                            },
                                            onmouseout() {
                                                HistoryListMenuModel.setHoverHistory();
                                            },
                                            onblur() {
                                                HistoryListMenuModel.setHoverHistory();
                                            },
                                        }, [
                                            m('span.b-text.b-text--label.b-text--weight-normal.b-text--capitalize.b-text--underline', `${history.server}`),
                                        ]),
                                    ]);}
                                )),
                            ]),
                        ]),
                        HistoryListMenuModel.getHistoryDetails() &&
                        m('.3/5.grid__cell', [
                            m('.b-box.b-box--padding-left-base', [
                                m(HistoryDetailsView, HistoryListMenuModel.getHistoryDetails()),
                            ]),
                        ]),
                    ]),
                ]),

            ]),

        ]);
    }

};

