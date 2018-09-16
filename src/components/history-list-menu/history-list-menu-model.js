import StateService from './../service/state-service';
import DataService from './../service/data-service';
import {Dates} from './../../lib/helpers/helpers';

class HistoryListMenuModel {

    constructor() {
        this._hoverHistory = undefined;
    }

    getHistoryList() {
        return DataService.fetchHistoryList();
    }

    getHistoryDetails() {
        let candidate = this._hoverHistory || DataService.getCurrentHistory();
        if(!candidate) {
            return;
        }

        return Object.assign({}, candidate, {
            dateTime: Dates.getDateTime(candidate.createdAt),
        });
    }

    setCurrentHistory(history) {
        return StateService.setCurrentHistory(history).then(StateService.hideHistoryListMenu);
    }

    setHoverHistory(history=undefined) {
        this._hoverHistory = history;
    }

    showHistoryDetails() {
        StateService.showHistoryListMenu();
    }

    isSelectedHistory(history) {
        return Object.is(history._id, DataService.getCurrentHistory()._id);
    }

    isShowingHistoryDetails(){
        return DataService.isHistoryListMenuVisible();
    }
}

module.exports = new HistoryListMenuModel();
