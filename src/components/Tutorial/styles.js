import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    background: ${({theme}) => theme.COLORS.GRADIENT_BLUE};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const Video = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    video {
        height: 40vh;
        width: 100%;
        border-radius: 8px;
    }

    h1 {
        font-size: 2rem;
    }
`

export const Content = styled.div`
    max-width: 40rem;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); 
    padding: 1rem;
    background-color: ${({theme}) => theme.COLORS.WHITE};
    border-radius: 1rem;
    box-sizing: border-box;

    p {
        font-size: 1.6rem;
    }
`

export const Header = styled.header`
    width: 100%;
    padding: 2rem;
    border-bottom: 1px solid ${({theme}) => theme.COLORS.DARK};
    box-sizing: border-box;
    display: flex;
    align-items: center;
`

export const Close = styled.button`
    background: none;
    border: none;
    display: flex;
    gap: 1rem;
    font-size: 2rem;
    color: ${({theme}) => theme.COLORS.WHITE};
`