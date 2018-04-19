class CreateUserVitamins < ActiveRecord::Migration[5.2]
  def change
    create_table :user_vitamins do |t|
      t.integer :user_id
      t.integer :vitamin_id

      t.timestamps
    end
  end
end
