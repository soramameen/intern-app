class ApplicationController < ActionController::Base
  # JSONリクエストに対してはCSRF保護を無効化
  protect_from_forgery unless: -> { request.format.json? }
  
  # Deviseのヘルパーを含める
  include Devise::Controllers::Helpers

  # JSONエラーレスポンス用のヘルパーメソッド
  def render_json_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end

  # 認証済みユーザーのJSONレスポンス用のヘルパーメソッド
  def render_authenticated_json(resource, message = "認証成功")
    render json: { 
      message: message, 
      resource_type: resource.class.name.downcase,
      resource: resource.as_json 
    }, status: :ok
  end
end