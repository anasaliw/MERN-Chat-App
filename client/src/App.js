import logo from "./logo.svg";
import "./App.css";
import { Box, Button } from "@chakra-ui/react";
import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/Protected/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/chats' element={<Chat />} /> */}
          <Route path='/chat' element={<ProtectedRoute Component={Chat} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
