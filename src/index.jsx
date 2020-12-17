import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AppContextProvider} from "./State";
import {defineCustomElements} from "@ionic/pwa-elements/loader";

const RootComponent = () => {
	return (
		<AppContextProvider>
			<App/>
		</AppContextProvider>
	)
}

ReactDOM.render(<RootComponent/>, document.getElementById('root'));
defineCustomElements(window);

serviceWorker.unregister();
