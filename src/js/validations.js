class validations {
  validateText = (text) => text.trim() !== "";
  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  validateUsername = (user) => {
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    return usernameRegex.test(user);
  };
  validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,128}$/;
    return passwordRegex.test(password);
  };
  validatePasswords = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return false;
    }
    return "Las contraseñas deben coincidir";
  };
  searchData = (array, value, key, setData) => {
    let newData = [];
    let nowData = [];
  
    array.forEach((item) => {
      item[key].toLowerCase().includes(value.toLowerCase())
        ? newData.push(item)
        : nowData.push(item);
    });
    setData(newData);
    return true
  }
}

const formValidation = new validations();
export default formValidation;
