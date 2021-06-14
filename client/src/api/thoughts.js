export const getThoughts = async (messageId) => {
  try {
    const response = await fetch("http://localhost:5000/thoughts/" + messageId);
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const createThought = (messageId, thoughtText, sentDate, sentTime) => {
  return fetch("http://localhost:5000/thoughts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageId, thoughtText, sentDate, sentTime),
  });
};
