import VisualNavigationMapModel from './visual-navigation-map-model';


module.exports = class VisualNavigationMapView {

    constructor(){
        this.title = 'VisualNavigationMapView';
    }

    view(vnode) {
        return m('div.b-visual-navigation-map', {
            style: { 'background-image': `url(${VisualNavigationMapModel.getScreenShot()})`},
        },[
            m('h3.sr-only', `${vnode.state.title}`),
        ]);
    }

};
