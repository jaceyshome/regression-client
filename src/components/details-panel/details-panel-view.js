import DetailsPanelModel from './details-panel-model';

module.exports = class DetailsPanelView {

    constructor(){
        this.title = 'Details';
    }

    view(vnode) {
        return m('div.b-details-panel', [
            m('h3.b-title.b-title--h2.b-text--label', `${vnode.state.title}`),
            m('p', `${DetailsPanelModel.getTestName()}`),
            m('a.b-link', {
                href: `${DetailsPanelModel.getTestPageUrl()}`,
            }, `${DetailsPanelModel.getTestPageUrl()}`),

            DetailsPanelModel.isResultPass() &&
            m('p', 'The test is pass.'),

            DetailsPanelModel.isResultFailed() &&
            m('p', 'The test is failed.'),

            DetailsPanelModel.isResultApproved() &&
            m('p', `Approved at ${DetailsPanelModel.getTestApprovedDateTime()}`),

            m('.b-link--block.b-box--margin-bottom-md-lg'),

            m('h4.b-title.b-title--h3', 'Test'),
            m('p', `Created at ${DetailsPanelModel.getTestCreateDateTime()}`),
            m('p.b-box--margin-bottom-md-lg', `Browser ${DetailsPanelModel.getTestBrowserInfo()}`),

            m('h4.b-title.b-title--h3', 'Reference'),
            m('p', `Created at ${DetailsPanelModel.getReferenceCreateDate()}`),
            m('p', `Browser: ${DetailsPanelModel.getReferenceBrowserInfo()}`),
        ]);
    }

};

