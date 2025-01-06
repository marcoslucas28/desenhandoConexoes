import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    :root{
        font-family: 'Roboto', sans-serif;

        font-size: 62.5%;
    }

    * {
        margin: 0;
        padding: 0;
    }

    body {
        height: 100%;

        overflow-y: auto;
        overflow-x: hidden;

        scrollbar-width: thin;
        scrollbar-color: #171564 transparent;

        #root {
            height: 100%;
            width: 100%;
        }
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: all .2s;
    }

    button:hover, a:hover {
        filter: brightness(.6);
    }

    ul, li {
        text-decoration: none;
        list-style: none;
    }

    input, textarea {
        border: none;
        outline: none;
    }

    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #171564;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }
`