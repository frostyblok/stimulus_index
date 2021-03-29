require 'rails_helper'

RSpec.feature 'Modal', js: true do
  scenario 'create new user', js: true do
    create_user

    expect(page).to have_content('Christian Pulisic')
  end

  scenario 'update new user', js: true do
    visit('/')

    find('.edit-user').click
    fill_in('name', with: 'Ngolo Kante')
    find('.update-user').click

    expect(page).to have_content('Ngolo Kante')
  end

  scenario 'delete existing user', js: true do
    visit('/')

    find('.delete-user').click
    find('.confirm-delete').click

    expect(page).not_to have_content('Christian Pulisic')
  end

  def create_user
    visit('/')
    find('.create-new-user').click
    fill_in('name', with: 'Christian Pulisic')
    fill_in('email', with: 'chrisp@example.com')
    fill_in('title', with: 'mr')
    fill_in('phone', with: '47540354758')
    fill_in('status', with: 'inactive')
    find('.save-user').click
  end
end
