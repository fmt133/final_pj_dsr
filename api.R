library(plumber)
library(RSQLite)

conn <- dbConnect(RSQLite::SQLite(), "sinh_vien.db")
df <- dbGetQuery(conn, "SELECT * FROM sinh_vien")


#* @apiTitle Plumber API


#* Send data
#* @get /df
function() {
  df
}


#* Add hoc_sinh to db
#* @param ma_sv
#* @param ho_ten
#* @param email
#* @param ngay_sinh
#* @param que
#* @param diem_tong_ket
#* @get /add
function(ma_sv, ho_ten, email, ngay_sinh, que, diem_tong_ket){
  query = paste0("INSERT INTO sinh_vien (ma_sv, ho_ten, email, ngay_sinh, que, diem_tong_ket) 
                 VALUES (", as.character(ma_sv), 
                 ", '", ho_ten, 
                 "', '", email, 
                 "', '", ngay_sinh,
                 "', '", que,
                 "', ", as.character(diem_tong_ket),
                 ")")

  dbExecute(conn, query)
  
  list(status = "Successfully")
}


#* Delete hoc_sinh theo ma_sv
#* @param ma_sv
#* @get /delete
function(ma_sv){
  query = paste0("DELETE FROM sinh_vien WHERE ma_sv=",ma_sv)
  dbExecute(conn, query)
  list(status = "Successfully")
}


#* Sua theo ma_sv
#* @param ma_sv
#* @param ho_ten
#* @param email
#* @param ngay_sinh
#* @param que
#* @param diem_tong_ket
#* @get /sua
function(ma_sv, ho_ten, email, ngay_sinh, que, diem_tong_ket){
  query = paste0("UPDATE sinh_vien
                 SET ho_ten = '", ho_ten, "', 
                     email = '", email, "',
                     ngay_sinh = '", ngay_sinh, "',
                     que = '", que, "',
                     diem_tong_ket = ", diem_tong_ket, "
                 WHERE ma_sv = ",ma_sv)
  dbExecute(conn, query)
  list(status = "Successfully")
}