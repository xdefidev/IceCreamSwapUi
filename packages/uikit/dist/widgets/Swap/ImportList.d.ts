interface ImportProps {
    listURL: string;
    listLogoURI: string | undefined;
    listName: string;
    listTokenLength: number;
    onAddList: () => void;
    addError: string | null;
}
export declare function ImportList({ listURL, listLogoURI, listName, listTokenLength, onAddList, addError }: ImportProps): import("react/jsx-runtime").JSX.Element;
export {};
