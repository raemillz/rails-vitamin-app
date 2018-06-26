function VitaminPack(pack) {
  this.id = pack.id;
  this.name = pack.name;
  this.user = pack.user;
  this.userId = pack.user_id
  this.vitamins = pack.vitamins;
  this.vitaminCount = pack.vitamin_count
};

VitaminPack.prototype.showPageLink = function(text) {
  let output =
    `<a
      href="/user/${ this.userId }/vitamin_packs/${this.id}"
      class="js-packs-show"
      id="pack-${this.id}">
      ${text}
    </a>`;
  return output;
}

VitaminPack.prototype.editPageLink = function() {
  let output =
  `<a
    class="btn btn-secondary"
    href="/vitamin_packs/${this.id}/edit"
    class="edit_vitamin_pack"> Edit
  </a>`;
  return output;
}

VitaminPack.prototype.deleteLink = function() {
  let output =
  `<a
    class="btn btn-danger"
    data-confirm="Are you sure you really want to delete this vitamin pack?"
    rel="nofollow"
    data-method="delete"
    href="/vitamin_packs/${this.id}"> Delete
  </a>`;
  return output;
}

VitaminPack.prototype.vitaminListLink = function() {
  let output = `<a href="/vitamin_packs/${this.id}/vitamin_list"
    class="js-packs-vitamin-list">`;
      if ( this.vitaminCount === 1 ) {
        output += "1 vitamin";
      } else {
        output += this.vitaminCount + ' vitamins';
    }
  output += '</a>';
  return output;
}

var buildVitaminPackHeaders = function() {
  let output =
  `<h1> Vitamin Packs </h1>
    <div class="row align-items-center">
      <div class="align-items-center col-lg-6 order-lg-1 hidden-xs">
        <h3>Name</h3>
      </div>
      <div class="align-items-center col-lg-6 order-lg-2 hidden-xs">
        <h3>Vitamins</h3>
      </div>
    </div>`;
  return output;
}

VitaminPack.prototype.buildVitaminPackRow = function() {
  let output =
  `<div class="pack row center text-center">
    <div class="col-lg-6 center text-center">
      <h4> ${this.showPageLink(this.name)} </h4>
      <p> ${this.editPageLink()} ${this.deleteLink()} </p>
    </div>
    <div class="col-lg-6 center text-center">
      <p> ${this.vitaminListLink()} </p>
    </div>
  </div>`;

  return output;
}

VitaminPack.prototype.buildVitaminPack = function(options) {
  let output = '';
  if (options && options.skipIndexLink === true ) {
    output = '';
  } else {
    output += '<h6 class="f2 normal"><a class="js-packs-index" href="/vitamin_packs"><span style="position:relative; top:-0.1rem">&larr;</span> All Vitamin Packs</a></h6>';
    }
    output += `<h1>Vitamin Pack</h1>
    <h2> ${this.name} </h2>
    <p> ${this.editPageLink()} ${this.deleteLink()} </p>
    <h2>Vitamins:</h2>`;
    $.each(this.vitamins, function(index, value){
      output +=
      `<div class="vitamin">
        <h4> <a href="/vitamins/${value.id}"> ${value.name} </a> </h4>
        <a href="/vitamins/${value.id}edit"> Edit </a>,
        <a data-confirm="Are you sure you want to delete this vitamin?" rel="nofollow" data-method="delete" href="/vitamins/${value.id}">Delete</a>
        </div>`;
    });
    return output;
}

VitaminPack.prototype.buildVitaminList = function() {
  let output =
  `<h6 class="f2 normal">
    <a class="js-packs-index" href="/vitamin_packs">
    <span style="position:relative; top:-0.1rem">&larr;</span>
    All Vitamin Packs</a>
  </h6>
  <h3>Vitamin Pack</h3>
  <h5>
  <a href="/vitamin_packs/${this.id}"
    class="js-pack-show"
    id="pack-${this.id}">${this.name}</a>
  </h5>
  <h3>Vitamins</h3>
  <div>`;
  $.each(this.vitamins, function(index, value){
    output += `<p> <a href="/vitamins/${value.id}"> ${value.name} </a> </p>`;
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
    const packs = data.sort(function(a, b){
      return a.vitamin_count - b.vitamin_count;
    })
    let vitaminPacks = buildVitaminPackHeaders();
    vitaminPacks += '<div class="packs">';
      $.each(packs, function(index, value){

        let vitaminPack = new VitaminPack(value);
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
