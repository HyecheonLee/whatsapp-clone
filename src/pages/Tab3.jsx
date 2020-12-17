import React from 'react';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3 = () => {
	return (
		<IonPage>
			<IonContent fullscreen>
				<ExploreContainer name="Tab 3 page"/>
			</IonContent>
		</IonPage>
	);
};

export default Tab3;
