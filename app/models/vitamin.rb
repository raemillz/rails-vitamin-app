class Vitamin < ApplicationRecord
  has_many :vitamin_benefits
  has_many :benefits, through: :vitamin_benefits
  has_many :user_vitamins
  has_many :users, through: :user_vitamins
  has_many :vitamin_pack_vitamins
  has_many :vitamin_packs, through: :vitamin_pack_vitamins
  accepts_nested_attributes_for :benefits
  validates_presence_of :name



end
