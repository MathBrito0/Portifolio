# 🛡️ Cybersecurity Portfolio & SOC Dashboard

<div align="center">
  <p><b>Portfólio interativo de Cibersegurança focado em Blue Team, Análise de SOC e Desenvolvimento Seguro.</b></p>
  
  <p>
    <a href="#-tecnologias">Tecnologias</a> •
    <a href="#-recursos-principais">Recursos</a> •
    <a href="#-estrutura-do-projeto">Estrutura</a> •
    <a href="#-acesso">Acesso ao Projeto</a>
  </p>
</div>

---

## 🎯 Sobre o Projeto

Este repositório hospeda o meu portfólio profissional de desenvolvimento e segurança da informação. O design foi construído com uma identidade visual inspirada em terminais de comandos e ambientes de operações de segurança (SOC), destacando competências analíticas defensivas com um toque interativo de simulação ofensiva.

---

## 🛠️ Tecnologias

O projeto foi desenvolvido de forma nativa, priorizando performance, leveza e controle total sobre o código:

* **HTML5 / CSS3:** Estruturação semântica, variáveis customizadas, design responsivo e efeitos visuais customizados (animações de glitch, scanlines e temas dinâmicos).
* **JavaScript (Vanilla):** Lógica interativa de internacionalização (PT/EN), animação de digitação de terminal (*typewriter effect*), controle de modais de segurança e gerenciamento de estado via `localStorage`.

---

## 🚀 Recursos Principais

* **🌐 Sistema Multilíngue (PT / EN):** Alternância instantânea de idioma em toda a interface e elementos dinâmicos, com persistência da preferência do usuário.
* **💻 Terminal Hero interativo:** Simulação de inicialização de sessão de comando com efeito de digitação letra por letra.
* **🛡️🕹️ Modo Purple Team Interativo:** 
  * Interface padrão focada no **Blue Team** e projetos em **Rust**.
  * Modal de aviso de operação crítica que permite ao operador executar um payload de simulação (*Red Team*).
  * Animação de alerta visual, glitch de sistema e redirecionamento de portfólio para exibição de ferramentas ofensivas/reconhecimento.
  * Botão de restauração de defesas com animação de varredura (*scan*) para retornar ao estado Blue Team.

---

## 📂 Estrutura do Projeto

```text
/
├── index.html          # Estrutura principal da página e modais
├── css/
│   └── style.css       # Estilos, variáveis globais e animações visuais
└── js/
    └── main.js         # Lógica de tradução, efeitos e eventos de segurança
