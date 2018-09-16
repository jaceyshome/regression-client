import VisualResultContainerModel from './visual-result-container-model';
import VisualComparePanelView from './../visual-compare-panel/visual-compare-panel-view';
import VisualNavigationMapView from './../visual-navigation-map/visual-navigation-map-view';
import DetailsPanelView from './../details-panel/details-panel-view';
import VisualSlideNext from './../visual-slide-next/visual-slide-next-view';
import VisualSlidePrev from './../visual-slide-prev/visual-slide-prev-view';
import ControlMenuView from './../control-menu/control-menu-view';

module.exports = class VisualResultContainer {

    constructor(){
        this.title = 'VisualResultContainer';
    }

    view(vnode) {
        return m('.b-visual-result-container.grid.grid--flush', [
            m('.4/5.grid__cell.b-overlay__container', [
                m('h2.sr-only', `${vnode.state.title}`),
                VisualResultContainerModel.isDetailsPanelVisible() &&
                m('.b-overlay__cover.b-visual-result-container__details-container', [
                    m(DetailsPanelView),
                ]),
                m(VisualComparePanelView),
            ]),
            m('.1/5.grid__cell', [
                m('.b-box--padding-left-md-llg.b-visual-result-container__side-bar', [
                    m('.b-visual-result-container__nav-map.b-box--padding-top-base.b-box--margin-bottom-base', [
                        m(VisualNavigationMapView),
                    ]),
                    m('.b-visual-result-container__button-group', [
                        m(ControlMenuView),
                        m(VisualSlidePrev),
                        m(VisualSlideNext),
                    ]),
                ]),
            ]),

        ]);
    }

    onupdate() {
        console.log('onupdate VisualResultContainer');
    }

};
