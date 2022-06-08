import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/Router";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./store/reducer";

function App() {
  const store = createStore(reducer);
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
