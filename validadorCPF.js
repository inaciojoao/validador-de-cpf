// validador de CPF

function ValidaCpf(cpfEnviado){
Object.defineProperty(this, 'cpfLimpo',{
    enumerable: true,
    get: function(){
        return cpfEnviado.replace(/\D+/g, ''); // expressão regular que substitui tudo que não seja número
    }
});
};

ValidaCpf.prototype.valida = function() {
if(typeof this.cpfLimpo === 'undefined') return false; // checando se o cpf é diferente de undefined e se ele foi enviado de fato
if(this.cpfLimpo.length !== 11) return false; // checando se o cpf enviado tem 11 digitos
if(this.isSequencia()) return false;

const cpfParcial = this.cpfLimpo.slice(0, -2);  // variavel que armazena os 9 primeiros digitos do cpf
const digito1 = this.criaDigito(cpfParcial); // varial que irá receber o primeiro digito
const digito2 = this.criaDigito(cpfParcial + digito1); // varial que irá receber o segundo digito

const novoCpf = cpfParcial + digito1 + digito2;

return novoCpf === cpfLimpo; 
};

ValidaCpf.prototype.criaDigito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);

    let regressivo = cpfArray.length + 1; //tamanho do array e soma +1
    const total = cpfArray.reduce((ac, val) => {
        ac += (regressivo * Number(val))
        regressivo-- ;
        return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : string(digito);
};

ValidaCpf.prototype.isSequencia = function(){
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length); // checa se o cpe enviado é uma sequencia de numeros iguais
    return sequencia === this.cpfLimpo;

}

const cpf = new ValidaCpf('705.484.450-52'); // onde o user envia o cpf

//  exibe na tela para o user se o cpf enviado é válido ou não
if(cpf.valida()){
    console.log('CPF válido.')
}else{
    console.log('CPF inválido')
}

