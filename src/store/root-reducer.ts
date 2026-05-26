import {combineReducers} from '@reduxjs/toolkit';
import {appReducer} from './app/app.reducer';
import {dataReducer} from './data/data.reducer';
import {userReducer} from './user/user.reducer';
import {NameSpace} from '../types/namespace';

export const rootReducer = combineReducers({
  [NameSpace.App]: appReducer,
  [NameSpace.Data]: dataReducer,
  [NameSpace.User]: userReducer,
});
