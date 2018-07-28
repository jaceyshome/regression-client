import VisualComparePanelView from './../visual-compare-panel/visual-compare-panel-view';
import VisualNavigationMapView from './../visual-navigation-map/visual-navigation-map-view';
import VisualSlideNext from './../visual-slide-next/visual-slide-prev-view';
import VisualSlidePrev from './../visual-slide-prev/visual-slide-next-view';

module.exports = class VisualResultContainer {

    constructor(){
        this.title = 'VisualResultContainer';
    }

    oninit(vnode){
        console.log('VisualResultContainer init');
    }

    view(vnode) {
        return m('div.b-visual-result-container', [
            m('h2', `${vnode.state.title}`),
            m(VisualComparePanelView),
            m(VisualNavigationMapView),
            m(VisualSlidePrev),
            m(VisualSlideNext),
        ]);
    }

    onupdate() {
        console.log('onupdate VisualResultContainer');
    }

};