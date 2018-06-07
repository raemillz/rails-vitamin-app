class VitaminSerializer < ActiveModel::Serializer
  attributes :id, :name, :capsule_amount
  has_many :benefits

end
