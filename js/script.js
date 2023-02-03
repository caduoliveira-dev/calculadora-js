const previewOperacoes = document.querySelector('#preview-operacoes');
const atualOperacoes = document.querySelector('#atual-operacoes');

const botoes = document.querySelectorAll('#botoes-container button');

class Calculadora{
    constructor(previewOperacoes, atualOperacoes){
        this.previewOperacoes = previewOperacoes;
        this.atualOperacoes = atualOperacoes;
        this.atualOperacoesVazia = "";
    }

    addDigito(digito) {
        if(digito === "." && this.atualOperacoes.innerText.includes(".")){
            return;
        }
        this.atualOperacoesVazia = digito;
        this.atualizaTela();
    }

    processoOperacoes(operacoes){

        if(this.atualOperacoes.innerText === "" && operacoes !== "C"){
            if(this.previewOperacoes.innerText !== ""){
                this.enviandoOperacao(operacoes);    
            }
            return;
        }

        let valorOperacao;
        const preview = +this.previewOperacoes.innerText.split(" ")[0];
        const atual = +this.atualOperacoes.innerText;

        switch(operacoes){
            case "+":
                valorOperacao = preview + atual
                this.atualizaTela(valorOperacao, operacoes, atual, preview);
                break;
            case "-":
                valorOperacao = preview - atual
                this.atualizaTela(valorOperacao, operacoes, atual, preview);
                break;
            case "/":
                valorOperacao = preview / atual
                this.atualizaTela(valorOperacao, operacoes, atual, preview);
                break;
            case "*":
                valorOperacao = preview * atual
                this.atualizaTela(valorOperacao, operacoes, atual, preview);
                break;
            case "DEL":
                this.deletarDigito();
                break;
            case "CE":
                this.limparAtualOperacao();
                break;
            case "C":
                this.limparTodaOperacao();
                break;
            case "=":
                this.botaoIgual();
                break;
            default:
                return;
        }

    }

    atualizaTela(valorOperacao = null, operacoes = null, atual = null, preview = null) {
        if(valorOperacao === null){
            this.atualOperacoes.innerText += this.atualOperacoesVazia;
        } else{
            if(preview === 0){
                valorOperacao = atual
            }

            this.previewOperacoes.innerText = `${valorOperacao} ${operacoes}`;
            this.atualOperacoes.innerText = "";
        }
    }

    enviandoOperacao(operacoes){
        const mathOperacoes = ["+", "/", "-", "*"]

        if (!mathOperacoes.includes(operacoes)){
            return;
        }

        this.previewOperacoes.innerText = this.previewOperacoes.innerText.slice(0, -1) + operacoes;
    }

    deletarDigito(){
        this.atualOperacoes.innerText = this.atualOperacoes.innerText.slice(0, -1);
    }

    limparAtualOperacao(){
        this.atualOperacoes.innerText = "";
    }

    limparTodaOperacao(){
        this.atualOperacoes.innerText = "";
        this.previewOperacoes.innerText = "";
    }

    botaoIgual(){
        const operacoes = previewOperacoes.innerText.split(" ")[1];
        this.processoOperacoes(operacoes);
    }

}

const calc = new Calculadora(previewOperacoes, atualOperacoes);

botoes.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const valor = e.target.innerText;

        if(+valor >= 0 || valor == "."){
            calc.addDigito(valor);
        } else{
            calc.processoOperacoes(valor);
        }
    });
});