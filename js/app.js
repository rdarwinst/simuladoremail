document.addEventListener('DOMContentLoaded', () => {

    const correo = {
        email: '',
        asunto: '',
        mensaje: '',
    };

    // Seleccinar elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');



    // Asignación de eventos
    inputEmail.addEventListener('input', validarInput);
    inputAsunto.addEventListener('input', validarInput);
    inputMensaje.addEventListener('input', validarInput);
    formulario.addEventListener('submit', enviarEmail);

    inputCC.addEventListener('input', function(e){
        if (e.target.value.trim() !== '' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El CC ${e.target.value} no es valido.`, e.target.parentElement);
            return;
        }
        quitarAlerta(e.target.parentElement);
    });

    btnReset.addEventListener('click', e => {
        e.preventDefault();
        resetFormulario();

    });

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();

            // Crear alerta Exito
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            console.log(alertaExito);
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);

    }

    function validarInput(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio.`, e.target.parentElement);
            correo[e.target.name] = '';
            comprobarCorreo();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El email "${e.target.value}" no es valido`, e.target.parentElement);
            correo[e.target.name] = '';
            comprobarCorreo();
            return
        }

        quitarAlerta(e.target.parentElement);

        // Asignar los valores

        correo[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarCorreo();
    };

    function mostrarAlerta(mensaje, referencia) {
        quitarAlerta(referencia);

        // Generar HTML
        const error = document.createElement('P');
        error.textContent = mensaje.toUpperCase();
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center', 'font-bold');

        referencia.appendChild(error);

    };

    function quitarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[\p{L}]{2,}$/u;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarCorreo() {
        if (Object.values(correo).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {

        // Reiniciar el objeto
        correo.email = '';
        correo.asunto = '';
        correo.mensaje = '';

        formulario.reset();
        comprobarCorreo();
    }

});

