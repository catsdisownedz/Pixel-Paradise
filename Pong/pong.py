import pygame
 
pygame.init()
 
# Font that is used to render the text
font20 = pygame.font.Font('freesansbold.ttf', 20)
 
# RGB values of standard colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
LAVENDER = (231, 221, 255)
 
# Basic parameters of the screen
WIDTH, HEIGHT = 900, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Ping Pong")
 
clock = pygame.time.Clock()    
FPS = 30
 

# Striker class
class Striker:
        # Take the initial position, dimensions, speed and color of the object
    def __init__(self, posx, posy, width, height, speed, color):
        self.posx = posx
        self.posy = posy
        self.width = width
        self.height = height
        self.speed = speed
        self.color = color
        # Rect that is used to control the position and collision of the object
        self.playersRect = pygame.Rect(posx, posy, width, height)
        # Object that is blit on the screen
        self.players = pygame.draw.rect(screen, self.color, self.playersRect)
 
    # Used to display the object on the screen
    def display(self):
        self.players = pygame.draw.rect(screen, self.color, self.playersRect)
 
    def update(self, yFac):
        self.posy = self.posy + self.speed*yFac
 
        # Restricting the striker to be below the top surface of the screen
        if self.posy <= 0:
            self.posy = 0
        # Restricting the striker to be above the bottom surface of the screen
        elif self.posy + self.height >= HEIGHT:
            self.posy = HEIGHT-self.height
 
        # Updating the rect with the new values
        self.playersRect = (self.posx, self.posy, self.width, self.height)
 
    def displayScore(self, text, score, x, y, color):
        text = font20.render(text+str(score), True, color)
        textRect = text.get_rect()
        textRect.center = (x, y)
 
        screen.blit(text, textRect)
 
    def getRect(self):
        return self.playersRect
 

# Ball class 
class Ball:
    def __init__(self, posx, posy, radius, speed, color):
        self.posx = posx
        self.posy = posy
        self.radius = radius
        self.speed = speed
        self.initial_speed = speed
        self.color = color
        self.xFac = 1
        self.yFac = -1
        self.ball = pygame.draw.circle(
            screen, self.color, (self.posx, self.posy), self.radius)
        self.firstTime = 1
        self.speed_increment = 1
 
    def display(self):
        self.ball = pygame.draw.circle(
            screen, self.color, (self.posx, self.posy), self.radius)
 
    def update(self):
        self.posx += self.speed*self.xFac
        self.posy += self.speed*self.yFac
 
        # If the ball hits the top or bottom surfaces, 
        # then the sign of yFac is changed and 
        # it results in a reflection
        if self.posy <= 0 or self.posy >= HEIGHT:
            self.yFac *= -1
 
        if self.posx <= 0 and self.firstTime:
            self.firstTime = 0
            return 1
        elif self.posx >= WIDTH and self.firstTime:
            self.firstTime = 0
            return -1
        else:
            return 0
 
    def reset(self):
        self.posx = WIDTH//2
        self.posy = HEIGHT//2
        self.xFac *= -1
        self.firstTime = 1
        self.speed = self.initial_speed
 
    # Used to reflect the ball along the X-axis
    def hit(self):
        self.xFac *= -1
 
    def getRect(self):
        return self.ball
    
    def increase_speed(self):
        self.speed += self.speed_increment

#render-text
def render_text(screen, text, size, color, x, y):
    font = pygame.font.Font('freesansbold.ttf', size)
    text = font.render(text, True, color)
    textRect = text.get_rect()
    textRect.center = (x, y)
    screen.blit(text, textRect)
 

# Game Manager 
def main():
    running = True
 
    # Defining the objects
    plyr1 = Striker(20, 0, 10, 100, 10, LAVENDER)
    plyr2 = Striker(WIDTH-30, 0, 10, 100, 10, LAVENDER)
    ball = Ball(WIDTH//2, HEIGHT//2, 7, 7, WHITE)
 
    listOfplayerss = [plyr1, plyr2]
 
    # Initial parameters of the players and the winning score
    player1, player2 = 0, 0
    plyr1YFac, plyr2YFac = 0, 0
    winning_score = 5
 
    while running:
        screen.fill(BLACK)
 
        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    plyr2YFac = -1
                if event.key == pygame.K_DOWN:
                    plyr2YFac = 1
                if event.key == pygame.K_w:
                    plyr1YFac = -1
                if event.key == pygame.K_s:
                    plyr1YFac = 1
            if event.type == pygame.KEYUP:
                if event.key == pygame.K_UP or event.key == pygame.K_DOWN:
                    plyr2YFac = 0
                if event.key == pygame.K_w or event.key == pygame.K_s:
                    plyr1YFac = 0
 
        # Collision detection
        for players in listOfplayerss:
            if pygame.Rect.colliderect(ball.getRect(), players.getRect()):
                ball.hit()
                ball.increase_speed();
 
        # Updating the objects
        plyr1.update(plyr1YFac)
        plyr2.update(plyr2YFac)
        point = ball.update()
 
        # -1 -> players_1 has scored
        # +1 -> players_2 has scored
        #  0 -> None of them scored
        if point == -1:
            player1 += 1
            if player1 == winning_score:
                render_text(screen, "Player 1 won!", 50, LAVENDER, WIDTH//2, HEIGHT//2)
                pygame.display.update()
                pygame.time.wait(3000)
                running = False
        elif point == 1:
            player2 += 1
            if player2 == winning_score:
                render_text(screen, "Player 2 won!", 50, LAVENDER, WIDTH//2, HEIGHT//2)
                pygame.display.update()
                pygame.time.wait(3000)                
                running = False

        # Someone has scored
        # a point and the ball is out of bounds.
        # So, we reset it's position
        if point:  
            ball.reset() 
 
        # Displaying the objects on the screen
        plyr1.display()
        plyr2.display()
        ball.display()
 
        # Displaying the scores of the players
        plyr1.displayScore("Player 1: ", 
                           player1, 100, 20, WHITE)
        plyr2.displayScore("Player 2: ", 
                           player2, WIDTH-100, 20, WHITE)
 
        pygame.display.update()
        clock.tick(FPS)     
 
 
if __name__ == "__main__":
    main()
    pygame.quit()
