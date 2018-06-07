$(function () {
  $('form').submit(function(event) {
    //prevent form from submitting the default way
    event.preventDefault();

    var values = $(this).serialize();
    var posting = $.post('/vitamins', values);
    posting.done(function(data) {

      var vitamin = data;
      $("#vitaminName").text('Vitamin: ' + vitamin['name']);
      $("#vitaminCapsuleAmount").text('Dosage: ' + vitamin["capsule_amount"]);
      var benefits = vitamin["benefits"];
      var benefitList = "";
      benefits.forEach(function(benefit) {
        benefitList += '<li class="js-benefit" data-id="' + benefit["id"] + '">' + 'Benefit ID: '+ benefit["id"] + '</li>';
      });
      $("#vitaminBenefits").html(benefitList);
    });
  });
});
