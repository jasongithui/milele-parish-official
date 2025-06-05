/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var i_ = Object.create;
  var cn = Object.defineProperty;
  var o_ = Object.getOwnPropertyDescriptor;
  var a_ = Object.getOwnPropertyNames;
  var s_ = Object.getPrototypeOf,
    u_ = Object.prototype.hasOwnProperty;
  var ye = (e, t) => () => (e && (t = e((e = 0))), t);
  var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    ke = (e, t) => {
      for (var r in t) cn(e, r, { get: t[r], enumerable: !0 });
    },
    qs = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of a_(t))
          !u_.call(e, i) &&
            i !== r &&
            cn(e, i, {
              get: () => t[i],
              enumerable: !(n = o_(t, i)) || n.enumerable,
            });
      return e;
    };
  var de = (e, t, r) => (
      (r = e != null ? i_(s_(e)) : {}),
      qs(
        t || !e || !e.__esModule
          ? cn(r, "default", { value: e, enumerable: !0 })
          : r,
        e
      )
    ),
    it = (e) => qs(cn({}, "__esModule", { value: !0 }), e);
  var Ds = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (a) {
          let u = window.getComputedStyle(a, null),
            f = u.getPropertyValue("position"),
            v = u.getPropertyValue("overflow"),
            l = u.getPropertyValue("display");
          (!f || f === "static") && (a.style.position = "relative"),
            v !== "hidden" && (a.style.overflow = "hidden"),
            (!l || l === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            f = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let v in f)
            u.getPropertyValue(v) !== f[v] && (a.style[v] = f[v]);
        },
        o = function (a) {
          let u = a.parentNode;
          n(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let f = a[u].nodeName.toLowerCase();
            if (f === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              f === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var Fs = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        n.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                r(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var Pi = c(() => {
    "use strict";
    window.tram = (function (e) {
      function t(d, T) {
        var O = new m.Bare();
        return O.init(d, T);
      }
      function r(d) {
        return d.replace(/[A-Z]/g, function (T) {
          return "-" + T.toLowerCase();
        });
      }
      function n(d) {
        var T = parseInt(d.slice(1), 16),
          O = (T >> 16) & 255,
          P = (T >> 8) & 255,
          x = 255 & T;
        return [O, P, x];
      }
      function i(d, T, O) {
        return (
          "#" + ((1 << 24) | (d << 16) | (T << 8) | O).toString(16).slice(1)
        );
      }
      function o() {}
      function s(d, T) {
        f("Type warning: Expected: [" + d + "] Got: [" + typeof T + "] " + T);
      }
      function a(d, T, O) {
        f("Units do not match [" + d + "]: " + T + ", " + O);
      }
      function u(d, T, O) {
        if ((T !== void 0 && (O = T), d === void 0)) return O;
        var P = O;
        return (
          Be.test(d) || !Fe.test(d)
            ? (P = parseInt(d, 10))
            : Fe.test(d) && (P = 1e3 * parseFloat(d)),
          0 > P && (P = 0),
          P === P ? P : O
        );
      }
      function f(d) {
        ae.debug && window && window.console.warn(d);
      }
      function v(d) {
        for (var T = -1, O = d ? d.length : 0, P = []; ++T < O; ) {
          var x = d[T];
          x && P.push(x);
        }
        return P;
      }
      var l = (function (d, T, O) {
          function P(se) {
            return typeof se == "object";
          }
          function x(se) {
            return typeof se == "function";
          }
          function q() {}
          function ne(se, he) {
            function K() {
              var Le = new ue();
              return x(Le.init) && Le.init.apply(Le, arguments), Le;
            }
            function ue() {}
            he === O && ((he = se), (se = Object)), (K.Bare = ue);
            var ce,
              Ie = (q[d] = se[d]),
              nt = (ue[d] = K[d] = new q());
            return (
              (nt.constructor = K),
              (K.mixin = function (Le) {
                return (ue[d] = K[d] = ne(K, Le)[d]), K;
              }),
              (K.open = function (Le) {
                if (
                  ((ce = {}),
                  x(Le) ? (ce = Le.call(K, nt, Ie, K, se)) : P(Le) && (ce = Le),
                  P(ce))
                )
                  for (var br in ce) T.call(ce, br) && (nt[br] = ce[br]);
                return x(nt.init) || (nt.init = se), K;
              }),
              K.open(he)
            );
          }
          return ne;
        })("prototype", {}.hasOwnProperty),
        E = {
          ease: [
            "ease",
            function (d, T, O, P) {
              var x = (d /= P) * d,
                q = x * d;
              return (
                T +
                O * (-2.75 * q * x + 11 * x * x + -15.5 * q + 8 * x + 0.25 * d)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (d, T, O, P) {
              var x = (d /= P) * d,
                q = x * d;
              return T + O * (-1 * q * x + 3 * x * x + -3 * q + 2 * x);
            },
          ],
          "ease-out": [
            "ease-out",
            function (d, T, O, P) {
              var x = (d /= P) * d,
                q = x * d;
              return (
                T +
                O * (0.3 * q * x + -1.6 * x * x + 2.2 * q + -1.8 * x + 1.9 * d)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (d, T, O, P) {
              var x = (d /= P) * d,
                q = x * d;
              return T + O * (2 * q * x + -5 * x * x + 2 * q + 2 * x);
            },
          ],
          linear: [
            "linear",
            function (d, T, O, P) {
              return (O * d) / P + T;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (d, T, O, P) {
              return O * (d /= P) * d + T;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (d, T, O, P) {
              return -O * (d /= P) * (d - 2) + T;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (d, T, O, P) {
              return (d /= P / 2) < 1
                ? (O / 2) * d * d + T
                : (-O / 2) * (--d * (d - 2) - 1) + T;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (d, T, O, P) {
              return O * (d /= P) * d * d + T;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (d, T, O, P) {
              return O * ((d = d / P - 1) * d * d + 1) + T;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (d, T, O, P) {
              return (d /= P / 2) < 1
                ? (O / 2) * d * d * d + T
                : (O / 2) * ((d -= 2) * d * d + 2) + T;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (d, T, O, P) {
              return O * (d /= P) * d * d * d + T;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (d, T, O, P) {
              return -O * ((d = d / P - 1) * d * d * d - 1) + T;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (d, T, O, P) {
              return (d /= P / 2) < 1
                ? (O / 2) * d * d * d * d + T
                : (-O / 2) * ((d -= 2) * d * d * d - 2) + T;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (d, T, O, P) {
              return O * (d /= P) * d * d * d * d + T;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (d, T, O, P) {
              return O * ((d = d / P - 1) * d * d * d * d + 1) + T;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (d, T, O, P) {
              return (d /= P / 2) < 1
                ? (O / 2) * d * d * d * d * d + T
                : (O / 2) * ((d -= 2) * d * d * d * d + 2) + T;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (d, T, O, P) {
              return -O * Math.cos((d / P) * (Math.PI / 2)) + O + T;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (d, T, O, P) {
              return O * Math.sin((d / P) * (Math.PI / 2)) + T;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (d, T, O, P) {
              return (-O / 2) * (Math.cos((Math.PI * d) / P) - 1) + T;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (d, T, O, P) {
              return d === 0 ? T : O * Math.pow(2, 10 * (d / P - 1)) + T;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (d, T, O, P) {
              return d === P
                ? T + O
                : O * (-Math.pow(2, (-10 * d) / P) + 1) + T;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (d, T, O, P) {
              return d === 0
                ? T
                : d === P
                ? T + O
                : (d /= P / 2) < 1
                ? (O / 2) * Math.pow(2, 10 * (d - 1)) + T
                : (O / 2) * (-Math.pow(2, -10 * --d) + 2) + T;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (d, T, O, P) {
              return -O * (Math.sqrt(1 - (d /= P) * d) - 1) + T;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (d, T, O, P) {
              return O * Math.sqrt(1 - (d = d / P - 1) * d) + T;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (d, T, O, P) {
              return (d /= P / 2) < 1
                ? (-O / 2) * (Math.sqrt(1 - d * d) - 1) + T
                : (O / 2) * (Math.sqrt(1 - (d -= 2) * d) + 1) + T;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (d, T, O, P, x) {
              return (
                x === void 0 && (x = 1.70158),
                O * (d /= P) * d * ((x + 1) * d - x) + T
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (d, T, O, P, x) {
              return (
                x === void 0 && (x = 1.70158),
                O * ((d = d / P - 1) * d * ((x + 1) * d + x) + 1) + T
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (d, T, O, P, x) {
              return (
                x === void 0 && (x = 1.70158),
                (d /= P / 2) < 1
                  ? (O / 2) * d * d * (((x *= 1.525) + 1) * d - x) + T
                  : (O / 2) *
                      ((d -= 2) * d * (((x *= 1.525) + 1) * d + x) + 2) +
                    T
              );
            },
          ],
        },
        g = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        h = document,
        _ = window,
        A = "bkwld-tram",
        w = /[\-\.0-9]/g,
        N = /[A-Z]/,
        R = "number",
        M = /^(rgb|#)/,
        F = /(em|cm|mm|in|pt|pc|px)$/,
        D = /(em|cm|mm|in|pt|pc|px|%)$/,
        j = /(deg|rad|turn)$/,
        z = "unitless",
        Q = /(all|none) 0s ease 0s/,
        re = /^(width|height)$/,
        X = " ",
        S = h.createElement("a"),
        y = ["Webkit", "Moz", "O", "ms"],
        L = ["-webkit-", "-moz-", "-o-", "-ms-"],
        G = function (d) {
          if (d in S.style) return { dom: d, css: d };
          var T,
            O,
            P = "",
            x = d.split("-");
          for (T = 0; T < x.length; T++)
            P += x[T].charAt(0).toUpperCase() + x[T].slice(1);
          for (T = 0; T < y.length; T++)
            if (((O = y[T] + P), O in S.style))
              return { dom: O, css: L[T] + d };
        },
        U = (t.support = {
          bind: Function.prototype.bind,
          transform: G("transform"),
          transition: G("transition"),
          backface: G("backface-visibility"),
          timing: G("transition-timing-function"),
        });
      if (U.transition) {
        var ee = U.timing.dom;
        if (((S.style[ee] = E["ease-in-back"][0]), !S.style[ee]))
          for (var ie in g) E[ie][0] = g[ie];
      }
      var k = (t.frame = (function () {
          var d =
            _.requestAnimationFrame ||
            _.webkitRequestAnimationFrame ||
            _.mozRequestAnimationFrame ||
            _.oRequestAnimationFrame ||
            _.msRequestAnimationFrame;
          return d && U.bind
            ? d.bind(_)
            : function (T) {
                _.setTimeout(T, 16);
              };
        })()),
        H = (t.now = (function () {
          var d = _.performance,
            T = d && (d.now || d.webkitNow || d.msNow || d.mozNow);
          return T && U.bind
            ? T.bind(d)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        J = l(function (d) {
          function T(oe, le) {
            var be = v(("" + oe).split(X)),
              ge = be[0];
            le = le || {};
            var Ne = Y[ge];
            if (!Ne) return f("Unsupported property: " + ge);
            if (!le.weak || !this.props[ge]) {
              var ze = Ne[0],
                Ge = this.props[ge];
              return (
                Ge || (Ge = this.props[ge] = new ze.Bare()),
                Ge.init(this.$el, be, Ne, le),
                Ge
              );
            }
          }
          function O(oe, le, be) {
            if (oe) {
              var ge = typeof oe;
              if (
                (le ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                ge == "number" && le)
              )
                return (
                  (this.timer = new Z({
                    duration: oe,
                    context: this,
                    complete: q,
                  })),
                  void (this.active = !0)
                );
              if (ge == "string" && le) {
                switch (oe) {
                  case "hide":
                    K.call(this);
                    break;
                  case "stop":
                    ne.call(this);
                    break;
                  case "redraw":
                    ue.call(this);
                    break;
                  default:
                    T.call(this, oe, be && be[1]);
                }
                return q.call(this);
              }
              if (ge == "function") return void oe.call(this, this);
              if (ge == "object") {
                var Ne = 0;
                nt.call(
                  this,
                  oe,
                  function (Te, n_) {
                    Te.span > Ne && (Ne = Te.span), Te.stop(), Te.animate(n_);
                  },
                  function (Te) {
                    "wait" in Te && (Ne = u(Te.wait, 0));
                  }
                ),
                  Ie.call(this),
                  Ne > 0 &&
                    ((this.timer = new Z({ duration: Ne, context: this })),
                    (this.active = !0),
                    le && (this.timer.complete = q));
                var ze = this,
                  Ge = !1,
                  un = {};
                k(function () {
                  nt.call(ze, oe, function (Te) {
                    Te.active && ((Ge = !0), (un[Te.name] = Te.nextStyle));
                  }),
                    Ge && ze.$el.css(un);
                });
              }
            }
          }
          function P(oe) {
            (oe = u(oe, 0)),
              this.active
                ? this.queue.push({ options: oe })
                : ((this.timer = new Z({
                    duration: oe,
                    context: this,
                    complete: q,
                  })),
                  (this.active = !0));
          }
          function x(oe) {
            return this.active
              ? (this.queue.push({ options: oe, args: arguments }),
                void (this.timer.complete = q))
              : f(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function q() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var oe = this.queue.shift();
              O.call(this, oe.options, !0, oe.args);
            }
          }
          function ne(oe) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var le;
            typeof oe == "string"
              ? ((le = {}), (le[oe] = 1))
              : (le = typeof oe == "object" && oe != null ? oe : this.props),
              nt.call(this, le, Le),
              Ie.call(this);
          }
          function se(oe) {
            ne.call(this, oe), nt.call(this, oe, br, t_);
          }
          function he(oe) {
            typeof oe != "string" && (oe = "block"),
              (this.el.style.display = oe);
          }
          function K() {
            ne.call(this), (this.el.style.display = "none");
          }
          function ue() {
            this.el.offsetHeight;
          }
          function ce() {
            ne.call(this),
              e.removeData(this.el, A),
              (this.$el = this.el = null);
          }
          function Ie() {
            var oe,
              le,
              be = [];
            this.upstream && be.push(this.upstream);
            for (oe in this.props)
              (le = this.props[oe]), le.active && be.push(le.string);
            (be = be.join(",")),
              this.style !== be &&
                ((this.style = be), (this.el.style[U.transition.dom] = be));
          }
          function nt(oe, le, be) {
            var ge,
              Ne,
              ze,
              Ge,
              un = le !== Le,
              Te = {};
            for (ge in oe)
              (ze = oe[ge]),
                ge in pe
                  ? (Te.transform || (Te.transform = {}),
                    (Te.transform[ge] = ze))
                  : (N.test(ge) && (ge = r(ge)),
                    ge in Y ? (Te[ge] = ze) : (Ge || (Ge = {}), (Ge[ge] = ze)));
            for (ge in Te) {
              if (((ze = Te[ge]), (Ne = this.props[ge]), !Ne)) {
                if (!un) continue;
                Ne = T.call(this, ge);
              }
              le.call(this, Ne, ze);
            }
            be && Ge && be.call(this, Ge);
          }
          function Le(oe) {
            oe.stop();
          }
          function br(oe, le) {
            oe.set(le);
          }
          function t_(oe) {
            this.$el.css(oe);
          }
          function je(oe, le) {
            d[oe] = function () {
              return this.children
                ? r_.call(this, le, arguments)
                : (this.el && le.apply(this, arguments), this);
            };
          }
          function r_(oe, le) {
            var be,
              ge = this.children.length;
            for (be = 0; ge > be; be++) oe.apply(this.children[be], le);
            return this;
          }
          (d.init = function (oe) {
            if (
              ((this.$el = e(oe)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ae.keepInherited && !ae.fallback)
            ) {
              var le = B(this.el, "transition");
              le && !Q.test(le) && (this.upstream = le);
            }
            U.backface &&
              ae.hideBackface &&
              b(this.el, U.backface.css, "hidden");
          }),
            je("add", T),
            je("start", O),
            je("wait", P),
            je("then", x),
            je("next", q),
            je("stop", ne),
            je("set", se),
            je("show", he),
            je("hide", K),
            je("redraw", ue),
            je("destroy", ce);
        }),
        m = l(J, function (d) {
          function T(O, P) {
            var x = e.data(O, A) || e.data(O, A, new J.Bare());
            return x.el || x.init(O), P ? x.start(P) : x;
          }
          d.init = function (O, P) {
            var x = e(O);
            if (!x.length) return this;
            if (x.length === 1) return T(x[0], P);
            var q = [];
            return (
              x.each(function (ne, se) {
                q.push(T(se, P));
              }),
              (this.children = q),
              this
            );
          };
        }),
        I = l(function (d) {
          function T() {
            var q = this.get();
            this.update("auto");
            var ne = this.get();
            return this.update(q), ne;
          }
          function O(q, ne, se) {
            return ne !== void 0 && (se = ne), q in E ? q : se;
          }
          function P(q) {
            var ne = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(q);
            return (ne ? i(ne[1], ne[2], ne[3]) : q).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var x = { duration: 500, ease: "ease", delay: 0 };
          (d.init = function (q, ne, se, he) {
            (this.$el = q), (this.el = q[0]);
            var K = ne[0];
            se[2] && (K = se[2]),
              te[K] && (K = te[K]),
              (this.name = K),
              (this.type = se[1]),
              (this.duration = u(ne[1], this.duration, x.duration)),
              (this.ease = O(ne[2], this.ease, x.ease)),
              (this.delay = u(ne[3], this.delay, x.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = re.test(this.name)),
              (this.unit = he.unit || this.unit || ae.defaultUnit),
              (this.angle = he.angle || this.angle || ae.defaultAngle),
              ae.fallback || he.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    X +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? X + E[this.ease][0] : "") +
                    (this.delay ? X + this.delay + "ms" : "")));
          }),
            (d.set = function (q) {
              (q = this.convert(q, this.type)), this.update(q), this.redraw();
            }),
            (d.transition = function (q) {
              (this.active = !0),
                (q = this.convert(q, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  q == "auto" && (q = T.call(this))),
                (this.nextStyle = q);
            }),
            (d.fallback = function (q) {
              var ne =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (q = this.convert(q, this.type)),
                this.auto &&
                  (ne == "auto" && (ne = this.convert(this.get(), this.type)),
                  q == "auto" && (q = T.call(this))),
                (this.tween = new C({
                  from: ne,
                  to: q,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (d.get = function () {
              return B(this.el, this.name);
            }),
            (d.update = function (q) {
              b(this.el, this.name, q);
            }),
            (d.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                b(this.el, this.name, this.get()));
              var q = this.tween;
              q && q.context && q.destroy();
            }),
            (d.convert = function (q, ne) {
              if (q == "auto" && this.auto) return q;
              var se,
                he = typeof q == "number",
                K = typeof q == "string";
              switch (ne) {
                case R:
                  if (he) return q;
                  if (K && q.replace(w, "") === "") return +q;
                  se = "number(unitless)";
                  break;
                case M:
                  if (K) {
                    if (q === "" && this.original) return this.original;
                    if (ne.test(q))
                      return q.charAt(0) == "#" && q.length == 7 ? q : P(q);
                  }
                  se = "hex or rgb string";
                  break;
                case F:
                  if (he) return q + this.unit;
                  if (K && ne.test(q)) return q;
                  se = "number(px) or string(unit)";
                  break;
                case D:
                  if (he) return q + this.unit;
                  if (K && ne.test(q)) return q;
                  se = "number(px) or string(unit or %)";
                  break;
                case j:
                  if (he) return q + this.angle;
                  if (K && ne.test(q)) return q;
                  se = "number(deg) or string(angle)";
                  break;
                case z:
                  if (he || (K && D.test(q))) return q;
                  se = "number(unitless) or string(unit or %)";
              }
              return s(se, q), q;
            }),
            (d.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        p = l(I, function (d, T) {
          d.init = function () {
            T.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), M));
          };
        }),
        V = l(I, function (d, T) {
          (d.init = function () {
            T.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (d.get = function () {
              return this.$el[this.name]();
            }),
            (d.update = function (O) {
              this.$el[this.name](O);
            });
        }),
        W = l(I, function (d, T) {
          function O(P, x) {
            var q, ne, se, he, K;
            for (q in P)
              (he = pe[q]),
                (se = he[0]),
                (ne = he[1] || q),
                (K = this.convert(P[q], se)),
                x.call(this, ne, K, se);
          }
          (d.init = function () {
            T.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                pe.perspective &&
                  ae.perspective &&
                  ((this.current.perspective = ae.perspective),
                  b(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (d.set = function (P) {
              O.call(this, P, function (x, q) {
                this.current[x] = q;
              }),
                b(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (d.transition = function (P) {
              var x = this.values(P);
              this.tween = new fe({
                current: this.current,
                values: x,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var q,
                ne = {};
              for (q in this.current) ne[q] = q in x ? x[q] : this.current[q];
              (this.active = !0), (this.nextStyle = this.style(ne));
            }),
            (d.fallback = function (P) {
              var x = this.values(P);
              this.tween = new fe({
                current: this.current,
                values: x,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (d.update = function () {
              b(this.el, this.name, this.style(this.current));
            }),
            (d.style = function (P) {
              var x,
                q = "";
              for (x in P) q += x + "(" + P[x] + ") ";
              return q;
            }),
            (d.values = function (P) {
              var x,
                q = {};
              return (
                O.call(this, P, function (ne, se, he) {
                  (q[ne] = se),
                    this.current[ne] === void 0 &&
                      ((x = 0),
                      ~ne.indexOf("scale") && (x = 1),
                      (this.current[ne] = this.convert(x, he)));
                }),
                q
              );
            });
        }),
        C = l(function (d) {
          function T(K) {
            se.push(K) === 1 && k(O);
          }
          function O() {
            var K,
              ue,
              ce,
              Ie = se.length;
            if (Ie)
              for (k(O), ue = H(), K = Ie; K--; )
                (ce = se[K]), ce && ce.render(ue);
          }
          function P(K) {
            var ue,
              ce = e.inArray(K, se);
            ce >= 0 &&
              ((ue = se.slice(ce + 1)),
              (se.length = ce),
              ue.length && (se = se.concat(ue)));
          }
          function x(K) {
            return Math.round(K * he) / he;
          }
          function q(K, ue, ce) {
            return i(
              K[0] + ce * (ue[0] - K[0]),
              K[1] + ce * (ue[1] - K[1]),
              K[2] + ce * (ue[2] - K[2])
            );
          }
          var ne = { ease: E.ease[1], from: 0, to: 1 };
          (d.init = function (K) {
            (this.duration = K.duration || 0), (this.delay = K.delay || 0);
            var ue = K.ease || ne.ease;
            E[ue] && (ue = E[ue][1]),
              typeof ue != "function" && (ue = ne.ease),
              (this.ease = ue),
              (this.update = K.update || o),
              (this.complete = K.complete || o),
              (this.context = K.context || this),
              (this.name = K.name);
            var ce = K.from,
              Ie = K.to;
            ce === void 0 && (ce = ne.from),
              Ie === void 0 && (Ie = ne.to),
              (this.unit = K.unit || ""),
              typeof ce == "number" && typeof Ie == "number"
                ? ((this.begin = ce), (this.change = Ie - ce))
                : this.format(Ie, ce),
              (this.value = this.begin + this.unit),
              (this.start = H()),
              K.autoplay !== !1 && this.play();
          }),
            (d.play = function () {
              this.active ||
                (this.start || (this.start = H()), (this.active = !0), T(this));
            }),
            (d.stop = function () {
              this.active && ((this.active = !1), P(this));
            }),
            (d.render = function (K) {
              var ue,
                ce = K - this.start;
              if (this.delay) {
                if (ce <= this.delay) return;
                ce -= this.delay;
              }
              if (ce < this.duration) {
                var Ie = this.ease(ce, 0, 1, this.duration);
                return (
                  (ue = this.startRGB
                    ? q(this.startRGB, this.endRGB, Ie)
                    : x(this.begin + Ie * this.change)),
                  (this.value = ue + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ue = this.endHex || this.begin + this.change),
                (this.value = ue + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (d.format = function (K, ue) {
              if (((ue += ""), (K += ""), K.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ue)),
                  (this.endRGB = n(K)),
                  (this.endHex = K),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ce = ue.replace(w, ""),
                  Ie = K.replace(w, "");
                ce !== Ie && a("tween", ue, K), (this.unit = ce);
              }
              (ue = parseFloat(ue)),
                (K = parseFloat(K)),
                (this.begin = this.value = ue),
                (this.change = K - ue);
            }),
            (d.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var se = [],
            he = 1e3;
        }),
        Z = l(C, function (d) {
          (d.init = function (T) {
            (this.duration = T.duration || 0),
              (this.complete = T.complete || o),
              (this.context = T.context),
              this.play();
          }),
            (d.render = function (T) {
              var O = T - this.start;
              O < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        fe = l(C, function (d, T) {
          (d.init = function (O) {
            (this.context = O.context),
              (this.update = O.update),
              (this.tweens = []),
              (this.current = O.current);
            var P, x;
            for (P in O.values)
              (x = O.values[P]),
                this.current[P] !== x &&
                  this.tweens.push(
                    new C({
                      name: P,
                      from: this.current[P],
                      to: x,
                      duration: O.duration,
                      delay: O.delay,
                      ease: O.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (d.render = function (O) {
              var P,
                x,
                q = this.tweens.length,
                ne = !1;
              for (P = q; P--; )
                (x = this.tweens[P]),
                  x.context &&
                    (x.render(O), (this.current[x.name] = x.value), (ne = !0));
              return ne
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (d.destroy = function () {
              if ((T.destroy.call(this), this.tweens)) {
                var O,
                  P = this.tweens.length;
                for (O = P; O--; ) this.tweens[O].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        ae = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !U.transition,
          agentTests: [],
        });
      (t.fallback = function (d) {
        if (!U.transition) return (ae.fallback = !0);
        ae.agentTests.push("(" + d + ")");
        var T = new RegExp(ae.agentTests.join("|"), "i");
        ae.fallback = T.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (d) {
          return new C(d);
        }),
        (t.delay = function (d, T, O) {
          return new Z({ complete: T, duration: d, context: O });
        }),
        (e.fn.tram = function (d) {
          return t.call(null, this, d);
        });
      var b = e.style,
        B = e.css,
        te = { transform: U.transform && U.transform.css },
        Y = {
          color: [p, M],
          background: [p, M, "background-color"],
          "outline-color": [p, M],
          "border-color": [p, M],
          "border-top-color": [p, M],
          "border-right-color": [p, M],
          "border-bottom-color": [p, M],
          "border-left-color": [p, M],
          "border-width": [I, F],
          "border-top-width": [I, F],
          "border-right-width": [I, F],
          "border-bottom-width": [I, F],
          "border-left-width": [I, F],
          "border-spacing": [I, F],
          "letter-spacing": [I, F],
          margin: [I, F],
          "margin-top": [I, F],
          "margin-right": [I, F],
          "margin-bottom": [I, F],
          "margin-left": [I, F],
          padding: [I, F],
          "padding-top": [I, F],
          "padding-right": [I, F],
          "padding-bottom": [I, F],
          "padding-left": [I, F],
          "outline-width": [I, F],
          opacity: [I, R],
          top: [I, D],
          right: [I, D],
          bottom: [I, D],
          left: [I, D],
          "font-size": [I, D],
          "text-indent": [I, D],
          "word-spacing": [I, D],
          width: [I, D],
          "min-width": [I, D],
          "max-width": [I, D],
          height: [I, D],
          "min-height": [I, D],
          "max-height": [I, D],
          "line-height": [I, z],
          "scroll-top": [V, R, "scrollTop"],
          "scroll-left": [V, R, "scrollLeft"],
        },
        pe = {};
      U.transform &&
        ((Y.transform = [W]),
        (pe = {
          x: [D, "translateX"],
          y: [D, "translateY"],
          rotate: [j],
          rotateX: [j],
          rotateY: [j],
          scale: [R],
          scaleX: [R],
          scaleY: [R],
          skew: [j],
          skewX: [j],
          skewY: [j],
        })),
        U.transform &&
          U.backface &&
          ((pe.z = [D, "translateZ"]),
          (pe.rotateZ = [j]),
          (pe.scaleZ = [R]),
          (pe.perspective = [F]));
      var Be = /ms/,
        Fe = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var ks = c((oH, Gs) => {
    "use strict";
    var c_ = window.$,
      l_ = Pi() && c_.tram;
    Gs.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        s = r.slice,
        a = r.concat,
        u = n.toString,
        f = n.hasOwnProperty,
        v = r.forEach,
        l = r.map,
        E = r.reduce,
        g = r.reduceRight,
        h = r.filter,
        _ = r.every,
        A = r.some,
        w = r.indexOf,
        N = r.lastIndexOf,
        R = Array.isArray,
        M = Object.keys,
        F = i.bind,
        D =
          (e.each =
          e.forEach =
            function (y, L, G) {
              if (y == null) return y;
              if (v && y.forEach === v) y.forEach(L, G);
              else if (y.length === +y.length) {
                for (var U = 0, ee = y.length; U < ee; U++)
                  if (L.call(G, y[U], U, y) === t) return;
              } else
                for (var ie = e.keys(y), U = 0, ee = ie.length; U < ee; U++)
                  if (L.call(G, y[ie[U]], ie[U], y) === t) return;
              return y;
            });
      (e.map = e.collect =
        function (y, L, G) {
          var U = [];
          return y == null
            ? U
            : l && y.map === l
            ? y.map(L, G)
            : (D(y, function (ee, ie, k) {
                U.push(L.call(G, ee, ie, k));
              }),
              U);
        }),
        (e.find = e.detect =
          function (y, L, G) {
            var U;
            return (
              j(y, function (ee, ie, k) {
                if (L.call(G, ee, ie, k)) return (U = ee), !0;
              }),
              U
            );
          }),
        (e.filter = e.select =
          function (y, L, G) {
            var U = [];
            return y == null
              ? U
              : h && y.filter === h
              ? y.filter(L, G)
              : (D(y, function (ee, ie, k) {
                  L.call(G, ee, ie, k) && U.push(ee);
                }),
                U);
          });
      var j =
        (e.some =
        e.any =
          function (y, L, G) {
            L || (L = e.identity);
            var U = !1;
            return y == null
              ? U
              : A && y.some === A
              ? y.some(L, G)
              : (D(y, function (ee, ie, k) {
                  if (U || (U = L.call(G, ee, ie, k))) return t;
                }),
                !!U);
          });
      (e.contains = e.include =
        function (y, L) {
          return y == null
            ? !1
            : w && y.indexOf === w
            ? y.indexOf(L) != -1
            : j(y, function (G) {
                return G === L;
              });
        }),
        (e.delay = function (y, L) {
          var G = s.call(arguments, 2);
          return setTimeout(function () {
            return y.apply(null, G);
          }, L);
        }),
        (e.defer = function (y) {
          return e.delay.apply(e, [y, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (y) {
          var L, G, U;
          return function () {
            L ||
              ((L = !0),
              (G = arguments),
              (U = this),
              l_.frame(function () {
                (L = !1), y.apply(U, G);
              }));
          };
        }),
        (e.debounce = function (y, L, G) {
          var U,
            ee,
            ie,
            k,
            H,
            J = function () {
              var m = e.now() - k;
              m < L
                ? (U = setTimeout(J, L - m))
                : ((U = null), G || ((H = y.apply(ie, ee)), (ie = ee = null)));
            };
          return function () {
            (ie = this), (ee = arguments), (k = e.now());
            var m = G && !U;
            return (
              U || (U = setTimeout(J, L)),
              m && ((H = y.apply(ie, ee)), (ie = ee = null)),
              H
            );
          };
        }),
        (e.defaults = function (y) {
          if (!e.isObject(y)) return y;
          for (var L = 1, G = arguments.length; L < G; L++) {
            var U = arguments[L];
            for (var ee in U) y[ee] === void 0 && (y[ee] = U[ee]);
          }
          return y;
        }),
        (e.keys = function (y) {
          if (!e.isObject(y)) return [];
          if (M) return M(y);
          var L = [];
          for (var G in y) e.has(y, G) && L.push(G);
          return L;
        }),
        (e.has = function (y, L) {
          return f.call(y, L);
        }),
        (e.isObject = function (y) {
          return y === Object(y);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var z = /(.)^/,
        Q = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        re = /\\|'|\r|\n|\u2028|\u2029/g,
        X = function (y) {
          return "\\" + Q[y];
        },
        S = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (y, L, G) {
          !L && G && (L = G), (L = e.defaults({}, L, e.templateSettings));
          var U = RegExp(
              [
                (L.escape || z).source,
                (L.interpolate || z).source,
                (L.evaluate || z).source,
              ].join("|") + "|$",
              "g"
            ),
            ee = 0,
            ie = "__p+='";
          y.replace(U, function (m, I, p, V, W) {
            return (
              (ie += y.slice(ee, W).replace(re, X)),
              (ee = W + m.length),
              I
                ? (ie +=
                    `'+
((__t=(` +
                    I +
                    `))==null?'':_.escape(__t))+
'`)
                : p
                ? (ie +=
                    `'+
((__t=(` +
                    p +
                    `))==null?'':__t)+
'`)
                : V &&
                  (ie +=
                    `';
` +
                    V +
                    `
__p+='`),
              m
            );
          }),
            (ie += `';
`);
          var k = L.variable;
          if (k) {
            if (!S.test(k))
              throw new Error("variable is not a bare identifier: " + k);
          } else
            (ie =
              `with(obj||{}){
` +
              ie +
              `}
`),
              (k = "obj");
          ie =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ie +
            `return __p;
`;
          var H;
          try {
            H = new Function(L.variable || "obj", "_", ie);
          } catch (m) {
            throw ((m.source = ie), m);
          }
          var J = function (m) {
            return H.call(this, m, e);
          };
          return (
            (J.source =
              "function(" +
              k +
              `){
` +
              ie +
              "}"),
            J
          );
        }),
        e
      );
    })();
  });
  var Pe = c((aH, zs) => {
    "use strict";
    var ve = {},
      Ht = {},
      Wt = [],
      qi = window.Webflow || [],
      bt = window.jQuery,
      Ye = bt(window),
      f_ = bt(document),
      ot = bt.isFunction,
      Ke = (ve._ = ks()),
      Vs = (ve.tram = Pi() && bt.tram),
      fn = !1,
      Di = !1;
    Vs.config.hideBackface = !1;
    Vs.config.keepInherited = !0;
    ve.define = function (e, t, r) {
      Ht[e] && Ws(Ht[e]);
      var n = (Ht[e] = t(bt, Ke, r) || {});
      return Hs(n), n;
    };
    ve.require = function (e) {
      return Ht[e];
    };
    function Hs(e) {
      ve.env() &&
        (ot(e.design) && Ye.on("__wf_design", e.design),
        ot(e.preview) && Ye.on("__wf_preview", e.preview)),
        ot(e.destroy) && Ye.on("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && d_(e);
    }
    function d_(e) {
      if (fn) {
        e.ready();
        return;
      }
      Ke.contains(Wt, e.ready) || Wt.push(e.ready);
    }
    function Ws(e) {
      ot(e.design) && Ye.off("__wf_design", e.design),
        ot(e.preview) && Ye.off("__wf_preview", e.preview),
        ot(e.destroy) && Ye.off("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && p_(e);
    }
    function p_(e) {
      Wt = Ke.filter(Wt, function (t) {
        return t !== e.ready;
      });
    }
    ve.push = function (e) {
      if (fn) {
        ot(e) && e();
        return;
      }
      qi.push(e);
    };
    ve.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var ln = navigator.userAgent.toLowerCase(),
      Xs = (ve.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      g_ = (ve.env.chrome =
        /chrome/.test(ln) &&
        /Google/.test(navigator.vendor) &&
        parseInt(ln.match(/chrome\/(\d+)\./)[1], 10)),
      v_ = (ve.env.ios = /(ipod|iphone|ipad)/.test(ln));
    ve.env.safari = /safari/.test(ln) && !g_ && !v_;
    var Mi;
    Xs &&
      f_.on("touchstart mousedown", function (e) {
        Mi = e.target;
      });
    ve.validClick = Xs
      ? function (e) {
          return e === Mi || bt.contains(e, Mi);
        }
      : function () {
          return !0;
        };
    var Bs = "resize.webflow orientationchange.webflow load.webflow",
      h_ = "scroll.webflow " + Bs;
    ve.resize = Fi(Ye, Bs);
    ve.scroll = Fi(Ye, h_);
    ve.redraw = Fi();
    function Fi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = Ke.throttle(function (i) {
          Ke.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (Ke.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = Ke.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    ve.location = function (e) {
      window.location = e;
    };
    ve.env() && (ve.location = function () {});
    ve.ready = function () {
      (fn = !0), Di ? m_() : Ke.each(Wt, Us), Ke.each(qi, Us), ve.resize.up();
    };
    function Us(e) {
      ot(e) && e();
    }
    function m_() {
      (Di = !1), Ke.each(Ht, Hs);
    }
    var Rt;
    ve.load = function (e) {
      Rt.then(e);
    };
    function js() {
      Rt && (Rt.reject(), Ye.off("load", Rt.resolve)),
        (Rt = new bt.Deferred()),
        Ye.on("load", Rt.resolve);
    }
    ve.destroy = function (e) {
      (e = e || {}),
        (Di = !0),
        Ye.triggerHandler("__wf_destroy"),
        e.domready != null && (fn = e.domready),
        Ke.each(Ht, Ws),
        ve.resize.off(),
        ve.scroll.off(),
        ve.redraw.off(),
        (Wt = []),
        (qi = []),
        Rt.state() === "pending" && js();
    };
    bt(ve.ready);
    js();
    zs.exports = window.Webflow = ve;
  });
  var Qs = c((sH, Ys) => {
    "use strict";
    var Ks = Pe();
    Ks.define(
      "brand",
      (Ys.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          f;
        t.ready = function () {
          var g = n.attr("data-wf-status"),
            h = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(h) && s.hostname !== h && (g = !0),
            g &&
              !a &&
              ((f = f || l()),
              E(),
              setTimeout(E, 500),
              e(r).off(u, v).on(u, v));
        };
        function v() {
          var g =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(f).attr("style", g ? "display: none !important;" : "");
        }
        function l() {
          var g = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            h = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            _ = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return g.append(h, _), g[0];
        }
        function E() {
          var g = i.children(o),
            h = g.length && g.get(0) === f,
            _ = Ks.env("editor");
          if (h) {
            _ && g.remove();
            return;
          }
          g.length && g.remove(), _ || i.append(f);
        }
        return t;
      })
    );
  });
  var Zs = c((uH, $s) => {
    "use strict";
    var Gi = Pe();
    Gi.define(
      "edit",
      ($s.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (Gi.env("test") || Gi.env("frame")) && !r.fixture && !y_())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          f = r.load || E,
          v = !1;
        try {
          v =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        v
          ? f()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            f()
          : i.on(a, l).triggerHandler(a);
        function l() {
          u || (/\?edit/.test(s.hash) && f());
        }
        function E() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, l),
            N(function (M) {
              e.ajax({
                url: w("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: g(M),
              });
            });
        }
        function g(M) {
          return function (F) {
            if (!F) {
              console.error("Could not load editor data");
              return;
            }
            (F.thirdPartyCookiesSupported = M),
              h(A(F.bugReporterScriptPath), function () {
                h(A(F.scriptPath), function () {
                  window.WebflowEditor(F);
                });
              });
          };
        }
        function h(M, F) {
          e.ajax({ type: "GET", url: M, dataType: "script", cache: !0 }).then(
            F,
            _
          );
        }
        function _(M, F, D) {
          throw (console.error("Could not load editor script: " + F), D);
        }
        function A(M) {
          return M.indexOf("//") >= 0
            ? M
            : w("https://editor-api.webflow.com" + M);
        }
        function w(M) {
          return M.replace(/([^:])\/\//g, "$1/");
        }
        function N(M) {
          var F = window.document.createElement("iframe");
          (F.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (F.style.display = "none"),
            (F.sandbox = "allow-scripts allow-same-origin");
          var D = function (j) {
            j.data === "WF_third_party_cookies_unsupported"
              ? (R(F, D), M(!1))
              : j.data === "WF_third_party_cookies_supported" &&
                (R(F, D), M(!0));
          };
          (F.onerror = function () {
            R(F, D), M(!1);
          }),
            window.addEventListener("message", D, !1),
            window.document.body.appendChild(F);
        }
        function R(M, F) {
          window.removeEventListener("message", F, !1), M.remove();
        }
        return n;
      })
    );
    function y_() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var eu = c((cH, Js) => {
    "use strict";
    var E_ = Pe();
    E_.define(
      "focus-visible",
      (Js.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(R) {
            return !!(
              R &&
              R !== document &&
              R.nodeName !== "HTML" &&
              R.nodeName !== "BODY" &&
              "classList" in R &&
              "contains" in R.classList
            );
          }
          function u(R) {
            var M = R.type,
              F = R.tagName;
            return !!(
              (F === "INPUT" && s[M] && !R.readOnly) ||
              (F === "TEXTAREA" && !R.readOnly) ||
              R.isContentEditable
            );
          }
          function f(R) {
            R.getAttribute("data-wf-focus-visible") ||
              R.setAttribute("data-wf-focus-visible", "true");
          }
          function v(R) {
            R.getAttribute("data-wf-focus-visible") &&
              R.removeAttribute("data-wf-focus-visible");
          }
          function l(R) {
            R.metaKey ||
              R.altKey ||
              R.ctrlKey ||
              (a(r.activeElement) && f(r.activeElement), (n = !0));
          }
          function E() {
            n = !1;
          }
          function g(R) {
            a(R.target) && (n || u(R.target)) && f(R.target);
          }
          function h(R) {
            a(R.target) &&
              R.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              v(R.target));
          }
          function _() {
            document.visibilityState === "hidden" && (i && (n = !0), A());
          }
          function A() {
            document.addEventListener("mousemove", N),
              document.addEventListener("mousedown", N),
              document.addEventListener("mouseup", N),
              document.addEventListener("pointermove", N),
              document.addEventListener("pointerdown", N),
              document.addEventListener("pointerup", N),
              document.addEventListener("touchmove", N),
              document.addEventListener("touchstart", N),
              document.addEventListener("touchend", N);
          }
          function w() {
            document.removeEventListener("mousemove", N),
              document.removeEventListener("mousedown", N),
              document.removeEventListener("mouseup", N),
              document.removeEventListener("pointermove", N),
              document.removeEventListener("pointerdown", N),
              document.removeEventListener("pointerup", N),
              document.removeEventListener("touchmove", N),
              document.removeEventListener("touchstart", N),
              document.removeEventListener("touchend", N);
          }
          function N(R) {
            (R.target.nodeName && R.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), w());
          }
          document.addEventListener("keydown", l, !0),
            document.addEventListener("mousedown", E, !0),
            document.addEventListener("pointerdown", E, !0),
            document.addEventListener("touchstart", E, !0),
            document.addEventListener("visibilitychange", _, !0),
            A(),
            r.addEventListener("focus", g, !0),
            r.addEventListener("blur", h, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var nu = c((lH, ru) => {
    "use strict";
    var tu = Pe();
    tu.define(
      "focus",
      (ru.exports = function () {
        var e = [],
          t = !1;
        function r(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function n(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          n(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            tu.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      })
    );
  });
  var au = c((fH, ou) => {
    "use strict";
    var ki = window.jQuery,
      at = {},
      dn = [],
      iu = ".w-ix",
      pn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), ki(t).triggerHandler(at.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), ki(t).triggerHandler(at.types.OUTRO));
        },
      };
    at.triggers = {};
    at.types = { INTRO: "w-ix-intro" + iu, OUTRO: "w-ix-outro" + iu };
    at.init = function () {
      for (var e = dn.length, t = 0; t < e; t++) {
        var r = dn[t];
        r[0](0, r[1]);
      }
      (dn = []), ki.extend(at.triggers, pn);
    };
    at.async = function () {
      for (var e in pn) {
        var t = pn[e];
        pn.hasOwnProperty(e) &&
          (at.triggers[e] = function (r, n) {
            dn.push([t, n]);
          });
      }
    };
    at.async();
    ou.exports = at;
  });
  var _r = c((dH, cu) => {
    "use strict";
    var Ui = au();
    function su(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var b_ = window.jQuery,
      gn = {},
      uu = ".w-ix",
      __ = {
        reset: function (e, t) {
          Ui.triggers.reset(e, t);
        },
        intro: function (e, t) {
          Ui.triggers.intro(e, t), su(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          Ui.triggers.outro(e, t), su(t, "COMPONENT_INACTIVE");
        },
      };
    gn.triggers = {};
    gn.types = { INTRO: "w-ix-intro" + uu, OUTRO: "w-ix-outro" + uu };
    b_.extend(gn.triggers, __);
    cu.exports = gn;
  });
  var lu = c((pH, pt) => {
    function Vi(e) {
      return (
        (pt.exports = Vi =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (pt.exports.__esModule = !0),
        (pt.exports.default = pt.exports),
        Vi(e)
      );
    }
    (pt.exports = Vi),
      (pt.exports.__esModule = !0),
      (pt.exports.default = pt.exports);
  });
  var vn = c((gH, Ir) => {
    var I_ = lu().default;
    function fu(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (fu = function (i) {
        return i ? r : t;
      })(e);
    }
    function T_(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (I_(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = fu(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(n, o, s)
            : (n[o] = e[o]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (Ir.exports = T_),
      (Ir.exports.__esModule = !0),
      (Ir.exports.default = Ir.exports);
  });
  var du = c((vH, Tr) => {
    function w_(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Tr.exports = w_),
      (Tr.exports.__esModule = !0),
      (Tr.exports.default = Tr.exports);
  });
  var Ee = c((hH, pu) => {
    var hn = function (e) {
      return e && e.Math == Math && e;
    };
    pu.exports =
      hn(typeof globalThis == "object" && globalThis) ||
      hn(typeof window == "object" && window) ||
      hn(typeof self == "object" && self) ||
      hn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Xt = c((mH, gu) => {
    gu.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Lt = c((yH, vu) => {
    var x_ = Xt();
    vu.exports = !x_(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var mn = c((EH, hu) => {
    var wr = Function.prototype.call;
    hu.exports = wr.bind
      ? wr.bind(wr)
      : function () {
          return wr.apply(wr, arguments);
        };
  });
  var bu = c((Eu) => {
    "use strict";
    var mu = {}.propertyIsEnumerable,
      yu = Object.getOwnPropertyDescriptor,
      O_ = yu && !mu.call({ 1: 2 }, 1);
    Eu.f = O_
      ? function (t) {
          var r = yu(this, t);
          return !!r && r.enumerable;
        }
      : mu;
  });
  var Hi = c((_H, _u) => {
    _u.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var Qe = c((IH, Tu) => {
    var Iu = Function.prototype,
      Wi = Iu.bind,
      Xi = Iu.call,
      A_ = Wi && Wi.bind(Xi);
    Tu.exports = Wi
      ? function (e) {
          return e && A_(Xi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Xi.apply(e, arguments);
            }
          );
        };
  });
  var Ou = c((TH, xu) => {
    var wu = Qe(),
      S_ = wu({}.toString),
      C_ = wu("".slice);
    xu.exports = function (e) {
      return C_(S_(e), 8, -1);
    };
  });
  var Su = c((wH, Au) => {
    var R_ = Ee(),
      L_ = Qe(),
      N_ = Xt(),
      P_ = Ou(),
      Bi = R_.Object,
      M_ = L_("".split);
    Au.exports = N_(function () {
      return !Bi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return P_(e) == "String" ? M_(e, "") : Bi(e);
        }
      : Bi;
  });
  var ji = c((xH, Cu) => {
    var q_ = Ee(),
      D_ = q_.TypeError;
    Cu.exports = function (e) {
      if (e == null) throw D_("Can't call method on " + e);
      return e;
    };
  });
  var xr = c((OH, Ru) => {
    var F_ = Su(),
      G_ = ji();
    Ru.exports = function (e) {
      return F_(G_(e));
    };
  });
  var st = c((AH, Lu) => {
    Lu.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Bt = c((SH, Nu) => {
    var k_ = st();
    Nu.exports = function (e) {
      return typeof e == "object" ? e !== null : k_(e);
    };
  });
  var Or = c((CH, Pu) => {
    var zi = Ee(),
      U_ = st(),
      V_ = function (e) {
        return U_(e) ? e : void 0;
      };
    Pu.exports = function (e, t) {
      return arguments.length < 2 ? V_(zi[e]) : zi[e] && zi[e][t];
    };
  });
  var qu = c((RH, Mu) => {
    var H_ = Qe();
    Mu.exports = H_({}.isPrototypeOf);
  });
  var Fu = c((LH, Du) => {
    var W_ = Or();
    Du.exports = W_("navigator", "userAgent") || "";
  });
  var Xu = c((NH, Wu) => {
    var Hu = Ee(),
      Ki = Fu(),
      Gu = Hu.process,
      ku = Hu.Deno,
      Uu = (Gu && Gu.versions) || (ku && ku.version),
      Vu = Uu && Uu.v8,
      $e,
      yn;
    Vu &&
      (($e = Vu.split(".")),
      (yn = $e[0] > 0 && $e[0] < 4 ? 1 : +($e[0] + $e[1])));
    !yn &&
      Ki &&
      (($e = Ki.match(/Edge\/(\d+)/)),
      (!$e || $e[1] >= 74) &&
        (($e = Ki.match(/Chrome\/(\d+)/)), $e && (yn = +$e[1])));
    Wu.exports = yn;
  });
  var Yi = c((PH, ju) => {
    var Bu = Xu(),
      X_ = Xt();
    ju.exports =
      !!Object.getOwnPropertySymbols &&
      !X_(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Bu && Bu < 41)
        );
      });
  });
  var Qi = c((MH, zu) => {
    var B_ = Yi();
    zu.exports = B_ && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var $i = c((qH, Ku) => {
    var j_ = Ee(),
      z_ = Or(),
      K_ = st(),
      Y_ = qu(),
      Q_ = Qi(),
      $_ = j_.Object;
    Ku.exports = Q_
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = z_("Symbol");
          return K_(t) && Y_(t.prototype, $_(e));
        };
  });
  var Qu = c((DH, Yu) => {
    var Z_ = Ee(),
      J_ = Z_.String;
    Yu.exports = function (e) {
      try {
        return J_(e);
      } catch {
        return "Object";
      }
    };
  });
  var Zu = c((FH, $u) => {
    var eI = Ee(),
      tI = st(),
      rI = Qu(),
      nI = eI.TypeError;
    $u.exports = function (e) {
      if (tI(e)) return e;
      throw nI(rI(e) + " is not a function");
    };
  });
  var ec = c((GH, Ju) => {
    var iI = Zu();
    Ju.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : iI(r);
    };
  });
  var rc = c((kH, tc) => {
    var oI = Ee(),
      Zi = mn(),
      Ji = st(),
      eo = Bt(),
      aI = oI.TypeError;
    tc.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && Ji((r = e.toString)) && !eo((n = Zi(r, e)))) ||
        (Ji((r = e.valueOf)) && !eo((n = Zi(r, e)))) ||
        (t !== "string" && Ji((r = e.toString)) && !eo((n = Zi(r, e))))
      )
        return n;
      throw aI("Can't convert object to primitive value");
    };
  });
  var ic = c((UH, nc) => {
    nc.exports = !1;
  });
  var En = c((VH, ac) => {
    var oc = Ee(),
      sI = Object.defineProperty;
    ac.exports = function (e, t) {
      try {
        sI(oc, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        oc[e] = t;
      }
      return t;
    };
  });
  var bn = c((HH, uc) => {
    var uI = Ee(),
      cI = En(),
      sc = "__core-js_shared__",
      lI = uI[sc] || cI(sc, {});
    uc.exports = lI;
  });
  var to = c((WH, lc) => {
    var fI = ic(),
      cc = bn();
    (lc.exports = function (e, t) {
      return cc[e] || (cc[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: fI ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var dc = c((XH, fc) => {
    var dI = Ee(),
      pI = ji(),
      gI = dI.Object;
    fc.exports = function (e) {
      return gI(pI(e));
    };
  });
  var _t = c((BH, pc) => {
    var vI = Qe(),
      hI = dc(),
      mI = vI({}.hasOwnProperty);
    pc.exports =
      Object.hasOwn ||
      function (t, r) {
        return mI(hI(t), r);
      };
  });
  var ro = c((jH, gc) => {
    var yI = Qe(),
      EI = 0,
      bI = Math.random(),
      _I = yI((1).toString);
    gc.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + _I(++EI + bI, 36);
    };
  });
  var no = c((zH, Ec) => {
    var II = Ee(),
      TI = to(),
      vc = _t(),
      wI = ro(),
      hc = Yi(),
      yc = Qi(),
      jt = TI("wks"),
      Nt = II.Symbol,
      mc = Nt && Nt.for,
      xI = yc ? Nt : (Nt && Nt.withoutSetter) || wI;
    Ec.exports = function (e) {
      if (!vc(jt, e) || !(hc || typeof jt[e] == "string")) {
        var t = "Symbol." + e;
        hc && vc(Nt, e)
          ? (jt[e] = Nt[e])
          : yc && mc
          ? (jt[e] = mc(t))
          : (jt[e] = xI(t));
      }
      return jt[e];
    };
  });
  var Tc = c((KH, Ic) => {
    var OI = Ee(),
      AI = mn(),
      bc = Bt(),
      _c = $i(),
      SI = ec(),
      CI = rc(),
      RI = no(),
      LI = OI.TypeError,
      NI = RI("toPrimitive");
    Ic.exports = function (e, t) {
      if (!bc(e) || _c(e)) return e;
      var r = SI(e, NI),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = AI(r, e, t)), !bc(n) || _c(n))
        )
          return n;
        throw LI("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), CI(e, t);
    };
  });
  var io = c((YH, wc) => {
    var PI = Tc(),
      MI = $i();
    wc.exports = function (e) {
      var t = PI(e, "string");
      return MI(t) ? t : t + "";
    };
  });
  var ao = c((QH, Oc) => {
    var qI = Ee(),
      xc = Bt(),
      oo = qI.document,
      DI = xc(oo) && xc(oo.createElement);
    Oc.exports = function (e) {
      return DI ? oo.createElement(e) : {};
    };
  });
  var so = c(($H, Ac) => {
    var FI = Lt(),
      GI = Xt(),
      kI = ao();
    Ac.exports =
      !FI &&
      !GI(function () {
        return (
          Object.defineProperty(kI("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var uo = c((Cc) => {
    var UI = Lt(),
      VI = mn(),
      HI = bu(),
      WI = Hi(),
      XI = xr(),
      BI = io(),
      jI = _t(),
      zI = so(),
      Sc = Object.getOwnPropertyDescriptor;
    Cc.f = UI
      ? Sc
      : function (t, r) {
          if (((t = XI(t)), (r = BI(r)), zI))
            try {
              return Sc(t, r);
            } catch {}
          if (jI(t, r)) return WI(!VI(HI.f, t, r), t[r]);
        };
  });
  var Ar = c((JH, Lc) => {
    var Rc = Ee(),
      KI = Bt(),
      YI = Rc.String,
      QI = Rc.TypeError;
    Lc.exports = function (e) {
      if (KI(e)) return e;
      throw QI(YI(e) + " is not an object");
    };
  });
  var Sr = c((Mc) => {
    var $I = Ee(),
      ZI = Lt(),
      JI = so(),
      Nc = Ar(),
      eT = io(),
      tT = $I.TypeError,
      Pc = Object.defineProperty;
    Mc.f = ZI
      ? Pc
      : function (t, r, n) {
          if ((Nc(t), (r = eT(r)), Nc(n), JI))
            try {
              return Pc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw tT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var _n = c((tW, qc) => {
    var rT = Lt(),
      nT = Sr(),
      iT = Hi();
    qc.exports = rT
      ? function (e, t, r) {
          return nT.f(e, t, iT(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var lo = c((rW, Dc) => {
    var oT = Qe(),
      aT = st(),
      co = bn(),
      sT = oT(Function.toString);
    aT(co.inspectSource) ||
      (co.inspectSource = function (e) {
        return sT(e);
      });
    Dc.exports = co.inspectSource;
  });
  var kc = c((nW, Gc) => {
    var uT = Ee(),
      cT = st(),
      lT = lo(),
      Fc = uT.WeakMap;
    Gc.exports = cT(Fc) && /native code/.test(lT(Fc));
  });
  var fo = c((iW, Vc) => {
    var fT = to(),
      dT = ro(),
      Uc = fT("keys");
    Vc.exports = function (e) {
      return Uc[e] || (Uc[e] = dT(e));
    };
  });
  var In = c((oW, Hc) => {
    Hc.exports = {};
  });
  var Kc = c((aW, zc) => {
    var pT = kc(),
      jc = Ee(),
      po = Qe(),
      gT = Bt(),
      vT = _n(),
      go = _t(),
      vo = bn(),
      hT = fo(),
      mT = In(),
      Wc = "Object already initialized",
      mo = jc.TypeError,
      yT = jc.WeakMap,
      Tn,
      Cr,
      wn,
      ET = function (e) {
        return wn(e) ? Cr(e) : Tn(e, {});
      },
      bT = function (e) {
        return function (t) {
          var r;
          if (!gT(t) || (r = Cr(t)).type !== e)
            throw mo("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    pT || vo.state
      ? ((It = vo.state || (vo.state = new yT())),
        (Xc = po(It.get)),
        (ho = po(It.has)),
        (Bc = po(It.set)),
        (Tn = function (e, t) {
          if (ho(It, e)) throw new mo(Wc);
          return (t.facade = e), Bc(It, e, t), t;
        }),
        (Cr = function (e) {
          return Xc(It, e) || {};
        }),
        (wn = function (e) {
          return ho(It, e);
        }))
      : ((Pt = hT("state")),
        (mT[Pt] = !0),
        (Tn = function (e, t) {
          if (go(e, Pt)) throw new mo(Wc);
          return (t.facade = e), vT(e, Pt, t), t;
        }),
        (Cr = function (e) {
          return go(e, Pt) ? e[Pt] : {};
        }),
        (wn = function (e) {
          return go(e, Pt);
        }));
    var It, Xc, ho, Bc, Pt;
    zc.exports = { set: Tn, get: Cr, has: wn, enforce: ET, getterFor: bT };
  });
  var $c = c((sW, Qc) => {
    var yo = Lt(),
      _T = _t(),
      Yc = Function.prototype,
      IT = yo && Object.getOwnPropertyDescriptor,
      Eo = _T(Yc, "name"),
      TT = Eo && function () {}.name === "something",
      wT = Eo && (!yo || (yo && IT(Yc, "name").configurable));
    Qc.exports = { EXISTS: Eo, PROPER: TT, CONFIGURABLE: wT };
  });
  var rl = c((uW, tl) => {
    var xT = Ee(),
      Zc = st(),
      OT = _t(),
      Jc = _n(),
      AT = En(),
      ST = lo(),
      el = Kc(),
      CT = $c().CONFIGURABLE,
      RT = el.get,
      LT = el.enforce,
      NT = String(String).split("String");
    (tl.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        s = n ? !!n.noTargetGet : !1,
        a = n && n.name !== void 0 ? n.name : t,
        u;
      if (
        (Zc(r) &&
          (String(a).slice(0, 7) === "Symbol(" &&
            (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!OT(r, "name") || (CT && r.name !== a)) && Jc(r, "name", a),
          (u = LT(r)),
          u.source || (u.source = NT.join(typeof a == "string" ? a : ""))),
        e === xT)
      ) {
        o ? (e[t] = r) : AT(t, r);
        return;
      } else i ? !s && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : Jc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Zc(this) && RT(this).source) || ST(this);
    });
  });
  var bo = c((cW, nl) => {
    var PT = Math.ceil,
      MT = Math.floor;
    nl.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? MT : PT)(t);
    };
  });
  var ol = c((lW, il) => {
    var qT = bo(),
      DT = Math.max,
      FT = Math.min;
    il.exports = function (e, t) {
      var r = qT(e);
      return r < 0 ? DT(r + t, 0) : FT(r, t);
    };
  });
  var sl = c((fW, al) => {
    var GT = bo(),
      kT = Math.min;
    al.exports = function (e) {
      return e > 0 ? kT(GT(e), 9007199254740991) : 0;
    };
  });
  var cl = c((dW, ul) => {
    var UT = sl();
    ul.exports = function (e) {
      return UT(e.length);
    };
  });
  var _o = c((pW, fl) => {
    var VT = xr(),
      HT = ol(),
      WT = cl(),
      ll = function (e) {
        return function (t, r, n) {
          var i = VT(t),
            o = WT(i),
            s = HT(n, o),
            a;
          if (e && r != r) {
            for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
          } else
            for (; o > s; s++)
              if ((e || s in i) && i[s] === r) return e || s || 0;
          return !e && -1;
        };
      };
    fl.exports = { includes: ll(!0), indexOf: ll(!1) };
  });
  var To = c((gW, pl) => {
    var XT = Qe(),
      Io = _t(),
      BT = xr(),
      jT = _o().indexOf,
      zT = In(),
      dl = XT([].push);
    pl.exports = function (e, t) {
      var r = BT(e),
        n = 0,
        i = [],
        o;
      for (o in r) !Io(zT, o) && Io(r, o) && dl(i, o);
      for (; t.length > n; ) Io(r, (o = t[n++])) && (~jT(i, o) || dl(i, o));
      return i;
    };
  });
  var xn = c((vW, gl) => {
    gl.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var hl = c((vl) => {
    var KT = To(),
      YT = xn(),
      QT = YT.concat("length", "prototype");
    vl.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return KT(t, QT);
      };
  });
  var yl = c((ml) => {
    ml.f = Object.getOwnPropertySymbols;
  });
  var bl = c((yW, El) => {
    var $T = Or(),
      ZT = Qe(),
      JT = hl(),
      ew = yl(),
      tw = Ar(),
      rw = ZT([].concat);
    El.exports =
      $T("Reflect", "ownKeys") ||
      function (t) {
        var r = JT.f(tw(t)),
          n = ew.f;
        return n ? rw(r, n(t)) : r;
      };
  });
  var Il = c((EW, _l) => {
    var nw = _t(),
      iw = bl(),
      ow = uo(),
      aw = Sr();
    _l.exports = function (e, t) {
      for (var r = iw(t), n = aw.f, i = ow.f, o = 0; o < r.length; o++) {
        var s = r[o];
        nw(e, s) || n(e, s, i(t, s));
      }
    };
  });
  var wl = c((bW, Tl) => {
    var sw = Xt(),
      uw = st(),
      cw = /#|\.prototype\./,
      Rr = function (e, t) {
        var r = fw[lw(e)];
        return r == pw ? !0 : r == dw ? !1 : uw(t) ? sw(t) : !!t;
      },
      lw = (Rr.normalize = function (e) {
        return String(e).replace(cw, ".").toLowerCase();
      }),
      fw = (Rr.data = {}),
      dw = (Rr.NATIVE = "N"),
      pw = (Rr.POLYFILL = "P");
    Tl.exports = Rr;
  });
  var Ol = c((_W, xl) => {
    var wo = Ee(),
      gw = uo().f,
      vw = _n(),
      hw = rl(),
      mw = En(),
      yw = Il(),
      Ew = wl();
    xl.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        s,
        a,
        u,
        f,
        v;
      if (
        (n
          ? (s = wo)
          : i
          ? (s = wo[r] || mw(r, {}))
          : (s = (wo[r] || {}).prototype),
        s)
      )
        for (a in t) {
          if (
            ((f = t[a]),
            e.noTargetGet ? ((v = gw(s, a)), (u = v && v.value)) : (u = s[a]),
            (o = Ew(n ? a : r + (i ? "." : "#") + a, e.forced)),
            !o && u !== void 0)
          ) {
            if (typeof f == typeof u) continue;
            yw(f, u);
          }
          (e.sham || (u && u.sham)) && vw(f, "sham", !0), hw(s, a, f, e);
        }
    };
  });
  var Sl = c((IW, Al) => {
    var bw = To(),
      _w = xn();
    Al.exports =
      Object.keys ||
      function (t) {
        return bw(t, _w);
      };
  });
  var Rl = c((TW, Cl) => {
    var Iw = Lt(),
      Tw = Sr(),
      ww = Ar(),
      xw = xr(),
      Ow = Sl();
    Cl.exports = Iw
      ? Object.defineProperties
      : function (t, r) {
          ww(t);
          for (var n = xw(r), i = Ow(r), o = i.length, s = 0, a; o > s; )
            Tw.f(t, (a = i[s++]), n[a]);
          return t;
        };
  });
  var Nl = c((wW, Ll) => {
    var Aw = Or();
    Ll.exports = Aw("document", "documentElement");
  });
  var Ul = c((xW, kl) => {
    var Sw = Ar(),
      Cw = Rl(),
      Pl = xn(),
      Rw = In(),
      Lw = Nl(),
      Nw = ao(),
      Pw = fo(),
      Ml = ">",
      ql = "<",
      Oo = "prototype",
      Ao = "script",
      Fl = Pw("IE_PROTO"),
      xo = function () {},
      Gl = function (e) {
        return ql + Ao + Ml + e + ql + "/" + Ao + Ml;
      },
      Dl = function (e) {
        e.write(Gl("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      Mw = function () {
        var e = Nw("iframe"),
          t = "java" + Ao + ":",
          r;
        return (
          (e.style.display = "none"),
          Lw.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Gl("document.F=Object")),
          r.close(),
          r.F
        );
      },
      On,
      An = function () {
        try {
          On = new ActiveXObject("htmlfile");
        } catch {}
        An =
          typeof document < "u"
            ? document.domain && On
              ? Dl(On)
              : Mw()
            : Dl(On);
        for (var e = Pl.length; e--; ) delete An[Oo][Pl[e]];
        return An();
      };
    Rw[Fl] = !0;
    kl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((xo[Oo] = Sw(t)), (n = new xo()), (xo[Oo] = null), (n[Fl] = t))
            : (n = An()),
          r === void 0 ? n : Cw(n, r)
        );
      };
  });
  var Hl = c((OW, Vl) => {
    var qw = no(),
      Dw = Ul(),
      Fw = Sr(),
      So = qw("unscopables"),
      Co = Array.prototype;
    Co[So] == null && Fw.f(Co, So, { configurable: !0, value: Dw(null) });
    Vl.exports = function (e) {
      Co[So][e] = !0;
    };
  });
  var Wl = c(() => {
    "use strict";
    var Gw = Ol(),
      kw = _o().includes,
      Uw = Hl();
    Gw(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return kw(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    Uw("includes");
  });
  var Bl = c((CW, Xl) => {
    var Vw = Ee(),
      Hw = Qe();
    Xl.exports = function (e, t) {
      return Hw(Vw[e].prototype[t]);
    };
  });
  var zl = c((RW, jl) => {
    Wl();
    var Ww = Bl();
    jl.exports = Ww("Array", "includes");
  });
  var Yl = c((LW, Kl) => {
    var Xw = zl();
    Kl.exports = Xw;
  });
  var $l = c((NW, Ql) => {
    var Bw = Yl();
    Ql.exports = Bw;
  });
  var Ro = c((PW, Zl) => {
    var jw =
      typeof global == "object" && global && global.Object === Object && global;
    Zl.exports = jw;
  });
  var Ze = c((MW, Jl) => {
    var zw = Ro(),
      Kw = typeof self == "object" && self && self.Object === Object && self,
      Yw = zw || Kw || Function("return this")();
    Jl.exports = Yw;
  });
  var zt = c((qW, ef) => {
    var Qw = Ze(),
      $w = Qw.Symbol;
    ef.exports = $w;
  });
  var of = c((DW, nf) => {
    var tf = zt(),
      rf = Object.prototype,
      Zw = rf.hasOwnProperty,
      Jw = rf.toString,
      Lr = tf ? tf.toStringTag : void 0;
    function ex(e) {
      var t = Zw.call(e, Lr),
        r = e[Lr];
      try {
        e[Lr] = void 0;
        var n = !0;
      } catch {}
      var i = Jw.call(e);
      return n && (t ? (e[Lr] = r) : delete e[Lr]), i;
    }
    nf.exports = ex;
  });
  var sf = c((FW, af) => {
    var tx = Object.prototype,
      rx = tx.toString;
    function nx(e) {
      return rx.call(e);
    }
    af.exports = nx;
  });
  var Tt = c((GW, lf) => {
    var uf = zt(),
      ix = of(),
      ox = sf(),
      ax = "[object Null]",
      sx = "[object Undefined]",
      cf = uf ? uf.toStringTag : void 0;
    function ux(e) {
      return e == null
        ? e === void 0
          ? sx
          : ax
        : cf && cf in Object(e)
        ? ix(e)
        : ox(e);
    }
    lf.exports = ux;
  });
  var Lo = c((kW, ff) => {
    function cx(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    ff.exports = cx;
  });
  var No = c((UW, df) => {
    var lx = Lo(),
      fx = lx(Object.getPrototypeOf, Object);
    df.exports = fx;
  });
  var gt = c((VW, pf) => {
    function dx(e) {
      return e != null && typeof e == "object";
    }
    pf.exports = dx;
  });
  var Po = c((HW, vf) => {
    var px = Tt(),
      gx = No(),
      vx = gt(),
      hx = "[object Object]",
      mx = Function.prototype,
      yx = Object.prototype,
      gf = mx.toString,
      Ex = yx.hasOwnProperty,
      bx = gf.call(Object);
    function _x(e) {
      if (!vx(e) || px(e) != hx) return !1;
      var t = gx(e);
      if (t === null) return !0;
      var r = Ex.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && gf.call(r) == bx;
    }
    vf.exports = _x;
  });
  var hf = c((Mo) => {
    "use strict";
    Object.defineProperty(Mo, "__esModule", { value: !0 });
    Mo.default = Ix;
    function Ix(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var mf = c((Do, qo) => {
    "use strict";
    Object.defineProperty(Do, "__esModule", { value: !0 });
    var Tx = hf(),
      wx = xx(Tx);
    function xx(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Kt;
    typeof self < "u"
      ? (Kt = self)
      : typeof window < "u"
      ? (Kt = window)
      : typeof global < "u"
      ? (Kt = global)
      : typeof qo < "u"
      ? (Kt = qo)
      : (Kt = Function("return this")());
    var Ox = (0, wx.default)(Kt);
    Do.default = Ox;
  });
  var Fo = c((Nr) => {
    "use strict";
    Nr.__esModule = !0;
    Nr.ActionTypes = void 0;
    Nr.default = _f;
    var Ax = Po(),
      Sx = bf(Ax),
      Cx = mf(),
      yf = bf(Cx);
    function bf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Ef = (Nr.ActionTypes = { INIT: "@@redux/INIT" });
    function _f(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(_f)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function f() {
        a === s && (a = s.slice());
      }
      function v() {
        return o;
      }
      function l(_) {
        if (typeof _ != "function")
          throw new Error("Expected listener to be a function.");
        var A = !0;
        return (
          f(),
          a.push(_),
          function () {
            if (A) {
              (A = !1), f();
              var N = a.indexOf(_);
              a.splice(N, 1);
            }
          }
        );
      }
      function E(_) {
        if (!(0, Sx.default)(_))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof _.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, _));
        } finally {
          u = !1;
        }
        for (var A = (s = a), w = 0; w < A.length; w++) A[w]();
        return _;
      }
      function g(_) {
        if (typeof _ != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = _), E({ type: Ef.INIT });
      }
      function h() {
        var _,
          A = l;
        return (
          (_ = {
            subscribe: function (N) {
              if (typeof N != "object")
                throw new TypeError("Expected the observer to be an object.");
              function R() {
                N.next && N.next(v());
              }
              R();
              var M = A(R);
              return { unsubscribe: M };
            },
          }),
          (_[yf.default] = function () {
            return this;
          }),
          _
        );
      }
      return (
        E({ type: Ef.INIT }),
        (n = { dispatch: E, subscribe: l, getState: v, replaceReducer: g }),
        (n[yf.default] = h),
        n
      );
    }
  });
  var ko = c((Go) => {
    "use strict";
    Go.__esModule = !0;
    Go.default = Rx;
    function Rx(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var wf = c((Uo) => {
    "use strict";
    Uo.__esModule = !0;
    Uo.default = qx;
    var If = Fo(),
      Lx = Po(),
      jW = Tf(Lx),
      Nx = ko(),
      zW = Tf(Nx);
    function Tf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Px(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function Mx(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: If.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                If.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function qx(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var s;
      var a;
      try {
        Mx(r);
      } catch (u) {
        a = u;
      }
      return function () {
        var f =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          v = arguments[1];
        if (a) throw a;
        if (!1) var l;
        for (var E = !1, g = {}, h = 0; h < o.length; h++) {
          var _ = o[h],
            A = r[_],
            w = f[_],
            N = A(w, v);
          if (typeof N > "u") {
            var R = Px(_, v);
            throw new Error(R);
          }
          (g[_] = N), (E = E || N !== w);
        }
        return E ? g : f;
      };
    }
  });
  var Of = c((Vo) => {
    "use strict";
    Vo.__esModule = !0;
    Vo.default = Dx;
    function xf(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Dx(e, t) {
      if (typeof e == "function") return xf(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          s = e[o];
        typeof s == "function" && (n[o] = xf(s, t));
      }
      return n;
    }
  });
  var Wo = c((Ho) => {
    "use strict";
    Ho.__esModule = !0;
    Ho.default = Fx;
    function Fx() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var Af = c((Xo) => {
    "use strict";
    Xo.__esModule = !0;
    var Gx =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Xo.default = Hx;
    var kx = Wo(),
      Ux = Vx(kx);
    function Vx(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Hx() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, s) {
          var a = n(i, o, s),
            u = a.dispatch,
            f = [],
            v = {
              getState: a.getState,
              dispatch: function (E) {
                return u(E);
              },
            };
          return (
            (f = t.map(function (l) {
              return l(v);
            })),
            (u = Ux.default.apply(void 0, f)(a.dispatch)),
            Gx({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var Bo = c((We) => {
    "use strict";
    We.__esModule = !0;
    We.compose =
      We.applyMiddleware =
      We.bindActionCreators =
      We.combineReducers =
      We.createStore =
        void 0;
    var Wx = Fo(),
      Xx = Yt(Wx),
      Bx = wf(),
      jx = Yt(Bx),
      zx = Of(),
      Kx = Yt(zx),
      Yx = Af(),
      Qx = Yt(Yx),
      $x = Wo(),
      Zx = Yt($x),
      Jx = ko(),
      ZW = Yt(Jx);
    function Yt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    We.createStore = Xx.default;
    We.combineReducers = jx.default;
    We.bindActionCreators = Kx.default;
    We.applyMiddleware = Qx.default;
    We.compose = Zx.default;
  });
  var Je,
    jo,
    ut,
    eO,
    tO,
    zo,
    rO,
    Sf = ye(() => {
      "use strict";
      (Je = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (jo = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (ut = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (eO = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (tO = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (zo = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (rO = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Xe,
    nO,
    Ko = ye(() => {
      "use strict";
      (Xe = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (nO = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var iO,
    Cf = ye(() => {
      "use strict";
      iO = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var oO,
    aO,
    sO,
    uO,
    cO,
    lO,
    fO,
    Yo,
    Rf = ye(() => {
      "use strict";
      Ko();
      ({
        TRANSFORM_MOVE: oO,
        TRANSFORM_SCALE: aO,
        TRANSFORM_ROTATE: sO,
        TRANSFORM_SKEW: uO,
        STYLE_SIZE: cO,
        STYLE_FILTER: lO,
        STYLE_FONT_VARIATION: fO,
      } = Xe),
        (Yo = {
          [oO]: !0,
          [aO]: !0,
          [sO]: !0,
          [uO]: !0,
          [cO]: !0,
          [lO]: !0,
          [fO]: !0,
        });
    });
  var we = {};
  ke(we, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => SO,
    IX2_ANIMATION_FRAME_CHANGED: () => IO,
    IX2_CLEAR_REQUESTED: () => EO,
    IX2_ELEMENT_STATE_CHANGED: () => AO,
    IX2_EVENT_LISTENER_ADDED: () => bO,
    IX2_EVENT_STATE_CHANGED: () => _O,
    IX2_INSTANCE_ADDED: () => wO,
    IX2_INSTANCE_REMOVED: () => OO,
    IX2_INSTANCE_STARTED: () => xO,
    IX2_MEDIA_QUERIES_DEFINED: () => RO,
    IX2_PARAMETER_CHANGED: () => TO,
    IX2_PLAYBACK_REQUESTED: () => mO,
    IX2_PREVIEW_REQUESTED: () => hO,
    IX2_RAW_DATA_IMPORTED: () => dO,
    IX2_SESSION_INITIALIZED: () => pO,
    IX2_SESSION_STARTED: () => gO,
    IX2_SESSION_STOPPED: () => vO,
    IX2_STOP_REQUESTED: () => yO,
    IX2_TEST_FRAME_RENDERED: () => LO,
    IX2_VIEWPORT_WIDTH_CHANGED: () => CO,
  });
  var dO,
    pO,
    gO,
    vO,
    hO,
    mO,
    yO,
    EO,
    bO,
    _O,
    IO,
    TO,
    wO,
    xO,
    OO,
    AO,
    SO,
    CO,
    RO,
    LO,
    Lf = ye(() => {
      "use strict";
      (dO = "IX2_RAW_DATA_IMPORTED"),
        (pO = "IX2_SESSION_INITIALIZED"),
        (gO = "IX2_SESSION_STARTED"),
        (vO = "IX2_SESSION_STOPPED"),
        (hO = "IX2_PREVIEW_REQUESTED"),
        (mO = "IX2_PLAYBACK_REQUESTED"),
        (yO = "IX2_STOP_REQUESTED"),
        (EO = "IX2_CLEAR_REQUESTED"),
        (bO = "IX2_EVENT_LISTENER_ADDED"),
        (_O = "IX2_EVENT_STATE_CHANGED"),
        (IO = "IX2_ANIMATION_FRAME_CHANGED"),
        (TO = "IX2_PARAMETER_CHANGED"),
        (wO = "IX2_INSTANCE_ADDED"),
        (xO = "IX2_INSTANCE_STARTED"),
        (OO = "IX2_INSTANCE_REMOVED"),
        (AO = "IX2_ELEMENT_STATE_CHANGED"),
        (SO = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (CO = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (RO = "IX2_MEDIA_QUERIES_DEFINED"),
        (LO = "IX2_TEST_FRAME_RENDERED");
    });
  var Re = {};
  ke(Re, {
    ABSTRACT_NODE: () => CA,
    AUTO: () => yA,
    BACKGROUND: () => dA,
    BACKGROUND_COLOR: () => fA,
    BAR_DELIMITER: () => _A,
    BORDER_COLOR: () => pA,
    BOUNDARY_SELECTOR: () => DO,
    CHILDREN: () => IA,
    COLON_DELIMITER: () => bA,
    COLOR: () => gA,
    COMMA_DELIMITER: () => EA,
    CONFIG_UNIT: () => XO,
    CONFIG_VALUE: () => UO,
    CONFIG_X_UNIT: () => VO,
    CONFIG_X_VALUE: () => FO,
    CONFIG_Y_UNIT: () => HO,
    CONFIG_Y_VALUE: () => GO,
    CONFIG_Z_UNIT: () => WO,
    CONFIG_Z_VALUE: () => kO,
    DISPLAY: () => vA,
    FILTER: () => sA,
    FLEX: () => hA,
    FONT_VARIATION_SETTINGS: () => uA,
    HEIGHT: () => lA,
    HTML_ELEMENT: () => AA,
    IMMEDIATE_CHILDREN: () => TA,
    IX2_ID_DELIMITER: () => NO,
    OPACITY: () => aA,
    PARENT: () => xA,
    PLAIN_OBJECT: () => SA,
    PRESERVE_3D: () => OA,
    RENDER_GENERAL: () => LA,
    RENDER_PLUGIN: () => PA,
    RENDER_STYLE: () => NA,
    RENDER_TRANSFORM: () => RA,
    ROTATE_X: () => eA,
    ROTATE_Y: () => tA,
    ROTATE_Z: () => rA,
    SCALE_3D: () => JO,
    SCALE_X: () => QO,
    SCALE_Y: () => $O,
    SCALE_Z: () => ZO,
    SIBLINGS: () => wA,
    SKEW: () => nA,
    SKEW_X: () => iA,
    SKEW_Y: () => oA,
    TRANSFORM: () => BO,
    TRANSLATE_3D: () => YO,
    TRANSLATE_X: () => jO,
    TRANSLATE_Y: () => zO,
    TRANSLATE_Z: () => KO,
    WF_PAGE: () => PO,
    WIDTH: () => cA,
    WILL_CHANGE: () => mA,
    W_MOD_IX: () => qO,
    W_MOD_JS: () => MO,
  });
  var NO,
    PO,
    MO,
    qO,
    DO,
    FO,
    GO,
    kO,
    UO,
    VO,
    HO,
    WO,
    XO,
    BO,
    jO,
    zO,
    KO,
    YO,
    QO,
    $O,
    ZO,
    JO,
    eA,
    tA,
    rA,
    nA,
    iA,
    oA,
    aA,
    sA,
    uA,
    cA,
    lA,
    fA,
    dA,
    pA,
    gA,
    vA,
    hA,
    mA,
    yA,
    EA,
    bA,
    _A,
    IA,
    TA,
    wA,
    xA,
    OA,
    AA,
    SA,
    CA,
    RA,
    LA,
    NA,
    PA,
    Nf = ye(() => {
      "use strict";
      (NO = "|"),
        (PO = "data-wf-page"),
        (MO = "w-mod-js"),
        (qO = "w-mod-ix"),
        (DO = ".w-dyn-item"),
        (FO = "xValue"),
        (GO = "yValue"),
        (kO = "zValue"),
        (UO = "value"),
        (VO = "xUnit"),
        (HO = "yUnit"),
        (WO = "zUnit"),
        (XO = "unit"),
        (BO = "transform"),
        (jO = "translateX"),
        (zO = "translateY"),
        (KO = "translateZ"),
        (YO = "translate3d"),
        (QO = "scaleX"),
        ($O = "scaleY"),
        (ZO = "scaleZ"),
        (JO = "scale3d"),
        (eA = "rotateX"),
        (tA = "rotateY"),
        (rA = "rotateZ"),
        (nA = "skew"),
        (iA = "skewX"),
        (oA = "skewY"),
        (aA = "opacity"),
        (sA = "filter"),
        (uA = "font-variation-settings"),
        (cA = "width"),
        (lA = "height"),
        (fA = "backgroundColor"),
        (dA = "background"),
        (pA = "borderColor"),
        (gA = "color"),
        (vA = "display"),
        (hA = "flex"),
        (mA = "willChange"),
        (yA = "AUTO"),
        (EA = ","),
        (bA = ":"),
        (_A = "|"),
        (IA = "CHILDREN"),
        (TA = "IMMEDIATE_CHILDREN"),
        (wA = "SIBLINGS"),
        (xA = "PARENT"),
        (OA = "preserve-3d"),
        (AA = "HTML_ELEMENT"),
        (SA = "PLAIN_OBJECT"),
        (CA = "ABSTRACT_NODE"),
        (RA = "RENDER_TRANSFORM"),
        (LA = "RENDER_GENERAL"),
        (NA = "RENDER_STYLE"),
        (PA = "RENDER_PLUGIN");
    });
  var Pf = {};
  ke(Pf, {
    ActionAppliesTo: () => nO,
    ActionTypeConsts: () => Xe,
    EventAppliesTo: () => jo,
    EventBasedOn: () => ut,
    EventContinuousMouseAxes: () => eO,
    EventLimitAffectedElements: () => tO,
    EventTypeConsts: () => Je,
    IX2EngineActionTypes: () => we,
    IX2EngineConstants: () => Re,
    InteractionTypeConsts: () => iO,
    QuickEffectDirectionConsts: () => rO,
    QuickEffectIds: () => zo,
    ReducedMotionTypes: () => Yo,
  });
  var Ue = ye(() => {
    "use strict";
    Sf();
    Ko();
    Cf();
    Rf();
    Lf();
    Nf();
  });
  var MA,
    Mf,
    qf = ye(() => {
      "use strict";
      Ue();
      ({ IX2_RAW_DATA_IMPORTED: MA } = we),
        (Mf = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case MA:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Qt = c((_e) => {
    "use strict";
    Object.defineProperty(_e, "__esModule", { value: !0 });
    var qA =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    _e.clone = Cn;
    _e.addLast = Gf;
    _e.addFirst = kf;
    _e.removeLast = Uf;
    _e.removeFirst = Vf;
    _e.insert = Hf;
    _e.removeAt = Wf;
    _e.replaceAt = Xf;
    _e.getIn = Rn;
    _e.set = Ln;
    _e.setIn = Nn;
    _e.update = jf;
    _e.updateIn = zf;
    _e.merge = Kf;
    _e.mergeDeep = Yf;
    _e.mergeIn = Qf;
    _e.omit = $f;
    _e.addDefaults = Zf;
    var Df = "INVALID_ARGS";
    function Ff(e) {
      throw new Error(e);
    }
    function Qo(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var DA = {}.hasOwnProperty;
    function Cn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = Qo(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function Ve(e, t, r) {
      var n = r;
      n == null && Ff(Df);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var f = s[u];
        if (f != null) {
          var v = Qo(f);
          if (v.length)
            for (var l = 0; l <= v.length; l++) {
              var E = v[l];
              if (!(e && n[E] !== void 0)) {
                var g = f[E];
                t && Sn(n[E]) && Sn(g) && (g = Ve(e, t, n[E], g)),
                  !(g === void 0 || g === n[E]) &&
                    (i || ((i = !0), (n = Cn(n))), (n[E] = g));
              }
            }
        }
      }
      return n;
    }
    function Sn(e) {
      var t = typeof e > "u" ? "undefined" : qA(e);
      return e != null && (t === "object" || t === "function");
    }
    function Gf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function kf(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Uf(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Vf(e) {
      return e.length ? e.slice(1) : e;
    }
    function Hf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Wf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Xf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return (i[t] = r), i;
    }
    function Rn(e, t) {
      if ((!Array.isArray(t) && Ff(Df), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function Ln(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = Cn(i);
      return (o[t] = r), o;
    }
    function Bf(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var s =
          Sn(e) && Sn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = Bf(s, t, r, n + 1);
      }
      return Ln(e, o, i);
    }
    function Nn(e, t, r) {
      return t.length ? Bf(e, t, r, 0) : r;
    }
    function jf(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return Ln(e, t, i);
    }
    function zf(e, t, r) {
      var n = Rn(e, t),
        i = r(n);
      return Nn(e, t, i);
    }
    function Kf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ve.call.apply(Ve, [null, !1, !1, e, t, r, n, i, o].concat(a))
        : Ve(!1, !1, e, t, r, n, i, o);
    }
    function Yf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ve.call.apply(Ve, [null, !1, !0, e, t, r, n, i, o].concat(a))
        : Ve(!1, !0, e, t, r, n, i, o);
    }
    function Qf(e, t, r, n, i, o, s) {
      var a = Rn(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          f = arguments.length,
          v = Array(f > 7 ? f - 7 : 0),
          l = 7;
        l < f;
        l++
      )
        v[l - 7] = arguments[l];
      return (
        v.length
          ? (u = Ve.call.apply(Ve, [null, !1, !1, a, r, n, i, o, s].concat(v)))
          : (u = Ve(!1, !1, a, r, n, i, o, s)),
        Nn(e, t, u)
      );
    }
    function $f(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (DA.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, s = Qo(e), a = 0; a < s.length; a++) {
        var u = s[a];
        r.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Zf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ve.call.apply(Ve, [null, !0, !1, e, t, r, n, i, o].concat(a))
        : Ve(!0, !1, e, t, r, n, i, o);
    }
    var FA = {
      clone: Cn,
      addLast: Gf,
      addFirst: kf,
      removeLast: Uf,
      removeFirst: Vf,
      insert: Hf,
      removeAt: Wf,
      replaceAt: Xf,
      getIn: Rn,
      set: Ln,
      setIn: Nn,
      update: jf,
      updateIn: zf,
      merge: Kf,
      mergeDeep: Yf,
      mergeIn: Qf,
      omit: $f,
      addDefaults: Zf,
    };
    _e.default = FA;
  });
  var ed,
    GA,
    kA,
    UA,
    VA,
    HA,
    Jf,
    td,
    rd = ye(() => {
      "use strict";
      Ue();
      (ed = de(Qt())),
        ({
          IX2_PREVIEW_REQUESTED: GA,
          IX2_PLAYBACK_REQUESTED: kA,
          IX2_STOP_REQUESTED: UA,
          IX2_CLEAR_REQUESTED: VA,
        } = we),
        (HA = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Jf = Object.create(null, {
          [GA]: { value: "preview" },
          [kA]: { value: "playback" },
          [UA]: { value: "stop" },
          [VA]: { value: "clear" },
        })),
        (td = (e = HA, t) => {
          if (t.type in Jf) {
            let r = [Jf[t.type]];
            return (0, ed.setIn)(e, [r], { ...t.payload });
          }
          return e;
        });
    });
  var Me,
    WA,
    XA,
    BA,
    jA,
    zA,
    KA,
    YA,
    QA,
    $A,
    ZA,
    nd,
    JA,
    id,
    od = ye(() => {
      "use strict";
      Ue();
      (Me = de(Qt())),
        ({
          IX2_SESSION_INITIALIZED: WA,
          IX2_SESSION_STARTED: XA,
          IX2_TEST_FRAME_RENDERED: BA,
          IX2_SESSION_STOPPED: jA,
          IX2_EVENT_LISTENER_ADDED: zA,
          IX2_EVENT_STATE_CHANGED: KA,
          IX2_ANIMATION_FRAME_CHANGED: YA,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: QA,
          IX2_VIEWPORT_WIDTH_CHANGED: $A,
          IX2_MEDIA_QUERIES_DEFINED: ZA,
        } = we),
        (nd = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (JA = 20),
        (id = (e = nd, t) => {
          switch (t.type) {
            case WA: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, Me.merge)(e, {
                hasBoundaryNodes: r,
                reducedMotion: n,
              });
            }
            case XA:
              return (0, Me.set)(e, "active", !0);
            case BA: {
              let {
                payload: { step: r = JA },
              } = t;
              return (0, Me.set)(e, "tick", e.tick + r);
            }
            case jA:
              return nd;
            case YA: {
              let {
                payload: { now: r },
              } = t;
              return (0, Me.set)(e, "tick", r);
            }
            case zA: {
              let r = (0, Me.addLast)(e.eventListeners, t.payload);
              return (0, Me.set)(e, "eventListeners", r);
            }
            case KA: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, Me.setIn)(e, ["eventState", r], n);
            }
            case QA: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, Me.setIn)(e, ["playbackState", r], n);
            }
            case $A: {
              let { width: r, mediaQueries: n } = t.payload,
                i = n.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: f } = n[s];
                if (r >= u && r <= f) {
                  o = a;
                  break;
                }
              }
              return (0, Me.merge)(e, { viewportWidth: r, mediaQueryKey: o });
            }
            case ZA:
              return (0, Me.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var sd = c((hX, ad) => {
    function eS() {
      (this.__data__ = []), (this.size = 0);
    }
    ad.exports = eS;
  });
  var Pn = c((mX, ud) => {
    function tS(e, t) {
      return e === t || (e !== e && t !== t);
    }
    ud.exports = tS;
  });
  var Pr = c((yX, cd) => {
    var rS = Pn();
    function nS(e, t) {
      for (var r = e.length; r--; ) if (rS(e[r][0], t)) return r;
      return -1;
    }
    cd.exports = nS;
  });
  var fd = c((EX, ld) => {
    var iS = Pr(),
      oS = Array.prototype,
      aS = oS.splice;
    function sS(e) {
      var t = this.__data__,
        r = iS(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : aS.call(t, r, 1), --this.size, !0;
    }
    ld.exports = sS;
  });
  var pd = c((bX, dd) => {
    var uS = Pr();
    function cS(e) {
      var t = this.__data__,
        r = uS(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    dd.exports = cS;
  });
  var vd = c((_X, gd) => {
    var lS = Pr();
    function fS(e) {
      return lS(this.__data__, e) > -1;
    }
    gd.exports = fS;
  });
  var md = c((IX, hd) => {
    var dS = Pr();
    function pS(e, t) {
      var r = this.__data__,
        n = dS(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    hd.exports = pS;
  });
  var Mr = c((TX, yd) => {
    var gS = sd(),
      vS = fd(),
      hS = pd(),
      mS = vd(),
      yS = md();
    function $t(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    $t.prototype.clear = gS;
    $t.prototype.delete = vS;
    $t.prototype.get = hS;
    $t.prototype.has = mS;
    $t.prototype.set = yS;
    yd.exports = $t;
  });
  var bd = c((wX, Ed) => {
    var ES = Mr();
    function bS() {
      (this.__data__ = new ES()), (this.size = 0);
    }
    Ed.exports = bS;
  });
  var Id = c((xX, _d) => {
    function _S(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    _d.exports = _S;
  });
  var wd = c((OX, Td) => {
    function IS(e) {
      return this.__data__.get(e);
    }
    Td.exports = IS;
  });
  var Od = c((AX, xd) => {
    function TS(e) {
      return this.__data__.has(e);
    }
    xd.exports = TS;
  });
  var ct = c((SX, Ad) => {
    function wS(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    Ad.exports = wS;
  });
  var $o = c((CX, Sd) => {
    var xS = Tt(),
      OS = ct(),
      AS = "[object AsyncFunction]",
      SS = "[object Function]",
      CS = "[object GeneratorFunction]",
      RS = "[object Proxy]";
    function LS(e) {
      if (!OS(e)) return !1;
      var t = xS(e);
      return t == SS || t == CS || t == AS || t == RS;
    }
    Sd.exports = LS;
  });
  var Rd = c((RX, Cd) => {
    var NS = Ze(),
      PS = NS["__core-js_shared__"];
    Cd.exports = PS;
  });
  var Pd = c((LX, Nd) => {
    var Zo = Rd(),
      Ld = (function () {
        var e = /[^.]+$/.exec((Zo && Zo.keys && Zo.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function MS(e) {
      return !!Ld && Ld in e;
    }
    Nd.exports = MS;
  });
  var Jo = c((NX, Md) => {
    var qS = Function.prototype,
      DS = qS.toString;
    function FS(e) {
      if (e != null) {
        try {
          return DS.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Md.exports = FS;
  });
  var Dd = c((PX, qd) => {
    var GS = $o(),
      kS = Pd(),
      US = ct(),
      VS = Jo(),
      HS = /[\\^$.*+?()[\]{}|]/g,
      WS = /^\[object .+?Constructor\]$/,
      XS = Function.prototype,
      BS = Object.prototype,
      jS = XS.toString,
      zS = BS.hasOwnProperty,
      KS = RegExp(
        "^" +
          jS
            .call(zS)
            .replace(HS, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function YS(e) {
      if (!US(e) || kS(e)) return !1;
      var t = GS(e) ? KS : WS;
      return t.test(VS(e));
    }
    qd.exports = YS;
  });
  var Gd = c((MX, Fd) => {
    function QS(e, t) {
      return e?.[t];
    }
    Fd.exports = QS;
  });
  var wt = c((qX, kd) => {
    var $S = Dd(),
      ZS = Gd();
    function JS(e, t) {
      var r = ZS(e, t);
      return $S(r) ? r : void 0;
    }
    kd.exports = JS;
  });
  var Mn = c((DX, Ud) => {
    var e0 = wt(),
      t0 = Ze(),
      r0 = e0(t0, "Map");
    Ud.exports = r0;
  });
  var qr = c((FX, Vd) => {
    var n0 = wt(),
      i0 = n0(Object, "create");
    Vd.exports = i0;
  });
  var Xd = c((GX, Wd) => {
    var Hd = qr();
    function o0() {
      (this.__data__ = Hd ? Hd(null) : {}), (this.size = 0);
    }
    Wd.exports = o0;
  });
  var jd = c((kX, Bd) => {
    function a0(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Bd.exports = a0;
  });
  var Kd = c((UX, zd) => {
    var s0 = qr(),
      u0 = "__lodash_hash_undefined__",
      c0 = Object.prototype,
      l0 = c0.hasOwnProperty;
    function f0(e) {
      var t = this.__data__;
      if (s0) {
        var r = t[e];
        return r === u0 ? void 0 : r;
      }
      return l0.call(t, e) ? t[e] : void 0;
    }
    zd.exports = f0;
  });
  var Qd = c((VX, Yd) => {
    var d0 = qr(),
      p0 = Object.prototype,
      g0 = p0.hasOwnProperty;
    function v0(e) {
      var t = this.__data__;
      return d0 ? t[e] !== void 0 : g0.call(t, e);
    }
    Yd.exports = v0;
  });
  var Zd = c((HX, $d) => {
    var h0 = qr(),
      m0 = "__lodash_hash_undefined__";
    function y0(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = h0 && t === void 0 ? m0 : t),
        this
      );
    }
    $d.exports = y0;
  });
  var ep = c((WX, Jd) => {
    var E0 = Xd(),
      b0 = jd(),
      _0 = Kd(),
      I0 = Qd(),
      T0 = Zd();
    function Zt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Zt.prototype.clear = E0;
    Zt.prototype.delete = b0;
    Zt.prototype.get = _0;
    Zt.prototype.has = I0;
    Zt.prototype.set = T0;
    Jd.exports = Zt;
  });
  var np = c((XX, rp) => {
    var tp = ep(),
      w0 = Mr(),
      x0 = Mn();
    function O0() {
      (this.size = 0),
        (this.__data__ = {
          hash: new tp(),
          map: new (x0 || w0)(),
          string: new tp(),
        });
    }
    rp.exports = O0;
  });
  var op = c((BX, ip) => {
    function A0(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    ip.exports = A0;
  });
  var Dr = c((jX, ap) => {
    var S0 = op();
    function C0(e, t) {
      var r = e.__data__;
      return S0(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    ap.exports = C0;
  });
  var up = c((zX, sp) => {
    var R0 = Dr();
    function L0(e) {
      var t = R0(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    sp.exports = L0;
  });
  var lp = c((KX, cp) => {
    var N0 = Dr();
    function P0(e) {
      return N0(this, e).get(e);
    }
    cp.exports = P0;
  });
  var dp = c((YX, fp) => {
    var M0 = Dr();
    function q0(e) {
      return M0(this, e).has(e);
    }
    fp.exports = q0;
  });
  var gp = c((QX, pp) => {
    var D0 = Dr();
    function F0(e, t) {
      var r = D0(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    pp.exports = F0;
  });
  var qn = c(($X, vp) => {
    var G0 = np(),
      k0 = up(),
      U0 = lp(),
      V0 = dp(),
      H0 = gp();
    function Jt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Jt.prototype.clear = G0;
    Jt.prototype.delete = k0;
    Jt.prototype.get = U0;
    Jt.prototype.has = V0;
    Jt.prototype.set = H0;
    vp.exports = Jt;
  });
  var mp = c((ZX, hp) => {
    var W0 = Mr(),
      X0 = Mn(),
      B0 = qn(),
      j0 = 200;
    function z0(e, t) {
      var r = this.__data__;
      if (r instanceof W0) {
        var n = r.__data__;
        if (!X0 || n.length < j0 - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new B0(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    hp.exports = z0;
  });
  var ea = c((JX, yp) => {
    var K0 = Mr(),
      Y0 = bd(),
      Q0 = Id(),
      $0 = wd(),
      Z0 = Od(),
      J0 = mp();
    function er(e) {
      var t = (this.__data__ = new K0(e));
      this.size = t.size;
    }
    er.prototype.clear = Y0;
    er.prototype.delete = Q0;
    er.prototype.get = $0;
    er.prototype.has = Z0;
    er.prototype.set = J0;
    yp.exports = er;
  });
  var bp = c((eB, Ep) => {
    var eC = "__lodash_hash_undefined__";
    function tC(e) {
      return this.__data__.set(e, eC), this;
    }
    Ep.exports = tC;
  });
  var Ip = c((tB, _p) => {
    function rC(e) {
      return this.__data__.has(e);
    }
    _p.exports = rC;
  });
  var wp = c((rB, Tp) => {
    var nC = qn(),
      iC = bp(),
      oC = Ip();
    function Dn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new nC(); ++t < r; ) this.add(e[t]);
    }
    Dn.prototype.add = Dn.prototype.push = iC;
    Dn.prototype.has = oC;
    Tp.exports = Dn;
  });
  var Op = c((nB, xp) => {
    function aC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    xp.exports = aC;
  });
  var Sp = c((iB, Ap) => {
    function sC(e, t) {
      return e.has(t);
    }
    Ap.exports = sC;
  });
  var ta = c((oB, Cp) => {
    var uC = wp(),
      cC = Op(),
      lC = Sp(),
      fC = 1,
      dC = 2;
    function pC(e, t, r, n, i, o) {
      var s = r & fC,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var f = o.get(e),
        v = o.get(t);
      if (f && v) return f == t && v == e;
      var l = -1,
        E = !0,
        g = r & dC ? new uC() : void 0;
      for (o.set(e, t), o.set(t, e); ++l < a; ) {
        var h = e[l],
          _ = t[l];
        if (n) var A = s ? n(_, h, l, t, e, o) : n(h, _, l, e, t, o);
        if (A !== void 0) {
          if (A) continue;
          E = !1;
          break;
        }
        if (g) {
          if (
            !cC(t, function (w, N) {
              if (!lC(g, N) && (h === w || i(h, w, r, n, o))) return g.push(N);
            })
          ) {
            E = !1;
            break;
          }
        } else if (!(h === _ || i(h, _, r, n, o))) {
          E = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), E;
    }
    Cp.exports = pC;
  });
  var Lp = c((aB, Rp) => {
    var gC = Ze(),
      vC = gC.Uint8Array;
    Rp.exports = vC;
  });
  var Pp = c((sB, Np) => {
    function hC(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    Np.exports = hC;
  });
  var qp = c((uB, Mp) => {
    function mC(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Mp.exports = mC;
  });
  var Up = c((cB, kp) => {
    var Dp = zt(),
      Fp = Lp(),
      yC = Pn(),
      EC = ta(),
      bC = Pp(),
      _C = qp(),
      IC = 1,
      TC = 2,
      wC = "[object Boolean]",
      xC = "[object Date]",
      OC = "[object Error]",
      AC = "[object Map]",
      SC = "[object Number]",
      CC = "[object RegExp]",
      RC = "[object Set]",
      LC = "[object String]",
      NC = "[object Symbol]",
      PC = "[object ArrayBuffer]",
      MC = "[object DataView]",
      Gp = Dp ? Dp.prototype : void 0,
      ra = Gp ? Gp.valueOf : void 0;
    function qC(e, t, r, n, i, o, s) {
      switch (r) {
        case MC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case PC:
          return !(e.byteLength != t.byteLength || !o(new Fp(e), new Fp(t)));
        case wC:
        case xC:
        case SC:
          return yC(+e, +t);
        case OC:
          return e.name == t.name && e.message == t.message;
        case CC:
        case LC:
          return e == t + "";
        case AC:
          var a = bC;
        case RC:
          var u = n & IC;
          if ((a || (a = _C), e.size != t.size && !u)) return !1;
          var f = s.get(e);
          if (f) return f == t;
          (n |= TC), s.set(e, t);
          var v = EC(a(e), a(t), n, i, o, s);
          return s.delete(e), v;
        case NC:
          if (ra) return ra.call(e) == ra.call(t);
      }
      return !1;
    }
    kp.exports = qC;
  });
  var Fn = c((lB, Vp) => {
    function DC(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    Vp.exports = DC;
  });
  var Oe = c((fB, Hp) => {
    var FC = Array.isArray;
    Hp.exports = FC;
  });
  var na = c((dB, Wp) => {
    var GC = Fn(),
      kC = Oe();
    function UC(e, t, r) {
      var n = t(e);
      return kC(e) ? n : GC(n, r(e));
    }
    Wp.exports = UC;
  });
  var Bp = c((pB, Xp) => {
    function VC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var s = e[r];
        t(s, r, e) && (o[i++] = s);
      }
      return o;
    }
    Xp.exports = VC;
  });
  var ia = c((gB, jp) => {
    function HC() {
      return [];
    }
    jp.exports = HC;
  });
  var oa = c((vB, Kp) => {
    var WC = Bp(),
      XC = ia(),
      BC = Object.prototype,
      jC = BC.propertyIsEnumerable,
      zp = Object.getOwnPropertySymbols,
      zC = zp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                WC(zp(e), function (t) {
                  return jC.call(e, t);
                }));
          }
        : XC;
    Kp.exports = zC;
  });
  var Qp = c((hB, Yp) => {
    function KC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Yp.exports = KC;
  });
  var Zp = c((mB, $p) => {
    var YC = Tt(),
      QC = gt(),
      $C = "[object Arguments]";
    function ZC(e) {
      return QC(e) && YC(e) == $C;
    }
    $p.exports = ZC;
  });
  var Fr = c((yB, tg) => {
    var Jp = Zp(),
      JC = gt(),
      eg = Object.prototype,
      eR = eg.hasOwnProperty,
      tR = eg.propertyIsEnumerable,
      rR = Jp(
        (function () {
          return arguments;
        })()
      )
        ? Jp
        : function (e) {
            return JC(e) && eR.call(e, "callee") && !tR.call(e, "callee");
          };
    tg.exports = rR;
  });
  var ng = c((EB, rg) => {
    function nR() {
      return !1;
    }
    rg.exports = nR;
  });
  var Gn = c((Gr, tr) => {
    var iR = Ze(),
      oR = ng(),
      ag = typeof Gr == "object" && Gr && !Gr.nodeType && Gr,
      ig = ag && typeof tr == "object" && tr && !tr.nodeType && tr,
      aR = ig && ig.exports === ag,
      og = aR ? iR.Buffer : void 0,
      sR = og ? og.isBuffer : void 0,
      uR = sR || oR;
    tr.exports = uR;
  });
  var kn = c((bB, sg) => {
    var cR = 9007199254740991,
      lR = /^(?:0|[1-9]\d*)$/;
    function fR(e, t) {
      var r = typeof e;
      return (
        (t = t ?? cR),
        !!t &&
          (r == "number" || (r != "symbol" && lR.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    sg.exports = fR;
  });
  var Un = c((_B, ug) => {
    var dR = 9007199254740991;
    function pR(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= dR;
    }
    ug.exports = pR;
  });
  var lg = c((IB, cg) => {
    var gR = Tt(),
      vR = Un(),
      hR = gt(),
      mR = "[object Arguments]",
      yR = "[object Array]",
      ER = "[object Boolean]",
      bR = "[object Date]",
      _R = "[object Error]",
      IR = "[object Function]",
      TR = "[object Map]",
      wR = "[object Number]",
      xR = "[object Object]",
      OR = "[object RegExp]",
      AR = "[object Set]",
      SR = "[object String]",
      CR = "[object WeakMap]",
      RR = "[object ArrayBuffer]",
      LR = "[object DataView]",
      NR = "[object Float32Array]",
      PR = "[object Float64Array]",
      MR = "[object Int8Array]",
      qR = "[object Int16Array]",
      DR = "[object Int32Array]",
      FR = "[object Uint8Array]",
      GR = "[object Uint8ClampedArray]",
      kR = "[object Uint16Array]",
      UR = "[object Uint32Array]",
      me = {};
    me[NR] =
      me[PR] =
      me[MR] =
      me[qR] =
      me[DR] =
      me[FR] =
      me[GR] =
      me[kR] =
      me[UR] =
        !0;
    me[mR] =
      me[yR] =
      me[RR] =
      me[ER] =
      me[LR] =
      me[bR] =
      me[_R] =
      me[IR] =
      me[TR] =
      me[wR] =
      me[xR] =
      me[OR] =
      me[AR] =
      me[SR] =
      me[CR] =
        !1;
    function VR(e) {
      return hR(e) && vR(e.length) && !!me[gR(e)];
    }
    cg.exports = VR;
  });
  var dg = c((TB, fg) => {
    function HR(e) {
      return function (t) {
        return e(t);
      };
    }
    fg.exports = HR;
  });
  var gg = c((kr, rr) => {
    var WR = Ro(),
      pg = typeof kr == "object" && kr && !kr.nodeType && kr,
      Ur = pg && typeof rr == "object" && rr && !rr.nodeType && rr,
      XR = Ur && Ur.exports === pg,
      aa = XR && WR.process,
      BR = (function () {
        try {
          var e = Ur && Ur.require && Ur.require("util").types;
          return e || (aa && aa.binding && aa.binding("util"));
        } catch {}
      })();
    rr.exports = BR;
  });
  var Vn = c((wB, mg) => {
    var jR = lg(),
      zR = dg(),
      vg = gg(),
      hg = vg && vg.isTypedArray,
      KR = hg ? zR(hg) : jR;
    mg.exports = KR;
  });
  var sa = c((xB, yg) => {
    var YR = Qp(),
      QR = Fr(),
      $R = Oe(),
      ZR = Gn(),
      JR = kn(),
      eL = Vn(),
      tL = Object.prototype,
      rL = tL.hasOwnProperty;
    function nL(e, t) {
      var r = $R(e),
        n = !r && QR(e),
        i = !r && !n && ZR(e),
        o = !r && !n && !i && eL(e),
        s = r || n || i || o,
        a = s ? YR(e.length, String) : [],
        u = a.length;
      for (var f in e)
        (t || rL.call(e, f)) &&
          !(
            s &&
            (f == "length" ||
              (i && (f == "offset" || f == "parent")) ||
              (o &&
                (f == "buffer" || f == "byteLength" || f == "byteOffset")) ||
              JR(f, u))
          ) &&
          a.push(f);
      return a;
    }
    yg.exports = nL;
  });
  var Hn = c((OB, Eg) => {
    var iL = Object.prototype;
    function oL(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || iL;
      return e === r;
    }
    Eg.exports = oL;
  });
  var _g = c((AB, bg) => {
    var aL = Lo(),
      sL = aL(Object.keys, Object);
    bg.exports = sL;
  });
  var Wn = c((SB, Ig) => {
    var uL = Hn(),
      cL = _g(),
      lL = Object.prototype,
      fL = lL.hasOwnProperty;
    function dL(e) {
      if (!uL(e)) return cL(e);
      var t = [];
      for (var r in Object(e)) fL.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    Ig.exports = dL;
  });
  var Mt = c((CB, Tg) => {
    var pL = $o(),
      gL = Un();
    function vL(e) {
      return e != null && gL(e.length) && !pL(e);
    }
    Tg.exports = vL;
  });
  var Vr = c((RB, wg) => {
    var hL = sa(),
      mL = Wn(),
      yL = Mt();
    function EL(e) {
      return yL(e) ? hL(e) : mL(e);
    }
    wg.exports = EL;
  });
  var Og = c((LB, xg) => {
    var bL = na(),
      _L = oa(),
      IL = Vr();
    function TL(e) {
      return bL(e, IL, _L);
    }
    xg.exports = TL;
  });
  var Cg = c((NB, Sg) => {
    var Ag = Og(),
      wL = 1,
      xL = Object.prototype,
      OL = xL.hasOwnProperty;
    function AL(e, t, r, n, i, o) {
      var s = r & wL,
        a = Ag(e),
        u = a.length,
        f = Ag(t),
        v = f.length;
      if (u != v && !s) return !1;
      for (var l = u; l--; ) {
        var E = a[l];
        if (!(s ? E in t : OL.call(t, E))) return !1;
      }
      var g = o.get(e),
        h = o.get(t);
      if (g && h) return g == t && h == e;
      var _ = !0;
      o.set(e, t), o.set(t, e);
      for (var A = s; ++l < u; ) {
        E = a[l];
        var w = e[E],
          N = t[E];
        if (n) var R = s ? n(N, w, E, t, e, o) : n(w, N, E, e, t, o);
        if (!(R === void 0 ? w === N || i(w, N, r, n, o) : R)) {
          _ = !1;
          break;
        }
        A || (A = E == "constructor");
      }
      if (_ && !A) {
        var M = e.constructor,
          F = t.constructor;
        M != F &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof M == "function" &&
            M instanceof M &&
            typeof F == "function" &&
            F instanceof F
          ) &&
          (_ = !1);
      }
      return o.delete(e), o.delete(t), _;
    }
    Sg.exports = AL;
  });
  var Lg = c((PB, Rg) => {
    var SL = wt(),
      CL = Ze(),
      RL = SL(CL, "DataView");
    Rg.exports = RL;
  });
  var Pg = c((MB, Ng) => {
    var LL = wt(),
      NL = Ze(),
      PL = LL(NL, "Promise");
    Ng.exports = PL;
  });
  var qg = c((qB, Mg) => {
    var ML = wt(),
      qL = Ze(),
      DL = ML(qL, "Set");
    Mg.exports = DL;
  });
  var ua = c((DB, Dg) => {
    var FL = wt(),
      GL = Ze(),
      kL = FL(GL, "WeakMap");
    Dg.exports = kL;
  });
  var Xn = c((FB, Wg) => {
    var ca = Lg(),
      la = Mn(),
      fa = Pg(),
      da = qg(),
      pa = ua(),
      Hg = Tt(),
      nr = Jo(),
      Fg = "[object Map]",
      UL = "[object Object]",
      Gg = "[object Promise]",
      kg = "[object Set]",
      Ug = "[object WeakMap]",
      Vg = "[object DataView]",
      VL = nr(ca),
      HL = nr(la),
      WL = nr(fa),
      XL = nr(da),
      BL = nr(pa),
      qt = Hg;
    ((ca && qt(new ca(new ArrayBuffer(1))) != Vg) ||
      (la && qt(new la()) != Fg) ||
      (fa && qt(fa.resolve()) != Gg) ||
      (da && qt(new da()) != kg) ||
      (pa && qt(new pa()) != Ug)) &&
      (qt = function (e) {
        var t = Hg(e),
          r = t == UL ? e.constructor : void 0,
          n = r ? nr(r) : "";
        if (n)
          switch (n) {
            case VL:
              return Vg;
            case HL:
              return Fg;
            case WL:
              return Gg;
            case XL:
              return kg;
            case BL:
              return Ug;
          }
        return t;
      });
    Wg.exports = qt;
  });
  var $g = c((GB, Qg) => {
    var ga = ea(),
      jL = ta(),
      zL = Up(),
      KL = Cg(),
      Xg = Xn(),
      Bg = Oe(),
      jg = Gn(),
      YL = Vn(),
      QL = 1,
      zg = "[object Arguments]",
      Kg = "[object Array]",
      Bn = "[object Object]",
      $L = Object.prototype,
      Yg = $L.hasOwnProperty;
    function ZL(e, t, r, n, i, o) {
      var s = Bg(e),
        a = Bg(t),
        u = s ? Kg : Xg(e),
        f = a ? Kg : Xg(t);
      (u = u == zg ? Bn : u), (f = f == zg ? Bn : f);
      var v = u == Bn,
        l = f == Bn,
        E = u == f;
      if (E && jg(e)) {
        if (!jg(t)) return !1;
        (s = !0), (v = !1);
      }
      if (E && !v)
        return (
          o || (o = new ga()),
          s || YL(e) ? jL(e, t, r, n, i, o) : zL(e, t, u, r, n, i, o)
        );
      if (!(r & QL)) {
        var g = v && Yg.call(e, "__wrapped__"),
          h = l && Yg.call(t, "__wrapped__");
        if (g || h) {
          var _ = g ? e.value() : e,
            A = h ? t.value() : t;
          return o || (o = new ga()), i(_, A, r, n, o);
        }
      }
      return E ? (o || (o = new ga()), KL(e, t, r, n, i, o)) : !1;
    }
    Qg.exports = ZL;
  });
  var va = c((kB, ev) => {
    var JL = $g(),
      Zg = gt();
    function Jg(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Zg(e) && !Zg(t))
        ? e !== e && t !== t
        : JL(e, t, r, n, Jg, i);
    }
    ev.exports = Jg;
  });
  var rv = c((UB, tv) => {
    var eN = ea(),
      tN = va(),
      rN = 1,
      nN = 2;
    function iN(e, t, r, n) {
      var i = r.length,
        o = i,
        s = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = r[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = r[i];
        var u = a[0],
          f = e[u],
          v = a[1];
        if (s && a[2]) {
          if (f === void 0 && !(u in e)) return !1;
        } else {
          var l = new eN();
          if (n) var E = n(f, v, u, e, t, l);
          if (!(E === void 0 ? tN(v, f, rN | nN, n, l) : E)) return !1;
        }
      }
      return !0;
    }
    tv.exports = iN;
  });
  var ha = c((VB, nv) => {
    var oN = ct();
    function aN(e) {
      return e === e && !oN(e);
    }
    nv.exports = aN;
  });
  var ov = c((HB, iv) => {
    var sN = ha(),
      uN = Vr();
    function cN(e) {
      for (var t = uN(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, sN(i)];
      }
      return t;
    }
    iv.exports = cN;
  });
  var ma = c((WB, av) => {
    function lN(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    av.exports = lN;
  });
  var uv = c((XB, sv) => {
    var fN = rv(),
      dN = ov(),
      pN = ma();
    function gN(e) {
      var t = dN(e);
      return t.length == 1 && t[0][2]
        ? pN(t[0][0], t[0][1])
        : function (r) {
            return r === e || fN(r, e, t);
          };
    }
    sv.exports = gN;
  });
  var Hr = c((BB, cv) => {
    var vN = Tt(),
      hN = gt(),
      mN = "[object Symbol]";
    function yN(e) {
      return typeof e == "symbol" || (hN(e) && vN(e) == mN);
    }
    cv.exports = yN;
  });
  var jn = c((jB, lv) => {
    var EN = Oe(),
      bN = Hr(),
      _N = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      IN = /^\w*$/;
    function TN(e, t) {
      if (EN(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        bN(e)
        ? !0
        : IN.test(e) || !_N.test(e) || (t != null && e in Object(t));
    }
    lv.exports = TN;
  });
  var pv = c((zB, dv) => {
    var fv = qn(),
      wN = "Expected a function";
    function ya(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(wN);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, n);
        return (r.cache = o.set(i, s) || o), s;
      };
      return (r.cache = new (ya.Cache || fv)()), r;
    }
    ya.Cache = fv;
    dv.exports = ya;
  });
  var vv = c((KB, gv) => {
    var xN = pv(),
      ON = 500;
    function AN(e) {
      var t = xN(e, function (n) {
          return r.size === ON && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    gv.exports = AN;
  });
  var mv = c((YB, hv) => {
    var SN = vv(),
      CN =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      RN = /\\(\\)?/g,
      LN = SN(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(CN, function (r, n, i, o) {
            t.push(i ? o.replace(RN, "$1") : n || r);
          }),
          t
        );
      });
    hv.exports = LN;
  });
  var Ea = c((QB, yv) => {
    function NN(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    yv.exports = NN;
  });
  var wv = c(($B, Tv) => {
    var Ev = zt(),
      PN = Ea(),
      MN = Oe(),
      qN = Hr(),
      DN = 1 / 0,
      bv = Ev ? Ev.prototype : void 0,
      _v = bv ? bv.toString : void 0;
    function Iv(e) {
      if (typeof e == "string") return e;
      if (MN(e)) return PN(e, Iv) + "";
      if (qN(e)) return _v ? _v.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -DN ? "-0" : t;
    }
    Tv.exports = Iv;
  });
  var Ov = c((ZB, xv) => {
    var FN = wv();
    function GN(e) {
      return e == null ? "" : FN(e);
    }
    xv.exports = GN;
  });
  var Wr = c((JB, Av) => {
    var kN = Oe(),
      UN = jn(),
      VN = mv(),
      HN = Ov();
    function WN(e, t) {
      return kN(e) ? e : UN(e, t) ? [e] : VN(HN(e));
    }
    Av.exports = WN;
  });
  var ir = c((e5, Sv) => {
    var XN = Hr(),
      BN = 1 / 0;
    function jN(e) {
      if (typeof e == "string" || XN(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -BN ? "-0" : t;
    }
    Sv.exports = jN;
  });
  var zn = c((t5, Cv) => {
    var zN = Wr(),
      KN = ir();
    function YN(e, t) {
      t = zN(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[KN(t[r++])];
      return r && r == n ? e : void 0;
    }
    Cv.exports = YN;
  });
  var Kn = c((r5, Rv) => {
    var QN = zn();
    function $N(e, t, r) {
      var n = e == null ? void 0 : QN(e, t);
      return n === void 0 ? r : n;
    }
    Rv.exports = $N;
  });
  var Nv = c((n5, Lv) => {
    function ZN(e, t) {
      return e != null && t in Object(e);
    }
    Lv.exports = ZN;
  });
  var Mv = c((i5, Pv) => {
    var JN = Wr(),
      eP = Fr(),
      tP = Oe(),
      rP = kn(),
      nP = Un(),
      iP = ir();
    function oP(e, t, r) {
      t = JN(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var s = iP(t[n]);
        if (!(o = e != null && r(e, s))) break;
        e = e[s];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && nP(i) && rP(s, i) && (tP(e) || eP(e)));
    }
    Pv.exports = oP;
  });
  var Dv = c((o5, qv) => {
    var aP = Nv(),
      sP = Mv();
    function uP(e, t) {
      return e != null && sP(e, t, aP);
    }
    qv.exports = uP;
  });
  var Gv = c((a5, Fv) => {
    var cP = va(),
      lP = Kn(),
      fP = Dv(),
      dP = jn(),
      pP = ha(),
      gP = ma(),
      vP = ir(),
      hP = 1,
      mP = 2;
    function yP(e, t) {
      return dP(e) && pP(t)
        ? gP(vP(e), t)
        : function (r) {
            var n = lP(r, e);
            return n === void 0 && n === t ? fP(r, e) : cP(t, n, hP | mP);
          };
    }
    Fv.exports = yP;
  });
  var Yn = c((s5, kv) => {
    function EP(e) {
      return e;
    }
    kv.exports = EP;
  });
  var ba = c((u5, Uv) => {
    function bP(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Uv.exports = bP;
  });
  var Hv = c((c5, Vv) => {
    var _P = zn();
    function IP(e) {
      return function (t) {
        return _P(t, e);
      };
    }
    Vv.exports = IP;
  });
  var Xv = c((l5, Wv) => {
    var TP = ba(),
      wP = Hv(),
      xP = jn(),
      OP = ir();
    function AP(e) {
      return xP(e) ? TP(OP(e)) : wP(e);
    }
    Wv.exports = AP;
  });
  var xt = c((f5, Bv) => {
    var SP = uv(),
      CP = Gv(),
      RP = Yn(),
      LP = Oe(),
      NP = Xv();
    function PP(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? RP
        : typeof e == "object"
        ? LP(e)
          ? CP(e[0], e[1])
          : SP(e)
        : NP(e);
    }
    Bv.exports = PP;
  });
  var _a = c((d5, jv) => {
    var MP = xt(),
      qP = Mt(),
      DP = Vr();
    function FP(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!qP(t)) {
          var o = MP(r, 3);
          (t = DP(t)),
            (r = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, r, n);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    jv.exports = FP;
  });
  var Ia = c((p5, zv) => {
    function GP(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    zv.exports = GP;
  });
  var Yv = c((g5, Kv) => {
    var kP = /\s/;
    function UP(e) {
      for (var t = e.length; t-- && kP.test(e.charAt(t)); );
      return t;
    }
    Kv.exports = UP;
  });
  var $v = c((v5, Qv) => {
    var VP = Yv(),
      HP = /^\s+/;
    function WP(e) {
      return e && e.slice(0, VP(e) + 1).replace(HP, "");
    }
    Qv.exports = WP;
  });
  var Qn = c((h5, eh) => {
    var XP = $v(),
      Zv = ct(),
      BP = Hr(),
      Jv = 0 / 0,
      jP = /^[-+]0x[0-9a-f]+$/i,
      zP = /^0b[01]+$/i,
      KP = /^0o[0-7]+$/i,
      YP = parseInt;
    function QP(e) {
      if (typeof e == "number") return e;
      if (BP(e)) return Jv;
      if (Zv(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Zv(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = XP(e);
      var r = zP.test(e);
      return r || KP.test(e) ? YP(e.slice(2), r ? 2 : 8) : jP.test(e) ? Jv : +e;
    }
    eh.exports = QP;
  });
  var nh = c((m5, rh) => {
    var $P = Qn(),
      th = 1 / 0,
      ZP = 17976931348623157e292;
    function JP(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = $P(e)), e === th || e === -th)) {
        var t = e < 0 ? -1 : 1;
        return t * ZP;
      }
      return e === e ? e : 0;
    }
    rh.exports = JP;
  });
  var Ta = c((y5, ih) => {
    var eM = nh();
    function tM(e) {
      var t = eM(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    ih.exports = tM;
  });
  var ah = c((E5, oh) => {
    var rM = Ia(),
      nM = xt(),
      iM = Ta(),
      oM = Math.max;
    function aM(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : iM(r);
      return i < 0 && (i = oM(n + i, 0)), rM(e, nM(t, 3), i);
    }
    oh.exports = aM;
  });
  var wa = c((b5, sh) => {
    var sM = _a(),
      uM = ah(),
      cM = sM(uM);
    sh.exports = cM;
  });
  var lh = {};
  ke(lh, {
    ELEMENT_MATCHES: () => lM,
    FLEX_PREFIXED: () => xa,
    IS_BROWSER_ENV: () => et,
    TRANSFORM_PREFIXED: () => Ot,
    TRANSFORM_STYLE_PREFIXED: () => Zn,
    withBrowser: () => $n,
  });
  var ch,
    et,
    $n,
    lM,
    xa,
    Ot,
    uh,
    Zn,
    Jn = ye(() => {
      "use strict";
      (ch = de(wa())),
        (et = typeof window < "u"),
        ($n = (e, t) => (et ? e() : t)),
        (lM = $n(() =>
          (0, ch.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (xa = $n(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            r = "";
          try {
            let { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return r;
          } catch {
            return r;
          }
        }, "flex")),
        (Ot = $n(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              r = "Transform",
              { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i] + r;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (uh = Ot.split("transform")[0]),
        (Zn = uh ? uh + "TransformStyle" : "transformStyle");
    });
  var Oa = c((_5, vh) => {
    var fM = 4,
      dM = 0.001,
      pM = 1e-7,
      gM = 10,
      Xr = 11,
      ei = 1 / (Xr - 1),
      vM = typeof Float32Array == "function";
    function fh(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function dh(e, t) {
      return 3 * t - 6 * e;
    }
    function ph(e) {
      return 3 * e;
    }
    function ti(e, t, r) {
      return ((fh(t, r) * e + dh(t, r)) * e + ph(t)) * e;
    }
    function gh(e, t, r) {
      return 3 * fh(t, r) * e * e + 2 * dh(t, r) * e + ph(t);
    }
    function hM(e, t, r, n, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (r - t) / 2), (o = ti(s, n, i) - e), o > 0 ? (r = s) : (t = s);
      while (Math.abs(o) > pM && ++a < gM);
      return s;
    }
    function mM(e, t, r, n) {
      for (var i = 0; i < fM; ++i) {
        var o = gh(t, r, n);
        if (o === 0) return t;
        var s = ti(t, r, n) - e;
        t -= s / o;
      }
      return t;
    }
    vh.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = vM ? new Float32Array(Xr) : new Array(Xr);
      if (t !== r || n !== i)
        for (var s = 0; s < Xr; ++s) o[s] = ti(s * ei, t, n);
      function a(u) {
        for (var f = 0, v = 1, l = Xr - 1; v !== l && o[v] <= u; ++v) f += ei;
        --v;
        var E = (u - o[v]) / (o[v + 1] - o[v]),
          g = f + E * ei,
          h = gh(g, t, n);
        return h >= dM ? mM(u, g, t, n) : h === 0 ? g : hM(u, f, f + ei, t, n);
      }
      return function (f) {
        return t === r && n === i
          ? f
          : f === 0
          ? 0
          : f === 1
          ? 1
          : ti(a(f), r, i);
      };
    };
  });
  var jr = {};
  ke(jr, {
    bounce: () => JM,
    bouncePast: () => eq,
    ease: () => yM,
    easeIn: () => EM,
    easeInOut: () => _M,
    easeOut: () => bM,
    inBack: () => XM,
    inCirc: () => UM,
    inCubic: () => xM,
    inElastic: () => zM,
    inExpo: () => FM,
    inOutBack: () => jM,
    inOutCirc: () => HM,
    inOutCubic: () => AM,
    inOutElastic: () => YM,
    inOutExpo: () => kM,
    inOutQuad: () => wM,
    inOutQuart: () => RM,
    inOutQuint: () => PM,
    inOutSine: () => DM,
    inQuad: () => IM,
    inQuart: () => SM,
    inQuint: () => LM,
    inSine: () => MM,
    outBack: () => BM,
    outBounce: () => WM,
    outCirc: () => VM,
    outCubic: () => OM,
    outElastic: () => KM,
    outExpo: () => GM,
    outQuad: () => TM,
    outQuart: () => CM,
    outQuint: () => NM,
    outSine: () => qM,
    swingFrom: () => $M,
    swingFromTo: () => QM,
    swingTo: () => ZM,
  });
  function IM(e) {
    return Math.pow(e, 2);
  }
  function TM(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function wM(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function xM(e) {
    return Math.pow(e, 3);
  }
  function OM(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function AM(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function SM(e) {
    return Math.pow(e, 4);
  }
  function CM(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function RM(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function LM(e) {
    return Math.pow(e, 5);
  }
  function NM(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function PM(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function MM(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function qM(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function DM(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function FM(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function GM(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function kM(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function UM(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function VM(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function HM(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function WM(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function XM(e) {
    let t = vt;
    return e * e * ((t + 1) * e - t);
  }
  function BM(e) {
    let t = vt;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function jM(e) {
    let t = vt;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function zM(e) {
    let t = vt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        -(
          n *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / r)
        ));
  }
  function KM(e) {
    let t = vt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (r || (r = 0.3),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) + 1);
  }
  function YM(e) {
    let t = vt,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (r || (r = 0.3 * 1.5),
        n < 1
          ? ((n = 1), (t = r / 4))
          : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
        e < 1
          ? -0.5 *
            (n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r))
          : n *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r) *
              0.5 +
            1);
  }
  function QM(e) {
    let t = vt;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function $M(e) {
    let t = vt;
    return e * e * ((t + 1) * e - t);
  }
  function ZM(e) {
    let t = vt;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function JM(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function eq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var Br,
    vt,
    yM,
    EM,
    bM,
    _M,
    Aa = ye(() => {
      "use strict";
      (Br = de(Oa())),
        (vt = 1.70158),
        (yM = (0, Br.default)(0.25, 0.1, 0.25, 1)),
        (EM = (0, Br.default)(0.42, 0, 1, 1)),
        (bM = (0, Br.default)(0, 0, 0.58, 1)),
        (_M = (0, Br.default)(0.42, 0, 0.58, 1));
    });
  var mh = {};
  ke(mh, {
    applyEasing: () => rq,
    createBezierEasing: () => tq,
    optimizeFloat: () => zr,
  });
  function zr(e, t = 5, r = 10) {
    let n = Math.pow(r, t),
      i = Number(Math.round(e * n) / n);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function tq(e) {
    return (0, hh.default)(...e);
  }
  function rq(e, t, r) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : zr(r ? (t > 0 ? r(t) : t) : t > 0 && e && jr[e] ? jr[e](t) : t);
  }
  var hh,
    Sa = ye(() => {
      "use strict";
      Aa();
      hh = de(Oa());
    });
  var bh = {};
  ke(bh, {
    createElementState: () => Eh,
    ixElements: () => hq,
    mergeActionState: () => Ca,
  });
  function Eh(e, t, r, n, i) {
    let o =
      r === nq ? (0, or.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, or.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
  }
  function Ca(e, t, r, n, i) {
    let o = yq(i);
    return (0, or.mergeIn)(e, [t, vq, r], n, o);
  }
  function yq(e) {
    let { config: t } = e;
    return mq.reduce((r, n) => {
      let i = n[0],
        o = n[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (r[o] = a), r;
    }, {});
  }
  var or,
    T5,
    nq,
    w5,
    iq,
    oq,
    aq,
    sq,
    uq,
    cq,
    lq,
    fq,
    dq,
    pq,
    gq,
    yh,
    vq,
    hq,
    mq,
    _h = ye(() => {
      "use strict";
      or = de(Qt());
      Ue();
      ({
        HTML_ELEMENT: T5,
        PLAIN_OBJECT: nq,
        ABSTRACT_NODE: w5,
        CONFIG_X_VALUE: iq,
        CONFIG_Y_VALUE: oq,
        CONFIG_Z_VALUE: aq,
        CONFIG_VALUE: sq,
        CONFIG_X_UNIT: uq,
        CONFIG_Y_UNIT: cq,
        CONFIG_Z_UNIT: lq,
        CONFIG_UNIT: fq,
      } = Re),
        ({
          IX2_SESSION_STOPPED: dq,
          IX2_INSTANCE_ADDED: pq,
          IX2_ELEMENT_STATE_CHANGED: gq,
        } = we),
        (yh = {}),
        (vq = "refState"),
        (hq = (e = yh, t = {}) => {
          switch (t.type) {
            case dq:
              return yh;
            case pq: {
              let {
                  elementId: r,
                  element: n,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, or.getIn)(u, [r, n]) !== n && (u = Eh(u, n, s, r, o)),
                Ca(u, r, a, i, o)
              );
            }
            case gq: {
              let {
                elementId: r,
                actionTypeId: n,
                current: i,
                actionItem: o,
              } = t.payload;
              return Ca(e, r, n, i, o);
            }
            default:
              return e;
          }
        });
      mq = [
        [iq, uq],
        [oq, cq],
        [aq, lq],
        [sq, fq],
      ];
    });
  var Ih = c((Ae) => {
    "use strict";
    Object.defineProperty(Ae, "__esModule", { value: !0 });
    Ae.renderPlugin =
      Ae.getPluginOrigin =
      Ae.getPluginDuration =
      Ae.getPluginDestination =
      Ae.getPluginConfig =
      Ae.createPluginInstance =
      Ae.clearPlugin =
        void 0;
    var Eq = (e) => e.value;
    Ae.getPluginConfig = Eq;
    var bq = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Ae.getPluginDuration = bq;
    var _q = (e) => e || { value: 0 };
    Ae.getPluginOrigin = _q;
    var Iq = (e) => ({ value: e.value });
    Ae.getPluginDestination = Iq;
    var Tq = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Ae.createPluginInstance = Tq;
    var wq = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Ae.renderPlugin = wq;
    var xq = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Ae.clearPlugin = xq;
  });
  var wh = c((Se) => {
    "use strict";
    Object.defineProperty(Se, "__esModule", { value: !0 });
    Se.renderPlugin =
      Se.getPluginOrigin =
      Se.getPluginDuration =
      Se.getPluginDestination =
      Se.getPluginConfig =
      Se.createPluginInstance =
      Se.clearPlugin =
        void 0;
    var Oq = (e) => document.querySelector(`[data-w-id="${e}"]`),
      Aq = () => window.Webflow.require("spline"),
      Sq = (e, t) => e.filter((r) => !t.includes(r)),
      Cq = (e, t) => e.value[t];
    Se.getPluginConfig = Cq;
    var Rq = () => null;
    Se.getPluginDuration = Rq;
    var Th = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      Lq = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let o = Object.keys(e),
            s = Sq(n, o);
          return s.length ? s.reduce((u, f) => ((u[f] = Th[f]), u), e) : e;
        }
        return n.reduce((o, s) => ((o[s] = Th[s]), o), {});
      };
    Se.getPluginOrigin = Lq;
    var Nq = (e) => e.value;
    Se.getPluginDestination = Nq;
    var Pq = (e, t) => {
      var r, n;
      let i =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (n = r.target) === null ||
        n === void 0
          ? void 0
          : n.pluginElement;
      return i ? Oq(i) : null;
    };
    Se.createPluginInstance = Pq;
    var Mq = (e, t, r) => {
      let n = Aq(),
        i = n.getInstance(e),
        o = r.config.target.objectId,
        s = (a) => {
          if (!a) throw new Error("Invalid spline app passed to renderSpline");
          let u = o && a.findObjectById(o);
          if (!u) return;
          let { PLUGIN_SPLINE: f } = t;
          f.positionX != null && (u.position.x = f.positionX),
            f.positionY != null && (u.position.y = f.positionY),
            f.positionZ != null && (u.position.z = f.positionZ),
            f.rotationX != null && (u.rotation.x = f.rotationX),
            f.rotationY != null && (u.rotation.y = f.rotationY),
            f.rotationZ != null && (u.rotation.z = f.rotationZ),
            f.scaleX != null && (u.scale.x = f.scaleX),
            f.scaleY != null && (u.scale.y = f.scaleY),
            f.scaleZ != null && (u.scale.z = f.scaleZ);
        };
      i ? s(i.spline) : n.setLoadHandler(e, s);
    };
    Se.renderPlugin = Mq;
    var qq = () => null;
    Se.clearPlugin = qq;
  });
  var Oh = c((xe) => {
    "use strict";
    Object.defineProperty(xe, "__esModule", { value: !0 });
    xe.getPluginOrigin =
      xe.getPluginDuration =
      xe.getPluginDestination =
      xe.getPluginConfig =
      xe.createPluginInstance =
      xe.clearPlugin =
        void 0;
    xe.normalizeColor = xh;
    xe.renderPlugin = void 0;
    function xh(e) {
      let t,
        r,
        n,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase();
      if (o.startsWith("#")) {
        let s = o.substring(1);
        s.length === 3
          ? ((t = parseInt(s[0] + s[0], 16)),
            (r = parseInt(s[1] + s[1], 16)),
            (n = parseInt(s[2] + s[2], 16)))
          : s.length === 6 &&
            ((t = parseInt(s.substring(0, 2), 16)),
            (r = parseInt(s.substring(2, 4), 16)),
            (n = parseInt(s.substring(4, 6), 16)));
      } else if (o.startsWith("rgba")) {
        let s = o.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(s[0], 10)),
          (r = parseInt(s[1], 10)),
          (n = parseInt(s[2], 10)),
          (i = parseFloat(s[3]));
      } else if (o.startsWith("rgb")) {
        let s = o.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(s[0], 10)),
          (r = parseInt(s[1], 10)),
          (n = parseInt(s[2], 10));
      } else if (o.startsWith("hsla")) {
        let s = o.match(/hsla\(([^)]+)\)/)[1].split(","),
          a = parseFloat(s[0]),
          u = parseFloat(s[1].replace("%", "")) / 100,
          f = parseFloat(s[2].replace("%", "")) / 100;
        i = parseFloat(s[3]);
        let v = (1 - Math.abs(2 * f - 1)) * u,
          l = v * (1 - Math.abs(((a / 60) % 2) - 1)),
          E = f - v / 2,
          g,
          h,
          _;
        a >= 0 && a < 60
          ? ((g = v), (h = l), (_ = 0))
          : a >= 60 && a < 120
          ? ((g = l), (h = v), (_ = 0))
          : a >= 120 && a < 180
          ? ((g = 0), (h = v), (_ = l))
          : a >= 180 && a < 240
          ? ((g = 0), (h = l), (_ = v))
          : a >= 240 && a < 300
          ? ((g = l), (h = 0), (_ = v))
          : ((g = v), (h = 0), (_ = l)),
          (t = Math.round((g + E) * 255)),
          (r = Math.round((h + E) * 255)),
          (n = Math.round((_ + E) * 255));
      } else if (o.startsWith("hsl")) {
        let s = o.match(/hsl\(([^)]+)\)/)[1].split(","),
          a = parseFloat(s[0]),
          u = parseFloat(s[1].replace("%", "")) / 100,
          f = parseFloat(s[2].replace("%", "")) / 100,
          v = (1 - Math.abs(2 * f - 1)) * u,
          l = v * (1 - Math.abs(((a / 60) % 2) - 1)),
          E = f - v / 2,
          g,
          h,
          _;
        a >= 0 && a < 60
          ? ((g = v), (h = l), (_ = 0))
          : a >= 60 && a < 120
          ? ((g = l), (h = v), (_ = 0))
          : a >= 120 && a < 180
          ? ((g = 0), (h = v), (_ = l))
          : a >= 180 && a < 240
          ? ((g = 0), (h = l), (_ = v))
          : a >= 240 && a < 300
          ? ((g = l), (h = 0), (_ = v))
          : ((g = v), (h = 0), (_ = l)),
          (t = Math.round((g + E) * 255)),
          (r = Math.round((h + E) * 255)),
          (n = Math.round((_ + E) * 255));
      }
      return (
        (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n)) && `${e}`,
        { red: t, green: r, blue: n, alpha: i }
      );
    }
    var Dq = (e, t) => e.value[t];
    xe.getPluginConfig = Dq;
    var Fq = () => null;
    xe.getPluginDuration = Fq;
    var Gq = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        i = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(i, 10) };
      if (r.red != null && r.green != null && r.blue != null) return xh(i);
    };
    xe.getPluginOrigin = Gq;
    var kq = (e) => e.value;
    xe.getPluginDestination = kq;
    var Uq = () => null;
    xe.createPluginInstance = Uq;
    var Vq = (e, t, r) => {
      let n = r.config.target.objectId,
        i = r.config.value.unit,
        { PLUGIN_VARIABLE: o } = t,
        { size: s, red: a, green: u, blue: f, alpha: v } = o,
        l;
      s != null && (l = s + i),
        a != null &&
          f != null &&
          u != null &&
          v != null &&
          (l = `rgba(${a}, ${u}, ${f}, ${v})`),
        l != null && document.documentElement.style.setProperty(n, l);
    };
    xe.renderPlugin = Vq;
    var Hq = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
    xe.clearPlugin = Hq;
  });
  var Ah = c((ri) => {
    "use strict";
    var La = vn().default;
    Object.defineProperty(ri, "__esModule", { value: !0 });
    ri.pluginMethodMap = void 0;
    var Ra = (Ue(), it(Pf)),
      Wq = La(Ih()),
      Xq = La(wh()),
      Bq = La(Oh()),
      S5 = (ri.pluginMethodMap = new Map([
        [Ra.ActionTypeConsts.PLUGIN_LOTTIE, { ...Wq }],
        [Ra.ActionTypeConsts.PLUGIN_SPLINE, { ...Xq }],
        [Ra.ActionTypeConsts.PLUGIN_VARIABLE, { ...Bq }],
      ]));
  });
  var Sh = {};
  ke(Sh, {
    clearPlugin: () => Fa,
    createPluginInstance: () => zq,
    getPluginConfig: () => Pa,
    getPluginDestination: () => qa,
    getPluginDuration: () => jq,
    getPluginOrigin: () => Ma,
    isPluginType: () => Dt,
    renderPlugin: () => Da,
  });
  function Dt(e) {
    return Na.pluginMethodMap.has(e);
  }
  var Na,
    Ft,
    Pa,
    Ma,
    jq,
    qa,
    zq,
    Da,
    Fa,
    Ga = ye(() => {
      "use strict";
      Jn();
      Na = de(Ah());
      (Ft = (e) => (t) => {
        if (!et) return () => null;
        let r = Na.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      }),
        (Pa = Ft("getPluginConfig")),
        (Ma = Ft("getPluginOrigin")),
        (jq = Ft("getPluginDuration")),
        (qa = Ft("getPluginDestination")),
        (zq = Ft("createPluginInstance")),
        (Da = Ft("renderPlugin")),
        (Fa = Ft("clearPlugin"));
    });
  var Rh = c((L5, Ch) => {
    function Kq(e, t) {
      return e == null || e !== e ? t : e;
    }
    Ch.exports = Kq;
  });
  var Nh = c((N5, Lh) => {
    function Yq(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    Lh.exports = Yq;
  });
  var Mh = c((P5, Ph) => {
    function Qq(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (r(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    Ph.exports = Qq;
  });
  var Dh = c((M5, qh) => {
    var $q = Mh(),
      Zq = $q();
    qh.exports = Zq;
  });
  var ka = c((q5, Fh) => {
    var Jq = Dh(),
      e1 = Vr();
    function t1(e, t) {
      return e && Jq(e, t, e1);
    }
    Fh.exports = t1;
  });
  var kh = c((D5, Gh) => {
    var r1 = Mt();
    function n1(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!r1(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, s = Object(r);
          (t ? o-- : ++o < i) && n(s[o], o, s) !== !1;

        );
        return r;
      };
    }
    Gh.exports = n1;
  });
  var Ua = c((F5, Uh) => {
    var i1 = ka(),
      o1 = kh(),
      a1 = o1(i1);
    Uh.exports = a1;
  });
  var Hh = c((G5, Vh) => {
    function s1(e, t, r, n, i) {
      return (
        i(e, function (o, s, a) {
          r = n ? ((n = !1), o) : t(r, o, s, a);
        }),
        r
      );
    }
    Vh.exports = s1;
  });
  var Xh = c((k5, Wh) => {
    var u1 = Nh(),
      c1 = Ua(),
      l1 = xt(),
      f1 = Hh(),
      d1 = Oe();
    function p1(e, t, r) {
      var n = d1(e) ? u1 : f1,
        i = arguments.length < 3;
      return n(e, l1(t, 4), r, i, c1);
    }
    Wh.exports = p1;
  });
  var jh = c((U5, Bh) => {
    var g1 = Ia(),
      v1 = xt(),
      h1 = Ta(),
      m1 = Math.max,
      y1 = Math.min;
    function E1(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = h1(r)), (i = r < 0 ? m1(n + i, 0) : y1(i, n - 1))),
        g1(e, v1(t, 3), i, !0)
      );
    }
    Bh.exports = E1;
  });
  var Kh = c((V5, zh) => {
    var b1 = _a(),
      _1 = jh(),
      I1 = b1(_1);
    zh.exports = I1;
  });
  function Yh(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function w1(e, t) {
    if (Yh(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (let i = 0; i < r.length; i++)
      if (!T1.call(t, r[i]) || !Yh(e[r[i]], t[r[i]])) return !1;
    return !0;
  }
  var T1,
    Va,
    Qh = ye(() => {
      "use strict";
      T1 = Object.prototype.hasOwnProperty;
      Va = w1;
    });
  var pm = {};
  ke(pm, {
    cleanupHTMLElement: () => _D,
    clearAllStyles: () => bD,
    clearObjectCache: () => V1,
    getActionListProgress: () => TD,
    getAffectedElements: () => ja,
    getComputedStyle: () => Y1,
    getDestinationValues: () => rD,
    getElementId: () => B1,
    getInstanceId: () => W1,
    getInstanceOrigin: () => Z1,
    getItemConfigByKey: () => tD,
    getMaxDurationItemIndex: () => dm,
    getNamespacedParameterId: () => OD,
    getRenderType: () => cm,
    getStyleProp: () => nD,
    mediaQueriesEqual: () => SD,
    observeStore: () => K1,
    reduceListToGroup: () => wD,
    reifyState: () => j1,
    renderHTMLElement: () => iD,
    shallowEqual: () => Va,
    shouldAllowMediaQuery: () => AD,
    shouldNamespaceEventParameter: () => xD,
    stringifyTarget: () => CD,
  });
  function V1() {
    ni.clear();
  }
  function W1() {
    return "i" + H1++;
  }
  function B1(e, t) {
    for (let r in e) {
      let n = e[r];
      if (n && n.ref === t) return n.id;
    }
    return "e" + X1++;
  }
  function j1({ events: e, actionLists: t, site: r } = {}) {
    let n = (0, si.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = r && r.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function K1({ store: e, select: t, onChange: r, comparator: n = z1 }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let f = t(i());
      if (f == null) {
        s();
        return;
      }
      n(f, a) || ((a = f), r(a, e));
    }
    return s;
  }
  function Jh(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function ja({
    config: e,
    event: t,
    eventTarget: r,
    elementRoot: n,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (S, y) =>
          S.concat(
            ja({
              config: { target: y },
              event: t,
              eventTarget: r,
              elementRoot: n,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: f,
        getSiblingElements: v,
        matchSelector: l,
        elementContains: E,
        isSiblingNode: g,
      } = i,
      { target: h } = e;
    if (!h) return [];
    let {
      id: _,
      objectId: A,
      selector: w,
      selectorGuids: N,
      appliesTo: R,
      useEventTarget: M,
    } = Jh(h);
    if (A) return [ni.has(A) ? ni.get(A) : ni.set(A, {}).get(A)];
    if (R === jo.PAGE) {
      let S = s(_);
      return S ? [S] : [];
    }
    let D = (t?.action?.config?.affectedElements ?? {})[_ || w] || {},
      j = !!(D.id || D.selector),
      z,
      Q,
      re,
      X = t && a(Jh(t.target));
    if (
      (j
        ? ((z = D.limitAffectedElements), (Q = X), (re = a(D)))
        : (Q = re = a({ id: _, selector: w, selectorGuids: N })),
      t && M)
    ) {
      let S = r && (re || M === !0) ? [r] : u(X);
      if (re) {
        if (M === G1) return u(re).filter((y) => S.some((L) => E(y, L)));
        if (M === $h) return u(re).filter((y) => S.some((L) => E(L, y)));
        if (M === Zh) return u(re).filter((y) => S.some((L) => g(L, y)));
      }
      return S;
    }
    return Q == null || re == null
      ? []
      : et && n
      ? u(re).filter((S) => n.contains(S))
      : z === $h
      ? u(Q, re)
      : z === F1
      ? f(u(Q)).filter(l(re))
      : z === Zh
      ? v(u(Q)).filter(l(re))
      : u(re);
  }
  function Y1({ element: e, actionItem: t }) {
    if (!et) return {};
    let { actionTypeId: r } = t;
    switch (r) {
      case lr:
      case fr:
      case dr:
      case pr:
      case ci:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function Z1(e, t = {}, r = {}, n, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = n;
    if (Dt(s)) return Ma(s)(t[s], n);
    switch (n.actionTypeId) {
      case sr:
      case ur:
      case cr:
      case $r:
        return t[n.actionTypeId] || za[n.actionTypeId];
      case Zr:
        return Q1(t[n.actionTypeId], n.config.filters);
      case Jr:
        return $1(t[n.actionTypeId], n.config.fontVariations);
      case am:
        return { value: (0, ht.default)(parseFloat(o(e, oi)), 1) };
      case lr: {
        let a = o(e, lt),
          u = o(e, ft),
          f,
          v;
        return (
          n.config.widthUnit === At
            ? (f = em.test(a) ? parseFloat(a) : parseFloat(r.width))
            : (f = (0, ht.default)(parseFloat(a), parseFloat(r.width))),
          n.config.heightUnit === At
            ? (v = em.test(u) ? parseFloat(u) : parseFloat(r.height))
            : (v = (0, ht.default)(parseFloat(u), parseFloat(r.height))),
          { widthValue: f, heightValue: v }
        );
      }
      case fr:
      case dr:
      case pr:
        return mD({
          element: e,
          actionTypeId: n.actionTypeId,
          computedStyle: r,
          getStyle: o,
        });
      case ci:
        return { value: (0, ht.default)(o(e, ai), r.display) };
      case U1:
        return t[n.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function rD({ element: e, actionItem: t, elementApi: r }) {
    if (Dt(t.actionTypeId)) return qa(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case sr:
      case ur:
      case cr:
      case $r: {
        let { xValue: n, yValue: i, zValue: o } = t.config;
        return { xValue: n, yValue: i, zValue: o };
      }
      case lr: {
        let { getStyle: n, setStyle: i, getProperty: o } = r,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: f } = t.config;
        if (!et) return { widthValue: u, heightValue: f };
        if (s === At) {
          let v = n(e, lt);
          i(e, lt, ""), (u = o(e, "offsetWidth")), i(e, lt, v);
        }
        if (a === At) {
          let v = n(e, ft);
          i(e, ft, ""), (f = o(e, "offsetHeight")), i(e, ft, v);
        }
        return { widthValue: u, heightValue: f };
      }
      case fr:
      case dr:
      case pr: {
        let { rValue: n, gValue: i, bValue: o, aValue: s } = t.config;
        return { rValue: n, gValue: i, bValue: o, aValue: s };
      }
      case Zr:
        return t.config.filters.reduce(J1, {});
      case Jr:
        return t.config.fontVariations.reduce(eD, {});
      default: {
        let { value: n } = t.config;
        return { value: n };
      }
    }
  }
  function cm(e) {
    if (/^TRANSFORM_/.test(e)) return im;
    if (/^STYLE_/.test(e)) return Xa;
    if (/^GENERAL_/.test(e)) return Wa;
    if (/^PLUGIN_/.test(e)) return om;
  }
  function nD(e, t) {
    return e === Xa ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function iD(e, t, r, n, i, o, s, a, u) {
    switch (a) {
      case im:
        return cD(e, t, r, i, s);
      case Xa:
        return yD(e, t, r, i, o, s);
      case Wa:
        return ED(e, i, s);
      case om: {
        let { actionTypeId: f } = i;
        if (Dt(f)) return Da(f)(u, t, i);
      }
    }
  }
  function cD(e, t, r, n, i) {
    let o = uD
        .map((a) => {
          let u = za[a],
            {
              xValue: f = u.xValue,
              yValue: v = u.yValue,
              zValue: l = u.zValue,
              xUnit: E = "",
              yUnit: g = "",
              zUnit: h = "",
            } = t[a] || {};
          switch (a) {
            case sr:
              return `${A1}(${f}${E}, ${v}${g}, ${l}${h})`;
            case ur:
              return `${S1}(${f}${E}, ${v}${g}, ${l}${h})`;
            case cr:
              return `${C1}(${f}${E}) ${R1}(${v}${g}) ${L1}(${l}${h})`;
            case $r:
              return `${N1}(${f}${E}, ${v}${g})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: s } = i;
    Gt(e, Ot, i), s(e, Ot, o), dD(n, r) && s(e, Zn, P1);
  }
  function lD(e, t, r, n) {
    let i = (0, si.default)(t, (s, a, u) => `${s} ${u}(${a}${sD(u, r)})`, ""),
      { setStyle: o } = n;
    Gt(e, Kr, n), o(e, Kr, i);
  }
  function fD(e, t, r, n) {
    let i = (0, si.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = n;
    Gt(e, Yr, n), o(e, Yr, i);
  }
  function dD({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
    return (
      (e === sr && n !== void 0) ||
      (e === ur && n !== void 0) ||
      (e === cr && (t !== void 0 || r !== void 0))
    );
  }
  function hD(e, t) {
    let r = e.exec(t);
    return r ? r[1] : "";
  }
  function mD({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
    let i = Ba[t],
      o = n(e, i),
      s = gD.test(o) ? o : r[i],
      a = hD(vD, s).split(Qr);
    return {
      rValue: (0, ht.default)(parseInt(a[0], 10), 255),
      gValue: (0, ht.default)(parseInt(a[1], 10), 255),
      bValue: (0, ht.default)(parseInt(a[2], 10), 255),
      aValue: (0, ht.default)(parseFloat(a[3]), 1),
    };
  }
  function yD(e, t, r, n, i, o) {
    let { setStyle: s } = o;
    switch (n.actionTypeId) {
      case lr: {
        let { widthUnit: a = "", heightUnit: u = "" } = n.config,
          { widthValue: f, heightValue: v } = r;
        f !== void 0 && (a === At && (a = "px"), Gt(e, lt, o), s(e, lt, f + a)),
          v !== void 0 &&
            (u === At && (u = "px"), Gt(e, ft, o), s(e, ft, v + u));
        break;
      }
      case Zr: {
        lD(e, r, n.config, o);
        break;
      }
      case Jr: {
        fD(e, r, n.config, o);
        break;
      }
      case fr:
      case dr:
      case pr: {
        let a = Ba[n.actionTypeId],
          u = Math.round(r.rValue),
          f = Math.round(r.gValue),
          v = Math.round(r.bValue),
          l = r.aValue;
        Gt(e, a, o),
          s(e, a, l >= 1 ? `rgb(${u},${f},${v})` : `rgba(${u},${f},${v},${l})`);
        break;
      }
      default: {
        let { unit: a = "" } = n.config;
        Gt(e, i, o), s(e, i, r.value + a);
        break;
      }
    }
  }
  function ED(e, t, r) {
    let { setStyle: n } = r;
    switch (t.actionTypeId) {
      case ci: {
        let { value: i } = t.config;
        i === M1 && et ? n(e, ai, xa) : n(e, ai, i);
        return;
      }
    }
  }
  function Gt(e, t, r) {
    if (!et) return;
    let n = um[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, ar);
    if (!s) {
      o(e, ar, n);
      return;
    }
    let a = s.split(Qr).map(sm);
    a.indexOf(n) === -1 && o(e, ar, a.concat(n).join(Qr));
  }
  function lm(e, t, r) {
    if (!et) return;
    let n = um[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, ar);
    !s ||
      s.indexOf(n) === -1 ||
      o(
        e,
        ar,
        s
          .split(Qr)
          .map(sm)
          .filter((a) => a !== n)
          .join(Qr)
      );
  }
  function bD({ store: e, elementApi: t }) {
    let { ixData: r } = e.getState(),
      { events: n = {}, actionLists: i = {} } = r;
    Object.keys(n).forEach((o) => {
      let s = n[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        f = i[u];
      f && tm({ actionList: f, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        tm({ actionList: i[o], elementApi: t });
      });
  }
  function tm({ actionList: e = {}, event: t, elementApi: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e;
    n &&
      n.forEach((o) => {
        rm({ actionGroup: o, event: t, elementApi: r });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            rm({ actionGroup: a, event: t, elementApi: r });
          });
        });
  }
  function rm({ actionGroup: e, event: t, elementApi: r }) {
    let { actionItems: n } = e;
    n.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      Dt(o)
        ? (a = (u) => Fa(o)(u, i))
        : (a = fm({ effect: ID, actionTypeId: o, elementApi: r })),
        ja({ config: s, event: t, elementApi: r }).forEach(a);
    });
  }
  function _D(e, t, r) {
    let { setStyle: n, getStyle: i } = r,
      { actionTypeId: o } = t;
    if (o === lr) {
      let { config: s } = t;
      s.widthUnit === At && n(e, lt, ""), s.heightUnit === At && n(e, ft, "");
    }
    i(e, ar) && fm({ effect: lm, actionTypeId: o, elementApi: r })(e);
  }
  function ID(e, t, r) {
    let { setStyle: n } = r;
    lm(e, t, r), n(e, t, ""), t === Ot && n(e, Zn, "");
  }
  function dm(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((n, i) => {
        let { config: o } = n,
          s = o.delay + o.duration;
        s >= t && ((t = s), (r = i));
      }),
      r
    );
  }
  function TD(e, t) {
    let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      r.forEach((u, f) => {
        if (n && f === 0) return;
        let { actionItems: v } = u,
          l = v[dm(v)],
          { config: E, actionTypeId: g } = l;
        i.id === l.id && (a = s + o);
        let h = cm(g) === Wa ? 0 : E.duration;
        s += E.delay + h;
      }),
      s > 0 ? zr(a / s) : 0
    );
  }
  function wD({ actionList: e, actionItemId: t, rawData: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, ui.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      n && n.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: f }) => f.some(s));
        }),
      (0, ui.setIn)(r, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function xD(e, { basedOn: t }) {
    return (
      (e === Je.SCROLLING_IN_VIEW && (t === ut.ELEMENT || t == null)) ||
      (e === Je.MOUSE_MOVE && t === ut.ELEMENT)
    );
  }
  function OD(e, t) {
    return e + k1 + t;
  }
  function AD(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function SD(e, t) {
    return Va(e && e.sort(), t && t.sort());
  }
  function CD(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Ha + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
    return t + Ha + r + Ha + n;
  }
  var ht,
    si,
    ii,
    ui,
    x1,
    O1,
    A1,
    S1,
    C1,
    R1,
    L1,
    N1,
    P1,
    M1,
    oi,
    Kr,
    Yr,
    lt,
    ft,
    nm,
    q1,
    D1,
    $h,
    F1,
    Zh,
    G1,
    ai,
    ar,
    At,
    Qr,
    k1,
    Ha,
    im,
    Wa,
    Xa,
    om,
    sr,
    ur,
    cr,
    $r,
    am,
    Zr,
    Jr,
    lr,
    fr,
    dr,
    pr,
    ci,
    U1,
    sm,
    Ba,
    um,
    ni,
    H1,
    X1,
    z1,
    em,
    Q1,
    $1,
    J1,
    eD,
    tD,
    za,
    oD,
    aD,
    sD,
    uD,
    pD,
    gD,
    vD,
    fm,
    gm = ye(() => {
      "use strict";
      (ht = de(Rh())), (si = de(Xh())), (ii = de(Kh())), (ui = de(Qt()));
      Ue();
      Qh();
      Sa();
      Ga();
      Jn();
      ({
        BACKGROUND: x1,
        TRANSFORM: O1,
        TRANSLATE_3D: A1,
        SCALE_3D: S1,
        ROTATE_X: C1,
        ROTATE_Y: R1,
        ROTATE_Z: L1,
        SKEW: N1,
        PRESERVE_3D: P1,
        FLEX: M1,
        OPACITY: oi,
        FILTER: Kr,
        FONT_VARIATION_SETTINGS: Yr,
        WIDTH: lt,
        HEIGHT: ft,
        BACKGROUND_COLOR: nm,
        BORDER_COLOR: q1,
        COLOR: D1,
        CHILDREN: $h,
        IMMEDIATE_CHILDREN: F1,
        SIBLINGS: Zh,
        PARENT: G1,
        DISPLAY: ai,
        WILL_CHANGE: ar,
        AUTO: At,
        COMMA_DELIMITER: Qr,
        COLON_DELIMITER: k1,
        BAR_DELIMITER: Ha,
        RENDER_TRANSFORM: im,
        RENDER_GENERAL: Wa,
        RENDER_STYLE: Xa,
        RENDER_PLUGIN: om,
      } = Re),
        ({
          TRANSFORM_MOVE: sr,
          TRANSFORM_SCALE: ur,
          TRANSFORM_ROTATE: cr,
          TRANSFORM_SKEW: $r,
          STYLE_OPACITY: am,
          STYLE_FILTER: Zr,
          STYLE_FONT_VARIATION: Jr,
          STYLE_SIZE: lr,
          STYLE_BACKGROUND_COLOR: fr,
          STYLE_BORDER: dr,
          STYLE_TEXT_COLOR: pr,
          GENERAL_DISPLAY: ci,
          OBJECT_VALUE: U1,
        } = Xe),
        (sm = (e) => e.trim()),
        (Ba = Object.freeze({ [fr]: nm, [dr]: q1, [pr]: D1 })),
        (um = Object.freeze({
          [Ot]: O1,
          [nm]: x1,
          [oi]: oi,
          [Kr]: Kr,
          [lt]: lt,
          [ft]: ft,
          [Yr]: Yr,
        })),
        (ni = new Map());
      H1 = 1;
      X1 = 1;
      z1 = (e, t) => e === t;
      (em = /px/),
        (Q1 = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = oD[n.type]), r),
            e || {}
          )),
        ($1 = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = aD[n.type] || n.defaultValue || 0),
              r
            ),
            e || {}
          ));
      (J1 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (eD = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (tD = (e, t, r) => {
          if (Dt(e)) return Pa(e)(r, t);
          switch (e) {
            case Zr: {
              let n = (0, ii.default)(r.filters, ({ type: i }) => i === t);
              return n ? n.value : 0;
            }
            case Jr: {
              let n = (0, ii.default)(
                r.fontVariations,
                ({ type: i }) => i === t
              );
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        });
      (za = {
        [sr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [ur]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [cr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [$r]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (oD = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (aD = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (sD = (e, t) => {
          let r = (0, ii.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (uD = Object.keys(za));
      (pD = "\\(([^)]+)\\)"), (gD = /^rgb/), (vD = RegExp(`rgba?${pD}`));
      fm =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case sr:
            case ur:
            case cr:
            case $r:
              e(n, Ot, r);
              break;
            case Zr:
              e(n, Kr, r);
              break;
            case Jr:
              e(n, Yr, r);
              break;
            case am:
              e(n, oi, r);
              break;
            case lr:
              e(n, lt, r), e(n, ft, r);
              break;
            case fr:
            case dr:
            case pr:
              e(n, Ba[t], r);
              break;
            case ci:
              e(n, ai, r);
              break;
          }
        };
    });
  var kt = c((qe) => {
    "use strict";
    var gr = vn().default;
    Object.defineProperty(qe, "__esModule", { value: !0 });
    qe.IX2VanillaUtils =
      qe.IX2VanillaPlugins =
      qe.IX2ElementsReducer =
      qe.IX2Easings =
      qe.IX2EasingUtils =
      qe.IX2BrowserSupport =
        void 0;
    var RD = gr((Jn(), it(lh)));
    qe.IX2BrowserSupport = RD;
    var LD = gr((Aa(), it(jr)));
    qe.IX2Easings = LD;
    var ND = gr((Sa(), it(mh)));
    qe.IX2EasingUtils = ND;
    var PD = gr((_h(), it(bh)));
    qe.IX2ElementsReducer = PD;
    var MD = gr((Ga(), it(Sh)));
    qe.IX2VanillaPlugins = MD;
    var qD = gr((gm(), it(pm)));
    qe.IX2VanillaUtils = qD;
  });
  var fi,
    mt,
    DD,
    FD,
    GD,
    kD,
    UD,
    VD,
    li,
    vm,
    HD,
    WD,
    Ka,
    XD,
    BD,
    jD,
    zD,
    hm,
    mm = ye(() => {
      "use strict";
      Ue();
      (fi = de(kt())),
        (mt = de(Qt())),
        ({
          IX2_RAW_DATA_IMPORTED: DD,
          IX2_SESSION_STOPPED: FD,
          IX2_INSTANCE_ADDED: GD,
          IX2_INSTANCE_STARTED: kD,
          IX2_INSTANCE_REMOVED: UD,
          IX2_ANIMATION_FRAME_CHANGED: VD,
        } = we),
        ({
          optimizeFloat: li,
          applyEasing: vm,
          createBezierEasing: HD,
        } = fi.IX2EasingUtils),
        ({ RENDER_GENERAL: WD } = Re),
        ({
          getItemConfigByKey: Ka,
          getRenderType: XD,
          getStyleProp: BD,
        } = fi.IX2VanillaUtils),
        (jD = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: f,
              skipMotion: v,
              skipToValue: l,
            } = e,
            { parameters: E } = t.payload,
            g = Math.max(1 - s, 0.01),
            h = E[n];
          h == null && ((g = 1), (h = a));
          let _ = Math.max(h, 0) || 0,
            A = li(_ - r),
            w = v ? l : li(r + A * g),
            N = w * 100;
          if (w === r && e.current) return e;
          let R, M, F, D;
          for (let z = 0, { length: Q } = i; z < Q; z++) {
            let { keyframe: re, actionItems: X } = i[z];
            if ((z === 0 && (R = X[0]), N >= re)) {
              R = X[0];
              let S = i[z + 1],
                y = S && N !== re;
              (M = y ? S.actionItems[0] : null),
                y && ((F = re / 100), (D = (S.keyframe - re) / 100));
            }
          }
          let j = {};
          if (R && !M)
            for (let z = 0, { length: Q } = o; z < Q; z++) {
              let re = o[z];
              j[re] = Ka(u, re, R.config);
            }
          else if (R && M && F !== void 0 && D !== void 0) {
            let z = (w - F) / D,
              Q = R.config.easing,
              re = vm(Q, z, f);
            for (let X = 0, { length: S } = o; X < S; X++) {
              let y = o[X],
                L = Ka(u, y, R.config),
                ee = (Ka(u, y, M.config) - L) * re + L;
              j[y] = ee;
            }
          }
          return (0, mt.merge)(e, { position: w, current: j });
        }),
        (zD = (e, t) => {
          let {
              active: r,
              origin: n,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: f,
              destinationKeys: v,
              pluginDuration: l,
              instanceDelay: E,
              customEasingFn: g,
              skipMotion: h,
            } = e,
            _ = u.config.easing,
            { duration: A, delay: w } = u.config;
          l != null && (A = l),
            (w = E ?? w),
            s === WD ? (A = 0) : (o || h) && (A = w = 0);
          let { now: N } = t.payload;
          if (r && n) {
            let R = N - (i + w);
            if (a) {
              let z = N - i,
                Q = A + w,
                re = li(Math.min(Math.max(0, z / Q), 1));
              e = (0, mt.set)(e, "verboseTimeElapsed", Q * re);
            }
            if (R < 0) return e;
            let M = li(Math.min(Math.max(0, R / A), 1)),
              F = vm(_, M, g),
              D = {},
              j = null;
            return (
              v.length &&
                (j = v.reduce((z, Q) => {
                  let re = f[Q],
                    X = parseFloat(n[Q]) || 0,
                    y = (parseFloat(re) - X) * F + X;
                  return (z[Q] = y), z;
                }, {})),
              (D.current = j),
              (D.position = M),
              M === 1 && ((D.active = !1), (D.complete = !0)),
              (0, mt.merge)(e, D)
            );
          }
          return e;
        }),
        (hm = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case DD:
              return t.payload.ixInstances || Object.freeze({});
            case FD:
              return Object.freeze({});
            case GD: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: f,
                  isCarrier: v,
                  origin: l,
                  destination: E,
                  immediate: g,
                  verbose: h,
                  continuous: _,
                  parameterId: A,
                  actionGroups: w,
                  smoothing: N,
                  restingValue: R,
                  pluginInstance: M,
                  pluginDuration: F,
                  instanceDelay: D,
                  skipMotion: j,
                  skipToValue: z,
                } = t.payload,
                { actionTypeId: Q } = i,
                re = XD(Q),
                X = BD(re, Q),
                S = Object.keys(E).filter(
                  (L) => E[L] != null && typeof E[L] != "string"
                ),
                { easing: y } = i.config;
              return (0, mt.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: l,
                destination: E,
                destinationKeys: S,
                immediate: g,
                verbose: h,
                current: null,
                actionItem: i,
                actionTypeId: Q,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: f,
                renderType: re,
                isCarrier: v,
                styleProp: X,
                continuous: _,
                parameterId: A,
                actionGroups: w,
                smoothing: N,
                restingValue: R,
                pluginInstance: M,
                pluginDuration: F,
                instanceDelay: D,
                skipMotion: j,
                skipToValue: z,
                customEasingFn:
                  Array.isArray(y) && y.length === 4 ? HD(y) : void 0,
              });
            }
            case kD: {
              let { instanceId: r, time: n } = t.payload;
              return (0, mt.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case UD: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== r && (n[a] = e[a]);
              }
              return n;
            }
            case VD: {
              let r = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let o = 0; o < i; o++) {
                let s = n[o],
                  a = e[s],
                  u = a.continuous ? jD : zD;
                r = (0, mt.set)(r, s, u(a, t));
              }
              return r;
            }
            default:
              return e;
          }
        });
    });
  var KD,
    YD,
    QD,
    ym,
    Em = ye(() => {
      "use strict";
      Ue();
      ({
        IX2_RAW_DATA_IMPORTED: KD,
        IX2_SESSION_STOPPED: YD,
        IX2_PARAMETER_CHANGED: QD,
      } = we),
        (ym = (e = {}, t) => {
          switch (t.type) {
            case KD:
              return t.payload.ixParameters || {};
            case YD:
              return {};
            case QD: {
              let { key: r, value: n } = t.payload;
              return (e[r] = n), e;
            }
            default:
              return e;
          }
        });
    });
  var Im = {};
  ke(Im, { default: () => ZD });
  var bm,
    _m,
    $D,
    ZD,
    Tm = ye(() => {
      "use strict";
      bm = de(Bo());
      qf();
      rd();
      od();
      _m = de(kt());
      mm();
      Em();
      ({ ixElements: $D } = _m.IX2ElementsReducer),
        (ZD = (0, bm.combineReducers)({
          ixData: Mf,
          ixRequest: td,
          ixSession: id,
          ixElements: $D,
          ixInstances: hm,
          ixParameters: ym,
        }));
    });
  var xm = c((ij, wm) => {
    var JD = Tt(),
      eF = Oe(),
      tF = gt(),
      rF = "[object String]";
    function nF(e) {
      return typeof e == "string" || (!eF(e) && tF(e) && JD(e) == rF);
    }
    wm.exports = nF;
  });
  var Am = c((oj, Om) => {
    var iF = ba(),
      oF = iF("length");
    Om.exports = oF;
  });
  var Cm = c((aj, Sm) => {
    var aF = "\\ud800-\\udfff",
      sF = "\\u0300-\\u036f",
      uF = "\\ufe20-\\ufe2f",
      cF = "\\u20d0-\\u20ff",
      lF = sF + uF + cF,
      fF = "\\ufe0e\\ufe0f",
      dF = "\\u200d",
      pF = RegExp("[" + dF + aF + lF + fF + "]");
    function gF(e) {
      return pF.test(e);
    }
    Sm.exports = gF;
  });
  var Gm = c((sj, Fm) => {
    var Lm = "\\ud800-\\udfff",
      vF = "\\u0300-\\u036f",
      hF = "\\ufe20-\\ufe2f",
      mF = "\\u20d0-\\u20ff",
      yF = vF + hF + mF,
      EF = "\\ufe0e\\ufe0f",
      bF = "[" + Lm + "]",
      Ya = "[" + yF + "]",
      Qa = "\\ud83c[\\udffb-\\udfff]",
      _F = "(?:" + Ya + "|" + Qa + ")",
      Nm = "[^" + Lm + "]",
      Pm = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Mm = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      IF = "\\u200d",
      qm = _F + "?",
      Dm = "[" + EF + "]?",
      TF = "(?:" + IF + "(?:" + [Nm, Pm, Mm].join("|") + ")" + Dm + qm + ")*",
      wF = Dm + qm + TF,
      xF = "(?:" + [Nm + Ya + "?", Ya, Pm, Mm, bF].join("|") + ")",
      Rm = RegExp(Qa + "(?=" + Qa + ")|" + xF + wF, "g");
    function OF(e) {
      for (var t = (Rm.lastIndex = 0); Rm.test(e); ) ++t;
      return t;
    }
    Fm.exports = OF;
  });
  var Um = c((uj, km) => {
    var AF = Am(),
      SF = Cm(),
      CF = Gm();
    function RF(e) {
      return SF(e) ? CF(e) : AF(e);
    }
    km.exports = RF;
  });
  var Hm = c((cj, Vm) => {
    var LF = Wn(),
      NF = Xn(),
      PF = Mt(),
      MF = xm(),
      qF = Um(),
      DF = "[object Map]",
      FF = "[object Set]";
    function GF(e) {
      if (e == null) return 0;
      if (PF(e)) return MF(e) ? qF(e) : e.length;
      var t = NF(e);
      return t == DF || t == FF ? e.size : LF(e).length;
    }
    Vm.exports = GF;
  });
  var Xm = c((lj, Wm) => {
    var kF = "Expected a function";
    function UF(e) {
      if (typeof e != "function") throw new TypeError(kF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Wm.exports = UF;
  });
  var $a = c((fj, Bm) => {
    var VF = wt(),
      HF = (function () {
        try {
          var e = VF(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Bm.exports = HF;
  });
  var Za = c((dj, zm) => {
    var jm = $a();
    function WF(e, t, r) {
      t == "__proto__" && jm
        ? jm(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    zm.exports = WF;
  });
  var Ym = c((pj, Km) => {
    var XF = Za(),
      BF = Pn(),
      jF = Object.prototype,
      zF = jF.hasOwnProperty;
    function KF(e, t, r) {
      var n = e[t];
      (!(zF.call(e, t) && BF(n, r)) || (r === void 0 && !(t in e))) &&
        XF(e, t, r);
    }
    Km.exports = KF;
  });
  var Zm = c((gj, $m) => {
    var YF = Ym(),
      QF = Wr(),
      $F = kn(),
      Qm = ct(),
      ZF = ir();
    function JF(e, t, r, n) {
      if (!Qm(e)) return e;
      t = QF(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = ZF(t[i]),
          f = r;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var v = a[u];
          (f = n ? n(v, u, a) : void 0),
            f === void 0 && (f = Qm(v) ? v : $F(t[i + 1]) ? [] : {});
        }
        YF(a, u, f), (a = a[u]);
      }
      return e;
    }
    $m.exports = JF;
  });
  var ey = c((vj, Jm) => {
    var e2 = zn(),
      t2 = Zm(),
      r2 = Wr();
    function n2(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var s = t[n],
          a = e2(e, s);
        r(a, s) && t2(o, r2(s, e), a);
      }
      return o;
    }
    Jm.exports = n2;
  });
  var ry = c((hj, ty) => {
    var i2 = Fn(),
      o2 = No(),
      a2 = oa(),
      s2 = ia(),
      u2 = Object.getOwnPropertySymbols,
      c2 = u2
        ? function (e) {
            for (var t = []; e; ) i2(t, a2(e)), (e = o2(e));
            return t;
          }
        : s2;
    ty.exports = c2;
  });
  var iy = c((mj, ny) => {
    function l2(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    ny.exports = l2;
  });
  var ay = c((yj, oy) => {
    var f2 = ct(),
      d2 = Hn(),
      p2 = iy(),
      g2 = Object.prototype,
      v2 = g2.hasOwnProperty;
    function h2(e) {
      if (!f2(e)) return p2(e);
      var t = d2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !v2.call(e, n))) || r.push(n);
      return r;
    }
    oy.exports = h2;
  });
  var uy = c((Ej, sy) => {
    var m2 = sa(),
      y2 = ay(),
      E2 = Mt();
    function b2(e) {
      return E2(e) ? m2(e, !0) : y2(e);
    }
    sy.exports = b2;
  });
  var ly = c((bj, cy) => {
    var _2 = na(),
      I2 = ry(),
      T2 = uy();
    function w2(e) {
      return _2(e, T2, I2);
    }
    cy.exports = w2;
  });
  var dy = c((_j, fy) => {
    var x2 = Ea(),
      O2 = xt(),
      A2 = ey(),
      S2 = ly();
    function C2(e, t) {
      if (e == null) return {};
      var r = x2(S2(e), function (n) {
        return [n];
      });
      return (
        (t = O2(t)),
        A2(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    fy.exports = C2;
  });
  var gy = c((Ij, py) => {
    var R2 = xt(),
      L2 = Xm(),
      N2 = dy();
    function P2(e, t) {
      return N2(e, L2(R2(t)));
    }
    py.exports = P2;
  });
  var hy = c((Tj, vy) => {
    var M2 = Wn(),
      q2 = Xn(),
      D2 = Fr(),
      F2 = Oe(),
      G2 = Mt(),
      k2 = Gn(),
      U2 = Hn(),
      V2 = Vn(),
      H2 = "[object Map]",
      W2 = "[object Set]",
      X2 = Object.prototype,
      B2 = X2.hasOwnProperty;
    function j2(e) {
      if (e == null) return !0;
      if (
        G2(e) &&
        (F2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          k2(e) ||
          V2(e) ||
          D2(e))
      )
        return !e.length;
      var t = q2(e);
      if (t == H2 || t == W2) return !e.size;
      if (U2(e)) return !M2(e).length;
      for (var r in e) if (B2.call(e, r)) return !1;
      return !0;
    }
    vy.exports = j2;
  });
  var yy = c((wj, my) => {
    var z2 = Za(),
      K2 = ka(),
      Y2 = xt();
    function Q2(e, t) {
      var r = {};
      return (
        (t = Y2(t, 3)),
        K2(e, function (n, i, o) {
          z2(r, i, t(n, i, o));
        }),
        r
      );
    }
    my.exports = Q2;
  });
  var by = c((xj, Ey) => {
    function $2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    Ey.exports = $2;
  });
  var Iy = c((Oj, _y) => {
    var Z2 = Yn();
    function J2(e) {
      return typeof e == "function" ? e : Z2;
    }
    _y.exports = J2;
  });
  var wy = c((Aj, Ty) => {
    var eG = by(),
      tG = Ua(),
      rG = Iy(),
      nG = Oe();
    function iG(e, t) {
      var r = nG(e) ? eG : tG;
      return r(e, rG(t));
    }
    Ty.exports = iG;
  });
  var Oy = c((Sj, xy) => {
    var oG = Ze(),
      aG = function () {
        return oG.Date.now();
      };
    xy.exports = aG;
  });
  var Cy = c((Cj, Sy) => {
    var sG = ct(),
      Ja = Oy(),
      Ay = Qn(),
      uG = "Expected a function",
      cG = Math.max,
      lG = Math.min;
    function fG(e, t, r) {
      var n,
        i,
        o,
        s,
        a,
        u,
        f = 0,
        v = !1,
        l = !1,
        E = !0;
      if (typeof e != "function") throw new TypeError(uG);
      (t = Ay(t) || 0),
        sG(r) &&
          ((v = !!r.leading),
          (l = "maxWait" in r),
          (o = l ? cG(Ay(r.maxWait) || 0, t) : o),
          (E = "trailing" in r ? !!r.trailing : E));
      function g(D) {
        var j = n,
          z = i;
        return (n = i = void 0), (f = D), (s = e.apply(z, j)), s;
      }
      function h(D) {
        return (f = D), (a = setTimeout(w, t)), v ? g(D) : s;
      }
      function _(D) {
        var j = D - u,
          z = D - f,
          Q = t - j;
        return l ? lG(Q, o - z) : Q;
      }
      function A(D) {
        var j = D - u,
          z = D - f;
        return u === void 0 || j >= t || j < 0 || (l && z >= o);
      }
      function w() {
        var D = Ja();
        if (A(D)) return N(D);
        a = setTimeout(w, _(D));
      }
      function N(D) {
        return (a = void 0), E && n ? g(D) : ((n = i = void 0), s);
      }
      function R() {
        a !== void 0 && clearTimeout(a), (f = 0), (n = u = i = a = void 0);
      }
      function M() {
        return a === void 0 ? s : N(Ja());
      }
      function F() {
        var D = Ja(),
          j = A(D);
        if (((n = arguments), (i = this), (u = D), j)) {
          if (a === void 0) return h(u);
          if (l) return clearTimeout(a), (a = setTimeout(w, t)), g(u);
        }
        return a === void 0 && (a = setTimeout(w, t)), s;
      }
      return (F.cancel = R), (F.flush = M), F;
    }
    Sy.exports = fG;
  });
  var Ly = c((Rj, Ry) => {
    var dG = Cy(),
      pG = ct(),
      gG = "Expected a function";
    function vG(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(gG);
      return (
        pG(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        dG(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    Ry.exports = vG;
  });
  var Py = {};
  ke(Py, {
    actionListPlaybackChanged: () => hr,
    animationFrameChanged: () => pi,
    clearRequested: () => UG,
    elementStateChanged: () => ss,
    eventListenerAdded: () => di,
    eventStateChanged: () => is,
    instanceAdded: () => os,
    instanceRemoved: () => as,
    instanceStarted: () => gi,
    mediaQueriesDefined: () => cs,
    parameterChanged: () => vr,
    playbackRequested: () => GG,
    previewRequested: () => FG,
    rawDataImported: () => es,
    sessionInitialized: () => ts,
    sessionStarted: () => rs,
    sessionStopped: () => ns,
    stopRequested: () => kG,
    testFrameRendered: () => VG,
    viewportWidthChanged: () => us,
  });
  var Ny,
    hG,
    mG,
    yG,
    EG,
    bG,
    _G,
    IG,
    TG,
    wG,
    xG,
    OG,
    AG,
    SG,
    CG,
    RG,
    LG,
    NG,
    PG,
    MG,
    qG,
    DG,
    es,
    ts,
    rs,
    ns,
    FG,
    GG,
    kG,
    UG,
    di,
    VG,
    is,
    pi,
    vr,
    os,
    gi,
    as,
    ss,
    hr,
    us,
    cs,
    vi = ye(() => {
      "use strict";
      Ue();
      (Ny = de(kt())),
        ({
          IX2_RAW_DATA_IMPORTED: hG,
          IX2_SESSION_INITIALIZED: mG,
          IX2_SESSION_STARTED: yG,
          IX2_SESSION_STOPPED: EG,
          IX2_PREVIEW_REQUESTED: bG,
          IX2_PLAYBACK_REQUESTED: _G,
          IX2_STOP_REQUESTED: IG,
          IX2_CLEAR_REQUESTED: TG,
          IX2_EVENT_LISTENER_ADDED: wG,
          IX2_TEST_FRAME_RENDERED: xG,
          IX2_EVENT_STATE_CHANGED: OG,
          IX2_ANIMATION_FRAME_CHANGED: AG,
          IX2_PARAMETER_CHANGED: SG,
          IX2_INSTANCE_ADDED: CG,
          IX2_INSTANCE_STARTED: RG,
          IX2_INSTANCE_REMOVED: LG,
          IX2_ELEMENT_STATE_CHANGED: NG,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: PG,
          IX2_VIEWPORT_WIDTH_CHANGED: MG,
          IX2_MEDIA_QUERIES_DEFINED: qG,
        } = we),
        ({ reifyState: DG } = Ny.IX2VanillaUtils),
        (es = (e) => ({ type: hG, payload: { ...DG(e) } })),
        (ts = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: mG,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (rs = () => ({ type: yG })),
        (ns = () => ({ type: EG })),
        (FG = ({ rawData: e, defer: t }) => ({
          type: bG,
          payload: { defer: t, rawData: e },
        })),
        (GG = ({
          actionTypeId: e = Xe.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: r,
          eventId: n,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: _G,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: r,
            testManual: s,
            eventId: n,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (kG = (e) => ({ type: IG, payload: { actionListId: e } })),
        (UG = () => ({ type: TG })),
        (di = (e, t) => ({
          type: wG,
          payload: { target: e, listenerParams: t },
        })),
        (VG = (e = 1) => ({ type: xG, payload: { step: e } })),
        (is = (e, t) => ({ type: OG, payload: { stateKey: e, newState: t } })),
        (pi = (e, t) => ({ type: AG, payload: { now: e, parameters: t } })),
        (vr = (e, t) => ({ type: SG, payload: { key: e, value: t } })),
        (os = (e) => ({ type: CG, payload: { ...e } })),
        (gi = (e, t) => ({ type: RG, payload: { instanceId: e, time: t } })),
        (as = (e) => ({ type: LG, payload: { instanceId: e } })),
        (ss = (e, t, r, n) => ({
          type: NG,
          payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
        })),
        (hr = ({ actionListId: e, isPlaying: t }) => ({
          type: PG,
          payload: { actionListId: e, isPlaying: t },
        })),
        (us = ({ width: e, mediaQueries: t }) => ({
          type: MG,
          payload: { width: e, mediaQueries: t },
        })),
        (cs = () => ({ type: qG }));
    });
  var De = {};
  ke(De, {
    elementContains: () => ds,
    getChildElements: () => $G,
    getClosestElement: () => en,
    getProperty: () => jG,
    getQuerySelector: () => fs,
    getRefType: () => ps,
    getSiblingElements: () => ZG,
    getStyle: () => BG,
    getValidDocument: () => KG,
    isSiblingNode: () => QG,
    matchSelector: () => zG,
    queryDocument: () => YG,
    setStyle: () => XG,
  });
  function XG(e, t, r) {
    e.style[t] = r;
  }
  function BG(e, t) {
    return e.style[t];
  }
  function jG(e, t) {
    return e[t];
  }
  function zG(e) {
    return (t) => t[ls](e);
  }
  function fs({ id: e, selector: t }) {
    if (e) {
      let r = e;
      if (e.indexOf(My) !== -1) {
        let n = e.split(My),
          i = n[0];
        if (((r = n[1]), i !== document.documentElement.getAttribute(Dy)))
          return null;
      }
      return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
    }
    return t;
  }
  function KG(e) {
    return e == null || e === document.documentElement.getAttribute(Dy)
      ? document
      : null;
  }
  function YG(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function ds(e, t) {
    return e.contains(t);
  }
  function QG(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function $G(e) {
    let t = [];
    for (let r = 0, { length: n } = e || []; r < n; r++) {
      let { children: i } = e[r],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function ZG(e = []) {
    let t = [],
      r = [];
    for (let n = 0, { length: i } = e; n < i; n++) {
      let { parentNode: o } = e[n];
      if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
        continue;
      r.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function ps(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? HG
        : WG
      : null;
  }
  var qy,
    ls,
    My,
    HG,
    WG,
    Dy,
    en,
    Fy = ye(() => {
      "use strict";
      qy = de(kt());
      Ue();
      ({ ELEMENT_MATCHES: ls } = qy.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: My,
          HTML_ELEMENT: HG,
          PLAIN_OBJECT: WG,
          WF_PAGE: Dy,
        } = Re);
      en = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[ls] && r[ls](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
    });
  var gs = c((Pj, ky) => {
    var JG = ct(),
      Gy = Object.create,
      ek = (function () {
        function e() {}
        return function (t) {
          if (!JG(t)) return {};
          if (Gy) return Gy(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    ky.exports = ek;
  });
  var hi = c((Mj, Uy) => {
    function tk() {}
    Uy.exports = tk;
  });
  var yi = c((qj, Vy) => {
    var rk = gs(),
      nk = hi();
    function mi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    mi.prototype = rk(nk.prototype);
    mi.prototype.constructor = mi;
    Vy.exports = mi;
  });
  var By = c((Dj, Xy) => {
    var Hy = zt(),
      ik = Fr(),
      ok = Oe(),
      Wy = Hy ? Hy.isConcatSpreadable : void 0;
    function ak(e) {
      return ok(e) || ik(e) || !!(Wy && e && e[Wy]);
    }
    Xy.exports = ak;
  });
  var Ky = c((Fj, zy) => {
    var sk = Fn(),
      uk = By();
    function jy(e, t, r, n, i) {
      var o = -1,
        s = e.length;
      for (r || (r = uk), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && r(a)
          ? t > 1
            ? jy(a, t - 1, r, n, i)
            : sk(i, a)
          : n || (i[i.length] = a);
      }
      return i;
    }
    zy.exports = jy;
  });
  var Qy = c((Gj, Yy) => {
    var ck = Ky();
    function lk(e) {
      var t = e == null ? 0 : e.length;
      return t ? ck(e, 1) : [];
    }
    Yy.exports = lk;
  });
  var Zy = c((kj, $y) => {
    function fk(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    $y.exports = fk;
  });
  var tE = c((Uj, eE) => {
    var dk = Zy(),
      Jy = Math.max;
    function pk(e, t, r) {
      return (
        (t = Jy(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = Jy(n.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = n[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
          return (a[t] = r(s)), dk(e, this, a);
        }
      );
    }
    eE.exports = pk;
  });
  var nE = c((Vj, rE) => {
    function gk(e) {
      return function () {
        return e;
      };
    }
    rE.exports = gk;
  });
  var aE = c((Hj, oE) => {
    var vk = nE(),
      iE = $a(),
      hk = Yn(),
      mk = iE
        ? function (e, t) {
            return iE(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: vk(t),
              writable: !0,
            });
          }
        : hk;
    oE.exports = mk;
  });
  var uE = c((Wj, sE) => {
    var yk = 800,
      Ek = 16,
      bk = Date.now;
    function _k(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = bk(),
          i = Ek - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= yk) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    sE.exports = _k;
  });
  var lE = c((Xj, cE) => {
    var Ik = aE(),
      Tk = uE(),
      wk = Tk(Ik);
    cE.exports = wk;
  });
  var dE = c((Bj, fE) => {
    var xk = Qy(),
      Ok = tE(),
      Ak = lE();
    function Sk(e) {
      return Ak(Ok(e, void 0, xk), e + "");
    }
    fE.exports = Sk;
  });
  var vE = c((jj, gE) => {
    var pE = ua(),
      Ck = pE && new pE();
    gE.exports = Ck;
  });
  var mE = c((zj, hE) => {
    function Rk() {}
    hE.exports = Rk;
  });
  var vs = c((Kj, EE) => {
    var yE = vE(),
      Lk = mE(),
      Nk = yE
        ? function (e) {
            return yE.get(e);
          }
        : Lk;
    EE.exports = Nk;
  });
  var _E = c((Yj, bE) => {
    var Pk = {};
    bE.exports = Pk;
  });
  var hs = c((Qj, TE) => {
    var IE = _E(),
      Mk = Object.prototype,
      qk = Mk.hasOwnProperty;
    function Dk(e) {
      for (
        var t = e.name + "", r = IE[t], n = qk.call(IE, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    TE.exports = Dk;
  });
  var bi = c(($j, wE) => {
    var Fk = gs(),
      Gk = hi(),
      kk = 4294967295;
    function Ei(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = kk),
        (this.__views__ = []);
    }
    Ei.prototype = Fk(Gk.prototype);
    Ei.prototype.constructor = Ei;
    wE.exports = Ei;
  });
  var OE = c((Zj, xE) => {
    function Uk(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    xE.exports = Uk;
  });
  var SE = c((Jj, AE) => {
    var Vk = bi(),
      Hk = yi(),
      Wk = OE();
    function Xk(e) {
      if (e instanceof Vk) return e.clone();
      var t = new Hk(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = Wk(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    AE.exports = Xk;
  });
  var LE = c((ez, RE) => {
    var Bk = bi(),
      CE = yi(),
      jk = hi(),
      zk = Oe(),
      Kk = gt(),
      Yk = SE(),
      Qk = Object.prototype,
      $k = Qk.hasOwnProperty;
    function _i(e) {
      if (Kk(e) && !zk(e) && !(e instanceof Bk)) {
        if (e instanceof CE) return e;
        if ($k.call(e, "__wrapped__")) return Yk(e);
      }
      return new CE(e);
    }
    _i.prototype = jk.prototype;
    _i.prototype.constructor = _i;
    RE.exports = _i;
  });
  var PE = c((tz, NE) => {
    var Zk = bi(),
      Jk = vs(),
      eU = hs(),
      tU = LE();
    function rU(e) {
      var t = eU(e),
        r = tU[t];
      if (typeof r != "function" || !(t in Zk.prototype)) return !1;
      if (e === r) return !0;
      var n = Jk(r);
      return !!n && e === n[0];
    }
    NE.exports = rU;
  });
  var FE = c((rz, DE) => {
    var ME = yi(),
      nU = dE(),
      iU = vs(),
      ms = hs(),
      oU = Oe(),
      qE = PE(),
      aU = "Expected a function",
      sU = 8,
      uU = 32,
      cU = 128,
      lU = 256;
    function fU(e) {
      return nU(function (t) {
        var r = t.length,
          n = r,
          i = ME.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(aU);
          if (i && !s && ms(o) == "wrapper") var s = new ME([], !0);
        }
        for (n = s ? n : r; ++n < r; ) {
          o = t[n];
          var a = ms(o),
            u = a == "wrapper" ? iU(o) : void 0;
          u &&
          qE(u[0]) &&
          u[1] == (cU | sU | uU | lU) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[ms(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && qE(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var f = arguments,
            v = f[0];
          if (s && f.length == 1 && oU(v)) return s.plant(v).value();
          for (var l = 0, E = r ? t[l].apply(this, f) : v; ++l < r; )
            E = t[l].call(this, E);
          return E;
        };
      });
    }
    DE.exports = fU;
  });
  var kE = c((nz, GE) => {
    var dU = FE(),
      pU = dU();
    GE.exports = pU;
  });
  var VE = c((iz, UE) => {
    function gU(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    UE.exports = gU;
  });
  var WE = c((oz, HE) => {
    var vU = VE(),
      ys = Qn();
    function hU(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = ys(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = ys(t)), (t = t === t ? t : 0)),
        vU(ys(e), t, r)
      );
    }
    HE.exports = hU;
  });
  var ZE,
    JE,
    eb,
    tb,
    mU,
    yU,
    EU,
    bU,
    _U,
    IU,
    TU,
    wU,
    xU,
    OU,
    AU,
    SU,
    CU,
    RU,
    LU,
    rb,
    nb,
    NU,
    PU,
    MU,
    ib,
    qU,
    DU,
    ob,
    FU,
    Es,
    ab,
    XE,
    BE,
    sb,
    rn,
    GU,
    dt,
    ub,
    kU,
    He,
    tt,
    nn,
    cb,
    bs,
    jE,
    _s,
    UU,
    tn,
    VU,
    HU,
    WU,
    lb,
    zE,
    XU,
    KE,
    BU,
    jU,
    zU,
    YE,
    Ii,
    Ti,
    QE,
    $E,
    fb,
    db = ye(() => {
      "use strict";
      (ZE = de(kE())), (JE = de(Kn())), (eb = de(WE()));
      Ue();
      Is();
      vi();
      (tb = de(kt())),
        ({
          MOUSE_CLICK: mU,
          MOUSE_SECOND_CLICK: yU,
          MOUSE_DOWN: EU,
          MOUSE_UP: bU,
          MOUSE_OVER: _U,
          MOUSE_OUT: IU,
          DROPDOWN_CLOSE: TU,
          DROPDOWN_OPEN: wU,
          SLIDER_ACTIVE: xU,
          SLIDER_INACTIVE: OU,
          TAB_ACTIVE: AU,
          TAB_INACTIVE: SU,
          NAVBAR_CLOSE: CU,
          NAVBAR_OPEN: RU,
          MOUSE_MOVE: LU,
          PAGE_SCROLL_DOWN: rb,
          SCROLL_INTO_VIEW: nb,
          SCROLL_OUT_OF_VIEW: NU,
          PAGE_SCROLL_UP: PU,
          SCROLLING_IN_VIEW: MU,
          PAGE_FINISH: ib,
          ECOMMERCE_CART_CLOSE: qU,
          ECOMMERCE_CART_OPEN: DU,
          PAGE_START: ob,
          PAGE_SCROLL: FU,
        } = Je),
        (Es = "COMPONENT_ACTIVE"),
        (ab = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: XE } = Re),
        ({ getNamespacedParameterId: BE } = tb.IX2VanillaUtils),
        (sb = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (rn = sb(({ element: e, nativeEvent: t }) => e === t.target)),
        (GU = sb(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (dt = (0, ZE.default)([rn, GU])),
        (ub = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              i = n[t];
            if (i && !UU[i.eventTypeId]) return i;
          }
          return null;
        }),
        (kU = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!ub(e, n);
        }),
        (He = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            f = ub(e, u);
          return (
            f &&
              mr({
                store: e,
                eventId: u,
                eventTarget: r,
                eventStateKey: u + XE + n.split(XE)[1],
                actionListId: (0, JE.default)(f, "action.config.actionListId"),
              }),
            mr({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            on({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            i
          );
        }),
        (tt = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
        (nn = { handler: tt(dt, He) }),
        (cb = { ...nn, types: [Es, ab].join(" ") }),
        (bs = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (jE = "mouseover mouseout"),
        (_s = { types: bs }),
        (UU = { PAGE_START: ob, PAGE_FINISH: ib }),
        (tn = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, eb.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (VU = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (HU = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: i } = t,
            o = e.contains(n);
          if (r === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(r === "mouseout" && o && s);
        }),
        (WU = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: i } = tn(),
            o = r.scrollOffsetValue,
            u = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return VU(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: n,
            bottom: i - u,
          });
        }),
        (lb = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            i = [Es, ab].indexOf(n) !== -1 ? n === Es : r.isActive,
            o = { ...r, isActive: i };
          return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
        }),
        (zE = (e) => (t, r) => {
          let n = { elementHovered: HU(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        }),
        (XU = (e) => (t, r) => {
          let n = { ...r, elementVisible: WU(t) };
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        }),
        (KE =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = tn(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: f } = s,
              v = f === "PX",
              l = i - o,
              E = Number((n / l).toFixed(2));
            if (r && r.percentTop === E) return r;
            let g = (v ? u : (o * (u || 0)) / 100) / l,
              h,
              _,
              A = 0;
            r &&
              ((h = E > r.percentTop),
              (_ = r.scrollingDown !== h),
              (A = _ ? E : r.anchorTop));
            let w = a === rb ? E >= A + g : E <= A - g,
              N = {
                ...r,
                percentTop: E,
                inBounds: w,
                anchorTop: A,
                scrollingDown: h,
              };
            return (r && w && (_ || N.inBounds !== r.inBounds) && e(t, N)) || N;
          }),
        (BU = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (jU = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return n.finished && !(r && r.finshed) && e(t), n;
        }),
        (zU = (e) => (t, r) => {
          let n = { started: !0 };
          return r || e(t), n;
        }),
        (YE =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          }),
        (Ii = (e = !0) => ({
          ...cb,
          handler: tt(
            e ? dt : rn,
            lb((t, r) => (r.isActive ? nn.handler(t, r) : r))
          ),
        })),
        (Ti = (e = !0) => ({
          ...cb,
          handler: tt(
            e ? dt : rn,
            lb((t, r) => (r.isActive ? r : nn.handler(t, r)))
          ),
        })),
        (QE = {
          ..._s,
          handler: XU((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === nb) === r
              ? (He(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        ($E = 0.05),
        (fb = {
          [xU]: Ii(),
          [OU]: Ti(),
          [wU]: Ii(),
          [TU]: Ti(),
          [RU]: Ii(!1),
          [CU]: Ti(!1),
          [AU]: Ii(),
          [SU]: Ti(),
          [DU]: { types: "ecommerce-cart-open", handler: tt(dt, He) },
          [qU]: { types: "ecommerce-cart-close", handler: tt(dt, He) },
          [mU]: {
            types: "click",
            handler: tt(
              dt,
              YE((e, { clickCount: t }) => {
                kU(e) ? t === 1 && He(e) : He(e);
              })
            ),
          },
          [yU]: {
            types: "click",
            handler: tt(
              dt,
              YE((e, { clickCount: t }) => {
                t === 2 && He(e);
              })
            ),
          },
          [EU]: { ...nn, types: "mousedown" },
          [bU]: { ...nn, types: "mouseup" },
          [_U]: {
            types: jE,
            handler: tt(
              dt,
              zE((e, t) => {
                t.elementHovered && He(e);
              })
            ),
          },
          [IU]: {
            types: jE,
            handler: tt(
              dt,
              zE((e, t) => {
                t.elementHovered || He(e);
              })
            ),
          },
          [LU]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: f,
                  restingState: v = 0,
                } = r,
                {
                  clientX: l = o.clientX,
                  clientY: E = o.clientY,
                  pageX: g = o.pageX,
                  pageY: h = o.pageY,
                } = n,
                _ = a === "X_AXIS",
                A = n.type === "mouseout",
                w = v / 100,
                N = u,
                R = !1;
              switch (s) {
                case ut.VIEWPORT: {
                  w = _
                    ? Math.min(l, window.innerWidth) / window.innerWidth
                    : Math.min(E, window.innerHeight) / window.innerHeight;
                  break;
                }
                case ut.PAGE: {
                  let {
                    scrollLeft: M,
                    scrollTop: F,
                    scrollWidth: D,
                    scrollHeight: j,
                  } = tn();
                  w = _ ? Math.min(M + g, D) / D : Math.min(F + h, j) / j;
                  break;
                }
                case ut.ELEMENT:
                default: {
                  N = BE(i, u);
                  let M = n.type.indexOf("mouse") === 0;
                  if (M && dt({ element: t, nativeEvent: n }) !== !0) break;
                  let F = t.getBoundingClientRect(),
                    { left: D, top: j, width: z, height: Q } = F;
                  if (!M && !BU({ left: l, top: E }, F)) break;
                  (R = !0), (w = _ ? (l - D) / z : (E - j) / Q);
                  break;
                }
              }
              return (
                A && (w > 1 - $E || w < $E) && (w = Math.round(w)),
                (s !== ut.ELEMENT || R || R !== o.elementHovered) &&
                  ((w = f ? 1 - w : w), e.dispatch(vr(N, w))),
                {
                  elementHovered: R,
                  clientX: l,
                  clientY: E,
                  pageX: g,
                  pageY: h,
                }
              );
            },
          },
          [FU]: {
            types: bs,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = tn(),
                a = i / (o - s);
              (a = n ? 1 - a : a), e.dispatch(vr(r, a));
            },
          },
          [MU]: {
            types: bs,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: f,
                } = tn(),
                {
                  basedOn: v,
                  selectedAxis: l,
                  continuousParameterGroupId: E,
                  startsEntering: g,
                  startsExiting: h,
                  addEndOffset: _,
                  addStartOffset: A,
                  addOffsetValue: w = 0,
                  endOffsetValue: N = 0,
                } = r,
                R = l === "X_AXIS";
              if (v === ut.VIEWPORT) {
                let M = R ? o / a : s / u;
                return (
                  M !== i.scrollPercent && t.dispatch(vr(E, M)),
                  { scrollPercent: M }
                );
              } else {
                let M = BE(n, E),
                  F = e.getBoundingClientRect(),
                  D = (A ? w : 0) / 100,
                  j = (_ ? N : 0) / 100;
                (D = g ? D : 1 - D), (j = h ? j : 1 - j);
                let z = F.top + Math.min(F.height * D, f),
                  re = F.top + F.height * j - z,
                  X = Math.min(f + re, u),
                  y = Math.min(Math.max(0, f - z), X) / X;
                return (
                  y !== i.scrollPercent && t.dispatch(vr(M, y)),
                  { scrollPercent: y }
                );
              }
            },
          },
          [nb]: QE,
          [NU]: QE,
          [rb]: {
            ..._s,
            handler: KE((e, t) => {
              t.scrollingDown && He(e);
            }),
          },
          [PU]: {
            ..._s,
            handler: KE((e, t) => {
              t.scrollingDown || He(e);
            }),
          },
          [ib]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: tt(rn, jU(He)),
          },
          [ob]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: tt(rn, zU(He)),
          },
        });
    });
  var Cb = {};
  ke(Cb, {
    observeRequests: () => pV,
    startActionGroup: () => on,
    startEngine: () => Ci,
    stopActionGroup: () => mr,
    stopAllActionGroups: () => Ob,
    stopEngine: () => Ri,
  });
  function pV(e) {
    Ut({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: hV }),
      Ut({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: mV }),
      Ut({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: yV }),
      Ut({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: EV });
  }
  function gV(e) {
    Ut({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Ri(e),
          Ib({ store: e, elementApi: De }),
          Ci({ store: e, allowEvents: !0 }),
          Tb();
      },
    });
  }
  function vV(e, t) {
    let r = Ut({
      store: e,
      select: ({ ixSession: n }) => n.tick,
      onChange: (n) => {
        t(n), r();
      },
    });
  }
  function hV({ rawData: e, defer: t }, r) {
    let n = () => {
      Ci({ store: r, rawData: e, allowEvents: !0 }), Tb();
    };
    t ? setTimeout(n, 0) : n();
  }
  function Tb() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function mV(e, t) {
    let {
        actionTypeId: r,
        actionListId: n,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: f = !0,
      } = e,
      { rawData: v } = e;
    if (n && i && v && a) {
      let l = v.actionLists[n];
      l && (v = rV({ actionList: l, actionItemId: i, rawData: v }));
    }
    if (
      (Ci({ store: t, rawData: v, allowEvents: s, testManual: u }),
      (n && r === Xe.GENERAL_START_ACTION) || Ts(r))
    ) {
      mr({ store: t, actionListId: n }),
        xb({ store: t, actionListId: n, eventId: o });
      let l = on({
        store: t,
        eventId: o,
        actionListId: n,
        immediate: a,
        verbose: f,
      });
      f && l && t.dispatch(hr({ actionListId: n, isPlaying: !a }));
    }
  }
  function yV({ actionListId: e }, t) {
    e ? mr({ store: t, actionListId: e }) : Ob({ store: t }), Ri(t);
  }
  function EV(e, t) {
    Ri(t), Ib({ store: t, elementApi: De });
  }
  function Ci({ store: e, rawData: t, allowEvents: r, testManual: n }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(es(t)),
      i.active ||
        (e.dispatch(
          ts({
            hasBoundaryNodes: !!document.querySelector(xi),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        r &&
          (xV(e), bV(), e.getState().ixSession.hasDefinedMediaQueries && gV(e)),
        e.dispatch(rs()),
        _V(e, n));
  }
  function bV() {
    let { documentElement: e } = document;
    e.className.indexOf(pb) === -1 && (e.className += ` ${pb}`);
  }
  function _V(e, t) {
    let r = (n) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(pi(n, o)), t ? vV(e, r) : requestAnimationFrame(r));
    };
    r(window.performance.now());
  }
  function Ri(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: r } = t;
      r.forEach(IV), aV(), e.dispatch(ns());
    }
  }
  function IV({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function TV({
    store: e,
    eventStateKey: t,
    eventTarget: r,
    eventId: n,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: f, ixSession: v } = e.getState(),
      { events: l } = f,
      E = l[n],
      { eventTypeId: g } = E,
      h = {},
      _ = {},
      A = [],
      { continuousActionGroups: w } = s,
      { id: N } = s;
    nV(g, i) && (N = iV(t, N));
    let R = v.hasBoundaryNodes && r ? en(r, xi) : null;
    w.forEach((M) => {
      let { keyframe: F, actionItems: D } = M;
      D.forEach((j) => {
        let { actionTypeId: z } = j,
          { target: Q } = j.config;
        if (!Q) return;
        let re = Q.boundaryMode ? R : null,
          X = sV(Q) + ws + z;
        if (((_[X] = wV(_[X], F, j)), !h[X])) {
          h[X] = !0;
          let { config: S } = j;
          Oi({
            config: S,
            event: E,
            eventTarget: r,
            elementRoot: re,
            elementApi: De,
          }).forEach((y) => {
            A.push({ element: y, key: X });
          });
        }
      });
    }),
      A.forEach(({ element: M, key: F }) => {
        let D = _[F],
          j = (0, yt.default)(D, "[0].actionItems[0]", {}),
          { actionTypeId: z } = j,
          Q = Si(z) ? Os(z)(M, j) : null,
          re = xs({ element: M, actionItem: j, elementApi: De }, Q);
        As({
          store: e,
          element: M,
          eventId: n,
          actionListId: o,
          actionItem: j,
          destination: re,
          continuous: !0,
          parameterId: N,
          actionGroups: D,
          smoothing: a,
          restingValue: u,
          pluginInstance: Q,
        });
      });
  }
  function wV(e = [], t, r) {
    let n = [...e],
      i;
    return (
      n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
      n[i].actionItems.push(r),
      n
    );
  }
  function xV(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: r } = t;
    wb(e),
      (0, yr.default)(r, (i, o) => {
        let s = fb[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        LV({ logic: s, store: e, events: i });
      });
    let { ixSession: n } = e.getState();
    n.eventListeners.length && AV(e);
  }
  function AV(e) {
    let t = () => {
      wb(e);
    };
    OV.forEach((r) => {
      window.addEventListener(r, t), e.dispatch(di(window, [r, t]));
    }),
      t();
  }
  function wb(e) {
    let { ixSession: t, ixData: r } = e.getState(),
      n = window.innerWidth;
    if (n !== t.viewportWidth) {
      let { mediaQueries: i } = r;
      e.dispatch(us({ width: n, mediaQueries: i }));
    }
  }
  function LV({ logic: e, store: t, events: r }) {
    NV(r);
    let { types: n, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = SV(r, RV);
    if (!(0, hb.default)(a)) return;
    (0, yr.default)(a, (l, E) => {
      let g = r[E],
        { action: h, id: _, mediaQueries: A = o.mediaQueryKeys } = g,
        { actionListId: w } = h.config;
      uV(A, o.mediaQueryKeys) || t.dispatch(cs()),
        h.actionTypeId === Xe.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(g.config) ? g.config : [g.config]).forEach((R) => {
            let { continuousParameterGroupId: M } = R,
              F = (0, yt.default)(s, `${w}.continuousParameterGroups`, []),
              D = (0, vb.default)(F, ({ id: Q }) => Q === M),
              j = (R.smoothing || 0) / 100,
              z = (R.restingState || 0) / 100;
            D &&
              l.forEach((Q, re) => {
                let X = _ + ws + re;
                TV({
                  store: t,
                  eventStateKey: X,
                  eventTarget: Q,
                  eventId: _,
                  eventConfig: R,
                  actionListId: w,
                  parameterGroup: D,
                  smoothing: j,
                  restingValue: z,
                });
              });
          }),
        (h.actionTypeId === Xe.GENERAL_START_ACTION || Ts(h.actionTypeId)) &&
          xb({ store: t, actionListId: w, eventId: _ });
    });
    let u = (l) => {
        let { ixSession: E } = t.getState();
        CV(a, (g, h, _) => {
          let A = r[h],
            w = E.eventState[_],
            { action: N, mediaQueries: R = o.mediaQueryKeys } = A;
          if (!Ai(R, E.mediaQueryKey)) return;
          let M = (F = {}) => {
            let D = i(
              {
                store: t,
                element: g,
                event: A,
                eventConfig: F,
                nativeEvent: l,
                eventStateKey: _,
              },
              w
            );
            cV(D, w) || t.dispatch(is(_, D));
          };
          N.actionTypeId === Xe.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(A.config) ? A.config : [A.config]).forEach(M)
            : M();
        });
      },
      f = (0, bb.default)(u, dV),
      v = ({ target: l = document, types: E, throttle: g }) => {
        E.split(" ")
          .filter(Boolean)
          .forEach((h) => {
            let _ = g ? f : u;
            l.addEventListener(h, _), t.dispatch(di(l, [h, _]));
          });
      };
    Array.isArray(n) ? n.forEach(v) : typeof n == "string" && v(e);
  }
  function NV(e) {
    if (!fV) return;
    let t = {},
      r = "";
    for (let n in e) {
      let { eventTypeId: i, target: o } = e[n],
        s = fs(o);
      t[s] ||
        ((i === Je.MOUSE_CLICK || i === Je.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (r += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (r) {
      let n = document.createElement("style");
      (n.textContent = r), document.body.appendChild(n);
    }
  }
  function xb({ store: e, actionListId: t, eventId: r }) {
    let { ixData: n, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = n,
      a = s[r],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let f = (0, yt.default)(u, "actionItemGroups[0].actionItems", []),
        v = (0, yt.default)(a, "mediaQueries", n.mediaQueryKeys);
      if (!Ai(v, i.mediaQueryKey)) return;
      f.forEach((l) => {
        let { config: E, actionTypeId: g } = l,
          h =
            E?.target?.useEventTarget === !0 && E?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : E,
          _ = Oi({ config: h, event: a, elementApi: De }),
          A = Si(g);
        _.forEach((w) => {
          let N = A ? Os(g)(w, l) : null;
          As({
            destination: xs({ element: w, actionItem: l, elementApi: De }, N),
            immediate: !0,
            store: e,
            element: w,
            eventId: r,
            actionItem: l,
            actionListId: t,
            pluginInstance: N,
          });
        });
      });
    }
  }
  function Ob({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, yr.default)(t, (r) => {
      if (!r.continuous) {
        let { actionListId: n, verbose: i } = r;
        Ss(r, e), i && e.dispatch(hr({ actionListId: n, isPlaying: !1 }));
      }
    });
  }
  function mr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && r ? en(r, xi) : null;
    (0, yr.default)(o, (u) => {
      let f = (0, yt.default)(u, "actionItem.config.target.boundaryMode"),
        v = n ? u.eventStateKey === n : !0;
      if (u.actionListId === i && u.eventId === t && v) {
        if (a && f && !ds(a, u.element)) return;
        Ss(u, e),
          u.verbose && e.dispatch(hr({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function on({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: f } = e.getState(),
      { events: v } = u,
      l = v[t] || {},
      { mediaQueries: E = u.mediaQueryKeys } = l,
      g = (0, yt.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: h, useFirstGroupAsInitialState: _ } = g;
    if (!h || !h.length) return !1;
    o >= h.length && (0, yt.default)(l, "config.loop") && (o = 0),
      o === 0 && _ && o++;
    let w =
        (o === 0 || (o === 1 && _)) && Ts(l.action?.actionTypeId)
          ? l.config.delay
          : void 0,
      N = (0, yt.default)(h, [o, "actionItems"], []);
    if (!N.length || !Ai(E, f.mediaQueryKey)) return !1;
    let R = f.hasBoundaryNodes && r ? en(r, xi) : null,
      M = JU(N),
      F = !1;
    return (
      N.forEach((D, j) => {
        let { config: z, actionTypeId: Q } = D,
          re = Si(Q),
          { target: X } = z;
        if (!X) return;
        let S = X.boundaryMode ? R : null;
        Oi({
          config: z,
          event: l,
          eventTarget: r,
          elementRoot: S,
          elementApi: De,
        }).forEach((L, G) => {
          let U = re ? Os(Q)(L, D) : null,
            ee = re ? lV(Q)(L, D) : null;
          F = !0;
          let ie = M === j && G === 0,
            k = eV({ element: L, actionItem: D }),
            H = xs({ element: L, actionItem: D, elementApi: De }, U);
          As({
            store: e,
            element: L,
            actionItem: D,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i,
            groupIndex: o,
            isCarrier: ie,
            computedStyle: k,
            destination: H,
            immediate: s,
            verbose: a,
            pluginInstance: U,
            pluginDuration: ee,
            instanceDelay: w,
          });
        });
      }),
      F
    );
  }
  function As(e) {
    let { store: t, computedStyle: r, ...n } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: f,
        eventId: v,
      } = n,
      l = !u,
      E = $U(),
      { ixElements: g, ixSession: h, ixData: _ } = t.getState(),
      A = QU(g, i),
      { refState: w } = g[A] || {},
      N = ps(i),
      R = h.reducedMotion && Yo[o.actionTypeId],
      M;
    if (R && u)
      switch (_.events[v]?.eventTypeId) {
        case Je.MOUSE_MOVE:
        case Je.MOUSE_MOVE_IN_VIEWPORT:
          M = f;
          break;
        default:
          M = 0.5;
          break;
      }
    let F = tV(i, w, r, o, De, a);
    if (
      (t.dispatch(
        os({
          instanceId: E,
          elementId: A,
          origin: F,
          refType: N,
          skipMotion: R,
          skipToValue: M,
          ...n,
        })
      ),
      Ab(document.body, "ix2-animation-started", E),
      s)
    ) {
      PV(t, E);
      return;
    }
    Ut({ store: t, select: ({ ixInstances: D }) => D[E], onChange: Sb }),
      l && t.dispatch(gi(E, h.tick));
  }
  function Ss(e, t) {
    Ab(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: r, actionItem: n } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[r] || {};
    s === _b && oV(o, n, De), t.dispatch(as(e.id));
  }
  function Ab(e, t, r) {
    let n = document.createEvent("CustomEvent");
    n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
  }
  function PV(e, t) {
    let { ixParameters: r } = e.getState();
    e.dispatch(gi(t, 0)), e.dispatch(pi(performance.now(), r));
    let { ixInstances: n } = e.getState();
    Sb(n[t], e);
  }
  function Sb(e, t) {
    let {
        active: r,
        continuous: n,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: f,
        groupIndex: v,
        eventId: l,
        eventTarget: E,
        eventStateKey: g,
        actionListId: h,
        isCarrier: _,
        styleProp: A,
        verbose: w,
        pluginInstance: N,
      } = e,
      { ixData: R, ixSession: M } = t.getState(),
      { events: F } = R,
      D = F[l] || {},
      { mediaQueries: j = R.mediaQueryKeys } = D;
    if (Ai(j, M.mediaQueryKey) && (n || r || i)) {
      if (f || (u === YU && i)) {
        t.dispatch(ss(o, a, f, s));
        let { ixElements: z } = t.getState(),
          { ref: Q, refType: re, refState: X } = z[o] || {},
          S = X && X[a];
        (re === _b || Si(a)) && ZU(Q, X, S, l, s, A, De, u, N);
      }
      if (i) {
        if (_) {
          let z = on({
            store: t,
            eventId: l,
            eventTarget: E,
            eventStateKey: g,
            actionListId: h,
            groupIndex: v + 1,
            verbose: w,
          });
          w && !z && t.dispatch(hr({ actionListId: h, isPlaying: !1 }));
        }
        Ss(e, t);
      }
    }
  }
  var vb,
    yt,
    hb,
    mb,
    yb,
    Eb,
    yr,
    bb,
    wi,
    KU,
    Ts,
    ws,
    xi,
    _b,
    YU,
    pb,
    Oi,
    QU,
    xs,
    Ut,
    $U,
    ZU,
    Ib,
    JU,
    eV,
    tV,
    rV,
    nV,
    iV,
    Ai,
    oV,
    aV,
    sV,
    uV,
    cV,
    Si,
    Os,
    lV,
    gb,
    fV,
    dV,
    OV,
    SV,
    CV,
    RV,
    Is = ye(() => {
      "use strict";
      (vb = de(wa())),
        (yt = de(Kn())),
        (hb = de(Hm())),
        (mb = de(gy())),
        (yb = de(hy())),
        (Eb = de(yy())),
        (yr = de(wy())),
        (bb = de(Ly()));
      Ue();
      wi = de(kt());
      vi();
      Fy();
      db();
      (KU = Object.keys(zo)),
        (Ts = (e) => KU.includes(e)),
        ({
          COLON_DELIMITER: ws,
          BOUNDARY_SELECTOR: xi,
          HTML_ELEMENT: _b,
          RENDER_GENERAL: YU,
          W_MOD_IX: pb,
        } = Re),
        ({
          getAffectedElements: Oi,
          getElementId: QU,
          getDestinationValues: xs,
          observeStore: Ut,
          getInstanceId: $U,
          renderHTMLElement: ZU,
          clearAllStyles: Ib,
          getMaxDurationItemIndex: JU,
          getComputedStyle: eV,
          getInstanceOrigin: tV,
          reduceListToGroup: rV,
          shouldNamespaceEventParameter: nV,
          getNamespacedParameterId: iV,
          shouldAllowMediaQuery: Ai,
          cleanupHTMLElement: oV,
          clearObjectCache: aV,
          stringifyTarget: sV,
          mediaQueriesEqual: uV,
          shallowEqual: cV,
        } = wi.IX2VanillaUtils),
        ({
          isPluginType: Si,
          createPluginInstance: Os,
          getPluginDuration: lV,
        } = wi.IX2VanillaPlugins),
        (gb = navigator.userAgent),
        (fV = gb.match(/iPad/i) || gb.match(/iPhone/)),
        (dV = 12);
      OV = ["resize", "orientationchange"];
      (SV = (e, t) => (0, mb.default)((0, Eb.default)(e, t), yb.default)),
        (CV = (e, t) => {
          (0, yr.default)(e, (r, n) => {
            r.forEach((i, o) => {
              let s = n + ws + o;
              t(i, n, s);
            });
          });
        }),
        (RV = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Oi({ config: t, elementApi: De });
        });
    });
  var Lb = c((Et) => {
    "use strict";
    var MV = vn().default,
      qV = du().default;
    Object.defineProperty(Et, "__esModule", { value: !0 });
    Et.actions = void 0;
    Et.destroy = Rb;
    Et.init = UV;
    Et.setEnv = kV;
    Et.store = void 0;
    $l();
    var DV = Bo(),
      FV = qV((Tm(), it(Im))),
      Cs = (Is(), it(Cb)),
      GV = MV((vi(), it(Py)));
    Et.actions = GV;
    var Rs = (Et.store = (0, DV.createStore)(FV.default));
    function kV(e) {
      e() && (0, Cs.observeRequests)(Rs);
    }
    function UV(e) {
      Rb(), (0, Cs.startEngine)({ store: Rs, rawData: e, allowEvents: !0 });
    }
    function Rb() {
      (0, Cs.stopEngine)(Rs);
    }
  });
  var qb = c((gz, Mb) => {
    "use strict";
    var Nb = Pe(),
      Pb = Lb();
    Pb.setEnv(Nb.env);
    Nb.define(
      "ix2",
      (Mb.exports = function () {
        return Pb;
      })
    );
  });
  var Fb = c((vz, Db) => {
    "use strict";
    var Er = Pe();
    Er.define(
      "links",
      (Db.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = Er.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          f = /index\.(html|php)$/,
          v = /\/$/,
          l,
          E;
        r.ready = r.design = r.preview = g;
        function g() {
          (i = o && Er.env("design")),
            (E = Er.env("slug") || s.pathname || ""),
            Er.scroll.off(_),
            (l = []);
          for (var w = document.links, N = 0; N < w.length; ++N) h(w[N]);
          l.length && (Er.scroll.on(_), _());
        }
        function h(w) {
          var N =
            (i && w.getAttribute("href-disabled")) || w.getAttribute("href");
          if (((a.href = N), !(N.indexOf(":") >= 0))) {
            var R = e(w);
            if (
              a.hash.length > 1 &&
              a.host + a.pathname === s.host + s.pathname
            ) {
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
              var M = e(a.hash);
              M.length && l.push({ link: R, sec: M, active: !1 });
              return;
            }
            if (!(N === "#" || N === "")) {
              var F = a.href === s.href || N === E || (f.test(N) && v.test(E));
              A(R, u, F);
            }
          }
        }
        function _() {
          var w = n.scrollTop(),
            N = n.height();
          t.each(l, function (R) {
            var M = R.link,
              F = R.sec,
              D = F.offset().top,
              j = F.outerHeight(),
              z = N * 0.5,
              Q = F.is(":visible") && D + j - z >= w && D + z <= w + N;
            R.active !== Q && ((R.active = Q), A(M, u, Q));
          });
        }
        function A(w, N, R) {
          var M = w.hasClass(N);
          (R && M) || (!R && !M) || (R ? w.addClass(N) : w.removeClass(N));
        }
        return r;
      })
    );
  });
  var kb = c((hz, Gb) => {
    "use strict";
    var Li = Pe();
    Li.define(
      "scroll",
      (Gb.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = h() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (S) {
              window.setTimeout(S, 15);
            },
          u = Li.env("editor") ? ".w-editor-body" : "body",
          f =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          v = 'a[href="#"]',
          l = 'a[href*="#"]:not(.w-tab-link):not(' + v + ")",
          E = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          g = document.createElement("style");
        g.appendChild(document.createTextNode(E));
        function h() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var _ = /^#[a-zA-Z0-9][\w:.-]*$/;
        function A(S) {
          return _.test(S.hash) && S.host + S.pathname === r.host + r.pathname;
        }
        let w =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function N() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            w.matches
          );
        }
        function R(S, y) {
          var L;
          switch (y) {
            case "add":
              (L = S.attr("tabindex")),
                L
                  ? S.attr("data-wf-tabindex-swap", L)
                  : S.attr("tabindex", "-1");
              break;
            case "remove":
              (L = S.attr("data-wf-tabindex-swap")),
                L
                  ? (S.attr("tabindex", L),
                    S.removeAttr("data-wf-tabindex-swap"))
                  : S.removeAttr("tabindex");
              break;
          }
          S.toggleClass("wf-force-outline-none", y === "add");
        }
        function M(S) {
          var y = S.currentTarget;
          if (
            !(
              Li.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(y.className))
            )
          ) {
            var L = A(y) ? y.hash : "";
            if (L !== "") {
              var G = e(L);
              G.length &&
                (S && (S.preventDefault(), S.stopPropagation()),
                F(L, S),
                window.setTimeout(
                  function () {
                    D(G, function () {
                      R(G, "add"),
                        G.get(0).focus({ preventScroll: !0 }),
                        R(G, "remove");
                    });
                  },
                  S ? 0 : 300
                ));
            }
          }
        }
        function F(S) {
          if (
            r.hash !== S &&
            n &&
            n.pushState &&
            !(Li.env.chrome && r.protocol === "file:")
          ) {
            var y = n.state && n.state.hash;
            y !== S && n.pushState({ hash: S }, "", S);
          }
        }
        function D(S, y) {
          var L = i.scrollTop(),
            G = j(S);
          if (L !== G) {
            var U = z(S, L, G),
              ee = Date.now(),
              ie = function () {
                var k = Date.now() - ee;
                window.scroll(0, Q(L, G, k, U)),
                  k <= U ? a(ie) : typeof y == "function" && y();
              };
            a(ie);
          }
        }
        function j(S) {
          var y = e(f),
            L = y.css("position") === "fixed" ? y.outerHeight() : 0,
            G = S.offset().top - L;
          if (S.data("scroll") === "mid") {
            var U = i.height() - L,
              ee = S.outerHeight();
            ee < U && (G -= Math.round((U - ee) / 2));
          }
          return G;
        }
        function z(S, y, L) {
          if (N()) return 0;
          var G = 1;
          return (
            s.add(S).each(function (U, ee) {
              var ie = parseFloat(ee.getAttribute("data-scroll-time"));
              !isNaN(ie) && ie >= 0 && (G = ie);
            }),
            (472.143 * Math.log(Math.abs(y - L) + 125) - 2e3) * G
          );
        }
        function Q(S, y, L, G) {
          return L > G ? y : S + (y - S) * re(L / G);
        }
        function re(S) {
          return S < 0.5
            ? 4 * S * S * S
            : (S - 1) * (2 * S - 2) * (2 * S - 2) + 1;
        }
        function X() {
          var { WF_CLICK_EMPTY: S, WF_CLICK_SCROLL: y } = t;
          o.on(y, l, M),
            o.on(S, v, function (L) {
              L.preventDefault();
            }),
            document.head.insertBefore(g, document.head.firstChild);
        }
        return { ready: X };
      })
    );
  });
  var Vb = c((mz, Ub) => {
    "use strict";
    var VV = Pe();
    VV.define(
      "touch",
      (Ub.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new n(o) : null
            );
          });
        function n(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            f,
            v;
          o.addEventListener("touchstart", l, !1),
            o.addEventListener("touchmove", E, !1),
            o.addEventListener("touchend", g, !1),
            o.addEventListener("touchcancel", h, !1),
            o.addEventListener("mousedown", l, !1),
            o.addEventListener("mousemove", E, !1),
            o.addEventListener("mouseup", g, !1),
            o.addEventListener("mouseout", h, !1);
          function l(A) {
            var w = A.touches;
            (w && w.length > 1) ||
              ((s = !0),
              w ? ((a = !0), (f = w[0].clientX)) : (f = A.clientX),
              (v = f));
          }
          function E(A) {
            if (s) {
              if (a && A.type === "mousemove") {
                A.preventDefault(), A.stopPropagation();
                return;
              }
              var w = A.touches,
                N = w ? w[0].clientX : A.clientX,
                R = N - v;
              (v = N),
                Math.abs(R) > u &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", A, { direction: R > 0 ? "right" : "left" }), h());
            }
          }
          function g(A) {
            if (s && ((s = !1), a && A.type === "mouseup")) {
              A.preventDefault(), A.stopPropagation(), (a = !1);
              return;
            }
          }
          function h() {
            s = !1;
          }
          function _() {
            o.removeEventListener("touchstart", l, !1),
              o.removeEventListener("touchmove", E, !1),
              o.removeEventListener("touchend", g, !1),
              o.removeEventListener("touchcancel", h, !1),
              o.removeEventListener("mousedown", l, !1),
              o.removeEventListener("mousemove", E, !1),
              o.removeEventListener("mouseup", g, !1),
              o.removeEventListener("mouseout", h, !1),
              (o = null);
          }
          this.destroy = _;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var Xb = c((yz, Wb) => {
    "use strict";
    var Vt = Pe(),
      HV = _r(),
      rt = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      Hb = !0,
      WV = /^#[a-zA-Z0-9\-_]+$/;
    Vt.define(
      "dropdown",
      (Wb.exports = function (e, t) {
        var r = t.debounce,
          n = {},
          i = Vt.env(),
          o = !1,
          s,
          a = Vt.env.touch,
          u = ".w-dropdown",
          f = "w--open",
          v = HV.triggers,
          l = 900,
          E = "focusout" + u,
          g = "keydown" + u,
          h = "mouseenter" + u,
          _ = "mousemove" + u,
          A = "mouseleave" + u,
          w = (a ? "click" : "mouseup") + u,
          N = "w-close" + u,
          R = "setting" + u,
          M = e(document),
          F;
        (n.ready = D),
          (n.design = function () {
            o && y(), (o = !1), D();
          }),
          (n.preview = function () {
            (o = !0), D();
          });
        function D() {
          (s = i && Vt.env("design")), (F = M.find(u)), F.each(j);
        }
        function j(p, V) {
          var W = e(V),
            C = e.data(V, u);
          C ||
            (C = e.data(V, u, {
              open: !1,
              el: W,
              config: {},
              selectedIdx: -1,
            })),
            (C.toggle = C.el.children(".w-dropdown-toggle")),
            (C.list = C.el.children(".w-dropdown-list")),
            (C.links = C.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (C.complete = U(C)),
            (C.mouseLeave = ie(C)),
            (C.mouseUpOutside = G(C)),
            (C.mouseMoveOutside = k(C)),
            z(C);
          var Z = C.toggle.attr("id"),
            fe = C.list.attr("id");
          Z || (Z = "w-dropdown-toggle-" + p),
            fe || (fe = "w-dropdown-list-" + p),
            C.toggle.attr("id", Z),
            C.toggle.attr("aria-controls", fe),
            C.toggle.attr("aria-haspopup", "menu"),
            C.toggle.attr("aria-expanded", "false"),
            C.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            C.toggle.prop("tagName") !== "BUTTON" &&
              (C.toggle.attr("role", "button"),
              C.toggle.attr("tabindex") || C.toggle.attr("tabindex", "0")),
            C.list.attr("id", fe),
            C.list.attr("aria-labelledby", Z),
            C.links.each(function (b, B) {
              B.hasAttribute("tabindex") || B.setAttribute("tabindex", "0"),
                WV.test(B.hash) && B.addEventListener("click", S.bind(null, C));
            }),
            C.el.off(u),
            C.toggle.off(u),
            C.nav && C.nav.off(u);
          var ae = re(C, Hb);
          s && C.el.on(R, Q(C)),
            s ||
              (i && ((C.hovering = !1), S(C)),
              C.config.hover && C.toggle.on(h, ee(C)),
              C.el.on(N, ae),
              C.el.on(g, H(C)),
              C.el.on(E, I(C)),
              C.toggle.on(w, ae),
              C.toggle.on(g, m(C)),
              (C.nav = C.el.closest(".w-nav")),
              C.nav.on(N, ae));
        }
        function z(p) {
          var V = Number(p.el.css("z-index"));
          (p.manageZ = V === l || V === l + 1),
            (p.config = {
              hover: p.el.attr("data-hover") === "true" && !a,
              delay: p.el.attr("data-delay"),
            });
        }
        function Q(p) {
          return function (V, W) {
            (W = W || {}),
              z(p),
              W.open === !0 && X(p, !0),
              W.open === !1 && S(p, { immediate: !0 });
          };
        }
        function re(p, V) {
          return r(function (W) {
            if (p.open || (W && W.type === "w-close"))
              return S(p, { forceClose: V });
            X(p);
          });
        }
        function X(p) {
          if (!p.open) {
            L(p),
              (p.open = !0),
              p.list.addClass(f),
              p.toggle.addClass(f),
              p.toggle.attr("aria-expanded", "true"),
              v.intro(0, p.el[0]),
              Vt.redraw.up(),
              p.manageZ && p.el.css("z-index", l + 1);
            var V = Vt.env("editor");
            s || M.on(w, p.mouseUpOutside),
              p.hovering && !V && p.el.on(A, p.mouseLeave),
              p.hovering && V && M.on(_, p.mouseMoveOutside),
              window.clearTimeout(p.delayId);
          }
        }
        function S(p, { immediate: V, forceClose: W } = {}) {
          if (p.open && !(p.config.hover && p.hovering && !W)) {
            p.toggle.attr("aria-expanded", "false"), (p.open = !1);
            var C = p.config;
            if (
              (v.outro(0, p.el[0]),
              M.off(w, p.mouseUpOutside),
              M.off(_, p.mouseMoveOutside),
              p.el.off(A, p.mouseLeave),
              window.clearTimeout(p.delayId),
              !C.delay || V)
            )
              return p.complete();
            p.delayId = window.setTimeout(p.complete, C.delay);
          }
        }
        function y() {
          M.find(u).each(function (p, V) {
            e(V).triggerHandler(N);
          });
        }
        function L(p) {
          var V = p.el[0];
          F.each(function (W, C) {
            var Z = e(C);
            Z.is(V) || Z.has(V).length || Z.triggerHandler(N);
          });
        }
        function G(p) {
          return (
            p.mouseUpOutside && M.off(w, p.mouseUpOutside),
            r(function (V) {
              if (p.open) {
                var W = e(V.target);
                if (!W.closest(".w-dropdown-toggle").length) {
                  var C = e.inArray(p.el[0], W.parents(u)) === -1,
                    Z = Vt.env("editor");
                  if (C) {
                    if (Z) {
                      var fe =
                          W.parents().length === 1 &&
                          W.parents("svg").length === 1,
                        ae = W.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (fe || ae) return;
                    }
                    S(p);
                  }
                }
              }
            })
          );
        }
        function U(p) {
          return function () {
            p.list.removeClass(f),
              p.toggle.removeClass(f),
              p.manageZ && p.el.css("z-index", "");
          };
        }
        function ee(p) {
          return function () {
            (p.hovering = !0), X(p);
          };
        }
        function ie(p) {
          return function () {
            (p.hovering = !1), p.links.is(":focus") || S(p);
          };
        }
        function k(p) {
          return r(function (V) {
            if (p.open) {
              var W = e(V.target),
                C = e.inArray(p.el[0], W.parents(u)) === -1;
              if (C) {
                var Z = W.parents(".w-editor-bem-EditorHoverControls").length,
                  fe = W.parents(".w-editor-bem-RTToolbar").length,
                  ae = e(".w-editor-bem-EditorOverlay"),
                  b =
                    ae.find(".w-editor-edit-outline").length ||
                    ae.find(".w-editor-bem-RTToolbar").length;
                if (Z || fe || b) return;
                (p.hovering = !1), S(p);
              }
            }
          });
        }
        function H(p) {
          return function (V) {
            if (!(s || !p.open))
              switch (
                ((p.selectedIdx = p.links.index(document.activeElement)),
                V.keyCode)
              ) {
                case rt.HOME:
                  return p.open
                    ? ((p.selectedIdx = 0), J(p), V.preventDefault())
                    : void 0;
                case rt.END:
                  return p.open
                    ? ((p.selectedIdx = p.links.length - 1),
                      J(p),
                      V.preventDefault())
                    : void 0;
                case rt.ESCAPE:
                  return S(p), p.toggle.focus(), V.stopPropagation();
                case rt.ARROW_RIGHT:
                case rt.ARROW_DOWN:
                  return (
                    (p.selectedIdx = Math.min(
                      p.links.length - 1,
                      p.selectedIdx + 1
                    )),
                    J(p),
                    V.preventDefault()
                  );
                case rt.ARROW_LEFT:
                case rt.ARROW_UP:
                  return (
                    (p.selectedIdx = Math.max(-1, p.selectedIdx - 1)),
                    J(p),
                    V.preventDefault()
                  );
              }
          };
        }
        function J(p) {
          p.links[p.selectedIdx] && p.links[p.selectedIdx].focus();
        }
        function m(p) {
          var V = re(p, Hb);
          return function (W) {
            if (!s) {
              if (!p.open)
                switch (W.keyCode) {
                  case rt.ARROW_UP:
                  case rt.ARROW_DOWN:
                    return W.stopPropagation();
                }
              switch (W.keyCode) {
                case rt.SPACE:
                case rt.ENTER:
                  return V(), W.stopPropagation(), W.preventDefault();
              }
            }
          };
        }
        function I(p) {
          return r(function (V) {
            var { relatedTarget: W, target: C } = V,
              Z = p.el[0],
              fe = Z.contains(W) || Z.contains(C);
            return fe || S(p), V.stopPropagation();
          });
        }
        return n;
      })
    );
  });
  var Bb = c((Ls) => {
    "use strict";
    Object.defineProperty(Ls, "__esModule", { value: !0 });
    Ls.default = XV;
    function XV(e, t, r, n, i, o, s, a, u, f, v, l, E) {
      return function (g) {
        e(g);
        var h = g.form,
          _ = {
            name: h.attr("data-name") || h.attr("name") || "Untitled Form",
            pageId: h.attr("data-wf-page-id") || "",
            elementId: h.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              h.html()
            ),
            trackingCookies: n(),
          };
        let A = h.attr("data-wf-flow");
        A && (_.wfFlow = A), i(g);
        var w = o(h, _.fields);
        if (w) return s(w);
        if (((_.fileUploads = a(h)), u(g), !f)) {
          v(g);
          return;
        }
        l.ajax({
          url: E,
          type: "POST",
          data: _,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (N) {
            N && N.code === 200 && (g.success = !0), v(g);
          })
          .fail(function () {
            v(g);
          });
      };
    }
  });
  var zb = c((bz, jb) => {
    "use strict";
    var Ni = Pe();
    Ni.define(
      "forms",
      (jb.exports = function (e, t) {
        var r = {},
          n = e(document),
          i,
          o = window.location,
          s = window.XDomainRequest && !window.atob,
          a = ".w-form",
          u,
          f = /e(-)?mail/i,
          v = /^\S+@\S+$/,
          l = window.alert,
          E = Ni.env(),
          g,
          h,
          _,
          A = /list-manage[1-9]?.com/i,
          w = t.debounce(function () {
            l(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              N(), !E && !g && M();
            };
        function N() {
          (u = e("html").attr("data-wf-site")),
            (h = "https://webflow.com/api/v1/form/" + u),
            s &&
              h.indexOf("https://webflow.com") >= 0 &&
              (h = h.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (_ = `${h}/signFile`),
            (i = e(a + " form")),
            i.length && i.each(R);
        }
        function R(k, H) {
          var J = e(H),
            m = e.data(H, a);
          m || (m = e.data(H, a, { form: J })), F(m);
          var I = J.closest("div.w-form");
          (m.done = I.find("> .w-form-done")),
            (m.fail = I.find("> .w-form-fail")),
            (m.fileUploads = I.find(".w-file-upload")),
            m.fileUploads.each(function (W) {
              U(W, m);
            });
          var p =
            m.form.attr("aria-label") || m.form.attr("data-name") || "Form";
          m.done.attr("aria-label") || m.form.attr("aria-label", p),
            m.done.attr("tabindex", "-1"),
            m.done.attr("role", "region"),
            m.done.attr("aria-label") ||
              m.done.attr("aria-label", p + " success"),
            m.fail.attr("tabindex", "-1"),
            m.fail.attr("role", "region"),
            m.fail.attr("aria-label") ||
              m.fail.attr("aria-label", p + " failure");
          var V = (m.action = J.attr("action"));
          if (
            ((m.handler = null),
            (m.redirect = J.attr("data-redirect")),
            A.test(V))
          ) {
            m.handler = y;
            return;
          }
          if (!V) {
            if (u) {
              m.handler = (() => {
                let W = Bb().default;
                return W(F, o, Ni, re, G, j, l, z, D, u, L, e, h);
              })();
              return;
            }
            w();
          }
        }
        function M() {
          (g = !0),
            n.on("submit", a + " form", function (W) {
              var C = e.data(this, a);
              C.handler && ((C.evt = W), C.handler(C));
            });
          let k = ".w-checkbox-input",
            H = ".w-radio-input",
            J = "w--redirected-checked",
            m = "w--redirected-focus",
            I = "w--redirected-focus-visible",
            p = ":focus-visible, [data-wf-focus-visible]",
            V = [
              ["checkbox", k],
              ["radio", H],
            ];
          n.on(
            "change",
            a + ' form input[type="checkbox"]:not(' + k + ")",
            (W) => {
              e(W.target).siblings(k).toggleClass(J);
            }
          ),
            n.on("change", a + ' form input[type="radio"]', (W) => {
              e(`input[name="${W.target.name}"]:not(${k})`).map((Z, fe) =>
                e(fe).siblings(H).removeClass(J)
              );
              let C = e(W.target);
              C.hasClass("w-radio-input") || C.siblings(H).addClass(J);
            }),
            V.forEach(([W, C]) => {
              n.on(
                "focus",
                a + ` form input[type="${W}"]:not(` + C + ")",
                (Z) => {
                  e(Z.target).siblings(C).addClass(m),
                    e(Z.target).filter(p).siblings(C).addClass(I);
                }
              ),
                n.on(
                  "blur",
                  a + ` form input[type="${W}"]:not(` + C + ")",
                  (Z) => {
                    e(Z.target).siblings(C).removeClass(`${m} ${I}`);
                  }
                );
            });
        }
        function F(k) {
          var H = (k.btn = k.form.find(':input[type="submit"]'));
          (k.wait = k.btn.attr("data-wait") || null),
            (k.success = !1),
            H.prop("disabled", !1),
            k.label && H.val(k.label);
        }
        function D(k) {
          var H = k.btn,
            J = k.wait;
          H.prop("disabled", !0), J && ((k.label = H.val()), H.val(J));
        }
        function j(k, H) {
          var J = null;
          return (
            (H = H || {}),
            k
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (m, I) {
                var p = e(I),
                  V = p.attr("type"),
                  W =
                    p.attr("data-name") || p.attr("name") || "Field " + (m + 1),
                  C = p.val();
                if (V === "checkbox") C = p.is(":checked");
                else if (V === "radio") {
                  if (H[W] === null || typeof H[W] == "string") return;
                  C =
                    k
                      .find('input[name="' + p.attr("name") + '"]:checked')
                      .val() || null;
                }
                typeof C == "string" && (C = e.trim(C)),
                  (H[W] = C),
                  (J = J || X(p, V, W, C));
              }),
            J
          );
        }
        function z(k) {
          var H = {};
          return (
            k.find(':input[type="file"]').each(function (J, m) {
              var I = e(m),
                p = I.attr("data-name") || I.attr("name") || "File " + (J + 1),
                V = I.attr("data-value");
              typeof V == "string" && (V = e.trim(V)), (H[p] = V);
            }),
            H
          );
        }
        let Q = { _mkto_trk: "marketo" };
        function re() {
          return document.cookie.split("; ").reduce(function (H, J) {
            let m = J.split("="),
              I = m[0];
            if (I in Q) {
              let p = Q[I],
                V = m.slice(1).join("=");
              H[p] = V;
            }
            return H;
          }, {});
        }
        function X(k, H, J, m) {
          var I = null;
          return (
            H === "password"
              ? (I = "Passwords cannot be submitted.")
              : k.attr("required")
              ? m
                ? f.test(k.attr("type")) &&
                  (v.test(m) ||
                    (I = "Please enter a valid email address for: " + J))
                : (I = "Please fill out the required field: " + J)
              : J === "g-recaptcha-response" &&
                !m &&
                (I = "Please confirm you\u2019re not a robot."),
            I
          );
        }
        function S(k) {
          G(k), L(k);
        }
        function y(k) {
          F(k);
          var H = k.form,
            J = {};
          if (/^https/.test(o.href) && !/^https/.test(k.action)) {
            H.attr("method", "post");
            return;
          }
          G(k);
          var m = j(H, J);
          if (m) return l(m);
          D(k);
          var I;
          t.each(J, function (C, Z) {
            f.test(Z) && (J.EMAIL = C),
              /^((full[ _-]?)?name)$/i.test(Z) && (I = C),
              /^(first[ _-]?name)$/i.test(Z) && (J.FNAME = C),
              /^(last[ _-]?name)$/i.test(Z) && (J.LNAME = C);
          }),
            I &&
              !J.FNAME &&
              ((I = I.split(" ")),
              (J.FNAME = I[0]),
              (J.LNAME = J.LNAME || I[1]));
          var p = k.action.replace("/post?", "/post-json?") + "&c=?",
            V = p.indexOf("u=") + 2;
          V = p.substring(V, p.indexOf("&", V));
          var W = p.indexOf("id=") + 3;
          (W = p.substring(W, p.indexOf("&", W))),
            (J["b_" + V + "_" + W] = ""),
            e
              .ajax({ url: p, data: J, dataType: "jsonp" })
              .done(function (C) {
                (k.success = C.result === "success" || /already/.test(C.msg)),
                  k.success || console.info("MailChimp error: " + C.msg),
                  L(k);
              })
              .fail(function () {
                L(k);
              });
        }
        function L(k) {
          var H = k.form,
            J = k.redirect,
            m = k.success;
          if (m && J) {
            Ni.location(J);
            return;
          }
          k.done.toggle(m),
            k.fail.toggle(!m),
            m ? k.done.focus() : k.fail.focus(),
            H.toggle(!m),
            F(k);
        }
        function G(k) {
          k.evt && k.evt.preventDefault(), (k.evt = null);
        }
        function U(k, H) {
          if (!H.fileUploads || !H.fileUploads[k]) return;
          var J,
            m = e(H.fileUploads[k]),
            I = m.find("> .w-file-upload-default"),
            p = m.find("> .w-file-upload-uploading"),
            V = m.find("> .w-file-upload-success"),
            W = m.find("> .w-file-upload-error"),
            C = I.find(".w-file-upload-input"),
            Z = I.find(".w-file-upload-label"),
            fe = Z.children(),
            ae = W.find(".w-file-upload-error-msg"),
            b = V.find(".w-file-upload-file"),
            B = V.find(".w-file-remove-link"),
            te = b.find(".w-file-upload-file-name"),
            Y = ae.attr("data-w-size-error"),
            pe = ae.attr("data-w-type-error"),
            Be = ae.attr("data-w-generic-error");
          if (
            (E ||
              Z.on("click keydown", function (x) {
                (x.type === "keydown" && x.which !== 13 && x.which !== 32) ||
                  (x.preventDefault(), C.click());
              }),
            Z.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            B.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            E)
          )
            C.on("click", function (x) {
              x.preventDefault();
            }),
              Z.on("click", function (x) {
                x.preventDefault();
              }),
              fe.on("click", function (x) {
                x.preventDefault();
              });
          else {
            B.on("click keydown", function (x) {
              if (x.type === "keydown") {
                if (x.which !== 13 && x.which !== 32) return;
                x.preventDefault();
              }
              C.removeAttr("data-value"),
                C.val(""),
                te.html(""),
                I.toggle(!0),
                V.toggle(!1),
                Z.focus();
            }),
              C.on("change", function (x) {
                (J = x.target && x.target.files && x.target.files[0]),
                  J &&
                    (I.toggle(!1),
                    W.toggle(!1),
                    p.toggle(!0),
                    p.focus(),
                    te.text(J.name),
                    P() || D(H),
                    (H.fileUploads[k].uploading = !0),
                    ee(J, T));
              });
            var Fe = Z.outerHeight();
            C.height(Fe), C.width(1);
          }
          function d(x) {
            var q = x.responseJSON && x.responseJSON.msg,
              ne = Be;
            typeof q == "string" && q.indexOf("InvalidFileTypeError") === 0
              ? (ne = pe)
              : typeof q == "string" &&
                q.indexOf("MaxFileSizeError") === 0 &&
                (ne = Y),
              ae.text(ne),
              C.removeAttr("data-value"),
              C.val(""),
              p.toggle(!1),
              I.toggle(!0),
              W.toggle(!0),
              W.focus(),
              (H.fileUploads[k].uploading = !1),
              P() || F(H);
          }
          function T(x, q) {
            if (x) return d(x);
            var ne = q.fileName,
              se = q.postData,
              he = q.fileId,
              K = q.s3Url;
            C.attr("data-value", he), ie(K, se, J, ne, O);
          }
          function O(x) {
            if (x) return d(x);
            p.toggle(!1),
              V.css("display", "inline-block"),
              V.focus(),
              (H.fileUploads[k].uploading = !1),
              P() || F(H);
          }
          function P() {
            var x = (H.fileUploads && H.fileUploads.toArray()) || [];
            return x.some(function (q) {
              return q.uploading;
            });
          }
        }
        function ee(k, H) {
          var J = new URLSearchParams({ name: k.name, size: k.size });
          e.ajax({ type: "GET", url: `${_}?${J}`, crossDomain: !0 })
            .done(function (m) {
              H(null, m);
            })
            .fail(function (m) {
              H(m);
            });
        }
        function ie(k, H, J, m, I) {
          var p = new FormData();
          for (var V in H) p.append(V, H[V]);
          p.append("file", J, m),
            e
              .ajax({
                type: "POST",
                url: k,
                data: p,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                I(null);
              })
              .fail(function (W) {
                I(W);
              });
        }
        return r;
      })
    );
  });
  var Qb = c((_z, Yb) => {
    "use strict";
    var Ns = Pe(),
      Kb = "w-condition-invisible",
      BV = "." + Kb;
    function jV(e) {
      return e.filter(function (t) {
        return !sn(t);
      });
    }
    function sn(e) {
      return !!(e.$el && e.$el.closest(BV).length);
    }
    function Ps(e, t) {
      for (var r = e; r >= 0; r--) if (!sn(t[r])) return r;
      return -1;
    }
    function Ms(e, t) {
      for (var r = e; r <= t.length - 1; r++) if (!sn(t[r])) return r;
      return -1;
    }
    function zV(e, t) {
      return Ps(e - 1, t) === -1;
    }
    function KV(e, t) {
      return Ms(e + 1, t) === -1;
    }
    function an(e, t) {
      e.attr("aria-label") || e.attr("aria-label", t);
    }
    function YV(e, t, r, n) {
      var i = r.tram,
        o = Array.isArray,
        s = "w-lightbox",
        a = s + "-",
        u = /(^|\s+)/g,
        f = [],
        v,
        l,
        E,
        g = [];
      function h(m, I) {
        return (
          (f = o(m) ? m : [m]),
          l || h.build(),
          jV(f).length > 1 &&
            ((l.items = l.empty),
            f.forEach(function (p, V) {
              var W = H("thumbnail"),
                C = H("item")
                  .prop("tabIndex", 0)
                  .attr("aria-controls", "w-lightbox-view")
                  .attr("role", "tab")
                  .append(W);
              an(C, `show item ${V + 1} of ${f.length}`),
                sn(p) && C.addClass(Kb),
                (l.items = l.items.add(C)),
                re(p.thumbnailUrl || p.url, function (Z) {
                  Z.prop("width") > Z.prop("height")
                    ? U(Z, "wide")
                    : U(Z, "tall"),
                    W.append(U(Z, "thumbnail-image"));
                });
            }),
            l.strip.empty().append(l.items),
            U(l.content, "group")),
          i(ee(l.lightbox, "hide").trigger("focus"))
            .add("opacity .3s")
            .start({ opacity: 1 }),
          U(l.html, "noscroll"),
          h.show(I || 0)
        );
      }
      (h.build = function () {
        return (
          h.destroy(),
          (l = { html: r(t.documentElement), empty: r() }),
          (l.arrowLeft = H("control left inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (l.arrowRight = H("control right inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (l.close = H("control close").attr("role", "button")),
          an(l.arrowLeft, "previous image"),
          an(l.arrowRight, "next image"),
          an(l.close, "close lightbox"),
          (l.spinner = H("spinner")
            .attr("role", "progressbar")
            .attr("aria-live", "polite")
            .attr("aria-hidden", !1)
            .attr("aria-busy", !0)
            .attr("aria-valuemin", 0)
            .attr("aria-valuemax", 100)
            .attr("aria-valuenow", 0)
            .attr("aria-valuetext", "Loading image")),
          (l.strip = H("strip").attr("role", "tablist")),
          (E = new y(l.spinner, L("hide"))),
          (l.content = H("content").append(
            l.spinner,
            l.arrowLeft,
            l.arrowRight,
            l.close
          )),
          (l.container = H("container").append(l.content, l.strip)),
          (l.lightbox = H("backdrop hide").append(l.container)),
          l.strip.on("click", G("item"), R),
          l.content
            .on("swipe", M)
            .on("click", G("left"), A)
            .on("click", G("right"), w)
            .on("click", G("close"), N)
            .on("click", G("image, caption"), w),
          l.container.on("click", G("view"), N).on("dragstart", G("img"), D),
          l.lightbox.on("keydown", j).on("focusin", F),
          r(n).append(l.lightbox),
          h
        );
      }),
        (h.destroy = function () {
          l && (ee(l.html, "noscroll"), l.lightbox.remove(), (l = void 0));
        }),
        (h.show = function (m) {
          if (m !== v) {
            var I = f[m];
            if (!I) return h.hide();
            if (sn(I)) {
              if (m < v) {
                var p = Ps(m - 1, f);
                m = p > -1 ? p : m;
              } else {
                var V = Ms(m + 1, f);
                m = V > -1 ? V : m;
              }
              I = f[m];
            }
            var W = v;
            (v = m),
              l.spinner
                .attr("aria-hidden", !1)
                .attr("aria-busy", !0)
                .attr("aria-valuenow", 0)
                .attr("aria-valuetext", "Loading image"),
              E.show();
            var C = (I.html && J(I.width, I.height)) || I.url;
            return (
              re(C, function (Z) {
                if (m !== v) return;
                var fe = H("figure", "figure").append(U(Z, "image")),
                  ae = H("frame").append(fe),
                  b = H("view")
                    .prop("tabIndex", 0)
                    .attr("id", "w-lightbox-view")
                    .append(ae),
                  B,
                  te;
                I.html &&
                  ((B = r(I.html)),
                  (te = B.is("iframe")),
                  te && B.on("load", Y),
                  fe.append(U(B, "embed"))),
                  I.caption &&
                    fe.append(H("caption", "figcaption").text(I.caption)),
                  l.spinner.before(b),
                  te || Y();
                function Y() {
                  if (
                    (l.spinner
                      .attr("aria-hidden", !0)
                      .attr("aria-busy", !1)
                      .attr("aria-valuenow", 100)
                      .attr("aria-valuetext", "Loaded image"),
                    E.hide(),
                    m !== v)
                  ) {
                    b.remove();
                    return;
                  }
                  let pe = zV(m, f);
                  ie(l.arrowLeft, "inactive", pe),
                    k(l.arrowLeft, pe),
                    pe && l.arrowLeft.is(":focus") && l.arrowRight.focus();
                  let Be = KV(m, f);
                  if (
                    (ie(l.arrowRight, "inactive", Be),
                    k(l.arrowRight, Be),
                    Be && l.arrowRight.is(":focus") && l.arrowLeft.focus(),
                    l.view
                      ? (i(l.view)
                          .add("opacity .3s")
                          .start({ opacity: 0 })
                          .then(X(l.view)),
                        i(b)
                          .add("opacity .3s")
                          .add("transform .3s")
                          .set({ x: m > W ? "80px" : "-80px" })
                          .start({ opacity: 1, x: 0 }))
                      : b.css("opacity", 1),
                    (l.view = b),
                    l.view.prop("tabIndex", 0),
                    l.items)
                  ) {
                    ee(l.items, "active"), l.items.removeAttr("aria-selected");
                    var Fe = l.items.eq(m);
                    U(Fe, "active"), Fe.attr("aria-selected", !0), S(Fe);
                  }
                }
              }),
              l.close.prop("tabIndex", 0),
              r(":focus").addClass("active-lightbox"),
              g.length === 0 &&
                (r("body")
                  .children()
                  .each(function () {
                    r(this).hasClass("w-lightbox-backdrop") ||
                      r(this).is("script") ||
                      (g.push({
                        node: r(this),
                        hidden: r(this).attr("aria-hidden"),
                        tabIndex: r(this).attr("tabIndex"),
                      }),
                      r(this).attr("aria-hidden", !0).attr("tabIndex", -1));
                  }),
                l.close.focus()),
              h
            );
          }
        }),
        (h.hide = function () {
          return (
            i(l.lightbox).add("opacity .3s").start({ opacity: 0 }).then(Q), h
          );
        }),
        (h.prev = function () {
          var m = Ps(v - 1, f);
          m > -1 && h.show(m);
        }),
        (h.next = function () {
          var m = Ms(v + 1, f);
          m > -1 && h.show(m);
        });
      function _(m) {
        return function (I) {
          this === I.target && (I.stopPropagation(), I.preventDefault(), m());
        };
      }
      var A = _(h.prev),
        w = _(h.next),
        N = _(h.hide),
        R = function (m) {
          var I = r(this).index();
          m.preventDefault(), h.show(I);
        },
        M = function (m, I) {
          m.preventDefault(),
            I.direction === "left"
              ? h.next()
              : I.direction === "right" && h.prev();
        },
        F = function () {
          this.focus();
        };
      function D(m) {
        m.preventDefault();
      }
      function j(m) {
        var I = m.keyCode;
        I === 27 || z(I, "close")
          ? h.hide()
          : I === 37 || z(I, "left")
          ? h.prev()
          : I === 39 || z(I, "right")
          ? h.next()
          : z(I, "item") && r(":focus").click();
      }
      function z(m, I) {
        if (m !== 13 && m !== 32) return !1;
        var p = r(":focus").attr("class"),
          V = L(I).trim();
        return p.includes(V);
      }
      function Q() {
        l &&
          (l.strip.scrollLeft(0).empty(),
          ee(l.html, "noscroll"),
          U(l.lightbox, "hide"),
          l.view && l.view.remove(),
          ee(l.content, "group"),
          U(l.arrowLeft, "inactive"),
          U(l.arrowRight, "inactive"),
          (v = l.view = void 0),
          g.forEach(function (m) {
            var I = m.node;
            I &&
              (m.hidden
                ? I.attr("aria-hidden", m.hidden)
                : I.removeAttr("aria-hidden"),
              m.tabIndex
                ? I.attr("tabIndex", m.tabIndex)
                : I.removeAttr("tabIndex"));
          }),
          (g = []),
          r(".active-lightbox").removeClass("active-lightbox").focus());
      }
      function re(m, I) {
        var p = H("img", "img");
        return (
          p.one("load", function () {
            I(p);
          }),
          p.attr("src", m),
          p
        );
      }
      function X(m) {
        return function () {
          m.remove();
        };
      }
      function S(m) {
        var I = m.get(0),
          p = l.strip.get(0),
          V = I.offsetLeft,
          W = I.clientWidth,
          C = p.scrollLeft,
          Z = p.clientWidth,
          fe = p.scrollWidth - Z,
          ae;
        V < C
          ? (ae = Math.max(0, V + W - Z))
          : V + W > Z + C && (ae = Math.min(V, fe)),
          ae != null &&
            i(l.strip).add("scroll-left 500ms").start({ "scroll-left": ae });
      }
      function y(m, I, p) {
        (this.$element = m),
          (this.className = I),
          (this.delay = p || 200),
          this.hide();
      }
      (y.prototype.show = function () {
        var m = this;
        m.timeoutId ||
          (m.timeoutId = setTimeout(function () {
            m.$element.removeClass(m.className), delete m.timeoutId;
          }, m.delay));
      }),
        (y.prototype.hide = function () {
          var m = this;
          if (m.timeoutId) {
            clearTimeout(m.timeoutId), delete m.timeoutId;
            return;
          }
          m.$element.addClass(m.className);
        });
      function L(m, I) {
        return m.replace(u, (I ? " ." : " ") + a);
      }
      function G(m) {
        return L(m, !0);
      }
      function U(m, I) {
        return m.addClass(L(I));
      }
      function ee(m, I) {
        return m.removeClass(L(I));
      }
      function ie(m, I, p) {
        return m.toggleClass(L(I), p);
      }
      function k(m, I) {
        return m.attr("aria-hidden", I).attr("tabIndex", I ? -1 : 0);
      }
      function H(m, I) {
        return U(r(t.createElement(I || "div")), m);
      }
      function J(m, I) {
        var p =
          '<svg xmlns="http://www.w3.org/2000/svg" width="' +
          m +
          '" height="' +
          I +
          '"/>';
        return "data:image/svg+xml;charset=utf-8," + encodeURI(p);
      }
      return (
        (function () {
          var m = e.navigator.userAgent,
            I = /(iPhone|iPad|iPod);[^OS]*OS (\d)/,
            p = m.match(I),
            V = m.indexOf("Android ") > -1 && m.indexOf("Chrome") === -1;
          if (!V && (!p || p[2] > 7)) return;
          var W = t.createElement("style");
          t.head.appendChild(W), e.addEventListener("resize", C, !0);
          function C() {
            var Z = e.innerHeight,
              fe = e.innerWidth,
              ae =
                ".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                Z +
                "px}.w-lightbox-view {width:" +
                fe +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.86 * Z +
                "px}.w-lightbox-image {max-width:" +
                fe +
                "px;max-height:" +
                Z +
                "px}.w-lightbox-group .w-lightbox-image {max-height:" +
                0.86 * Z +
                "px}.w-lightbox-strip {padding: 0 " +
                0.01 * Z +
                "px}.w-lightbox-item {width:" +
                0.1 * Z +
                "px;padding:" +
                0.02 * Z +
                "px " +
                0.01 * Z +
                "px}.w-lightbox-thumbnail {height:" +
                0.1 * Z +
                "px}@media (min-width: 768px) {.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                0.96 * Z +
                "px}.w-lightbox-content {margin-top:" +
                0.02 * Z +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.84 * Z +
                "px}.w-lightbox-image {max-width:" +
                0.96 * fe +
                "px;max-height:" +
                0.96 * Z +
                "px}.w-lightbox-group .w-lightbox-image {max-width:" +
                0.823 * fe +
                "px;max-height:" +
                0.84 * Z +
                "px}}";
            W.textContent = ae;
          }
          C();
        })(),
        h
      );
    }
    Ns.define(
      "lightbox",
      (Yb.exports = function (e) {
        var t = {},
          r = Ns.env(),
          n = YV(window, document, e, r ? "#lightbox-mountpoint" : "body"),
          i = e(document),
          o,
          s,
          a = ".w-lightbox",
          u;
        t.ready = t.design = t.preview = f;
        function f() {
          (s = r && Ns.env("design")),
            n.destroy(),
            (u = {}),
            (o = i.find(a)),
            o.webflowLightBox(),
            o.each(function () {
              an(e(this), "open lightbox"),
                e(this).attr("aria-haspopup", "dialog");
            });
        }
        jQuery.fn.extend({
          webflowLightBox: function () {
            var g = this;
            e.each(g, function (h, _) {
              var A = e.data(_, a);
              A ||
                (A = e.data(_, a, {
                  el: e(_),
                  mode: "images",
                  images: [],
                  embed: "",
                })),
                A.el.off(a),
                v(A),
                s
                  ? A.el.on("setting" + a, v.bind(null, A))
                  : A.el.on("click" + a, l(A)).on("click" + a, function (w) {
                      w.preventDefault();
                    });
            });
          },
        });
        function v(g) {
          var h = g.el.children(".w-json").html(),
            _,
            A;
          if (!h) {
            g.items = [];
            return;
          }
          try {
            h = JSON.parse(h);
          } catch (w) {
            console.error("Malformed lightbox JSON configuration.", w);
          }
          E(h),
            h.items.forEach(function (w) {
              w.$el = g.el;
            }),
            (_ = h.group),
            _
              ? ((A = u[_]),
                A || (A = u[_] = []),
                (g.items = A),
                h.items.length &&
                  ((g.index = A.length), A.push.apply(A, h.items)))
              : ((g.items = h.items), (g.index = 0));
        }
        function l(g) {
          return function () {
            g.items.length && n(g.items, g.index || 0);
          };
        }
        function E(g) {
          g.images &&
            (g.images.forEach(function (h) {
              h.type = "image";
            }),
            (g.items = g.images)),
            g.embed && ((g.embed.type = "video"), (g.items = [g.embed])),
            g.groupId && (g.group = g.groupId);
        }
        return t;
      })
    );
  });
  var Zb = c((Iz, $b) => {
    "use strict";
    var St = Pe(),
      QV = _r(),
      Ce = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    St.define(
      "navbar",
      ($b.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(window),
          o = e(document),
          s = t.debounce,
          a,
          u,
          f,
          v,
          l = St.env(),
          E = '<div class="w-nav-overlay" data-wf-ignore />',
          g = ".w-nav",
          h = "w--open",
          _ = "w--nav-dropdown-open",
          A = "w--nav-dropdown-toggle-open",
          w = "w--nav-dropdown-list-open",
          N = "w--nav-link-open",
          R = QV.triggers,
          M = e();
        (r.ready = r.design = r.preview = F),
          (r.destroy = function () {
            (M = e()), D(), u && u.length && u.each(re);
          });
        function F() {
          (f = l && St.env("design")),
            (v = St.env("editor")),
            (a = e(document.body)),
            (u = o.find(g)),
            u.length && (u.each(Q), D(), j());
        }
        function D() {
          St.resize.off(z);
        }
        function j() {
          St.resize.on(z);
        }
        function z() {
          u.each(I);
        }
        function Q(b, B) {
          var te = e(B),
            Y = e.data(B, g);
          Y ||
            (Y = e.data(B, g, {
              open: !1,
              el: te,
              config: {},
              selectedIdx: -1,
            })),
            (Y.menu = te.find(".w-nav-menu")),
            (Y.links = Y.menu.find(".w-nav-link")),
            (Y.dropdowns = Y.menu.find(".w-dropdown")),
            (Y.dropdownToggle = Y.menu.find(".w-dropdown-toggle")),
            (Y.dropdownList = Y.menu.find(".w-dropdown-list")),
            (Y.button = te.find(".w-nav-button")),
            (Y.container = te.find(".w-container")),
            (Y.overlayContainerId = "w-nav-overlay-" + b),
            (Y.outside = J(Y));
          var pe = te.find(".w-nav-brand");
          pe &&
            pe.attr("href") === "/" &&
            pe.attr("aria-label") == null &&
            pe.attr("aria-label", "home"),
            Y.button.attr("style", "-webkit-user-select: text;"),
            Y.button.attr("aria-label") == null &&
              Y.button.attr("aria-label", "menu"),
            Y.button.attr("role", "button"),
            Y.button.attr("tabindex", "0"),
            Y.button.attr("aria-controls", Y.overlayContainerId),
            Y.button.attr("aria-haspopup", "menu"),
            Y.button.attr("aria-expanded", "false"),
            Y.el.off(g),
            Y.button.off(g),
            Y.menu.off(g),
            y(Y),
            f
              ? (X(Y), Y.el.on("setting" + g, L(Y)))
              : (S(Y),
                Y.button.on("click" + g, k(Y)),
                Y.menu.on("click" + g, "a", H(Y)),
                Y.button.on("keydown" + g, G(Y)),
                Y.el.on("keydown" + g, U(Y))),
            I(b, B);
        }
        function re(b, B) {
          var te = e.data(B, g);
          te && (X(te), e.removeData(B, g));
        }
        function X(b) {
          b.overlay && (ae(b, !0), b.overlay.remove(), (b.overlay = null));
        }
        function S(b) {
          b.overlay ||
            ((b.overlay = e(E).appendTo(b.el)),
            b.overlay.attr("id", b.overlayContainerId),
            (b.parent = b.menu.parent()),
            ae(b, !0));
        }
        function y(b) {
          var B = {},
            te = b.config || {},
            Y = (B.animation = b.el.attr("data-animation") || "default");
          (B.animOver = /^over/.test(Y)),
            (B.animDirect = /left$/.test(Y) ? -1 : 1),
            te.animation !== Y && b.open && t.defer(ie, b),
            (B.easing = b.el.attr("data-easing") || "ease"),
            (B.easing2 = b.el.attr("data-easing2") || "ease");
          var pe = b.el.attr("data-duration");
          (B.duration = pe != null ? Number(pe) : 400),
            (B.docHeight = b.el.attr("data-doc-height")),
            (b.config = B);
        }
        function L(b) {
          return function (B, te) {
            te = te || {};
            var Y = i.width();
            y(b),
              te.open === !0 && Z(b, !0),
              te.open === !1 && ae(b, !0),
              b.open &&
                t.defer(function () {
                  Y !== i.width() && ie(b);
                });
          };
        }
        function G(b) {
          return function (B) {
            switch (B.keyCode) {
              case Ce.SPACE:
              case Ce.ENTER:
                return k(b)(), B.preventDefault(), B.stopPropagation();
              case Ce.ESCAPE:
                return ae(b), B.preventDefault(), B.stopPropagation();
              case Ce.ARROW_RIGHT:
              case Ce.ARROW_DOWN:
              case Ce.HOME:
              case Ce.END:
                return b.open
                  ? (B.keyCode === Ce.END
                      ? (b.selectedIdx = b.links.length - 1)
                      : (b.selectedIdx = 0),
                    ee(b),
                    B.preventDefault(),
                    B.stopPropagation())
                  : (B.preventDefault(), B.stopPropagation());
            }
          };
        }
        function U(b) {
          return function (B) {
            if (b.open)
              switch (
                ((b.selectedIdx = b.links.index(document.activeElement)),
                B.keyCode)
              ) {
                case Ce.HOME:
                case Ce.END:
                  return (
                    B.keyCode === Ce.END
                      ? (b.selectedIdx = b.links.length - 1)
                      : (b.selectedIdx = 0),
                    ee(b),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case Ce.ESCAPE:
                  return (
                    ae(b),
                    b.button.focus(),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case Ce.ARROW_LEFT:
                case Ce.ARROW_UP:
                  return (
                    (b.selectedIdx = Math.max(-1, b.selectedIdx - 1)),
                    ee(b),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
                case Ce.ARROW_RIGHT:
                case Ce.ARROW_DOWN:
                  return (
                    (b.selectedIdx = Math.min(
                      b.links.length - 1,
                      b.selectedIdx + 1
                    )),
                    ee(b),
                    B.preventDefault(),
                    B.stopPropagation()
                  );
              }
          };
        }
        function ee(b) {
          if (b.links[b.selectedIdx]) {
            var B = b.links[b.selectedIdx];
            B.focus(), H(B);
          }
        }
        function ie(b) {
          b.open && (ae(b, !0), Z(b, !0));
        }
        function k(b) {
          return s(function () {
            b.open ? ae(b) : Z(b);
          });
        }
        function H(b) {
          return function (B) {
            var te = e(this),
              Y = te.attr("href");
            if (!St.validClick(B.currentTarget)) {
              B.preventDefault();
              return;
            }
            Y && Y.indexOf("#") === 0 && b.open && ae(b);
          };
        }
        function J(b) {
          return (
            b.outside && o.off("click" + g, b.outside),
            function (B) {
              var te = e(B.target);
              (v && te.closest(".w-editor-bem-EditorOverlay").length) ||
                m(b, te);
            }
          );
        }
        var m = s(function (b, B) {
          if (b.open) {
            var te = B.closest(".w-nav-menu");
            b.menu.is(te) || ae(b);
          }
        });
        function I(b, B) {
          var te = e.data(B, g),
            Y = (te.collapsed = te.button.css("display") !== "none");
          if ((te.open && !Y && !f && ae(te, !0), te.container.length)) {
            var pe = V(te);
            te.links.each(pe), te.dropdowns.each(pe);
          }
          te.open && fe(te);
        }
        var p = "max-width";
        function V(b) {
          var B = b.container.css(p);
          return (
            B === "none" && (B = ""),
            function (te, Y) {
              (Y = e(Y)), Y.css(p, ""), Y.css(p) === "none" && Y.css(p, B);
            }
          );
        }
        function W(b, B) {
          B.setAttribute("data-nav-menu-open", "");
        }
        function C(b, B) {
          B.removeAttribute("data-nav-menu-open");
        }
        function Z(b, B) {
          if (b.open) return;
          (b.open = !0),
            b.menu.each(W),
            b.links.addClass(N),
            b.dropdowns.addClass(_),
            b.dropdownToggle.addClass(A),
            b.dropdownList.addClass(w),
            b.button.addClass(h);
          var te = b.config,
            Y = te.animation;
          (Y === "none" || !n.support.transform || te.duration <= 0) &&
            (B = !0);
          var pe = fe(b),
            Be = b.menu.outerHeight(!0),
            Fe = b.menu.outerWidth(!0),
            d = b.el.height(),
            T = b.el[0];
          if (
            (I(0, T),
            R.intro(0, T),
            St.redraw.up(),
            f || o.on("click" + g, b.outside),
            B)
          ) {
            x();
            return;
          }
          var O = "transform " + te.duration + "ms " + te.easing;
          if (
            (b.overlay &&
              ((M = b.menu.prev()), b.overlay.show().append(b.menu)),
            te.animOver)
          ) {
            n(b.menu)
              .add(O)
              .set({ x: te.animDirect * Fe, height: pe })
              .start({ x: 0 })
              .then(x),
              b.overlay && b.overlay.width(Fe);
            return;
          }
          var P = d + Be;
          n(b.menu).add(O).set({ y: -P }).start({ y: 0 }).then(x);
          function x() {
            b.button.attr("aria-expanded", "true");
          }
        }
        function fe(b) {
          var B = b.config,
            te = B.docHeight ? o.height() : a.height();
          return (
            B.animOver
              ? b.menu.height(te)
              : b.el.css("position") !== "fixed" &&
                (te -= b.el.outerHeight(!0)),
            b.overlay && b.overlay.height(te),
            te
          );
        }
        function ae(b, B) {
          if (!b.open) return;
          (b.open = !1), b.button.removeClass(h);
          var te = b.config;
          if (
            ((te.animation === "none" ||
              !n.support.transform ||
              te.duration <= 0) &&
              (B = !0),
            R.outro(0, b.el[0]),
            o.off("click" + g, b.outside),
            B)
          ) {
            n(b.menu).stop(), T();
            return;
          }
          var Y = "transform " + te.duration + "ms " + te.easing2,
            pe = b.menu.outerHeight(!0),
            Be = b.menu.outerWidth(!0),
            Fe = b.el.height();
          if (te.animOver) {
            n(b.menu)
              .add(Y)
              .start({ x: Be * te.animDirect })
              .then(T);
            return;
          }
          var d = Fe + pe;
          n(b.menu).add(Y).start({ y: -d }).then(T);
          function T() {
            b.menu.height(""),
              n(b.menu).set({ x: 0, y: 0 }),
              b.menu.each(C),
              b.links.removeClass(N),
              b.dropdowns.removeClass(_),
              b.dropdownToggle.removeClass(A),
              b.dropdownList.removeClass(w),
              b.overlay &&
                b.overlay.children().length &&
                (M.length ? b.menu.insertAfter(M) : b.menu.prependTo(b.parent),
                b.overlay.attr("style", "").hide()),
              b.el.triggerHandler("w-close"),
              b.button.attr("aria-expanded", "false");
          }
        }
        return r;
      })
    );
  });
  var e_ = c((Tz, Jb) => {
    "use strict";
    var Ct = Pe(),
      $V = _r();
    Ct.define(
      "tabs",
      (Jb.exports = function (e) {
        var t = {},
          r = e.tram,
          n = e(document),
          i,
          o,
          s = Ct.env,
          a = s.safari,
          u = s(),
          f = "data-w-tab",
          v = "data-w-pane",
          l = ".w-tabs",
          E = "w--current",
          g = "w--tab-active",
          h = $V.triggers,
          _ = !1;
        (t.ready = t.design = t.preview = A),
          (t.redraw = function () {
            (_ = !0), A(), (_ = !1);
          }),
          (t.destroy = function () {
            (i = n.find(l)), i.length && (i.each(R), w());
          });
        function A() {
          (o = u && Ct.env("design")),
            (i = n.find(l)),
            i.length &&
              (i.each(M), Ct.env("preview") && !_ && i.each(R), w(), N());
        }
        function w() {
          Ct.redraw.off(t.redraw);
        }
        function N() {
          Ct.redraw.on(t.redraw);
        }
        function R(X, S) {
          var y = e.data(S, l);
          y &&
            (y.links && y.links.each(h.reset),
            y.panes && y.panes.each(h.reset));
        }
        function M(X, S) {
          var y = l.substr(1) + "-" + X,
            L = e(S),
            G = e.data(S, l);
          if (
            (G || (G = e.data(S, l, { el: L, config: {} })),
            (G.current = null),
            (G.tabIdentifier = y + "-" + f),
            (G.paneIdentifier = y + "-" + v),
            (G.menu = L.children(".w-tab-menu")),
            (G.links = G.menu.children(".w-tab-link")),
            (G.content = L.children(".w-tab-content")),
            (G.panes = G.content.children(".w-tab-pane")),
            G.el.off(l),
            G.links.off(l),
            G.menu.attr("role", "tablist"),
            G.links.attr("tabindex", "-1"),
            F(G),
            !o)
          ) {
            G.links.on("click" + l, j(G)), G.links.on("keydown" + l, z(G));
            var U = G.links.filter("." + E),
              ee = U.attr(f);
            ee && Q(G, { tab: ee, immediate: !0 });
          }
        }
        function F(X) {
          var S = {};
          S.easing = X.el.attr("data-easing") || "ease";
          var y = parseInt(X.el.attr("data-duration-in"), 10);
          y = S.intro = y === y ? y : 0;
          var L = parseInt(X.el.attr("data-duration-out"), 10);
          (L = S.outro = L === L ? L : 0),
            (S.immediate = !y && !L),
            (X.config = S);
        }
        function D(X) {
          var S = X.current;
          return Array.prototype.findIndex.call(
            X.links,
            (y) => y.getAttribute(f) === S,
            null
          );
        }
        function j(X) {
          return function (S) {
            S.preventDefault();
            var y = S.currentTarget.getAttribute(f);
            y && Q(X, { tab: y });
          };
        }
        function z(X) {
          return function (S) {
            var y = D(X),
              L = S.key,
              G = {
                ArrowLeft: y - 1,
                ArrowUp: y - 1,
                ArrowRight: y + 1,
                ArrowDown: y + 1,
                End: X.links.length - 1,
                Home: 0,
              };
            if (L in G) {
              S.preventDefault();
              var U = G[L];
              U === -1 && (U = X.links.length - 1),
                U === X.links.length && (U = 0);
              var ee = X.links[U],
                ie = ee.getAttribute(f);
              ie && Q(X, { tab: ie });
            }
          };
        }
        function Q(X, S) {
          S = S || {};
          var y = X.config,
            L = y.easing,
            G = S.tab;
          if (G !== X.current) {
            X.current = G;
            var U;
            X.links.each(function (I, p) {
              var V = e(p);
              if (S.immediate || y.immediate) {
                var W = X.panes[I];
                p.id || (p.id = X.tabIdentifier + "-" + I),
                  W.id || (W.id = X.paneIdentifier + "-" + I),
                  (p.href = "#" + W.id),
                  p.setAttribute("role", "tab"),
                  p.setAttribute("aria-controls", W.id),
                  p.setAttribute("aria-selected", "false"),
                  W.setAttribute("role", "tabpanel"),
                  W.setAttribute("aria-labelledby", p.id);
              }
              p.getAttribute(f) === G
                ? ((U = p),
                  V.addClass(E)
                    .removeAttr("tabindex")
                    .attr({ "aria-selected": "true" })
                    .each(h.intro))
                : V.hasClass(E) &&
                  V.removeClass(E)
                    .attr({ tabindex: "-1", "aria-selected": "false" })
                    .each(h.outro);
            });
            var ee = [],
              ie = [];
            X.panes.each(function (I, p) {
              var V = e(p);
              p.getAttribute(f) === G
                ? ee.push(p)
                : V.hasClass(g) && ie.push(p);
            });
            var k = e(ee),
              H = e(ie);
            if (S.immediate || y.immediate) {
              k.addClass(g).each(h.intro),
                H.removeClass(g),
                _ || Ct.redraw.up();
              return;
            } else {
              var J = window.scrollX,
                m = window.scrollY;
              U.focus(), window.scrollTo(J, m);
            }
            H.length && y.outro
              ? (H.each(h.outro),
                r(H)
                  .add("opacity " + y.outro + "ms " + L, { fallback: a })
                  .start({ opacity: 0 })
                  .then(() => re(y, H, k)))
              : re(y, H, k);
          }
        }
        function re(X, S, y) {
          if (
            (S.removeClass(g).css({
              opacity: "",
              transition: "",
              transform: "",
              width: "",
              height: "",
            }),
            y.addClass(g).each(h.intro),
            Ct.redraw.up(),
            !X.intro)
          )
            return r(y).set({ opacity: 1 });
          r(y)
            .set({ opacity: 0 })
            .redraw()
            .add("opacity " + X.intro + "ms " + X.easing, { fallback: a })
            .start({ opacity: 1 });
        }
        return t;
      })
    );
  });
  Ds();
  Fs();
  Qs();
  Zs();
  eu();
  nu();
  _r();
  qb();
  Fb();
  kb();
  Vb();
  Xb();
  zb();
  Qb();
  Zb();
  e_();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".hover-link",
        originalId:
          "652803878613658724d059f8|91c4d555-735f-7c93-d093-836616f2891f",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".hover-link",
          originalId:
            "652803878613658724d059f8|91c4d555-735f-7c93-d093-836616f2891f",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697196536875,
    },
    "e-2": {
      id: "e-2",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-6",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".hover-link",
        originalId:
          "652803878613658724d059f8|91c4d555-735f-7c93-d093-836616f2891f",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".hover-link",
          originalId:
            "652803878613658724d059f8|91c4d555-735f-7c93-d093-836616f2891f",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697196536876,
    },
    "e-3": {
      id: "e-3",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-3", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "c82600e7-2ef8-c002-4dd9-d6d0474f186c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "c82600e7-2ef8-c002-4dd9-d6d0474f186c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-3-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697205496233,
    },
    "e-4": {
      id: "e-4",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652803878613658724d059f8|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652803878613658724d059f8|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697208681111,
    },
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652803878613658724d059f8|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652803878613658724d059f8|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697219852913,
    },
    "e-6": {
      id: "e-6",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-3", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652803878613658724d059f8|7401cf9c-a153-0915-7af5-ce552082e014",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652803878613658724d059f8|7401cf9c-a153-0915-7af5-ce552082e014",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-3-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697269830431,
    },
    "e-7": {
      id: "e-7",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-9", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652803878613658724d059f8|5819e586-abbf-9a01-41d8-888222458cd6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652803878613658724d059f8|5819e586-abbf-9a01-41d8-888222458cd6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-9-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697269945778,
    },
    "e-8": {
      id: "e-8",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-10", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652803878613658724d059f8|3bc370a0-29c6-9d3f-8dc7-d00ffde95687",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652803878613658724d059f8|3bc370a0-29c6-9d3f-8dc7-d00ffde95687",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-10-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697270104730,
    },
    "e-9": {
      id: "e-9",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-10",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".accordion-title",
        originalId:
          "652803878613658724d059f8|b3bd4b62-bc1d-7113-3bf7-accffc239640",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".accordion-title",
          originalId:
            "652803878613658724d059f8|b3bd4b62-bc1d-7113-3bf7-accffc239640",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697281218792,
    },
    "e-10": {
      id: "e-10",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-9",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".accordion-title",
        originalId:
          "652803878613658724d059f8|b3bd4b62-bc1d-7113-3bf7-accffc239640",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".accordion-title",
          originalId:
            "652803878613658724d059f8|b3bd4b62-bc1d-7113-3bf7-accffc239640",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697281218793,
    },
    "e-13": {
      id: "e-13",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-14",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "8988c782-05ec-c465-004b-259cfc6c99a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "8988c782-05ec-c465-004b-259cfc6c99a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697366263722,
    },
    "e-14": {
      id: "e-14",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-13",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "8988c782-05ec-c465-004b-259cfc6c99a7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "8988c782-05ec-c465-004b-259cfc6c99a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697366263722,
    },
    "e-15": {
      id: "e-15",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652bcbac4e7b1ba97dfc09ba|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bcbac4e7b1ba97dfc09ba|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697369004857,
    },
    "e-16": {
      id: "e-16",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652bcbac4e7b1ba97dfc09ba|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bcbac4e7b1ba97dfc09ba|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697369004857,
    },
    "e-17": {
      id: "e-17",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "6529957ee16404c230e60c57|2dc98369-67b4-ead3-d3cb-18aef97c178c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6529957ee16404c230e60c57|2dc98369-67b4-ead3-d3cb-18aef97c178c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697369380848,
    },
    "e-18": {
      id: "e-18",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6529957ee16404c230e60c57|2dc98369-67b4-ead3-d3cb-18aef97c178c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6529957ee16404c230e60c57|2dc98369-67b4-ead3-d3cb-18aef97c178c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697369380848,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6529957ee16404c230e60c57|2dc98369-67b4-ead3-d3cb-18aef97c178c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6529957ee16404c230e60c57|2dc98369-67b4-ead3-d3cb-18aef97c178c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697372603322,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652ba5fa9c1f4e8c416584ea|88f4ad4b-793a-1bad-b750-c794ab1cde15",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba5fa9c1f4e8c416584ea|88f4ad4b-793a-1bad-b750-c794ab1cde15",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697374422310,
    },
    "e-24": {
      id: "e-24",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652ba5fa9c1f4e8c416584ea|88f4ad4b-793a-1bad-b750-c794ab1cde15",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba5fa9c1f4e8c416584ea|88f4ad4b-793a-1bad-b750-c794ab1cde15",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697374422310,
    },
    "e-25": {
      id: "e-25",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652ba5fa9c1f4e8c416584ea|88f4ad4b-793a-1bad-b750-c794ab1cde15",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba5fa9c1f4e8c416584ea|88f4ad4b-793a-1bad-b750-c794ab1cde15",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697374422310,
    },
    "e-26": {
      id: "e-26",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652be451ac2fb6a71ac9d35a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652be451ac2fb6a71ac9d35a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697375314561,
    },
    "e-27": {
      id: "e-27",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652be451ac2fb6a71ac9d35a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652be451ac2fb6a71ac9d35a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697375314561,
    },
    "e-28": {
      id: "e-28",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652be451ac2fb6a71ac9d35a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652be451ac2fb6a71ac9d35a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697376282186,
    },
    "e-29": {
      id: "e-29",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652bfa58bf55b01d966eba7b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa58bf55b01d966eba7b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697380952648,
    },
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652bfa58bf55b01d966eba7b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa58bf55b01d966eba7b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697380952648,
    },
    "e-33": {
      id: "e-33",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652bfa58bf55b01d966eba7b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa58bf55b01d966eba7b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697382724935,
    },
    "e-34": {
      id: "e-34",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652c03aa161daabd6b289f2e|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652c03aa161daabd6b289f2e|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697383339277,
    },
    "e-35": {
      id: "e-35",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652c03aa161daabd6b289f2e|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652c03aa161daabd6b289f2e|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697383339277,
    },
    "e-36": {
      id: "e-36",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-17", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652c03aa161daabd6b289f2e|44cd4163-d847-314d-913c-6b2fc80a2597",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652c03aa161daabd6b289f2e|44cd4163-d847-314d-913c-6b2fc80a2597",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-17-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697383560994,
    },
    "e-37": {
      id: "e-37",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652c03aa161daabd6b289f2e|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652c03aa161daabd6b289f2e|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697383624892,
    },
    "e-38": {
      id: "e-38",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652ce55ee4e95fb82fc30a7a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ce55ee4e95fb82fc30a7a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697441119018,
    },
    "e-39": {
      id: "e-39",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652ce55ee4e95fb82fc30a7a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ce55ee4e95fb82fc30a7a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697441119018,
    },
    "e-40": {
      id: "e-40",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652ce55ee4e95fb82fc30a7a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ce55ee4e95fb82fc30a7a|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697441119018,
    },
    "e-41": {
      id: "e-41",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652cf294b9b179d7dff8e415|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cf294b9b179d7dff8e415|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697444501098,
    },
    "e-42": {
      id: "e-42",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652cf294b9b179d7dff8e415|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cf294b9b179d7dff8e415|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697444501098,
    },
    "e-46": {
      id: "e-46",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652ba61287d36e6c6694c54c|48ec10fa-7f5f-4e2e-c2bd-5fe1f70b1d3e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba61287d36e6c6694c54c|48ec10fa-7f5f-4e2e-c2bd-5fe1f70b1d3e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697448187943,
    },
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652ba61287d36e6c6694c54c|48ec10fa-7f5f-4e2e-c2bd-5fe1f70b1d3e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba61287d36e6c6694c54c|48ec10fa-7f5f-4e2e-c2bd-5fe1f70b1d3e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697448187943,
    },
    "e-48": {
      id: "e-48",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652ba61287d36e6c6694c54c|48ec10fa-7f5f-4e2e-c2bd-5fe1f70b1d3e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba61287d36e6c6694c54c|48ec10fa-7f5f-4e2e-c2bd-5fe1f70b1d3e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697448187943,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652cf0e82c26659c8b1240bd|64f4c7f1-d778-2b84-57f6-35ca1b6069a4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cf0e82c26659c8b1240bd|64f4c7f1-d778-2b84-57f6-35ca1b6069a4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697449956766,
    },
    "e-50": {
      id: "e-50",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652cf0e82c26659c8b1240bd|64f4c7f1-d778-2b84-57f6-35ca1b6069a4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cf0e82c26659c8b1240bd|64f4c7f1-d778-2b84-57f6-35ca1b6069a4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697449956766,
    },
    "e-51": {
      id: "e-51",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652cf0e82c26659c8b1240bd|64f4c7f1-d778-2b84-57f6-35ca1b6069a4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cf0e82c26659c8b1240bd|64f4c7f1-d778-2b84-57f6-35ca1b6069a4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697449956766,
    },
    "e-56": {
      id: "e-56",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652d1543b4f9def31ab34157|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d1543b4f9def31ab34157|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697453380123,
    },
    "e-57": {
      id: "e-57",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652d1543b4f9def31ab34157|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d1543b4f9def31ab34157|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697453380123,
    },
    "e-58": {
      id: "e-58",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d1543b4f9def31ab34157|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d1543b4f9def31ab34157|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697453380123,
    },
    "e-59": {
      id: "e-59",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652d18ba588331f160d553c4|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d18ba588331f160d553c4|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697454266765,
    },
    "e-60": {
      id: "e-60",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652d18ba588331f160d553c4|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d18ba588331f160d553c4|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697454266765,
    },
    "e-61": {
      id: "e-61",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d18ba588331f160d553c4|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d18ba588331f160d553c4|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697454266765,
    },
    "e-62": {
      id: "e-62",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652d27fb222a1e9f8b137771|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d27fb222a1e9f8b137771|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697458171947,
    },
    "e-63": {
      id: "e-63",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652d27fb222a1e9f8b137771|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d27fb222a1e9f8b137771|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697458171947,
    },
    "e-67": {
      id: "e-67",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d27fb222a1e9f8b137771|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d27fb222a1e9f8b137771|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697458292549,
    },
    "e-80": {
      id: "e-80",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-17", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652ba6c9422fddacbf81d305|79adecbb-2b53-c85e-bf67-fb69868202c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba6c9422fddacbf81d305|79adecbb-2b53-c85e-bf67-fb69868202c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-17-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697471760304,
    },
    "e-81": {
      id: "e-81",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-82",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        selector: ".sidebar-mobile-menu",
        originalId:
          "652ba6c9422fddacbf81d305|3606f724-9b89-7a96-c48b-014cb70f35ec",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".sidebar-mobile-menu",
          originalId:
            "652ba6c9422fddacbf81d305|3606f724-9b89-7a96-c48b-014cb70f35ec",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697485841971,
    },
    "e-82": {
      id: "e-82",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-81",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        selector: ".sidebar-mobile-menu",
        originalId:
          "652ba6c9422fddacbf81d305|3606f724-9b89-7a96-c48b-014cb70f35ec",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".sidebar-mobile-menu",
          originalId:
            "652ba6c9422fddacbf81d305|3606f724-9b89-7a96-c48b-014cb70f35ec",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697485841972,
    },
    "e-83": {
      id: "e-83",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "653126b2d90dd2c9c3bdd330|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653126b2d90dd2c9c3bdd330|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697719987173,
    },
    "e-84": {
      id: "e-84",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "653126b2d90dd2c9c3bdd330|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653126b2d90dd2c9c3bdd330|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697719987173,
    },
    "e-87": {
      id: "e-87",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-88",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652c03aa161daabd6b289f2e|30c0451b-39a4-7577-e927-378a08828c44",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652c03aa161daabd6b289f2e|30c0451b-39a4-7577-e927-378a08828c44",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697723424272,
    },
    "e-88": {
      id: "e-88",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-87",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652c03aa161daabd6b289f2e|30c0451b-39a4-7577-e927-378a08828c44",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652c03aa161daabd6b289f2e|30c0451b-39a4-7577-e927-378a08828c44",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697723424272,
    },
    "e-91": {
      id: "e-91",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-92",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652be451ac2fb6a71ac9d35a|a79c36ab-ab2b-d289-5a7c-a891cd27fa48",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652be451ac2fb6a71ac9d35a|a79c36ab-ab2b-d289-5a7c-a891cd27fa48",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697724417465,
    },
    "e-92": {
      id: "e-92",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-91",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652be451ac2fb6a71ac9d35a|a79c36ab-ab2b-d289-5a7c-a891cd27fa48",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652be451ac2fb6a71ac9d35a|a79c36ab-ab2b-d289-5a7c-a891cd27fa48",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697724417465,
    },
    "e-95": {
      id: "e-95",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-96",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652803878613658724d059f8|2e945c09-17ff-8b37-a148-16c2e719fc7c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652803878613658724d059f8|2e945c09-17ff-8b37-a148-16c2e719fc7c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697729351140,
    },
    "e-96": {
      id: "e-96",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-95",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652803878613658724d059f8|2e945c09-17ff-8b37-a148-16c2e719fc7c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652803878613658724d059f8|2e945c09-17ff-8b37-a148-16c2e719fc7c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697729351142,
    },
    "e-97": {
      id: "e-97",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-98",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".fade-in",
        originalId:
          "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-in",
          originalId:
            "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697730256636,
    },
    "e-101": {
      id: "e-101",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-102",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".fade-last",
        originalId:
          "652803878613658724d059f8|a64c485f-9caf-a6b6-9e8e-ca083c501c09",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".fade-last",
          originalId:
            "652803878613658724d059f8|a64c485f-9caf-a6b6-9e8e-ca083c501c09",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697730597350,
    },
    "e-103": {
      id: "e-103",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-104",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        selector: ".page-card",
        originalId:
          "652803878613658724d059f8|83c7b739-abe7-cf75-ac01-589cd565dda1",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".page-card",
          originalId:
            "652803878613658724d059f8|83c7b739-abe7-cf75-ac01-589cd565dda1",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697743758970,
    },
    "e-104": {
      id: "e-104",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-103",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        selector: ".page-card",
        originalId:
          "652803878613658724d059f8|83c7b739-abe7-cf75-ac01-589cd565dda1",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".page-card",
          originalId:
            "652803878613658724d059f8|83c7b739-abe7-cf75-ac01-589cd565dda1",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697743758971,
    },
    "e-105": {
      id: "e-105",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65325d147fdd85bf65d51b75|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65325d147fdd85bf65d51b75|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697799444540,
    },
    "e-106": {
      id: "e-106",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65325d147fdd85bf65d51b75|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65325d147fdd85bf65d51b75|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697799444540,
    },
    "e-107": {
      id: "e-107",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652d55c7a0bd46a3c0e10fa1|c40a40f8-d065-ac6a-1bae-17a24a3acfae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d55c7a0bd46a3c0e10fa1|c40a40f8-d065-ac6a-1bae-17a24a3acfae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697812729858,
    },
    "e-108": {
      id: "e-108",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652d55c7a0bd46a3c0e10fa1|c40a40f8-d065-ac6a-1bae-17a24a3acfae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d55c7a0bd46a3c0e10fa1|c40a40f8-d065-ac6a-1bae-17a24a3acfae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697812729858,
    },
    "e-109": {
      id: "e-109",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d55c7a0bd46a3c0e10fa1|c40a40f8-d065-ac6a-1bae-17a24a3acfae",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d55c7a0bd46a3c0e10fa1|c40a40f8-d065-ac6a-1bae-17a24a3acfae",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697812729858,
    },
    "e-112": {
      id: "e-112",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652cfaab192ba076b04504db|8273bfae-8f2c-fe64-6d1f-02e00f543676",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cfaab192ba076b04504db|8273bfae-8f2c-fe64-6d1f-02e00f543676",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697899064191,
    },
    "e-113": {
      id: "e-113",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652cfaab192ba076b04504db|8273bfae-8f2c-fe64-6d1f-02e00f543676",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cfaab192ba076b04504db|8273bfae-8f2c-fe64-6d1f-02e00f543676",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697899064191,
    },
    "e-114": {
      id: "e-114",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652cfaab192ba076b04504db|8273bfae-8f2c-fe64-6d1f-02e00f543676",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cfaab192ba076b04504db|8273bfae-8f2c-fe64-6d1f-02e00f543676",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697899064191,
    },
    "e-115": {
      id: "e-115",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652d0ac3ac2fb6a71a1726fa|87932b2f-cbf3-d714-88a1-c1a648da8396",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d0ac3ac2fb6a71a1726fa|87932b2f-cbf3-d714-88a1-c1a648da8396",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697899636103,
    },
    "e-116": {
      id: "e-116",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652d0ac3ac2fb6a71a1726fa|87932b2f-cbf3-d714-88a1-c1a648da8396",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d0ac3ac2fb6a71a1726fa|87932b2f-cbf3-d714-88a1-c1a648da8396",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697899636103,
    },
    "e-117": {
      id: "e-117",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d0ac3ac2fb6a71a1726fa|87932b2f-cbf3-d714-88a1-c1a648da8396",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d0ac3ac2fb6a71a1726fa|87932b2f-cbf3-d714-88a1-c1a648da8396",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697899636103,
    },
    "e-120": {
      id: "e-120",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-121",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652d0ac3ac2fb6a71a1726fa|23184f1b-f90f-d1d3-ba18-7c5e5ae4e70f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d0ac3ac2fb6a71a1726fa|23184f1b-f90f-d1d3-ba18-7c5e5ae4e70f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697899659163,
    },
    "e-121": {
      id: "e-121",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-120",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652d0ac3ac2fb6a71a1726fa|23184f1b-f90f-d1d3-ba18-7c5e5ae4e70f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d0ac3ac2fb6a71a1726fa|23184f1b-f90f-d1d3-ba18-7c5e5ae4e70f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697899659163,
    },
    "e-122": {
      id: "e-122",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652ba6c9422fddacbf81d305|71bec130-248d-7cae-9ec7-0fea88824e67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba6c9422fddacbf81d305|71bec130-248d-7cae-9ec7-0fea88824e67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697908677141,
    },
    "e-123": {
      id: "e-123",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652ba6c9422fddacbf81d305|71bec130-248d-7cae-9ec7-0fea88824e67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba6c9422fddacbf81d305|71bec130-248d-7cae-9ec7-0fea88824e67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697908677141,
    },
    "e-124": {
      id: "e-124",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652ba6c9422fddacbf81d305|71bec130-248d-7cae-9ec7-0fea88824e67",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba6c9422fddacbf81d305|71bec130-248d-7cae-9ec7-0fea88824e67",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697908677141,
    },
    "e-127": {
      id: "e-127",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6534f0e6d827f09432744dc5|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534f0e6d827f09432744dc5|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697968359201,
    },
    "e-128": {
      id: "e-128",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "6534f0e6d827f09432744dc5|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534f0e6d827f09432744dc5|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697968359201,
    },
    "e-130": {
      id: "e-130",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6534f0e6d827f09432744dc5|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534f0e6d827f09432744dc5|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697968359201,
    },
    "e-133": {
      id: "e-133",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6534fe5d6047abfdf86e3af2|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534fe5d6047abfdf86e3af2|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697971806444,
    },
    "e-134": {
      id: "e-134",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "6534fe5d6047abfdf86e3af2|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534fe5d6047abfdf86e3af2|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697971806444,
    },
    "e-135": {
      id: "e-135",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6534fe5d6047abfdf86e3af2|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534fe5d6047abfdf86e3af2|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697971806444,
    },
    "e-136": {
      id: "e-136",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-30", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d27fb222a1e9f8b137771|528cb2df-36e1-023f-ba54-99334924232d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d27fb222a1e9f8b137771|528cb2df-36e1-023f-ba54-99334924232d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-30-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: true,
          addOffsetValue: 20,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697975572118,
    },
    "e-137": {
      id: "e-137",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-31", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "652d27fb222a1e9f8b137771|1a5b9501-a269-f620-0579-579a3fd7d176",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d27fb222a1e9f8b137771|1a5b9501-a269-f620-0579-579a3fd7d176",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-31-p",
          smoothing: 50,
          startsEntering: false,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: true,
          endOffsetValue: -10,
        },
      ],
      createdOn: 1614984051893,
    },
    "e-138": {
      id: "e-138",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-139",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652bfa58bf55b01d966eba7b|8bf8cb9a-a083-33e7-e87c-63639b419ed5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa58bf55b01d966eba7b|8bf8cb9a-a083-33e7-e87c-63639b419ed5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697984812226,
    },
    "e-139": {
      id: "e-139",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-138",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652bfa58bf55b01d966eba7b|8bf8cb9a-a083-33e7-e87c-63639b419ed5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa58bf55b01d966eba7b|8bf8cb9a-a083-33e7-e87c-63639b419ed5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697984812226,
    },
    "e-140": {
      id: "e-140",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcac",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcac",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697985101448,
    },
    "e-141": {
      id: "e-141",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcac",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcac",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697985101448,
    },
    "e-142": {
      id: "e-142",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcac",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcac",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1697985101448,
    },
    "e-143": {
      id: "e-143",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-144",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcc3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcc3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697985101448,
    },
    "e-144": {
      id: "e-144",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-143",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcc3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa03b05ba5609dc051ae|b01f097b-b040-7b06-9e8a-74baafa6fcc3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1697985101448,
    },
    "e-145": {
      id: "e-145",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "65369ac37c1f4315efca746b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65369ac37c1f4315efca746b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698077379421,
    },
    "e-146": {
      id: "e-146",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "65369ac37c1f4315efca746b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65369ac37c1f4315efca746b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698077379421,
    },
    "e-147": {
      id: "e-147",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65369ac37c1f4315efca746b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65369ac37c1f4315efca746b|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698077379421,
    },
    "e-150": {
      id: "e-150",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-17", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d27fb222a1e9f8b137771|f4e1a6a1-0041-109d-e51c-3e5be33df553",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d27fb222a1e9f8b137771|f4e1a6a1-0041-109d-e51c-3e5be33df553",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-17-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698399607770,
    },
    "e-152": {
      id: "e-152",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-151",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652c03aa161daabd6b289f2e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652c03aa161daabd6b289f2e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698403253778,
    },
    "e-158": {
      id: "e-158",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-157",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652cf294b9b179d7dff8e415",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cf294b9b179d7dff8e415",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698405387298,
    },
    "e-159": {
      id: "e-159",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-160",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652d55c7a0bd46a3c0e10fa1|e343015a-e3b1-792a-2310-525350ff5571",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d55c7a0bd46a3c0e10fa1|e343015a-e3b1-792a-2310-525350ff5571",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698409441866,
    },
    "e-160": {
      id: "e-160",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-159",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652d55c7a0bd46a3c0e10fa1|e343015a-e3b1-792a-2310-525350ff5571",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d55c7a0bd46a3c0e10fa1|e343015a-e3b1-792a-2310-525350ff5571",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698409441866,
    },
    "e-161": {
      id: "e-161",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-162",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "6534f0e6d827f09432744dc5|e0ea6c87-3549-e023-78de-764c6992c7a2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534f0e6d827f09432744dc5|e0ea6c87-3549-e023-78de-764c6992c7a2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698409482441,
    },
    "e-162": {
      id: "e-162",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-161",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "6534f0e6d827f09432744dc5|e0ea6c87-3549-e023-78de-764c6992c7a2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534f0e6d827f09432744dc5|e0ea6c87-3549-e023-78de-764c6992c7a2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698409482441,
    },
    "e-163": {
      id: "e-163",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-164",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652ba6c9422fddacbf81d305|4d8bf2ab-5914-6d57-17b4-ec3abcef25ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba6c9422fddacbf81d305|4d8bf2ab-5914-6d57-17b4-ec3abcef25ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698409556194,
    },
    "e-164": {
      id: "e-164",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-163",
        },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "652ba6c9422fddacbf81d305|4d8bf2ab-5914-6d57-17b4-ec3abcef25ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba6c9422fddacbf81d305|4d8bf2ab-5914-6d57-17b4-ec3abcef25ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698409556194,
    },
    "e-199": {
      id: "e-199",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-5", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "653cdcc05c0d8bb08e2c41b7|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653cdcc05c0d8bb08e2c41b7|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-5-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698487489868,
    },
    "e-200": {
      id: "e-200",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["small", "tiny"],
      target: {
        id: "653cdcc05c0d8bb08e2c41b7|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653cdcc05c0d8bb08e2c41b7|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698487489868,
    },
    "e-201": {
      id: "e-201",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-3", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "653cdcc05c0d8bb08e2c41b7|7401cf9c-a153-0915-7af5-ce552082e014",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653cdcc05c0d8bb08e2c41b7|7401cf9c-a153-0915-7af5-ce552082e014",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-3-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698487489868,
    },
    "e-204": {
      id: "e-204",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-205",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "653cdcc05c0d8bb08e2c41b7|2e945c09-17ff-8b37-a148-16c2e719fc7c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653cdcc05c0d8bb08e2c41b7|2e945c09-17ff-8b37-a148-16c2e719fc7c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698487489868,
    },
    "e-205": {
      id: "e-205",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-204",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "653cdcc05c0d8bb08e2c41b7|2e945c09-17ff-8b37-a148-16c2e719fc7c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653cdcc05c0d8bb08e2c41b7|2e945c09-17ff-8b37-a148-16c2e719fc7c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698487489868,
    },
    "e-207": {
      id: "e-207",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-206",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "653cdcc05c0d8bb08e2c41b7",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653cdcc05c0d8bb08e2c41b7",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698487489868,
    },
    "e-208": {
      id: "e-208",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-209",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65369ac37c1f4315efca746b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65369ac37c1f4315efca746b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698499800221,
    },
    "e-211": {
      id: "e-211",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-210",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6534fe5d6047abfdf86e3af2",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534fe5d6047abfdf86e3af2",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698508756439,
    },
    "e-212": {
      id: "e-212",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-213",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d0ac3ac2fb6a71a1726fa",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d0ac3ac2fb6a71a1726fa",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698508827212,
    },
    "e-215": {
      id: "e-215",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-214",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d55c7a0bd46a3c0e10fa1",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d55c7a0bd46a3c0e10fa1",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698509924572,
    },
    "e-217": {
      id: "e-217",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-216",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652803878613658724d059f8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652803878613658724d059f8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511637358,
    },
    "e-219": {
      id: "e-219",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-218",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d27fb222a1e9f8b137771",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d27fb222a1e9f8b137771",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511657707,
    },
    "e-221": {
      id: "e-221",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-220",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6534f0e6d827f09432744dc5",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6534f0e6d827f09432744dc5",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511755383,
    },
    "e-223": {
      id: "e-223",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-222",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652bfa58bf55b01d966eba7b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa58bf55b01d966eba7b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511791589,
    },
    "e-225": {
      id: "e-225",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-224",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652cfaab192ba076b04504db",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cfaab192ba076b04504db",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511810482,
    },
    "e-227": {
      id: "e-227",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-226",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652ce55ee4e95fb82fc30a7a",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ce55ee4e95fb82fc30a7a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511830033,
    },
    "e-229": {
      id: "e-229",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-228",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652be451ac2fb6a71ac9d35a",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652be451ac2fb6a71ac9d35a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511855267,
    },
    "e-231": {
      id: "e-231",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-230",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652ba6c9422fddacbf81d305",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba6c9422fddacbf81d305",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511873094,
    },
    "e-233": {
      id: "e-233",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-232",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "653126b2d90dd2c9c3bdd330",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653126b2d90dd2c9c3bdd330",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511892799,
    },
    "e-235": {
      id: "e-235",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-234",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65325d147fdd85bf65d51b75",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65325d147fdd85bf65d51b75",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511908685,
    },
    "e-237": {
      id: "e-237",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-236",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d18ba588331f160d553c4",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d18ba588331f160d553c4",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511955352,
    },
    "e-239": {
      id: "e-239",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-238",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652d1543b4f9def31ab34157",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652d1543b4f9def31ab34157",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698511972494,
    },
    "e-241": {
      id: "e-241",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-240",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652cf0e82c26659c8b1240bd",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652cf0e82c26659c8b1240bd",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698512030010,
    },
    "e-243": {
      id: "e-243",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-242",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652bfa03b05ba5609dc051ae",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652bfa03b05ba5609dc051ae",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698512049146,
    },
    "e-245": {
      id: "e-245",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-244",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652ba61287d36e6c6694c54c",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba61287d36e6c6694c54c",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698512078365,
    },
    "e-247": {
      id: "e-247",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-246",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "652ba5fa9c1f4e8c416584ea",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "652ba5fa9c1f4e8c416584ea",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698512110978,
    },
    "e-249": {
      id: "e-249",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_FINISH",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-38",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-248",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6529957ee16404c230e60c57",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6529957ee16404c230e60c57",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1698512140341,
    },
    "e-268": {
      id: "e-268",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-9", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "653cdcc05c0d8bb08e2c41b7|68d71b05-0f3f-b35c-a0dc-ae5f5144f6b1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653cdcc05c0d8bb08e2c41b7|68d71b05-0f3f-b35c-a0dc-ae5f5144f6b1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-9-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698779494431,
    },
    "e-269": {
      id: "e-269",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-10", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "653cdcc05c0d8bb08e2c41b7|68d71b05-0f3f-b35c-a0dc-ae5f5144f6c0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "653cdcc05c0d8bb08e2c41b7|68d71b05-0f3f-b35c-a0dc-ae5f5144f6c0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-10-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698779494431,
    },
    "e-270": {
      id: "e-270",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "65325d147fdd85bf65d51b75|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "65325d147fdd85bf65d51b75|ff65d6ff-cad2-29f0-c41c-b338dc7a8a04",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1698842794231,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Text Link hover - IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hover-link-line",
                  selectorGuids: ["7f22f4df-cb65-1abf-1cca-3fc8a8775543"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hover-link-line",
                  selectorGuids: ["7f22f4df-cb65-1abf-1cca-3fc8a8775543"],
                },
                xValue: 100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697196539970,
    },
    "a-2": {
      id: "a-2",
      title: "Text Link hover - OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.25, 0.25, 0.75, 0.75],
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hover-link-line",
                  selectorGuids: ["7f22f4df-cb65-1abf-1cca-3fc8a8775543"],
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-2-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hover-link-line",
                  selectorGuids: ["7f22f4df-cb65-1abf-1cca-3fc8a8775543"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1697196539970,
    },
    "a-3": {
      id: "a-3",
      title: "Jumbo Text",
      continuousParameterGroups: [
        {
          id: "a-3-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-3-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".jumbo-text-wrapper",
                      selectorGuids: ["a6583cec-7cbc-9543-6240-658a3cde935d"],
                    },
                    xValue: 0,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-3-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".jumbo-text-wrapper",
                      selectorGuids: ["a6583cec-7cbc-9543-6240-658a3cde935d"],
                    },
                    xValue: -50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1697205500162,
    },
    "a-5": {
      id: "a-5",
      title: "Nav scroll - Dekstop",
      continuousParameterGroups: [
        {
          id: "a-5-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 85,
              actionItems: [
                {
                  id: "a-5-n-3",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "SIBLINGS",
                      selector: ".navabar",
                      selectorGuids: ["26436071-7904-9b69-e6e4-ae847a335aa8"],
                    },
                    heightValue: 140,
                    widthUnit: "PX",
                    heightUnit: "px",
                    locked: false,
                  },
                },
                {
                  id: "a-5-n",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".navbar-scroll-bg",
                      selectorGuids: ["8b5a01e7-25f0-880b-732d-9615d0626811"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-5-n-2",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".navbar-scroll-bg",
                      selectorGuids: ["8b5a01e7-25f0-880b-732d-9615d0626811"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-5-n-4",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "SIBLINGS",
                      selector: ".navabar",
                      selectorGuids: ["26436071-7904-9b69-e6e4-ae847a335aa8"],
                    },
                    heightValue: 92,
                    widthUnit: "PX",
                    heightUnit: "px",
                    locked: false,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1697208802392,
    },
    "a-7": {
      id: "a-7",
      title: "Nav Scroll - Mobile",
      continuousParameterGroups: [
        {
          id: "a-7-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 85,
              actionItems: [
                {
                  id: "a-7-n",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "SIBLINGS",
                      selector: ".navabar",
                      selectorGuids: ["26436071-7904-9b69-e6e4-ae847a335aa8"],
                    },
                    heightValue: 80,
                    widthUnit: "PX",
                    heightUnit: "px",
                    locked: false,
                  },
                },
                {
                  id: "a-7-n-2",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".navbar-scroll-bg",
                      selectorGuids: ["8b5a01e7-25f0-880b-732d-9615d0626811"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-7-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".navbar-scroll-bg",
                      selectorGuids: ["8b5a01e7-25f0-880b-732d-9615d0626811"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-7-n-4",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "SIBLINGS",
                      selector: ".navabar",
                      selectorGuids: ["26436071-7904-9b69-e6e4-ae847a335aa8"],
                    },
                    heightValue: 64,
                    widthUnit: "PX",
                    heightUnit: "px",
                    locked: false,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1697208802392,
    },
    "a-9": {
      id: "a-9",
      title: "Scroll Card Image Overlay",
      continuousParameterGroups: [
        {
          id: "a-9-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-9-n-4",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "652803878613658724d059f8|5819e586-abbf-9a01-41d8-888222458cd6",
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-9-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "652803878613658724d059f8|5819e586-abbf-9a01-41d8-888222458cd6",
                    },
                    yValue: 10,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 34,
              actionItems: [
                {
                  id: "a-9-n",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".scroll-card-image._2",
                      selectorGuids: [
                        "7e2f5578-72dc-c40c-61c8-9dcc90171460",
                        "55baa9e4-fe49-f0b7-3bd0-8d4703cc3e7e",
                      ],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-9-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "652803878613658724d059f8|5819e586-abbf-9a01-41d8-888222458cd6",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-9-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "652803878613658724d059f8|5819e586-abbf-9a01-41d8-888222458cd6",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 37,
              actionItems: [
                {
                  id: "a-9-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".scroll-card-image._2",
                      selectorGuids: [
                        "7e2f5578-72dc-c40c-61c8-9dcc90171460",
                        "55baa9e4-fe49-f0b7-3bd0-8d4703cc3e7e",
                      ],
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1697269949893,
    },
    "a-10": {
      id: "a-10",
      title: "Scroll Card Image Overlay 2",
      continuousParameterGroups: [
        {
          id: "a-10-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-10-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "652803878613658724d059f8|3bc370a0-29c6-9d3f-8dc7-d00ffde95687",
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-10-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "652803878613658724d059f8|3bc370a0-29c6-9d3f-8dc7-d00ffde95687",
                    },
                    yValue: 10,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 34,
              actionItems: [
                {
                  id: "a-10-n",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".scroll-card-image._3",
                      selectorGuids: [
                        "7e2f5578-72dc-c40c-61c8-9dcc90171460",
                        "27a92056-688a-7e8d-8337-74cbcb02ce22",
                      ],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-10-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "652803878613658724d059f8|3bc370a0-29c6-9d3f-8dc7-d00ffde95687",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-10-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: true,
                      id: "652803878613658724d059f8|3bc370a0-29c6-9d3f-8dc7-d00ffde95687",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 37,
              actionItems: [
                {
                  id: "a-10-n-2",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".scroll-card-image._3",
                      selectorGuids: [
                        "7e2f5578-72dc-c40c-61c8-9dcc90171460",
                        "27a92056-688a-7e8d-8337-74cbcb02ce22",
                      ],
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1697269949893,
    },
    "a-11": {
      id: "a-11",
      title: "Accordion OPEN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".accordion-content",
                  selectorGuids: ["c99ea8ae-3b28-14e1-2549-b4da5559d64c"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-11-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".accordion-line.open",
                  selectorGuids: [
                    "128e8ac9-b806-df55-acb9-83ef3b4a8b80",
                    "64d03b9c-12b4-d33b-cc42-0632276c2d99",
                  ],
                },
                zValue: 90,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 350,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".accordion-content",
                  selectorGuids: ["c99ea8ae-3b28-14e1-2549-b4da5559d64c"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-11-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".accordion-line.open",
                  selectorGuids: [
                    "128e8ac9-b806-df55-acb9-83ef3b4a8b80",
                    "64d03b9c-12b4-d33b-cc42-0632276c2d99",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697281221689,
    },
    "a-12": {
      id: "a-12",
      title: "Accordion CLOSE",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".accordion-content",
                  selectorGuids: ["c99ea8ae-3b28-14e1-2549-b4da5559d64c"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-12-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".accordion-line.open",
                  selectorGuids: [
                    "128e8ac9-b806-df55-acb9-83ef3b4a8b80",
                    "64d03b9c-12b4-d33b-cc42-0632276c2d99",
                  ],
                },
                zValue: 90,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1697281221689,
    },
    "a-14": {
      id: "a-14",
      title: "Overlay Menu - OPEN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-14-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".ovelray-menu-container",
                  selectorGuids: ["06a7cb18-59ee-e1fc-4d90-ccbcca7e9c69"],
                },
                value: "none",
              },
            },
            {
              id: "a-14-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".overlay-menu",
                  selectorGuids: ["c92374c2-9b6f-9677-2920-189edbe87882"],
                },
                value: "none",
              },
            },
            {
              id: "a-14-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".overlay-menu",
                  selectorGuids: ["c92374c2-9b6f-9677-2920-189edbe87882"],
                },
                widthValue: 100,
                heightValue: 0,
                widthUnit: "vw",
                heightUnit: "vh",
                locked: false,
              },
            },
            {
              id: "a-14-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".ovelray-menu-container",
                  selectorGuids: ["06a7cb18-59ee-e1fc-4d90-ccbcca7e9c69"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-14-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".overlay-nav-text",
                  selectorGuids: ["10cd0ad6-f7bd-d146-cc6a-90c447bb6ecf"],
                },
                yValue: 120,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-14-n-11",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".overlay-nav-text",
                  selectorGuids: ["10cd0ad6-f7bd-d146-cc6a-90c447bb6ecf"],
                },
                zValue: 3,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-14-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".overlay-nav.right",
                  selectorGuids: [
                    "bbe75d7a-1e01-bb0f-80c5-814b9d570e01",
                    "ff2d9709-7f7e-5b15-0d89-e8b5696463dd",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-14-n-15",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.top",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "f9588817-9aa3-1f49-227d-c8be50cd28b6",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-14-n-16",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.bottom",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "43c62c68-f5e1-9092-5f5f-ae6f4da9465e",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-14-n-21",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.bottom",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "43c62c68-f5e1-9092-5f5f-ae6f4da9465e",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-14-n-23",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.top",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "f9588817-9aa3-1f49-227d-c8be50cd28b6",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-17",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.bottom",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "43c62c68-f5e1-9092-5f5f-ae6f4da9465e",
                  ],
                },
                zValue: -45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-14-n-18",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.top",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "f9588817-9aa3-1f49-227d-c8be50cd28b6",
                  ],
                },
                zValue: 45,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-14-n-22",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.bottom",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "43c62c68-f5e1-9092-5f5f-ae6f4da9465e",
                  ],
                },
                yValue: -4.5,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-14-n-24",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.top",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "f9588817-9aa3-1f49-227d-c8be50cd28b6",
                  ],
                },
                yValue: 3,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".overlay-menu",
                  selectorGuids: ["c92374c2-9b6f-9677-2920-189edbe87882"],
                },
                value: "flex",
              },
            },
            {
              id: "a-14-n-5",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 340,
                target: {
                  selector: ".overlay-menu",
                  selectorGuids: ["c92374c2-9b6f-9677-2920-189edbe87882"],
                },
                widthValue: 100,
                heightValue: 100,
                widthUnit: "vw",
                heightUnit: "vh",
                locked: false,
              },
            },
            {
              id: "a-14-n-6",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".ovelray-menu-container",
                  selectorGuids: ["06a7cb18-59ee-e1fc-4d90-ccbcca7e9c69"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".ovelray-menu-container",
                  selectorGuids: ["06a7cb18-59ee-e1fc-4d90-ccbcca7e9c69"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-14-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 600,
                target: {
                  selector: ".overlay-nav-text",
                  selectorGuids: ["10cd0ad6-f7bd-d146-cc6a-90c447bb6ecf"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-14-n-12",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 500,
                target: {
                  selector: ".overlay-nav-text",
                  selectorGuids: ["10cd0ad6-f7bd-d146-cc6a-90c447bb6ecf"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-14-n-14",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".overlay-nav.right",
                  selectorGuids: [
                    "bbe75d7a-1e01-bb0f-80c5-814b9d570e01",
                    "ff2d9709-7f7e-5b15-0d89-e8b5696463dd",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-25",
              actionTypeId: "PLUGIN_VARIABLE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                value: {},
                target: {
                  useEventTarget: true,
                  id: "8988c782-05ec-c465-004b-259cfc6c99a7",
                },
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697366266617,
    },
    "a-15": {
      id: "a-15",
      title: "Overlay Menu - CLOSE",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 300,
                target: {
                  selector: ".overlay-nav.right",
                  selectorGuids: [
                    "bbe75d7a-1e01-bb0f-80c5-814b9d570e01",
                    "ff2d9709-7f7e-5b15-0d89-e8b5696463dd",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-15-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 300,
                target: {
                  selector: ".overlay-nav-text",
                  selectorGuids: ["10cd0ad6-f7bd-d146-cc6a-90c447bb6ecf"],
                },
                yValue: 120,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-15-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 300,
                target: {
                  selector: ".overlay-nav-text",
                  selectorGuids: ["10cd0ad6-f7bd-d146-cc6a-90c447bb6ecf"],
                },
                zValue: 3,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-8",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.top",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "f9588817-9aa3-1f49-227d-c8be50cd28b6",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-15-n-9",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.bottom",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "43c62c68-f5e1-9092-5f5f-ae6f4da9465e",
                  ],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-15-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.bottom",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "43c62c68-f5e1-9092-5f5f-ae6f4da9465e",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-15-n-11",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-line.top",
                  selectorGuids: [
                    "a55db6c1-c727-b393-3171-d359b7a5cd4b",
                    "f9588817-9aa3-1f49-227d-c8be50cd28b6",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".ovelray-menu-container",
                  selectorGuids: ["06a7cb18-59ee-e1fc-4d90-ccbcca7e9c69"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".ovelray-menu-container",
                  selectorGuids: ["06a7cb18-59ee-e1fc-4d90-ccbcca7e9c69"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 300,
                target: {
                  selector: ".overlay-menu",
                  selectorGuids: ["c92374c2-9b6f-9677-2920-189edbe87882"],
                },
                widthValue: 100,
                heightValue: 0,
                widthUnit: "vw",
                heightUnit: "vh",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".overlay-menu",
                  selectorGuids: ["c92374c2-9b6f-9677-2920-189edbe87882"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1697366266617,
    },
    "a-16": {
      id: "a-16",
      title: "Hero Scroll",
      continuousParameterGroups: [
        {
          id: "a-16-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-16-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-media",
                      selectorGuids: ["8df898f2-fb4f-6b8e-de22-88a0ac2f4b2b"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 75,
              actionItems: [
                {
                  id: "a-16-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-text",
                      selectorGuids: ["05239daf-f7c3-fe24-e51b-c369a4de1a7d"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 83,
              actionItems: [
                {
                  id: "a-16-n-4",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-text",
                      selectorGuids: ["05239daf-f7c3-fe24-e51b-c369a4de1a7d"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-16-n-7",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".button.small.nav-button",
                      selectorGuids: [
                        "e0512d08-8c2d-3cfc-6768-e596b882f228",
                        "ceddc2ab-8bc0-6d3a-cacb-d0e7a3b26883",
                        "9ffff23e-aadf-bc53-fe8d-edf00ae0887f",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 124,
                    bValue: 44,
                    gValue: 40,
                    aValue: 1,
                  },
                },
                {
                  id: "a-16-n-8",
                  actionTypeId: "STYLE_BORDER",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".button.small.nav-button",
                      selectorGuids: [
                        "e0512d08-8c2d-3cfc-6768-e596b882f228",
                        "ceddc2ab-8bc0-6d3a-cacb-d0e7a3b26883",
                        "9ffff23e-aadf-bc53-fe8d-edf00ae0887f",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 124,
                    bValue: 44,
                    gValue: 40,
                    aValue: 1,
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-16-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-media",
                      selectorGuids: ["8df898f2-fb4f-6b8e-de22-88a0ac2f4b2b"],
                    },
                    xValue: 1.15,
                    yValue: 1.15,
                    locked: true,
                  },
                },
                {
                  id: "a-16-n-5",
                  actionTypeId: "STYLE_BACKGROUND_COLOR",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".button.small.nav-button",
                      selectorGuids: [
                        "e0512d08-8c2d-3cfc-6768-e596b882f228",
                        "ceddc2ab-8bc0-6d3a-cacb-d0e7a3b26883",
                        "9ffff23e-aadf-bc53-fe8d-edf00ae0887f",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 145,
                    bValue: 128,
                    gValue: 134,
                    aValue: 1,
                  },
                },
                {
                  id: "a-16-n-6",
                  actionTypeId: "STYLE_BORDER",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".button.small.nav-button",
                      selectorGuids: [
                        "e0512d08-8c2d-3cfc-6768-e596b882f228",
                        "ceddc2ab-8bc0-6d3a-cacb-d0e7a3b26883",
                        "9ffff23e-aadf-bc53-fe8d-edf00ae0887f",
                      ],
                    },
                    globalSwatchId: "",
                    rValue: 145,
                    bValue: 128,
                    gValue: 134,
                    aValue: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1697372609333,
    },
    "a-17": {
      id: "a-17",
      title: "Video Zoom",
      continuousParameterGroups: [
        {
          id: "a-17-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-17-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video-section-video",
                      selectorGuids: ["4eeda19d-8287-8310-7410-d50b5d8fbdec"],
                    },
                    xValue: 0.9,
                    yValue: 0.9,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 48,
              actionItems: [
                {
                  id: "a-17-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".video-section-video",
                      selectorGuids: ["4eeda19d-8287-8310-7410-d50b5d8fbdec"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1697383563528,
    },
    "a-21": {
      id: "a-21",
      title: "Mobile - Sidebar Menu OPEN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".sidebar-nav-list",
                  selectorGuids: ["20531f07-9ba0-2cfa-2769-a1bc6665560f"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".sidebar-nav-list",
                  selectorGuids: ["20531f07-9ba0-2cfa-2769-a1bc6665560f"],
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697485844865,
    },
    "a-22": {
      id: "a-22",
      title: "Mobile - Sidebar Menu CLOSE",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-22-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".sidebar-nav-list",
                  selectorGuids: ["20531f07-9ba0-2cfa-2769-a1bc6665560f"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1697485844865,
    },
    "a-23": {
      id: "a-23",
      title: "Mobile - Widget Collapse - IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-23-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".widget-row-menu",
                  selectorGuids: ["4ed73368-4645-d3a9-6a6f-fa6e2184e8cf"],
                },
                value: "none",
              },
            },
            {
              id: "a-23-n-3",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".quick-links-mobile",
                  selectorGuids: ["379c9def-a9a7-9bd0-c52b-9df652ebab0f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-23-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".quick-links-mobile",
                  selectorGuids: ["379c9def-a9a7-9bd0-c52b-9df652ebab0f"],
                },
                zValue: 180,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
            {
              id: "a-23-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".widget-row-menu",
                  selectorGuids: ["4ed73368-4645-d3a9-6a6f-fa6e2184e8cf"],
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697723166463,
    },
    "a-24": {
      id: "a-24",
      title: "Mobile - Widget Collapse - OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-24-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".widget-row-menu",
                  selectorGuids: ["4ed73368-4645-d3a9-6a6f-fa6e2184e8cf"],
                },
                value: "none",
              },
            },
            {
              id: "a-24-n-2",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".quick-links-mobile",
                  selectorGuids: ["379c9def-a9a7-9bd0-c52b-9df652ebab0f"],
                },
                zValue: 0,
                xUnit: "DEG",
                yUnit: "DEG",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1697723166463,
    },
    "a-25": {
      id: "a-25",
      title: "Featured event hover - IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".featured-event-arrow",
                  selectorGuids: ["2adf723e-86e8-c1e8-8d45-cd56bbc4c4c0"],
                },
                value: "none",
              },
            },
            {
              id: "a-25-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".featured-event-arrow",
                  selectorGuids: ["2adf723e-86e8-c1e8-8d45-cd56bbc4c4c0"],
                },
                xValue: 1.1,
                yValue: 1.1,
                locked: true,
              },
            },
            {
              id: "a-25-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".featured-event-arrow",
                  selectorGuids: ["2adf723e-86e8-c1e8-8d45-cd56bbc4c4c0"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-25-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".widget-info",
                  selectorGuids: ["93524813-2843-1d47-c659-cffe484ab2e0"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".featured-event-arrow",
                  selectorGuids: ["2adf723e-86e8-c1e8-8d45-cd56bbc4c4c0"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".featured-event-arrow",
                  selectorGuids: ["2adf723e-86e8-c1e8-8d45-cd56bbc4c4c0"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-25-n-6",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".featured-event-arrow",
                  selectorGuids: ["2adf723e-86e8-c1e8-8d45-cd56bbc4c4c0"],
                },
                xValue: 0.9,
                yValue: 0.9,
                locked: true,
              },
            },
            {
              id: "a-25-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".widget-info",
                  selectorGuids: ["93524813-2843-1d47-c659-cffe484ab2e0"],
                },
                xValue: 2,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697729353967,
    },
    "a-26": {
      id: "a-26",
      title: "Featured event hover - OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 280,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".featured-event-arrow",
                  selectorGuids: ["2adf723e-86e8-c1e8-8d45-cd56bbc4c4c0"],
                },
                xValue: 1.1,
                yValue: 1.1,
                locked: true,
              },
            },
            {
              id: "a-26-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 280,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".featured-event-arrow",
                  selectorGuids: ["2adf723e-86e8-c1e8-8d45-cd56bbc4c4c0"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-26-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 360,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".widget-info",
                  selectorGuids: ["93524813-2843-1d47-c659-cffe484ab2e0"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".featured-event-arrow",
                  selectorGuids: ["2adf723e-86e8-c1e8-8d45-cd56bbc4c4c0"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1697729353967,
    },
    "a-27": {
      id: "a-27",
      title: "Content fade",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-27-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-27-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
                },
                yValue: -3,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 650,
                target: {
                  useEventTarget: true,
                  id: "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-27-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 650,
                target: {
                  useEventTarget: true,
                  id: "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697730259606,
    },
    "a-28": {
      id: "a-28",
      title: "Content fade last",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-28-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
                },
                yValue: 4,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 650,
                target: {
                  useEventTarget: true,
                  id: "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-28-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 650,
                target: {
                  useEventTarget: true,
                  id: "652803878613658724d059f8|ed992921-0f0b-b748-17ef-c29f71a1c9c3",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697730259606,
    },
    "a-19": {
      id: "a-19",
      title: "Page Card - Hover IN",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-19-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".grid-image",
                  selectorGuids: ["e885a8ff-1df2-f2d5-7e11-d9531ed48bbf"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-19-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".grid-image",
                  selectorGuids: ["e885a8ff-1df2-f2d5-7e11-d9531ed48bbf"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-19-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-line",
                  selectorGuids: ["3ebe00d4-8ce6-baac-93ae-9d9b7383a333"],
                },
                widthValue: 40,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-19-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".page-card",
                  selectorGuids: ["912238c8-213c-0e93-5951-fd8036e78500"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-19-n-5",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: [0.445, 0.05, 0.55, 0.95],
                duration: 450,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".grid-image",
                  selectorGuids: ["e885a8ff-1df2-f2d5-7e11-d9531ed48bbf"],
                },
                xValue: 1.1,
                yValue: 1.1,
                locked: true,
              },
            },
            {
              id: "a-19-n-8",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-line",
                  selectorGuids: ["3ebe00d4-8ce6-baac-93ae-9d9b7383a333"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-19-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 280,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".grid-image",
                  selectorGuids: ["e885a8ff-1df2-f2d5-7e11-d9531ed48bbf"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-19-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 350,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".page-card",
                  selectorGuids: ["912238c8-213c-0e93-5951-fd8036e78500"],
                },
                yValue: -16,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1697462304595,
    },
    "a-29": {
      id: "a-29",
      title: "Page Card - Hover OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-29-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 350,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".grid-image",
                  selectorGuids: ["e885a8ff-1df2-f2d5-7e11-d9531ed48bbf"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-29-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 350,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".grid-image",
                  selectorGuids: ["e885a8ff-1df2-f2d5-7e11-d9531ed48bbf"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-29-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 450,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-line",
                  selectorGuids: ["3ebe00d4-8ce6-baac-93ae-9d9b7383a333"],
                },
                widthValue: 40,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-29-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 320,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".page-card",
                  selectorGuids: ["912238c8-213c-0e93-5951-fd8036e78500"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1697462304595,
    },
    "a-30": {
      id: "a-30",
      title: "Discover animation",
      continuousParameterGroups: [
        {
          id: "a-30-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-30-n",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-mark",
                      selectorGuids: ["5879616e-8b65-f06a-1c7f-917f1d7966c6"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-30-n-14",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-mark",
                      selectorGuids: ["5879616e-8b65-f06a-1c7f-917f1d7966c6"],
                    },
                    xValue: 1.3,
                    yValue: 1.3,
                    locked: true,
                  },
                },
                {
                  id: "a-30-n-15",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-mark",
                      selectorGuids: ["5879616e-8b65-f06a-1c7f-917f1d7966c6"],
                    },
                    xValue: -50,
                    yValue: -50,
                    xUnit: "%",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-30-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-top",
                      selectorGuids: ["d329eadb-d201-ef80-3c5e-1568b1e7421f"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-30-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-top",
                      selectorGuids: ["d329eadb-d201-ef80-3c5e-1568b1e7421f"],
                    },
                    xValue: 0,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-30-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-bottom",
                      selectorGuids: ["49ff05a2-224b-2055-b1fc-acd8c50437c0"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-30-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-bottom",
                      selectorGuids: ["49ff05a2-224b-2055-b1fc-acd8c50437c0"],
                    },
                    xValue: 0,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 1,
              actionItems: [
                {
                  id: "a-30-n-17",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-mark",
                      selectorGuids: ["5879616e-8b65-f06a-1c7f-917f1d7966c6"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 8,
              actionItems: [
                {
                  id: "a-30-n-12",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-top",
                      selectorGuids: ["d329eadb-d201-ef80-3c5e-1568b1e7421f"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-30-n-13",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-bottom",
                      selectorGuids: ["49ff05a2-224b-2055-b1fc-acd8c50437c0"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 16,
              actionItems: [
                {
                  id: "a-30-n-7",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-mark",
                      selectorGuids: ["5879616e-8b65-f06a-1c7f-917f1d7966c6"],
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 24,
              actionItems: [
                {
                  id: "a-30-n-8",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-top",
                      selectorGuids: ["d329eadb-d201-ef80-3c5e-1568b1e7421f"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-30-n-9",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-bottom",
                      selectorGuids: ["49ff05a2-224b-2055-b1fc-acd8c50437c0"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 63,
              actionItems: [
                {
                  id: "a-30-n-18",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-top",
                      selectorGuids: ["d329eadb-d201-ef80-3c5e-1568b1e7421f"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-30-n-19",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-bottom",
                      selectorGuids: ["49ff05a2-224b-2055-b1fc-acd8c50437c0"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 64,
              actionItems: [
                {
                  id: "a-30-n-22",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-section-intro",
                      selectorGuids: ["f093489a-865f-72aa-1fd5-60d0b5aac6ba"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-30-n-16",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-mark",
                      selectorGuids: ["5879616e-8b65-f06a-1c7f-917f1d7966c6"],
                    },
                    xValue: 0.3,
                    yValue: 0.3,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 87,
              actionItems: [
                {
                  id: "a-30-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-top",
                      selectorGuids: ["d329eadb-d201-ef80-3c5e-1568b1e7421f"],
                    },
                    xValue: 100,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-30-n-11",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-bottom",
                      selectorGuids: ["49ff05a2-224b-2055-b1fc-acd8c50437c0"],
                    },
                    xValue: -100,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 88,
              actionItems: [
                {
                  id: "a-30-n-20",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-top",
                      selectorGuids: ["d329eadb-d201-ef80-3c5e-1568b1e7421f"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-30-n-21",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-text-bottom",
                      selectorGuids: ["49ff05a2-224b-2055-b1fc-acd8c50437c0"],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-30-n-23",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".discover-section-intro",
                      selectorGuids: ["f093489a-865f-72aa-1fd5-60d0b5aac6ba"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1697975575198,
    },
    "a-31": {
      id: "a-31",
      title: "Discover Card Scroll",
      continuousParameterGroups: [
        {
          id: "a-31-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-31-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".track-frame",
                      selectorGuids: ["9d8b0fe3-519f-071e-4ae2-18fce74dbb41"],
                    },
                    xValue: 20,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-31-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".track-frame",
                      selectorGuids: ["9d8b0fe3-519f-071e-4ae2-18fce74dbb41"],
                    },
                    xValue: -100,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1614809802674,
    },
    "a-38": {
      id: "a-38",
      title: "Page Preloader",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-38-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".preloader",
                  selectorGuids: ["64493f6e-9e76-2bfe-31d7-440c64463574"],
                },
                value: "flex",
              },
            },
            {
              id: "a-38-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".page-wrapper",
                  selectorGuids: ["7547c88c-b061-6e21-81f5-2fab3f10b2fc"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-38-n-6",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 700,
                target: {
                  selector: ".preloader",
                  selectorGuids: ["64493f6e-9e76-2bfe-31d7-440c64463574"],
                },
                heightValue: 100,
                widthUnit: "PX",
                heightUnit: "vh",
                locked: false,
              },
            },
            {
              id: "a-38-n-9",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".hero-text",
                  selectorGuids: ["05239daf-f7c3-fe24-e51b-c369a4de1a7d"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-38-n-12",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".hero-widgets",
                  selectorGuids: ["c8085f7c-5674-b6a3-3b5b-c4d4118a4a9a"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-38-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".hero-widgets",
                  selectorGuids: ["c8085f7c-5674-b6a3-3b5b-c4d4118a4a9a"],
                },
                yValue: 15,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-38-n-16",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".hero-text",
                  selectorGuids: ["05239daf-f7c3-fe24-e51b-c369a4de1a7d"],
                },
                yValue: 15,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-38-n-17",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: { id: "f2abfb6e-b5f3-d6e2-9e32-28e96bdab776" },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-38-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 1000,
                easing: [0.455, 0.03, 0.515, 0.955],
                duration: 620,
                target: {
                  selector: ".preloader",
                  selectorGuids: ["64493f6e-9e76-2bfe-31d7-440c64463574"],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "vh",
                locked: false,
              },
            },
            {
              id: "a-38-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1000,
                easing: "",
                duration: 500,
                target: {
                  selector: ".hero-text",
                  selectorGuids: ["05239daf-f7c3-fe24-e51b-c369a4de1a7d"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-38-n-18",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1000,
                easing: "",
                duration: 260,
                target: { id: "f2abfb6e-b5f3-d6e2-9e32-28e96bdab776" },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-38-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1300,
                easing: "",
                duration: 400,
                target: {
                  selector: ".page-wrapper",
                  selectorGuids: ["7547c88c-b061-6e21-81f5-2fab3f10b2fc"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-38-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 610,
                target: {
                  selector: ".hero-text",
                  selectorGuids: ["05239daf-f7c3-fe24-e51b-c369a4de1a7d"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-38-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".hero-text",
                  selectorGuids: ["05239daf-f7c3-fe24-e51b-c369a4de1a7d"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-38-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".hero-widgets",
                  selectorGuids: ["c8085f7c-5674-b6a3-3b5b-c4d4118a4a9a"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-38-n-15",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: [0.25, 0.46, 0.45, 0.94],
                duration: 710,
                target: {
                  selector: ".hero-widgets",
                  selectorGuids: ["c8085f7c-5674-b6a3-3b5b-c4d4118a4a9a"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-38-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".preloader",
                  selectorGuids: ["64493f6e-9e76-2bfe-31d7-440c64463574"],
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1698507677067,
    },
    "a-37": {
      id: "a-37",
      title: "DEMO - Image Scroll",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-37-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "65369ac37c1f4315efca746b|ef4d61ad-5086-c4c5-2790-a7f625e596c4",
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-37-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 45000,
                target: {
                  id: "65369ac37c1f4315efca746b|ef4d61ad-5086-c4c5-2790-a7f625e596c4",
                },
                xValue: -48,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-37-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "65369ac37c1f4315efca746b|ef4d61ad-5086-c4c5-2790-a7f625e596c4",
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1698499803206,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
