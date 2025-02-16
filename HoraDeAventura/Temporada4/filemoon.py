import os
import re

# Ruta de la carpeta que contiene los archivos HTML
carpeta_html = r'C:\Users\Personal\Desktop\Temporal\Duplicados'

# Lista de iframes proporcionados por Filemoon (en orden desordenado)
iframes_filemoon = [
    '<iframe src="https://filemoon.to/e/haojujg4qr5i/6x01" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/qvzbd14us5oe/6x02" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/91yu3m7xjf8f/6x03" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/hz6p2gd7f290/6x04" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/9zgipurxy8ke/6x05" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/s7lnsyqevslg/6x06" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/xm1wc8736evd/6x07" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/xio2rjv5a13r/6x08" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/cm6yi77vove0/6x09" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/dw7onk6epsuy/6x10" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/u4e5w7tax9bg/6x11" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/mq9dnnai27eh/6x12" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/ulsvmesxbc5b/6x13" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/cczcwt15oi0b/6x14" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/qyzyae9v17qz/6x15" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/ccz7ubssf3ol/6x16" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/5pajthylviot/6x17" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/ejjryqv8z7pa/6x18" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/1pm551mesmsw/6x19" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/bsstovdld32h/6x20" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/i0o86hxsfbxe/6x21" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/bpwim41cmmm2/6x22" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/55np7ltdwi54/6x23" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/s6ruelxrkom9/6x24" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/0ypez7oia2jo/6x25" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/3usftkmqhgsa/6x26" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/ga2n8c1lbbv8/6x27" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
    '<iframe src="https://filemoon.to/e/ik5vpqh81ljd/6x28" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="640" height="360" allowfullscreen></iframe>',
]

# Función para extraer el número del episodio de un iframe
def extraer_numero(iframe):
    match = re.search(r'6x(\d+)', iframe)
    return int(match.group(1)) if match else 0

# Crear un diccionario que mapee el número del episodio al iframe correspondiente
iframes_dict = {extraer_numero(iframe): iframe for iframe in iframes_filemoon}

# Recorrer los archivos HTML en la carpeta
archivos_html = [archivo for archivo in os.listdir(carpeta_html) if archivo.endswith('.html')]

for archivo_html in archivos_html:
    # Extraer el número del episodio del nombre del archivo
    match = re.search(r'(\d+)\.html', archivo_html)
    if match:
        numero_episodio = int(match.group(1))
        
        # Obtener el iframe correspondiente
        if numero_episodio in iframes_dict:
            iframe = iframes_dict[numero_episodio]
            
            # Ruta completa del archivo HTML
            ruta_html = os.path.join(carpeta_html, archivo_html)
            
            # Leer el contenido del archivo HTML
            with open(ruta_html, 'r', encoding='utf-8') as file:
                contenido = file.read()
            
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
    else:
        print(f'Nombre de archivo no válido: {archivo_html}')