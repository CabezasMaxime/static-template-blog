import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Breadcrumb from "../components/Breadcrumb";
import styled from "styled-components"
import { useState } from "react";
import { GetContact, GetGlobal } from "../utils/DataRequest";

const ContactContainer = styled.div(({theme}) => {
    return `
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;

        input {
            width: 400px;
        }

        textarea {
            min-width: 400px;
            min-height: 300px;
        }

        p {
            padding: 1rem;
            width: 40%;
            text-align: center;
            font-weight: bolder;
        }
        
        h1 {
            margin: 0;
        }

        label {
            text-decoration: underline;
            margin-bottom: 0.5rem
        }

        button {
            margin: 1rem 0;
        }

        @media(${theme.media.mobile}) {
            input {
                width: 80% !important;
                margin: 0 1rem;
            }
        
            textarea {
                min-width: auto;
                min-height: auto;
                max-width: 80% !important;
                height: 300px;
            }
        }
    `
})

type ContactProps = {
    title: string
    description: string
    email: string
}

export default function Contact({email, description, title}: ContactProps) {
    const router = useRouter()
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")

    return (
        <div>
            <Breadcrumb url={router.asPath} />
            <ContactContainer>
                <h1>{title}</h1>
                <p>{description}</p>
                <label htmlFor="object">Titre du message</label>
                <input name="object" style={{width: "400px"}} onChange={(e) => setSubject(e.target.value)} value={subject} />
                <br />
                <label htmlFor="body">Votre Message</label>
                <textarea name="body" style={{width: "400px", height: "300px"}} onChange={(e) => setBody(e.target.value)} value={body} />
                <br />
                <button>
                    <a href={`
                    mailto:${email}
                    ?subject=${subject}
                    &body=${body.toString()}`}>{`Envoyé à ${email}`}</a>
                </button>
            </ContactContainer>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context) => {
    const contact = await GetContact()
    const global = await GetGlobal()

    return {
        props: {
            title: contact ? contact.title : "Contact",
            description: contact ? contact.description : "",
            email: global.data ? global.data.attributes.contactMail : "contact@gmail.com"       
        }
    }
}