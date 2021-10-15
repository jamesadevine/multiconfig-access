
interface HidEvent {
    action: number
    modifier: number
    sel1: number
    sel2?: number
    sel3?: number
}

const colors: number[][] = [
    // powerpoint colors
    [0xfd401e, 0xffffff],
    // teams
     [0x9b29ef, 0xffffff],
    // excel
    [0x27a700, 0xffffff],
    // stack overflow
    [0xfe940a,0x111111],
    // windows
    [0xff0000, 0x00ff00, 0x0000ff, 0xffff00]
]

const configs: HidEvent[][] = [
    // powerpoint
    [
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.None, sel1: jacdac.HidKeyboardKey.P },
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.None, sel1: jacdac.HidKeyboardKey.N }
    ],
    // teams
    [
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.LeftControl | jacdac.HidKeyboardModifiers.LeftShift, sel1: jacdac.HidKeyboardKey.M },
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.LeftControl | jacdac.HidKeyboardModifiers.LeftShift, sel1: jacdac.HidKeyboardKey.O },
    ],
    // excel
    [
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.LeftControl | jacdac.HidKeyboardModifiers.LeftShift, sel1: jacdac.HidKeyboardKey.M },
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.LeftControl | jacdac.HidKeyboardModifiers.LeftShift, sel1: jacdac.HidKeyboardKey.O },
    ],
    // stack overflow
    [
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.LeftControl, sel1: jacdac.HidKeyboardKey.C },
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.LeftControl, sel1: jacdac.HidKeyboardKey.V },
    ],
    // windows
    [
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.LeftAlt, sel1: jacdac.HidKeyboardKey.Tab },
        { action: jacdac.HidKeyboardAction.Press, modifier: jacdac.HidKeyboardModifiers.LeftControl, sel1: jacdac.HidKeyboardKey.W },
    ]
]

let config = 0;
let button2 = new modules.ButtonClient("button2")
let button3 = new modules.ButtonClient("button3")

const repaint = () => {
    const pattern = colors[config]
    let str = "setall "
    for (let i = 0; i < pattern.length; i++)
        str += "# "
    modules.ledPixel1.runProgram(jacdac.lightEncode(str, pattern));
}

modules.button1.onDown(() => {
    config = (config + 1) % configs.length; 
    repaint();
})

const actuate = (idx: number) => {
    const cfg = configs[config][idx]
    modules.hidKeyboard1.key(cfg.action, cfg.modifier, cfg.sel1, cfg.sel2, cfg.sel3)
}

button2.onDown(() => {
    actuate(0);
})

button3.onDown(() => {
    actuate(1);
})

modules.ledPixel1.onConnected(()=>repaint())
