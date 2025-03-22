class CreateInterns < ActiveRecord::Migration[8.0]
  def change
    create_table :interns do |t|
      t.string :name
      t.string :university
      t.integer :grade
      t.string :skills
      t.text :bio

      t.timestamps
    end
  end
end
