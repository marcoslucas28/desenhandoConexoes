import styled from 'styled-components'

export const Container = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    gap: 1rem;
    background: ${({theme, isScrolled}) => isScrolled ? theme.COLORS.GRADIENT_BLUE : 'transparent'};
    transition: all 0.3s ease-in-out;
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
`