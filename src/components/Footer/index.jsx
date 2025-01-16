import { Container, Contat, Form, Content, SocialMedia } from './styles'

import logo from '../../assets/umibots.png'

import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaInstagram } from 'react-icons/fa6'

export function Footer(){
    return(
        <Container>
            <Content>
                <Contat>
                    <h2>Endereço</h2>

                    <div>
                        <span><FaLocationDot /> Rua joão pessoa s/n, Açailândia-MA 65930-000</span>
                        <a href='mailto:umibots1@gmail.com'><MdEmail /> umibots1@gmail.com</a>
                        <a href='http://instagram.com/umibots' target='_blank'><FaInstagram /> umibots</a>
                    </div>
                </Contat>

                <Form>
                    <h1>Entre em contato</h1>

                    <span>Nome:</span>

                    <input type="text" placeholder='ex: João Silva' />

                    <span>Mensagem:</span>
                    <textarea placeholder='Escreva sua mensagem aqui'></textarea>
                </Form>
            </Content>
            <SocialMedia>
                <div id='logo'>
                    <img src={logo} alt="Logo da umibots" />
                    Umibots
                </div>
            </SocialMedia>
        </Container>
    )
}