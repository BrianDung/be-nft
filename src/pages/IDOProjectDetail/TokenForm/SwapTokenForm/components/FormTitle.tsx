import useStyles from '../../style';

export enum SwapHeaderStatus {
  Start,
  Progress,
  Finished,
}

interface SwapStepProps {
  status: SwapHeaderStatus;
  title: string;
  step: number;
  disabled?: boolean;
}

export const SwapStep = ({ status = SwapHeaderStatus.Start, title, step, disabled }: SwapStepProps) => {
  const styles = useStyles();

  const statusStyles =
    status === SwapHeaderStatus.Progress
      ? styles.stepOneActive
      : status === SwapHeaderStatus.Finished
      ? styles.activeDisableStep1
      : '';
  const classes = [styles.step, statusStyles, disabled ? 'disabled' : ''].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {SwapHeaderStatus.Finished === status ? (
        <img src="/images/icons/icon_active_step.svg" alt="" />
      ) : (
        <span className={styles.boxStep}>{step}</span>
      )}
      {title}
    </div>
  );
};

interface SwapHeaderProps {
  currentStep: number;
  disabled?: boolean;
}

export const SwapHeader = ({ currentStep, disabled }: SwapHeaderProps) => {
  const styles = useStyles();

  function getStepStatus(currentStep: number, stepIndex: number) {
    if (currentStep > stepIndex) {
      return SwapHeaderStatus.Finished;
    }

    if (currentStep === stepIndex) {
      return SwapHeaderStatus.Progress;
    }

    return SwapHeaderStatus.Start;
  }

  return (
    <div className={styles.listStep}>
      <SwapStep disabled={disabled} title="Approve" step={1} status={getStepStatus(currentStep, 1)} />
      <SwapStep disabled={disabled} title="Swap" step={2} status={getStepStatus(currentStep, 2)} />
    </div>
  );
};
