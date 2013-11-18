class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :seeker_id
      t.integer :finder_id
      t.integer :category_id
      t.string :color
      t.text :details
      t.integer :location_id
      t.string :secret_info
      t.string :status
      t.references :finder
      t.references :seeker

      t.timestamps
    end
  end
end
