import {Dates} from './../../lib/helpers/helpers';
import HistoryDetailsModel from './history-details-model';

module.exports = class HistoryDetailsView {

    constructor(){

    }

    view(vnode) {
        return m('.b-history-details', [

            m('.b-featured-table.b-component', [

                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Instance'),
                    m('.1/4.b-featured-table__cell', vnode.attrs.instance),
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Server'),
                    m('.1/4.b-featured-table__cell', vnode.attrs.server),
                ]),

                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Report'),
                    m('.3/4.b-featured-table__cell', [
                        HistoryDetailsModel.getReportLink(vnode.attrs.report) !== undefined &&
                        m('a.b-link.b-link--block.b-text--color-dark', {
                            href: `${HistoryDetailsModel.getReportLink(vnode.attrs.report)}`,
                        }, [
                            m('span.b-icon.b-icon--fa.b-icon--position-base-left.fa-external-link-alt', 'report link'),
                        ]),
                    ]),
                ]),

                vnode.attrs.createdAt !== undefined &&
                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Created at'),
                    m('.3/4.b-featured-table__cell', Dates.getDateTime(vnode.attrs.createdAt)),
                ]),

                vnode.attrs.visualFailedTotal !== undefined &&
                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Visual test fail total'),
                    m('.3/4.b-featured-table__cell', vnode.attrs.visualFailedTotal),
                ]),

            ]),
        ]);
    }

};

