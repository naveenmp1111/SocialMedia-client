import React, { Suspense } from 'react';

// Lazy load the Explore component
const Explore = React.lazy(() => import('../../components/auth/explore'));

const ExplorePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Explore />
      </Suspense>
    </div>
  );
}

export default ExplorePage;
