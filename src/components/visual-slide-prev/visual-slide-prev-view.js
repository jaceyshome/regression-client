import VisualSlidePrevModel from './visual-slide-prev-model';

module.exports = class VisualSlidePrevView {

    constructor(){
        this.title = 'VisualSlideNextView';
    }

    view(vnode) {
        return m('div.b-visual-slide-next', [
            m('h3.sr-only', `${vnode.state.title}`),
            m('a.b-link[href=javascript:void(0);]',
                {
                    onclick() {
                        VisualSlidePrevModel.setPreviousTest();
                    },
                },
                [
                    m('span', 'prev'),
                ]
            ),
        ]);
    }

};
