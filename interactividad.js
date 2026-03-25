document.addEventListener("DOMContentLoaded", () => {
    const displayArea = document.getElementById("contenido");

    fetch("contenido.xml")
        .then(response => {
            if (!response.ok) throw new Error("No se encontró contenido.xml");
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "application/xml");
            
            // Extraemos los datos de tu XML (etiquetas con acento según tu captura)
            const titulo = xmlDoc.getElementsByTagName("título")[0]?.textContent || "Sin título";
            const autor = xmlDoc.getElementsByTagName("autor")[0]?.textContent || "Marco Antonio Montoya";
            const desc = xmlDoc.getElementsByTagName("descripción")[0]?.textContent || "";

            displayArea.innerHTML = `
                <h2 style="color: var(--primary); margin-top: 0;">${titulo}</h2>
                <p><strong>Alumno:</strong> ${autor}</p>
                <hr style="opacity: 0.1; margin: 1rem 0;">
                <p>${desc}</p>
            `;
        })
        .catch(err => {
            displayArea.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        });
});
