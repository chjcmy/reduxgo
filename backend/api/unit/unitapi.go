package unit

import (
	db2 "github.com/backend/db"
	"github.com/backend/migration"
	"github.com/labstack/echo/v4"
	"net/http"
)

var db = db2.Config()

var units []migration.Unit

func UnitHosting(c echo.Context) error {
	result := db.Find(&units)

	if result.Error != nil {
		return c.JSON(http.StatusOK, result.Error)
	}

	return c.JSON(http.StatusOK, units)
}
