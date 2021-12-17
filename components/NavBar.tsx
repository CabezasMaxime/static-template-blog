import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { Global } from "../types/Global"
import { Tags } from "../types/Tags"

const NavItemContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`

const Brand = styled.div`
    display: flex;
    margin: 1rem;
    height: 50px;
    width: auto;
    text-align: center;
    white-space: nowrap;
    font-weight: 600;
    font-size: 32px;
    
    div {
        margin: auto;
    }
`

const NavItem = styled.div`
    font-size: 14px;
    padding: 0 2rem;
`

const Nav = styled.nav(({theme}) => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(230, 230, 230, 1);
    background: #333333;
    
    .close {
        display: none;
    }

    @media (${theme.media.mobile}) {
        &.nav-open {
            display: flex;
            position: fixed;
            align-items: flex-end;
            flex-direction: column;
            z-index: 20;
            width: 100vw;
            height: 100vh;
            background: #222222;
            overflow: hidden;
            transition: 500ms;

            .brand {
                display: none;
            }

            .navItemContainer {
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                margin: auto;

                justify-content: center;
                align-items: center;

                .navItem {
                    margin: 0.5rem 0;
                    font-size: 35px;
                }
            }
        }

        &.nav-close {
            position: absolute;
            display: flex;
            justify-content: flex-end;
            z-index: 20;
            width: 100vw;
            height: 80px;
            background: #222222;

            transition: 500ms;

            .brand {
                display: none;
            }

            .navItemContainer {
                display: none;
            }
        }
    }
`)

const CloseButtonStyled = styled.div(({theme, open}) => `
    display: none;

    @media(${theme.media.mobile}) {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        height: 80px;
        width: 80px;

        .middle {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 30px;
            height: 5px;
            background: ${open ? "transparent":"white"};
            transform: translate(-50%, -50%);
            transition: 300ms;
        }

        .middle::before {
            content: "";
            position: absolute;
            top: ${open ? "-15px" : "-10px"};
            width: 30px;
            height: 5px;
            background: white;
            ${open ? "transform: translateY(15px) rotate(45deg);" : "transform: translateY(0px) rotate(0deg);"}
            transition: 300ms;
        }

        .middle::after {
            content: "";
            position: absolute;
            top: ${open ? "15px" : "10px"};
            width: 30px;
            height: 5px;
            background: white;
            ${open ? "transform: translateY(-15px) rotate(-45deg);" : "transform: translateY(0px) rotate(0deg);"}
            transition: 300ms;
        }
    }
`)

type NavBarProps = {
    tags: Tags
    global: Global
}


export const CloseButton = ({open, setOpen}) => {
    return (
        <div onClick={() => setOpen()}>
            <CloseButtonStyled open={open}><div className="middle"></div></CloseButtonStyled>
        </div>
    )
}

export default function NavBar({tags, global}: NavBarProps) {
    const [currentPage, setCurrentPage] = useState("")
    const [openNavMobile, setOpenNavMobile] = useState(false)
    const [navTags, setNavTags] = useState([])

    const router = useRouter()
    
    useEffect(() => {
        let _navTags = tags ? tags.filter((e) => e.attributes.createPage == true && e.attributes.posts.data.length > 0) : []
        setNavTags(_navTags)
    }, [])

    useEffect(() => {
        if(currentPage != router.query.slug) {
            setCurrentPage(router.query.slug as string)
            setOpenNavMobile(false)
        }
    }, [router, currentPage])

    if(navTags.length < 0 || !global) {
        return <div>Loadgin ....</div>
    }

    return (
        <Nav className={`${openNavMobile ? "nav-open" : "nav-close"}`}>
            <CloseButton open={openNavMobile} setOpen={() => setOpenNavMobile(!openNavMobile)} />

            <Brand className="brand"><div>{global.attributes.title}</div></Brand>
            
            <NavItemContainer className="navItemContainer">
                <NavItem className="navItem"><Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}`}><a style={{textDecoration: `${currentPage == undefined ? "underline" : "none"}`}}>Home</a></Link></NavItem>
                {
                    navTags.length > 0
                    ?
                    navTags.map((tag, index) => {
                        return <NavItem className="navItem" key={`nav__tag__${index}`}><Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/tags/${tag.attributes.slug}`}><a style={{textDecoration: `${currentPage == tag.attributes.slug ? "underline" : "none"}`}}>{tag.attributes.label}</a></Link></NavItem>
                    }) : <></>
                }
                <NavItem className="navItem"><Link href={`${process.env.NEXT_PUBLIC_FRONT_DOMAIN}/contact`}><a>Contact</a></Link></NavItem>
            </NavItemContainer>
        </Nav>
    )
}