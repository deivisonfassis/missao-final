// EstacionaAí — testes automatizados
//
// Cada teste segue o padrão: preparar → agir → verificar.
//   teste('o que o teste confere', () => {
//     const minutos = 60;                                              // preparar
//     const valor = calcularValor('ABC1D23', minutos, 'carro', false); // agir
//     return igual(valor, 8);                                          // verificar (esperado do REQUISITO)
//   });
//
// Funções disponíveis (app/js/regras.js):
//   validarPlaca(placa)                              → true ou false
//   lerHorario('08:30')                               → minutos desde 00:00 (ou null)
//   calcularPermanencia('08:00', '09:30')            → minutos
//   calcularValor(placa, minutos, tipo, mensalista)  → valor em reais (tipo: 'carro' ou 'moto')
//
// Os 3 testes abaixo são exemplos. Escrevam os de vocês embaixo deles.

// EstacionaAí — testes das issues #1 a #4 (regras.js)
// Usa as funções globais teste() e igual(), fornecidas pelo executor (executar.js).

// ---------- Issue #1 — RN03: 15 minutos não deve cobrar ----------
teste('RN03 — 15 minutos não paga (08:00 às 08:15)', () => {
  return igual(calcularValor('ABC-1234', calcularPermanencia('08:00', '08:15'), 'carro', false), 0);
});
teste('RN03 — 16 minutos paga R$ 8,00', () => {
  return igual(calcularValor('ABC-1234', 16, 'carro', false), 8);
});

// ---------- Issue #2 — RN04: hora excedente deve ser cobrada ----------
teste('RN04 — carro por 1h00 paga R$ 8,00', () => {
  return igual(calcularValor('ABC-1234', 60, 'carro', false), 8);
});
teste('RN04 — carro por 1h01 paga R$ 11,00 (08:00 às 09:01)', () => {
  return igual(calcularValor('ABC-1234', calcularPermanencia('08:00', '09:01'), 'carro', false), 11);
});
teste('RN04 — carro por 2h00 paga R$ 11,00', () => {
  return igual(calcularValor('ABC-1234', 120, 'carro', false), 11);
});
teste('RN04 — carro por 2h01 paga R$ 14,00', () => {
  return igual(calcularValor('ABC-1234', 121, 'carro', false), 14);
});

// ---------- Issue #3 — RN07: moto não pode passar de R$ 20,00 ----------
teste('RN07 — moto por 12h00 paga R$ 20,00 (08:00 às 20:00)', () => {
  return igual(calcularValor('ABC-1234', calcularPermanencia('08:00', '20:00'), 'moto', false), 20);
});
teste('RN07 — carro por 12h00 paga R$ 40,00 (teto)', () => {
  return igual(calcularValor('ABC-1234', calcularPermanencia('08:00', '20:00'), 'carro', false), 40);
});

// ---------- Issue #4 — RN08: entrada maior que a saída (virada de dia) ----------
teste('RN08 — 22:00 às 07:00 dá 540 minutos', () => {
  return igual(calcularPermanencia('22:00', '07:00'), 540);
});
teste('RN08 — permanência de 22:00 às 07:00 aparece como 9h00', () => {
  return igual(formatarPermanencia(calcularPermanencia('22:00', '07:00')), '9h00');
});
teste('RN08 — carro de 22:00 às 07:00 paga R$ 32,00', () => {
  return igual(calcularValor('ABC-1234', calcularPermanencia('22:00', '07:00'), 'carro', false), 32);
});

// ===== Testes do grupo (um por defeito corrigido, e outros de regressão) =====

