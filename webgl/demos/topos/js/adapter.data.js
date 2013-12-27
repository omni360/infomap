/**
*   ADAPTERS
*   Last updated 02-04-2012
**/ // Adapter helpers

function adapterSecurity(a) {
    var b = [], 
    c = ["Amarr", "Pator", "Luminaire", "New Caldari", "Yulai", "Khanid Prime", "M-MD3B", "5ZXX-K", "Tanoo", "3-CE1R"], 
    d = 3, 
    e, f, g;
    for (var h = 0; h < a.length; h++) {
        e = a[h][1], g = a[h][5];
        switch (g) {
            case .1:
                f = starmapRGB2Hex(229.5, 51, 0);
                break;
            case .2:
                f = starmapRGB2Hex(255, 76.5, 0);
                break;
            case .3:
                f = starmapRGB2Hex(255, 102, 0);
                break;
            case .4:
                f = starmapRGB2Hex(229.5, 127.5, 0);
                break;
            case .5:
                f = starmapRGB2Hex(255, 255, 0);
                break;
            case .6:
                f = starmapRGB2Hex(153, 255, 51);
                break;
            case .7:
                f = starmapRGB2Hex(0, 255, 0);
                break;
            case .8:
                f = starmapRGB2Hex(0, 255, 76.5);
                break;
            case .9:
                f = starmapRGB2Hex(76.5, 255, 204);
                break;
            case 1:
                f = starmapRGB2Hex(51, 255, 255);
                break;
            default:
                f = starmapRGB2Hex(0, 235, 250)
        }
        b.push([e, [g], "0x" + f, d])
    }
    var i = {name: "Security status",defaultColor: "0xFF0000",popupValues: [{popupDesc: "Security status",defaultValue: "0"}],dataList: b,uniqueSystems: c};
    return i
}

function starmap2Hex(a) {
    a = parseInt(a, 10);
    if (isNaN(a))
        return "00";
    a = Math.max(0, Math.min(a, 255));
    return "0123456789ABCDEF".charAt((a - a % 16) / 16) + "0123456789ABCDEF".charAt(a % 16)
}
function starmapRGB2Hex(a, b, c) {
    return starmap2Hex(a) + starmap2Hex(b) + starmap2Hex(c)
} 