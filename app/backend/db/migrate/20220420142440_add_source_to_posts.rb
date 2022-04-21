class AddSourceToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :source, :string, after: :reference_url, default: "MMA Mania"
  end
end
