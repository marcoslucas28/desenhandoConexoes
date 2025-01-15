import { Container, HeroSection, Title, Cursor, Content, Tutorials } from './styles'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import drawing from '../../assets/desenho.png'
import pngImg from '../../assets/iconpng.png'
import send from '../../assets/Envie G-code.png'

import { Header } from '../../components/Header'

import { useState, useEffect } from 'react'

export function Home(){
    const cardTutorials = [
        {
            img: drawing,
            title: "Crie seus desenhos",
            description: "Aprenda como fazer seus proprios desenhos pelo site de forma simples e prática."
        },
        {
            img: pngImg,
            title: "Transforme seus desenhos em G-code",
            description: "Veja como transformar seus desenhos em código gcode de forma simples e prática para usar na CNC."
        },
        {
            img: send,
            title: "Imprima seus desenhos",
            description: "Aprenda a enviar seus desenhos em gcode para a CNC."
        },
    ]

    const [showNavigation, setShowNavigation] = useState(window.innerWidth > 767)

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

    useEffect(() => {
        function handleResize(){
            setShowNavigation(window.innerWidth > 767)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

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

            <Tutorials>
                <h1>Aprenda a usar sua CNC</h1>

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={showNavigation}
                    pagination={{clickable: true}}
                    spaceBetween={30}
                    slidesPerView={1}
                >
                    <section class="wrapper">
                        <div class="container-fostrap">
                            <div class="content">
                                <div class="container">
                                    <div class="row">
                                            {
                                                cardTutorials.map((card) => (
                                                    <SwiperSlide>
                                                        <div class="col-xs-12 col-sm-4">
                                                            <div class="card">
                                                                <a class="img-card" >
                                                                <img src={card.img} />
                                                            </a>
                                                                <div class="card-content">
                                                                    <h4 class="card-title">
                                                                        <a >{card.title}
                                                                    </a>
                                                                    </h4>
                                                                    <p class="">
                                                                       {card.description}
                                                                    </p>
                                                                </div>
                                                                <div class="card-read-more">
                                                                    <a  class="btn btn-link btn-block">
                                                                        Veja
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                            }
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </Swiper>
            </Tutorials>
        </Container>
    )
}