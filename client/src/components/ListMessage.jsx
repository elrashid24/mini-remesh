import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const ListMessage = ({ messages }) => {
  const history = useHistory();

  const handleViewThought = (messageId) => {
    history.push("/thoughts/" + messageId);
    return;
  };

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Message</th>
            <th>Submission Date</th>
            <th>View Thoughts...</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.message_id}>
              <td>{message.message_text}</td>
              <td>{message.sent_date.split("T")[0]}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleViewThought(message.message_id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListMessage;
