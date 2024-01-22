import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Validation de la commande",
  "Infos personnels",
  "Commande envoyée",
];

const StepperUI = ({ step }) => {
  return (
    <Box sx={{ width: "100%", marginTop: 2, marginBottom: 2 }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperUI;
