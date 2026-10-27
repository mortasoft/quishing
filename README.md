# Quishing Awareness App (React + Firebase)

Aplicación web de concientización sobre ciberseguridad y ataques de **Quishing** (QR Phishing), construida con React y lista para desplegar en Firebase Hosting.

## 🚀 Características
- **Alarma automática**: Reproduce automáticamente `alarm.mp3` al ingresar. Si el navegador restringe la reproducción automática no interactiva, cuenta con listeners globales y un banner interactivo para iniciar la alarma con el primer clic o toque.
- **Diseño de alerta inmersivo**: Efecto de baliza de emergencia, líneas de escaneo cibernéticas, calavera animada con efecto de pulso y diseño adaptativo a móviles y computadoras.
- **Contenido educativo**: Explica el riesgo del Quishing y ofrece 3 reglas clave de protección para los usuarios.
- **Configuración de Firebase Hosting**: Listo para compilar y desplegar con un solo comando.

---

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias (ya instaladas)
npm install

# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción (genera la carpeta dist/)
npm run build

# Probar la compilación localmente
npm run preview
```

---

## 🔥 Despliegue en Firebase Hosting

### 1. Iniciar sesión en Firebase (si no lo has hecho)
```bash
firebase login
```

### 2. Vincular tu proyecto de Firebase
```bash
firebase use --add
```
*(Selecciona el ID de tu proyecto creado en la [Consola de Firebase](https://console.firebase.google.com/))*

### 3. Desplegar
```bash
npm run deploy
```
*O manualmente:*
```bash
npm run build
firebase deploy --only hosting
```
