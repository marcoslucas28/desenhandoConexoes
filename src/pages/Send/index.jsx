import { Container, Content, ConnectDiv, SendFile, Upload } from './styles'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

import { FaCloudDownloadAlt } from 'react-icons/fa'

import { useState, useRef } from "react"

export function Send(){
    const [step, setStep] = useState(1)
    const [file, setFile] = useState(null)
    const [connected, setConnected] = useState(false)
    const [output, setOutput] = useState("")
    
    const fileInputRef = useRef(null)
    let port, writer, writableStreamClosed

    function handleFileChange(event){
        setFile(event.target.files[0])
        setStep(2)
    }

    async function handleConnect(){
        try {
            port = await navigator.serial.requestPort()
            await port.open({ baudRate: 9600 })

            const encoder = new TextEncoderStream();
            writableStreamClosed = encoder.readable.pipeTo(port.writable)
            writer = encoder.writable.getWriter()

            setConnected(true)
            setStep(3)
            setOutput("Conectado ao Arduino via Serial.\n")
        } catch (error) {
            console.error("Erro ao conectar: ", error)
            setOutput("Erro ao conectar: " + error + "\n")
        }
    }

    async function handleSend(){
        if (!file) {
            alert("Selecione um arquivo G-code.")
            return
        }

        const fileReader = new FileReader()
        fileReader.onload = async (event) => {
            const gcode = event.target.result.split("\n")

            for (let line of gcode) {
                line = line.trim()

                if (line.length > 0) {
                    await writer.write(line + "\n")
                }
            }
            setOutput((prev) => prev + "G-code enviado com sucesso.\n")
        }

        fileReader.readAsText(file)
    }

    async function handleDisconnect(){
        try {
            await writer.close()
            await writableStreamClosed
            await port.close()
            setConnected(false)
            setStep(1)
            setOutput((prev) => prev + "Desconectado do Arduino.\n")
        } catch (error) {
            console.error("Erro ao desconectar: ", error)
        }
    }

    return (
        <Container>
            <Header />
            <Content>
            {step === 1 && (
                <Upload>
                    <header>Escolha seu arquivo</header>
                    <label htmlFor="image">
                        <FaCloudDownloadAlt />
                        <p>Escolha seu arquivo</p>
                        <input id="image" type="file" accept=".gcode" ref={fileInputRef} onChange={handleFileChange} />
                    </label>
                </Upload>
            )}

            {step === 2 && (
                <ConnectDiv>
                    <header>Conecte-se à CNC</header>
                    <button onClick={handleConnect} className="px-4 py-2 bg-blue-500 text-white rounded">
                        Conectar
                    </button>
                </ConnectDiv>
            )}

            {step === 3 && (
                <SendFile>
                    <header>Enviar para CNC</header>
                    <p>Arquivo selecionado: {file?.name}</p>
                    <div>
                        <button onClick={handleSend} className="px-4 py-2 bg-green-500 text-white rounded">
                            Enviar Desenho
                        </button>
                        <button onClick={handleDisconnect} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">
                            Desconectar
                        </button>
                    </div>
                </SendFile>
            )}

            <pre className="mt-4 bg-gray-200 p-4 w-96 h-32 overflow-auto">{output}</pre>
            </Content>
            <Footer />
        </Container>
    )
}