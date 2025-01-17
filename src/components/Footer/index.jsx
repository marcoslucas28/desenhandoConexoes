import { Container, Contat, Form, Content, SocialMedia } from './styles'

import logo from '../../assets/umibots.png'

import { FaLocationDot } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { FaInstagram } from 'react-icons/fa6'

import { useState } from 'react'

import emailjs from '@emailjs/browser';

export function Footer(){
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")

    const templateParams = {
        from_name: name,
        message: message,
        email: email
    }

    function handleSendMensage(e){
        e.preventDefault()

        if(!name || !email || !message){
            return alert("Preencha todos os campos para enviar sua mensagem.")
        }

        emailjs.send("service_ngd8xuc", "template_vc0njds", templateParams, "IauwFcCIABNUj9X8J").then((response) => {
            setName("")
            setEmail("")
            setMessage("")
            return alert("Mensagem enviada com sucesso!")
        }, (err) => {
            console.log("Error:", err)
            return alert("Algo deu errado, tente novamente mais tarde.")
        })
    }

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

                    <input type="text" placeholder='ex: João Silva' onChange={(e) => setName(e.target.value)} value={name} />

                    <span>Seu email:</span>

                    <input type="email" placeholder='exemplo@email.com' onChange={(e) => setEmail(e.target.value)} value={email} />

                    <span>Mensagem:</span>
                    <textarea placeholder='Escreva sua mensagem aqui' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

                    <button onClick={handleSendMensage}>Enviar mensagem</button>
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