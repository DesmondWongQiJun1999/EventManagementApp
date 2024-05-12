import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./Login/Login";
import UserList from "./UserPage/UserList";
import AdminList from "./AdminPage/AdminList";
  
function App() {
    
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/user" element={<UserList/>}/>
        <Route exact path="/admin" element={<AdminList/>}/>
      </Routes>
      </BrowserRouter>
      </>
  );
}
  
export default App;