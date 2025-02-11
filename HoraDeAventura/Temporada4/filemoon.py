import os
import re

# Ruta de la carpeta que contiene los archivos HTML
carpeta_html = r'C:\Users\Personal\Desktop\Temporada4_temporal'

# Lista de iframes proporcionados por Filemoon (en orden desordenado)
iframes_filemoon = [
'<iframe src="https://filemoon.to/e/hd1a3k5uzgmj/10x1_-_La_Cacer_a_Salvaje_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/4c3cdfvdg66o/10x2_-_BMO_Siempre_Cerrando_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/sghyt0dziegn/10x3_-_El_Hijo_del_Oso_Rapero_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/3opyx8v6kwuc/10x4_-_Bonnibel_Dulce_Goma_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/nopxs3cwuy32/10x5_-_Diecisiete_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/hst5hjz4y82a/10x6_-_Anillo_de_Fuego_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/jwefsn7lqous/10x7_-_Marcy_y_Hunson_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/p8mzxetahrch/10x8_-_La_Primera_Investigaci_n_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/btr73i3llgfl/10x9_-_Blenanas_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/lk9yv1j4q1t8/10x10_-_Jake_el_Ni_o_Estrella_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/rnyqubtrkbph/10x11_-_El_Templo_de_Marte_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/2w3c33rg57hy/10x11_-_El_Templo_de_Marte_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/axhwutr8mxjn/10x12_-_Gumbaldia_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/6kovzj9oo4k6/10x13_-_Diamantes_y_Limones_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
'<iframe src="https://filemoon.to/e/08xpk2thfokq/10x14_-__Ven_Conmigo!_-_Hora_de_Aventura_Online" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',



]

# Función para ordenar los iframes según el número en el nombre (5x1, 5x2, 5x3, etc.)
def ordenar_iframes(iframes):
    def extraer_numero(iframe):
        match = re.search(r'10x(\d+)_', iframe)
        return int(match.group(1)) if match else 0
    return sorted(iframes, key=extraer_numero)

# Ordenar la lista de iframes
iframes_filemoon_ordenados = ordenar_iframes(iframes_filemoon)

# Función para ordenar los archivos correctamente
def ordenar_archivos(archivos):
    # Extraer el número de cada archivo (por ejemplo, "5x1.html" -> 1)
    def extraer_numero(archivo):
        match = re.search(r'10x(\d+)\.html', archivo)
        return int(match.group(1)) if match else 0
    
    # Ordenar los archivos según el número extraído
    return sorted(archivos, key=extraer_numero)

# Recorrer los archivos HTML en la carpeta
archivos_html = [archivo for archivo in os.listdir(carpeta_html) if archivo.endswith('.html')]
archivos_html_ordenados = ordenar_archivos(archivos_html)

for i, archivo_html in enumerate(archivos_html_ordenados):
    # Ruta completa del archivo HTML
    ruta_html = os.path.join(carpeta_html, archivo_html)
    
    # Leer el contenido del archivo HTML
    with open(ruta_html, 'r', encoding='utf-8') as file:
        contenido = file.read()
    
    # Obtener el iframe correspondiente
    if i < len(iframes_filemoon_ordenados):  # Asegurarse de que hay un iframe para este archivo
        iframe = iframes_filemoon_ordenados[i]
        
        # Buscar cualquier iframe existente en el archivo
        if re.search(r'<iframe[^>]*>', contenido):
            # Si hay un iframe existente, reemplazarlo
            contenido_modificado = re.sub(
                r'<iframe[^>]*>',
                iframe,
                contenido,
                flags=re.DOTALL
            )
            print(f'Iframe reemplazado en: {archivo_html}')
        else:
            # Si no hay un iframe existente, insertar uno nuevo dentro de un <div> o <section>
            if re.search(r'<div[^>]*>|</div>|<section[^>]*>|</section>', contenido):
                # Insertar el iframe dentro de un <div> o <section> existente
                contenido_modificado = re.sub(
                    r'(<div[^>]*>|</div>|<section[^>]*>|</section>)',
                    f'\\1\n{iframe}',
                    contenido,
                    flags=re.DOTALL
                )
                print(f'Iframe insertado en un <div> o <section> en: {archivo_html}')
            else:
                # Si no hay un <div> o <section>, insertar el iframe al final del archivo
                contenido_modificado = contenido + f'\n{iframe}'
                print(f'Iframe insertado al final del archivo: {archivo_html}')
        
        # Guardar el archivo HTML modificado
        with open(ruta_html, 'w', encoding='utf-8') as file:
            file.write(contenido_modificado)
    else:
        print(f'No hay iframe para: {archivo_html}')