class CreateVitamins < ActiveRecord::Migration[5.2]
  def change
    create_table :vitamins do |t|
      t.string :name
      t.integer :capsule_amount

      t.timestamps
    end
  end
end
