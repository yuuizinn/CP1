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