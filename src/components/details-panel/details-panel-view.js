import DetailsPanelModel from './details-panel-model';

module.exports = class DetailsPanelView {

    constructor(){
        this.title = 'Details';
    }

    view(vnode) {
        return m('div.b-details-panel', [
            m('h3.b-title.b-title--h2.b-text--label', `${vnode.state.title}`),
            m('p', `${DetailsPanelModel.getTestName()}`),
            m('a.b-link.b-link--block.b-box--margin-bottom-md-lg', {
                href: `${DetailsPanelModel.getTestPageUrl()}`,
            }, `${DetailsPanelModel.getTestPageUrl()}`),

            m('h4.b-title.b-title--h3', 'Test'),
            m('p', `Created at ${DetailsPanelModel.getTestCreateDateTime()}`),
            m('p.b-box--margin-bottom-md-lg', `Browser ${DetailsPanelModel.getTestBrowserInfo()}`),

            m('h4.b-title.b-title--h3', 'Reference'),
            m('p', `Created at ${DetailsPanelModel.getReferenceCreateDate()}`),
            m('p', `Browser: ${DetailsPanelModel.getReferenceBrowserInfo()}`),
        ]);
    }

};

