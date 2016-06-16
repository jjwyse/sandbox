
# example of yielding to passed in method
def block_test
   puts "We're in the method!"
   puts 'Yielding to the block...'
   yield
   puts "We're back in the method!"
end

block_test { puts ">>> We're in the block!" }

def lambda_demo(a_lambda)
   puts "I'm the method!"
   a_lambda.call
end

lambda_demo(lambda { puts "I'm the lambda!" })
