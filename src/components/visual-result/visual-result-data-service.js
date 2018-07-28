import config from './../../config';

const endpoint = `${config.apiRootPath}/visual`;

class VisualResultDataService {

    constructor(){
        this.histories = [];
        this.selectedHistory = null;
    }


}

module.exports = new VisualResultDataService();

