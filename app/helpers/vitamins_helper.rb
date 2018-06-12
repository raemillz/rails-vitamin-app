module VitaminsHelper
  def show_vitamin_name(vitamin)
    if current_page?(vitamin_path(vitamin))
      vitamin.name
    else
      link_to vitamin.name, vitamin_path(vitamin), class: "js-vitamins-show", id: "vitamin-#{vitamin.id}"
    end
  end

  def edit_delete_vitamin_links(vitamin)
    output = [
      link_to("Edit", edit_vitamin_path(vitamin), class: "btn btn-secondary"),
      link_to("Delete", vitamin, method: :delete, class: "btn btn-danger", data: { confirm: "Are you sure you really want to delete this vitamin?" })
    ]
    safe_join(output)
  end

  def benefit_count(vitamin)
    link_to pluralize(vitamin.benefit_count, 'benefit'), benefit_list_path(vitamin), class: "js-vitamins-benefit-list"
  end

end
