// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://vercel-vue-test-mu.vercel.app'
const btnUserMenu = document.querySelector('.js-user-menu');

function getLoggedID() {
  return localStorage.getItem('userId') || 0;
}

function templateOfUserMenu(user, template = '') {
  // console.log('me:::', JSON.stringify(user, null, 2));
  const isAdmin = user?.role === 'admin';
  if (isAdmin) {
    template = `
      <li class="nav-item">
        <div>
          <a href="/admin/desk.html" class="btn btn-sm text-white px-3 me-2">
            前往後台
          </a>
        </div>
      </li>

    `;
  }

  template += `
  <li class="nav-item">
  <div>
    <a href="/" class="btn btn-sm text-white px-3 me-2">
      首頁
    </a>
  </div>
</li>
    <li class="nav-item">
      <div>
        <a href="/favorites/bookmarks.html" class="btn btn-sm text-white px-3 me-2">
          收藏列表
        </a>
      </div>
    </li>

    <li class="nav-item">
      <div>
        <a href="#" class="btn btn-sm text-white px-3 me-2">
          Hello! ${user.nickname}
        </a>
      </div>
    </li>

    <li class="nav-item">
      <div>
        <a href="#" class="js-logout btn btn-sm text-white px-3 me-2">
          登出
        </a>
      </div>
    </li>
  `;

  return template;
}

function renderUserMenu() {
  const userId = getLoggedID();
  const url = `${BASE_URL}/600/users/${userId}`;
  axios
    .get(url)
    .then(function (response) {
      // console.log('GET-Me:::', JSON.stringify(response, null, 2));
      if (response.status === 200) {
        // console.log('OK!');
        document.querySelector('.js-guest-menu').innerHTML = '';
        btnUserMenu.innerHTML = templateOfUserMenu(response.data);
      }
    })
    .catch(function (error) {
      // console.log('error:::', JSON.stringify(error, null, 2));
      if (error?.response?.status === 401) {
        localStorage.clear();
      }
      domMsg.innerHTML = error?.response?.status || error;
    });
}

function logout(event) {
  const target = event.target;
  // console.log('target:::', target);
  const targetBtn = event.target.closest('.js-logout');
  // console.log('targetBtn:::', targetBtn);
  if (!targetBtn) {
    return;
  }
  localStorage.clear();
  setTimeout(() => {
    window.location.replace('/');
  }, 300);
}

function init() {
  // console.log('getLoggedID():::', getLoggedID());
  if (getLoggedID()) {
    const localToken = localStorage.getItem('token');
    const AUTH = `Bearer ${localToken}`;
    axios.defaults.headers.common.Authorization = AUTH;
    renderUserMenu();
  }
  btnUserMenu.addEventListener('click', (event) => logout(event));
}
init();
