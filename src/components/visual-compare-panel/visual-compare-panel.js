import {Dates} from './../../lib/helpers/helpers';


module.exports = class VisualComparePanel {

    constructor(){
        this.title = 'visual compare panel';
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

