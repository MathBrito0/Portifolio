function setLanguage(lang) {
    localStorage.setItem('preferred-lang', lang);

    // 1. Atualiza os textos normais do site (data-lang)
    const elements = document.querySelectorAll('[data-lang-pt]');
    elements.forEach(el => {
        if (lang === 'en') {
            el.textContent = el.getAttribute('data-lang-en');
        } else {
            el.textContent = el.getAttribute('data-lang-pt');
        }
    });

    // 2. Reinicia o efeito de digitação do terminal no idioma correto
    executarEfeitoDigitacao(lang);

    // 3. Atualiza a classe ativa dos botões na barra de status
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${lang}`).classList.add('active');
}

// Ao carregar a página, verifica se já havia um idioma salvo
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-lang') || 'pt';
    setLanguage(savedLang);
});
    
// 2. EFEITO DIGITAÇÃO NO TERMINAL (MULTILÍNGUE)
const textosTerminal = {
    pt: "> Inicializando Sessão...\n> Autenticando Usuário: Matheus_Brito\n> Cargo: Estudante de Cibersegurança (Visando Blue Team)\n> Status: Pronto para operar_",
    en: "> Initializing Session...\n> Authenticating User: Matheus_Brito\n> Role: Cybersecurity Student (Focusing on Blue Team)\n> Status: Ready to operate_"
};

let intervaloDigitacao = null;

function executarEfeitoDigitacao(idioma) {
    const elementoTerminal = document.getElementById("terminalIntro");
    if (!elementoTerminal) return;

    const textoSelecionado = textosTerminal[idioma] || textosTerminal['pt'];
    let posicaoAtual = 0;
    
    clearInterval(intervaloDigitacao);
    elementoTerminal.textContent = "";

    intervaloDigitacao = setInterval(() => {
        if (posicaoAtual < textoSelecionado.length) {
            elementoTerminal.textContent = textoSelecionado.substring(0, posicaoAtual + 1);
            posicaoAtual++;
        } else {
            clearInterval(intervaloDigitacao);
        }
    }, 25);
} 

// 3. MENU MOBILE
var botaoMenu = document.getElementById("navToggle");
var linksMenu = document.getElementById("navLinks");
 
botaoMenu.addEventListener("click", function () {
  var menuAberto = linksMenu.classList.toggle("open");
  botaoMenu.setAttribute("aria-expanded", menuAberto);
  botaoMenu.setAttribute("aria-label", menuAberto ? "Fechar menu" : "Abrir menu");
});

document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    linksMenu.classList.remove('open');
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  });
});

// 4. ANIMAÇÕES DE SCROLL
function initObservers() {
  var observerReveal = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function(el) {
    observerReveal.observe(el);
  });

  var observerSkills = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(function(fill) {
          fill.style.width = fill.getAttribute('data-width');
        });
      }
    });
  }, { threshold: 0.3 });

  var skillsSection = document.getElementById('skills');
  if (skillsSection) {
    observerSkills.observe(skillsSection);
  }
}

document.addEventListener("DOMContentLoaded", initObservers);

// 5. FUNDO INTERATIVO DE REDE / PARTÍCULAS
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const particles = [];
const particleCount = Math.floor((width * height) / 14000);

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 1.5 + 1
  });
}

let mouse = { x: null, y: null, radius: 130 };
window.addEventListener('mousemove', function(e) { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mouseleave', function() { mouse.x = null; mouse.y = null; });

function animateCanvas() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.x += p.vx; p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(79, 168, 216, 0.4)';
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dx = p.x - p2.x; let dy = p.y - p2.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = 'rgba(79, 168, 216, ' + (0.15 * (1 - dist / 100)) + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    if (mouse.x !== null) {
      let mdx = p.x - mouse.x; let mdy = p.y - mouse.y;
      let mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      if (mdist < mouse.radius) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(127, 209, 255, ' + (0.35 * (1 - mdist / mouse.radius)) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateCanvas);
}
animateCanvas();

// 6. LÓGICA DE INJEÇÃO (RED TEAM) E RESTAURAÇÃO (BLUE TEAM) - MULTILÍNGUE
const btnRedTeam = document.getElementById('btnRedTeam');
const redTeamText = document.getElementById('redTeamText');
const purpleContent = document.getElementById('purpleContent');
const warningModal = document.getElementById('warningModal');
const btnConfirm = document.getElementById('btnConfirm');
const btnCancel = document.getElementById('btnCancel');
const btnRestoreBlue = document.getElementById('btnRestoreBlue');

const blueProjects = document.getElementById('blueProjects');
const redProjects = document.getElementById('redProjects');
const projetosTitle = document.getElementById('projetosTitle');
const symbolBlue = document.querySelector('.symbol-blue');
const symbolRed = document.querySelector('.symbol-red');
const shieldBg = document.querySelector('.shield-bg');

function getCurrentLanguage() {
    return localStorage.getItem('preferred-lang') || 'pt';
}

if (btnRedTeam) {
  // Abre aviso
  btnRedTeam.addEventListener('click', function() {
    warningModal.style.display = 'flex';
  });

  // Aborta injeção
  if (btnCancel) {
    btnCancel.addEventListener('click', function() {
      const lang = getCurrentLanguage();
      warningModal.style.display = 'none';
      
      btnRedTeam.textContent = (lang === 'en') ? "> Operation cancelled by operator." : "> Operação cancelada pelo operador.";
      setTimeout(() => { 
        btnRedTeam.textContent = (lang === 'en') ? "> ./inject_payload.sh" : "> ./injetar_payload.sh"; 
      }, 2500);
    });
  }

  // Confirma Injeção -> Transição para Purple Mode
  if (btnConfirm) {
    btnConfirm.addEventListener('click', function() {
      warningModal.style.display = 'none';
      btnRedTeam.style.pointerEvents = 'none';
      
      // >>> ESTA LINHA SERVE PARA SUBIR AO TOPO SUAVEMENTE <<<
      window.scrollTo({ top: 0, behavior: 'smooth' });

      const lang = localStorage.getItem('preferred-lang') || 'pt';
      btnRedTeam.textContent = (lang === 'en') ? "injecting_payload..." : "injetando_payload...";
      
      document.body.classList.add('red-alert');
      shieldBg.classList.add('glitch-active');
      
      let glitchInterval = setInterval(() => {
        if (symbolBlue && symbolRed) {
          let blueIsHidden = symbolBlue.style.display === 'none';
          symbolBlue.style.display = blueIsHidden ? 'block' : 'none';
          symbolRed.style.display = blueIsHidden ? 'none' : 'block';
        }
      }, 90);

      setTimeout(function() {
        clearInterval(glitchInterval);
        shieldBg.classList.remove('glitch-active');
        
        if (symbolBlue && symbolRed) {
          symbolBlue.style.display = 'none';
          symbolRed.style.display = 'block';
        }
        
        document.body.classList.remove('red-alert');
        document.body.classList.add('purple-mode');
        
        if (blueProjects && redProjects) {
          blueProjects.style.display = 'none';
          redProjects.style.display = 'grid';
        }
        if (projetosTitle) {
          projetosTitle.textContent = '// projetos_red_team.exe';
        }

        btnRedTeam.style.display = 'none';
        redTeamText.style.display = 'none';
        purpleContent.style.display = 'block';
        purpleContent.style.opacity = '0';
        setTimeout(() => {
          purpleContent.style.transition = "opacity 1s ease";
          purpleContent.style.opacity = '1';
        }, 50);

        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
          navLogo.innerHTML = 'root@purpleteam<span class="cursor-blink">_</span>';
        }

      }, 3000);
    });
  }
}

// Retorno ao Blue Team (Scanner)
if (btnRestoreBlue) {
  btnRestoreBlue.addEventListener('click', function() {
    const lang = getCurrentLanguage();
    
    // Desativa botão durante o scan
    btnRestoreBlue.style.pointerEvents = 'none';
    btnRestoreBlue.textContent = (lang === 'en') ? "running_scan..." : "executando_varredura...";

    // Inicia a animação de scan na tela
    document.body.classList.add('scan-active');

    // Reverte o site assim que o scan varrer a página (1.8s)
    setTimeout(function() {
      document.body.classList.remove('purple-mode');
      document.body.classList.remove('scan-active');

      if (blueProjects && redProjects) {
        blueProjects.style.display = 'grid';
        redProjects.style.display = 'none';
      }
      if (projetosTitle) {
        projetosTitle.textContent = (lang === 'en') ? '// projects' : '// projetos';
      }

      purpleContent.style.display = 'none';
      btnRedTeam.style.display = 'inline-block';
      redTeamText.style.display = 'block';
      
      btnRedTeam.style.pointerEvents = 'auto';
      btnRedTeam.textContent = (lang === 'en') ? "> ./inject_payload.sh" : "> ./injetar_payload.sh";
      
      const navLogo = document.querySelector('.nav-logo');
      if (navLogo) {
        navLogo.innerHTML = 'root@blueteam<span class="cursor-blink">_</span>';
      }

      if (symbolBlue && symbolRed) {
        symbolBlue.style.display = 'block';
        symbolRed.style.display = 'none';
      }

      // Restaura o botão de retorno para uso futuro
      btnRestoreBlue.style.pointerEvents = 'auto';
      btnRestoreBlue.textContent = (lang === 'en') ? "> ./restore_defenses.sh" : "> ./restaurar_defesas.sh";
    }, 1800);
  });
}
