// 绘制圆弧
function dWindRose(cx, cy, r, R, d1, d2, t, a) {
    a1 = ((d1 + 90) % 360) * Math.PI / 180;
    a2 = ((d2 + 90) % 360) * Math.PI / 180;
    f = ((a < 180 && t == 1) || (a >= 180 && t == 0)) ? [[1,1,1],[1,1,0]] : [[0,0,1],[0,0,0]];
    return {
        path: [
            ["M", cx + r * Math.cos(a1), cy + r * Math.sin(a1)], 
            ["L", cx + R * Math.cos(a1), cy + R * Math.sin(a1)], 
            ["A", R, R, f[0][0], f[0][1], f[0][2], cx + R * Math.cos(a2), cy + R * Math.sin(a2)], 
            ["L", cx + r * Math.cos(a2), cy + r * Math.sin(a2)], 
            ["A", r, r, f[1][0], f[1][1], f[1][2], cx + r * Math.cos(a1), cy + r * Math.sin(a1)], 
            ["z"]
        ] 
    }
}