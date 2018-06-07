$(document).ready(function(){
  $("a.vitamins_packs").on("click", function(e){
    $.get(this.href).done(function(response){
      $("div.vitamins").html(response)
    })
    e.preventDefault();
  })
})
