import React, { Suspense } from 'react';

// Lazy load the Home component
const Home = React.lazy(() => import('../../components/auth/home'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    </div>
  );
}

export default HomePage;
