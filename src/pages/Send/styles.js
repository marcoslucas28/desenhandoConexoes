import styled from 'styled-components'


import { DEVICE_BREAKPOINTS } from '../../styles/deviceBreakpoints'

export const Container = styled.div`
    background-color: ${({theme}) => theme.COLORS.BLUE_600};
`

export const Content = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;
`

export const Upload = styled.div`
    width: 90%;
    max-width: 43rem;
    padding: 3rem;
    background-color: #fff;
    border-radius: 5px;

    header {
        color: ${({theme}) => theme.COLORS.BLUE_600};
        font-size: 2rem;
        font-weight: 600;
        text-align: center;

        @media (min-width: ${DEVICE_BREAKPOINTS.ML}){
            font-size: 2.7rem;
        }
    }

    label {
        height: 16.7rem;
        display: flex;
        margin: 3rem 0;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 5px;
        border: 2px dashed ${({theme}) => theme.COLORS.BLUE_600};
        cursor: pointer;

        &::where(svg, p){
            color: ${({theme}) => theme.COLORS.BLUE_600};
        }

        svg {
            font-size: 5rem;
        }

        p {
            font-size: 1.6rem;
            margin-top: 1.5rem;
        }

        input {
            display: none;
        }
    }
`

export const ConnectDiv = styled.div`
    width: 90%;
    max-width: 43rem;
    padding: 3rem;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    header {
        color: ${({theme}) => theme.COLORS.BLUE_600};
        font-size: 2rem;
        font-weight: 600;
        text-align: center;

        @media (min-width: ${DEVICE_BREAKPOINTS.ML}){
            font-size: 2.7rem;
        }
    }

    button {
        background-color: ${({theme}) => theme.COLORS.BLUE_600};
        color: #fff;
        padding: 1rem;
        border: none;
        border-radius: 5px;
        font-size: 1.6rem;
        margin: 3rem auto;
    }
`

export const SendFile = styled.div`
    width: 90%;
    max-width: 43rem;
    padding: 3rem;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    header {
        color: ${({theme}) => theme.COLORS.BLUE_600};
        font-size: 2rem;
        font-weight: 600;
        text-align: center;

        @media (min-width: ${DEVICE_BREAKPOINTS.ML}){
            font-size: 2.7rem;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        @media (min-width: ${DEVICE_BREAKPOINTS.MM}){
            flex-direction: row;
        }
    }

    p {
        margin: 2rem;
        font-size: 1.6rem;
    }

    button {
        background-color: ${({theme}) => theme.COLORS.BLUE_600};
        color: #fff;
        padding: 1rem;
        border: none;
        border-radius: 5px;
        font-size: 1.6rem;
    }
`