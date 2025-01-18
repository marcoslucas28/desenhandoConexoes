import { Container, Content, Header, Video, Close } from './styles'

import { FaArrowLeft } from 'react-icons/fa'

import { useEffect } from 'react'

export function Tutorial({isOpen, data, onClose}){
    useEffect(() => {
        if(isOpen){
            document.body.style.overflow = 'hidden'
        }else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    if (!isOpen) return null

    return(
        <Container>
            <Header>
                <Close onClick={onClose}>
                    <FaArrowLeft />
                    <span>Voltar</span>
                </Close>
            </Header>
            <Content>
                <Video>
                    <video controls >
                        <source src={data.videoPath} />
                    </video>
                    <h1>{data.title}</h1>
                </Video>
                
                <p>
                    {data.description}
                </p>
            </Content>
        </Container>
    )
}