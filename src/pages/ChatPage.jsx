import React, {useContext, useRef, useState} from 'react';
import SockJsClient from 'react-stomp'
import {
	IonAvatar,
	IonButton,
	IonCol,
	IonContent,
	IonFooter,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInput,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
	useIonViewWillEnter,
	useIonViewWillLeave
} from "@ionic/react";
import {AppContext} from "../State";
import {happyOutline, linkOutline, sendOutline} from "ionicons/icons";
import "../App.css"
import {getRandom} from "../Utility";
import {useFetch} from "use-http";
import ChatMessage from "../components/ChatMessage";
import {Camera, CameraResultType} from "@capacitor/core";

const ChatPage = props => {
	const {state, dispatch} = useContext(AppContext);
	const [message, setMessage] = useState();
	const [chatMessages = [], setChatMessages] = useState([]);
	const messageSubscription = useRef(null);

	const {chattingWith} = state;
	getRandom(state)
	const {get, post, response, loading, error} = useFetch(
		"http://localhost:8080/api/v1");
	const sendMessage = async (type = "text", file = null) => {
		if (message || type === "media") {
			let messageBody = {
				sentBy: state.user.id,
				channel: `${state.user.id}_${state.chattingWith.id}`,
				type,
				message: message || "",
				fileUrl: file
			};
			// const responseMessage = await post("/messages", messageBody);
			await messageSubscription.current.sendMessage('/pub/chat/message',
				JSON.stringify(messageBody));
			setMessage(null)
		}
	}

	const onReceivedMessage = (message) => {
		setChatMessages([...chatMessages, message]);
	}
	useIonViewWillEnter(async () => {
		dispatch({
			type: "setNoTabs",
			payload: true
		})
		// channel `user1,user2` or `user2,user1`
		let channel1 = `${state.user.id}_${state.chattingWith.id}`
		let channel2 = `${state.chattingWith.id}_${state.user.id}`
		const responseMessage = await get(
			`/messages?channels=${channel1},${channel2}&sort=createdDate,desc&size=100`)
		if (response.ok) {
			setChatMessages(responseMessage.data.content.reverse());
		}
	});

	useIonViewWillLeave(() => {
		dispatch({
			type: "setNoTabs",
			payload: false
		})
	});
	const getImage = async () => {
		const image = await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Base64
		})
		console.log(image);
		await sendMessage("media", image.base64String)
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar className="menu-bar">
					<IonAvatar slot="start"
					           style={{with: "40px", height: "40px", marginLeft: "10px"}}>
						<img style={{objectFit: "contain"}}
						     src={chattingWith.avatar}/>
					</IonAvatar>
					<IonTitle>{chattingWith.name}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="chat-page-content">
				{
					chatMessages.map(
						chat => {
							return <ChatMessage key={`chatMessage_${chat.id}`} chat={chat}/>
						})
				}
			</IonContent>
			<IonFooter>
				<IonToolbar>
					<IonGrid>
						<IonRow>
							<IonCol>
								<IonGrid>
									<IonRow>
										<IonCol size="2">
											<IonIcon size="large" icon={happyOutline}/>
										</IonCol>
										<IonCol>
											<IonInput
												value={message}
												onIonChange={(e) => setMessage(e.detail.value)}
												placeholder="Type a message"
											/>
										</IonCol>
										<IonCol size="2">
											<IonIcon className="media-icon" size="large"
											         icon={linkOutline}
											         onClick={() => getImage()}
											/>
										</IonCol>
									</IonRow>
								</IonGrid>
							</IonCol>
							<IonCol size="2">
								<IonButton
									onClick={() => sendMessage()}
									className="chat-send-button">
									<IonIcon icon={sendOutline}/>
								</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>
				</IonToolbar>
			</IonFooter>
			<SockJsClient
				url="http://localhost:8080/chat"
				topics={[`/sub/chat/${state.user.id}_${state.chattingWith.id}`,
					`/sub/chat/${state.chattingWith.id}_${state.user.id}`]}
				onMessage={(msg) => {
					onReceivedMessage(msg);
				}}
				ref={messageSubscription}
			/>
		</IonPage>
	);
};

ChatPage.propTypes = {};

export default ChatPage;
