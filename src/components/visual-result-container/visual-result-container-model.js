import DataService from './../service/data-service';

class VisualResultContainerModel {

    isDetailsPanelVisible() {
        return DataService.isDetailsPanelVisible();
    }

    isHistoryListMenuVisible(){
        return DataService.isHistoryListMenuVisible();
    }
}

module.exports = new VisualResultContainerModel();

