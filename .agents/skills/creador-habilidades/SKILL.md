---
name: creador-habilidades
description: Habilidad para crear, diseñar y configurar nuevas habilidades personalizadas en el workspace en idioma español.
---

# Creador de Habilidades

## Vista General
Esta habilidad permite al agente actuar como un experto creador de habilidades ("skills") para Google Antigravity. Cuando el usuario solicita una nueva habilidad o automatización para su workspace, esta habilidad guía al agente en el proceso de diseño, estructuración y generación de los archivos necesarios en español, asegurando que sigan las convenciones correctas de Antigravity.

## Cuándo Usar
Utiliza esta habilidad cuando el usuario te pida:
- Crear una nueva habilidad o "skill".
- Diseñar una automatización basada en habilidades.
- Configurar nuevas capacidades o flujos de trabajo especializados en el workspace en idioma español.
- Traducir o adaptar habilidades existentes al español.

## Instrucciones para el Agente

Cuando se active esta habilidad, sigue los siguientes pasos minuciosamente:

1. **Clarificar Requisitos**:
   - Analiza la solicitud del usuario para identificar el propósito, las entradas, salidas, herramientas necesarias y las reglas de negocio de la nueva habilidad.
   - Define un nombre claro y descriptivo en formato **kebab-case** (por ejemplo, `generador-reportes` o `validador-datos`).

2. **Estructura del Directorio de la Habilidad**:
   - Crea un nuevo directorio para la habilidad dentro del workspace bajo la ruta: `.agents/skills/<nombre-de-la-habilidad>/`.
   - El nombre del directorio debe coincidir exactamente con el nombre de la habilidad en kebab-case.

3. **Creación del Archivo SKILL.md**:
   - Crea el archivo principal `SKILL.md` dentro de la carpeta de la habilidad.
   - El archivo **debe** comenzar con el bloque de YAML frontmatter con los campos `name` y `description`.
   - Estructura el archivo en español con las siguientes secciones:
     - **YAML Frontmatter**:
       ```yaml
       ---
       name: nombre-de-la-habilidad
       description: Breve descripción en español de 1 a 3 líneas sobre qué hace la habilidad y cuándo debe activarse.
       ---
       ```
     - **Título principal (`# Nombre de la Habilidad`)**
     - **Vista General (`## Vista General`)**: Una explicación detallada del propósito y alcance de la habilidad.
     - **Cuándo Usar (`## Cuándo Usar`)**: Situaciones claras e intenciones del usuario que deben activar la habilidad.
     - **Instrucciones (`## Instrucciones`)**: Pasos secuenciales y detallados en español para que el agente ejecute la tarea de manera óptima.
     - **Ejemplos (`## Ejemplos`)**: Ejemplos de interacción, entradas y salidas esperadas para guiar el comportamiento del agente.

4. **Archivos Adicionales (Opcional)**:
   - Si la habilidad requiere scripts de automatización (como JavaScript, PowerShell, Python, etc.) o plantillas, colócalos dentro del subdirectorio `.agents/skills/<nombre-de-la-habilidad>/scripts/` o `.agents/skills/<nombre-de-la-habilidad>/templates/` y haz referencia a ellos en las instrucciones de `SKILL.md`.

5. **Verificación**:
   - Asegúrate de que el formato de `SKILL.md` sea Markdown válido.
   - Verifica que los nombres de carpetas y archivos estén escritos correctamente y que la descripción en el frontmatter sea precisa para que el sistema de Antigravity pueda detectarla e indexarla adecuadamente.

## Ejemplos de Creación de Habilidades

### Ejemplo 1: Habilidad de Envío de Notificaciones
Si el usuario solicita: "Crea una habilidad para enviar alertas de Slack cuando falle un build".
El agente debe generar la siguiente estructura:
- Directorio: `.agents/skills/notificador-fallos-slack/`
- Archivo: `.agents/skills/notificador-fallos-slack/SKILL.md` con el siguiente contenido:

```markdown
---
name: notificador-fallos-slack
description: Envía alertas automáticas y formateadas a Slack cuando se detecta un fallo en el proceso de integración o construcción del proyecto.
---

# Notificador de Fallos en Slack

## Vista General
Esta habilidad permite estructurar y enviar alertas a canales de Slack utilizando webhooks cuando se produce un error en el build.

## Cuándo Usar
Se activa cuando el usuario reporta un error de construcción o cuando una tarea de integración continua (CI) falla y se requiere notificar al equipo.

## Instrucciones
1. ...
```
