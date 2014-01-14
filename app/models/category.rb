class Category < ActiveRecord::Base
  attr_accessible :name, :parent_id

  #belongs_to :items
  has_many :items

  belongs_to :parent, class_name: 'Category'

  # MVP: validate existence of category fields
  # validates :name, :parent_id, presence: true
end
