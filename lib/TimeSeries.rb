class TimeSeries
	#Assuming x and y are same length
	#Not always the case
	def initialize(y, x=false)
		@y = y
		if x
			@x = x
		else
			@x = y.each_with_index.map { |val, index| index }
		end
	end


	def roll_z_score(window = 1)
		if @y.length > 0
			return @y
		else
			return false
		end
	end

	#Detects outliers from a given threshold
	def anomalies(threshold = 3)
		return self
	end
end