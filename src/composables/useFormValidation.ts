export function useFormValidation() {
  const exito = ref<boolean>(true);
  const errors = ref<Array<string>>([]);

  function validation(
    formulario: any = [],
    noValidation: Array<string> = [],
    clave = "",
    errorMessage: object = []
  ) {
    exito.value = true;
    for (const key in formulario) {
      errors.value[clave + key] = [];
      if (
        !noValidation.includes(key) &&
        (formulario[key] !== 0 || formulario[key] !== "0") &&
        !formulario[key]
      ) {
        exito.value = false;
        if (Object.values(errorMessage).length === 0)
          errors.value[clave + key].push(`* El campo ${key} es obligatorio`);
        else
          errors.value[clave + key].push(
            `* El campo ${errorMessage[key]} es obligatorio`
          );
      }
    }
  }

  function isNumber(e:any, texto:Array<string|number> = [''], cantidad:number = 20) {
    if (e.keyCode < 48 || e.keyCode > 57){
      e.returnValue = false;
      return false
    } 
    if (texto.length >= cantidad){
      e.preventDefault();
      return false
    } 

    // let char = String.fromCharCode(e.keyCode); // Get the character
    // if (/^[+0123456789-]+$/.test(char)) return true;
    // // Match with regex
    // else e.preventDefault(); // If not match, don't add to input text
  }

  function solotextoYcarateres(e:any, texto = [], cantidad:number = 20) {

    if (texto.length > cantidad) e.preventDefault();
    let char = String.fromCharCode(e.keyCode); // Get the character
    if (/^[A-Za-z\s]+$/.test(char))
        return true;
    else if (!/^[0-9]+$/.test(char))
        return true;
    else e.preventDefault(); // If not match, don't add to input text
  }

  return {
    validation,
    exito,
    errors,
    isNumber,
    solotextoYcarateres,
  };
}
