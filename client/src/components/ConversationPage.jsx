import React, { useState, useEffect } from "react";
import { getConversations, createConversation } from "../api/conversations";
import ListConversation from "./ListConversation";
import Search from "./SearchInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { searchConversationByTitle } from "../api/search";

const ConversationPage = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [searched, setSearched] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    handleFetchConversations();
  }, []);

  const handleFetchConversations = async () => {
    const conversationsData = await getConversations();
    setConversations(conversationsData);
    return;
  };

  const handleCreateConversation = async (event) => {
    event.preventDefault();
    const validated = checkFields(title, startDate);
    if (!validated) return;
    try {
      await createConversation({ title, startDate });
      handleResetConversationForm();
      handleFetchConversations();
      handleResetErrors();
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkFields = (title, startDate) => {
    if (title === "" || !startDate) {
      setErrors("Error: Title and Start Date cannot be blank.");
      return false;
    }
    return true;
  };

  const handleResetConversationForm = () => {
    setTitle("");
    setStartDate(new Date());
    setErrors("");
    return;
  };

  const handleSearchConversations = async (searchText) => {
    setSearched(true);
    const searchResults = await searchConversationByTitle(searchText);
    setFilteredConversations(searchResults);
    return;
  };

  const handleResetSearch = () => {
    setFilteredConversations([]);
    setSearched(false);
    return;
  };

  const handleResetErrors = () => {
    setErrors("");
    return;
  };

  const hasFilteredConvos = searched;

  return (
    <div className="container">
      <h3>Add a Conversation</h3>
      <p className="text-danger">{errors}</p>
      <form className="d-flex-column mt-5" onSubmit={handleCreateConversation}>
        <textarea
          type="text"
          placeholder="Enter a Title..."
          className="form-control text-center font-size-20"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <div className="btn-container mt-2">
          <button testid="submit-convo-button" className="btn btn-success">
            Start a Conversation
          </button>
        </div>
      </form>
      <h3 className="text-center mt 5">All Conversations</h3>
      <Search
        placeHolder={"Search Conversations by Title..."}
        onSubmit={handleSearchConversations}
        onReset={handleResetSearch}
      />
      <ListConversation
        conversations={
          hasFilteredConvos ? filteredConversations : conversations
        }
      />
    </div>
  );
};
export default ConversationPage;
