const SIGNUP_URL = `${BASE_URL}/signup`;
const btnSignup = document.querySelector(".js-btn-signup");
const form = document.querySelector(".js-form-signup");

function saveUserToLocal({ accessToken, user }) {
  localStorage.setItem("token", accessToken);
  localStorage.setItem("userId", user.id);
  localStorage.setItem("userName", user.nickname);
}

function signup() {
  const url = `${SIGNUP_URL}`;
  const data = {
    email: form.email.value.trim(),
    password: form.password.value.trim(),
    nickname: "user",
  };

  const hasInput = data.email && data.password;
  if (hasInput) {
    return axios
      .post(url, data)
      .then(function (response) {
        console.log("signup:::", JSON.stringify(response, null, 2));
        if (response.status === 201) {
          saveUserToLocal(response.data);
          window.location.replace("/login.html");
        }
      })
      .catch(function (error) {
        console.log("error:::", JSON.stringify(error, null, 2));
      });
  }
}
btnSignup.addEventListener("click", () => signup());
