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
        return this._hoverHistory || DataService.getCurrentHistory();
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

    isHistoryListMenuVisible(){
        return DataService.isHistoryListMenuVisible();
    }
}

module.exports = new HistoryListMenuModel();
