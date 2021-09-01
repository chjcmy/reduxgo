package main

import (
	"github.com/backend/api/Category"
	"github.com/backend/api/book"
	user2 "github.com/backend/api/user"
	"github.com/backend/db"
	"github.com/backend/migration"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
)

func main() {
	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodHead, http.MethodPut, http.MethodPatch, http.MethodPost, http.MethodDelete},
	}))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	db3 := db.Config()

	// Migrate the schema
	db3.AutoMigrate(&migration.Book{}, &migration.Category{}, &migration.User{})

	e.GET("/hosting", user2.Hosting)
	e.GET("/unitshosting", Category.CategoryHosting)
	e.GET("/bookread/:id", book.BookRead)
	e.GET("/bookshow", book.BookShow)
	e.GET("/pickunitbooks/:id", book.PickUnitBook)
	e.DELETE("/bookdelete/:id", book.BookDelete)
	e.PUT("/bookupdate/:id", book.BookUpdate)
	e.POST("/login", user2.Login)
	r := e.Group("/re")

	// Configure middleware with the custom claims type
	config := middleware.JWTConfig{
		SigningKey: []byte("chltjdgus123!"),
	}
	r.Use(middleware.JWTWithConfig(config))
	r.GET("/login", user2.ReLogin)
	r.POST("/bookcreate", book.BookCreate)
	e.Logger.Fatal(e.Start(":8000"))
}
