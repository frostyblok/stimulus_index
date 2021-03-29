require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:user_params) do
    {
      name: 'Frosty Blok',
      email: 'Fakorede',
      title: 'Mr',
      phone: '457474878347',
      status: 'active'
    }
  end
  let(:json) { JSON.parse(response.body) }

  context '#create' do
    before { post :create, params: user_params }

    it 'successfully creates a user' do
      expect(json['message']).to eq('User created successfully')
    end
  end

  context '#update' do
    let(:user) { create(:user) }

    before { put :update, params: { id: user.id, email: 'random@example.com', status: 'active' } }

    it 'successfully updates a user' do
      expect(json['message']).to eq('User updated successfully')
    end
  end

  context '#delete' do
    let(:user) { create(:user) }

    before { delete :destroy, params: { id: user.id } }

    it 'successfully deletes a user' do
      expect(json['message']).to eq('User destroyed successfully')
    end
  end

  context '#users_json' do
    let!(:user) do
      50.times.each_with_index do |_, i|
        create(:user, email: Faker::Internet.email(separators: i.to_s))
      end
    end

    before { get :users_json, params: { page: 1 } }

    it 'returns paginated data' do
      expect(json['users'].count).to eq(25)
      expect(json['total_pages']).to eq(2)
    end
  end
end
