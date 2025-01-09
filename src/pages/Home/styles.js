import styled from 'styled-components'

import img from '../../assets/background.jpg'

export const Container = styled.div`
    width: 100%;
    height: 100%;
`

export const HeroSection = styled.section`
    background: url(${img}) no-repeat center center;
    background-size: cover;
    height: 100vh;
    flex-grow: 1;
`