import StateService from './../service/state-service';
import DataService from './../service/data-service';

class VisualResultContainerModel {

    isDetailsPanelVisible() {
        return DataService.isDetailsPanelVisible();
    }

}

module.exports = new VisualResultContainerModel();

