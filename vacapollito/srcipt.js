    // Función para las temporadas
    function toggleChapters(id) {
        const element = document.getElementById(id);
        element.style.display = element.style.display === 'flex' ? 'none' : 'flex';
    }

   // Función para el nuevo menú
   document.addEventListener("DOMContentLoaded", function() {
    const menuButtons = document.querySelectorAll('.menu-btn');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('open');
            }
        });
    });

    // Cierra todos los submenús al hacer clic fuera del menú
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-container')) {
            document.querySelectorAll('.submenu').forEach(sub => {
                sub.classList.remove('open');
            });
        }
    });
});
