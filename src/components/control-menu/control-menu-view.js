import ControlMenuModel from './control-menu-model';

module.exports = class ControlMenuView {

    constructor(){
        this.title = 'ControlMenuView';
    }

    view(vnode) {
        return m('div.b-control-menu', [
            m('h3.sr-only', `${vnode.state.title}`),

            m(`a.b-button.b-button--hover-right.b-button--gap-1px
            .b-icon.b-icon--fa.b-icon--position-base-left.fa-feather[href=javascript:void(0);]
            ${ControlMenuModel.isShowingDetails() ? '.b-button--sky' : '.b-button--light-grey'}`, {
                onclick(){ControlMenuModel.toggleDetailsPanel();},
            }, [m('span.b-button__text', `${ControlMenuModel.getDetailsButtonText()}`)]),

            ControlMenuModel.getFailedTotal() !== 0 &&
            m('p.b-box--padding-left-sm.b-icon.b-icon--fa.b-icon--position-base-left.fa-bug', `${ControlMenuModel.getFailedTotal()} failed tests`),

            ControlMenuModel.isResultFailed() &&
            m(`a.b-button.b-button--hover-right.b-button--gap-1px
            .b-icon.b-icon--fa.b-icon--position-base-left.fa-thumbs-up[href=javascript:void(0);]
            ${ControlMenuModel.isShowingDetails() ? '.b-button--light-grey' : '.b-button--sky'}`, {
                onclick(){ControlMenuModel.approveTest();},
            }, [m('span.b-button__text', 'approve test')]),

            ControlMenuModel.isResultPass() &&
            m('p.b-box--padding-left-sm.b-icon.b-icon--fa.b-icon--position-base-left.fa-hand-peace', 'passed'),

            ControlMenuModel.isResultApproved() &&
            m('p.b-box--padding-left-sm.b-icon.b-icon--fa.b-icon--position-base-left.fa-handshake', 'approved'),

        ]);
    }

};

