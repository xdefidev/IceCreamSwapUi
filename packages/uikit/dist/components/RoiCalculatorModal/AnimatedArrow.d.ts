/// <reference types="react" />
import { RoiCalculatorReducerState } from "./useRoiCalculatorReducer";
interface AnimatedArrowProps {
    calculatorState: RoiCalculatorReducerState;
}
declare const AnimatedArrow: React.FC<React.PropsWithChildren<AnimatedArrowProps>>;
export default AnimatedArrow;
