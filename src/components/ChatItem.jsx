import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {
	IonAvatar,
	IonBadge,
	IonItem,
	IonLabel,
	useIonViewWillEnter
} from "@ionic/react";
import {useHistory} from "react-router";
import {AppContext} from "../State";
import {useFetch} from "use-http";
import SockJsClient from "react-stomp";

const ChatItem = ({id, name, avatar, lastSeen}) => {
	const history = useHistory();
	const {state, dispatch} = useContext(AppContext);
	const [lastMessage, setLastMessage] = useState({});
	const [previousLastMessage, setPreviousLastMessage] = useState({});
	const [newMessageCount, setNewMessageCount] = useState(0);

	useRef(null)
	const {get, response, loading, error} = useFetch(
		"http://localhost:8080/api/v1");
	const goToChat = (e) => {
		history.push("/chat-page");
		dispatch({
			type: "setChattingWith",
			payload: {
				id, name, avatar, lastSeen
			}
		});
	}
	const toMessage = (message) => {
		setPreviousLastMessage(lastMessage);
		setLastMessage(message);
	}
	useEffect(() => {
		if (lastMessage.id !== previousLastMessage.id) {
			setNewMessageCount(newMessageCount + 1)
		}
	}, [lastMessage, previousLastMessage])
	useIonViewWillEnter(async () => {
		const responseMessage = await get(
			`/messages/send/${id}/to/${state.user.id}/last-message`)
		if (response.ok) {
			if (responseMessage.content && responseMessage.content.length > 0) {
				setPreviousLastMessage(responseMessage.content[0]);
				setLastMessage(responseMessage.content[0]);
			}
		}
	});
	return (
		<>
			<IonItem onClick={goToChat}>
				<IonAvatar slot={"start"}>
					<img
						style={{objectFit: "contain"}}
						src={avatar
						|| "https://png.clipart.me/istock/previews/9349/93493545-people-icon.jpg"}
						alt="icon"/>
				</IonAvatar>
				<IonLabel>
					<h2>{name}</h2>
					<p>
						{lastMessage.message || "..."}
					</p>
				</IonLabel>
				{newMessageCount > 0 &&
				<IonBadge color="success" slot="end">
					{newMessageCount}
				</IonBadge>
				}
			</IonItem>
			<SockJsClient
				url="http://localhost:8080/chat"
				topics={[`/sub/chat/user/${id}/last-message`]}
				onMessage={message => toMessage(message)}
			/>
		</>
	);
};

ChatItem.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string,
	avatar: PropTypes.string,
	lastSeen: PropTypes.string
};

export default ChatItem;
