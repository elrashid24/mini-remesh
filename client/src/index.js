import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//components
import ConversationPage from "./components/ConversationPage";
import MessagePage from "./components/MessagePage";
import Thought from "./components/Thought";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <a href="/">
        <h1 className="text-center mb-5">Mini Remesh</h1>
      </a>
    </div>

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ConversationPage} />
        <Route exact path="/messages/:id" component={MessagePage} />
        <Route exact path="/thoughts/:id" component={Thought} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
