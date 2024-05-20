import React, { useState } from "react";
// import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import { SportsProvider } from "./contexts/SportsContext.jsx";
import Sports from "./pages/Sports.jsx";
import SportList from "./components/SportList.jsx";
import Form from "./components/Form.jsx";
import Sport from "./components/Sport.jsx";
import UpdateSportForm from "./components/UpdateSportForm.jsx";
import Auth from "./pages/Auth.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminReg from "./components/AdminReg.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UsersProvider } from "./contexts/UserContext.jsx";
import UserRegister from "./components/UserRegister.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthProvider>
        <SportsProvider>
          <UsersProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path={"app"} element={<Sports />}>
                  <Route index element={<Navigate replace to={"sports"} />} />
                  <Route path={"sports"} element={<SportList />} />
                  <Route path={"sports/:id"} element={<Sport />}></Route>
                  <Route
                    path={"sports/:id/edit"}
                    element={<UpdateSportForm />}
                  />
                  <Route path={"form"} element={<Form />} />
                </Route>
                {/*<Route path={"dashboard"} element={<Dashboard />} />*/}
                <Route path={"auth"} element={<Auth />}>
                  <Route index element={<Navigate replace to={"login"} />} />
                  <Route path={"login"} element={<AdminLogin />} />
                  <Route path={"register"} element={<AdminReg />} />
                  <Route path={"user_register"} element={<UserRegister />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </UsersProvider>
        </SportsProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
