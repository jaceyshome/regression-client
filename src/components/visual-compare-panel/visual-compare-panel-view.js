import VisualComparePanelModel from './visual-compare-panel-model';


module.exports = class VisualComparePanelView {

    constructor(){
        this.title = 'VisualComparePanelView';
    }

    view(vnode) {
        return m('div.b-visual-compare-panel', [
            m('h3', `${vnode.state.title}`),
            m('div', `test link: ${VisualComparePanelModel.getVisualTest().url}`),
            m('div', `pass: ${VisualComparePanelModel.getVisualTest().pass}`),
            m('div', `visualTest: ${VisualComparePanelModel.getVisualTestImage()}`),
            m('img', {src : VisualComparePanelModel.getVisualTestReferenceImage()}),
        ]);
    }


};

