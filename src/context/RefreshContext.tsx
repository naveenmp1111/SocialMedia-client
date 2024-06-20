// import React, { createContext, useState } from 'react';

// const RefreshContext = createContext();

// export const RefreshProvider = ({ children }) => {
//     const [refresh, setRefresh] = useState(false);

//     const triggerRefresh = () => {
//         setRefresh(prev => !prev);  // toggle state to trigger refresh
//     };

//     return (
//         <RefreshContext.Provider value={{ refresh, triggerRefresh }}>
//             {children}
//         </RefreshContext.Provider>
//     );
// };

// export default RefreshContext;
