class Api::CompanyRegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token, only: [:create]
  respond_to :json

  def create
    company = Company.new(sign_up_params)
    if company.save
      sign_in(:company, company)
      render json: { message: '登録成功', company: company.as_json }, status: :created
    else
      render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:company).permit(:email, :password, :password_confirmation, :name, :industry, :description)
  end
end