import styled from 'styled-components'

export const Container = styled.button`
    border: none;
    background: none;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    span {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 1.6rem;
    }

    svg {
        color: ${({theme}) => theme.COLORS.WHITE};
        font-size: 2rem;
    }
`