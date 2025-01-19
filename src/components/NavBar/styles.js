import styled from 'styled-components'

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
`