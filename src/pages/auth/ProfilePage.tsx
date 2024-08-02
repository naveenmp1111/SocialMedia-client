import React, { Suspense } from 'react';

// Lazy load the Profile component
const Profile = React.lazy(() => import('../../components/auth/profile'));

const UserProfile = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile />
    </Suspense>
  );
};

export default UserProfile;
