package api

import (
	"fmt"
	db2 "github.com/backend/db"
	migrate "github.com/backend/migration"
	"github.com/golang-jwt/jwt"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"time"
)

var db = db2.Config()

var count int64

type (
	jwtCustomClaims struct {
		Num string `json:"num"` //nolint:govet
		jwt.StandardClaims
	}
	googleNum struct {
		Num string `json:"num"`
	}
)

func Login(c echo.Context) error {
	nums := &googleNum{}
	c.Bind(nums)

	db.Model(migrate.User{}).Where("google_num = ?", nums.Num).Count(&count)

	if count == 0 {
		return c.JSON(http.StatusBadRequest, nil)
	}

	var claims = &jwtCustomClaims{
		nums.Num,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte("chltjdgus123!"))
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": t,
	})
}

func ReLogin(c echo.Context) error {

	googles := c.Get("user").(*jwt.Token)
	claims := googles.Claims.(jwt.MapClaims)
	name := claims["num"].(string)

	db.Model(migrate.User{}).Where("google_num = ?", name).Count(&count)

	if count == 0 {
		return c.JSON(http.StatusBadRequest, 0)
	}

	return c.JSON(http.StatusOK, echo.Map{
		"token": googles.Raw,
	})
}

func Hosting(c echo.Context) error {
	type host struct {
		Name   string `json:"name"`
		Age    string `json:"age"`
		Hobby  string `json:"hobby"`
		Lang   string `json:"lang"`
		Github string `json:"github"`
		Gitlab string `json:"gitlab"`
		Email  string `json:"email"`
	}

	hosts := &host{}

	db.Model(&migrate.User{}).Limit(1).Find(&hosts)

	hosts.Age = diff(hosts.Age, time.Now())

	fmt.Println(hosts)
	return c.JSON(http.StatusOK, hosts)
}

func diff(a string, b time.Time) (year string) {
	y1, _ := strconv.Atoi(a[:4])
	y2, _, _ := b.Date()
	year = strconv.Itoa(y2 - y1)

	return
}
