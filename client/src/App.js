import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./Pages/home/Home";
import List from "./Pages/list/List";
import Hotel from "./Pages/hotel/Hotel";
import Login from "./Pages/Login/Login";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  // const ProtectedRoute = ({children}) => {
  //   const {user} = useContext(AuthContext)

  //   if(!user) {
  //       return <Navigate to="/login" />
  //   }
  //   return children
  // }
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/"
        element={ 
          <Home/>   
      } /> 
      <Route path="/hotels" 
       element={    
        <List/>       
      } />
      <Route path="/hotels/:id" element={<Hotel />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
    );
}

export default App;
