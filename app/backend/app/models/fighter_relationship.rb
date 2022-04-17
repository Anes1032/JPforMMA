class FighterRelationship < ApplicationRecord
  belongs_to :post
  belongs_to :fighter
end
