package migration

import (
	"gorm.io/gorm"
	"time"
)

type Book struct {
	gorm.Model `json:"gorm_model"`
	Title      string `json:"title,omitempty"`
	Subject    string `json:"subject,omitempty"`
	UserID     int    `json:"user_id"`
	User       User   `json:"user"`
	UnitID     int    `json:"unit_id"`
	Unit       Unit   `json:"unit"`
}

type User struct {
	ID        int
	Name      string     `json:"name,omitempty"`
	Email     string     `json:"email,omitempty"`
	Age       *time.Time `json:"age"`
	GoogleNum string     `json:"google_num,omitempty"`
	Hobby     string     `json:"hobby,omitempty"`
	Lang      string     `json:"lang,omitempty"`
	Github    string     `json:"github,omitempty"`
	Gitlab    string     `json:"gitlab,omitempty"`
}

type Unit struct {
	ID          int
	ContentName string `json:"content_name,omitempty"`
}
