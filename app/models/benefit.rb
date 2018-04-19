class Benefit < ApplicationRecord
  has_many :vitamin_benefits
  has_many :vitamins, through: :vitamin_benefits
end
