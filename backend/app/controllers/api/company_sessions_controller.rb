class Api::CompanySessionsController < Devise::SessionsController
  respond_to :json

  def create
    company = Company.find_by(email: params[:company][:email])
    if company&.valid_password?(params[:company][:password])
      sign_in(:company, company)
      render json: { message: 'ログイン成功', company: company.as_json }, status: :ok
    else
      render json: { error: 'ログインに失敗しました。メールアドレスまたはパスワードが間違っています。' }, status: :unauthorized
    end
  end

  def destroy
    sign_out(:company)
    render json: { message: 'ログアウト成功' }, status: :ok
  end
end