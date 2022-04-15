class CreateFighterRelationships < ActiveRecord::Migration[6.1]
  def change
    create_table :fighter_relationships do |t|
      t.references :post, null: false, foreign_key: true
      t.references :fighter, null: false, foreign_key: true

      t.timestamps
    end
    add_index :fighter_relationships, [:post_id,:fighter_id],unique: true
  end
end
