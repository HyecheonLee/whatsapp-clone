import React, {useContext, useState} from 'react';
import {
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLoading,
	IonPage,
	IonTitle,
	IonToolbar
} from "@ionic/react";
import "../App.css"
import {AppContext} from "../State";
import {useFetch} from "use-http";

const Login = props => {

	const [passcode, setPasscode] = useState();
	const {state, dispatch} = useContext(AppContext);
	const {get, response, loading, error} = useFetch(
		"http://localhost:8080/api/v1");

	const login = async () => {
		//show login progress
		const user = await get(`/users?passcode=${passcode}`);
		if (response.ok) {
			dispatch({
				type: "loadUser",
				payload: user
			})
		}
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar className="login-bar">
					<IonTitle>Two-step verification</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<div className="passcode-text">
					Enter a four digit passcode which you'll be asked for when you
					register your phone number with WhatsApp-Clone :
				</div>
				<div className="passcode-input-section">
					<IonItem className="passcode-input">
						<IonInput value={passcode}
						          onIonChange={(e) => setPasscode(e.detail.value)}>
						</IonInput>
					</IonItem>
				</div>
				<IonButton onClick={() => login()} className="login-button"
				           disabled={!passcode}>
					Login
				</IonButton>
				<IonLoading
					isOpen={loading}
					message={"please wait...."}
				>
				</IonLoading>
			</IonContent>
		</IonPage>
	);
};

Login.propTypes = {};

export default Login;
