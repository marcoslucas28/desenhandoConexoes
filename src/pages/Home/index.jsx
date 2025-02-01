import { Container, HeroSection, Title, Cursor, Content, Tutorials } from './styles'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import drawing from '../../assets/desenho.png'
import pngImg from '../../assets/iconpng.png'
import send from '../../assets/Envie G-code.png'

import video from '../../assets/video.mp4'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Tutorial } from '../../components/Tutorial'

import { useState, useEffect } from 'react'
import { Helmet } from "react-helmet-async";

export function Home(){
    const [isPoputOpen, setIsPoputOpen] = useState(false)
    const [poputData, setPoputData] = useState({})

    const cardTutorials = [
        {
            img: drawing,
            title: "Crie seus desenhos",
            description: "Aprenda como fazer seus proprios desenhos pelo site de forma simples e prática.",
            videoPath: video
        },
        {
            img: pngImg,
            title: "Transforme seus desenhos em G-code",
            description: "Veja como transformar seus desenhos em código gcode de forma simples e prática para usar na CNC.",
            videoPath: video
        },
        {
            img: send,
            title: "Imprima seus desenhos",
            description: "Aprenda a enviar seus desenhos em gcode para a CNC.",
            videoPath: video
        },
    ]

    const [showNavigation, setShowNavigation] = useState(window.innerWidth > 767)

    const words = ["Imagine.", "Desenhe.", "Imprima."]
    const [text, setText] = useState("")
    const [index, setIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [speed, setSpeed] = useState(100)

    function handleCardClick(data){
        setPoputData(data)
        setIsPoputOpen(true)
    }

    function closePoput(){
        setIsPoputOpen(false)
        setPoputData({})
    }

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
            <Helmet>
                <title>Desenhando Conexões - Mini CNC Plotter</title>
                <meta name="description" content="Descubra o projeto Desenhando Conexões: uma fusão entre robótica e arte. Explore tutoriais interativos para aprender a usar uma CNC plotter e crie suas próprias obras de arte digitais." />

                <script type="application/ld+json">
                    {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Desenhando Conexões",
                    "url": "https://desenhando-conexoes.vercel.app/",
                    "description": "Projeto 'Desenhando Conexões' integra robótica, programação e a expressão artística do desenho, convidando participantes de todas as idades a criar suas próprias obras através de uma mini CNC plotter e tutoriais interativos.",
                    "about": {
                        "@type": "CreativeWork",
                        "name": "Desenhando Conexões",
                        "description": "Iniciativa que une a paixão pela robótica e a criatividade do desenho para tornar o hobby mais inclusivo e atrativo."
                    }
                    })}
                </script>
            </Helmet>
            <Header isInHome={true} />
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
                    <section className="wrapper">
                        <div className="container-fostrap">
                            <div className="content">
                                <div className="container">
                                    <div className="row">
                                            {
                                                cardTutorials.map((card, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div  onClick={() => handleCardClick(card)} className="col-xs-12 col-sm-4">
                                                            <div className="card">
                                                                <a className="img-card" >
                                                                <img src={card.img} />
                                                            </a>
                                                                <div className="card-content">
                                                                    <h4 className="card-title">
                                                                        <a >{card.title}
                                                                    </a>
                                                                    </h4>
                                                                    <p className="">
                                                                       {card.description}
                                                                    </p>
                                                                </div>
                                                                <div className="card-read-more">
                                                                    <a  className="btn btn-link btn-block">
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

            <Footer />

            <Tutorial isOpen={isPoputOpen} data={poputData} onClose={closePoput} />
        </Container>
    )
}