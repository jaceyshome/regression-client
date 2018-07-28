
module.exports = class VisualComparePanelView {

    constructor(){
        this.title = 'VisualComparePanelView';
    }

    oninit(vnode){

    }

    view(vnode) {
        return m('div.b-visual-compare-panel', [
            m('h3', `${vnode.state.title}`),
        ]);
    }

    onupdate() {

    }

};

