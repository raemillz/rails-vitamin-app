class Vitamin < ApplicationRecord
  has_many :vitamin_benefits
  has_many :benefits, through: :vitamin_benefits
  has_many :vitamin_pack_vitamins
  has_many :vitamin_packs, through: :vitamin_pack_vitamins
  has_many :users, through: :vitamin_packs


  validates_presence_of :name
  validates :name, uniqueness: true

  accepts_nested_attributes_for :benefits, reject_if: proc { |attributes| attributes['name'].blank? }

  def self.order_alphabetically
    Vitamin.order('vitamins.name ASC')
  end

  def self.most_popular
    @pop_id = Vitamin.select(Vitamin.arel_table[Arel.star]).joins(
                Vitamin.arel_table.join(VitaminPackVitamin.arel_table).on(
                  VitaminPackVitamin.arel_table[:vitamin_id].eq(Vitamin.arel_table[:id])
                ).join_sources
              ).order(VitaminPackVitamin.arel_table[:vitamin_id].count).reverse_order.group(VitaminPackVitamin.arel_table[:vitamin_id]).pluck(:id).last
    Vitamin.find(@pop_id)
  end

  def benefit_count
    benefits.count
  end

end
