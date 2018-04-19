class CreateVitaminBenefits < ActiveRecord::Migration[5.2]
  def change
    create_table :vitamin_benefits do |t|
      t.integer :vitamin_id
      t.integer :benefit_id

      t.timestamps
    end
  end
end
