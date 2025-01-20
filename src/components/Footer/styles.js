import styled from 'styled-components'

import { DEVICE_BREAKPOINTS } from '../../styles/deviceBreakpoints'

export const Container = styled.footer`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: ${({theme}) => theme.COLORS.GRADIENT_BLUE_LIGHT};
    padding: 2rem;
    box-sizing: border-box;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 60rem;

    #name {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        @media (min-width: ${DEVICE_BREAKPOINTS.TABLET}){
            flex-direction: row;

            div {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }
    }

    h1 {
        font-size: 2rem;
        color: white;
    }

    input {
        border: none;
        background-color: ${({theme}) => theme.COLORS.WHITE};
        padding: 1rem;
        width: 90%;
        font-size: 1.6rem;
        border-radius: 4px;
    }

    button {
        width: 90%;
        border-radius: 6px;
        border: none;
        padding: 2rem;
        background-color: ${({theme}) => theme.COLORS.BLUE_500};
        text-align: center;
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 1.6rem;


        &:hover {
            opacity: 1;
            filter: none;
        }

        @media (min-width: ${DEVICE_BREAKPOINTS.TABLET}){
            width: 70%;
        }
    }

    textarea {
        border: none;
        background-color: ${({theme}) => theme.COLORS.WHITE};
        padding: 1rem;
        width: 90%;
        font-size: 1.6rem;
        height: 20rem;
        border-radius: 4px;


        @media (min-width: ${DEVICE_BREAKPOINTS.TABLET}){
            height: 10rem;
            width: 70%;
        }
    }

    span {
        font-size: 1.4rem;
        color: ${({theme}) => theme.COLORS.WHITE};
    }
`

export const Contat = styled.div`
    h2 {
        font-size: 2rem;
        margin-bottom: 2rem;
        color: ${({theme}) => theme.COLORS.WHITE};
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
        span, a {
            font-size: 1.4rem;
            color: ${({theme}) => theme.COLORS.WHITE};
            text-decoration: none;
            display: flex;
            gap: 1rem;
            align-items: center;

            svg {
                font-size: 1.5rem;
                color: ${({theme}) => theme.COLORS.WHITE};
            }
        }
    }
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media (min-width: ${DEVICE_BREAKPOINTS.TABLET}){
        flex-direction: row;
        align-items: baseline;
    }
`

export const SocialMedia = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgb(165, 252, 219);

    #logo {
        font-size: 2rem;
        color: white;
        display: flex;
        gap: 8px;
        align-items: center;

        img {
            width: 4rem;
        }
    }
`