import VisualComparePanelView from './../visual-compare-panel/visual-compare-panel-view';
import VisualNavigationMapView from './../visual-navigation-map/visual-navigation-map-view';
import DetailsPanelView from './../details-panel/details-panel-view';
import VisualSlideNext from './../visual-slide-next/visual-slide-next-view';
import VisualSlidePrev from './../visual-slide-prev/visual-slide-prev-view';

module.exports = class VisualResultContainer {

    constructor(){
        this.title = 'VisualResultContainer';
    }

    view(vnode) {
        return m('div.b-visual-result-container', [
            m('h2.sr-only', `${vnode.state.title}`),
            m(VisualComparePanelView),
            m(DetailsPanelView),
            m(VisualNavigationMapView),
            m(VisualSlidePrev),
            m(VisualSlideNext),
        ]);
    }

    onupdate() {
        console.log('onupdate VisualResultContainer');
    }

};
