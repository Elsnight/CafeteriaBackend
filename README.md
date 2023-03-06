<p align="center">
    <a>
      <img src="https://scontent.fuio10-1.fna.fbcdn.net/v/t1.15752-9/331630253_1989768038034308_1540867969771207800_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFDhu2PdgHqjATd_zD55Hvinr6yd1GHVnyevrJ3UYdWfIU-n8Ka9QmQY1WYLmHaun95HI8RTvn02UEmulP9WsWx&_nc_ohc=5L1uGXCDmXEAX_zFW_K&_nc_ht=scontent.fuio10-1.fna&oh=03_AdTmDkHAz8JwMuAiOz08rfgm9jWFAlhlj3TfvC3iiu8K4g&oe=641CCE37" alt="Logo" width="180" height="200">
    </a>
    <br>
 </p>
<br>
<h1 align="center">
    DESARROLLO DE SISTEMA WEB Y APLICACIÓN MÓVIL PARA COMANDAS EN LA CAFETERÍA EPN<br>
    <br>
    Desarrollo de un Backend
</h1>
<br>

<p align="center"><b>Elaborado por:</b> Miguel Eduardo Cuenca Chamba</p>
<p align="center"><b>2022-2023</b></p>
<br>

<!-- TABLA DE CONTENIDO -->
<details>
    <summary><b>Tabla de contenido</b></summary>
    <br>
  <ol>
      <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
    </li>
    <li>
      <a href="#descarga-e-instalación-del-proyecto">Descarga e instalación del proyecto</a>
    </li>
    <li>
      <a href="#perfiles-de-usuario">Perfiles de usuario</a>
      <ul>
        <li><a href="#funcionalidades-del-usuario-administrador">Funcionalidades del usuario administrador</a></li>
        <li><a href="#funcionalidades-del-usuario-cliente">Funcionalidades del usuario cliente</a></li>
        <li><a href="#funcionalidades-del-usuario-cocinero">Funcionalidades del usuario cocinero</a></li>
      </ul>
    </li>
    <li>
      <a href="#acceso-al-componente-backend">Acceso al componente backend</a>
    </li>
    <li>
        <a href="#video-explicativo-del-funcionamiento">Video explicativo del funcionamiento</a>
     </li>
  </ol>
</details>

<br>

# Sobre el proyecto

El presente proyecto contiene el desarrollo de un Sistema Web para comandas en la Cafeteria EPN, en donde se implementó los distintos endpoints para la correcta iteracción y menrjo de los datos, este proyecto tiene la finalidad de emplear tecnologías modernas y aprovechando los beneficios que ofrecen las API’s. En este proyecto se implementa un backend tomando en cuenta los requerimientos necesarios para que el funcionamiento de la cafetería de la EPN pueda ofrecer, recibir y despachar los pedidos, con el propósito de integrar los servicios de la cafetería en un medio tecnológico y digital.
<br>

# Descarga e instalación del proyecto

 1. Para la instalación del proyecto debemos descargar el archivo .zip, desde el repositorio

 2. Una ves descargado el proyecto, los descoprimimos y desde la carpeta del proyecto ejecutamos el CMD, para abrir el editor de codigo 'Visual Studio Code'

 3. El siguiente paso es abrir la terminal desde el editor de codigo y ejecutamos:

    ```
    npm install
    ```

  4. Para ejecutar el proyecto de manera local se debe ejecutar el siguiente comando:

     ```
     npm run dev
     ```
   5. Bien echo, ahora tienes el proyecto ejecutandose y funcionando correctamente. Se nos presentara una imagen como la siguiente:

        <br>
        <p align="center">
            <a>
                <img src="https://i.ibb.co/YQQJjTj/Whats-App-Image-2023-03-06-at-02-10-15.jpg" alt="Logo" width="700" height="200">
            </a>
         </p>
        <br>
        
   5. Para poder entrar a la documentacion es necesario agregar ```/docs```:

        <br>
        <p align="center">
            <a>
                <img src="https://i.ibb.co/X3wQ12T/Whats-App-Image-2023-03-06-at-02-17-42.jpg" width="700" height="500">
            </a>
         </p>
        <br>
        

      

# Perfiles de usuario

Los perfiles de usuario que maneja el sistema son: 

<br>
<p align="center">
    <a>
        <img src="https://scontent.fuio10-1.fna.fbcdn.net/v/t1.15752-9/331631871_1003418617711629_5092243518265142120_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGeUg3FFKU-nliCq0uJ-Q_2Jc29PPqJjB8lzb08-omMH2IA2XHv3Aa9HZf4RUv4aSD13p1BjiKLYKEiMtFIT6fD&_nc_ohc=JdL1_Yo86nkAX_-JRYM&_nc_ht=scontent.fuio10-1.fna&oh=03_AdTK1cESetSjUj1dvdQzAAzJY23QGsn_bFAq9JyHVTrDiQ&oe=641CCBE4" alt="Logo" width="700"         height="400">
    </a>
 </p>
<br>

### Funcionalidades del usuario ADMINISTRADOR

Como parte de las funcionalidades a las que puede acceder el usuario superadministrador se tienen:
<br>
<ul>
    <li>Iniciar sesión en el sistema.</li>
    <li>Modificar su perfil</li>
    <li>Generar usuarios cocineros.</li>
    <li>Gestionar el menú de los almuerzos.</li>
    <li>Visualizar el pedido y la factura pagada.</li>
    <li>Crear al perfil cocinero.</li>
</ul>
<br>

### Funcionalidades del usuario CLIENTE

Las funcionalidades a las que puede acceder el usuario administrador son:
<br>
<ul>
    <li>Registrarse.</li>
    <li>Iniciar sesión en el sistema.</li>
    <li>Modificar su perfil.</li>
    <li>Gestionar pedido.</li>
    <li>Confirmar el pedido y cargar el comprobante de pago.</li>        
    <li>Visualizar el estado del pedido.</li>
</ul>
<br>

### Funcionalidades del usuario COCINERO

Las funcionalidades a las que puede acceder el usuario administrador son:
<br>
<ul>
    <li>Iniciar sesión en el sistema.</li>
    <li>Modificar su perfil.</li>
    <li>Visualizar los pedidos asignados.</li>
    <li>Cambiar el estado de los pedidos.</li>        
</ul>
<br>

# Acceso al componente backend

El acceso al sistema web se lo realiza a través del siguiente enlace.
<br>
<p align="center"><a href="https://app-cafeteriacackend.herokuapp.com/docs/" target="_blank"><strong>Acceso al sistema web »</strong></a></p>
<br>

 # Video explicativo del funcionamiento

En el video a continuación se presenta la explicación a detalle de este componente.
<br>
<p align="center"><a href="https://www.youtube.com/watch?v=Oh3jnjLdypo" target="_blank"><strong>Video explicativo »</strong></a></p>
