package main

import (
	"github.com/backend/api"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
	"time"
)

type (
	user struct {
		Name string `json:"name"`
	}

	birth struct {
		Birthdays time.Time `json:"birthdays"`
	}
)

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//e.GET("/hosting", api.Hosting)
	//e.POST("/unittest", api.UnitCreate)
	//e.GET("/unitshosting", api.UnitHosting)
	//e.POST("/bookcreate", api.BookCreate)
	//e.GET("/bookread/:id", api.BookRead)
	//e.GET("/bookshow/:num", api.BookShow)
	//e.GET("/pickunitbooks/:id/:num", api.PickUnitBook)
	//e.DELETE("/bookdelete/:id", api.BookDelete)
	//e.PUT("/bookupdate/:id", api.BookUpdate)
	//e.GET("/newbooks", api.NewBooks)
	e.POST("/login", api.Login)

	e.Logger.Fatal(e.Start(":8000"))
}
