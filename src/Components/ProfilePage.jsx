import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router} from "@reach/router";



import Notas from "./Home/Notas"
import Alumnoj from "./Home/alumnoj";
import SignIn from "./SignIn";

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };

  return (
    <div className="container ">
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="/alumnos">
          Sistema de notas
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <div className="form-inline my-2 my-lg-0">
              <h3 className="mr-sm-2">{email}</h3>

              <button
                className="btn btn-danger mt-0 mb-0 "
               
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </button>
              
              <br/>
            </div>
          </div>
        </div>
      </nav>

      <Router>
        <Alumnoj exact path="/alumnos" />
        
      </Router>
    </div>
  );
};

export default ProfilePage;

