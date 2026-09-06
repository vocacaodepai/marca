# Site — Marcelo Carvalho, Engenheiro Civil

Site institucional estático (HTML/CSS/JS puro, sem build) com portfólio das obras no Recreio dos Bandeirantes e contato via WhatsApp.

## Como personalizar

Edite `assets/js/main.js`:

- `WHATSAPP_NUMBER`: número real no formato `55` + DDD + número, só dígitos (ex: `5521987654321`).
- `WHATSAPP_MESSAGE`: mensagem padrão que abre no WhatsApp.
- `DISPLAY_PHONE`: como o telefone aparece escrito na seção de contato.
- `OBRAS`: lista de endereços do portfólio (endereço + status `done`/`progress`).

## Fotos das obras

Os cards do portfólio usam ilustrações vetoriais (estilo planta/blueprint) como placeholder, já que ainda não há fotos reais.
Para usar fotos reais:

1. Coloque as imagens em `assets/img/obras/` (ex: `obra-01.jpg`).
2. Em `assets/js/main.js`, na função `renderPortfolio`, troque o SVG por uma tag `<img src="assets/img/obras/obra-XX.jpg" alt="...">` dentro de `.card-visual`.

## Como visualizar localmente

Basta abrir `index.html` no navegador, ou rodar um servidor simples:

```bash
python3 -m http.server 8080
```

e acessar `http://localhost:8080`.
