music.setBuiltInSpeakerEnabled(true)
class Sprite {
    static x: number
    private ___x_is_set: boolean
    private ___x: number
    get x(): number {
        return this.___x_is_set ? this.___x : Sprite.x
    }
    set x(value: number) {
        this.___x_is_set = true
        this.___x = value
    }
    
    static y: number
    private ___y_is_set: boolean
    private ___y: number
    get y(): number {
        return this.___y_is_set ? this.___y : Sprite.y
    }
    set y(value: number) {
        this.___y_is_set = true
        this.___y = value
    }
    
    public static __initSprite() {
        Sprite.x = 0
        Sprite.y = 0
    }
    
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
    
    public render() {
        led.plot(this.x, this.y)
    }
    
}

Sprite.__initSprite()

let player = new Sprite(2, 4)
let food = null
let score = 0
function spawn_food(): Sprite {
    let x: number;
    while (true) {
        x = randint(0, 4)
        if (x != player.x) {
            break
        }
        
    }
    return new Sprite(x, 0)
}

while (true) {
    basic.clearScreen()
    if (!food) {
        food = spawn_food()
    } else {
        food.y += 1
        if (food.y > 4) {
            food = null
        }
        
    }
    
    if (food) {
        if (food.y == player.y) {
            music.play(music.tonePlayable((262 + score * 12) * 2, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
            food.render()
        } else {
            music.play(music.tonePlayable(262 + score * 12, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
            food.render()
        }
        
    } else {
        music.play(music.tonePlayable((262 + score * 12) / 2, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
    }
    
    if (input.buttonIsPressed(Button.A)) {
        player.x -= 1
    }
    
    if (input.buttonIsPressed(Button.B)) {
        player.x += 1
    }
    
    player.x = Math.max(0, Math.min(4, player.x))
    if (food) {
        if (player.x == food.x && player.y == food.y) {
            food = null
            score += 1
            music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.UntilDone)
            if (score >= 20) {
                break
            }
            
        }
        
    }
    
    player.render()
    basic.pause(200 - score * 5)
}
//  basic.pause(25)
music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.InBackground)
for (let _ = 0; _ < 4; _++) {
    basic.showIcon(IconNames.Heart)
    basic.showIcon(IconNames.SmallHeart)
}
basic.showNumber(Math.floor(control.millis() / 1000))
control.reset()
