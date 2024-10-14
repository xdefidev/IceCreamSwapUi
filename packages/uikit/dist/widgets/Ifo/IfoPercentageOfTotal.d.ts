/// <reference types="react" />
import BigNumber from "bignumber.js";
import { TextProps } from "../../components/Text";
interface IfoPercentageOfTotalProps extends TextProps {
    userAmount: BigNumber;
    totalAmount: BigNumber;
}
declare const IfoPercentageOfTotal: React.FC<React.PropsWithChildren<IfoPercentageOfTotalProps>>;
export default IfoPercentageOfTotal;
