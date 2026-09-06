# Site — Marcelo Carvalho, Engenheiro Civil

Site institucional estático (HTML/CSS/JS puro, sem build) com portfólio das obras no Recreio dos Bandeirantes e contato via WhatsApp.

## Como personalizar

Edite `assets/js/main.js`:

- `WHATSAPP_NUMBER`: número real no formato `55` + DDD + número, só dígitos (ex: `5521987654321`).
- `WHATSAPP_MESSAGE`: mensagem padrão que abre no WhatsApp.
- `DISPLAY_PHONE`: como o telefone aparece escrito na seção de contato.
- `OBRAS`: lista de endereços do portfólio (endereço + status `done`/`progress`).

## Mapa e fotos reais das obras

O site geocodifica os endereços do portfólio no navegador (Nominatim/OpenStreetMap) para:

1. Plotar cada obra num mapa interativo com zoom (seção "Mapa").
2. Mostrar a fachada real de cada endereço via Google Street View nos cards do portfólio.

Por padrão, a foto do Street View aparece como um **iframe incorporado** (funciona sem nenhuma configuração extra). Se quiser um **print estático real** (imagem `.jpg`, carrega mais rápido, fica mais parecido com uma foto de verdade):

1. Acesse [console.cloud.google.com](https://console.cloud.google.com), crie um projeto (é grátis).
2. Em **APIs e Serviços → Biblioteca**, ative a **Street View Static API**.
3. Em **Credenciais**, crie uma chave de API.
4. (Recomendado) Restrinja a chave por domínio, para que só o seu site possa usá-la.
5. Cole a chave em `assets/js/main.js`, na constante `GOOGLE_STREETVIEW_API_KEY`.

Assim que a chave for adicionada, os cards passam a usar o print estático automaticamente — não precisa mexer em mais nada.

Se algum endereço não tiver cobertura do Street View, ou enquanto a localização ainda está sendo carregada, o card mostra a ilustração de blueprint como reserva.

### Fotos profissionais (opcional)

Se no futuro vocês tirarem fotos profissionais das obras, é possível usá-las no lugar do Street View:

1. Coloque as imagens em `assets/img/obras/` (ex: `obra-01.jpg`).
2. Em `assets/js/main.js`, na função `renderPortfolio`, troque o SVG por uma tag `<img src="assets/img/obras/obra-XX.jpg" alt="...">` dentro de `.card-visual`.

## Como visualizar localmente

Basta abrir `index.html` no navegador, ou rodar um servidor simples:

```bash
python3 -m http.server 8080
```

e acessar `http://localhost:8080`.
