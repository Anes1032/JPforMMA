class AddStatusIdToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :status_id, :integer, after: :category_id, default: 2
  end
end
