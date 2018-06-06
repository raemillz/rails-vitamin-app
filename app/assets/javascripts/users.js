$(function(){
  $("a.load_packs").on("click", function(e){
    $.ajax({
      method: "GET",
      url: this.href
    }).success(function(response){
      $("div.packs").html(response)
    });
    e.preventDefault();
  })
})
