// ############## WORKS, NOT IDEAL ############### //
// $(document).on ("turbolinks:load", function(){
//   $("a.new_vitamin").on("click", function(e){
//     $.get(this.href).done(function(response){
//       $("div.vitaminForm").html(response)
//     })
//     e.preventDefault();
//   })
// })
//
//
// $(function () {
//   $('form').submit(function(event) {
//     //prevent form from submitting the default way
//     event.preventDefault();
//
//     var values = $(this).serialize();
//     var posting = $.post('/vitamins', values);
//     posting.done(function(data) {
//
//       var vitamin = data;
//       $("#vitaminName").text('Vitamin: ' + vitamin['name']);
//       $("#vitaminCapsuleAmount").text('Dosage: ' + vitamin["capsule_amount"]);
//       var benefits = vitamin["benefits"];
//       var benefitList = "";
//       benefits.forEach(function(benefit) {
//         benefitList += '<li class="js-benefit" data-id="' + benefit["id"] + '">' + 'Benefit ID: '+ benefit["id"] + '</li>';
//       });
//       $("#vitaminBenefits").html(benefitList);
//     });
//   });
// });
// ################################################################################### //

var Vitamin = function(vitamin) {
  this.id = vitamin.id;
  this.name = vitamin.name;
  this.benefits = vitamin.benefits;
  this.vitaminBenefitCount = vitamin.vitamin_benefit_count
};

Vitamin.prototype.showPageLink = function(text) {
  var output = '<a href="/vitamins/' + this.id + '" class="js-vitamins-show" id="vitamin-' + this.id + '">';
    output += text;
  output += '</a>';
  return output;
}

Vitamin.prototype.editPageLink = function() {
  var output = '<a class="btn btn-secondary" href="/vitamins/' + this.id + '/edit">';
    output += "Edit";
  output += '</a>';
  return output;
}

Vitamin.prototype.deleteLink = function() {
  var output = '<a class="btn btn-danger" data-confirm="Are you sure you really want to delete this vitamin?" rel="nofollow" data-method="delete" href="/vitamins/' + this.id + '">';
    output += "Delete";
  output += '</a>';
  return output;
}

Vitamin.prototype.benefitListLink = function() {
  var output = '<a href="/vitamins/' + this.id + '/benefit_list" class="js-vitamins-benefit-list">';
    if ( this.benefitCount === 1 ) {
      output += "1 benefit";
    } else {
      output += this.benefitCount + ' benefits';
    }
  output += '</a>';
  return output;
}


// Vitamin.prototype.addVitaminButton = function() {
//   var output = '<a class="btn btn-primary" href="/vitamin_pack/' + this.id + '/vitamins/new">Add Appointment</a>';
//   return output;
// }

var buildVitaminHeaders = function() {
  var output = '<h1>';
    output += 'Vitamins <a href="vitamins/new">+ New</a>';
  output += '</h1>';
  output += '<div class="row">';
    output += '<div class="col-sm-3 hidden-xs">';
      output += '<h3>Name</h3>';
    output += '</div>';
    output += '<div class="col-sm-3 hidden-xs">';
      output += '<h3>Benefits</h3>';
    output += '</div>';
  output += '</div>';
  return output;
}

Vitamin.prototype.buildVitaminRow = function() {
  var output = '<div class="vitamin row">';
    output += '<div class="col-sm-3">';
      output += '<h4>';
        output += this.showPageLink(this.name);
      output += '</h4>';
      output += '<p>';
        output += this.editPageLink();
        output += this.deleteLink();
      output += '</p>';
    output += '</div>';
    output += '<div class="col-sm-3">';
      output += '<p>' + this.benefitListLink() + '</p>';
    output += '</div>';
    // output += '<div class="col-sm-3">';
    //   output += '<p>' + this.addVitaminButton() + '</p>';
    // output += '</div>';
  output += '</div>';
  return output;
}

Vitamin.prototype.buildVitamin = function(options) {
  var output = '';
  if (options && options.skipIndexLink === true ) {
    output = '';
  } else {
    output += '<h6 class="f2 normal"><a class="js-vitamins-index" href="/vitamins"><span style="position:relative; top:-0.1rem">&larr;</span> All Vitamins </a></h6>';
  }
  output += '<h1>Vitamin</h1>';
  output += '<h2>' + this.name + '</h2>';
  output += '<p>';
    output += this.editPageLink();
    output += this.deleteLink();
  output += '</p>';
  output += '<h1>Benefits <a href="/vitamins/' + this.id + '/benefits/new">+ New</a></h1>';
  $.each(this.benefits, function(index, value){
    output += '<div class="benefit">';
      output += '<h4>';
        output += '<a href="/benefits/' + value.id + '">' + value.name + '</a>';
      output += '</h4>';
      output += '<a href="/benefits/' + value.id + 'edit">Edit</a>';
      output += ', <a data-confirm="Are you sure you want to delete this benefit?" rel="nofollow" data-method="delete" href="/benefits/' + value.id + '">Delete</a>';
    output += '</div>';
  });
  return output;
}

Vitamin.prototype.buildBenefitList = function() {
  var output = '<h6 class="f2 normal"><a class="js-vitamins-index" href="/vitamins"><span style="position:relative; top:-0.1rem">&larr;</span> All Vitamins</a></h6>';
  output += '<h3>Vitamin</h3>';
  output += '<h5>';
    output += '<a href="/vitamins/' + this.id + '" class="js-vitamin-show" id="vitamin-' + this.id + '">' + this.name + '</a>';
  output += '</h5>';
  output += '<h3>Benefits</h3>';
  output += '<ul>';
    $.each(this.benefits, function(index, value){
      output += '<li>';
        output += '<a href="/benefits/' + value.id + '">' + value.name + '</a>';
      output += '</li>';
    });
  output += '</ul>';
  return output;
}

///////////////////////////
// Event Listeners
///////////////////////////

var attachListeners = function() {
  $(document).on ("turbolinks:load", function(){
    $('.js-vitamins-show').on('click', function(event){
      event.preventDefault();
      var id = $(this).attr('id').split('-')[1];
      getVitamin(id);
    });
    $(document).on('click', '.js-vitamins-index', function(event){
      event.preventDefault();
      getVitamins();
    });
    $(document).on('click', '.js-vitamins-benefit-list', function(event){
      event.preventDefault();
      var id = $(this).attr('href').split('/')[2];
      getBenefitList(id);
    })
    $(document).on('submit', 'form#new_vitamin', function(event){
      event.preventDefault();

      var values = $(this).serialize();

      createVitamin(values);
    });

    $(document).on('submit', '.edit_vitamin', function(event){
      event.preventDefault();
      var values = $(this).serialize();
      var id = $(this).attr('id').split('_')[3];
      updateVitamin(id, values);
    });
  });
}

$(function(){
  attachListeners();
})

///////////////////////////
// AJAX Calls
///////////////////////////

var getVitamins = function (){
  $.get('/vitamins.json').done(function(data){
    var vitamins = buildVitaminHeaders();
    vitamins += '<div class="vitamins">';
      $.each(data, function(index, value){
        var vitamin = new Vitamin(data[index]);
        vitamins += vitamin.buildVitaminRow();
      });
    vitamins += '</div>';
    $('.main').html(vitamins);
  });
}

var getVitamin = function(id) {
  $.get('/vitamins/'+ id + '.json').done(function(data){
    var vitamin = new Vitamin(data);
    var html = location.buildVitamin();
    $('.main').html(html);
  });
}

var getBenefitList = function(id) {
  $.get('/vitamins/'+ id + '.json').done(function(data){
    var vitamin = new Vitamin(data);
    html = vitamin.buildBenefitList();
    $('.main').html(html);
  });
}

var createVitamin = function(values) {
  $.ajax({
    url: '/vitamins.json',
    type: 'POST',
    data: values,
    dataType: 'JSON',
    success: function(data) {
      var vitamin = new Vitamin(data);
      var response = vitamin.buildVitamin({skipIndexLink: true});
      $('.main').html(response);
    }
  });
}

var updateVitamin = function(id, values) {
  var url = '/vitamins/' + id;
  $.ajax({
    url: url,
    type: 'PATCH',
    data: values,
    dataType: 'JSON',
    success: function(data) {
      var vitamin = new Vitamin(data);
      var response = vitamin.buildVitamin({skipIndexLink: true});
      $('.main').html(response);
    }
  });
}
