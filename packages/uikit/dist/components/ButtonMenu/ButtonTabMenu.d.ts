/// <reference types="react" />
interface ButtonTabMenuProps {
    activeIndex: number;
    itemList: string[];
    onItemClick: (index: number) => void;
}
declare const ButtonTabMenu: React.FC<React.PropsWithChildren<ButtonTabMenuProps>>;
export default ButtonTabMenu;
