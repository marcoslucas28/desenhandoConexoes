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
    margin: 2rem auto;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    max-width: 50rem;

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
export const Tutorials = styled.section`
    width: 80%;
    margin: 0 auto;
    padding: 1rem;
    max-width: 55rem;

    h1 {
        margin-bottom: 1.5rem;
        color: ${({theme}) => theme.COLORS.BLUE_200}; 
        font-size: 2.5rem;
    }

    .wrapper {
    display: table;
    height: 100%;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    }

    .container-fostrap {
    display: table-cell;
    padding: 1em;
    text-align: center;
    vertical-align: middle;
    }
    .fostrap-logo {
    width: 100px;
    margin-bottom:15px
    }
    h1.heading {
    color: #fff;
    font-size: 1.15em;
    font-weight: 900;
    margin: 0 0 0.5em;
    color: #505050;
    }
    @media (min-width: 450px) {
    h1.heading {
        font-size: 3.55em;
    }
    }
    @media (min-width: 760px) {
    h1.heading {
        font-size: 3.05em;
    }
    }
    @media (min-width: 900px) {
    h1.heading {
        font-size: 3.25em;
        margin: 0 0 0.3em;
    }
    } 
    .card {
        display: block; 
        margin: 0 auto 20px auto;
        line-height: 1.42857143;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); 
        transition: box-shadow .25s; 
        cursor: pointer;
        max-width: 350px;
    }
    .card:hover {
    box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    }
    .img-card {
    width: 100%;
    height:200px;
    border-top-left-radius:2px;
    border-top-right-radius:2px;
    display:block;
        overflow: hidden;
    }
    .img-card img{
    width: 100%;
    height: 200px;
    object-fit:cover; 
    transition: all .25s ease;
    } 
    .card-content {
    padding:15px;
    text-align:left;
    }
    .card-title {
    margin-top:0px;
    font-weight: 700;
    font-size: 1.65em;
    }
    .card-title a {
    color: #000;
    text-decoration: none !important;
    }
    .card-read-more {
    border-top: 1px solid #D4D4D4;
    }
    .card-read-more a {
    text-decoration: none !important;
    padding:10px;
    font-weight:600;
    text-transform: uppercase
    }
`



