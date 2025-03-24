class Company < ApplicationRecord
  # Deviseの設定（重複を排除）
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         
  # バリデーション
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  
  # 関連付け（必要に応じて）
  has_many :jobs, dependent: :destroy # 求人情報
  has_many :offers, dependent: :destroy # オファー
  
  # JSONシリアライズのカスタマイズ（センシティブな情報を除外）
  def as_json(options = {})
    super(options.merge(
      except: [:encrypted_password, :reset_password_token, :reset_password_sent_at]
    ))
  end
end