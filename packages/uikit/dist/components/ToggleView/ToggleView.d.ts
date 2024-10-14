/// <reference types="react" />
export declare enum ViewMode {
    TABLE = "TABLE",
    CARD = "CARD"
}
interface ToggleViewProps {
    idPrefix: string;
    viewMode: ViewMode;
    onToggle: (mode: ViewMode) => void;
}
export declare const ToggleView: React.FunctionComponent<React.PropsWithChildren<ToggleViewProps>>;
export {};
