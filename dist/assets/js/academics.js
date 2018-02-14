/* attached to jquery */
/* attached to Bootstrap.js */

//******ACCORDION TOGGLE - collapse/closed shows plus, and open shows minus

var $activePanelHeading = $(".panel-group .panel .panel-collapse.in")
  .prev()
  .addClass("active"); //add class="active" to panel-heading div above the "collapse in" (open) div
$activePanelHeading.find("a").prepend('<span class="fa fa-minus"></span> '); //put the minus-sign inside of the "a" tag
$(".panel-group .panel-heading")
  .not($activePanelHeading)
  .find("a")
  .prepend('<span class="fa fa-plus"></span> '); //if it's not active, it will put a plus-sign inside of the "a" tag
$(".panel-group").on("show.bs.collapse", function(e) {
  //event fires when "show" instance is called
  //$('.panel-group .panel-heading.active').removeClass('active').find('.fa').toggleClass('fa-plus fa-minus'); - removed so multiple can be open and have minus sign
  $(e.target)
    .prev()
    .addClass("active")
    .find(".fa")
    .toggleClass("fa-plus fa-minus");
});
$(".panel-group").on("hide.bs.collapse", function(e) {
  //event fires when "hide" method is called
  $(e.target)
    .prev()
    .removeClass("active")
    .find(".fa")
    .removeClass("fa-minus")
    .addClass("fa-plus");
});

var totalPage = 28;
var eachPages = 10;
var nowpage = 1;

function pageChk() {
  $(".pagination li").on("click", "a", function() {
    var id = $(this)
      .parent()
      .attr("id");

    switch (id) {
      case "pre_item":
        nowpage = nowpage - eachPages;
        break;
      case "next_item":
        nowpage = nowpage + eachPages;
        break;
      case "pre_page":
        nowpage = nowpage - 1;
        break;
      case "next_page":
        nowpage = nowpage + 1;
        break;
      default:
        nowpage = parseInt($(this).text());
        break;
    }
    setPagenation();
  });
}

pageChk();

function setPagenation() {
  if (nowpage <= 0) {
    nowpage = 1;
  } else if (totalPage < nowpage) {
    nowpage = totalPage;
  }
  var startPage = Math.floor((nowpage - 1) / eachPages);
  startPage = startPage * 10 + 1;
  console.log(nowpage, startPage);

  var html = "";
  html += '<li id="pre_item"><a href="#">&laquo;</a></li>';
  html += '<li id="pre_page"><a href="#"><</a></li>';

  if (nowpage + totalPage % eachPages > totalPage) {
    for (var i = startPage; i < startPage + totalPage % eachPages; i++) {
      html += '<li><a href="#">' + i + "</a></li>";
    }
  } else {
    console.log("totalPage > nowpage");
    for (var i = startPage; i < startPage + eachPages; i++) {
      html += '<li><a href="#">' + i + "</a></li>";
    }
  }
  html += '<li id="next_page"><a href="#">></a></li>';
  html += '<li id="next_item"><a href="#">&raquo;</a></li>';
  $(".pagination").html(html);

  $(".pagination li").each(function(i) {
    if ($(this).text() == nowpage) {
      $(this).addClass("active");
    }
  });
  pageChk();
  $("b").html(nowpage);
}
