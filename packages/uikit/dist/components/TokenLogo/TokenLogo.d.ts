/// <reference types="react" />
export interface TokenLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    srcs: string[];
    useFilledIcon?: boolean;
}
/**
 * Renders an image by sequentially trying a list of URIs, and then eventually a fallback triangle alert
 */
declare const TokenLogo: React.FC<React.PropsWithChildren<TokenLogoProps>>;
export default TokenLogo;
