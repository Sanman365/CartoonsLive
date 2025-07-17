import shutil
import os

def duplicar_archivo_html(archivo_original, ruta_destino, veces):
    # Verificar si el archivo original existe
    if not os.path.exists(archivo_original):
        print(f"El archivo original no existe: {archivo_original}")
        return

    # Verificar si la ruta de destino existe, si no, crearla
    if not os.path.exists(ruta_destino):
        os.makedirs(ruta_destino)
        print(f"Se creó la ruta de destino: {ruta_destino}")

    for i in range(1, veces + 1):
        nombre_nuevo_archivo = f"4x{i}.html"
        ruta_nueva = os.path.join(ruta_destino, nombre_nuevo_archivo)  # Combina la ruta de destino con el nuevo nombre
        try:
            shutil.copy(archivo_original, ruta_nueva)
            print(f"Archivo creado: {ruta_nueva}")
        except Exception as e:
            print(f"Error al copiar el archivo: {e}")

# Ruta del archivo HTML original (usando una cadena raw)
archivo_original = r"C:\Users\Personal\Documents\CartoonLive\CartoonsLive\vacapollito\Temporada 1\1x1.html"

# Ruta donde se guardarán los archivos duplicados
ruta_destino = r"C:\Users\Personal\Documents\CartoonLive\CartoonsLive\vacapollito\Temporada 4"

# Número de veces que deseas duplicar el archivo
veces = 12

# Llamada a la función para duplicar el archivo
duplicar_archivo_html(archivo_original, ruta_destino, veces)