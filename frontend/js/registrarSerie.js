let boton = document.getElementById("btregistrar");

boton.addEventListener("click", evento => {
    registrarSerie();
    window.location.href = `paginaPrincipal.html`;
});

function convertirStringAArrayDeNumeros(str) {
    return str.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
}

let registrarSerie = async () => {
    
    const serieID = Number(document.getElementById("serieID").value); // si tu API lo exige
    const title = document.getElementById("title").value.trim();
    const genreID = parseInt(document.getElementById("genreID").value.trim(), 10);
    const releaseYear = parseInt(document.getElementById("releaseYear").value.trim(), 10);
    const seasons = parseInt(document.getElementById("seasons").value.trim(), 10);
    const description = document.getElementById("description").value.trim();
    const photoURL = document.getElementById("photoURL").value.trim();
    const arrayActors = convertirStringAArrayDeNumeros(
    document.getElementById("arrayActors").value.trim()
    );

    const campos = {
    serieID,
    title,
    genreID,
    releaseYear,
    seasons,
    description,
    photoURL,
    arrayActors
    };

    console.log("Datos a enviar:", campos);

    if (
    !title ||
    Number.isNaN(genreID) ||
    Number.isNaN(releaseYear) ||
    Number.isNaN(seasons) ||
    !description ||
    !photoURL ||
    !Array.isArray(arrayActors) ||
    arrayActors.length === 0
    ) {
    alert("Por favor, completa todos los campos requeridos.");
    return;
    }

    if (!/^https?:\/\//i.test(photoURL)) {
    alert("La foto debe ser una URL http/https (no base64 data:).");
    return;
    }


    try {
        const peticion = await fetch("/api/content/v1/content/series", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(campos) 
        });

        if (peticion.ok) {
            const resultado = await peticion.json();
            alert("Serie registrada con éxito.");
        } else {
            const error = await peticion.json();
            console.error("Error al registrar la serie:", error);
            alert("Hubo un error al intentar registrar la serie: " + (error.message || JSON.stringify(error)));
        }
    } catch (error) {
        console.error("Error al hacer la petición:", error);
        alert("Hubo un error al intentar hacer la solicitud.");
    }
};
