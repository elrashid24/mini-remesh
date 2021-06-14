export const searchConversationByTitle = async (title) => {
  try {
    let url = `http://localhost:5000/search/conversations?title=${title}`;
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
};

export const searchMessageByContent = async (conversationId, content) => {
  try {
    let url = `http://localhost:5000/search/messages?id=${conversationId.toString()}&content=${content}`;
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.error(err.message);
  }
};
