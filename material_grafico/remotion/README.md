# Demonstrações animadas — Remotion

Vídeos verticais que simulam o uso do Gestor de Pátio e Catálogo por vendedor, gerente e cliente. A direção visual parte dos arquivos `WhatsApp Image*.jpeg`: interface demonstrada na parte superior, explicação forte na parte inferior e progressão de Story.

## Composições

- `Vendedor` — jornada de 30 segundos: cadastro por placa, atualização dos canais e veículo encontrado pelo atendimento público.
- `Gerente` — consulta textual de ranking e resumo de vendas por vendedor.
- `Cliente` — jornada de 18 segundos: conversa textual, continuidade pelo contexto e envio do vídeo do veículo pelo assistente.
- `MaterialVideo` — jornada de 30 segundos: pedido no grupo, confirmação do assistente e demonstração de um anúncio vertical com a identidade do Gestor de Pátio e Catálogo.
- `SerieCompleta` — sequência com as três jornadas.

Todos os vídeos têm 1080 × 1920 px, 30 fps e não usam pessoas, mãos, silhuetas ou a palavra “lead”.

As respostas simuladas seguem os formatos reais definidos nos workflows do Gestor de Pátio e na especificação do Catálogo Vivo. O assistente responde dentro da conversa, em texto, como uma pessoa responderia; não são exibidos painéis ou cartões inventados como resposta do bot.

## Comandos

```bash
npm install
npm run studio
npm run render:all
```

Os arquivos renderizados são gravados em `output/`.

## Renderização em Docker

O `Dockerfile` segue a base Debian e as dependências de Chrome recomendadas pela documentação do Remotion.

```bash
docker build -t gestor-patio-remotion .
docker run --rm -v "$PWD/output:/app/output" gestor-patio-remotion
```
