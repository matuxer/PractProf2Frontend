// Función para obtener especialistas del backend
async function fetchEspecialistas() {
    try {
        const response = await fetch('http://localhost:3001/especialistas');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const especialistas = await response.json();
        return especialistas;
    } catch (error) {
        console.error('Error al obtener especialistas:', error);
        return [];
    }
}
