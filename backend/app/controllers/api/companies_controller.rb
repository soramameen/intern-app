class Api::CompaniesController < ApplicationController
  before_action :authenticate_company!, only: [:me]
  respond_to :json

  def me
    render json: current_company.as_json
  end
end