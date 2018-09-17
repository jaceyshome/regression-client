import ControlMenuModel from './control-menu-model';

module.exports = class ControlMenuView {

    constructor(){
        this.title = 'ControlMenuView';
    }

    view(vnode) {
        return m('div.b-control-menu', [
            m('h3.sr-only', `${vnode.state.title}`),

            m('a.b-button.b-button--light-grey.b-button--hover-right.b-button--gap-1px.b-icon.b-icon--fa.b-icon--position-base-left.fa-bug[href=javascript:void(0);]',
                {
                    onclick(){ControlMenuModel.toggleDetailsPanel();},
                },
                [m('span.b-button__text', 'show failed only')]
            ),

            m('a.b-button.b-button--light-grey.b-button--hover-right.b-button--gap-1px.b-icon.b-icon--fa.b-icon--position-base-left.fa-kiwi-bird[href=javascript:void(0);]',
                {
                    onclick(){ControlMenuModel.toggleDetailsPanel();},
                },
                [m('span.b-button__text', 'show approved only')]
            ),

            m('a.b-button.b-button--light-grey.b-button--hover-right.b-button--gap-1px.b-icon.b-icon--fa.b-icon--position-base-left.fa-feather[href=javascript:void(0);]',
                {
                    onclick(){ControlMenuModel.toggleDetailsPanel();},
                },
                [m('span.b-button__text', 'toggle details')]
            ),

            ControlMenuModel.isResultFailed() &&
            m('a.b-button.b-button--sky.b-button--hover-right.b-button--gap-1px.b-icon.b-icon--fa.b-icon--position-base-left.fa-thumbs-up [href=javascript:void(0);]',
                {
                    onclick(){ControlMenuModel.approveTest();},
                },
                [m('span.b-button__text', 'approve test')]
            ),

            ControlMenuModel.isResultPass() &&
            m('p.b-box--padding-left-sm.b-icon.b-icon--fa.b-icon--position-base-left.fa-hand-peace', 'passed'),

            ControlMenuModel.isResultApproved() &&
            m('p.b-box--padding-left-sm.b-icon.b-icon--fa.b-icon--position-base-left.fa-handshake', 'approved'),

        ]);
    }

};

