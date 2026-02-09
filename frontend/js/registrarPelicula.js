let boton = document.getElementById("btregistrar");

boton.addEventListener("click", evento =>{
    registrarPelicula();
    window.location.href = `paginaPrincipal.html`;
});

function convertirStringAArrayDeNumeros(str) {
    // Separa el string en un array usando un delimitador, por ejemplo, una coma
    // Luego convierte cada elemento en un número
    return str.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num)); 
}

let registrarPelicula = async()=>{

    const filmID = Number(document.getElementById("filmID").value);          
    const title = document.getElementById("title").value.trim();
    const genreID = Number(document.getElementById("genreID").value);
    const releaseYear = parseInt(document.getElementById("releaseYear").value, 10);
    const duration = parseInt(document.getElementById("duration").value, 10);
    const description = document.getElementById("description").value.trim();
    const photoURL = document.getElementById("photoURL").value.trim();
    const arrayActors = convertirStringAArrayDeNumeros(
    document.getElementById("arrayActors").value
    );

    const campos = {
    filmID,
    title,
    genreID,
    releaseYear,
    duration,
    description,
    photoURL,
    arrayActors,
    };

    console.log("arrayActors:", arrayActors);
    console.log("Datos a enviar:", campos);

    if (!title || Number.isNaN(genreID) || Number.isNaN(releaseYear) || Number.isNaN(duration) || !photoURL || !Array.isArray(arrayActors)) {
        alert("Por favor, completa los campos requeridos con valores válidos.");
        return;
    }
    if (!/^https?:\/\//i.test(photoURL)) {
        alert("La foto debe ser una URL http/https.");
        return;
    }

    const peticion = await fetch("/api/content/v1/content/films",
    {   method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(campos)  
    });

}