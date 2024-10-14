/// <reference types="react" />
export interface LiquidityCardHeaderProps {
    title: string;
    subtitle?: string;
    helper?: string;
    backTo?: string | (() => void);
    config?: React.ReactElement;
}
declare const LiquidityCardHeader: React.FC<React.PropsWithChildren<LiquidityCardHeaderProps>>;
export default LiquidityCardHeader;
