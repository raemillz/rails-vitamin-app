class VitaminPackSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :vitamin_count
  belongs_to :user
  has_many :vitamins
end
