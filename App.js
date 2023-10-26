import React, { useEffect } from 'react';
import Routes from './src/Navigation/Routes.js';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/Store.js';
import { AppState } from 'react-native';
import socket from './Socket.js';
const App = () => {
   useEffect(() => {
      const appState = AppState.addEventListener('change', (res) => {
         console.log(res)
         if (res == 'active') {
            socket.emit("status", 'active')
         }
      })
   }, [])
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
