import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

/* eslint-disable react/prop-types */
export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must request a reset first.</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset your password {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
