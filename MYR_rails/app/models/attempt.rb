class Attempt < ActiveRecord::Base
# Associations
	belongs_to :robot
	belongs_to :mission
	belongs_to :tracker


# Validations
    validates :name, presence: true, uniqueness: true, length: { in: 3..40, too_long: "%{count} characters is the maximum allowed", too_short:"%{count} characters is the minimum allowed"  }
    validates :start, presence: true
    validates :end, presence: true
end
