import { Container, ButtonClose, Close, Nav } from './styles'

import { ButtonText } from '../../components/ButtonText'

import { IoIosClose } from 'react-icons/io'
import { FaHome } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'

import { useNavigate, useLocation } from 'react-router-dom'

export function SideMenu({isVisible, onCloseMenu}){
    const navigate = useNavigate()
    const location = useLocation()

    function handleNavigation(targetPath){
        if(location.pathname === targetPath){
            window.location.reload()
        } else {
            navigate(targetPath)
        }
    }

    return(
        <Container $isvisible={isVisible}>
            <Close>
                <ButtonClose onClick={onCloseMenu}>
                    <IoIosClose />
                    <span>
                        Fechar
                    </span>
                </ButtonClose>
            </Close>
            <Nav>
                <div>
                    <ButtonText onClick={() => handleNavigation("/")} title="Home" icon={FaHome} /> 
                </div>
                <div>
                    <ButtonText onClick={() => handleNavigation("/about")} title="Sobre nos" icon={FaUsers} />
                </div>
            </Nav>
            
            <div></div>
        </Container>
    )
}