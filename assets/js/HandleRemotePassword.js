const PasswordButtons = document.querySelectorAll(
  ".input-buttons .number-button"
);
const CancelButton = document.querySelector("#cancel-button");
const PasswordInput = document.querySelector(".input-wrapper input");
const HandlePasswordData = (e) => {
  e.preventDefault();
  let PasswordLength = PasswordInput.value.length;

  if (PasswordLength < 6) {
    PasswordInput.value += e.target.textContent;
  }

  let ShowInputValue = document.querySelector(".input-value");

  ShowInputValue.textContent = "";

  for (let i = 0; i < PasswordInput.value.length; i++) {
    ShowInputValue.textContent += "*";
  }
};
CancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  PasswordInput.value = "";
});
PasswordButtons.forEach((EachPasswordButton) => {
  EachPasswordButton.addEventListener("click", HandlePasswordData);
});
