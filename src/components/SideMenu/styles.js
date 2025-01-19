import styled from 'styled-components'

export const Container = styled.aside`
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    background-color: ${({theme}) => theme.COLORS.DARK};
    box-sizing: border-box;
    left: ${({$isvisible}) => $isvisible ? '0' : '-100%'};
    transition: all .3s ease-in-out;

    display: flex;
    flex-direction: column;

`

export const ButtonClose = styled.button`
    border: none;
    background: none;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    span {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 2rem;
    }

    svg {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 3.5rem;
    }
`

export const Close = styled.div`
    width: 100%;
    padding: 2rem;
`

export const Nav = styled.nav`
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
`