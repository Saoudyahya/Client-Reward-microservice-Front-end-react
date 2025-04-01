import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import ClientTables from './pages/Client-Table';
import ClientForm from './pages/Form/clientForm';
import RewardForm from './pages/Form/RewardForm';
import UserForm from './pages/Form/UserForm';
import RewardTables from './pages/Reward-table';

import UserTables from './pages/User';
import { isAdmin } from './components/jwt/jwt';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isAuthorized = () => {
    // Check if user is admin
    return isAdmin();
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="eCommerce Dashboard" />
                <ECommerce />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Profile" />
                <Profile />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Form Elements" />
                <FormElements />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Form Layout" />
                <FormLayout />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/Client"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Form Client" />
                <ClientForm />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/User"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Form User" />
                <UserForm />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/forms/Rewards"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Rewards Form" />
                <RewardForm />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Tables" />
                <Tables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Clients"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Clients Table" />
                <ClientTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Rewards"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Rewards Table" />
                <RewardTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/tables/Users"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Users Table" />
                <UserTables />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/ui/alerts"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Alerts" />
                <Alerts />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/ui/buttons"
          element={
            isAuthorized() ? (
              <>
                <PageTitle title="Buttons" />
                <Buttons />
              </>
            ) : (
              <Navigate to="/auth/signin" replace />
            )
          }
        />
        <Route
          path="/auth/signin"
          element={<SignIn />}
        />
        <Route
          path="/auth/signup"
          element={<SignUp />}
        />
      </Routes>
    </>
  );
}

export default App;
