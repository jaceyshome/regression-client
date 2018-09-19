import DetailsPanelModel from './details-panel-model';
import HistoryDetailsView from './../history-details/history-details-view';
import ScreenshotDetailsView from './../screenshot-details/screenshot-details-view';

module.exports = class DetailsPanelView {

    constructor(){
        this.title = 'Details';
    }

    view(vnode) {
        return m('.b-details-panel', [
            m('.b-details-panel__content-container', [

                m('h2.b-title.b-title--h2.b-text--label', [
                    m('span.b-icon.b-icon--fa.b-icon--position-base-left.fa-feather', `${vnode.state.title}`),
                ]),
                m('p', `${DetailsPanelModel.getTestName()}.`),
                m('a.b-link.b-link--block', {
                    href: `${DetailsPanelModel.getTestPageUrl()}`,
                }, `${DetailsPanelModel.getTestPageUrl()}`),
                m('.b-component--paragraph'),

                m(HistoryDetailsView, DetailsPanelModel.getHistoryDetails()),
                m('.b-component'),

                m('h3.b-title.b-title--h3', 'Test'),
                m(ScreenshotDetailsView, DetailsPanelModel.getTestScreenshotDetails()),
                m('.b-component'),

                m('h3.b-title.b-title--h3', 'Reference'),
                m(ScreenshotDetailsView, DetailsPanelModel.getReferenceScreenshotDetails()),
                m('.b-component'),

            ]),
        ]);
    }

};

