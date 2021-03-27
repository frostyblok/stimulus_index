# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

1000.times.each_with_index do |_, index|
  User.create!(name: Faker::Name.name, title: ["Mr", "Mrs"].sample, email: Faker::Internet.email(separators: index.to_s), phone: Faker::PhoneNumber.cell_phone_in_e164, status: ["active", "inactive"].sample)
end
