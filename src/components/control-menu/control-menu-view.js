import ControlMenuModel from './control-menu-model';

module.exports = class ControlMenuView {

    constructor(){
        this.title = 'ControlMenuView';
    }

    view(vnode) {
        return m('div.b-control-menu', [
            m('h2', `${vnode.state.title}`),
        ]);
    }

};

