document.addEventListener("DOMContentLoaded", () => {
    const displayArea = document.getElementById("contenido");

    fetch("contenido.xml")
        .then(response => {
            if (!response.ok) throw new Error("No se encontró el archivo XML");
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "application/xml");
            
            // Buscamos las etiquetas exactas del XML anterior
            const titulo = xmlDoc.getElementsByTagName("titulo")[0]?.textContent || "Práctica 2";
            const autor = xmlDoc.getElementsByTagName("autor")[0]?.textContent || "Marco Montoya";
            const grupo = xmlDoc.getElementsByTagName("grupo")[0]?.textContent || "IC-0803";
            const profesor = xmlDoc.getElementsByTagName("profesor")[0]?.textContent || "Marcial Jesús Martínez Blas";
            const desc = xmlDoc.getElementsByTagName("descripcion")[0]?.textContent || "Sin descripción disponible";

            // Inyectamos el HTML en la tarjeta
            displayArea.innerHTML = `
                <h2 style="color: var(--primary); margin-top: 0; font-size: 1.8rem;">${titulo}</h2>
                <p style="margin: 5px 0;"><strong>Alumno:</strong> ${autor} | <strong>Grupo:</strong> ${grupo}</p>
                <p style="margin: 5px 0;"><strong>Docente:</strong> ${profesor}</p>
                <hr style="opacity: 0.1; margin: 15px 0;">
                <p style="color: #444; line-height: 1.6; font-size: 1.05rem;">${desc}</p>
            `;
        })
        .catch(err => {
            displayArea.innerHTML = `<p style="color:red;">⚠️ Error: ${err.message}</p>`;
        });
});
