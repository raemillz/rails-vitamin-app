class VitaminPackSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :vitamin_count, :user
  belongs_to :user
  has_many :vitamins
  has_many :vitamin_pack_vitamins
end
