$(function () {
  $('form').submit(function(event) {
    //prevent form from submitting the default way
    event.preventDefault();

    var values = $(this).serialize();
    var posting = $.post('/vitamins', values);
    posting.done(function(data) {

      var vitamin = data;
      $("#vitaminName").text(vitamin["name"]);
      $("#vitaminCapsuleAmount").text(vitamin["capsule_amount"]);
      vitamin["benefits"].forEach(function(data){
          $("#vitaminBenefits").text(data.id);
      })
    });
  });
});
