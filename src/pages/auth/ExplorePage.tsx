import React, { Suspense } from 'react';
import ExplorePagePostsLoader from '../../components/others/ExplorePagePostsLoader';

// Lazy load the Explore component
const Explore = React.lazy(() => import('../../components/auth/explore'));

const ExplorePage = () => {
  return (
    <div>
      <Suspense fallback={
        <>
          <div className='mt-20'>
            <ExplorePagePostsLoader />
          </div>
        </>
      }>
        <Explore />
      </Suspense>
    </div>
  );
}

export default ExplorePage;
