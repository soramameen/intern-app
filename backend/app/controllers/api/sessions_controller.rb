class Api::SessionsController < Devise::SessionsController
  respond_to :json
  
  def create
    intern = Intern.find_by(email: params[:intern][:email])

    if intern&.valid_password?(params[:intern][:password])
      sign_in(:intern, intern)
      render json: { message: 'ログイン成功', intern: intern.as_json }, status: :ok
    else
      render json: { error: 'ログインに失敗しました。メールアドレスまたはパスワードが間違っています。' }, status: :unauthorized
    end
  end

  def destroy
    sign_out(:intern)
    render json: { message: 'ログアウト成功' }, status: :ok
  end
end