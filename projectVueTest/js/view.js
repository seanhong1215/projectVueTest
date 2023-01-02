const BASE_VIEW_URL = `${BASE_URL}/664/views`;
const BOOKMARKS_URL = `${BASE_URL}/600/bookmarks`;
const USERS_URL = `${BASE_URL}/600/users`;

const domPostList = document.querySelector('.js-view-list');
const domState = document.querySelector('.js-bookmark-state');
const viewTitle =  document.querySelector('.view-title');
const viewContent =  document.querySelector('.view-content');
const btnAddBookmark = document.querySelector('.js-add-bookmarks');
const btnRemoveBookmark = document.querySelector('.js-remove-bookmarks');

let bookmarkId = 0;
function getLoggedID() {
  return localStorage.getItem('userId') || 0;
}
function renderBookmarkState() {
  const params = new URLSearchParams(document.location.search);
  const viewId = params.get('viewId') || 1;
  const userId = getLoggedID();
  const url = `${USERS_URL}/${userId}/bookmarks?viewId=${viewId}`;

  axios
    .get(url)
    .then(function (response) {
      if (response.data.length !== 0) {
        bookmarkId = response.data[0].id;

        domState.innerHTML = `                
            已收藏
        `;

        btnRemoveBookmark.style.display = 'block';
        btnAddBookmark.style.display = 'none';
      }

      if (response.data.length === 0) {
        domState.innerHTML = `                
            未收藏
        `;
        btnRemoveBookmark.style.display = 'none';
        btnAddBookmark.style.display = 'block';
      }
    })
    .catch(function (error) {
      console.log('error:::', JSON.stringify(error, null, 2));
    });
}

function removeBookmark() {
  const url = `${BOOKMARKS_URL}/${bookmarkId}`;
  axios
    .delete(url)
    .then(function (response) {
      if (response.status === 200) {
        renderBookmarkState();
      }
    })
    .catch(function (error) {
      console.log('error:::', JSON.stringify(error, null, 2));
    });
}

function addBookmark() {
  const params = new URLSearchParams(document.location.search);
  const viewId = params.get('viewId') || 1;
  const url = `${BASE_VIEW_URL}/${viewId}/bookmarks`;
  const data = {
    userId: getLoggedID(),
  };

  axios
    .post(url, data)
    .then(function (response) {
      if (response.status === 201) {
        renderBookmarkState();
      }
    })
    .catch(function (error) {
      console.log('error:::', JSON.stringify(error, null, 2));
    });
}

function renderPostInfo() {
  const params = new URLSearchParams(document.location.search);
  const viewId = params.get('viewId') || 1;
  const url = `${BASE_VIEW_URL}/${viewId}`;

  axios
    .get(url)
    .then(function (response) {
      if (response.status === 200) {
        domPostList.innerHTML = `
        <li><h2>${response.data.name}</h2></li>
        <li><img src="${response.data.images}"</li>`;
      }
    })
    .catch(function (error) {
      console.log('error:::', JSON.stringify(error, null, 2));
    });
}

function init() {
  renderPostInfo();

  const hasUserId = getLoggedID();

  if (hasUserId) {
    renderBookmarkState();
  }

  if (!hasUserId) {
    document.querySelector('.js-need-login').style.display = 'none';
  }
}
init();
btnAddBookmark.addEventListener('click', () => addBookmark());
btnRemoveBookmark.addEventListener('click', () => removeBookmark());