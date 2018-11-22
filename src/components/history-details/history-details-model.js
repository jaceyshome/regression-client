import DataService from '../service/data-service';

class HistoryDetailsModel {

    constructor() {
    }

    getReportLink(report) {
        return `${DataService.getTestResultRootPath()}/${report.report}`;
    }

}

module.exports = new HistoryDetailsModel();
