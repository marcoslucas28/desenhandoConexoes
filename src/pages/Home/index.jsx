import { Container, HeroSection, Title, Cursor, Content, Carrosel } from './styles'

import { Header } from '../../components/Header'

import { useState, useEffect } from 'react'

export function Home(){
    const words = ["Imagine.", "Desenhe.", "Imprima."]
    const [text, setText] = useState("")
    const [index, setIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [speed, setSpeed] = useState(150)

    useEffect(() => {
        function handleTyping(){
            const currentWord = words[index % words.length]

            if(isDeleting){
                setText((prev) => prev.slice(0, -1))
            }else {
                setText((prev) => currentWord.slice(0, prev.length + 1))
            }

            if(!isDeleting && text === currentWord){
                setTimeout(() => setIsDeleting(true), 1000)
            }else if(isDeleting && text == ""){
                setIsDeleting(false)
                setIndex((prev) => prev + 1)
            }
        }

        const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed)

        return () => clearTimeout(timer)
    }, [text, isDeleting, words, index, speed])

    return(
        <Container>
            <Header />
            <HeroSection>
            <Title>
                <h1>Dê vida às suas ideias:<br /> {text}<Cursor $isdeleting={isDeleting}>|</Cursor></h1>

                <p><strong>Do esboço à realidade</strong>, conectamos sua <strong>imaginação à tecnologia</strong>. Dê vida aos seus <strong>desenhos</strong> de maneira fácil e inspiradora</p>
            </Title>

            <a target='_blank' id="copyright" href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a>
            </HeroSection>
           
           <Content>
            <h1>Sobre o Projeto</h1>

            <p>O projeto "Desenhando Conexões: Um convite a todos!" redefine a experiência do hobby da robótica, programação e montagem
                de projetos, integrando a expressão artística do desenho. Reconhecendo que a robótica é uma forma envolvente de expressão
                criativa, mas que nem todos possuem o mesmo entusiasmo inicial, este projeto busca superar barreiras ao introduzir a 
                dimensão artística do desenho. Através da integração da mini CNC plotter com tutoriais interativos, os participantes podem 
                escolher desenhos, personalizar e observar suas criaçõesganharem vida, proporcionando uma nova e inspiradora faceta para o 
                hobby. </p>
           </Content>

        </Container>
    )
}