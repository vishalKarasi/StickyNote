import React from "react";
import NotePage from "@pages/NotePage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main id="app">
      <NotePage />
      <Toaster />
    </main>
  );
};

export default App;
