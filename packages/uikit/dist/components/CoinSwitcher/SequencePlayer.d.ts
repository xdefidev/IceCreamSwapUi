/// <reference types="react" />
interface SequencePlayerProps {
    images: string[];
    msPerFrame?: number;
    onPlayStart?: () => void;
    onPlayFinish?: () => void;
}
export declare const SequencePlayer: React.FC<React.PropsWithChildren<SequencePlayerProps>>;
export {};
