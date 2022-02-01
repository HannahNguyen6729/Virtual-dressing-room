$(document).ready(() => {
  let callData = new CallData();
  let chosenList = new ChosenList();

  function renderHTML() {
    callData
      .getDataList()
      .done((res) => {
        console.log(res);
        let navPillList = res.navPills;
        renderNavPills(navPillList);
        renderTabPane(res);
      })
      .fail((err) => console.log(err));
  }
  renderHTML();

  //function render navPills
  function renderNavPills(list) {
    let content = "";
    let activeClass = "";

    content = list.map((item, index) => {
      activeClass = item.tabName == "tabTopClothes" ? "active" : "";
      let li = `<li class="nav-item">
              <a
                class="nav-link btn-default ${activeClass}"
                data-toggle="pill"
                href="#${item.tabName}"
                >${item.showName}</a
              >
            </li>
        `;
      return li;
    });
    $(".nav-pills").html(content);
  }

  //function render tabPane
  function renderTabPane(res) {
    let contentNavPane = "";
    let fadeClass = "";
    let navList = res.navPills;

    navList.forEach((item, index) => {
      fadeClass = item.tabName === "tabTopClothes" ? "active" : "fade";
      contentNavPane += `
        <div class="tab-pane container ${fadeClass}" id="${item.tabName}">
            <div class="row">
                ${renderTabPaneContent(item.tabName, res.tabPanes)}
            </div>
        </div>
      `;
    });
    $(".tab-content").html(contentNavPane);
  }

  //function render tabPaneContent
  function renderTabPaneContent(tabName, tabPaneList) {
    let content = "";
    switch (tabName) {
      case "tabTopClothes":
        tabPaneList.forEach((item, index) => {
          if (item.type === "topclothes") {
            content += renderImg(item);
          }
        });
        return content;
      case "tabBotClothes":
        tabPaneList.forEach((item, index) => {
          if (item.type === "botclothes") {
            content += renderImg(item);
          }
        });
        return content;
      case "tabShoes":
        tabPaneList.forEach((item, index) => {
          if (item.type === "shoes") {
            content += renderImg(item);
          }
        });
        return content;
      case "tabHandBags":
        tabPaneList.forEach((item, index) => {
          if (item.type === "handbags") {
            content += renderImg(item);
          }
        });
        return content;
      case "tabNecklaces":
        tabPaneList.forEach((item, index) => {
          if (item.type === "necklaces") {
            content += renderImg(item);
          }
        });
        return content;
      case "tabHairStyle":
        tabPaneList.forEach((item, index) => {
          if (item.type === "hairstyle") {
            content += renderImg(item);
          }
        });
        return content;
      default:
        tabPaneList.forEach((item, index) => {
          if (item.type === "background") {
            content += renderImg(item);
          }
        });
        return content;
    }
  }
  //function renderImg
  function renderImg(item) {
    let content = "";
    content = `
                    <div class="col-md-3">
                      <div class="card text-center">
                        <img
                          src="${item.imgSrc_jpg}"
                        />
                        <h4><b>${item.name}</b></h4>
                        <button 
                          data-id=${item.id}
                          data-type=${item.type}
                          data-name=${item.name}
                          data-desc=${item.desc}
                          data-imgjpg=${item.imgSrc_jpg}
                          data-imgpng=${item.imgSrc_png}
                          class = "changeStyle"
                          >Try on</button>
                      </div>
                    </div>
                `;
    return content;
  }
  //try on clothes/ handle click
  $("body").delegate(".changeStyle", "click", function () {
    let type = $(this).data("type");
    let id = $(this).data("id");
    let name = $(this).data("name");
    let desc = $(this).data("desc");
    let imgjpg = $(this).data("imgjpg");
    let imgpng = $(this).data("imgpng");

    let chosenItem = new ChosenItem(id, type, name, desc, imgjpg, imgpng);

    let index = findIndex(chosenItem.type);
    if (index !== -1) {
      //update array
      chosenList.list[index] = chosenItem;
    } else {
      //add item
      chosenList.addItem(chosenItem);
    }
    console.log(chosenList);
    renderContain(chosenList.list);
  });
  function findIndex(type) {
    let index = -1; //can't find the item in the chosenList
    if (chosenList.list && chosenList.list.length > 0) {
      chosenList.list.forEach((item, i) => {
        if (item.type === type) {
          index = i;
        }
      });
    }
    return index;
  }
  //try on clothes/ render model body
  function renderContain(list) {
    if (list.length > 0) {
      list.forEach((item) => {
        if (item.type === "topclothes") {
          $(".bikinitop").css({
            width: "500px",
            height: "500px",
            background: `url(${item.imgpng})`,
            position: "absolute",
            top: "-9%",
            left: "-5%",
            zIndex: "3",
            transform: "scale(0.5)",
          });
        }
        if (item.type === "botclothes") {
          $(".bikinibottom").css({
            width: "500px",
            height: "1000px",
            background: `url(${item.imgpng})`,
            position: "absolute",
            top: "-30%",
            left: "-5%",
            zIndex: "2",
            transform: "scale(0.5)",
          });
        }
        if (item.type === "shoes") {
          $(".feet").css({
            width: "500px",
            height: "1000px",
            background: `url(${item.imgpng})`,
            position: "absolute",
            bottom: "-37%",
            right: "-3.5%",
            transform: "scale(0.5)",
            zIndex: "1",
          });
        }
        if (item.type === "handbags") {
          $(".handbag").css({
            width: "500px",
            height: "1000px",
            background: `url(${item.imgpng})`,
            position: "absolute",
            bottom: "-40%",
            right: "-3.5%",
            transform: "scale(0.5)",
            zIndex: "4",
          });
        }
        if (item.type === "necklaces") {
          $(".necklace").css({
            width: "500px",
            height: "1000px",
            background: `url(${item.imgpng})`,
            position: "absolute",
            bottom: "-40%",
            right: "-3.5%",
            transform: "scale(0.5)",
            zIndex: "4",
          });
        }
        if (item.type === "hairstyle") {
          $(".hairstyle").css({
            width: "1000px",
            height: "1000px",
            background: `url(${item.imgpng})`,
            position: "absolute",
            top: "-75%",
            right: "-57%",
            transform: "scale(0.15)",
            zIndex: "4",
          });
        }
        if (item.type === "background") {
          $(".background").css({
            backgroundImage: `url(${item.imgpng})`,
          });
        }
      });
    }
  }
});
