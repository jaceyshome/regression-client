module.exports = class LandingPageView {

    constructor(vnode){
        this.title = 'Landing page';
    }

    view(vnode) {
        return m('div.b-landing-page', [
            m('h2', `${vnode.state.title}`),
        ]);
    }

    oninit(){
        console.log('initialized');
    }

    oncreate() {
        console.log('DOM created');
    }

    onbeforeupdate() {
        console.log('onbeforeupdate');
        return true;
    }

    onupdate() {
        console.log('DOM updated');
    }

    onbeforeremove() {
        console.log('exit animation can start');
        return new Promise(function(resolve) {
            // call after animation completes
            resolve();
        });
    }

    onremove() {
        console.log('removing DOM element');
    }

};

