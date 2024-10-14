/// <reference types="react" />
interface DateStepProps {
    index: number;
    stepText: string;
    activeStepIndex: number;
    dateText: string;
}
declare const DateStep: React.FC<React.PropsWithChildren<DateStepProps>>;
export default DateStep;
