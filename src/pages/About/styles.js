import styled from 'styled-components'


export const Container = styled.div`
    width: 100%;
    height: 100%;
`



export const Content = styled.main`
    margin: 0 auto 2rem;
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    max-width: 50rem;

    h1 {
        color: ${({theme}) => theme.COLORS.BLUE_200};
        font-size: 2.5rem;
    }

    p {
        color: ${({theme}) => theme.COLORS.DARK};
        font-size: 1.6rem;
        margin-top: 1.4rem;
    }
`