/// <reference types="react" />
export interface ExpandableSectionButtonProps {
    onClick?: () => void;
    expanded?: boolean;
}
declare const ExpandableSectionButton: React.FC<React.PropsWithChildren<ExpandableSectionButtonProps>>;
export default ExpandableSectionButton;
