var VitaminPack = function(pack) {
  this.id = pack.id;
  this.name = pack.name;
  this.user = pack.user;
  this.user_id = pack.user_id
  this.vitamins = pack.vitamins;
  this.vitaminCount = pack.vitamin_count
};

VitaminPack.prototype.showPageLink = function(text) {
  let output = '<a href="/user/' + this.user_id + '/vitamin_packs/' + this.id + '" class="js-packs-show" id="pack-' + this.id + '">';
    output += text;
  output += '</a>';
  return output;
}

VitaminPack.prototype.editPageLink = function() {
  let output = '<a class="btn btn-secondary" href="/vitamin_packs/' + this.id + '/edit" class="edit_vitamin_pack">';
    output += "Edit";
  output += '</a>';
  return output;
}

VitaminPack.prototype.deleteLink = function() {
  let output = '<a class="btn btn-danger" data-confirm="Are you sure you really want to delete this vitamin pack?" rel="nofollow" data-method="delete" href="/vitamin_packs/' + this.id + '">';
    output += "Delete";
  output += '</a>';
  return output;
}

VitaminPack.prototype.vitaminListLink = function() {
  let output = '<a href="/vitamin_packs/' + this.id + '/vitamin_list" class="js-packs-vitamin-list">';
    if ( this.vitaminCount === 1 ) {
      output += "1 vitamin";
    } else {
      output += this.vitaminCount + ' vitamins';
    }
  output += '</a>';
  return output;
}

var buildVitaminPackHeaders = function() {
  let output = '<h1>';
    output += 'Vitamin Packs';
  output += '</h1>';
  output += '<div class="row align-items-center">';
    output += '<div class="align-items-center col-lg-6 order-lg-1 hidden-xs">';
      output += '<h3>Name</h3>';
    output += '</div>';
    output += '<div class="align-items-center col-lg-6 order-lg-2 hidden-xs">';
      output += '<h3>Vitamins</h3>';
    output += '</div>';
  output += '</div>';
  return output;
}

VitaminPack.prototype.buildVitaminPackRow = function() {
  let output = '<div class="pack row center text-center">';
    output += '<div class="col-lg-6 center text-center">';
      output += '<h4>';
        output += this.showPageLink(this.name);
      output += '</h4>';
      output += '<p>';
        output += this.editPageLink();
        output += this.deleteLink();
      output += '</p>';
    output += '</div>';
    output += '<div class="col-lg-6 center text-center">';
      output += '<p>' + this.vitaminListLink() + '</p>';
    output += '</div>';
  output += '</div>';
  return output;
}

VitaminPack.prototype.buildVitaminPack = function(options) {
  let output = '';
  if (options && options.skipIndexLink === true ) {
    output = '';
  } else {
    output += '<h6 class="f2 normal"><a class="js-packs-index" href="/vitamin_packs"><span style="position:relative; top:-0.1rem">&larr;</span> All Vitamin Packs</a></h6>';
  }
  output += '<h1>Vitamin Pack</h1>';
  output += '<h2>' + this.name + '</h2>';
  output += '<p>';
    output += this.editPageLink();
    output += this.deleteLink();
  output += '</p>';
  output += '<h2>Vitamins:</h2>'
  $.each(this.vitamins, function(index, value){
    output += '<div class="vitamin">';
      output += '<h4>';
        output += '<a href="/vitamins/' + value.id + '">' + value.name + '</a>';
      output += '</h4>';
      output += '<a href="/vitamins/' + value.id + 'edit">Edit</a>';
      output += ', <a data-confirm="Are you sure you want to delete this vitamin?" rel="nofollow" data-method="delete" href="/vitamins/' + value.id + '">Delete</a>';
    output += '</div>';
  });
  return output;
}

VitaminPack.prototype.buildVitaminList = function() {
  let output = '<h6 class="f2 normal"><a class="js-packs-index" href="/vitamin_packs"><span style="position:relative; top:-0.1rem">&larr;</span> All Vitamin Packs</a></h6>';
  output += '<h3>Vitamin Pack</h3>';
  output += '<h5>';
    output += '<a href="/vitamin_packs/' + this.id + '" class="js-pack-show" id="pack-' + this.id + '">' + this.name + '</a>';
  output += '</h5>';
  output += '<h3>Vitamins</h3>';
  output += '<div>';
    $.each(this.vitamins, function(index, value){
      output += '<p>';
        output += '<a href="/vitamins/' + value.id + '">' + value.name + '</a>';
      output += '</p>';
    });
  output += '</div>';
  return output;
}

///////////////////////////
// Event Listeners
///////////////////////////

$(document).on ("turbolinks:load", function(){

    $(document).on('click', '.js-packs-show', function(event){
      event.preventDefault();
      const id = $(this).attr('id').split('-')[1];
      getVitaminPack(id);
    });

    $(document).on('click', '.js-packs-index', function(event){
      event.preventDefault();
      getVitaminPacks();
    });

    $(document).on('click', '.js-packs-vitamin-list', function(event){
      event.preventDefault();
      const id = $(this).attr('href').split('/')[2];
      getVitaminList(id);
    })

    $(document).on('submit', 'form#new_vitamin_pack', function(event){
      event.preventDefault();

      const values = $(this).serialize();

      createVitaminPack(values);

    });

    $(document).on('submit', '.edit_vitamin_pack', function(event){
      event.preventDefault();
      const values = $(this).serialize();
      const id = $(this).attr('id').split('_')[3];
      updateVitaminPack(id, values);
    });
  });



///////////////////////////
// AJAX Calls
///////////////////////////

const getVitaminPacks = function (){
  $.get('/vitamin_packs.json').done(function(data){
    let vitaminPacks = buildVitaminPackHeaders();
    vitaminPacks += '<div class="packs">';
      $.each(data, function(index, value){
        let vitaminPack = new VitaminPack(data[index]);
        vitaminPacks += vitaminPack.buildVitaminPackRow();
      });
    vitaminPacks += '</div>';
    $('.main').html(vitaminPacks);
  });
}

const getVitaminPack = function(id) {
  $.get('/vitamin_packs/'+ id + '.json').done(function(data){
    const vitaminPack = new VitaminPack(data);
    const html = vitaminPack.buildVitaminPack();
    $('.main').html(html);
  });
}

const getVitaminList = function(id) {
  $.get('/vitamin_packs/'+ id + '.json').done(function(data){
    const vitaminPack = new VitaminPack(data);
    const html = vitaminPack.buildVitaminList();
    $('.main').html(html);
  });
}

const createVitaminPack = function(values) {
  $.ajax({
    url: '/vitamin_packs',
    type: 'POST',
    data: values,
    dataType: 'JSON',
    success: function(data) {
      const vitaminPack = new VitaminPack(data);
      const response = vitaminPack.buildVitaminPack({skipIndexLink: true});
      $('.form-main').html(response);
    }
  });
}

const updateVitaminPack = function(id, values) {
  const url = '/vitamin_packs/' + id;
  $.ajax({
    url: url,
    type: 'PATCH',
    data: values,
    dataType: 'JSON',
    success: function(data) {
      const vitaminPack = new VitaminPack(data);
      const response = vitaminPack.buildVitaminPack({skipIndexLink: true});
      $('.form-main').html(response);
    }
  });
}
