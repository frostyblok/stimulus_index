class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :title
      t.string :phone
      t.integer :status, default: 0

      t.timestamps
    end
  end
end
