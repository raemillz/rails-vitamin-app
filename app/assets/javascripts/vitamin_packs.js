
$(function(){
  $('#new_pack').submit(function(e){
    e.preventDefault();
    let values = $(this).serialize();
    let posting = $.post(this.action, values)
      posting.done(data => {
        let newPack = new Pack(data.id, data.user_id, data.name)
        $("#packTable tbody").append(newPack.renderPack());
      })
    $("#pack_content").val(" ");
  })
});

class Pack {
  constructor(id, user_id, name){
    this.id = id;
    this.user_id = user_id;
    this.name = name;
  }
  renderPack() {
    return `<tr><td>${this.name}</td><td>${this.id}</td><th><a href="/vitamin_packs/${this.id}/edit">edit vitamin pack</a></th></tr>`;
  }
}
