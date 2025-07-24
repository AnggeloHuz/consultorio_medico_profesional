import Swal from "sweetalert2";

export function alertError (message) {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      confirmButtonColor: "#2c5282"
    });
}

export function alertInfo (message) {
    Swal.fire({
      title: "Atento",
      text: message,
      icon: "info",
      confirmButtonColor: "#2c5282"
    });
}

export function alertSuccess (message) {
    Swal.fire({
      title: "Éxito",
      text: message,
      icon: "success",
      confirmButtonColor: "#2c5282"
    });
}

new Promise((resolve, reject) => {
  
})

export function alertConfirm(message, messageCancel, messageConfirm) {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: message,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `Cancelar`,
      confirmButtonColor: "#2c5282"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        return resolve(true);
      } else if (result.isDenied) {
        Swal.fire("Ten cuidado!", messageCancel, "info");
        return resolve(false);
      }
    });
  });
}
