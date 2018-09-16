import SpinnerView from './../spinner/spinner-view';
import DataService from './../service/data-service';

module.exports = class HistoryDetailsView {

    constructor(){

    }

    view(vnode) {
        return m('.b-history-details', [

            m('.b-featured-table.b-component', [

                vnode.attrs.instance &&
                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Instance'),
                    m('.3/4.b-featured-table__cell', vnode.attrs.instance),
                ]),

                vnode.attrs.server &&
                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Server'),
                    m('.3/4.b-featured-table__cell', vnode.attrs.server),
                ]),

                vnode.attrs.dateTime &&
                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Date time'),
                    m('.3/4.b-featured-table__cell', vnode.attrs.dateTime),
                ]),

                vnode.attrs.visualFailedTotal !== undefined &&
                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Visual test fail total'),
                    m('.3/4.b-featured-table__cell', vnode.attrs.visualFailedTotal),
                ]),

            ]),

            DataService.isLoadingHistory() &&
            m('.b-container.b-container--center.b-container--size-full', [
                m(SpinnerView),
            ]),

        ]);
    }

};

