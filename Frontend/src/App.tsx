import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Steps/Home";
import Reservation from "./components/Reservation/Reservation";
import MyReservations from "./components/Reservation/MyReservations";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/myreservation" element={<MyReservations />} />
      </Routes>
    </div>
  );
}

export default App;
