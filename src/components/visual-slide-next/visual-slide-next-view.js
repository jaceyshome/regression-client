import VisualSlideNextModel from './visual-slide-next-model';

module.exports = class VisualSlideNextView {

    constructor(){
        this.title = 'VisualSlidePrevView';
    }

    view(vnode) {
        return m('div.b-visual-slide-next', [
            m('h3.sr-only', `${vnode.state.title}`),
            m('a.b-link[href=javascript:void(0);]',
                {
                    onclick() {
                        VisualSlideNextModel.setNextTest();
                    },
                },
                [
                    m('span', 'next'),
                ]
            ),
        ]);
    }

};