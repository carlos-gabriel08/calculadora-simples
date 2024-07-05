// script.js

// Seleção dos elementos
const display = document.querySelector("#displayInput");
const botaoIgual = document.querySelector(".igual");
const botaoPonto = document.querySelector(".ponto");
const botoesNumeros = document.querySelectorAll(".num");
const botoesOperadores = document.querySelectorAll(".operador");
const botaoApagar = document.querySelector(".clean");

// Variáveis globais
let operacaoAtual = "";
let operador = null;
let valorAnterior = "";
let calculando = false;

// Funções

function atualizaDisplay() {
    display.value = operacaoAtual;
}

function insereNumero(evento) {
    if (calculando) {
        operacaoAtual = evento.target.textContent;
        calculando = false;
    } else {
        operacaoAtual += evento.target.textContent;
    }
    atualizaDisplay();
}

function inserePonto() {
    if (operacaoAtual.indexOf(".") === -1) {
        operacaoAtual += ".";
        atualizaDisplay();
    }
}

function insereOperador(evento) {
    if (operacaoAtual !== "") {
        if (!calculando) {
            if (operador !== null) {
                calcula();
            }
            valorAnterior = operacaoAtual;
            operacaoAtual = "";
        }
        operador = evento.target.textContent;
    }
}

function calcula() {
    let resultado = null;
    const operandoAnterior = parseFloat(valorAnterior);
    const operandoAtual = parseFloat(operacaoAtual);
    switch (operador) {
        case "+":
            resultado = operandoAnterior + operandoAtual;
            break;
        case "-":
            resultado = operandoAnterior - operandoAtual;
            break;
        case "X":
            resultado = operandoAnterior * operandoAtual;
            break;
        case "/":
            resultado = operandoAnterior / operandoAtual;
            break;
    }
    operacaoAtual = String(resultado);
    valorAnterior = operacaoAtual;
    calculando = true;
    atualizaDisplay();
}

function apagaDisplay() {
    operacaoAtual = "";
    operador = null;
    valorAnterior = "";
    calculando = false;
    atualizaDisplay();
}

function toggleMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
}

// Eventos 
botaoPonto.addEventListener("click", inserePonto);
botoesNumeros.forEach(botao => botao.addEventListener("click", insereNumero));
botoesOperadores.forEach(botao => botao.addEventListener("click", insereOperador));
botaoIgual.addEventListener("click", calcula);
botaoApagar.addEventListener("click", apagaDisplay);
