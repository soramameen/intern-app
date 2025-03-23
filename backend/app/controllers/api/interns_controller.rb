class Api::InternsController < ApplicationController
  before_action :authenticate_api_intern!, only: [:me]
  def index 
    # 全インターン生のデータを取得する
    @interns = Intern.all
    render json: @interns
  end

  def create
    # インターン生のデータを取得する
    @intern = Intern.new(intern_params)
    if @intern.save
      render json: @intern, status: :created
    else
      render json: { errors: @intern.errors.full_messages }, status: :unprocessable_entity
    end
  end
  def me
    render json: current_api_intern.as_json
  end
  
  private
  def intern_params
    params.require(:intern).permit(:name, :university, :grade, :skills, :bio)
  end
end