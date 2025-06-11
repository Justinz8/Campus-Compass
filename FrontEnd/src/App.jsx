import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { auth } from './helper/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerificationForm from './pages/VerificationForm';


function App() {
  
  //0 is loading state
  //1 is logged in
  //-1 is not logged in
  const [LoggedIn, setLoggedIn] = useState(0);
  
  /*
    Component that helps guard routes
    if the LgnTrigger is satisfied (Login state is not Logged in or Logged in)
    then it will automatically reroute to the specified routePath
    Otherwise it will go to the intended route as normal
  */
  function ProtectedRoute({ target, reroutePath, LgnTrigger }){
    if(LoggedIn==0) return
    if(LoggedIn==LgnTrigger){
      return <Navigate to={reroutePath} replace />
    }
    return target
  }

   useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setLoggedIn(1);
            } else {
              setLoggedIn(-1);
            }
        });
    }, []);

  return (
    <div className='Main'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute reroutePath={"/Login"} LgnTrigger={-1} target={<Home />} />
          } />
          <Route path="/login" element={
            <ProtectedRoute reroutePath={"/"} LgnTrigger={1} target={<Login />} />
          } />
          <Route path="/register" element={
            <ProtectedRoute reroutePath={"/"} LgnTrigger={1} target={<Register />} />
          } />
          <Route path="/verify" element={<VerificationForm />} />

        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
