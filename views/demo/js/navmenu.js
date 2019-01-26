! function() {
    function e(e, n) {
        var a = e.className,
            o = "" != a ? " " : "";
        added = a + o + n, e.className = added
    }

    function n(e, n) {
        var a = " " + e.className + " ";
        a = a.replace(/(\s+)/gi, " "), removed = a.replace(" " + n + " ", " "), removed = removed.replace(/(^\s+)|(\s+$)/g, ""), e.className = removed
    }

    function a(e, n) {
        var a = e.className,
            o = a.split(/\s+/);
        x = 0;
        for (x in o)
            if (o[x] == n) return !0;
        return !1
    }
    var o = document.getElementById("btnNavMenu");
    o.onclick = function() {
        a(o, "on") ? (n(o, "on"), e(o, "out")) : (n(o, "out"), e(o, "on"))
    }
}();
