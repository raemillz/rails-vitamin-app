class AddVitaminCountToVitaminPackVitamins < ActiveRecord::Migration[5.2]
  def change
    add_column :vitamin_pack_vitamins, :vitamin_count, :integer
  end
end
