import { combineReducers } from 'redux';

import DashboardReducer from '../dashboard/redux/dashboardReducer';
import TabReducer from '../common/tab/redux/tabReducer';

const rootReducer = combineReducers ({
    dashboard: DashboardReducer,
    tab: TabReducer,
});

export default rootReducer;