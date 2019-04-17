const regexcape = require('@jf/regexcape');

/**
 * Función para convertir texto en formato camelCase a minúsculas separadas en
 * palabras.
 *
 * @param {string}  text      Texto a convertir.
 * @param {string?} separator Separador a usar ('-' por defecto).
 * @param {boolean} trim      Si es `true` se elimina el separador del inicio del texto.
 *
 * @return {string} Texto convertido.
 */
function cc2sep(text, separator = '-', trim = true)
{
    text = String(text);
    if (text)
    {
        if (!separator)
        {
            separator = '-';
        }
        text = text.replace(cc2sep.regexp, separator + '$1').toLowerCase();
        if (trim && text[0] === separator)
        {
            const _pattern = regexcape(separator);
            text           = text
                .replace(new RegExp(`^${_pattern}+|${_pattern}+$`, 'g'), '')
                .replace(new RegExp(`(\\s)+${_pattern}+`, 'g'), '$1');
        }
    }

    return text;
}

/**
 * Expresión regular a usar para convertir las mayúsculas.
 *
 * @type {RegExp}
 */
cc2sep.regexp = /([A-ZÑÁÉÍÓÚ])/gu;
//------------------------------------------------------------------------------
// Exportamos la función.
//------------------------------------------------------------------------------
module.exports = cc2sep;
