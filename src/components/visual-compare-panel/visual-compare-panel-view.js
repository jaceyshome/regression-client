import VisualComparePanelModel from './visual-compare-panel-model';


module.exports = class VisualComparePanelView {

    constructor(){
        this.title = 'VisualComparePanelView';
    }

    view(vnode) {
        return m('div.b-visual-compare-panel', [
            m('h3.sr-only', `${vnode.state.title}`),
            m('div.b-visual-compare-panel__layer .b-visual-compare-panel__layer--reference', [
                m('img.b-image.b-visual-compare-panel__reference-image',
                    { src : VisualComparePanelModel.getVisualTestReferenceImage()}),
            ]),
            m('div.b-visual-compare-panel__layer .b-visual-compare-panel__layer--test', [
                m('img.b-image', {src : VisualComparePanelModel.getVisualTestImage()}),
            ]),
        ]);
    }


};

