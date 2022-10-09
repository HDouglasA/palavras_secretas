import './App.css';
import {useEffect, useState} from "react"
import {Palavras} from "./Constants/Palavras"
import { TelaInicial } from './components/telaInicial/TelaInicial';
import { Jogo } from './components/jogo/Jogo';
import { FimJogo } from './components/fimJogo/FimJogo';

const estagios = [
  {id: 1, nome: "inicio"},
  {id: 2, nome: "jogo"},
  {id: 3, nome: "fim"}
]

function App() {
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
    // seleciona categoria aleatória
    const categorias = Object.keys(Palavras)
    const categoria = categorias[Math.floor(Math.random() * categorias.length)]

    // seleciona palavra aleatória
    const palavra = listaPalavras[categoria][Math.floor(Math.random() * Palavras[categoria].length)]
    return {palavra, categoria}
  }

  // começa o jogo
  const iniciarJogo = () => {
    // limpa todas as letras
    limparEstadoLetras()

    // palavra selecionada
    const {palavra, categoria} = palavraECategoriaEscolhida()
    const letrasPalavra = palavra.toLowerCase().split("")

    setPalavraEscolhida(palavra)
    setCategoriaEscolhida(categoria)
    setLetras(letrasPalavra)
    setEstagioJogo(estagios[1].nome)
  }

  // processo da letra de entrada 
  const verificarLetra = (letra) => {
    const letraNormalizadas = letra.toLowerCase()

    // verifica se a letra já foi utilizada
    if (letrasAdivinhadas.includes(letraNormalizadas )||  letrasErradas.includes(letraNormalizadas )) {
      return
    }

    // adiciona a letra adivinhada ou elimina uma chance
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

  // limpa estado das letras
  const limparEstadoLetras = () => {
    setLetrasAdivinhadas([])
    setLetrasErradas([])
  }

  // verifica se os palpites terminaram
  useEffect(() => {
    if(palpites <= 0) {
      // finaliza o jogo e reseta todos os estados
      limparEstadoLetras()
      setEstagioJogo(estagios[2].nome)
    }
  }, [palpites])

  // verifica condição de vitória
  useEffect(() => {
    const letrasUnicas = [...new Set(letras)]

    // condição de vitória
    if(letrasAdivinhadas.length ===  letrasUnicas.length && estagioJogo === estagios[1].nome) {
      setTimeout(() => {
        // adiciona pontuação
        setPontuacao((pontuacaoAtual) => (pontuacaoAtual += 100))
        setPalpites(5)
        // nova palavra
        iniciarJogo()
      }, 500);
    }

  })

  // reinicia o jogo
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
