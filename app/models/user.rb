class User < ApplicationRecord
  validates :name, :email, :title, :phone, :status, presence: true
  validates_uniqueness_of :email

  enum status: {
    inactive: 0,
    active: 1
  }
end
