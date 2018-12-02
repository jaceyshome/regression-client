import VisualSlideNextModel from './visual-slide-next-model';

module.exports = class VisualSlideNextView {

    constructor(){
        this.title = 'VisualSlidePrevView';
    }

    view(vnode) {
        return m('div.b-visual-slide-next', [
            m('h3.sr-only', `${vnode.state.title}`),
            m('a.b-button.b-button--light-grey.b-button--hover-right.b-icon.b-icon--fa.b-icon--position-base-left.fa-chevron-circle-right[href=javascript:void(0);]',
                {
                    onclick() {
                        VisualSlideNextModel.setNextTest();
                    },
                },
                [
                    m('span.b-button__text', `show next (${VisualSlideNextModel.getNextResultIndex()})`),
                ]
            ),
        ]);
    }

};
