import ControlMenuModel from './control-menu-model';

module.exports = class ControlMenuView {

    constructor(){
        this.title = 'ControlMenuView';
    }

    view(vnode) {
        return m('div.b-control-menu', [
            m('h3.sr-only', `${vnode.state.title}`),

            m('a.b-link.b-link--block[href=javascript:void(0);]',
                {
                    onclick(){ControlMenuModel.toggleDetailsPanel();},
                },
                [m('span', 'show failed only')]
            ),

            m('a.b-link.b-link--block[href=javascript:void(0);]',
                {
                    onclick(){ControlMenuModel.toggleDetailsPanel();},
                },
                [m('span', 'show approved only')]
            ),

            m('a.b-link.b-link--block[href=javascript:void(0);]',
                {
                    onclick(){ControlMenuModel.toggleDetailsPanel();},
                },
                [m('span', 'toggle details')]
            ),

            ControlMenuModel.isResultFailed() &&
            m('a.b-link.b-link--block[href=javascript:void(0);]',
                {
                    onclick(){ControlMenuModel.approveTest();},
                },
                [m('span', 'approve test')]
            ),

            ControlMenuModel.isResultPass() &&
            m('p', 'pass'),

            ControlMenuModel.isResultApproved() &&
            m('p', 'approved'),

        ]);
    }

};

