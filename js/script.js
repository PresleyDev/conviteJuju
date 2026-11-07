"use strict";
/**
 * Convite Virtual - 1º Aninho da Juju 🦋
 * Implementação em TypeScript com tipagem estrita e boas práticas.
 */
const PALETA_BORBOLETAS = [
    '#F6B6CF',
    '#FFFDF7'
];
const VARIANTES_ASAS = [
    {
        asaSuperior: 'M60 49C51 37 45 22 35 11 27 2 17 2 12 9 7 16 13 24 9 30 4 37 10 46 20 48 32 53 45 51 60 51Z',
        asaInferior: 'M60 49C47 49 34 47 23 49 12 50 7 56 10 63 12 68 17 69 20 73 24 81 33 87 40 82 48 78 54 68 60 54Z',
        nervurasSuperiores: 'M59 49C44 37 27 19 13 9M56 48C38 39 22 31 9 30M50 49C37 45 26 44 14 46M43 43C36 31 28 18 23 5',
        nervurasInferiores: 'M59 51C45 56 31 66 21 73M57 52C42 58 26 60 10 63M55 54C43 66 36 77 33 84M49 53C45 65 42 74 40 82',
        pigmentos: [[18, 19, 1.2], [27, 31, 1], [34, 43, 1.4], [22, 57, 1.1], [38, 68, 1.3]]
    },
    {
        asaSuperior: 'M60 50C51 39 47 24 38 12 31 3 21 1 14 7 7 14 12 23 10 29 6 38 12 46 22 49 34 53 48 52 60 52Z',
        asaInferior: 'M60 50C48 50 36 47 25 48 14 49 8 54 10 61 11 67 18 69 20 75 24 83 32 86 39 81 49 75 54 65 60 55Z',
        nervurasSuperiores: 'M59 50C47 38 30 20 15 7M56 49C39 41 22 33 10 29M51 50C37 46 25 46 12 47M44 44C39 31 31 18 26 5',
        nervurasInferiores: 'M59 52C45 57 31 67 21 75M57 53C41 59 25 60 10 61M54 55C43 66 36 76 32 84M48 54C44 65 41 75 39 81',
        pigmentos: [[17, 16, 1], [29, 27, 1.4], [39, 39, 1], [25, 55, 1.4], [42, 70, 1]]
    },
    {
        asaSuperior: 'M60 49C53 38 46 20 34 10 25 3 16 5 12 12 8 19 14 25 9 33 5 40 13 47 23 49 34 52 47 51 60 52Z',
        asaInferior: 'M60 49C47 48 35 46 24 49 13 52 9 57 12 64 14 69 18 70 21 76 26 84 34 86 41 80 50 73 55 63 60 54Z',
        nervurasSuperiores: 'M59 49C43 37 27 20 13 12M56 49C39 41 23 35 10 33M51 50C37 47 25 47 13 48M42 43C35 29 29 18 22 6',
        nervurasInferiores: 'M59 51C45 58 32 69 22 76M57 53C42 60 27 62 12 64M54 55C43 67 38 77 34 84M48 54C44 66 42 74 41 80',
        pigmentos: [[19, 21, 1.4], [31, 34, 1], [41, 44, 1.2], [24, 60, 1], [39, 72, 1.4]]
    }
];
class ConviteApp {
    telaAbertura;
    telaResultado;
    envelope;
    ceuBorboletas;
    botaoRepetir;
    botaoConfirmar;
    prefereReducaoMovimento;
    estaAnimando = false;
    proximoIdGradiente = 0;
    constructor() {
        this.telaAbertura = document.getElementById('abertura');
        this.telaResultado = document.getElementById('resultado');
        this.envelope = document.getElementById('envelope');
        this.ceuBorboletas = document.getElementById('ceu-borboletas');
        this.botaoRepetir = document.getElementById('repetir');
        this.botaoConfirmar = document.getElementById('confirmar');
        this.prefereReducaoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.inicializar();
    }
    inicializar() {
        this.envelope?.addEventListener('click', () => this.abrirConvite());
        this.botaoRepetir?.addEventListener('click', () => this.reiniciarAnimacao());
        this.configurarLinkWhatsApp();
    }
    configurarLinkWhatsApp() {
        const botao = this.botaoConfirmar;
        if (!botao)
            return;
        if (botao.getAttribute('href') === '#') {
            const numeroWhatsApp = '5511964499838';
            const mensagem = encodeURIComponent('Olá! Gostaria de confirmar minha presença no aniversário da Juju! 🦋✨');
            botao.href = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
            botao.target = '_blank';
            botao.rel = 'noopener noreferrer';
        }
    }
    gerarConfigBorboleta(index, total) {
        const larguraTela = Math.max(window.innerWidth, 1);
        const alturaTela = Math.max(window.innerHeight, 1);
        const totalDistribuicao = Math.max(total - 4, 1);
        const indiceDistribuicao = Math.max(index - 4, 0);
        const colunas = Math.ceil(Math.sqrt(totalDistribuicao * (larguraTela / alturaTela)));
        const linhas = Math.ceil(totalDistribuicao / colunas);
        const coluna = indiceDistribuicao % colunas;
        const linha = Math.floor(indiceDistribuicao / colunas);
        const larguraCelula = larguraTela / colunas;
        const alturaCelula = alturaTela / linhas;
        const tamanho = Math.floor(Math.random() * 40) + 30;
        const margemCantoX = Math.min(larguraTela * 0.2, larguraCelula * 0.85);
        const margemCantoY = Math.min(alturaTela * 0.2, alturaCelula * 0.85);
        const cantoX = index % 2 === 0
            ? tamanho / 2 + Math.random() * margemCantoX
            : larguraTela - tamanho / 2 - Math.random() * margemCantoX;
        const cantoY = index < 2
            ? tamanho / 2 + Math.random() * margemCantoY
            : alturaTela - tamanho / 2 - Math.random() * margemCantoY;
        const posicaoX = index < 4 ? cantoX : Math.min(larguraTela - tamanho / 2, Math.max(tamanho / 2, ((coluna + 0.5) * larguraCelula)
            + ((Math.random() - 0.5) * larguraCelula * 0.72)));
        const posicaoY = index < 4 ? cantoY : Math.min(alturaTela - tamanho / 2, Math.max(tamanho / 2, ((linha + 0.5) * alturaCelula)
            + ((Math.random() - 0.5) * alturaCelula * 0.72)));
        const destinoX = posicaoX - (larguraTela / 2);
        const destinoY = posicaoY - (alturaTela * 0.55);
        const corSelecionada = PALETA_BORBOLETAS[index % PALETA_BORBOLETAS.length] ?? '#F6B6CF';
        return {
            tamanho,
            cor: corSelecionada,
            duracao: Math.random() * 1200 + 1800,
            delay: Math.random() * 120,
            destinoX,
            destinoY,
            rotacao: Math.random() * 40 - 20,
            oscilacaoX: (Math.random() - 0.5) * 70,
            oscilacaoY: (Math.random() - 0.5) * 54,
            faseVoo: Math.random() * Math.PI * 2,
            ritmoAsas: Math.random() * 0.32 + 0.62,
            atrasoAsas: Math.random() * -0.5,
            variante: index % VARIANTES_ASAS.length
        };
    }
    criarBorboleta(config) {
        const ceu = this.ceuBorboletas;
        if (!ceu)
            return;
        const gradienteId = `lavagem-${this.proximoIdGradiente++}`;
        const variante = VARIANTES_ASAS[config.variante] ?? VARIANTES_ASAS[0];
        if (!variante)
            return;
        const borboleta = document.createElement('div');
        borboleta.className = 'borboleta';
        borboleta.style.setProperty('--tamanho', `${config.tamanho}px`);
        borboleta.style.setProperty('--cor', config.cor);
        borboleta.style.setProperty('--detalhe', config.cor === '#FFFDF7' ? '#F6B6CF' : '#FFFDF7');
        borboleta.style.setProperty('--ritmo-asas', `${config.ritmoAsas}s`);
        borboleta.style.setProperty('--ritmo-asa-inferior', `${config.ritmoAsas + 0.12}s`);
        borboleta.style.setProperty('--atraso-asas', `${config.atrasoAsas}s`);
        const criarAsa = (tipo, lado) => {
            const superior = tipo === 'superior';
            const asa = superior ? variante.asaSuperior : variante.asaInferior;
            const nervuras = superior ? variante.nervurasSuperiores : variante.nervurasInferiores;
            const classe = `asa asa-${tipo} ${lado}`;
            const espelhamento = lado === 'direita' ? 'translate(120 0) scale(-1 1)' : '';
            const pintas = variante.pigmentos
                .map(([x, y, raio]) => {
                const pontoX = lado === 'direita' ? 120 - x : x;
                return `<circle class="pigmento" cx="${pontoX}" cy="${y}" r="${raio}" />`;
            })
                .join('');
            return `
        <g class="${classe}">
          <g transform="${espelhamento}">
            <path class="asa-forma" fill="url(#${gradienteId})" d="${asa}" />
            <path class="nervura" d="${nervuras}" />
            <path class="brilho-asa" d="${superior
                ? 'M14 13C20 5 29 8 37 17 29 14 22 16 17 23Z'
                : 'M14 59C20 51 29 54 37 62 29 59 22 62 17 68Z'}" />
            ${pintas}
          </g>
        </g>`;
        };
        borboleta.innerHTML = `
      <div class="asas">
        <svg viewBox="0 0 120 90" role="presentation" focusable="false">
          <defs>
            <linearGradient id="${gradienteId}" x1="0" y1="0" x2="0.85" y2="1">
              <stop offset="0" stop-color="#FFFDF7" stop-opacity=".88" />
              <stop offset=".42" stop-color="var(--cor)" stop-opacity=".76" />
              <stop offset=".78" stop-color="#FFFDF7" stop-opacity=".58" />
              <stop offset="1" stop-color="var(--cor)" stop-opacity=".7" />
            </linearGradient>
          </defs>
          ${criarAsa('superior', 'esquerda')}
          ${criarAsa('superior', 'direita')}
          ${criarAsa('inferior', 'esquerda')}
          ${criarAsa('inferior', 'direita')}
          <path class="corpo" d="M60 38C57.6 43 58.2 50 59 57L60 66 61 57C61.8 50 62.4 43 60 38Z" />
          <circle class="cabeca" cx="60" cy="37" r="2.1" />
          <path class="antena" d="M59 38C55 25 49 13 43 8M61 38C65 25 71 13 77 8" />
          <circle class="ponta-antena" cx="43" cy="8" r="1.1" />
          <circle class="ponta-antena" cx="77" cy="8" r="1.1" />
        </svg>
      </div>
    `;
        ceu.appendChild(borboleta);
        if (this.prefereReducaoMovimento) {
            setTimeout(() => borboleta.remove(), 500);
            return;
        }
        const suavizar = (valor) => valor * valor * (3 - (2 * valor));
        const pontoFinalX = config.destinoX * 1.35;
        const pontoFinalY = config.destinoY * 1.35;
        const controle1X = (pontoFinalX * 0.24) + config.oscilacaoX;
        const controle1Y = (pontoFinalY * 0.22) + config.oscilacaoY;
        const controle2X = (pontoFinalX * 0.76) - (config.oscilacaoX * 0.5);
        const controle2Y = (pontoFinalY * 0.78) - (config.oscilacaoY * 0.5);
        const quadros = Array.from({ length: 17 }, (_, indice) => {
            const progresso = indice / 16;
            const progressoCurva = (1 - Math.exp(-7 * progresso)) / (1 - Math.exp(-7));
            const inverso = 1 - progressoCurva;
            const curva = (inicio, controle1, controle2, fim) => (inverso ** 3 * inicio)
                + (3 * inverso ** 2 * progressoCurva * controle1)
                + (3 * inverso * progressoCurva ** 2 * controle2)
                + (progressoCurva ** 3 * fim);
            const envelopeOscilacao = Math.sin(Math.PI * progresso);
            const fase = (progresso * Math.PI * 2) + config.faseVoo;
            const deslocamentoX = curva(0, controle1X, controle2X, pontoFinalX)
                + (Math.sin(fase) * config.oscilacaoX * 0.18 * envelopeOscilacao);
            const deslocamentoY = curva(0, controle1Y, controle2Y, pontoFinalY)
                + (Math.sin(fase * 0.82) * config.oscilacaoY * 0.18 * envelopeOscilacao);
            const aparicao = suavizar(Math.min(progresso / 0.08, 1));
            const desaparecimento = suavizar(Math.max((progresso - 0.82) / 0.18, 0));
            const escala = progresso < 0.08
                ? 0.2 + (0.6 * suavizar(progresso / 0.08))
                : 0.8 + (0.28 * suavizar(progresso));
            const rotacao = config.rotacao * suavizar(progresso);
            return {
                offset: progresso,
                opacity: aparicao * (1 - desaparecimento),
                transform: `translate(calc(-50% + ${deslocamentoX}px), calc(-50% + ${deslocamentoY}px)) scale(${escala}) rotate(${rotacao}deg)`
            };
        });
        const animacao = borboleta.animate(quadros, {
            duration: config.duracao,
            delay: config.delay,
            easing: 'linear',
            fill: 'forwards'
        });
        animacao.onfinish = () => borboleta.remove();
    }
    soltarBorboletas() {
        const quantidade = this.prefereReducaoMovimento ? 4 : 64;
        for (let i = 0; i < quantidade; i++) {
            const config = this.gerarConfigBorboleta(i, quantidade);
            this.criarBorboleta(config);
        }
    }
    abrirConvite() {
        const envelope = this.envelope;
        const abertura = this.telaAbertura;
        const resultado = this.telaResultado;
        if (this.estaAnimando || !envelope || !abertura || !resultado)
            return;
        this.estaAnimando = true;
        envelope.classList.add('abrindo');
        setTimeout(() => {
            this.soltarBorboletas();
        }, 250);
        const tempoEspera = this.prefereReducaoMovimento ? 100 : 1200;
        if (!this.prefereReducaoMovimento) {
            setTimeout(() => this.dispersarBorboletas(), tempoEspera - 450);
        }
        setTimeout(() => {
            abertura.hidden = true;
            resultado.hidden = false;
            this.estaAnimando = false;
        }, tempoEspera);
    }
    dispersarBorboletas() {
        const borboletas = this.ceuBorboletas?.querySelectorAll('.borboleta');
        if (!borboletas?.length)
            return;
        borboletas.forEach((borboleta, index) => {
            const opacidade = getComputedStyle(borboleta).opacity;
            const atraso = (index / borboletas.length) * 100;
            const dispersao = borboleta.animate([
                { opacity: opacidade },
                { opacity: 0 }
            ], {
                duration: 350,
                delay: atraso,
                easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
                fill: 'forwards'
            });
            dispersao.onfinish = () => borboleta.remove();
        });
    }
    reiniciarAnimacao() {
        const envelope = this.envelope;
        const abertura = this.telaAbertura;
        const resultado = this.telaResultado;
        if (this.estaAnimando || !envelope || !abertura || !resultado)
            return;
        if (this.ceuBorboletas) {
            this.ceuBorboletas.innerHTML = '';
        }
        envelope.classList.remove('abrindo');
        resultado.hidden = true;
        abertura.hidden = false;
    }
}
// Inicializa a aplicação ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    new ConviteApp();
});
//# sourceMappingURL=script.js.map