import styled from 'styled-components'

import { DEVICE_BREAKPOINTS } from '../../styles/deviceBreakpoints'

export const Container = styled.div`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const Content = styled.div`
    overflow: hidden;

    .canvas-container {
        width: 23rem !important;
        height: 23rem !important;
        border: 1px solid #000000;
        margin: 0 auto;

        @media (min-width: ${DEVICE_BREAKPOINTS.MM}){
            width: 32rem !important;
            height: 25rem !important;
        }

        @media (min-width: ${DEVICE_BREAKPOINTS.TABLET}){
            width: 60rem !important; 
        }
        
        @media (min-width: ${DEVICE_BREAKPOINTS.LAPTOP}){
            width: 80rem !important; 
        }
        
        @media (min-width: ${DEVICE_BREAKPOINTS.LAPTOP_L}){
            width: 110rem !important; 
            height: 30rem !important;
        }
    }
`

export const ToolsBar = styled.div`
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    padding: 0.5rem;
    margin: 0 auto 1rem;

    button {
        border: none;
        background: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
        gap: 1rem;
        padding: 1rem;
        transition: 0.3s all ease-in-out;
        
        &[data-active = true]{
            border-top: 2px solid ${({theme}) => theme.COLORS.BLUE_100};
            border-radius: 4px;
        }

        svg {
            font-size: 2rem;
        }
    }
    
    > div {
        display: flex;


        span {
            display: none;
        }

        @media (min-width: ${DEVICE_BREAKPOINTS.LAPTOP_L}){
            span {
                display: inline;
                font-size: 1.6rem;
            }
        }
    }

    @media (min-width: ${DEVICE_BREAKPOINTS.TABLET}){
        justify-content: center;
        
        span {
            display: inline;
            font-size: 1.6rem;
        }
    }
   
`

export const ToolConfig = styled.div`
    padding: 0.5rem;
    border-radius: 8px;
    width: 85%;
    margin: 0 auto 1rem;
    max-height: 10rem;
    overflow-y: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.43);
    display: flex;
    flex-direction: column;
    align-items: center;


    header {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;

        svg {
            font-size: 2rem;
            margin-right: 1rem;
        }

        span {
            font-size: 2rem;
        }
    }

    #settings {
        @media (min-width: ${DEVICE_BREAKPOINTS.LAPTOP}){
            display: flex;
            gap: 2rem;
        }

        @media (min-width: ${DEVICE_BREAKPOINTS.LAPTOP_L}){
            gap: 3rem;
        }

        section {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;

            @media (min-width: ${DEVICE_BREAKPOINTS.ML}){
                gap: 2rem;
            }

            div {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                @media (min-width: ${DEVICE_BREAKPOINTS.MS}){
                    gap: 1rem;
                }

                label {
                    font-size: 1.2rem;
                    font-weight: bold;

                    @media (min-width: ${DEVICE_BREAKPOINTS.MS}){
                        font-size: 1.6rem;
                    }
                }

                input, select {
                    border: 1px solid #000;
                    padding: 0.5rem;
                    border-radius: 5px;
                }
            }
        }
    }
`