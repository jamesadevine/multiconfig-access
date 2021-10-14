
interface HidEvent {
    action: number
    modifier: number
    sel1: number
    sel2?: number
    sel3?: number
}

const colors: number[][] = [
    // powerpoint colors
    [0xfd, 0x40, 0x1e, 0xff, 0xff, 0xff], //[0xfd401e, 0xffffff],
    // teams
    [0x9b,0x29,0xef,0xff,0xff,0xff],  // [0x9b29ef, 0xffffff],
    // excel
    [0x27,0xa7,0x00,0xff,0xff,0xff], //[0x27a700, 0xffffff],
    // stack overflow
    [0xfe,0x94,0x0a],
    // windows
    [0xff,0x00,0x00, 0x00,0xff,0x00, 0x00,0x00,0xff, 0xff, 0xff, 0x00]
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

function runEncoded(prog: string, args?: number[]) {
    let encoded = jacdac.lightEncode(prog, args)
    modules.ledPixel1.runProgram(encoded)
}

const repaint = () => {
    const pattern = colors[config]
    let pixel = 0;
    let str = "setall "
    for (let i = 0; i < pattern.length; i++)
        str += pattern[i].toString()
    modules.ledPixel1.runProgram(jacdac.lightEncode(str, []));
}

modules.button1.onDown(() => {
    config++;
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

pause(500);
repaint();
