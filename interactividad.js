document.addEventListener("DOMContentLoaded", () => {
    const displayArea = document.getElementById("contenido");

    fetch("contenido.xml")
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar XML");
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "application/xml");
            
            // Extracción robusta de datos
            const titulo = xmlDoc.getElementsByTagName("titulo")[0]?.textContent || "Práctica 2";
            const autor = xmlDoc.getElementsByTagName("autor")[0]?.textContent || "MARCO ANTONIO MONTOYA";
            const desc = xmlDoc.getElementsByTagName("descripcion")[0]?.textContent || 
                         xmlDoc.getElementsByTagName("descripción")[0]?.textContent || 
                         "Error: No se encontró la etiqueta descripción en el XML.";

            displayArea.innerHTML = `
                <h2 style="color: var(--primary); margin-top: 0; font-size: 1.8rem;">${titulo}</h2>
                <p style="margin-bottom: 20px;"><strong>Alumno:</strong> ${autor} (ISC - TESJO)</p>
                <hr style="opacity: 0.1; margin: 15px 0;">
                <p style="color: #444; line-height: 1.6; font-size: 1.1rem; text-align: justify;">${desc}</p>
            `;
        })
        .catch(err => {
            displayArea.innerHTML = `<p style="color:red;">⚠️ ${err.message}</p>`;
        });
});
