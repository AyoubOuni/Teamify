import React, { useEffect, useState } from "react";
import "./Register.css";
import { BiError } from "react-icons/bi";
import {
  Checknom,
  Checkemail,
  Checkpassword,
  CheckNumerotel,
} from "./CheckData";
import { v4 as uuid } from "uuid";
import ReactCountryFlag from "react-country-flag";

function Inscription() {
  const [Company, setcompany] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    tel: "",
    location: "",
  });
  ///////////////////////////////////////////
  const [nameIsValid, setnameIsValid] = useState(null);
  const [emailIsValid, setemailIsValid] = useState(null);
  const [telIsValid, settelIsValid] = useState(null);
  const [passwordIsValid, setpasswordIsValid] = useState(null);
  const [locationisvalid, setlocationIsValid] = useState(null);
  ///////////////////////////////////////////////////
  var name;
  var email;
  var password;
  var tel;
  var location;

  var id;

  const id_uuid = uuid();
  id = id_uuid.substr(24);
  Company.id = id;

  const testing = () => {
    if (Checknom(Company.name) === false || Company.name === "") {
      setnameIsValid(false);
      name = false;
    } else {
      setnameIsValid(true);
      name = true;
    }
    if (Checknom(Company.location) === false || Company.location === "") {
      setlocationIsValid(false);
      location = false;
    } else {
      setlocationIsValid(true);
      location = true;
    }

    if (Checkemail(Company.email) === false || Company.email === "") {
      setemailIsValid(false);
      email = false;
    } else {
      setemailIsValid(true);
      email = true;
    }
    if (CheckNumerotel(Company.tel) === false || Company.tel === "") {
      settelIsValid(false);
      tel = false;
    } else {
      settelIsValid(true);
      tel = true;
    }
    if (Checkpassword(Company.password) === false || Company.password === "") {
      setpasswordIsValid(false);
      password = false;
    } else {
      setpasswordIsValid(true);
      password = true;
    }
  };

    const envoyer=async  (e)=>  {
    e.preventDefault();
    testing();

    if (name && location && email && tel && password) {
      console.log(Company);
      alert("Valid");
    }
  };
  function showpassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div className="u">
      <div className="">
        <div className=" mt-3 d-flex justify-content-center">
          <div className="">
            <div className=" ">
              <span className="row mt-4 ms-1  d-flex justify-content-start mb-3">
                <label
                  htmlFor="name"
                  className="text-secondary  d-flex justify-content-start ms-3"
                >
                  Company name
                </label>
                <span className=" mt-2 width_little ms-3  col-9 ">
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    className="form-control"
                    onChange={(e) => {
                      setcompany({ ...Company, name: e.target.value });
                    }}
                    id="name"
                  />
                  {nameIsValid === false ? (
                    <div
                      style={{ top: "27%", right: "50.5%" }}
                      className="text-danger h-6 text-nowrap text position-relative position-absolute"
                    >
                      <BiError
                        style={{ bottom: "2px", right: "2%" }}
                        className="text-danger position-relative "
                      />
                      Invalide name Company
                    </div>
                  ) : (
                    ""
                  )}
                </span>
              </span>

              <span className="row mt-4 ms-1  d-flex justify-content-start mb-3">
                <label
                  htmlFor="name"
                  className="text-secondary  d-flex justify-content-start ms-3"
                >
                  Email adress
                </label>
                <span className=" mt-2 width_little ms-3  col-9 ">
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    className="form-control"
                    onChange={(e) => {
                      setcompany({ ...Company, email: e.target.value });
                    }}
                    id="email"
                  />
                  {emailIsValid === false ? (
                    <div
                      style={{ marginTop: "6px", right: "33%" }}
                      className="position-relative text-danger h-6 text-nowrap text"
                    >
                      <BiError
                        style={{ bottom: "2px", right: "1%" }}
                        className="text-danger position-relative "
                      />
                      Invalide E-mail
                    </div>
                  ) : (
                    ""
                  )}
                </span>
              </span>
              <span className="row mt-4 ms-1  d-flex justify-content-start mb-3">
                <label
                  htmlFor="name"
                  className="text-secondary  d-flex justify-content-start ms-3"
                >
                  Phone number
                </label>
                <span className=" mt-2 width_little ms-3  col-9 ">
                  <div className="input-group ">
                    <span className="input-group-text" id="basic-addon1">
                      <ReactCountryFlag
                        countryCode="TN"
                        svg
                        style={{
                          width: "25px",
                          height: "25px",
                        }}
                        title="TN"
                      />
                    </span>
                    <input
                      type="text"
                      style={{ height: "40px" }}
                      className="form-control"
                      onChange={(e) => {
                        setcompany({ ...Company, tel: e.target.value });
                      }}
                      id="tel"
                    />
                  </div>
                  {telIsValid === false ? (
                    <div
                      style={{ marginTop: "6px", right: "13%" }}
                      className="position-relative text-danger h-6 text-nowrap text"
                    >
                      <BiError
                        style={{ bottom: "1px", right: "1%" }}
                        className="text-danger position-relative "
                      />
                      Invalide N°Tel(must contain 8 chiffre!)
                    </div>
                  ) : (
                    ""
                  )}
                </span>
              </span>
              <span className="row mt-4 ms-1  d-flex justify-content-start mb-3">
                <label
                  htmlFor="name"
                  className="text-secondary  d-flex justify-content-start ms-3"
                >
                  Location
                </label>
                <span className=" mt-2 width_little ms-3  col-9 ">
                  <input
                    type="text"
                    style={{ height: "40px" }}
                    className="form-control"
                    onChange={(e) => {
                      setcompany({ ...Company, location: e.target.value });
                    }}
                    id="location"
                  />
                  {locationisvalid === false ? (
                    <div
                      style={{ top: "531px", right: "53.5%" }}
                      className="text-danger h-6 text-nowrap text position-relative position-absolute"
                    >
                      <BiError
                        style={{ bottom: "2px", right: "2%" }}
                        className="text-danger position-relative "
                      />
                      Invalide Location
                    </div>
                  ) : (
                    ""
                  )}
                </span>
              </span>
              <span className="row mt-4  d-flex justify-content-center mb-3">
                <span className="i width_little ms-4  col-6 ">
                  <label
                    htmlFor=""
                    className="justify-content-start position-relative text-secondary"
                    style={{ }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    style={{ height: "40px" }}
                    className="form-control mt-2"
                    onChange={(e) => {
                      setcompany({ ...Company, password: e.target.value });
                    }}
                    id="password"
                  />
                </span>
                
              </span>
              {passwordIsValid === false ? (
                <div
                  style={{ marginTop: "6px", right: "2%" }}
                  className="text-danger h-6 text text-nowrap position-relative"
                >
                  <BiError
                    style={{ bottom: "2px", right: "2%" }}
                    className="text-danger position-relative "
                  />
                  Invalide Password(must contain minumum
                  <br /> 8 caractere 1 chiffre,1 Uppercase,1 lowercase!)
                </div>
              ) : (
                ""
              )}
              <div
                className="me-2 position-relative mb-2 text"
                style={{ top: "10px", left: "23px" }}
              >
                <input
                  onClick={showpassword}
                  type="checkbox"
                  className="me-2 form-check-input"
                />
                <label>Show password</label>
              </div>

              <br />
              
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Inscription;
