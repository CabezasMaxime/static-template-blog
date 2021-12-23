export default function MkCode({node, inline, className, children, ...props}) {
    return <code style={{whiteSpace: "pre-wrap"}} className={className} {...props}>{children}</code>
}