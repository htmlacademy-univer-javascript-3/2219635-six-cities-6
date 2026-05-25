import {Link} from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div style={{textAlign: 'center', paddingTop: '100px'}}>
      <h1>404 Not Found</h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
}

export default NotFoundPage;
