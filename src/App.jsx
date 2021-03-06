import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {
	IonApp,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './App.css';
import {AppContext} from "./State";
import Login from "./pages/Login";
import ChatPage from "./pages/ChatPage";

const App = () => {
	const {state, dispatch} = useContext(AppContext)

	return (
		<IonApp>
			{
				state.user ?
					<IonReactRouter>
						<IonTabs>
							<IonRouterOutlet>
								<Route path="/tab1" component={Tab1} exact={true}/>
								<Route path="/tab2" component={Tab2} exact={true}/>
								<Route path="/tab3" component={Tab3}/>
								<Route path="/chat-page" component={ChatPage}/>
								<Route path="/" render={() => <Redirect to="/tab1"/>}
								       exact={true}/>
							</IonRouterOutlet>
							{state.noTabs ?
								(<IonTabBar></IonTabBar>) :
								(<IonTabBar slot="top" className="menu-bar">
									<IonTabButton tab="tab1" href="/tab1" className="tabButton">
										<IonLabel>CHATS</IonLabel>
									</IonTabButton>
									<IonTabButton tab="tab2" href="/tab2" className="tabButton">
										<IonLabel>STATUS</IonLabel>
									</IonTabButton>
									<IonTabButton tab="tab3" href="/tab3" className="tabButton">
										<IonLabel>CALLS</IonLabel>
									</IonTabButton>
								</IonTabBar>)}
						</IonTabs>
					</IonReactRouter> :
					<Login/>
			}
		</IonApp>
	)
};

export default App;
