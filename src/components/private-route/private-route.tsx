import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Spinner from '../spinner/spinner';
import {RootState} from '../../store';
import {AuthorizationStatus} from '../../types/auth-status';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to="/login" />;
}

export default PrivateRoute;
