class User < ApplicationRecord
  has_secure_password

  has_many :vitamin_packs
  has_many :user_vitamins
  has_many :vitamins, through: :vitamin_packs

  validates_presence_of :name

end
