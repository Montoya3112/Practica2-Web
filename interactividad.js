document.addEventListener("DOMContentLoaded", () => {
    const displayArea = document.getElementById("contenido-dinamico");

    fetch("data/contenido.xml")
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar XML");
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "application/xml");
            
            // Extracción de datos con validación
            const titulo = xmlDoc.getElementsByTagName("titulo")[0]?.textContent || "Sin título";
            const autor = xmlDoc.getElementsByTagName("autor")[0]?.textContent || "Anónimo";

            // Renderizado profesional
            displayArea.innerHTML = `
                <span class="badge">Novedad</span>
                <h2 style="color: var(--dark-bg); margin-bottom: 0.5rem;">${titulo}</h2>
                <p><strong>Autor del recurso:</strong> ${autor}</p>
                <hr style="opacity: 0.1; margin: 1.5rem 0;">
                <p>Este contenido ha sido recuperado dinámicamente utilizando el estándar XML para transporte de datos estructurados.</p>
            `;
        })
        .catch(err => {
            displayArea.innerHTML = `<p class="error">⚠️ Error: ${err.message}</p>`;
        });
});