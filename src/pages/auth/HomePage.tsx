import React, { Suspense } from 'react';
import CommonLoader from '../../components/others/CommonLoader';


// Lazy load the Home component
const Home = React.lazy(() => import('../../components/auth/home'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<CommonLoader/>}>
        <Home />
      </Suspense>
    </div>
  );
}

export default HomePage;
