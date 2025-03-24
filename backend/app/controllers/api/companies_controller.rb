class Api::CompaniesController < ApplicationController
  before_action :authenticate_company!, only: [:me]
  respond_to :json

  def me
    render json: current_company.as_json
  end

  # 企業情報の一覧を取得（インターン生向け）
  def index
    @companies = Company.all
    render json: @companies
  end
  
  # 企業情報の詳細を取得（インターン生向け）
  def show
    @company = Company.find_by(id: params[:id])
    
    if @company
      render json: @company
    else
      render json: { error: "企業が見つかりません" }, status: :not_found
    end
  end
   
  # 企業情報を更新
  def update
    if current_company.update(company_params)
      render json: current_company
    else
      render json: { errors: current_company.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def company_params
    params.require(:company).permit(
      :name, 
      :industry, 
      :description, 
      :location, 
      :founded_year, 
      :employee_count, 
      :website, 
      :services, 
      :technologies
    )
  end
end