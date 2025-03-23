# app/controllers/api/registrations_controller.rb
class Api::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  skip_forgery_protection  # ← これを追加！


  respond_to :json

  def create
    intern = Intern.new(sign_up_params)

    if intern.save
      sign_in(:intern, intern) # 登録後にログイン状態にする場合
      render json: intern, status: :created
    else
      render json: { errors: intern.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:intern).permit(:email, :password, :password_confirmation, :name, :university, :grade, :skills, :bio)
  end
end
