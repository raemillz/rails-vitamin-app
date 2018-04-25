class Vitamin < ApplicationRecord
  has_many :vitamin_benefits
  has_many :benefits, through: :vitamin_benefits
  has_many :vitamin_pack_vitamins
  has_many :vitamin_packs, through: :vitamin_pack_vitamins
  has_many :users, through: :vitamin_packs


  validates_presence_of :name
  validates :name, uniqueness: true

  accepts_nested_attributes_for :benefits, reject_if: proc { |attributes| attributes['name'].blank? }

  def self.most_popular
    Vitamin.select("vitamins.*, COUNT(users.id) AS u_count").joins(:users).group("vitamins.id").order("u_count DESC").limit(1)
  end


end
