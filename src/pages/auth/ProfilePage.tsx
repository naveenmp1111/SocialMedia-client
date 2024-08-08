import React, { Suspense } from 'react';
import CommonLoader from '../../components/others/CommonLoader';

// Lazy load the Profile component
const Profile = React.lazy(() => import('../../components/auth/profile'));

const UserProfile = () => {
  return (
    <Suspense fallback={<><CommonLoader/></>}>
      <Profile />
    </Suspense>
  );
};

export default UserProfile;
