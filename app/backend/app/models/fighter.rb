class Fighter < ApplicationRecord
  has_many   :fighter_relationships, dependent: :destroy
  has_many   :posts, through: :fighter_relationships
  validates :name, uniqueness: true
end
