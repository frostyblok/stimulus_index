class UsersController < ApplicationController
  before_action :set_user, only: %i[update destroy]

  def index; end

  def users_json
    if params[:sort]
      @users = User.order(params[:sort])
      if params[:sort] == "updated_at"
        @users = User.order("#{params[:sort]} DESC")
      end
    else
      @users = User.all
    end


    render json: { users: @users }, status: :ok
  end

  def create
    User.create!(user_params)

    render json: { message: 'User created successfully' }, status: :created
  end

  def update
    # binding.pry
    @user.update!(user_params.delete_if { |_, value| value.blank? })

    render json: { message: 'User updated successfully' }, status: :ok
  end

  def destroy
    @user.destroy

    render json: { message: 'User destroyed successfully' }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:id, :name, :title, :email, :phone, :status)
  end
end
