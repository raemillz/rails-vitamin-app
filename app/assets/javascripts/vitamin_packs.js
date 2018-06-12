///////////LOAD VITAMINS /////////////////////
/////////////////// Previous, working, but not ideal /////////////////////////
// $(document).ready(function(){
//   $("a.vitamin_packs").on("click", function(e){
//     $.get(this.href).done(function(response){
//       $("div.vitamins").html(response)
//     })
//     e.preventDefault();
//   })
// })

var VitaminPack = function(pack) {
  this.id = pack.id;
  this.name = pack.name;
  this.user = pack.user;
  this.vitamins = pack.vitamins;
  this.vitaminCount = pack.vitamin_count
};

VitaminPack.prototype.showPageLink = function(text) {
  var output = '<a href="/vitamin_packs/' + this.id + '" class="js-packs-show" id="pack-' + this.id + '">';
    output += text;
  output += '</a>';
  return output;
}

VitaminPack.prototype.editPageLink = function() {
  var output = '<a class="btn btn-secondary" href="/vitamin_packs/' + this.id + '/edit">';
    output += "Edit";
  output += '</a>';
  return output;
}

VitaminPack.prototype.deleteLink = function() {
  var output = '<a class="btn btn-danger" data-confirm="Are you sure you really want to delete this vitamin pack?" rel="nofollow" data-method="delete" href="/vitamin_packs/' + this.id + '">';
    output += "Delete";
  output += '</a>';
  return output;
}

VitaminPack.prototype.vitaminListLink = function() {
  var output = '<a href="/vitamin_packs/' + this.id + '/vitamin_list" class="js-packs-vitamin-list">';
    if ( this.vitaminCount === 1 ) {
      output += "1 vitamin";
    } else {
      output += this.vitaminCount + ' vitamins';
    }
  output += '</a>';
  return output;
}

Location.prototype.appointmentsLink = function() {
  var output = '';
  if ( this.appointmentCount === 1 ) {
    output += this.showPageLink("1 appointment");
  } else {
    var linkText = this.appointmentCount + " appointments";
    output += this.showPageLink(linkText);
  }
  return output;
}

Location.prototype.addAppointmentButton = function() {
  var output = '<a class="btn btn-primary" href="/locations/' + this.id + '/appointments/new">Add Appointment</a>';
  return output;
}

Location.prototype.showBusinessName = function() {
  var output = "";
  if ( this.businessName ) {
    output += '<p>' + this.businessName + '</p>';
  }
  return output;
}

Location.prototype.showStreetAddress = function() {
  var output = "";
  if (this.streetAddress !== "") {
    output += '<p>' + this.streetAddress + '</p>';
  }
  return output;
}

Location.prototype.showCityStateZip = function() {
  var output = "";
  if (this.city && this.state && this.zipcode) {
    output += '<p>' + this.city + ', ' + this.state + ' ' + this.zipcode + '</p>';
  }
  return output;
}

Location.prototype.buildAddress = function() {
  var output = "";
  output += this.showBusinessName();
  output += this.showStreetAddress();
  output += this.showCityStateZip();
  return output;
}

var buildLocationHeaders = function() {
  var output = '<h1>';
    output += 'Locations <a href="locations/new">+ New</a>';
  output += '</h1>';
  output += '<div class="row">';
    output += '<div class="col-sm-3 hidden-xs">';
      output += '<h3>Nickname</h3>';
    output += '</div>';
    output += '<div class="col-sm-3 hidden-xs">';
      output += '<h3>Address</h3>';
    output += '</div>';
    output += '<div class="col-sm-3 hidden-xs">';
      output += '<h3>Clients</h3>';
    output += '</div>';
    output += '<div class="col-sm-3 hidden-xs">';
      output += '<h3>Appointments</h3>';
    output += '</div>';
  output += '</div>';
  return output;
}

Location.prototype.buildLocationRow = function() {
  var output = '<div class="location row">';
    output += '<div class="col-sm-3">';
      output += '<h4>';
        output += this.showPageLink(this.nickname);
      output += '</h4>';
      output += '<p>';
        output += this.editPageLink();
        output += this.deleteLink();
      output += '</p>';
    output += '</div>';
    output += '<div class="col-sm-3">';
      output += this.buildAddress();
    output += '</div>';
    output += '<div class="col-sm-3">';
      output += '<p>' + this.clientListLink() + '</p>';
    output += '</div>';
    output += '<div class="col-sm-3">';
      output += '<p>' + this.appointmentsLink() + '</p>';
      output += '<p>' + this.addAppointmentButton() + '</p>';
    output += '</div>';
  output += '</div>';
  return output;
}

Location.prototype.buildLocation = function(options) {
  var output = '';
  if (options && options.skipIndexLink === true ) {
    output = '';
  } else {
    output += '<h6 class="f2 normal"><a class="js-locations-index" href="/locations"><span style="position:relative; top:-0.1rem">&larr;</span> All Locations</a></h6>';
  }
  output += '<h1>Location</h1>';
  output += '<h2>' + this.nickname + '</h2>';
  output += this.buildAddress();
  output += '<p>';
    output += this.editPageLink();
    output += this.deleteLink();
  output += '</p>';
  output += '<h1>Appointments <a href="/locations/' + this.id + '/appointments/new">+ New</a></h1>';
  $.each(this.appointments, function(index, value){
    output += '<div class="appointment">';
      output += '<h4>';
        output += '<a href="/appointments/' + value.id + '">' + value.client_name + '</a>';
        output += ", " + value.time_string;
      output += '</h4>';
      output += '<a href="/appointments/' + value.id + 'edit">Edit</a>';
      output += ', <a data-confirm="Are you sure you want to delete this appointment?" rel="nofollow" data-method="delete" href="/appointments/' + value.id + '">Delete</a>';
    output += '</div>';
  });
  return output;
}

Location.prototype.buildClientList = function() {
  var output = '<h6 class="f2 normal"><a class="js-locations-index" href="/locations"><span style="position:relative; top:-0.1rem">&larr;</span> All Locations</a></h6>';
  output += '<h1>Client List</h1>';
  output += '<h3>Location</h3>';
  output += '<h5>';
    output += '<a href="/locations/' + this.id + '" class="js-locations-show" id="location-' + this.id + '">' + this.nickname + '</a>';
  output += '</h5>';
  output += this.buildAddress();
  output += '<h3>Clients</h3>';
  output += '<ul>';
    $.each(this.clients, function(index, value){
      output += '<li>';
        output += '<a href="/clients/' + value.id + '">' + value.name + '</a>';
      output += '</li>';
    });
  output += '</ul>';
  return output;
}

///////////////////////////
// Event Listeners
///////////////////////////

var attachListeners = function() {
  $(document).on('click', '.js-locations-show', function(event){
    event.preventDefault();
    var id = $(this).attr('id').split('-')[1];
    getLocation(id);
  });
  $(document).on('click', '.js-locations-index', function(event){
    event.preventDefault();
    getLocations();
  });
  $(document).on('click', '.js-locations-client-list', function(event){
    event.preventDefault();
    var id = $(this).attr('href').split('/')[2];
    getClientList(id);
  })
  $(document).on('submit', 'form#new_location', function(event){
    event.preventDefault();

    var values = $(this).serialize();

    createLocation(values);
  });

  $(document).on('submit', '.edit_location', function(event){
    event.preventDefault();

    var values = $(this).serialize();
    var id = $(this).attr('id').split('_')[2];

    updateLocation(id, values);
  });
}
$(function(){
  attachListeners();
})

///////////////////////////
// AJAX Calls
///////////////////////////

var getLocations = function (){
  $.get('/locations.json').done(function(data){
    var locations = buildLocationHeaders();
    locations += '<div class="locations">';
      $.each(data, function(index, value){
        var location = new Location(data[index]);
        locations += location.buildLocationRow();
      });
    locations += '</div>';
    $('.main').html(locations);
  });
}

var getLocation = function(id) {
  $.get('/locations/'+ id + '.json').done(function(data){
    var location = new Location(data);
    var html = location.buildLocation();
    $('.main').html(html);
  });
}

var getClientList = function(id) {
  $.get('/locations/'+ id + '.json').done(function(data){
    var location = new Location(data);
    html = location.buildClientList();
    $('.main').html(html);
  });
}

var createLocation = function(values) {
  $.ajax({
    url: '/locations.json',
    type: 'POST',
    data: values,
    dataType: 'JSON',
    success: function(data) {
      var location = new Location(data);
      var response = location.buildLocation({skipIndexLink: true});
      $('.main').html(response);
    }
  });
}

var updateLocation = function(id, values) {
  var url = '/locations/' + id;
  $.ajax({
    url: url,
    type: 'PATCH',
    data: values,
    dataType: 'JSON',
    success: function(data) {
      var location = new Location(data);
      var response = location.buildLocation({skipIndexLink: true});
      $('.main').html(response);
    }
  });
}
