class Post < ApplicationRecord
  belongs_to :category
  belongs_to :status
  has_many  :tag_relationships, dependent: :destroy
  has_many  :tags, through: :tag_relationships
  has_many  :fighter_relationships, dependent: :destroy
  has_many  :fighters, through: :fighter_relationships
end
