import React, {useContext} from 'react';
import {IonContent, IonList, IonPage} from '@ionic/react';
import '../App.css';
import {AppContext} from '../State'
import ChatItem from "../components/ChatItem";

const Tab1 = () => {
	let {state, dispatch} = useContext(AppContext);

	return (
		<IonPage>
			<IonContent className="chat-screen">
				<IonList>
					{state.user.contacts.map(
						contact => <ChatItem key={`contact_${contact.id}`} {...contact}/>)}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Tab1;
