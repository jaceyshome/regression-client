import ControlMenuModel from './control-menu-model';

module.exports = class ControlMenuView {

    constructor(){
        this.title = 'ControlMenuView';
    }

    oninit(vnode){
        console.log('ControlMenuView init');
    }

    view(vnode) {
        return m('div.b-control-menu', [
            m('h2', `${vnode.state.title}`),
        ]);
    }

    onupdate() {
        console.log('onupdate ControlMenuView view');
    }

};

