import VisualComparePanelModel from './visual-compare-panel-model';

module.exports = class VisualComparePanelView {

    constructor(){
        this.title = 'VisualComparePanelView';
    }

    oncreate() {
        VisualComparePanelModel.createImageViewer();
    }

    view(vnode) {
        return m('div.b-visual-compare-panel', {
            style: VisualComparePanelModel.getContainerStyle(),
        }, [
            m('h3.sr-only', `${vnode.state.title}`),
            m('.b-visual-compare-panel__holder', {
                id: VisualComparePanelModel.getImageViewerId(),
            }),

        ]);
    }


};

