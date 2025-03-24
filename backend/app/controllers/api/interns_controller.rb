class Api::InternsController < ApplicationController
  before_action :authenticate_intern!, only: [:me]
  respond_to :json

  def index 
    @interns = Intern.all
    render json: @interns
  end
  def show
    @intern = Intern.find_by(id: params[:id])
    if @intern
      render json: @intern
    else
      render json: { error: "インターン生が見つかりません" }, status: :not_found
    end
  end
  def create
    @intern = Intern.new(intern_params)
    if @intern.save
      render json: @intern, status: :created
    else
      render_json_error(@intern.errors.full_messages)
    end
  end
  
  def me
    render json: current_intern.as_json
  end
  
  private
  
  def intern_params
    params.require(:intern).permit(:name, :university, :grade, :skills, :bio)
  end
end