import VisualSlideNextModel from './visual-slide-next-model';

module.exports = class VisualSlideNextView {

    constructor(){
        this.title = 'VisualSlideNextView';
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