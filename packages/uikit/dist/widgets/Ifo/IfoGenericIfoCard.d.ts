import { ReactNode } from "react";
interface CardConfigReturn {
    title: string;
    variant: "blue" | "violet";
    tooltip: string | ReactNode;
}
interface IfoGenericIfoCardElements {
    action: ReactNode;
    content: ReactNode;
}
declare const IfoGenericIfoCard: React.FC<React.PropsWithChildren<CardConfigReturn & IfoGenericIfoCardElements>>;
export default IfoGenericIfoCard;
