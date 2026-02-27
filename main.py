music.set_built_in_speaker_enabled(True)

class Sprite:
    x = 0
    y = 0

    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def render(self):
        led.plot(self.x, self.y)

player = Sprite(2, 4)
food = None
score = 0

def spawn_food():
    while True:
        x = randint(0, 4)
        if x != player.x:
            break
    return Sprite(x, 0)

while True:
    basic.clear_screen()
    
    if not food:
        food = spawn_food()
    else:
        food.y += 1
        if food.y > 4:
            food = None

    if food:
        if food.y == player.y:
            music.play(music.tone_playable((262 + (score * 12))*2, music.beat(BeatFraction.EIGHTH)), music.PlaybackMode.IN_BACKGROUND)
            food.render()
        else:
            music.play(music.tone_playable(262 + (score * 12), music.beat(BeatFraction.EIGHTH)), music.PlaybackMode.IN_BACKGROUND)
            food.render()
    else:
        music.play(music.tone_playable((262 + (score * 12))/2, music.beat(BeatFraction.EIGHTH)), music.PlaybackMode.IN_BACKGROUND)

    if input.button_is_pressed(Button.A):
        player.x -= 1
    if input.button_is_pressed(Button.B):
        player.x += 1
    player.x = max(0,min(4,player.x))
    
    if food:
        if player.x == food.x and player.y == food.y:
            food = None
            score += 1
            music.play(music.builtin_playable_sound_effect(soundExpression.giggle), music.PlaybackMode.UNTIL_DONE)
            if score >= 20:
                break

    player.render()
    basic.pause(200 - (score * 5))
    # basic.pause(25)

music._play_default_background(music.built_in_playable_melody(Melodies.ENTERTAINER), music.PlaybackMode.IN_BACKGROUND)
for _ in range(4):
    basic.show_icon(IconNames.HEART)
    basic.show_icon(IconNames.SMALL_HEART)

basic.show_number(Math.floor(control.millis()/1000))

control.reset()