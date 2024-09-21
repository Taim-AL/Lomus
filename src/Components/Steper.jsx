import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import "../Assets/css/Profile.css";


// const steps = [
//   {
//     label: 'First top course',
//     description: `For each ad campaign that you create, you can control how much
//               you're willing to spend on clicks and conversions, which networks
//               and geographical locations you want your ads to show on, and more.`,
//   },
//   {
//     label: 'Second course',
//     description:
//       'An ad group contains one or more ads which target a shared set of keywords.',
//   },
//   {
//     label: 'Third course',
//     description: `Try out different ad text to see what brings in the most customers,
//               and learn how to enhance your ads using features like ad extensions.
//               If you run into any problems with your ads, find out how to tell if
//               they're running and how to resolve approval issues.`,
//   },
// ];

export default function VerticalLinearStepper({steps}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  

  return (
    
    <Box sx={{ maxWidth: 400 }} >
      <Stepper activeStep={activeStep} orientation="vertical" >
        {steps.map((step, index) => (
          <Step  key={index}>
            <StepLabel
              
              optional={
                index === 0 ? (
                  <Typography variant="caption" >First top course</Typography>
                ) : 
                index === 1 ? (
                  <Typography variant="caption" >Second course</Typography>
                ) : 
                index === 2 ? (
                  <Typography variant="caption" >Last course</Typography>
                ) : null
              }
            >
              {/* {step.label} */}
            </StepLabel>
            <StepContent >
              <Typography className='course-description-steper'>{step.title}</Typography>
              <Box sx={{ mb: 2 }} >
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    className='continue-button-steper'
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    style={{color:"#333649"}}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }} >
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }} style={{color:"#333649"}}>
            Show Courses
          </Button>
        </Paper>
      )}
    </Box>
  );

  
}
