import React, {useEffect} from 'react';
import Routes from './src/Navigation/Routes.js';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/Redux/Store.js';
import io from 'socket.io-client';
import {Main_Base} from './src/Constant/Variable.js';
const App = () => {
   const socket = io(Main_Base);
   useEffect(() => {
      socket.on('connect', () => {});
   }, []);
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
