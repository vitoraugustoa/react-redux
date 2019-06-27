import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import DashboardReducer from '../dashboard/redux/dashboardReducer';
import TabReducer from '../common/tab/redux/tabReducer';
import BillingCycleReducer from '../billingCycle/redux/billingCycleReducer';
import AuthReducer from '../auth/redux/authReducer';

const rootReducer = combineReducers ({
    dashboard: DashboardReducer,
    tab: TabReducer,
    billingCycle: BillingCycleReducer,
    form: formReducer,
    toastr: toastrReducer,
    auth: AuthReducer
});

export default rootReducer;