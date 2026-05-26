import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../types/auth-status';

export const changeCity = createAction<string>('city/change');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
