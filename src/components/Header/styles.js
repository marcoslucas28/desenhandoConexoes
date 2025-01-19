import styled from 'styled-components'

import { DEVICE_BREAKPOINTS } from '../../styles/deviceBreakpoints'

export const Home = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    gap: 1rem;
    background: ${({theme, $isscrolled}) => $isscrolled ? theme.COLORS.BLUE_500 : 'transparent'};
    transition: all 0.3s ease-in-out;
    z-index: 1000;
    box-shadow: ${({$isscrolled}) => $isscrolled ? '0 10px 15px rgba(0, 0, 0, 0.1)' : 'none'};

    #navbar {
        display: none;
    }

    @media (min-width: ${DEVICE_BREAKPOINTS.TABLET}){
        #navbar {
            display: flex;
        }

        .hidden {
            display: none;
        }
    }
`

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    width: 100%;
    box-sizing: border-box;
    gap: 1rem;
    background: ${({theme}) => theme.COLORS.BLUE_500 };
    transition: all 0.3s ease-in-out;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    position: ${({$isscrolled}) => $isscrolled ? 'fixed' : 'static'};
    margin-bottom: 2rem;

    #navbar {
        display: none;
    }

    @media (min-width: ${DEVICE_BREAKPOINTS.TABLET}){
        #navbar {
            display: flex;
        }

        .hidden {
            display: none;
        }
    }

`

export const Title = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    
    > h1 {
        font-size: 2rem;
        text-align: start;
        color: ${({theme}) => theme.COLORS.WHITE};
    }

    > img {
        width: 4.5rem;
    }
`

export const Menu = styled.button`
    background: none;
    border: none;
    color: ${({theme}) => theme.COLORS.WHITE};

    svg {
        font-size: 3rem;
    }

    &:hover {
        filter: none;
    }
`