/// <reference types="react" />
import { Currency } from "@pancakeswap/sdk";
interface TokenTransferInfoProps {
    symbolA: string;
    symbolB: string;
    amountA: string;
    amountB: string;
    currencyA: Currency;
    currencyB: Currency;
}
declare const TokenTransferInfo: React.FC<TokenTransferInfoProps>;
export default TokenTransferInfo;
