class Api::RollscoreController < ApplicationController
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

		render json: params.to_json
	end
end