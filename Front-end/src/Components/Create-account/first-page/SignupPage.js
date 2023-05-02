import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { StepLabel } from "@mui/material";
import Role from "./Slides/Slide1/Role";
import Register from "./Slides/Slide2/Register";
import Upload from "./Slides/Slide3/Upload";
import "./SignupPage.css";
import { useNavigate } from 'react-router-dom';



function SignupPage(props) {
  let navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState(false);
  const [alert, setAlert] = useState(false);

  const Next = () => {
    if (step < 3) {
      console.log(alert);
      if (step === 0) {
        if (!checked) {
          setAlert(true);
        } else {
          setAlert(false);
          setStep((step) => step + 1);
        }
        if(step===1)
        {

        }

        
      }
       
      else {
        setStep((step) => step + 1);
      }
    }
    else
    {
      if (step===3)
        {
          navigate('/')
        }
    }
  };

  const Back = () => {
    if (step >= 1) {
      if (step === 1) {
        setChecked(false);
      }
      
      setStep((step) => step - 1);
    }
    else
    {
      navigate('/')
    }
  };

  const Reset = () => {
    setAlert(false)
    setStep(0);
  };

  return (
    <div className="container-1">
      <br/>
      <h1>Create an account</h1>
      <p>Already had an account ?</p>
      <Stepper
        sx={{
          width: "50%",
          "& .MuiStepLabel-root .Mui-completed": {
            color: "black",
          },
          "& .MuiStepLabel-root .Mui-active": {
            color: "black",
          },
        }}
        activeStep={step}
        orientation="horizontal"
      >
        <Step color="red">
          <StepLabel>Choose your basic info</StepLabel>
        </Step>

        <Step>
          <StepLabel>Provide your basic info</StepLabel>
        </Step>

        <Step>
          <StepLabel>Upload picture</StepLabel>
        </Step>
      </Stepper>

      {step === 0 && <Role setChecked={setChecked} />}
      {step === 1 && <Register/>}
      {step === 2 && <Upload />}
      {alert && (
        <p style={{ color: "red", margin: 0, fontSize: "20px" }}>
          you should select one option !
        </p>
      )}
      <div className="Nav-btns">
        <button className="btn" onClick={Back}>
          Back
        </button>
        <button className="btn" onClick={Next}>
          Next
        </button>
        <button className="btn" onClick={Reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
export default SignupPage;
