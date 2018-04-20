class Benefit < ApplicationRecord
  has_many :vitamin_benefits
  has_many :vitamins, through: :vitamin_benefits

  validates_presence_of :name
  validates :name, uniqueness: true
end
