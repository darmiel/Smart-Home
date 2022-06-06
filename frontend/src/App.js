import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './Components/Homepage'
import useToken from "./Components/useToken";
import Login from "./Components/Login";

function App() {

    const { token, removeToken, setToken } = useToken();

  return (
      <>
      <h1 className="text-white text-3xl text-center mt-4 mb-4">Smart Home</h1>
    <BrowserRouter>
      <div className="App">
        {!token && token!=="" &&token!== undefined?
        <Login setToken={setToken} />
        :(
          <>
            <Routes>
              <Route exact path="/" element={<Homepage token={token} setToken={setToken}/>}></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
          </>
  );
}

export default App;
