document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nameInput");
    const addButton = document.getElementById("addButton");
    const drawButton = document.getElementById("drawButton");
    const resetButton = document.getElementById("resetButton");
    const nameList = document.getElementById("nameList");
    const themeToggle = document.getElementById("themeToggle");

    let names = [];
    let drawnNames = [];

    // Función para añadir nombre a la lista
    function addName() {
        const name = nameInput.value.trim();
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$/.test(name)) {
            alert("Por favor, escribe el nombre completo.");
            return;
        }

        const lowerCaseNames = names.map(n => n.toLowerCase());
        if (lowerCaseNames.includes(name.toLowerCase())) {
            alert("El nombre ya existe.");
            return;
        }

        names.push(name);
        const li = document.createElement("li");
        li.textContent = "*".repeat(name.length);
        nameList.appendChild(li);
        nameInput.value = "";
    }

    // Evento para añadir nombre con el botón
    addButton.addEventListener("click", addName);

    // Evento para añadir nombre con la tecla "Enter"
    nameInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Evitar comportamiento por defecto
            addName();
        }
    });

    // Sortear amigo secreto
    drawButton.addEventListener("click", () => {
        if (names.length === 0) {
            alert("No hay nombres para sortear.");
            return;
        }

        let remainingNames = names.filter(name => !drawnNames.includes(name));
        if (remainingNames.length === 0) {
            alert("Todos los nombres ya han sido sorteados.");
            return;
        }

        const randomIndex = Math.floor(Math.random() * remainingNames.length);
        const drawnName = remainingNames[randomIndex];
        drawnNames.push(drawnName);

        // Eliminar el nombre sorteado de la lista visible
        const nameIndex = names.indexOf(drawnName);
        if (nameIndex !== -1) {
            const listItem = nameList.children[nameIndex];
            nameList.removeChild(listItem);
            names.splice(nameIndex, 1);
        }

        alert(`El amigo secreto sorteado es: ${drawnName}`);
    });

    // Reiniciar el juego
    resetButton.addEventListener("click", () => {
        names = [];
        drawnNames = [];
        nameList.innerHTML = "";
        alert("El juego ha sido reiniciado.");
    });

    // Cambiar tema
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        themeToggle.textContent = `Cambiar Tema (${newTheme === "light" ? "Oscuro" : "Claro"})`;
    });
});