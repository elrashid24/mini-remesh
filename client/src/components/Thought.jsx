import React, { Fragment, useState, useEffect } from "react";
import { getThoughts, createThought } from "../api/thoughts";
import { useLocation } from "react-router-dom";
import ListThought from "./ListThought";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Thought = () => {
  const location = useLocation();
  const messageId = location.pathname.split("/")[2];
  const [thoughtText, setThoughtText] = useState("");
  const [sentDate, setSentDate] = useState(new Date());
  const [sentTime, setSentTime] = useState(new Date());
  const [thoughts, setThoughts] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    handleFetchThoughts(messageId);
  }, []);

  const handleFetchThoughts = async (messageId) => {
    const thoughtsData = await getThoughts(messageId);
    setThoughts(thoughtsData);
    return;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validated = checkFields(thoughtText, sentDate);
    if (!validated) return;

    try {
      await createThought({ messageId, thoughtText, sentDate, sentTime });
      handleResetForm();
      handleFetchThoughts(messageId);
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkFields = (thoughtText, startDate) => {
    if (thoughtText === "" || !startDate) {
      setErrors("Error: Thought Body and Sent Date cannot be blank.");
      return false;
    }
    return true;
  };

  const handleResetForm = () => {
    setThoughtText("");
    setSentDate(new Date());
    setSentTime(new Date());
    setErrors("");
    return;
  };

  return (
    <div className="container">
      <form className="d-flex-column mt-5" onSubmit={handleSubmit}>
        <h3>Add a Thought</h3>
        <p className="text-danger">{errors}</p>
        <textarea
          type="textarea"
          placeholder="Enter your thought..."
          className="form-control text-center font-size-20"
          value={thoughtText}
          onChange={(e) => {
            setThoughtText(e.target.value);
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
          <button className="btn btn-success">Send Thought</button>
        </div>
        <h3 className="text-center mt 5">Thoughts for this Message</h3>
      </form>
      <ListThought thoughts={thoughts} />
    </div>
  );
};
export default Thought;
