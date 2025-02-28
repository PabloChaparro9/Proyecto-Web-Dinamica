## Documentación del Proyecto ##

1. ## Introducción ##

    Este proyecto es un videojuego desarrollado con p5.js y Node.js con una base de datos MySQL. El juego cuenta con un personaje animado que se puede mover en diferentes direcciones,
   respetando los límites del mapa. Además, se implementa una autenticación de usuarios con bcrypt y conexión a la base de datos utilizando la libreria MySQL2.

   El juego es estilo "Simon dice", en el cual el personaje principal es un slime el cual debe repetir las notas que se encuentra en un atril.
   Las funciones principales a implementar en el proyecto son:
   
     1. Generación de notas aleatoreas, si es posible en diferentes escalas musicales (Escalas mayores, menores, entre otras). ✔️
  
     2. Que el juego cuente con un Login. ✔️
  
     3. Que el usuario pueda guardar las melodias que le gusten para poder reproducirlas posteriormente. ✔️
  
     4. Un modo libre donde el usuario pueda tocar una sucesión de notas libres y luego pueda guardarla. ❌
  
     5. Un modo que cuente con una cuenta regresiva para que el jugador complete la melodia propuesta. ❌
  
     6. Reemplazar osciladores con instrumentos reales o virtuales (teclado MIDI). ❌

3. ## Tecnologías Utilizadas ##

    Frontend: HTML, CSS, JavaScript

    Libreria: p5.js

    Backend: Node.js con Express

    Base de datos: MySQL, XAMPP

    Autenticación: bcrypt

    Seguridad y conexión entre frontend y backend: CORS

    Dibujos - Iconos - Ilustraciónes: Krita

5. ## Corrección de bugs y errores ##

Durante el proyecto los errores que se encontraron fueron algunos de los siguientes:

1. Problemas con los encabezados de las solicitudes:

     Uno de los problemas se dió durante la configuración para la comunicación entre el FrontEnd y el BackEnd, especificamente al enviar solicitudes al servidor.
   
     Esto se daba porque no se especificaba que tipo de formato para el encabezado. por lo que lo enviava vacío.
   
     El error era un tanto confuso, por que el error mostraba que el problema era relacionado a CORS.
   
     No era relacionado a CORS, sino que era un problema de configuración al momento de implementar la libreria Express.
   
2. Bug en el movimiento del jugador:
 
    El movimiento del jugador tenia un error al presionar dos teclas al mismo tiempo, cada tecla tenía su propia condición para no salirse de los limites de la pantalla.
  
    La misma se calculaba en el momento de realizado el movimiento. Por lo que para solucionarlo se tuvo que cambiar la condición del movimiento para que se calcule antes de realizar el mismo.

3. Error al recuperar información del servidor

     Al momento de recuperar las melodias, que son enviadas en formato JSON surgió un inconveniente. La información recuperada estaba en formato String.

     Al momento de enviar la información al servidor se utilizaba la función Stringify porque asi se requería para que se pueda leer la información en la base de datos y poder operar de forma correcta con la misma.

     Lo que fué imprevisto fue que al momento de buscar la información e intentar utilizarla para generar una parte importante del juego esta daba problemas.

     Por lo que se tuvo que modificar algunas funciones en base a ese error para usar la funcion parse y convertir la información denuevo a JSON para poder utilizarla en las funciones que ya existian, pasando el mismo dato como un parametro,
   por lo que al momento de llamar la función esta misma se encarga de verificar que la información sea en formato JSON, de lo contrario la convierte en el momento.

4. Error en la carga

   Al momento de cargar la pagina se tiene que hacer una ## carga diferida ## de uno de los archivos js, ya que al momento de analizar el DOM algunos elementos no se encuentran debidamente cargados.

5. Menú, inputs y movimiento

   Se tuvo que agregar diferentes condiciones a las teclas de movimiento para asegurarse de que se mantengan inactivas durante el proceso de competado de formularios en la página.

   Hay una funcion principal para verificar que no haya un menu abierto que este obstruyendo la pantalla para que el personaje no se mueva.
   Esta función consta de 4 condiciones que deben cumplirse, cada una de ellas referida a 4 menus que se pueden desplegar en la página.

6. Array de notas

   Para modificar la cantidad de notas que el usuario puede tocar se debe modificar el Array que contiene las frecuencias para los osciladores.

   Este array cuenta actualmente con 6 valores, cada uno correspondiente a una nota musical.

   Para las escalas que se pueden reproducir deben omitirese las notas que no corresponden a dicha escala, y modificar los indices que se utilizan al momento de rellenar los valores que van a ser asignados a los diferentes osciladores

   De modo que al momento de agregar más notas se deberá tener eso en cuenta.
