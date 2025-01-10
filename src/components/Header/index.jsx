import { Container, Title, Menu } from './styles'

import logo from '/logo.png'

import { SideMenu } from '../../components/SideMenu'

import { IoIosMenu } from 'react-icons/io'

import { useState, useEffect } from 'react'

export function Header(){
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleScroll(){
        setIsScrolled(window.scrollY > 20)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return(
        <Container $isscrolled={isScrolled}>
            <SideMenu isVisible={isMenuOpen} onCloseMenu={() => setIsMenuOpen(false)} />
            <Menu onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoIosMenu />
            </Menu>
            
            <Title>
                <img src={logo} alt="Logo do projeto desenhando conexões" />
                <h1>Desenhando Conexões</h1>
            </Title>

            <div id='spacer'></div>
        </Container>
    )
}