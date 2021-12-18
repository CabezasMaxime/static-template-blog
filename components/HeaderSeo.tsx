import Head from "next/head"

const getFormatedUrl = (router) => {
    let url = `${process.env.NEXT_PUBLIC_FRONT_DOMAIN}${router.asPath}`
    if(url.endsWith("/")) {
        url = url.substring(0, url.length-1)
    }
    return url
}

export default function HeaderSeo({router, pageProps}) {
    const url = getFormatedUrl(router)
    
    return (
        <Head>
            <meta property="og:url"          content={url} />
            <meta property="og:type"         content="article" />
            <meta property="og:title"        content="When Great Minds Don’t Think Alike" />
            <meta property="og:description"  content="How much does culture influence creative thinking?" />
            <meta property="og:image"        content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
        </Head>
    )
}