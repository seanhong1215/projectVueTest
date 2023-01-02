const LOGIN_URL = `${BASE_URL}/login`;
const btnLogin = document.querySelector('.js-btn-login');
const form = document.querySelector('.js-form-login');

function saveUserToLocal({ accessToken, user }) {
  localStorage.setItem('token', accessToken);
  localStorage.setItem('userId', user.id);
  localStorage.setItem('userName', user.nickname);
}

function login() {
  const url = `${LOGIN_URL}`;
  const data = {
    email: form.email.value.trim(),
    password: form.password.value.trim(),
    nickname: "user"
  };

  const hasInput = data.email && data.password;
  if (hasInput) {
    return axios
      .post(url, data)
      .then(function (response) {
        if (response.status === 200) {
          saveUserToLocal(response.data);
          let redirectPath = '/';
          const isAdmin = response.data?.user?.role === 'admin';
          if (isAdmin) {
            redirectPath = 'admin/desk.html';
          }
          setTimeout(() => {
            window.location.replace(redirectPath);
          }, 150);
        }
      })
      .catch(function (error) {
        console.log('error:::', JSON.stringify(error, null, 2));
      });
  }
}

function templateUserMenu(nickname) {
  nickname = 'Hello!'
  return `
    <li class="nav-item dropdown">
      <div>
        <a
          href="#"
          class="nav-link d-flex align-items-center"
          role="button"
        >
          <strong class="d-none d-sm-block ms-1 px-1">
            ${nickname}
          </strong>
        </a>
      </div>
    </li>
  `;
}
function localLoginChecker() {
  const localJWT = localStorage.getItem('token');
  if (localJWT) {
    const nickname = localStorage.getItem('nickname');
    btnUserMenu.innerHTML = templateUserMenu(nickname);
  }
}
function init() {
  localLoginChecker();
}
init();
btnLogin.addEventListener('click', () => login());
