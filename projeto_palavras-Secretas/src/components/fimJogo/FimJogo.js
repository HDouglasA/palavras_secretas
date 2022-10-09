import "./FimJogo.css"

export const FimJogo = ({reiniciarJogo, pontuacao}) => {
  return (
    <div>
      <h1>Fim de jogo</h1>
      <h2>A sua pontuação foi: <span>{pontuacao}</span></h2>
      <button onClick={reiniciarJogo}>Jogar Novamente</button>
    </div>
  )
}
