//Exercícios de Interfaces e Tipos Avançados
//Exercicio 1
interface Produto {
  nome: string;
  preco: number;
  categoria: string;
}

type FormaPagamento = 'dinheiro' | 'cartão' | 'pix';

function exibirProdutoComPagamento(produto: Produto, pagamento: FormaPagamento): string {
  return `Produto: ${produto.nome}, Categoria: ${produto.categoria}, Preço: R$${produto.preco.toFixed(2)}, Forma de Pagamento: ${pagamento}.`;
}

const produtoExemplo: Produto = { nome: 'Celular', preco: 2000, categoria: 'Eletrônicos' };
const formaPagamentoExemplo: FormaPagamento = 'cartão';

console.log(exibirProdutoComPagamento(produtoExemplo, formaPagamentoExemplo));

//Exercicio 2
type Pessoa = {
  nome: string;
  idade: number;
};

type Empregado = {
  empresa: string;
  salario: number;
};

type PessoaEmpregada = Pessoa & Empregado;

function exibirInformacoesEmpregado(empregado: PessoaEmpregada): string {
  return `Nome: ${empregado.nome}, Idade: ${empregado.idade}, Empresa: ${empregado.empresa}, Salário: R$${empregado.salario.toFixed(2)}.`;
}

const pessoaEmpregadaExemplo: PessoaEmpregada = { nome: 'Ana', idade: 35, empresa: 'TechCorp', salario: 8000 };
console.log(exibirInformacoesEmpregado(pessoaEmpregadaExemplo));

//Exercícios de Classes e Herança
//Exercicio 1
class Funcionario {
  constructor(public nome: string, public cargo: string, public salario: number) {}

  descricao(): string {
    return `Funcionário: ${this.nome}, Cargo: ${this.cargo}, Salário: R$${this.salario.toFixed(2)}`;
  }
}

class Gerente extends Funcionario {
  constructor(nome: string, cargo: string, salario: number, public departamento: string) {
    super(nome, cargo, salario);
  }

  descricaoDetalhada(): string {
    return `${super.descricao()}, Departamento: ${this.departamento}`;
  }
}

const gerenteExemplo = new Gerente('Carlos', 'Gerente de TI', 12000, 'Tecnologia');
console.log(gerenteExemplo.descricaoDetalhada());

//Exercicio 2
class ContaBancaria {
  constructor(public titular: string, public saldo: number) {}

  exibirSaldo(): string {
    return `Titular: ${this.titular}, Saldo: R$${this.saldo.toFixed(2)}`;
  }
}

class ContaCorrente extends ContaBancaria {
  constructor(titular: string, saldo: number, public limiteCredito: number) {
    super(titular, saldo);
  }

  exibirSaldo(): string {
    const saldoTotal = this.saldo + this.limiteCredito;
    return `${super.exibirSaldo()}, Saldo Total com Crédito: R$${saldoTotal.toFixed(2)}`;
  }
}

const contaCorrenteExemplo = new ContaCorrente('Fernanda', 5000, 2000);
console.log(contaCorrenteExemplo.exibirSaldo());

//Generics em TypeScript
function encontrarMaiorElemento<T extends number | string>(array: T[]): T {
    if (array.length === 0) {
        throw new Error("O array não pode estar vazio.");
    }
    
    let maior = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > maior) {
            maior = array[i]; 
        }
    }
    return maior;
}

const maiorNumero = encontrarMaiorElemento([10, 20, 30]);
const maiorPalavra = encontrarMaiorElemento(['gato', 'elefante', 'zebra']);

console.log(maiorNumero);
console.log(maiorPalavra);

//Decorators em TypeScript
function medirTempoDeExecucao(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.time(propertyKey);
        const resultado = metodoOriginal.apply(this, args);
        console.timeEnd(propertyKey);  
        return resultado;
    };
  
    return descriptor;
}

class Calculadora {
    @medirTempoDeExecucao
    somarNumeros(array: number[]): number {
        return array.reduce((a, b) => a + b, 0);
    }
}

const calc = new Calculadora();
calc.somarNumeros([1, 2, 3, 4, 5]);

//Manipulação de Erros em TypeScript
class EmailInvalidoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EmailInvalidoError';
    }
}

function verificarEmail(email: string): void {
    if (!email.includes('@')) {
        throw new EmailInvalidoError('Email inválido: O email deve conter o caractere "@"');
    }

    console.log('Email válido!');
}

try {
    verificarEmail('usuario.com');
} catch (error) {
    if (error instanceof EmailInvalidoError) {
        console.error(error.message);
    }
}

//Async/Await e Promises em TypeScript
async function buscarDadosDaAPI(): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const sucesso = Math.random() > 0.5; 

            if (sucesso) {
                resolve('Dados recebidos da API');
            } else {
                reject('Falha ao buscar dados da API');
            }
        }, 2000); 
    });
}

async function executarBusca() {
    try {
        const dados = await buscarDadosDaAPI();
        console.log(dados);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

executarBusca();
