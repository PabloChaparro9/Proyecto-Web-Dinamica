const HostPort={
    HOST:'',
    PORT: 0,
  }
  async function getURL() {
    const response = await fetch('/config')
    const config = await response.json();
    HostPort.HOST = config.HOST;
    HostPort.PORT = config.PORT;
  }
  getURL()
  const formHTML = document.getElementById('loginForm');
      const formSectionHTML = document.getElementById('login');
      const cerrarSesionbtnHTML = document.getElementById('cerrarSesion');
      localStorage.removeItem('userId');
      function SwitchFormularios(){
        document.getElementById('registerForm').classList.toggle('Mostrar');
        document.getElementById('loginForm').classList.toggle('Ocultar');
        document.getElementById('btnRegistrar').classList.toggle('Ocultar');
      }
      formHTML.addEventListener('submit', async (event) => {
        event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch(`http://${HostPort.HOST}:${HostPort.PORT}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          formSectionHTML.classList.toggle('Ocultar')
          formHTML.classList.toggle('Ocultar')
          document.getElementById('btnRegistrar').classList.toggle('Ocultar');
          cerrarSesionbtnHTML.style.display='block'
          localStorage.setItem('userId', data.userId);
          cargarMelodias();
          document.getElementById('loginMensaje').innerText = 'Inicio de sesión exitoso';
        } else {
          document.getElementById('loginMensaje').innerText = data.message || 'Error al iniciar sesión';
        }
      } catch (err) {
        document.getElementById('loginMensaje').innerText = 'Error al conectar con el servidor';
      }
    });
    const registerFormHTML = document.getElementById('registerForm');
    registerFormHTML.addEventListener('submit',async (event)=>{
      event.preventDefault();
  
      const username = document.getElementById('registerUsername').value;
      const password = document.getElementById('registerPassword').value;
  
      try {
        const response = await fetch('http://192.168.0.7:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          username.value='';
          password.value='';
          document.getElementById('registerMessage').innerText = data.message;
        } else {
          document.getElementById('registerMessage').innerText = data.message || 'Error al registrar usuario';
        }
      } catch (err) {
        console.error('Error al conectar con el servidor:', err);
        document.getElementById('registerMessage').innerText = 'Error al conectar con el servidor';
      }
    })
    function cerrarSesion(){
      username.value = '';
      password.value = '';
      document.getElementById('btnRegistrar').classList.toggle('Ocultar');
      localStorage.removeItem('userId');
      document.getElementById('loginForm').classList.toggle('Ocultar');
      cerrarSesionbtnHTML.style.display='none';
      document.getElementById('loginMensaje').innerText = '';
      cargarMelodias();
      }
      const formSaveMelodyHTML = document.getElementById('guardarMelodiaForm');
      formSaveMelodyHTML.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
          document.getElementById('guardarMensaje').innerText = 'Inicia sesión para guardar melodías';
          return;
        }
  
        const nombre = document.getElementById('nombreMelodia').value;
        const notas = [
          userMelody.notas[0],
          userMelody.notas[1],
          userMelody.notas[2],
          userMelody.notas[3],
          userMelody.notas[4],
        ];
  
        try {
          const response = await fetch('http://192.168.0.7:3000/guardar-melodia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, nombre, notas }),
          });
  
  
          if (!response.ok) {
            const data = await response.json();
            document.getElementById('guardarMensaje').innerText = data.message || 'Error al guardar la melodía';
            return;
          }
  
          const data = await response.json();
  
          cargarMelodias();
          document.getElementById('guardarMensaje').innerText = 'Melodía guardada exitosamente';
        } catch (err) {
          document.getElementById('guardarMensaje').innerText = 'Error al conectar con el servidor';
        }
    });
  
    async function cargarMelodias() {
      const userId = localStorage.getItem('userId');
      const lista = document.getElementById('melodiasGuardadas');
      if (!userId) {
        lista.innerHTML=`<p>Inicia sesion para ver tus melodias</p>`
        return;
      }
      try {
        const response = await fetch(`http://192.168.0.7:3000/melodias/${userId}`);
        const melodias = await response.json();
        lista.innerHTML = '';
        
        melodias.forEach(melodia => {
          let melodiaGuardada = {
            notas: [
              melodia.nota1,
              melodia.nota2,
              melodia.nota3,
              melodia.nota4,
              melodia.nota5,
            ],
          };
  
          lista.innerHTML += `
            <li>${melodia.nombre || 'Sin nombre'} 
              <button type='button' onclick='playMelody(${JSON.stringify(melodiaGuardada.notas)})'><img src='./assets/play-fill.svg' alt='Boton para reproducir melodia'></button>
            </li>
          `;
        });
      } catch (err) {
        console.error('Error al cargar las melodías:', err);
      }
    }
    cargarMelodias();
    function MenuInteract(itemId){
      if(itemId == 'login'){
        document.getElementById('login').classList.toggle('Ocultar');
        document.getElementById('Opciones').classList.toggle('Mostrar');
        menu1 = !menu1;
        checkMenu();
      }else if(itemId == 'guia'){
        document.getElementById('guia').classList.toggle('Ocultar');
        document.getElementById('Opciones').classList.toggle('Mostrar');
        menu2 = !menu2;
        checkMenu();
      }else if(itemId == 'saveMelody'){
        document.getElementById('saveMelody').classList.toggle('Ocultar')
        menu4 = !menu4;
        checkMenu();
      }else if(itemId == 'melodiasGuardadasSection'){
        document.getElementById('melodiasGuardadasSection').classList.toggle('Ocultar');
        menu3 = !menu3;
        ActionCondition = !ActionCondition;
        checkMenu();
      }
    }
  