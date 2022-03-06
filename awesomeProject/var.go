package main

import "fmt"

func main() {

	var t [5]float64 = [5]float64{24.0, 23.1, 48.2, 3}

	for i, v := range t{
		fmt.Println(i, v)
	}

}
