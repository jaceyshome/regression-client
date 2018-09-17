
class DetailsPanelModel {

    getTestResultState(vnode) {
        if(Object.is(vnode.attrs.pass, undefined) || vnode.attrs.pass === true) {
            return 'passed';
        }

        if(vnode.attrs.pass === false ) {
            return 'failed';
        }

        if(vnode.attrs.pass === true && !Object.is(vnode.attrs.approvedAt, undefined)) {
            return 'approved';
        }
    }
}

module.exports = new DetailsPanelModel();


