import { useHistory } from "react-router-dom";

const ListConversations = ({ conversations }) => {
  const history = useHistory();
  const handleViewMessage = (conversationId) => {
    history.push("/messages/" + conversationId);
    return;
  };

  return (
    <table className="table mt-5 text-center">
      <thead>
        <tr>
          <th>Title</th>
          <th>Submission Date</th>
          <th>View Messages...</th>
        </tr>
      </thead>
      <tbody>
        {conversations.map((conversation) => (
          <tr key={conversation.conversation_id}>
            <td>{conversation.title}</td>
            <td>{conversation.title_date.split("T")[0]}</td>
            <td>
              <button
                className="btn btn-success"
                onClick={() => handleViewMessage(conversation.conversation_id)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListConversations;
