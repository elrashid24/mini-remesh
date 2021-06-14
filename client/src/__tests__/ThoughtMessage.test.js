import { fireEvent, render, screen } from "@testing-library/react";
import Thought from "../components/Thought";
import { getThoughts } from "../api/thoughts";
jest.mock("../api/thoughts", () => {
  return {
    __esModule: true,
    getThoughts: jest.fn(),
    createThought: jest.fn(),
  };
});
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/example/path",
  }),
}));

test("renders the thoughts page", async () => {
  getThoughts.mockImplementationOnce(() => []);
  render(<Thought />);
  const thoughtTitle = await screen.findByText(/Add a Thought/i);
  expect(thoughtTitle).toBeInTheDocument();
  expect(getThoughts).toHaveBeenCalled();
});

test("should call createThought when the form is submitted", async () => {
  getThoughts.mockImplementationOnce(() => []);
  render(<Thought />);
  const thoughtBodyInput = await screen.findByPlaceholderText(
    /enter your thought.../i
  );
  const thoughtBody = "test new thought";
  fireEvent.change(thoughtBodyInput, {
    target: { value: thoughtBody },
  });

  expect(thoughtBodyInput.value).toBe(thoughtBody);

  // Submit the form
  // Mock implementation (return the newly created convo.)
  // Test to see that it shows up in the list.
});

test("should error when submitting blank thought body", async () => {
  getThoughts.mockImplementationOnce(() => []);
  render(<Thought />);
  const thoughtBodyInput = await screen.findByPlaceholderText(
    /enter your thought../i
  );
  const thoughtBody = "";
  fireEvent.change(thoughtBodyInput, {
    target: { value: thoughtBody },
  });

  expect(thoughtBodyInput.value).toBe(thoughtBody);

  const submitButton = screen.getByText("Send Thought");

  fireEvent.click(submitButton);

  const errorMessage = await screen.findByText(
    "Error: Thought Body and Sent Date cannot be blank."
  );

  expect(errorMessage).toBeInTheDocument();
});
