import {Dates} from './../../lib/helpers/helpers';
import DataService from './../service/data-service';
import ScreenshotDetailsModel from './screenshot-details-model';

module.exports = class ScreenshotDetailsView {

    constructor(){

    }

    view(vnode) {
        return m('.b-history-details', [

            m('.b-featured-table.b-component', [

                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Browser'),
                    m('.1/4.b-featured-table__cell', vnode.attrs.browser),
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Created at'),
                    m('.1/4.b-featured-table__cell', Dates.getDateTime(vnode.attrs.createdAt)),
                ]),

                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Test image'),
                    m(`${vnode.attrs.visualDifferPath ? '.1/4' : '.3/4'}.b-featured-table__cell`, [
                        m('a.b-link.b-link--block.b-text--color-dark', {
                            href: `${DataService.getTestResultRootPath()}/${vnode.attrs.visualScreenshotPath}`,
                            download: true,
                        }, [
                            m('span.b-icon.b-icon--fa.b-icon--position-base-left.fa-download', 'download'),
                        ]),
                    ]),
                    vnode.attrs.visualDifferPath &&
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Differ image'),

                    vnode.attrs.visualDifferPath &&
                    m('.1/4.b-featured-table__cell', [
                        m('a.b-link.b-link--block.b-text--color-dark', {
                            href: `${DataService.getTestResultRootPath()}/${vnode.attrs.visualDifferPath}`,
                            download: true,
                        }, [
                            m('span.b-icon.b-icon--fa.b-icon--position-base-left.fa-download', 'download'),
                        ]),
                    ]),
                ]),

                //For visual test screenshot image, not the reference
                Object.is(vnode.attrs.visualReferenceId, undefined) === false &&
                m('.b-featured-table__row', [
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Status'),
                    m(`${vnode.attrs.approvedAt ? '.1/4' : '.3/4'}.b-featured-table__cell`,
                        `${ScreenshotDetailsModel.getTestResultState(vnode)}`),
                    vnode.attrs.approvedAt &&
                    m('.1/4.b-featured-table__cell.b-featured-table__cell--head', 'Approved at'),

                    vnode.attrs.approvedAt &&
                    m('.1/4.b-featured-table__cell', Dates.getDateTime(vnode.attrs.approvedAt)),

                ]),

            ]),
        ]);
    }

};

