import React, { Fragment, useState, useEffect } from "react";
import { getMessages, createMessage } from "../api/messages";
import ListMessage from "./ListMessage";
import Search from "./SearchInput";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { searchMessageByContent } from "../api/search";

const Message = () => {
  const location = useLocation();
  const conversationId = location.pathname.split("/")[2];

  const [messageText, setMessageText] = useState("");
  const [sentDate, setSentDate] = useState(new Date());
  const [sentTime, setSentTime] = useState(new Date());

  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searched, setSearched] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    handleFetchMessages(conversationId);
  }, []);

  const handleFetchMessages = async (conversationId) => {
    const messagesData = await getMessages(conversationId);
    setMessages(messagesData);
    return;
  };
  const handleCreateMessage = async (event) => {
    event.preventDefault();
    const validated = checkFields(messageText, sentDate);
    if (!validated) return;

    try {
      createMessage({ conversationId, messageText, sentDate, sentTime }).then(
        () => {
          handleResetMessageForm();
          handleFetchMessages(conversationId);
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkFields = (messageText, startDate) => {
    if (messageText === "" || !startDate) {
      setErrors("Error: Message Body and Start Date cannot be blank.");
      return false;
    }
    return true;
  };
  const handleResetMessageForm = () => {
    setMessageText("");
    setSentDate(new Date());
    setSentTime(new Date());
    setErrors("");
    setSearched(false);
    return;
  };

  const handleSearchMessages = async (searchText) => {
    setSearched(true);
    const searchResults = await searchMessageByContent(
      conversationId,
      searchText
    );
    setFilteredMessages(searchResults);
    return;
  };

  const handleResetSearch = () => {
    setFilteredMessages([]);
    return;
  };

  const hasFilteredMessages = searched;

  return (
    <div className="container">
      <form className="d-flex-column mt-5" onSubmit={handleCreateMessage}>
        <h3>Add a Message</h3>
        <p className="text-danger">{errors}</p>
        <textarea
          type="textarea"
          placeholder="Enter your message..."
          className="form-control text-center font-size-20"
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
          }}
        />
        <DatePicker
          selected={sentDate}
          onChange={(date) => setSentDate(date)}
        />
        <DatePicker
          selected={sentTime}
          onChange={(sentTime) => setSentTime(sentTime)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
        />
        <div className="btn-container mt-2">
          <button className="btn btn-success">Send Message</button>
        </div>
        <h3 className="text-center mt 5">Messages for this Conversation</h3>
      </form>
      <Search
        placeHolder={"Search Messages by Message Content..."}
        onSubmit={handleSearchMessages}
        onReset={handleResetSearch}
      />
      <ListMessage
        messages={hasFilteredMessages ? filteredMessages : messages}
      />
    </div>
  );
};
export default Message;
