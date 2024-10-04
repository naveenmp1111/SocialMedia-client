import React, { Suspense } from 'react';
// import ExplorePagePostsLoader from '../../components/others/ExplorePagePostsLoader';
import CommonLoader from '../../components/others/CommonLoader';

// Lazy load the Explore component
const Explore = React.lazy(() => import('../../components/auth/explore'));

const ExplorePage = () => {
  return (
    <div>
      <Suspense fallback={
        <>
          <CommonLoader/>
        </>
      }>
        <Explore />
      </Suspense>
    </div>
  );
}

export default ExplorePage;
