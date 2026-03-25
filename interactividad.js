document.addEventListener("DOMContentLoaded", () => {
    const displayArea = document.getElementById("contenido");

    fetch("contenido.xml")
        .then(response => {
            if (!response.ok) throw new Error("Archivo no encontrado");
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "application/xml");
            
            const titulo = xmlDoc.getElementsByTagName("título")[0]?.textContent || "Práctica 2";
            const autor = xmlDoc.getElementsByTagName("autor")[0]?.textContent || "Marco Montoya";
            const desc = xmlDoc.getElementsByTagName("descripción")[0]?.textContent || "";

            // Efecto de aparición suave (Fade-in)
            displayArea.style.opacity = "0";
            displayArea.style.transition = "opacity 0.8s ease-in";

            displayArea.innerHTML = `
                <h2 style="color: var(--primary); margin-bottom: 10px;">${titulo}</h2>
                <p style="font-size: 1.1rem;"><strong>Alumno:</strong> ${autor}</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="color: #555; line-height: 1.5;">${desc}</p>
            `;

            setTimeout(() => { displayArea.style.opacity = "1"; }, 100);
        })
        .catch(err => {
            displayArea.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        });
});
