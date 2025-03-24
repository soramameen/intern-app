# Intern モデル
class Intern < ApplicationRecord
  # Deviseの設定
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         
  # バリデーション
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  
  # 関連付け
  has_many :offers, dependent: :destroy
  
  # スキルを配列として扱うヘルパーメソッド
  def skills_array
    skills.to_s.split(',').map(&:strip)
  end
  
  # JSONシリアライズのカスタマイズ
  def as_json(options = {})
    json = super(options.merge(
      except: [:encrypted_password, :reset_password_token, :reset_password_sent_at]
    ))
    
    # スキルを配列として含める
    json[:skills_array] = skills_array
    json
  end
end