class User < ApplicationRecord
  has_secure_password

  has_many :vitamin_packs
  has_many :user_vitamins
  has_many :users, through: :user_vitamins

  validates_presence_of :name

end
