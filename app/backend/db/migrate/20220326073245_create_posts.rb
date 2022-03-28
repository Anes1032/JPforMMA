class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :en_content
      t.text :ja_content
      t.string :image_url
      t.text :created_by
      t.string :reference_url

      t.timestamps
    end
  end
end
