import styled from 'styled-components'

import { DEVICE_BREAKPOINTS } from '../../styles/deviceBreakpoints'

export const Container = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
    margin: 0 auto;
    padding: 1rem;

    div {
        border-bottom: 1px solid ${({theme}) => theme.COLORS.WHITE};
        padding: 1rem;
        width: 80%;
    }

    @media (min-width: ${DEVICE_BREAKPOINTS.LAPTOP}) {
        flex-direction: row;
        width: auto;
        margin: 0;
        padding: 0;
        align-items: center;
        justify-content: center;
        gap: 1.4rem;

        div {
            border: none;
            padding: 0;
            width: auto;
        }

        #draw-button {
            font-size: 1.6rem;
            border: none;
            background: ${({theme}) => theme.COLORS.GRADIENT_GREEN};
            padding: 1rem;
            max-width: 20rem;
            color: ${({theme}) => theme.COLORS.WHITE};
            border-radius: 8px;
            font-weight: bold;
        }

        #print-button {
            font-size: 1.6rem;
            border: none;
            background: ${({theme}) => theme.COLORS.GRADIENT_BLUE};
            padding: 1rem;
            max-width: 20rem;
            color: ${({theme}) => theme.COLORS.WHITE};
            border-radius: 8px;
            font-weight: bold;
        }
    }
`