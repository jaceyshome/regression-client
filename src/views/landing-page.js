//var SampleComponent = require('../views/components/sample-component');
import SampleComponent from '../views/components/sample-component';
module.exports = class LandingPage {

    constructor(name){
        this.name = name ;
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
        return m('div', [
            m('h2', 'Congratulations, you made it!!'),
            m('p', 'You\'ve spun up your very first Mithril app :-)'),
            m(SampleComponent),
        ]);
    }

};