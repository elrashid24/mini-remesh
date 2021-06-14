import { fireEvent, render, screen } from "@testing-library/react";
import ConversationPage from "../components/ConversationPage";
import { getConversations } from "../api/conversations";
jest.mock("../api/conversations", () => {
  return {
    __esModule: true,
    getConversations: jest.fn(),
    createConversation: jest.fn(),
  };
});

test("renders the conversations page", async () => {
  getConversations.mockImplementationOnce(() => []);
  render(<ConversationPage />);
  const pageTitle = await screen.findByText(/Add a Conversation/i);
  expect(pageTitle).toBeInTheDocument();
  expect(getConversations).toHaveBeenCalled();
});

test("should call createConversation when the form is submitted", async () => {
  getConversations.mockImplementationOnce(() => []);
  render(<ConversationPage />);
  const conversationTitleInput = await screen.findByPlaceholderText(
    /enter a title.../i
  );
  const testTitle = "test new conversation";
  fireEvent.change(conversationTitleInput, {
    target: { value: testTitle },
  });

  expect(conversationTitleInput.value).toBe(testTitle);

  // Submit the form
  // Mock implementation (return the newly created convo.)
  // Test to see that it shows up in the list.
});

test("should error when submitting blank title", async () => {
  getConversations.mockImplementationOnce(() => []);
  render(<ConversationPage />);
  const conversationTitleInput = await screen.findByPlaceholderText(
    /enter a title.../i
  );
  const testTitle = "";
  fireEvent.change(conversationTitleInput, {
    target: { value: testTitle },
  });

  expect(conversationTitleInput.value).toBe(testTitle);

  const submitButton = screen.getByText("Start a Conversation");

  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText(
    "Error: Title and Start Date cannot be blank."
  );

  expect(errorMessage).toBeInTheDocument();
});

test("errors should clear after inputing title and submitting ", async () => {
  getConversations.mockImplementationOnce(() => []);
  render(<ConversationPage />);
  const conversationTitleInput = await screen.findByPlaceholderText(
    /enter a title.../i
  );
  const blankTestTitle = "";
  const testTitle = "Test Title";
  fireEvent.change(conversationTitleInput, {
    target: { value: blankTestTitle },
  });

  expect(conversationTitleInput.value).toBe(blankTestTitle);

  const submitButton = screen.getByText("Start a Conversation");

  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText(
    "Error: Title and Start Date cannot be blank."
  );

  expect(errorMessage).toBeInTheDocument();

  fireEvent.change(conversationTitleInput, {
    target: { value: testTitle },
  });
});

test("should clear search when pressing reset", async () => {
  getConversations.mockImplementationOnce(() => []);
  render(<ConversationPage />);
  const searchBodyInput = await screen.findByPlaceholderText(
    /search conversations by title.../i
  );

  const searchBody = "Testing Search";
  fireEvent.change(searchBodyInput, {
    target: { value: searchBody },
  });

  expect(searchBodyInput.value).toBe(searchBody);

  const searchButton = screen.getByText("Search");

  fireEvent.click(searchButton);

  const resetButton = screen.getByText("Reset");

  fireEvent.click(resetButton);

  expect(searchBodyInput.value).toBe("");
});
