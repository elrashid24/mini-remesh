export const getMessages = async (conversationId) => {
  try {
    const response = await fetch(
      "http://localhost:5000/messages/" + conversationId
    );
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const createMessage = (
  conversationId,
  messageText,
  sentDate,
  sentTime
) => {
  return fetch("http://localhost:5000/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(conversationId, messageText, sentDate, sentTime),
  });
};
