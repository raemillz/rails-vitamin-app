module VitaminPacksHelper

  def show_name(vitamin_pack)
    if current_page?(vitamin_pack_path(vitamin_pack))
      vitamin_pack.name
    else
      link_to vitamin_pack.name, vitamin_pack_path(vitamin_pack), class: "js-packs-show", id: "pack-#{vitamin_pack.id}"
    end
  end

  def edit_delete_links(vitamin_pack)
    output = [
      link_to("Edit", edit_vitamin_pack_path(vitamin_pack), class: "btn btn-secondary"),
      link_to("Delete", vitamin_pack, method: :delete, class: "btn btn-danger", data: { confirm: "Are you sure you really want to delete this vitamin pack?" })
    ]
    safe_join(output)
  end

  def vitamin_count(vitamin_pack)
    link_to pluralize(vitamin_pack.vitamin_count, 'vitamin'), vitamin_list_path(vitamin_pack), class: "js-packs-vitamin-list"
  end

end
