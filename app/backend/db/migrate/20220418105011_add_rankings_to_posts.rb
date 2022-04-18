class AddRankingsToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :ranking, :integer, after: :recommend
  end
end
