import React from "react";
import { Routes, Route } from "react-router-dom";
import { PassageProvider } from "@passageidentity/passage-react";

import Home from "./views/Home";
import Forum from "./views/Forum";
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Events from "./views/Events";
import Therapy from "./views/Therapy";
import CrisisTextLine from "./views/CrisisTextLine"

function App() {
  return (
    <PassageProvider appId={process.env.REACT_APP_PASSAGE_APP_ID}>
      <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/forum" element={<Forum />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/events" element={<Events />}></Route>
            <Route path="/therapy" element={<Therapy />}></Route>
          <Route path="/crisistextline" element={<CrisisTextLine />}></Route>
          </Routes>
        </div>
    </PassageProvider>
  );
}

export default App;
