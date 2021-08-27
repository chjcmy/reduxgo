package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func Config() *gorm.DB {
	dsn := "cshcmi:chltjdgus123!@tcp(choi1994.iptime.org:1994)/blog?charset=utf8mb4&parseTime=True"
	db, _ := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db
}
