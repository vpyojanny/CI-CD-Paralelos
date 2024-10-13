package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Definir la estructura del equipo
type Team struct {
	ID   uint   `json:"id" gorm:"primaryKey"`
	Name string `json:"name"`
	City string `json:"city"`
}

// Definir la estructura del jugador
type Player struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Name     string `json:"name"`
	Position string `json:"position"`
	TeamID   uint   `json:"team_id"`
}

// Definir la estructura del partido
type Match struct {
	ID         uint   `json:"id" gorm:"primaryKey"`
	Date       string `json:"date"`
	Team1ID    uint   `json:"team1_id"`
	Team2ID    uint   `json:"team2_id"`
	Team1Score int    `json:"team1_score"`
	Team2Score int    `json:"team2_score"`
}

var DB *gorm.DB
var err error

// Conexión a la base de datos
func connectDatabase() {
	dsn := "root:VLsysadmin2024@tcp(127.0.0.1:3306)/futbol_amateur?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("No se pudo conectar a la base de datos:", err)
	}

	// Migrar las estructuras a la base de datos
	DB.AutoMigrate(&Player{}, &Team{}, &Match{})
}

func main() {
	// Conectar a la base de datos
	connectDatabase()

	// Crear un router Gin
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Ajusta según sea necesario
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Rutas para jugadores
	router.GET("/players", getPlayers)          // Obtener todos los jugadores
	router.POST("/players", addPlayer)          // Crear un nuevo jugador
	router.PUT("/players/:id", updatePlayer)    // Actualizar un jugador
	router.DELETE("/players/:id", deletePlayer) // Eliminar un jugador

	// Rutas para equipos
	router.GET("/teams", getTeams) // Obtener todos los equipos
	router.POST("/teams", addTeam) // Crear un nuevo equipo

	// Rutas para partidos
	router.GET("/matches", getMatches) // Obtener todos los partidos
	router.POST("/matches", addMatch)  // Crear un nuevo partido

	// Correr el servidor en el puerto 8080
	router.Run(":8080")
}

// Obtener todos los jugadores
func getPlayers(c *gin.Context) {
	var players []Player
	DB.Find(&players)
	c.JSON(http.StatusOK, players)
}

// Crear un nuevo jugador
func addPlayer(c *gin.Context) {
	var player Player
	if err := c.ShouldBindJSON(&player); err != nil {
		log.Println("Error al enlazar JSON:", err) // Imprimir error
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Printf("Intentando agregar jugador: %+v\n", player)
	DB.Create(&player)
	c.JSON(http.StatusOK, player)
}

// Actualizar un jugador
func updatePlayer(c *gin.Context) {
	id := c.Param("id")
	var player Player
	if err := DB.First(&player, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Jugador no encontrado"})
		return
	}
	if err := c.ShouldBindJSON(&player); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	DB.Save(&player)
	c.JSON(http.StatusOK, player)
}

// Eliminar un jugador
func deletePlayer(c *gin.Context) {
	id := c.Param("id")
	var player Player
	if err := DB.First(&player, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Jugador no encontrado"})
		return
	}
	DB.Delete(&player)
	c.JSON(http.StatusOK, gin.H{"message": "Jugador eliminado"})
}

// Obtener todos los equipos
func getTeams(c *gin.Context) {
	var teams []Team
	DB.Find(&teams)
	c.JSON(http.StatusOK, teams)
}

// Crear un nuevo equipo
func addTeam(c *gin.Context) {
	var team Team
	if err := c.ShouldBindJSON(&team); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	DB.Create(&team)
	c.JSON(http.StatusOK, team)
}

// Obtener todos los partidos
func getMatches(c *gin.Context) {
	var matches []Match
	DB.Find(&matches)
	c.JSON(http.StatusOK, matches)
}

// Crear un nuevo partido
func addMatch(c *gin.Context) {
	var match Match
	if err := c.ShouldBindJSON(&match); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	DB.Create(&match)
	c.JSON(http.StatusOK, match)
}
