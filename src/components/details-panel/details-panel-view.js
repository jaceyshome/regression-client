import DetailsPanelModel from './details-panel-model';

module.exports = class DetailsPanelView {

    constructor(){
        this.title = 'DetailsPanelView';
    }

    view(vnode) {
        return m('div.b-details-panel', [
            m('h3', `${vnode.state.title}`),
            m('p', `${DetailsPanelModel.getTestName()}`),
            m('p', `${DetailsPanelModel.getTestPageUrl()}`),
            m('h4', 'Test'),
            m('p', `Created at ${DetailsPanelModel.getTestCreateDateTime()}`),
            m('p', `Browser ${DetailsPanelModel.getTestBrowserInfo()}`),
            m('h4', 'Reference'),
            m('p', `Created at ${DetailsPanelModel.getReferenceCreateDate()}`),
            m('p', `Browser: ${DetailsPanelModel.getReferenceBrowserInfo()}`),
        ]);
    }

};

