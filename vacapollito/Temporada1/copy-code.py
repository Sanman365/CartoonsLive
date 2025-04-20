import os
import re
from bs4 import BeautifulSoup

def agregar_boton_menu(carpeta):
    # Código del botón que queremos insertar
    boton_menu = """
<a href="../series.html">
    <button class="button-menu">
        MENU
    </button>
</a>
"""
    
    # Recorrer todos los archivos en la carpeta
    for archivo in os.listdir(carpeta):
        if archivo.endswith('.html'):
            ruta_completa = os.path.join(carpeta, archivo)
            modificar_archivo = False
            
            try:
                with open(ruta_completa, 'r', encoding='utf-8') as f:
                    contenido = f.read()
                
                # Usar BeautifulSoup para analizar el HTML
                soup = BeautifulSoup(contenido, 'html.parser')
                
                # Buscar el div con clase "index"
                div_index = soup.find('div', class_='index')
                
                if div_index:
                    # Verificar si ya existe el botón de menú
                    boton_existente = div_index.find('a', href='../series.html')
                    
                    if not boton_existente:
                        # Insertar el botón al principio del div
                        nuevo_boton = BeautifulSoup(boton_menu, 'html.parser')
                        div_index.insert(0, nuevo_boton)
                        modificar_archivo = True
                        print(f"Botón añadido en: {archivo}")
                    else:
                        print(f"El botón ya existe en: {archivo}")
                else:
                    print(f"No se encontró div.index en: {archivo}")
                
                # Guardar los cambios si hubo modificaciones
                if modificar_archivo:
                    with open(ruta_completa, 'w', encoding='utf-8') as f:
                        f.write(str(soup))
            
            except Exception as e:
                print(f"Error procesando {archivo}: {str(e)}")

if __name__ == "__main__":
    # Especifica la ruta de la carpeta con los archivos HTML
    carpeta_html = input("Introduce la ruta de la carpeta con los archivos HTML: ")
    
    # Verificar si la carpeta existe
    if os.path.exists(carpeta_html) and os.path.isdir(carpeta_html):
        print(f"\nProcesando archivos en: {carpeta_html}")
        agregar_boton_menu(carpeta_html)
        print("\nProceso completado!")
    else:
        print(f"\nError: La carpeta '{carpeta_html}' no existe o no es válida.")