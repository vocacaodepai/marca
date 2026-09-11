# Site — Marcelo Carvalho, Engenheiro Civil

Site institucional estático (HTML/CSS/JS puro, sem build) com portfólio das obras no Recreio dos Bandeirantes e contato via WhatsApp.

## Como personalizar

Edite `assets/js/main.js`:

- `WHATSAPP_NUMBER`: número real no formato `55` + DDD + número, só dígitos (ex: `5521987654321`).
- `WHATSAPP_MESSAGE`: mensagem padrão que abre no WhatsApp.
- `DISPLAY_PHONE`: como o telefone aparece escrito na seção de contato.
- `OBRAS`: lista das obras do portfólio — endereço, status (`done`/`progress`), coordenadas (`lat`/`lng`) e caminho da foto (`foto`).

## Mapa e fotos reais das obras

Cada obra já vem com **coordenadas exatas** (geocodificadas uma única vez com a Google Geocoding API, a maioria com precisão "ROOFTOP") e uma **foto real da fachada** baixada da Google Street View Static API e salva localmente em `assets/img/obras/`. Isso é usado para:

1. Plotar cada obra num mapa interativo com zoom (seção "Mapa", via Leaflet + OpenStreetMap).
2. Mostrar a foto real de cada endereço nos cards do portfólio.

Como os dados já estão prontos no código, o site carrega instantaneamente — não depende de nenhuma chamada externa em tempo real, e nenhuma chave de API fica exposta no site publicado.

Uma obra (`Rua Joaquim da Silveira, 265`) não tem `foto` (fica `null`) porque não há cobertura oficial do Google Street View bem naquele ponto — o card usa a ilustração de blueprint como reserva automaticamente. O mesmo acontece com qualquer obra futura sem foto.

### Gerando fotos novas (se adicionar mais obras)

Se adicionar novas obras à lista, para gerar a foto e as coordenadas:

1. Crie uma chave gratuita no [Google Cloud Console](https://console.cloud.google.com) com **Geocoding API** e **Street View Static API** ativadas (sem restrição de referenciador, senão a Geocoding API recusa chamadas de servidor).
2. Geocodifique o endereço: `https://maps.googleapis.com/maps/api/geocode/json?address=SEU_ENDERECO&key=SUA_CHAVE` → pegue `lat`/`lng` do resultado.
3. Confirme que existe cobertura oficial (`"copyright":"© Google"`, não de um contribuidor) em: `https://maps.googleapis.com/maps/api/streetview/metadata?location=LAT,LNG&radius=50&source=outdoor&key=SUA_CHAVE`
4. Baixe a foto: `https://maps.googleapis.com/maps/api/streetview?size=640x480&location=LAT,LNG&fov=60&pitch=15&source=outdoor&key=SUA_CHAVE` → salve em `assets/img/obras/obra-XX.jpg`.
5. Adicione a entrada em `OBRAS` com `lat`, `lng` e `foto`.

### Fotos profissionais (opcional)

Se no futuro vocês tirarem fotos profissionais das obras, é só substituir o arquivo em `assets/img/obras/obra-XX.jpg` pela foto nova (mesmo nome, mesmo lugar) — não precisa mexer no código.

## Como visualizar localmente

Basta abrir `index.html` no navegador, ou rodar um servidor simples:

```bash
python3 -m http.server 8080
```

e acessar `http://localhost:8080`.
