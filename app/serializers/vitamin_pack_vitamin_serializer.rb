class VitaminPackVitaminSerializer < ActiveModel::Serializer
  attributes :id, :vitamin_pack_id, :vitamin_id
  belongs_to :vitamin_pack
  belongs_to :vitamin
end
