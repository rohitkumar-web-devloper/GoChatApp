import React, { useEffect } from 'react';
import Routes from './src/Navigation/Routes.js';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/Store.js';
const App = () => {
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <NativeBaseProvider>
               <Routes />
            </NativeBaseProvider>
         </PersistGate>
      </Provider>
   );
};

export default App;
