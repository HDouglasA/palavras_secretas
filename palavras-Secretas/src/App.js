import './App.css';
import {useCallback, useEffect, useState} from "react"
import {Palavras} from "./Constants/Palavras"
import { TelaInicial } from './components/telaInicial/TelaInicial';
import { Jogo } from './components/jogo/Jogo';
import { FimJogo } from './components/fimJogo/FimJogo';

function App() {
  const estagios = [
    {id: 1, nome: "inicio"},
    {id: 2, nome: "jogo"},
    {id: 3, nome: "fim"}
  ]

  const [estagioJogo, setEstagioJogo] = useState(estagios[0].nome)
  const [listaPalavras] = useState(Palavras)
  const [palavraEscolhida, setPalavraEscolhida] = useState("")
  const [categoriaEscolhida, setCategoriaEscolhida] = useState("")
  const [letras, setLetras] = useState([])
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([])
  const [letrasErradas, setLetrasErradas] = useState([])
  const [palpites, setPalpites] = useState(5)
  const [pontuacao, setPontuacao] = useState(0)

  const palavraECategoriaEscolhida = () => {
    const categorias = Object.keys(Palavras)
    const categoria = categorias[Math.floor(Math.random() * categorias.length)]
    const palavra = listaPalavras[categoria][Math.floor(Math.random() * Palavras[categoria].length)]
    return {palavra, categoria}
  }

  const iniciarJogo = useCallback(() => {
    limparEstadoLetras()
    const {palavra, categoria} = palavraECategoriaEscolhida()
    const letrasPalavra = palavra.toLowerCase().split("")


    setPalavraEscolhida(palavra)
    setCategoriaEscolhida(categoria)
    setLetras(letrasPalavra)
    setEstagioJogo(estagios[1].nome)
  }, [palavraECategoriaEscolhida])

  const verificarLetra = (letra) => {
    const letraNormalizadas = letra.toLowerCase()
    if (letrasAdivinhadas.includes(letraNormalizadas )||  letrasErradas.includes(letraNormalizadas )) {
      return
    }

    if (letras.includes(letraNormalizadas)) {
      setLetrasAdivinhadas((letrasAdivinhadasAtuais) => [
        ...letrasAdivinhadasAtuais, letraNormalizadas
      ])

    } else {
      setLetrasErradas((letrasErradasAtuais) => [
        ...letrasErradasAtuais, letraNormalizadas
      ])

      setPalpites((palpiteAtual) => palpiteAtual -1)
    } 
  }

  const limparEstadoLetras = () => {
    setLetrasAdivinhadas([])
    setLetrasErradas([])
  }

  useEffect(() => {
    if(palpites <= 0) {
      limparEstadoLetras()
      setEstagioJogo(estagios[2].nome)
    }
  }, [palpites])

  useEffect(() => {

    const letrasUnicas = [...new Set(letras)]

    if(letrasAdivinhadas.length ===  letrasUnicas.length) {
      setPontuacao((pontuacaoAtual) => (pontuacaoAtual += 100))

      iniciarJogo()
    }
  }, [letrasAdivinhadas, letras, iniciarJogo])

  const reiniciarJogo = () => {
    setPontuacao(0)
    setPalpites(5)
    setEstagioJogo(estagios[0].nome)
  }

  return (
    <div className="App">
      {estagioJogo === "inicio" && <TelaInicial iniciarJogo={iniciarJogo} />}
      {estagioJogo === "jogo" && (
        <Jogo 
          verificarLetra={verificarLetra} 
          palavraEscolhida={palavraEscolhida}
          categoriaEscolhida={categoriaEscolhida}
          letras={letras}
          letrasAdivinhadas={letrasAdivinhadas}
          letrasErradas={letrasErradas}
          palpites={palpites}
          pontuacao={pontuacao}
        />
      )}
      {estagioJogo === "fim" && <FimJogo reiniciarJogo={reiniciarJogo} pontuacao={pontuacao} />}
    </div>
  );
}

export default App;
