class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.text :en_title
      t.text :ja_title
      t.text :en_sub_title
      t.text :ja_sub_title
      t.text :en_content
      t.text :ja_content
      t.string :image_url
      t.string :video_url
      t.string :created_by
      t.string :created_by_address
      t.string :post_time
      t.string :reference_url
      t.boolean :hero
      t.boolean :pickup
      t.boolean :recommend

      t.datetime :created_at, default: -> { 'CURRENT_TIMESTAMP' }
      t.datetime :updated_at, default: -> { 'CURRENT_TIMESTAMP' }
    end
  end
end
