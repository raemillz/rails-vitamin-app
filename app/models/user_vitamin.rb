class UserVitamin < ApplicationRecord
  belongs_to :user
  belongs_to :vitamin
end
