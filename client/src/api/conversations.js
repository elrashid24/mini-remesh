export const getConversations = async () => {
  try {
    const response = await fetch("http://localhost:5000/conversations");
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const createConversation = ({ title, startDate }) => {
  return fetch("http://localhost:5000/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, startDate }),
  });
};
