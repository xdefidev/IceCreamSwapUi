/// <reference types="react" />
interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    initialValue?: string;
}
declare const SearchInput: React.FC<React.PropsWithChildren<Props>>;
export default SearchInput;
