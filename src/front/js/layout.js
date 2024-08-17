import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { LoginForm } from "./component/login";
import { Register } from "./component/register";
import { RequestResetPassword } from "./component/requestResetPassword";
import { ResetPassword } from "./component/resetPassword";
import { Home } from "./pages/home";
import { NewPizza } from "./component/newPizza";
import { SearchResults } from "./pages/searchResults";
import { Cart } from "./pages/cart";
import injectContext from "./store/appContext";
import { Checkout} from "./pages/checkout";
import { Confirmation} from "./pages/confirmation";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<LoginForm />} path="/" />
                        <Route element={<LoginForm />} path="/login" />
                        <Route element={<RequestResetPassword />} path="/requestResetPassword" />
                        <Route element={<Confirmation/>} path="/confirmation" />   
                        <Route element={<Checkout/>} path="/checkout" />
                        <Route element={<Cart />} path="/cart" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<ResetPassword />} path="/resetPassword" />
                        <Route element={<Home />} path="/home" />   
                        <Route element={<NewPizza />} path="/newPizza" />                      
                        {/* <Route element={<Demo />} path="/demo" /> */}
                        
                        <Route element={<SearchResults />} path="/search/:searchTerm" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
