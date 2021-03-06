class VitaminPack < ApplicationRecord
  belongs_to :user
  has_many :vitamin_pack_vitamins
  has_many :vitamins, through: :vitamin_pack_vitamins, dependent: :destroy
  has_many :benefits, through: :vitamins

  validates_presence_of :name

  accepts_nested_attributes_for :vitamins, reject_if: proc { |attributes| attributes['name'].blank? }
  accepts_nested_attributes_for :benefits, reject_if: proc { |attributes| attributes['name'].blank? }

  def user_name
    self.try(:user).try(:name)
  end

  def user_name=(name)
    user = User.find_or_create_by(name: name)
    self.user = user
  end

  def vitamin_count
    vitamins.count
  end
end
