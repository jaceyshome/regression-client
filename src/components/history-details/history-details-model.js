import DataService from '../service/data-service';
import _ from 'lodash';

class HistoryDetailsModel {

    constructor() {
    }

    getReportLink(report) {
        return (_.isEmpty(report)) ? undefined : `${DataService.getTestResultRootPath()}/${report.report}`;
    }

}

module.exports = new HistoryDetailsModel();
