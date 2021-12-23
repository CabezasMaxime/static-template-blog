import MkA from "./MkA";
import MkBlockquote from "./MkBlockquote";
import MkCode from "./MkCode";
import MkImage from "./MkImage";
import MkTable from "./MkTable";

export const ReactMKComponents: any = {
    code: ({node, inline, className, children, ...props}) => <MkCode node={node} inline={inline} className={className} props={props}>{children}</MkCode>,
    blockquote: ({className, children, ...props}) => <MkBlockquote className={className} props={props}>{children}</MkBlockquote>,
    a: ({className, children, href, rel, ...props}) => <MkA className={className} href={href} rel={rel} props={props}>{children}</MkA>,
    table: ({className, children, ...props}) => <MkTable className={className} props={props}>{children}</MkTable>,
    img: ({className, src, ...props}) => <MkImage className={className} src={src} props={props} />
}

export default ReactMKComponents