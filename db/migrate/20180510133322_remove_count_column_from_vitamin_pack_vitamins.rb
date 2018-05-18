class RemoveCountColumnFromVitaminPackVitamins < ActiveRecord::Migration[5.2]
  def change
    remove_column :vitamin_pack_vitamins, :vitamin_count
  end
end
