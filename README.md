# JSExpert

&lt;Semana/> JS expert - https://youtu.be/zAEu5Smx5h4
https://javascriptexpert.com.br/lc_jse_jan21?utm_source=outros_org&utm_campaign=lc_jse_jan21 (https://bit.ly/js-expert-week02-wa)
Github: https://github.com/ErickWendel/jsexpert02-skeleton-ew

---

Dia 25/01/2021
#1 - Estruturando o seu projeto Zoom:
3 Design Patterns que você precisa conhecer -
#SemanaJSExpert

---

npm ci --silent
npm start
https://giphy.com/gifs/espn-football-alabama-nationalchampionship-SLv4ETnzGZRWi3hyaN/links
https://media.giphy.com/media/SLv4ETnzGZRWi3hyaN/giphy.mp4

npm install -g live-server (outra opção para subir o projeto)
live-server

mkdir server
pm init -y
npm i socket.io@3.0.5
npm i -D nodemon
touch index.js
npm start
npm run dev
================================================================================

Dia 26/01/2021
#2 - Comunicação em tempo real:
WebRTC, Peer Server e Eventos Personalizados
#SemanaJSExpert

---

WebRTC = Web Real-Time Communication
Peer-to-Peer ou P2P
Signaling = coordenação da comunicação.
Interactive Connectivity Establishment ou ICE --> Rota mais curta de comunicação entre os clientes.
ICE Framework = Server Publico do Google.
STUN Server = descobrir o endereço necessário para conexão.
TURN Relay Server = garantir o tráfefo de mensagens e streams como contigência.

Biblioteca "PeerJS"

rm -rf node_modules

npm init -y

npm i peer@0.6.1
https://www.npmjs.com/package/peer
Na instalação estava dando erro no mac, resolvi com seguinte comando "npm cache clean --force"

npm run dev

================================================================================

Dia 27/01/2021
#3 - O poder do Media Recorder
Gravação de grupos de vídeo conferencias
#SemanaJSExpert

---

rm -rf \*\*/node_modules
public = npm start
server = npm start
peer-s = npm run dev

================================================================================

Dia 28/01/2021
#4 - Binary Objects na Web_ 
Fazendo Download de gravações e publicação na Web
#SemanaJSExpert

criar a conta no heroku
https://www.heroku.com

instalar heroku
npm i -g heroku

comandos:
heroku login (Pw:13****H**@)
*No plano free pode temos ter até 5 aplicação.
git init
heroku apps:create
Os atalhos são com "Zsh" https://ohmyz.sh/
git status ou gst
git add . ou ga .
git status ou gst
git commit -m "message" ou gcsm "message" => git commit -m "all"
git push heroku master
O heroku cria as URL 
https://secure-sea-97795.herokuapp.com => Incluir no APP.
heroku log


Subir o server -> serviço socket-io.
git init
git status
heroku apps:create
git status 
git add .
git status
git commit -m "all"
git push . ou gp
git push heroku master
O heroku cria a URL 
https://secret-savannah-53407.herokuapp.com/ => Incluir no APP.
heroku log

Subir a public -> App do client.
git init
git status
git add .
heroku apps:create zoom-clone-jsr
git status
git commit -m "all"
git push heroku master
https://zoom-clone-jsr.herokuapp.com/

Fazer alterações.
git status
git add .
git commit -m "all"
git push heroku master

Para deletar
heroku apps:delete

depois é só informar o nome das aplicações.

rm -rf .git

https://erickwendel.com.br/posts/1

Modulos: 
01 - Dinamica
02 - Javascript Testing
03 - Conceitos fundamentais
04 - Sobre o ciclo de vida do Javascript
05 - Advanced Javascript Data Types
06 - Expressões Regulares - RegExp - Fluent API
07 - Design Patterns
08 - Node Package Manager - NPM
09 - Node Comand Line Interface - CLI
10 - Node.js Streams
11 - Logging e Error Handling
12 - Performance de apps
13 - Node.js Long-running processes
14 - Javascript Web Protocols
15 - Javascript Security

---


================================================================================