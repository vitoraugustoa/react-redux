import { combineReducers } from 'redux';

import DashboardReducer from '../dashboard/redux/dashboardReducer';
import TabReducer from '../common/tab/redux/tabReducer';
import BillingCycleReducer from '../billingCycle/redux/billingCycleReducer';

const rootReducer = combineReducers ({
    dashboard: DashboardReducer,
    tab: TabReducer,
    billingCycle: BillingCycleReducer,
});

export default rootReducer;