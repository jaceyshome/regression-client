import VisualSlidePrevModel from './visual-slide-prev-model';

module.exports = class VisualSlidePrevView {

    constructor(){
        this.title = 'VisualSlideNextView';
    }

    view(vnode) {
        return m('div.b-visual-slide-next', [
            m('h3', `${vnode.state.title}`),
            m('a[href=javascript:void(0);]',
                {
                    onclick() {
                        VisualSlidePrevModel.setPreviousTest();
                    },
                },
                [
                    m('span', 'prev slide'),
                ]
            ),
        ]);
    }

};