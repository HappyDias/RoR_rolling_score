require "TimeSeries.rb"

class Api::AnomaliesController < ApplicationController
	skip_before_action :verify_authenticity_token
	def index
		render json: {
			:things => [
				{
					:name => 'some-thing-get',
					:guid => 'asdajsdasdas'
				}
		] }.to_json
	end
	def post
		if params.has_key?(:data) and params.has_key?(:threshold) and params.has_key?(:window)
			if params[:data].kind_of?(Array) and params[:threshold].kind_of?(Integer) and params[:window].kind_of?(Integer)
				series = TimeSeries.new(params[:data])
				render json: series.anomalies(params[:threshold], params[:window])
			#Here a custom type error should be raised
			end
		#Here custom argument missing error should be raised
		end
	end
end