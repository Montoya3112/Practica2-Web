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
            
            // Extracción de datos con etiquetas exactas
            const titulo = xmlDoc.getElementsByTagName("título")[0]?.textContent || "Práctica 2";
            const autor = xmlDoc.getElementsByTagName("autor")[0]?.textContent || "Marco Montoya";
            const grupo = xmlDoc.getElementsByTagName("grupo")[0]?.textContent || "IC-0803";
            const profesor = xmlDoc.getElementsByTagName("profesor")[0]?.textContent || "";
            const desc = xmlDoc.getElementsByTagName("descripción")[0]?.textContent || "Sin descripción disponible";

            // Renderizado completo en la tarjeta
            displayArea.innerHTML = `
                <h2 style="color: var(--primary); margin-top: 0;">${titulo}</h2>
                <p><strong>Alumno:</strong> ${autor} | <strong>Grupo:</strong> ${grupo}</p>
                <p><strong>Docente:</strong> ${profesor}</p>
                <hr style="opacity: 0.1; margin: 1rem 0;">
                <p style="color: #444; line-height: 1.6;">${desc}</p>
            `;
        })
        .catch(err => {
            displayArea.innerHTML = `<p style="color:red;">Error de carga: ${err.message}</p>`;
        });
});
