import os
import re

def obtener_ruta_script():
    """Obtiene la ruta donde se encuentra este script"""
    return os.path.dirname(os.path.abspath(__file__))

def procesar_archivo_frames():
    # Obtener la ruta del script y construir ruta completa al frames.txt
    ruta_script = obtener_ruta_script()
    ruta_frames = os.path.join(ruta_script, 'frames.txt')
    
    # Verificar si el archivo existe
    if not os.path.exists(ruta_frames):
        print(f"Error: No se encontró el archivo 'frames.txt' en: {ruta_script}")
        print("Por favor, asegúrate de que el archivo frames.txt esté en la misma carpeta que este script.")
        return None
    
    # Leer el archivo frames.txt
    with open(ruta_frames, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # Dividir en episodios e iframes
    episodios = []
    episodio_actual = None
    
    for linea in contenido.split('\n'):
        if linea.strip() == '':
            continue
            
        # Verificar si es una línea de título de episodio (empieza con número)
        if re.match(r'^\d+x\d+', linea):
            episodio_actual = {
                'numero': linea.split(' ')[0],
                'titulo': linea,
                'iframe': None
            }
        elif '<iframe' in linea and episodio_actual:
            episodio_actual['iframe'] = linea
            episodios.append(episodio_actual)
            episodio_actual = None
    
    return episodios

def actualizar_archivos_html(episodios):
    if not episodios:
        return
        
    ruta_script = obtener_ruta_script()
    
    for episodio in episodios:
        # Convertir número de episodio a formato de nombre de archivo (1x01 -> 1x1.html)
        partes = episodio['numero'].split('x')
        temporada = partes[0]
        num_episodio = partes[1].lstrip('0')  # Quitar cero inicial
        nombre_archivo = f"{temporada}x{num_episodio}.html"
        ruta_completa = os.path.join(ruta_script, nombre_archivo)
        
        # Verificar si el archivo existe
        if not os.path.exists(ruta_completa):
            print(f"Advertencia: No se encontró {nombre_archivo}, saltando...")
            continue
        
        # Leer el contenido del archivo HTML
        with open(ruta_completa, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Reemplazar el iframe manteniendo el resto del contenido
        nuevo_contenido = re.sub(
            r'<iframe.*?</iframe>', 
            episodio['iframe'], 
            html_content, 
            flags=re.DOTALL
        )
        
        # Escribir el archivo actualizado
        with open(ruta_completa, 'w', encoding='utf-8') as f:
            f.write(nuevo_contenido)
        
        print(f"Actualizado: {nombre_archivo}")

if __name__ == "__main__":
    print("Iniciando proceso de actualización de iframes...")
    episodios = procesar_archivo_frames()
    
    if episodios:
        print(f"Se encontraron {len(episodios)} episodios en frames.txt")
        actualizar_archivos_html(episodios)
    
    print("Proceso completado!")