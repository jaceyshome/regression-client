import VisualSlidePrevModel from './visual-slide-prev-model';

module.exports = class VisualSlidePrevView {

    constructor(){
        this.title = 'VisualSlidePrevView';
    }

    oninit(vnode){

    }

    view(vnode) {
        return m('div.b-visual-slide-next', [
            m('h3', `${vnode.state.title}`),
        ]);
    }

    onupdate() {

    }

};