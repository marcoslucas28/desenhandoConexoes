import { Container, Content } from './styles'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

import { Helmet } from "react-helmet-async";

export function About(){
    return(
        <Container>
            <Helmet>
                <title>Desenhando Conexões - Sobre nos</title>
                <meta name="description" content="Conheça a equipe Umibots, formada por estudantes da escola UMI Tânia Leite Santos. Somos apaixonados por robótica e tecnologia, participando de diversas competições de inovação. Nosso projeto, Desenhando Conexões, é um projeto de pesquisa apoiado pela FAPEMA, que integra arte e robótica para transformar a experiência educacional." />
                <script type="application/ld+json">
                    {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "AboutPage",
                    "name": "Sobre Nós - Robótica Umibots",
                    "url": "https://desenhando-conexoes.vercel.app/about",
                    "description": "Página dedicada à equipe Robótica Umibots da Umi Tania Leite Santos, responsável pelo projeto 'Desenhando Conexões'.",
                    "mainEntity": {
                        "@type": "Organization",
                        "name": "Equipe Umibots",
                        "url": "https://desenhando-conexoes.vercel.app/about",
                        "description": "Equipe de robótica formada por estudantes da UMI Tânia Leite Santos, responsável pelo projeto 'Desenhando Conexões', que une tecnologia, criatividade e tutoriais interativos para inspirar participantes de todas as idades.",
                        "sameAs": [
                        "https://www.instagram.com/umibots",
                        ]
                    }
                    })}
                </script>
            </Helmet>
            <Header />
            <Content>
                <h1>Sobre nos</h1>

                <p>
                Bem-vindo ao blog da UMIBOTS, a dedicada equipe de robótica da Unidade Mais Integral Tânia Leite 
                Santos, localizada em Açailândia-MA.
                </p>

                <p>
                Desde nossa fundação em 2022, temos nos empenhado em explorar o fascinante mundo da robótica, 
                combinando criatividade, inovação e trabalho em equipe. A paixão pela tecnologia nos uniu, e desde 
                então, participamos de diversas competições renomadas no cenário nacional, incluindo a FLL 
                (First Lego League), FiraBrasil, e MNR (Mostra Nacional de Robótica). Atualmente, estamos focados 
                nos preparativos para a OBR (Olimpíada Brasileira de Robótica).
                </p>

                <p>
                Nosso objetivo é não apenas competir, mas também aprender e crescer juntos como uma equipe. 
                Cada desafio enfrentado e cada conquista alcançada reforçam nosso compromisso com a 
                excelência e o aprendizado contínuo. Aqui no nosso blog, compartilharemos nossas 
                experiências, novidades sobre competições, dicas de robótica e muito mais.
                </p>

                <p>
                Acompanhe nossa jornada e faça parte da nossa comunidade! 
                Estamos animados para compartilhar com você cada passo 
                desse emocionante caminho no mundo da robótica.
                </p>
            </Content>
            <Footer />
        </Container>
    )
}