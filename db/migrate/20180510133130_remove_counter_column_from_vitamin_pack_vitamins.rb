class RemoveCounterColumnFromVitaminPackVitamins < ActiveRecord::Migration[5.2]
  def change
    remove_column :vitamin_pack_vitamins, :vitamin_counter
  end
end
