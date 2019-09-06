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

	#Calculates an array of the same length as @y
	#Containing the z-score of each point in @y
	def roll_z_score(window = 0)
		score = []
		if window > 0
			slice_size = window
		else
			slice_size = @y.length
		end

		@y.each_slice(slice_size).to_a.each do | arr |
			mean = arr.mean()
			std = arr.std()
			arr.each do | val |
				if(std == 0.0)
					score.push(0.0)
				else
					score.push( (val - mean) / std )
				end
			end
		end
		return score
	end

	#Detects outliers from a given threshold
	#Threshold is in number of standard deviations
	#Window is in number of points
	def anomalies(threshold = 3.0, window = 0)
		return self.roll_z_score(window).map { | val | val.abs > threshold ? 1 : 0}
	end
end

#Adding functions to Array class
class Array
	#Calculate mean of a (numeric) array
	def mean
		mean = 0
		self.each do | val | 
			mean = mean + val / self.length.to_f
		end
		return mean
	end

	#Calculate standard deviation of (numeric) array
	def std
		std = 0
		if self.length > 1
			mean = self.mean()
			self.each { | val | std = std + (val - mean) ** 2 / (self.length - 1).to_f}
		end
		return Math.sqrt(std)
	end
end

