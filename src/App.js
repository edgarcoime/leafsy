import React from "react";
import Navbar from "./components/partials/Nav/Nav.component";
import Footer from "./components/partials/Footer/footer.component.jsx"
import LeafsyForm from "./pages/form.page/LeafsyForm.page";
import { Switch, Route } from "react-router-dom";

// css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import LoginPage from "./pages/login.page/login.page";
import RecoverPassword from "./pages/recoverPasswordPage/recover.password.page";
import RegistrationPage from "./pages/registration.page/registration.page";
import GoogleSignUp from "./pages/registration.page/google.page";

import LandingPage from "./pages/landing.page/landing.page";
import OrderTable from "./pages/tables.pages/orderTable.page.jsx";
import RequestTable from "./pages/tables.pages/requestTable.page.jsx";
import PrivateRoute from "./pages/PrivateRoute";
import AccountSettings from "./pages/account.page/AccountSettings.jsx";
import OrderConfirmation from "./pages/order-confirmation-page/order.confirmation.page";
import RegistrationConfirmation from "./pages/registration.confirmation.page/registration.confirmation.page";
import PublicRoute from "./pages/PublicRoute";

function App() {
  return (
    <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
          <Switch>
            <Route path="/" component={ LandingPage } exact />
            <PublicRoute path="/login" component={LoginPage} />
            <Route path="/register" component={RegistrationPage} />
            <Route path="/google-sign-up" component={GoogleSignUp} />
            <Route path="/recover" component={RecoverPassword} />
            <Route path="/form/:userId" component={LeafsyForm} />

            <Route path="/order-confirmation" component={OrderConfirmation} />
            <Route path="/registration-confirmation" component={RegistrationConfirmation} />
            <PrivateRoute path="/account" component={ AccountSettings } />
            <PrivateRoute path="/book-orders" component={OrderTable} />
            <PrivateRoute path="/recommendations" component={RequestTable} />
          </Switch>
          <Footer />
    </div>
  );
}

export default App;
