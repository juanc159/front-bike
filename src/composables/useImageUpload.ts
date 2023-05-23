import { ref, watch } from "vue";
import Swal from "sweetalert2";

export function useImageUpload() {
  const imageFile = ref<File | null>(null);
  const imageUrl = ref<string | null | ArrayBuffer>(null);
  const key = ref<number>(1);
  const name = ref<string| null>(null);
  const allowedExtensions = ref<Array<string>>([]);

  function handleImageSelected() {
    //--------------------------------------------------------------------------------------------
    // Validacion tamaño del archivo
    //--------------------------------------------------------------------------------------------
    var siezekiloByte = parseInt(event.target.files[0].size / 1024);
    if (siezekiloByte > 3000) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe registrar máximo 3MB",
        customClass: {
          container: 'my-swal'
        }
      });
      clearData();
      return false;
    }

    //--------------------------------------------------------------------------------------------
    // Validacion del tipo de archivo
    //--------------------------------------------------------------------------------------------
    const extensionArchivo = event.target.files[0].name
      .split(".")
      .pop()
      ?.toLowerCase();
    if (allowedExtensions.value.length > 0 && !allowedExtensions.value.includes(extensionArchivo)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Solo se admite archivos con extensiónes: ${allowedExtensions.value.join(
          ", ",
        )}`,
        customClass: {
          container: 'my-swal'
        }
      });
      clearData();
      return false;
    }

    if (event.target.files.length === 0) {
      clearData();
      return false;
    }

    imageFile.value = event.target.files[0];
    return true;
  }

  watch(imageFile, (imageFile) => {
    if (!(imageFile instanceof File)) return;

    const fileReader = new FileReader();

    fileReader.readAsDataURL(imageFile);

    fileReader.addEventListener("load", () => {
      imageUrl.value = fileReader.result;

      // console.log('imageUrl.value', imageUrl.value)
    });
  });

  function clearData(){
    imageFile.value = null;
    imageUrl.value = null;
    name.value = null;
    key.value++;
  }

  return {
    imageFile,
    imageUrl,
    handleImageSelected,
    key,
    allowedExtensions,
    clearData,
    name
  };
}
