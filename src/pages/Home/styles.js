import styled, { keyframes, css } from 'styled-components'

import img from '../../assets/background.jpg'

export const Container = styled.div`
    width: 100%;
    height: 100%;
`

export const HeroSection = styled.section`
    background: url(${img}) no-repeat center center;
    background-size: cover;
    height: 100vh;
    flex-grow: 1;
    position: relative;

    #copyright {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        font-size: 1rem;
        color: ${({theme}) => theme.COLORS.BLUE_100};

        &:hover {
            opacity: 0;
        }
    }
`

export const Title = styled.div`
    position: absolute;
    top: 30%;
    left: 10%;
    color: ${({theme}) => theme.COLORS.WHITE};
    font-size: 2rem;
    padding-right: 1rem;

    p {
        margin-top: 2rem;
        font-size: 1.6rem;
        max-width: 30rem;
    }

    strong {
        color: ${({theme}) => theme.COLORS.BLUE_100}; 
    }
`

const blink = keyframes`
    50% {
        opacity: 0;
    }
`

export const Cursor = styled.span`
    display: inline-block;
    width: 1px;
    color: ${({theme}) => theme.COLORS.WHITE};

    ${({$isdeleting}) => !$isdeleting && css`
        animation: ${blink} 0.6s steps(2, start) infinite;
    `}
`

export const Content = styled.main`
    margin: 2rem 0;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;

    h1 {
        color: ${({theme}) => theme.COLORS.BLUE_200};
        font-size: 2.5rem;
        margin-bottom: 1.4rem;
    }

    p {
        color: ${({theme}) => theme.COLORS.DARK};
        font-size: 1.6rem;
    }
`

export const Carrosel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 80%;
    margin: auto;
    position: relative;

    .carrosel {
        display: flex;
        transition: transform .5s ease-in-out;
    }

    .carrosel-item {
        min-width: 100%;
        text-align: center;
        background-color: #f0f0f0;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ddd;
    }
`