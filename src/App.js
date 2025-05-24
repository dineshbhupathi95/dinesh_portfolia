import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ScrollToTop from "./components/ScrollToTop";
import AuthPopup from './components/AuthPopup';

function App() {
  const [load, upadateLoad] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const authenticated = localStorage.getItem('siteAuthenticated');
    console.log(authenticated);
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <Router>
      {load ? (
        <Preloader load={load} />
      ) : (
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          {/* Show AuthPopup if NOT authenticated */}
          {!isAuthenticated ? (
  <AuthPopup visible={true} onAuthenticated={setIsAuthenticated} />
) : (
            // Show the site only if authenticated
            <>
              <Navbar />
              <ScrollToTop />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/project" component={Projects} />
                <Route path="/about" component={About} />
                <Route path="/resume" component={Resume} />
              </Switch>
              <Footer />
            </>
          )}
        </div>
      )}
    </Router>
  );
}

export default App;
