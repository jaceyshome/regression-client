import platform from 'platform';

class DetailsPanelModel {

    getTestResultState(vnode) {
        if(Object.is(vnode.attrs.pass, undefined) || vnode.attrs.pass === true) {
            return 'passed';
        }

        if(vnode.attrs.pass === false ) {
            return 'pending';
        }

        if(vnode.attrs.pass === true && !Object.is(vnode.attrs.approvedAt, undefined)) {
            return 'approved';
        }
    }

    getBrowserInfo(vnode) {
        let info = platform.parse(vnode.attrs.browser);
        return `${info.name} ${info.version}`;
    }
}

module.exports = new DetailsPanelModel();


