// registro.js - Lógica del formulario de registro
import { handleRegister } from './auth.js';

const API_URL = 'http://localhost:3001';

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const registerMessage = document.getElementById('register-message');
  
  const paisSelect = document.getElementById('register-pais');
  const provinciaSelect = document.getElementById('register-provincia');
  const localidadSelect = document.getElementById('register-localidad');
  
  const paisCustomInput = document.getElementById('register-pais-custom');
  const provinciaCustomInput = document.getElementById('register-provincia-custom');
  const localidadCustomInput = document.getElementById('register-localidad-custom');
  
  // Cargar países al iniciar
  loadPaises();
  
  // Event listeners para selects con opción "Otro"
  paisSelect.addEventListener('change', async (e) => {
    const value = e.target.value;
    
    if (value === 'custom') {
      paisCustomInput.classList.remove('hidden');
      paisCustomInput.required = true;
      paisSelect.required = false;
      
      // Habilitar provincia para permitir crear nueva
      provinciaSelect.disabled = false;
      provinciaSelect.innerHTML = '<option value="">Seleccione una provincia</option>';
      const customProvinciaOption = document.createElement('option');
      customProvinciaOption.value = 'custom';
      customProvinciaOption.textContent = '+ Agregar nueva provincia';
      provinciaSelect.appendChild(customProvinciaOption);
      
      localidadSelect.disabled = true;
      localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
    } else {
      paisCustomInput.classList.add('hidden');
      paisCustomInput.required = false;
      paisSelect.required = true;
      
      if (value) {
        provinciaSelect.disabled = false;
        await loadProvincias(value);
      } else {
        provinciaSelect.disabled = true;
        localidadSelect.disabled = true;
        provinciaSelect.innerHTML = '<option value="">Seleccione una provincia</option>';
        localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
      }
    }
  });
  
  provinciaSelect.addEventListener('change', async (e) => {
    const value = e.target.value;
    
    if (value === 'custom') {
      provinciaCustomInput.classList.remove('hidden');
      provinciaCustomInput.required = true;
      provinciaSelect.required = false;
      
      // Habilitar localidad para permitir crear nueva
      localidadSelect.disabled = false;
      localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
      const customLocalidadOption = document.createElement('option');
      customLocalidadOption.value = 'custom';
      customLocalidadOption.textContent = '+ Agregar nueva localidad';
      localidadSelect.appendChild(customLocalidadOption);
    } else {
      provinciaCustomInput.classList.add('hidden');
      provinciaCustomInput.required = false;
      provinciaSelect.required = true;
      
      if (value) {
        localidadSelect.disabled = false;
        await loadLocalidades(value);
      } else {
        localidadSelect.disabled = true;
        localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
      }
    }
  });
  
  localidadSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    
    if (value === 'custom') {
      localidadCustomInput.classList.remove('hidden');
      localidadCustomInput.required = true;
      localidadSelect.required = false;
    } else {
      localidadCustomInput.classList.add('hidden');
      localidadCustomInput.required = false;
      localidadSelect.required = true;
    }
  });
  
  // Función para cargar países
  async function loadPaises() {
    try {
      const response = await fetch(`${API_URL}/paises`);
      const paisesData = await response.json();
      
      paisSelect.innerHTML = '<option value="">Seleccione un país</option>';
      paisesData.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais.id;
        option.textContent = pais.nombre;
        paisSelect.appendChild(option);
      });
      
      // Agregar opción "Otro"
      const customOption = document.createElement('option');
      customOption.value = 'custom';
      customOption.textContent = '+ Agregar nuevo país';
      paisSelect.appendChild(customOption);
    } catch (error) {
      console.error('Error al cargar países:', error);
    }
  }
  
  // Función para cargar provincias
  async function loadProvincias(paisId) {
    try {
      const response = await fetch(`${API_URL}/provincias?idPais=${paisId}`);
      const provinciasData = await response.json();
      
      provinciaSelect.innerHTML = '<option value="">Seleccione una provincia</option>';
      provinciasData.forEach(provincia => {
        const option = document.createElement('option');
        option.value = provincia.id;
        option.textContent = provincia.nombre;
        provinciaSelect.appendChild(option);
      });
      
      // Agregar opción "Otro"
      const customOption = document.createElement('option');
      customOption.value = 'custom';
      customOption.textContent = '+ Agregar nueva provincia';
      provinciaSelect.appendChild(customOption);
    } catch (error) {
      console.error('Error al cargar provincias:', error);
    }
  }
  
  // Función para cargar localidades
  async function loadLocalidades(provinciaId) {
    try {
      const response = await fetch(`${API_URL}/localidades?idProvincia=${provinciaId}`);
      const localidadesData = await response.json();
      
      localidadSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
      localidadesData.forEach(localidad => {
        const option = document.createElement('option');
        option.value = localidad.id;
        option.textContent = localidad.nombre;
        localidadSelect.appendChild(option);
      });
      
      // Agregar opción "Otro"
      const customOption = document.createElement('option');
      customOption.value = 'custom';
      customOption.textContent = '+ Agregar nueva localidad';
      localidadSelect.appendChild(customOption);
    } catch (error) {
      console.error('Error al cargar localidades:', error);
    }
  }
  
  // Register Form Handler
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('register-nombre').value;
    const apellido = document.getElementById('register-apellido').value;
    const email = document.getElementById('register-email').value;
    const telefono = document.getElementById('register-telefono').value;
    const domicilio = document.getElementById('register-domicilio').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const btnText = document.getElementById('register-btn-text');
    const spinner = document.getElementById('register-spinner');
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      showMessage('Las contraseñas no coinciden', 'error');
      return;
    }
    
    const requestBody = {
      nombre,
      apellido,
      correo: email,
      telefono,
      domicilio,
      password
    };
    
    // Determinar país (ID o nombre personalizado)
    if (paisSelect.value === 'custom') {
      requestBody.nombrePais = paisCustomInput.value.trim();
    } else {
      requestBody.idPais = parseInt(paisSelect.value);
    }
    
    // Determinar provincia (ID o nombre personalizado)
    if (provinciaSelect.value === 'custom') {
      requestBody.nombreProvincia = provinciaCustomInput.value.trim();
    } else if (provinciaSelect.value) {
      requestBody.idProvincia = parseInt(provinciaSelect.value);
    }
    
    // Determinar localidad (ID o nombre personalizado)
    if (localidadSelect.value === 'custom') {
      requestBody.nombreLocalidad = localidadCustomInput.value.trim();
    } else if (localidadSelect.value) {
      requestBody.idLocalidad = parseInt(localidadSelect.value);
    }
    
    // Mostrar loader
    btnText.textContent = 'Registrando...';
    spinner.classList.remove('hidden');
    submitBtn.disabled = true;
    
    try {
      const result = await handleRegister(requestBody);
      
      if (result.success) {
        // Registro exitoso
        showMessage(result.data.message, 'success');
        
        // Redirigir a index después de 1 segundo (ya está autenticado con el token guardado)
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } else {
        // Error en registro
        showMessage(result.message, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('Error de conexión con el servidor', 'error');
    } finally {
      // Ocultar loader
      btnText.textContent = 'Registrarse';
      spinner.classList.add('hidden');
      submitBtn.disabled = false;
    }
  });
  
  // Función helper para mostrar mensajes
  function showMessage(message, type) {
    registerMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
    
    if (type === 'success') {
      registerMessage.classList.add('bg-green-100', 'text-green-700');
    } else if (type === 'error') {
      registerMessage.classList.add('bg-red-100', 'text-red-700');
    }
    
    registerMessage.textContent = message;
    registerMessage.classList.remove('hidden');
  }
});
