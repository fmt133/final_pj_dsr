library(plumber)

# Path to API definition
r <- plumb("api.R")

#r$setHeader("Access-Control-Allow-Origin", "*")

r$run(port = 8000) # Specify API port

