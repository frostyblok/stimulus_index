FactoryBot.define do
  factory :user do
    name { 'name' }
    status { 'inactive' }
    title { 'Mrs' }
    phone { '47584058745' }
    email { "#{name}@example.com" }
  end
end
