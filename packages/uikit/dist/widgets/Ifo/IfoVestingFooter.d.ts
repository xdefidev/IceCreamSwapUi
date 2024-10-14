/// <reference types="react" />
export interface FooterEntryProps {
    label: string;
    value: string;
}
interface IfoVestingFooterProps {
    duration: number;
    vestingStartTime: number | undefined;
    releaseRate: string;
    getNow: () => number;
}
declare const IfoVestingFooter: React.FC<React.PropsWithChildren<IfoVestingFooterProps>>;
export default IfoVestingFooter;
