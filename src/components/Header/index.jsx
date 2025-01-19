import { Container, Title, Menu, Home } from './styles'

import logo from '/logo.png'

import { SideMenu } from '../../components/SideMenu'
import { NavBar } from '../../components/NavBar'

import { IoIosMenu } from 'react-icons/io'

import { useState, useEffect } from 'react'

export function Header({isInHome = false}){
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function handleScroll(){
        setIsScrolled(window.scrollY > 20)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if(isInHome){
        return(
            <Home $isscrolled={isScrolled}>
                <SideMenu className='hidden' isVisible={isMenuOpen} onCloseMenu={() => setIsMenuOpen(false)} />
                <Menu className='hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <IoIosMenu />
                </Menu>
                
                <Title>
                    <img src={logo} alt="Logo do projeto desenhando conexões" />
                    <h1>Desenhando Conexões</h1>
                </Title>
    
                <div className='hidden'></div>
                <NavBar id='navbar' />
            </Home>
        )
    }else {
        return(
        <Container $isscrolled={isScrolled}>
            <SideMenu className='hidden' isVisible={isMenuOpen} onCloseMenu={() => setIsMenuOpen(false)} />
            <Menu className='hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <IoIosMenu />
            </Menu>
            
            <Title>
                <img src={logo} alt="Logo do projeto desenhando conexões" />
                <h1>Desenhando Conexões</h1>
            </Title>

            <div className='hidden'></div>
            <NavBar id='navbar' />
        </Container>
    )
    }
}