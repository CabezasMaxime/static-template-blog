import Link from "next/link";

export default function MkA({href, rel, children, ...props}) {
    return (
        <Link href={href ? href : "/#"}>
            <a className="link" rel={rel} {...props}>{children}</a>
        </Link>
    )
}