import React from "react";
import "./App.css";
import VideoList from "./components/VideoList";

function App() {
  return (
    <div className="App">
      <VideoList />
      <Search />
    </div>
  );
}

export default App;
