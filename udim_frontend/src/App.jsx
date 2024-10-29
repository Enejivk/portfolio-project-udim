import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './form/Authentication/Layout';
import RequireAuth from './form/Authentication/RequireAuth';
import { GroupProvider, useAuth } from './apiAndContext';
import authService from './backend/auth';

const LandingPage = lazy(() => import('./landingPage/index'));
const Register = lazy(() => import('./form/register/Register'));
const LoginForm = lazy(() => import('./form/login/Login'));
const Overview = lazy(() => import('./dashboard/overview/Overview'));
const Finances = lazy(() => import('./dashboard/finances/Finances'));
const Profile = lazy(() => import('./dashboard/profile/Profile'));
const Logout = lazy(() => import('./dashboard/logout/Logout'));
const Debtors = lazy(() => import('./dashboard/debtors/Debtors'));
const Groups = lazy(() => import('./dashboard/groups/Groups'));

const App = () => {
  const { login, logout, status, userData } = useAuth();
  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => {
        if (data) {
          login(data);
        } else {
          console.log('...........', data);
          logout();
        }
      })
      .catch((err) => {
        logout();
      });
  }, [status]);

  return (
    <GroupProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>

            {/* PUBLIC ROUTE NOT PROTECTED */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signUp" element={<Register />} />
            <Route path="/login" element={<LoginForm />} />

            {/* PROTECT ROUTE */}
            <Route element={<RequireAuth />} >
              <Route path="/home" element={<Overview />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/finances" element={<Finances />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/debtors" element={<Debtors />} />
            </Route>
          </Route>
        </Routes>
      </Suspense >
    </GroupProvider>
  );
};

export default App;
