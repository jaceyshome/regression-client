
module.exports = class SpinnerView {

    constructor(){

    }

    view() {
        return m('.b-spinner', [
            m('.b-spinner__child.b-spinner__child--1'),
            m('.b-spinner__child.b-spinner__child--2'),
            m('.b-spinner__child.b-spinner__child--3'),
            m('.b-spinner__child.b-spinner__child--4'),
            m('.b-spinner__child.b-spinner__child--5'),
            m('.b-spinner__child.b-spinner__child--6'),
        ]);
    }

};
