import { Container } from './styles'

import { ButtonText } from '../../components/ButtonText'
import { FaHome } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'

import { useNavigate, useLocation } from 'react-router-dom'

export function NavBar({...rest}){
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
        <Container {...rest} >
                <div>
                    <ButtonText onClick={() => handleNavigation("/")} title="Home" icon={FaHome} /> 
                </div>
                <div>
                    <ButtonText onClick={() => handleNavigation("/about")} title="Sobre nos" icon={FaUsers} />
                </div>
        </Container>
    )
}