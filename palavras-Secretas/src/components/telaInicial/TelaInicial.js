import "./TelaInicial.css"

export const TelaInicial = ({iniciarJogo}) => {
  return (
    <div className="inicial">
      <h1>Palavras Secretas</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <button onClick={iniciarJogo}>Começar o Jogo</button>
    </div>
  )
}
