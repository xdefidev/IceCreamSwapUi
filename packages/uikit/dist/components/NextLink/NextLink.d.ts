/// <reference types="react" />
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: any;
    replace?: boolean;
    innerRef?: React.Ref<HTMLAnchorElement>;
    prefetch?: boolean;
}
/**
 * temporary solution for migrating React Router to Next.js Link
 */
declare const NextLinkFromReactRouter: import("react").ForwardRefExoticComponent<LinkProps & import("react").RefAttributes<any>>;
export default NextLinkFromReactRouter;
