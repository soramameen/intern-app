class CreateCompanies < ActiveRecord::Migration[8.0]
  def change
    create_table :companies do |t|
      t.string :email
      t.string :encrypted_password
      t.string :name
      t.string :industry
      t.text :description

      t.timestamps
    end
    add_index :companies, :email, unique: true
  end
end
