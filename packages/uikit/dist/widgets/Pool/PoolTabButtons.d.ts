import { ViewMode } from "../../components/ToggleView";
interface PoolTableButtonsPropsType {
    stakedOnly: boolean;
    setStakedOnly: (s: boolean) => void;
    viewMode: ViewMode;
    setViewMode: (s: ViewMode) => void;
    hasStakeInFinishedPools: boolean;
    hideViewMode?: boolean;
}
declare const PoolTabButtons: ({ stakedOnly, setStakedOnly, hasStakeInFinishedPools, viewMode, setViewMode, hideViewMode, }: PoolTableButtonsPropsType) => import("react/jsx-runtime").JSX.Element;
export default PoolTabButtons;
