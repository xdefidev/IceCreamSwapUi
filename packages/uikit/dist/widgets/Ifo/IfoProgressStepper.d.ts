/// <reference types="react" />
interface IfoProgressStepperProps {
    vestingStartTime: number;
    cliff: number;
    duration: number;
    getNow: () => number;
}
declare const IfoProgressStepper: React.FC<React.PropsWithChildren<IfoProgressStepperProps>>;
export default IfoProgressStepper;
