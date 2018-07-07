import Component from './../../lib/component';

module.exports = class LandingPage extends Component {

    constructor(vnode){
        super(vnode);

        this.title = 'Landing page';
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

    view() {
        return m('div.b-landing-page', [
            m('h2', 'Landing page'),
        ]);
    }
};

