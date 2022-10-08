import { useState, useRef} from "react"
import "./Jogo.css"

export const Jogo = ({
  verificarLetra, 
  palavraEscolhida, 
  categoriaEscolhida, 
  letras, 
  letrasAdivinhadas, 
  letrasErradas, 
  palpites, 
  pontuacao
}) => {

  const [letra, setLetra] = useState("")
  const inputLetraRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    verificarLetra(letra)

    setLetra("")
    inputLetraRef.current.focus()
  }

  const letraEscolhida = letras.map((letra, i) => (
    letrasAdivinhadas.includes(letra) ? (
      <span key={i} className="letra">{letra}</span>
    ) : (
      <span key={i} className="quadradoBranco"></span>
    )
  ))

  const letraUtilizada = letrasErradas.map((letra, i) => (
    <span key={i}> {letra} </span>
  ))

  return (
    <div className="jogo">
      <p className="pontos">
        <span>Pontuação: {pontuacao}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="dica">
        Dica: <span>{categoriaEscolhida}</span>
      </h3>
      <p>Você tem {palpites} tentativas(s).</p>
      <section className="containerPalavra">
        {letraEscolhida}
      </section>
      <section className="letraContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letra" 
            maxLength={1}
            required 
            onChange={(e) => setLetra(e.target.value)}
            value={letra}
            ref={inputLetraRef}
          />
          <button>Jogar!</button>
        </form>
      </section>
      <section className="containerLetraErrada">
        <p>Letras já utilizadas</p>
        {letraUtilizada}
      </section>
    </div>
  )
}
