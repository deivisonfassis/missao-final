# Missão final — Grupo __

**Integrantes:**

| Fase | Responsáveis (pelo menos 2 fases por pessoa) |
| --- | --- |
| 1. Planejar | Kayo e Kauan |
| 2. Caçar | Pedro |
| 3. Abrir o código | Deivison |
| 4. Automatizar | Deivison |
| 5. Relatar | Deivison |

---

## Fase 1 — Plano de teste

**Escopo:** o que vamos testar e o que fica de fora.

**Ambiente:** navegador e versão, sistema operacional.

**Riscos:** as 3 regras que mais podem dar prejuízo ao estacionamento, e por quê.

1. RN02. porquer pode ser colocado horarios apos o expediente
2. RN06. Como s comprovar se o cliente é mensalista 
3. RN07. como identificar se o veiculo é moto ou carro

**Casos de teste** (8 ou mais; pelo menos 3 de valor limite). Técnicas: VL valor limite · PE partição de equivalência · FL fluxo.

| ID | Regra | Técnica | Entrada (valores exatos) | Esperado (do requisito) | Obtido | Status | Issue |
| :- | :---- | :------ | :----------------------- | :---------------------- | :----- | :----- | :---- |
| CT01 | RN01 – Placa | Particionamento de equivalência | Placa: `ABC-1234` | Placa aceita (padrão antigo). | Não executado | Pendente | — |
| CT02 | RN02 – Horários | Análise de valor limite | Entrada: `08:00` / Saída: `08:00` | Operação recusada com mensagem, pois saída igual à entrada não é permitida. | Não executado | Pendente | — |
| CT03 | RN03 – Tolerância | Análise de valor limite | Entrada: `08:00` / Saída: `08:15` / Veículo: Carro | Valor a pagar: R$ 0,00, pois a permanência é de exatamente 15 minutos. | Não executado | Pendente | — |
| CT04 | RN04 – Tarifa do carro | Análise de valor limite | Entrada: `08:00` / Saída: `09:01` / Veículo: Carro | Valor a pagar: R$ 11,00, pois ultrapassou uma hora e iniciou a hora adicional. | Não executado | Pendente | — |
| CT05 | RN05 – Teto | Teste baseado em casos de uso | Entrada: `06:00` / Saída: `18:00` / Veículo: Carro | Valor a pagar: R$ 40,00, respeitando o teto máximo. | Não executado | Pendente | — |
| CT06 | RN06 – Mensalista | Tabela de decisão | Entrada: `08:00` / Saída: `12:00` / Veículo: Carro / Cliente: Mensalista | Valor a pagar: R$ 0,00, independentemente do tempo de permanência. | Não executado | Pendente | — |
| CT07 | RN07 – Moto | Tabela de decisão | Entrada: `08:00` / Saída: `20:00` / Veículo: Moto / Cliente: Avulso | Carro equivalente: R$ 40,00 (após teto). Moto: R$ 20,00. | Não executado | Pendente | — |
| CT08 | RN08 – Pernoite | Particionamento de equivalência | Entrada: `22:00` / Saída: `07:00` / Veículo: Carro | Permanência: 9 horas. Valor a pagar: R$ 32,00. | Não executado | Pendente | — |

## Fase 2 — Defeitos encontrados (caixa preta)

Um defeito por Issue. Anotem aqui o número de cada uma.

| Issue | Regra | Resumo | Severidade |
| --- | --- | --- | --- |
| # | RN03 | Cobrança de 8 Reais permanecia minima | Media |
| # | RN04 | Não e cobrado o valor da hora exedente | Media |
| # | RN07 | Acrecimo de R$0,50 a valor quando escolhe moto | Media |
| # | RN08 | Cobrança de 8 Reais permanecia minima | Alta |

## Fase 3 — Correções (caixa branca)

| Issue | Função e linha errada | Causa | Correção | Commit |
| --- | --- | --- | --- | --- |
| #1 — RN03: 15 min cobrava R$ 8,00 | `tarifaBase`, linha 38: `if (minutos < TOLERANCIA_MIN) return 0;` | A tolerância usava `<`. Com exatamente 15 min, `15 < 15` é falso e a tarifa mínima era cobrada. | Trocar `<` por `<=`: `if (minutos <= TOLERANCIA_MIN) return 0;` | `fix: tolerancia de 15 min inclusive (RN03) #1` |
| #2 — RN04: hora excedente não cobrada | `tarifaBase`, linha 41: `valor += Math.floor((minutos - 60) / 60) * HORA_ADICIONAL;` | `Math.floor` só contava horas completas após a primeira. Com 61 min, `floor(1/60)` dava 0 e ficava R$ 8,00 em vez de R$ 11,00. | Trocar `Math.floor` por `Math.ceil`, para cobrar a hora iniciada inteira. | `fix: cobra hora adicional iniciada (RN04) #2` |
| #3 — RN07: moto de 12h pagava R$ 20,50 | `calcularValor`, linhas 51 e 52: desconto da moto (`valor * 0.5`) antes do teto (`Math.min(valor, TETO)`) | A tarifa de R$ 41,00 virava R$ 20,50 com o desconto e só depois ia ao teto, que não atuava porque 20,50 já estava abaixo de R$ 40,00. | Aplicar o teto primeiro e o desconto depois: `let valor = Math.min(tarifaBase(minutos), TETO);` seguido de `if (tipo === 'moto') valor = valor * 0.5;` | `fix: aplica teto antes do desconto da moto (RN07) #3` |
| #4 — RN08: 22:00 às 07:00 dava -15h00 e R$ 0,00 | `calcularPermanencia`, linha 33: `return s - e;` | Só fazia `saída - entrada`. Com saída menor que a entrada o resultado era negativo (-900 min) e a tolerância zerava a cobrança. | Somar 24h quando a saída é menor: `if (s < e) return s + 24 * 60 - e;` antes do `return s - e;` | `fix: considera virada de dia na permanencia (RN08) #4` |

Defeitos encontrados **só lendo o código** (abram Issue para eles também):

## Fase 4 — Testes automatizados

`testes/testes.html` antes das correções: 0 de 11 · depois: 11 de 11

| Teste | Regra | Defeito que ele prova (ou regressão) |
| --- | --- | --- |
| | | |

## Fase 5 — Relatório final

| Métrica | Valor |
| --- | --- |
| Casos planejados / executados | 8 |
| Passando antes das correções | 8 |
| Passando depois das correções (reteste) | 6 |
| Defeitos encontrados / corrigidos / abertos | 4 |
| Testes automatizados passando | 11 |

**Defeitos por severidade:** crítica __ · alta 1 · média 3 · baixa __

**Critério de saída** (nenhum defeito crítico ou alto aberto e todos os testes automatizados passando): atendido? Por quê?

**Recomendação:** o EstacionaAí pode entrar em produção?

**O que a missão mostrou que aprendemos na UC11:**
