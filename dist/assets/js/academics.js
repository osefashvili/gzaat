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
