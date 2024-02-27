library(plumber)

#* @apiTitle Plumber Example API

#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function(msg = "") {
  list(
    msg = paste0("The message is: '", msg, "'")
  )
}

library(RSQLite)
conn <- dbConnect(RSQLite::SQLite(), "sinh_vien.db")
df <- dbGetQuery(conn, "SELECT * FROM sinh_vien")


#* Plot a dataframe
#* @get /df
function() {
  df
}