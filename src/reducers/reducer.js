import { combineReducers } from 'redux';
import selectedCurrencies from './selectedCurrency';
import currentCurrency from './currentCurrency';
import auth from './auth';
import localCurrency from './localCurrency';

const rootReducer = combineReducers({ selectedCurrencies, auth, currentCurrency, localCurrency });

export default rootReducer;
