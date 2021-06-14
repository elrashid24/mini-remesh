import { fireEvent, render, screen } from "@testing-library/react";
import MessagePage from "../components/MessagePage";
import { getMessages } from "../api/messages";
jest.mock("../api/messages", () => {
  return {
    __esModule: true,
    getMessages: jest.fn(),
    createMessage: jest.fn(),
  };
});
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
}));

test("renders the messages page", async () => {
  getMessages.mockImplementationOnce(() => []);
  render(<MessagePage />);
  const pageTitle = await screen.findByText(/Add a Message/i);
  expect(pageTitle).toBeInTheDocument();
  expect(getMessages).toHaveBeenCalled();
});

test("should call createMessage when the form is submitted", async () => {
  getMessages.mockImplementationOnce(() => []);
  render(<MessagePage />);
  const messageBodyInput = await screen.findByPlaceholderText(
    /enter your message.../i
  );
  const messageBody = "test new message";
  fireEvent.change(messageBodyInput, {
    target: { value: messageBody },
  });

  expect(messageBodyInput.value).toBe(messageBody);

  // Submit the form
  // Mock implementation (return the newly created convo.)
  // Test to see that it shows up in the list.
});

test("should error when submitting blank message body", async () => {
  getMessages.mockImplementationOnce(() => []);
  render(<MessagePage />);
  const messageBodyInput = await screen.findByPlaceholderText(
    /enter your message../i
  );
  const messageBody = "";
  fireEvent.change(messageBodyInput, {
    target: { value: messageBody },
  });

  expect(messageBodyInput.value).toBe(messageBody);

  const submitButton = screen.getByText("Send Message");

  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText(
    "Error: Message Body and Start Date cannot be blank."
  );

  expect(errorMessage).toBeInTheDocument();
});

test("should clear search when pressing reset", async () => {
  getMessages.mockImplementationOnce(() => []);
  render(<MessagePage />);
  const searchBodyInput = await screen.findByPlaceholderText(
    /search messages by message content../i
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
