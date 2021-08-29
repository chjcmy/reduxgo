package migration

import (
	"time"
)

type Book struct {
	ID        int    `gorm:"primary_key" json:"id,omitempty"`
	Title     string `json:"title,omitempty"`
	Subject   string `json:"subject,omitempty"`
	UserID    int    `json:"user_id"`
	User      User
	UnitID    int `json:"unit_id"`
	Unit      Unit
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type User struct {
	ID        int        `gorm:"primary_key"`
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
	ID          int    `gorm:"primary_key"`
	ContentName string `json:"content_name,omitempty"`
}
