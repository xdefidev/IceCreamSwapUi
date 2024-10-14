import React, { ReactElement } from "react";
import { ChainId } from "@pancakeswap/sdk";
import { LinkProps } from "./types";
interface ScanLinkProps extends Omit<LinkProps, "external" | "showExternalIcon"> {
    icon?: ReactElement;
    chainId?: ChainId;
}
declare const ScanLink: React.FC<React.PropsWithChildren<ScanLinkProps>>;
export default ScanLink;
