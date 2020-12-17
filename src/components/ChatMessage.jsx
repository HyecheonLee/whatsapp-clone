import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import "./ChatMessage.css"
import {getTime} from "../Utility";
import {AppContext} from "../State";
import {IonImg} from "@ionic/react";

const ChatMessage = ({chat}) => {
	const {state} = useContext(AppContext);
	let messageStyles = {};
	const convertedImage = chat.type === "media"
		? `data:image/jpeg;base64,${chat.fileUrl}` : "";
	if (state.user.id === chat.user.id) {
		messageStyles.backgroundColor = "#dcf8c6";
		messageStyles.float = "right";
	} else {
		// messageStyles.backgroundColor = "red";
		messageStyles.float = "left";
	}

	return (
		<div style={{clear: "both"}}>
			<div className="chat-message-box" style={messageStyles}>
				{chat.type === "media" && <IonImg src={convertedImage}/>}
				{chat.message}
				<div className="message-time">{getTime(chat.createdDate)}</div>
			</div>
		</div>
	);
};

ChatMessage.propTypes =
	{
		chat: PropTypes.shape({
			message: PropTypes.string,
			createdDate: PropTypes.string,
			type: PropTypes.string,
			fileUrl: PropTypes.string,
			user: PropTypes.shape({
				id: PropTypes.number
			})
		})
	};

export default ChatMessage;
