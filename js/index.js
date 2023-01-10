const BASE_VIEW_URL = `${BASE_URL}/664/views`;
const viewList = document.querySelector('.js-view-list');

function getLoggedID() {
  return localStorage.getItem('userId') || 0;
}
function renderPosts() {
  const url = `${BASE_VIEW_URL}`;
  axios
    .get(url)
    .then(function (response) {
      console.log('GET-Posts:::', JSON.stringify(response, null, 2));
      if (response.status === 200) {
        const viewsData = response.data;
        renderString(viewsData);
      }
    })
    .catch(function (error) {
      console.log('error:::', JSON.stringify(error, null, 2));
    });
}
function renderString(viewsData){
  let template = "";
        viewsData.forEach(function (item) {
          template += `
            <li
              data-id='${item.id}'
              class="col-sm-6 col-lg-4 mb-4"
            >
              <div class="card">
                <img src="${item.images}" class="card-img-top">
                <section class="card-body">
                  <div class="d-flex justify-content-end align-items-center p-0">
                    <a href="./view.html?viewId=${item.id}" class="pe-auto">延伸閱讀</a>
                  </div>
                  <h3 class="card-title  text-truncate">
                    ${item.name}
                  </h3>
                  <article class="card-text  text-truncate">
                    ${item.content}
                  </article>
                </section>
              </div>
            </li>
          `;
        });
    viewList.innerHTML = template;
}
function init() {
  renderPosts();
}
init();