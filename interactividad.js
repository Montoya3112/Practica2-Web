document.addEventListener("DOMContentLoaded", () => {
    const displayArea = document.getElementById("contenido");

    // Buscamos el archivo en la raíz directamente
    fetch("contenido.xml")
        .then(response => {
            if (!response.ok) throw new Error("No se pudo encontrar el archivo XML");
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "application/xml");
            
            // Extraemos los datos
            const titulo = xmlDoc.getElementsByTagName("titulo")[0]?.textContent || "Sin título";
            const autor = xmlDoc.getElementsByTagName("autor")[0]?.textContent || "Anónimo";
            const desc = xmlDoc.getElementsByTagName("descripcion")[0]?.textContent || "";

            // Insertamos el contenido en el HTML
            displayArea.innerHTML = `
                <h2 style="color: var(--dark); margin-bottom: 0.5rem;">${titulo}</h2>
                <p><strong>Autor:</strong> ${autor}</p>
                <hr style="opacity: 0.1; margin: 1rem 0;">
                <p>${desc}</p>
            `;
        })
        .catch(err => {
            displayArea.innerHTML = `<p style="color:red;">⚠️ Error: ${err.message}</p>`;
            console.error(err);
        });
});
