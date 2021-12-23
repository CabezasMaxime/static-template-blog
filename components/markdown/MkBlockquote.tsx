export default function MkBlockquote({className, children, ...props}) {
    return <blockquote className={className} {...props}>{children}</blockquote>
}