class VitaminPack < ApplicationRecord
  belongs_to :user
  has_many :vitamin_pack_vitamins
  has_many :vitamin_packs, through: :vitamin_pack_vitamins
end
