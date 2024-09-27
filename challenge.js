// criar um avaliador de senha forte ou fraca
// a senha precisa ter no mínimo 6 caracteres
// a senha precisa ter algum caracter numérico
// a senha precisa ter algum caracter especial ? $ @ # % ! *
// a senha NÃO precisa de um caracter maiúsculo, mas caso o tenha, é considerada senha forte
// fazer um algoritmo que determine a cada input do usuário o nível de segurança da senha:
// FORTE, OK, e FRACA
// a cada caracter digitado pelo usuário deve aparecer embaixo do input FORTE, OK ou FRACA

document.querySelectorAll("input").forEach((inp) => (inp.value = ""));

class PasswordChecker {
  password;
  counterPasswordStrong = 0;
  hasLetter = false;
  hasNumber = false;
  hasSpecialChar = false;
  isLenght6OrGreater = false;

  specialChar = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "¨",
    "&",
    "&",
    "*",
    "(",
    ")",
    "?",
    ".",
    "~",
  ];
  constructor(password) {
    this.password = password;
  }

  check(password) {
    const statusText = document.querySelector(".passwordStatus__text");

    this.hasLetter = false;
    this.hasNumber = false;
    this.isLenght6OrGreater = false;
    this.hasSpecialChar = false;
    this.counterPasswordStrong = 0;

    if (password.length >= 6) {
      this.counterPasswordStrong++;
      this.isLenght6OrGreater = true;
    }

    [...password].forEach((char) => {
      if (!Number(char) > 0 && !this.specialChar.includes(char)) {
        if (!this.hasLetter) {
          this.counterPasswordStrong++;
        }
        this.hasLetter = true;
      }
      if (this.specialChar.includes(char)) {
        if (!this.hasSpecialChar) {
          this.counterPasswordStrong++;
        }
        this.hasSpecialChar = true;
      }

      if (Number(char) >= 0 && char != " ") {
        if (!this.hasNumber) {
          this.counterPasswordStrong++;
        }
        this.hasNumber = true;
      }
    });

    const bar = document.querySelector(".barInner");
    bar.style.width = (100 * this.counterPasswordStrong) / 4 + "%";

    if (this.counterPasswordStrong === 4) {
      statusText.innerHTML = "FORTE";
      bar.classList.add("forte");
      bar.classList.remove("moderada");
      bar.classList.remove("fraca");
    } else if (this.counterPasswordStrong === 3) {
      statusText.innerHTML = "MODERADA";
      bar.classList.add("moderada");
      bar.classList.remove("forte");
      bar.classList.remove("fraca");
    } else {
      statusText.innerHTML = "FRACA";
      bar.classList.add("fraca");
      bar.classList.remove("forte");
      bar.classList.remove("moderada");
    }

    if (
      this.hasLetter &&
      this.hasNumber &&
      this.hasSpecialChar &&
      this.isLenght6OrGreater
    ) {
      console.log("---- SENHA FORTE ----");
    } else {
      this.hasLetter = false;
      this.hasNumber = false;
      this.isLenght6OrGreater = false;
      this.hasSpecialChar = false;
      this.counterPasswordStrong = 0;
    }
  }
}

const passwordChecker = new PasswordChecker();
