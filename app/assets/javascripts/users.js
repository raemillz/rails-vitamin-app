$(document).ready(function(){
  $("a.load_packs").on("click", function(e){
    $.get(this.href).done(function(response){
      $("div.packs").html(response)
    })
    e.preventDefault();
  })
})
