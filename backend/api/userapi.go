package api

import (
	db2 "github.com/backend/db"
	migrate "github.com/backend/migration"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"time"
)

type (
	jwtCustomClaims struct {
		nums string `json:"num"`
		jwt.StandardClaims
	}
	googleNum struct {
		Num string `json:"num"`
	}
)

func Login(c echo.Context) error {

	var count int64

	db := db2.Config()
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

//func ReLogin(c echo.Context) error {
//	var userName  []struct {
//		GoogleNum string `json:"googlenum"`
//	}
//	googlenums := c.Get("user").(*jwt.Token)
//	claims := googlenums.Claims.(jwt.MapClaims)
//	name := claims["name"].(string)
//
//	if err != nil {
//		log.Println(err)
//		return c.JSON(http.StatusBadRequest, err)
//	}
//
//	return c.JSON(http.StatusOK, echo.Map{
//		"token": googlenums.Raw,
//	})
//}

//func Hosting(c echo.Context) error {
//	client := db.Config()
//	ctx := context.Background()
//	var host []struct {
//		Name   string `json:"name"`
//		Age    string `json:"age"`
//		Hobby  string `json:"hobby"`
//		Lang   string `json:"lang"`
//		Github string `json:"github"`
//		Gitlab string `json:"gitlab"`
//		Email  string `json:"email"`
//	}
//	err := client.User.Query().
//		Where(user.Name("최성현")).
//		Select(
//			user.FieldName,
//			user.FieldAge,
//			user.FieldHobby,
//			user.FieldLang,
//			user.FieldGithub,
//			user.FieldGitlab,
//			user.FieldEmail,
//		).
//		Scan(ctx, &host)
//	if err != nil {
//		log.Println(err)
//		return c.JSON(http.StatusBadRequest, host)
//	}
//
//	host[0].Age = diff(host[0].Age, time.Now())
//
//	return c.JSON(http.StatusOK, host)
//}

func diff(a string, b time.Time) (year string) {
	y1, _ := strconv.Atoi(a[:4])
	y2, _, _ := b.Date()
	year = strconv.Itoa(y2 - y1)

	return
}
