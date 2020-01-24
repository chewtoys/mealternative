import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StepContent,
  Stepper,
  Step,
  StepLabel,
  TextField
} from '@material-ui/core';
import StepBody from './StepBody';

const Steps = props => {
  const { classes, steps, handleDetailChange } = props;

  const [activeStep, setActiveStep] = useState(0);

  const checkDisableButton = btnNum => {
    if (btnNum === 0) {
      return activeStep === btnNum;
    } else {
      return steps.length - activeStep <= 1;
    }
  };

  const checkDisableRemove = () => {
    return Boolean(steps.length < 2);
  };

  const handleStepChange = (name, value) => {
    const updateParams = {
      index: activeStep,
      updateAttribute: name,
      newAttributeValue: value
    };
    handleDetailChange('step', updateParams);
  };

  const checkUrlShouldDisable = stepDetail => {
    return Boolean(stepDetail.stepImage.file);
  };

  const handleAddStep = () => {
    handleDetailChange('addStep', activeStep);
    setActiveStep(prevActive => prevActive + 1);
  };

  const handleRemoveStep = () => {
    handleDetailChange('removeStep', activeStep);
  };

  return (
    <div className={classes.stepsRoot}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step completed={false} key={index}>
            <StepLabel>
              <TextField
                onClick={() => setActiveStep(index)}
                value={step.stepTitle}
                placeholder='Title of the step'
                variant='outlined'
                size='small'
                onChange={e => handleStepChange('stepTitle', e.target.value)}
              />
            </StepLabel>

            <StepContent>
              <StepBody
                classes={classes}
                step={step}
                checkDisableRemove={checkDisableRemove}
                handleStepChange={handleStepChange}
                checkUrlShouldDisable={checkUrlShouldDisable}
                checkDisableButton={checkDisableButton}
                handleAddStep={handleAddStep}
                handleRemoveStep={handleRemoveStep}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

Steps.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDetailChange: PropTypes.func.isRequired
};

export default Steps;
