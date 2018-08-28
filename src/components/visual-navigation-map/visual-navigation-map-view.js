import VisualNavigationMapModel from './visual-navigation-map-model';


module.exports = class VisualNavigationMapView {

    constructor(){
        this.title = 'VisualNavigationMapView';
    }

    view(vnode) {
        return m('div.b-visual-navigation-map', [
            m('h3', `${vnode.state.title}`),
            m('div', `${VisualNavigationMapModel.getScreenShot()}`),
        ]);
    }

};