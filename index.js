/**
 * @format
 */

import { AppRegistry, View } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './Store/store';

const RootApp = () => {
    return (
        <Provider store={Store}>
            <App/>
        </Provider>
    )
}


AppRegistry.registerComponent(appName, () => RootApp);
