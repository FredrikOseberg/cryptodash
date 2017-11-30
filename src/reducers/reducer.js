import { combineReducers } from 'redux';
import selectedCurrencies from './selectedCurrency';
import currentCurrency from './currentCurrency';
import auth from './auth';
import localCurrency from './localCurrency';
import portfolio from './portfolio';

const rootReducer = combineReducers({ selectedCurrencies, auth, currentCurrency, localCurrency, portfolio });

export default rootReducer;
