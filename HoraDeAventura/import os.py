import os
import shutil

# Definir las rutas de las carpetas de origen y destino
origen = r'C:\Users\Personal\Documents\CartoonLive\CartoonsLive'
destino = r'C:\Users\Personal\Desktop\Temporada4_temporal'

# Verificar si la carpeta de origen existe
if not os.path.exists(origen):
    print(f"La carpeta de origen no existe: {origen}")
    exit(1)

# Verificar si la carpeta de destino existe
if not os.path.exists(destino):
    try:
        os.makedirs(destino)
        print(f"Carpeta de destino creada: {destino}")
    except Exception as e:
        print(f"Error al crear la carpeta de destino: {e}")
        exit(1)
else:
    print(f"La carpeta de destino ya existe: {destino}")

# Verificar permisos de escritura en la carpeta de destino
if not os.access(destino, os.W_OK):
    print(f"No tienes permisos de escritura en la carpeta de destino: {destino}")
    exit(1)

# Listar archivos en la carpeta de origen
print("Archivos en la carpeta de origen:", os.listdir(origen))

# Recorrer los archivos en la carpeta de origen
for archivo in os.listdir(origen):
    # Verificar si el archivo sigue el patrón "3x1.html", "3x2.html", etc.
    if archivo.startswith('2x') and archivo.endswith('.html'):
        # Extraer el número después de "3x"
        numero = archivo.split('x')[1].split('.')[0]
        
        # Crear el nuevo nombre del archivo
        nuevo_nombre = f'10x{numero}.html'
        
        # Ruta completa del archivo de origen y destino
        ruta_origen = os.path.join(origen, archivo)
        ruta_destino = os.path.join(destino, nuevo_nombre)
        
        # Verificar si el archivo de origen existe
        if not os.path.exists(ruta_origen):
            print(f"El archivo {ruta_origen} no existe.")
            continue
        
        # Verificar si el archivo de destino ya existe
        if os.path.exists(ruta_destino):
            print(f"El archivo {ruta_destino} ya existe. Se omitirá.")
            continue
        
        try:
            # Copiar el archivo a la carpeta de destino con el nuevo nombre
            shutil.copy(ruta_origen, ruta_destino)
            print(f'Copiado y renombrado: {archivo} -> {nuevo_nombre}')
        except PermissionError:
            print(f'Error: No tienes permisos para copiar el archivo {ruta_origen}')
        except Exception as e:
            print(f'Error inesperado al copiar {archivo}: {e}')