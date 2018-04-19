class CreateVitaminPackVitamins < ActiveRecord::Migration[5.2]
  def change
    create_table :vitamin_pack_vitamins do |t|
      t.integer :vitamin_pack_id
      t.integer :vitamin_id

      t.timestamps
    end
  end
end
