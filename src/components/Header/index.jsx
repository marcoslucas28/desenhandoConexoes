import { Container, Title, Menu } from './styles'

import logo from '/logo.png'

import { IoIosMenu } from 'react-icons/io'

import { useState, useEffect } from 'react'

export function Header(){
    const [isScrolled, setIsScrolled] = useState(false)

    function handleScroll(){
        setIsScrolled(window.scrollY > 20)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return(
        <Container isScrolled={isScrolled}>
            <Menu>
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