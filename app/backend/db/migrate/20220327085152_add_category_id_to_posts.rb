class AddCategoryIdToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :category_id, :integer, after: :reference_url
  end
end
