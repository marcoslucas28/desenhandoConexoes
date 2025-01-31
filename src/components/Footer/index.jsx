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
    const [isEmailValid, setIsEmailValid] = useState(true)

    const templateParams = {
        from_name: name,
        message: message,
        email: email
    }


    async function verifyEmail(){
        try {
            const response = await fetch(
              `https://emailvalidation.abstractapi.com/v1/?api_key=6de92382f14c4533863ae8b1a8454497&email=${email}`
            );
            const data = await response.json();
            
            
            return data.is_valid_format.value && data.deliverability === "DELIVERABLE";
          } catch (error) {
            console.error("Erro ao validar o e-mail:", error);
          }
    }

    function handleSendMensage(e){
        e.preventDefault()

        if(!name || !email || !message){
            return alert("Preencha todos os campos para enviar sua mensagem.")
        }

        verifyEmail().then((valid) => {
            if (!valid) {
                setIsEmailValid(false)
              }else {
                setIsEmailValid(true)
              }
        }).catch((error) => {
            console.error("Erro ao validar o e-mail:", error);
            setIsEmailValid(true)
          });

          if(!isEmailValid){
            return alert("E-mail inválido! Verifique e tente novamente.");
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


                    <div id='name'>
                        <div>
                            <span>Nome:</span>
                            <input type="text" placeholder='ex: João Silva' onChange={(e) => setName(e.target.value)} value={name} />
                        </div>

                        <div>
                            <span>Seu email:</span>
                            <input type="email" placeholder='exemplo@email.com' onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>
                    </div>

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