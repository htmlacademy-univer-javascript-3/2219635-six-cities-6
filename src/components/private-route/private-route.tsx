import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Spinner from '../spinner/spinner';
import {selectAuthorizationStatus} from '../../store/selectors';
import {AuthorizationStatus} from '../../types/auth-status';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to="/login" />;
}

export default PrivateRoute;
