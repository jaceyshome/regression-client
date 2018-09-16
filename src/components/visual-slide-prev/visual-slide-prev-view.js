import VisualSlidePrevModel from './visual-slide-prev-model';

module.exports = class VisualSlidePrevView {

    constructor(){
        this.title = 'VisualSlideNextView';
    }

    view(vnode) {
        return m('div.b-visual-slide-next', [
            m('h3.sr-only', `${vnode.state.title}`),
            m('a.b-button.b-button--light-grey.b-button--hover-right.b-button--gap-1px.b-icon.b-icon--fa.b-icon--position-base-left.fa-chevron-circle-left[href=javascript:void(0);]',
                {
                    onclick() {
                        VisualSlidePrevModel.setPreviousTest();
                    },
                },
                [
                    m('span.b-button__text', 'show previous'),
                ]
            ),
        ]);
    }

};
