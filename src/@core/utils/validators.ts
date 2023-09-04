import moment from 'moment'
import { isEmpty, isEmptyArray, isNullOrUndefined } from './index'

// 👉 Required Validator
export const requiredValidator = (value: unknown) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return 'Este campo es obligatorio'

  return !!String(value).trim().length || 'Este campo es obligatorio'
}

// 👉 Email Validator
export const emailValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (Array.isArray(value))
    return value.every(val => re.test(String(val))) || 'El campo de correo electrónico debe ser un correo electrónico válido'

  return re.test(String(value)) || 'El campo de correo electrónico debe ser un correo electrónico válido'
}

// 👉 Password Validator
export const passwordValidator = (password: string) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/

  const validPassword = regExp.test(password)

  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
    'El campo debe contener al menos un carácter especial en mayúsculas, minúsculas y un dígito con un mínimo de 8 caracteres'
  )
}

// 👉 Confirm Password Validator
export const confirmedValidator = (value: string, target: string) =>

  value === target || 'La confirmación del campo Confirmar contraseña no coincide'

// 👉 Between Validator
export const betweenValidator = (value: unknown, min: number, max: number) => {
  const valueAsNumber = Number(value)

  return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || `Introduzca el número entre ${min} y ${max}`
}

// 👉 Integer Validator
export const integerValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  if (Array.isArray(value))
    return value.every(val => /^-?[0-9]+$/.test(String(val))) || 'Este campo debe ser un número entero'

  return /^-?[0-9]+$/.test(String(value)) || 'Este campo debe ser un número entero'
}

// 👉 Regex Validator
export const regexValidator = (value: unknown, regex: RegExp | string): string | boolean => {
  if (isEmpty(value))
    return true

  let regeX = regex
  if (typeof regeX === 'string')
    regeX = new RegExp(regeX)

  if (Array.isArray(value))
    return value.every(val => regexValidator(val, regeX))

  return regeX.test(String(value)) || 'El formato del campo Regex no es válido'
}

// 👉 Alpha Validator
export const alphaValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  return /^[A-Z]*$/i.test(String(value)) || 'El campo Alfa solo puede contener caracteres alfabéticos'
}

// 👉 URL Validator
export const urlValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/

  return re.test(String(value)) || 'La URL no es válida'
}

// 👉 Length Validator
export const lengthValidator = (value: unknown, length: number) => {
  if (isEmpty(value))
    return true

  return String(value).length === length || `El campo debe tener  ${length} caracteres`
}
// 👉 Length Max Validator
export const lengthMaxValidator = (value: unknown, length: number) => {
  if (isEmpty(value))
    return true

  return String(value).length <= length || `El campo debe tener máximo ${length} caracteres`
}
// 👉 Length Min Validator
export const lengthMinValidator = (value: unknown, length: number) => {
  if (isEmpty(value))
    return true

  return String(value).length >= length || `El campo debe tener mínimo ${length} caracteres`
}

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value: unknown) => {
  if (isEmpty(value))
    return true

  const valueAsString = String(value)

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || 'Todos los caracteres no son válidos'
}


export const validarCampoNumerico = (value: unknown) => {
  if (isNaN(value) || value < 0 || value > 9.99) {
    return "El campo debe tener mínimo un valor de  9.99"; // el valor no es numérico o está fuera de rango
  }
  return
}

export const validateMinimumCharacters = (value: unknown, min: number = 0) => {
  if (isEmpty(value))
    return true

  if (value <= min) {
    return "El campo debe ser mayor a " + min;
  }
  return false
}

export const soloNumeros = (e: KeyboardEvent) => {
  let char = e.key; // Get the character
  if (/^[+0123456789-]+$/.test(char)) return true;
  // Match with regex
  else {
    e.preventDefault(); // If not match, don't add to input text
  }
}

export const num_miles = (num: unknown = 0): string => {
  // Convierte `num` a un número, si es necesario.
  if (typeof num === "string" && num.includes(",")) {
    // Si `num` es una cadena de texto con separador decimal como `,`, reemplaza la coma con un punto.
    num = num.replace(",", ".");
  }
  num = Number(num);
  if (isNaN(num)) {
    num = 0;
  }

  // Formatea el número con separadores de miles y decimales.
  const str = Math.abs(num).toFixed(2).replace(".", ",");
  const parts = str.split(",");
  let integerPart = parts[0];
  const decimalPart = parts[1];
  let formatted = "";
  let count = 0;
  for (let i = integerPart.length - 1; i >= 0; i--) {
    if (count === 3) {
      formatted = "." + formatted;
      count = 0;
    }
    formatted = integerPart[i] + formatted;
    count++;
  }

  // Agrega un signo "-" si el número es negativo.
  if (num < 0) {
    formatted = "-" + formatted;
  }

  return formatted;
};


export const validarInputNumerosMiles = (num: unknown = 0): string => {
  // Convierte `num` a una cadena de texto, si es necesario.
  let str = num.toString();
  // Separa la cadena en partes entera y decimal.
  const parts = str.split(",");
  let integerPart = parts[0];
  let decimalPart = "";
  if (parts.length > 1) {
    decimalPart = "," + parts[1];
  }
  // Quita los separadores de miles de la parte entera.
  integerPart = integerPart.replace(/\./g, "");
  // Convierte la parte entera a un número.
  let numIntegerPart = Number(integerPart);
  if (isNaN(numIntegerPart)) {
    numIntegerPart = 0;
  }
  // Formatea el número con separadores de miles.
  const formatted = numIntegerPart.toLocaleString("es-ES");
  return formatted + decimalPart;
};

export const validarDateBeetwen = (dateValue: string, dateInit: string, dateFin: string): string | boolean => {
  let d1 = moment(dateInit);
  let d2 = moment(dateFin);
  let d3 = moment(dateValue);
  const validate = d3.isBetween(d1, d2, null, "[]");
  if (validate) return true;
  else return `Este campo tiene que ser despues de ${d1.format('YYYY-MM-DD')} y hasta ${d2.format('YYYY-MM-DD')}`;
};
export const validarDateBeforeOrSame = (dateValue: string, dateInit: string): string | boolean => {
  let d1 = moment(dateInit);
  let d2 = moment(dateValue);
  const validate = d1.isSameOrBefore(d2);
  if (validate) return true;
  else return `Este campo tiene que ser despues o igual de ${d1.format('YYYY-MM-DD')}`;
};
export const validarDateAfterOrSame = (dateValue: string, dateInit: string): string | boolean => {
  let d1 = moment(dateInit);
  let d2 = moment(dateValue);
  const validate = d1.isSameOrAfter(d2);
  if (validate) return true;
  else return `Este campo tiene que ser antes o igual de ${d1.format('YYYY-MM-DD')}`;
};


export const limitText = (text: string, max_chars: number) => {
  let limite_text = text;
  let limite;

  if (!isEmpty(text)) {
    if (limite_text.length > max_chars) {
      limite = limite_text.substr(0, max_chars) + " ...";
      return limite
    }
  }
  return limite_text;
}
