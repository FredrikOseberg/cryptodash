import { combineReducers } from 'redux';
import selectedCurrencies from './selectedCurrency';
import currentCurrency from './currentCurrency';
import auth from './auth';
import localCurrency from './localCurrency';
import exchange from './exchange';

const rootReducer = combineReducers({ selectedCurrencies, auth, currentCurrency, localCurrency, exchange });

export default rootReducer;
