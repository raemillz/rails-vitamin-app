$(document).ready(function(){
  $("a.load_packs").on("click", function(e){
    $.get(this.href).success(function(response){
      $("div.packs").html(response)
    })
  })
  //   $.ajax({
  //     method: "GET",
  //     url: this.href
  //   }).success(function(response){
  //     $("div.packs").html(response)
  //   });
  //   e.preventDefault();
  // })
})
