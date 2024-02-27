library(plumber)

# Path to API definition
plumb("api.R") |>
  pr_run(port = 8000) # Specify API port