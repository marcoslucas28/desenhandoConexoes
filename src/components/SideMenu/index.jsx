import { Container, ButtonClose, Close } from './styles'

import { NavBar } from '../../components/NavBar'

import { IoIosClose } from 'react-icons/io'

export function SideMenu({isVisible, onCloseMenu, ...rest}){

    return(
        <Container {...rest} $isvisible={isVisible}>
            <Close>
                <ButtonClose onClick={onCloseMenu}>
                    <IoIosClose />
                    <span>
                        Fechar
                    </span>
                </ButtonClose>
            </Close>
            <NavBar />
            
            <div></div>
        </Container>
    )
}