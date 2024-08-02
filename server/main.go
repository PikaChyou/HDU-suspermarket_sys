package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type User struct {
	Emp_id   string
	Emp_name string
	Emp_sex  string
	Emp_age  int
	Emp_tele string
	Emp_pwd  string
}

type Pdt struct {
	Pdt_id    string
	Pdt_num   int
	Pdt_name  string
	Pdt_price float64
	In_time   string
}

type Rtn struct {
	Rtn_id    string
	Pdt_id    string
	Order_num int
	rtn_price float64
	Rtn_time  string
	Rtn_price float64
	Emp_id    string
}

type Order struct {
	Order_id    string
	Pdt_id      string
	Order_num   int
	Order_price float64
	Emp_id      string
	Order_time  string
}

type Sche struct {
	Pdt_id    string
	Rtk_no    int
	Rtk_time  string
	Rtk_price float64
	Spl_name  string
}

type Crt struct {
	Sale_date   string
	Total_sales float64
}

type App struct {
	DB *sql.DB
}

func main() {
	dbUser := "root"
	dbPass := "Qiuwz@admin"
	dbServer := "122.9.12.102:3306"
	dbName := "supermarket_sys"
	dsn := dbUser + ":" + dbPass + "@tcp(" + dbServer + ")/" + dbName
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		fmt.Printf("open %s faild,err:%v\n", dsn, err)
		return
	}
	fmt.Println("连接数据库成功~")

	app := &App{DB: db}

	http.HandleFunc("/emp", app.emp)
	http.HandleFunc("/warehouse", app.warehouse)
	http.HandleFunc("/returns", app.returns)
	http.HandleFunc("/orders", app.orders)
	http.HandleFunc("/newEmp", app.newEmp)
	http.HandleFunc("/scheHistory", app.scheHistory)
	http.HandleFunc("/sche", app.sche)
	http.HandleFunc("/charts", app.charts)
	http.HandleFunc("/currentDate", app.curr)

	http.HandleFunc("/newOrder", app.newOrder)
	http.HandleFunc("/newReturn", app.newReturn)

	http.ListenAndServe(":8000", nil)
}

func (app *App) emp(w http.ResponseWriter, r *http.Request) {
	sqlStr := "SELECT Emp_id,Emp_name,Emp_sex,Emp_age,IFNULL(Emp_tele,''),Emp_pwd FROM employee;"
	rows, _ := app.DB.Query(sqlStr)
	defer rows.Close()
	var users []User
	var u User
	for rows.Next() {
		rows.Scan(&u.Emp_id, &u.Emp_name, &u.Emp_sex, &u.Emp_age, &u.Emp_tele, &u.Emp_pwd)
		users = append(users, u)
	}
	// fmt.Println(users)
	usersJSON, err := json.Marshal(users)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")

	w.Write(usersJSON)
}

func (app *App) warehouse(w http.ResponseWriter, r *http.Request) {
	sqlStr := "SELECT * FROM warehouse;"
	rows, _ := app.DB.Query(sqlStr)
	defer rows.Close()
	var pdts []Pdt
	var p Pdt
	for rows.Next() {
		rows.Scan(&p.Pdt_id, &p.Pdt_num, &p.Pdt_name, &p.Pdt_price, &p.In_time)
		pdts = append(pdts, p)
	}
	// fmt.Println(users)
	pdtsJSON, err := json.Marshal(pdts)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")

	w.Write(pdtsJSON)
}

func (app *App) returns(w http.ResponseWriter, r *http.Request) {
	sqlStr := "SELECT * FROM returns;"
	rows, _ := app.DB.Query(sqlStr)
	defer rows.Close()
	var rtns []Rtn
	var rt Rtn
	for rows.Next() {
		rows.Scan(&rt.Rtn_id, &rt.rtn_price, &rt.Rtn_time, &rt.Pdt_id, &rt.Order_num, &rt.Emp_id)
		rtns = append(rtns, rt)
	}
	// fmt.Println(users)
	rtnsJSON, err := json.Marshal(rtns)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")

	w.Write(rtnsJSON)
}

func (app *App) orders(w http.ResponseWriter, r *http.Request) {
	sqlStr := "SELECT * FROM orders;"
	rows, _ := app.DB.Query(sqlStr)
	defer rows.Close()
	var orders []Order
	var o Order
	for rows.Next() {
		rows.Scan(&o.Order_id, &o.Pdt_id, &o.Order_num, &o.Order_price, &o.Emp_id, &o.Order_time)
		orders = append(orders, o)
	}
	fmt.Println(orders)
	ordersJSON, err := json.Marshal(orders)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// fmt.Println(ordersJSON)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")

	w.Write(ordersJSON)
}

func (app *App) newEmp(w http.ResponseWriter, r *http.Request) {

	var u User
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println(u)
	sqlStr := "INSERT INTO employee VALUES(?,?,?,?,?,?);"
	_, err = app.DB.Exec(sqlStr, u.Emp_id, u.Emp_name, u.Emp_sex, u.Emp_age, u.Emp_tele, u.Emp_pwd)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	if err != nil {
		w.Write([]byte(`{"status":"fail"}`))
		return
	}
	w.Write([]byte(`{"status":"success"}`))
}

func (app *App) scheHistory(w http.ResponseWriter, r *http.Request) {
	sqlStr := "SELECT * FROM schedules;"
	rows, _ := app.DB.Query(sqlStr)
	defer rows.Close()
	var sches []Sche
	var s Sche
	for rows.Next() {
		rows.Scan(&s.Pdt_id, &s.Rtk_time, &s.Rtk_no, &s.Rtk_price, &s.Spl_name)
		sches = append(sches, s)
	}
	// fmt.Println(users)
	schesJSON, err := json.Marshal(sches)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")

	w.Write(schesJSON)
}

func (app *App) sche(w http.ResponseWriter, r *http.Request) {

	var sches []Sche
	err := json.NewDecoder(r.Body).Decode(&sches)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println(sches)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	sqlStr := "INSERT INTO schedules VALUES(?,?,?,?,?);"
	for _, sch := range sches {
		_, err = app.DB.Exec(sqlStr, sch.Pdt_id, sch.Rtk_time, sch.Rtk_no, sch.Rtk_price, sch.Spl_name)
		if err != nil {
			w.Write([]byte(`{"status":"fail"}`))
			return
		}
	}
	w.Write([]byte(`{"status":"success"}`))
}

func (app *App) newOrder(w http.ResponseWriter, r *http.Request) {

	var ods []Order
	err := json.NewDecoder(r.Body).Decode(&ods)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println(ods)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	sqlStr := "INSERT INTO orders VALUES(UUID(),?,?,?,?,?);"
	for _, od := range ods {
		_, err = app.DB.Exec(sqlStr, od.Pdt_id, od.Order_num, od.Order_price, od.Emp_id, od.Order_time)
		if err != nil {
			w.Write([]byte(`{"status":"fail"}`))
			return
		}
	}
	w.Write([]byte(`{"status":"success"}`))
}

func (app *App) newReturn(w http.ResponseWriter, r *http.Request) {

	var ods []Order
	err := json.NewDecoder(r.Body).Decode(&ods)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Println(ods)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
	w.Header().Set("Content-Type", "application/json")

	sqlStr := "INSERT INTO returns VALUES(UUID(),?,?,?,?,?);"
	for _, od := range ods {
		_, err = app.DB.Exec(sqlStr, od.Pdt_id, od.Order_num, od.Order_price, od.Order_time, od.Emp_id)
		if err != nil {
			w.Write([]byte(`{"status":"fail"}`))
			return
		}
	}
	w.Write([]byte(`{"status":"success"}`))
}

func (app *App) charts(w http.ResponseWriter, r *http.Request) {
	sqlStr := "SELECT * FROM sales_summary;"
	rows, _ := app.DB.Query(sqlStr)
	defer rows.Close()
	var charts []Crt

	for rows.Next() {
		var crt Crt
		rows.Scan(&crt.Sale_date, &crt.Total_sales)
		charts = append(charts, crt)
	}
	fmt.Println(charts)
	crtsJSON, err := json.Marshal(charts)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// fmt.Println(crtsJSON)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")

	w.Write(crtsJSON)
}

func (app *App) curr(w http.ResponseWriter, r *http.Request) {
	sqlStr := "CALL GetTodaysOrders();"
	rows, _ := app.DB.Query(sqlStr)
	defer rows.Close()
	var orders []Order
	var o Order
	for rows.Next() {
		rows.Scan(&o.Order_id, &o.Pdt_id, &o.Order_num, &o.Order_price, &o.Emp_id, &o.Order_time)
		orders = append(orders, o)
	}
	fmt.Println(orders)
	ordersJSON, err := json.Marshal(orders)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// fmt.Println(ordersJSON)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")

	w.Write(ordersJSON)
}
