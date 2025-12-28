import React from "react";
import Header from "./components/Layout/Header/Header";
import Home from "./pages/Home/Home";
import BookCafe from "./pages/BookCafe/BookCafe";
import Player from "./components/Layout/Player/Player";
import LateralMenu from "./components/Layout/LateralMenu/LateralMenu";
import { useUI } from "./store";

const App: React.FC = () => {
  const { enter } = useUI();

  return (
    <div className="App select-none">
      <Header />
      {enter ? <BookCafe /> : <Home />}
      <LateralMenu />
      <Player />
    </div>
  );
};

export default App;
