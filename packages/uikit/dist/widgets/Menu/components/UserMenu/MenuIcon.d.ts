import React from "react";
import { Variant } from "./types";
export declare const NoProfileMenuIcon: React.FC<React.PropsWithChildren>;
export declare const PendingMenuIcon: React.FC<React.PropsWithChildren>;
export declare const WarningMenuIcon: React.FC<React.PropsWithChildren>;
export declare const DangerMenuIcon: React.FC<React.PropsWithChildren>;
declare const MenuIcon: React.FC<React.PropsWithChildren<{
    avatarSrc?: string;
    variant: Variant;
    className?: string;
}>>;
export default MenuIcon;
