# Missão final — Grupo __

**Integrantes:**

| Fase | Responsáveis (pelo menos 2 fases por pessoa) |
| --- | --- |
| 1. Planejar | |
| 2. Caçar | |
| 3. Abrir o código | |
| 4. Automatizar | |
| 5. Relatar | |

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
| # | | | |

## Fase 3 — Correções (caixa branca)

| Issue | Função e linha errada | Causa | Correção | Commit |
| --- | --- | --- | --- | --- |
| # | | | | `fix: … closes #` |

Defeitos encontrados **só lendo o código** (abram Issue para eles também):

## Fase 4 — Testes automatizados

`testes/testes.html` antes das correções: ___ de ___ · depois: ___ de ___

| Teste | Regra | Defeito que ele prova (ou regressão) |
| --- | --- | --- |
| | | |

## Fase 5 — Relatório final

| Métrica | Valor |
| --- | --- |
| Casos planejados / executados | |
| Passando antes das correções | |
| Passando depois das correções (reteste) | |
| Defeitos encontrados / corrigidos / abertos | |
| Testes automatizados passando | |

**Defeitos por severidade:** crítica __ · alta __ · média __ · baixa __

**Critério de saída** (nenhum defeito crítico ou alto aberto e todos os testes automatizados passando): atendido? Por quê?

**Recomendação:** o EstacionaAí pode entrar em produção?

**O que a missão mostrou que aprendemos na UC11:**
