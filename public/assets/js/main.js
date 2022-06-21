/*
 * HSCore
 * @version: 4.0.0 (01 June, 2021)
 * @author: HtmlStream
 * @event-namespace: .HSCore
 * @license: Htmlstream Libraries (https://htmlstream.com/licenses)
 * Copyright 2021 Htmlstream
 */
"use strict";
const HSCore = {
    init: () => {
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function(t) {
            return new bootstrap.Tooltip(t)
        })), [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map((function(t) {
            return new bootstrap.Popover(t)
        }))
    },
    components: {}
};
HSCore.init();
const HSBsDropdown = {
        init(t) {
            this.setAnimations(), this.openOnHover()
        },
        setAnimations() {
            window.addEventListener("show.bs.dropdown", t => {
                if (!t.target.hasAttribute("data-bs-dropdown-animation")) return;
                const e = t.target.nextElementSibling;
                e.style.opacity = 0, setTimeout(() => {
                    e.style.transform = e.style.transform + " translateY(10px)"
                }), setTimeout(() => {
                    e.style.transform = e.style.transform + " translateY(-10px)", e.style.transition = "transform 300ms, opacity 300ms", e.style.opacity = 1
                }, 100)
            }), window.addEventListener("hide.bs.dropdown", t => {
                if (!t.target.hasAttribute("data-bs-dropdown-animation")) return;
                const e = t.target.nextElementSibling;
                setTimeout(() => {
                    e.style.removeProperty("transform"), e.style.removeProperty("transition")
                })
            })
        },
        openOnHover() {
            Array.from(document.querySelectorAll("[data-bs-open-on-hover]")).forEach(t => {
                var e;
                const i = new bootstrap.Dropdown(t);

                function o() {
                    e = setTimeout(() => {
                        i.hide()
                    }, 500)
                }
                t.addEventListener("mouseenter", () => {
                    clearTimeout(e), i.show()
                }), i._menu.addEventListener("mouseenter", () => {
                    window.clearTimeout(e)
                }), Array.from([i._menu, t]).forEach(t => t.addEventListener("mouseleave", o))
            })
        }
    },
    validators = {
        "data-hs-validation-equal-field": t => {
            const e = document.querySelector(t.getAttribute("data-hs-validation-equal-field"));
            t.addEventListener("input", i => {
                e.value.toString().toLocaleLowerCase() !== i.target.value.toString().toLocaleLowerCase() ? t.setCustomValidity("qual-field") : t.setCustomValidity(""), HSBsValidation.updateFieldStete(t)
            }), e.addEventListener("input", e => {
                t.value.toString().toLocaleLowerCase() !== e.target.value.toString().toLocaleLowerCase() ? t.setCustomValidity("qual-field") : t.setCustomValidity(""), HSBsValidation.updateFieldStete(t)
            })
        }
    },
    HSBsValidation = {
        init(t, e) {
            var i = document.querySelectorAll(t);
            return Array.prototype.slice.call(i).forEach(t => {
                for (const e in validators) Array.prototype.slice.call(t.querySelectorAll(`[${e}]`)).forEach(validators[e]);
                this.addVlidationListners(t.elements), t.addEventListener("submit", i => {
                    t.checkValidity() ? this.onSubmit({
                        event: i,
                        form: t,
                        options: e
                    }) : (i.preventDefault(), i.stopPropagation(), this.checkFieldsState(t.elements)), t.classList.add("was-validated")
                }, !1)
            }), this
        },
        addVlidationListners(t) {
            Array.prototype.slice.call(t).forEach(t => {
                const e = t.closest("[data-hs-validation-validate-class]");
                e && (t.addEventListener("input", t => this.updateFieldStete(t.target)), t.addEventListener("focus", t => e.classList.add("focus")), t.addEventListener("blur", t => e.classList.remove("focus")))
            })
        },
        checkFieldsState(t) {
            Array.prototype.slice.call(t).forEach(t => this.updateFieldStete(t))
        },
        updateFieldStete(t) {
            const e = t.closest("[data-hs-validation-validate-class]");
            e && (t.checkValidity() ? (e.classList.add("is-valid"), e.classList.remove("is-invalid")) : (e.classList.add("is-invalid"), e.classList.remove("is-valid")))
        },
        onSubmit: t => !(!t.options || "function" != typeof t.options.onSubmit) && t.options.onSubmit(t)
    }
/*
 * Chart.js wrapper
 * @version: 3.0.0 (Mon, 25 Nov 2021)
 * @requires: Chart.js v2.8.0
 * @author: HtmlStream
 * @event-namespace: .HSCore.components.HSValidation
 * @license: Htmlstream Libraries (https://htmlstream.com/licenses)
 * Copyright 2021 Htmlstream
 */
;

function isObject(t) {
    return t && "object" == typeof t && !Array.isArray(t)
}

function mergeDeep(t, ...e) {
    if (!e.length) return t;
    const i = e.shift();
    if (isObject(t) && isObject(i))
        for (const e in i) isObject(i[e]) ? (t[e] || Object.assign(t, {
            [e]: {}
        }), mergeDeep(t[e], i[e])) : Object.assign(t, {
            [e]: i[e]
        });
    return mergeDeep(t, ...e)
}
/*
 * Leaflet wrapper
 * @version: 2.0.0 (Sat, 22 May 2021)
 * @requires: Leafletjs v1.6.0
 * @author: HtmlStream
 * @event-namespace: .HSCore.components.HSLeaflet
 * @license: Htmlstream Libraries (https://htmlstream.com/licenses)
 * Copyright 2021 Htmlstream
 */
function isObject(t) {
    return t && "object" == typeof t && !Array.isArray(t)
}

function mergeDeep(t, ...e) {
    if (!e.length) return t;
    const i = e.shift();
    if (isObject(t) && isObject(i))
        for (const e in i) isObject(i[e]) ? (t[e] || Object.assign(t, {
            [e]: {}
        }), mergeDeep(t[e], i[e])) : Object.assign(t, {
            [e]: i[e]
        });
    return mergeDeep(t, ...e)
}
HSCore.components.HSChartJS = {
        init: function(t, e) {
            if (this.$el = "string" == typeof t ? document.querySelector(t) : t, this.$el) {
                this.defaults = {
                    options: {
                        responsive: !0,
                        maintainAspectRatio: !1,
                        legend: {
                            display: !1
                        },
                        tooltips: {
                            enabled: !1,
                            mode: "nearest",
                            prefix: "",
                            postfix: "",
                            hasIndicator: !1,
                            indicatorWidth: "8px",
                            indicatorHeight: "8px",
                            transition: "0.2s",
                            lineWithLineColor: null,
                            yearStamp: !0
                        },
                        gradientPosition: {
                            x0: 0,
                            y0: 0,
                            x1: 0,
                            y1: 0
                        }
                    }
                };
                var i = this.$el.hasAttribute("data-hs-chartjs-options") ? JSON.parse(this.$el.getAttribute("data-hs-chartjs-options")) : {};
                return this.settings = mergeDeep(this.defaults, { ...e,
                    ...i
                }, "bar" === i.type ? {
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    callback: function(t, e, i) {
                                        var o = settings.options.scales.yAxes[0].ticks.metric,
                                            l = settings.options.scales.yAxes[0].ticks.prefix,
                                            n = settings.options.scales.yAxes[0].ticks.postfix;
                                        return o && t > 100 && (t = t < 1e6 ? t / 1e3 + "k" : t / 1e6 + "kk"), l && n ? l + t + n : l ? l + t : n ? t + n : t
                                    }
                                }
                            }]
                        }
                    }
                } : {}), this.settings = mergeDeep(this.settings, {
                    options: {
                        tooltips: {
                            custom: function(e) {
                                var i = document.getElementById("chartjsTooltip");
                                if (i || ((i = document.createElement("div")).id = "chartjsTooltip", i.style.opacity = 0, i.classList.add("hs-chartjs-tooltip-wrap"), i.innerHTML = '<div class="hs-chartjs-tooltip"></div>', settings.options.tooltips.lineMode ? t.closest(".chartjs-custom").innerHTML = i : document.body.appendChild(i)), 0 === e.opacity) return i.style.opacity = 0, void i.parentNode.removeChild(i);
                                if (i.classList.remove("above", "below", "no-transform"), e.yAlign ? i.classList.add(e.yAlign) : i.classList.add("no-transform"), e.body) {
                                    var o = e.title || [],
                                        l = e.body.map((function(t) {
                                            return t.lines
                                        })),
                                        n = new Date,
                                        s = '<header class="hs-chartjs-tooltip-header">';
                                    o.forEach((function(t) {
                                        s += settings.options.tooltips.yearStamp ? t + ", " + n.getFullYear() : t
                                    })), s += '</header><div class="hs-chartjs-tooltip-body">', l.forEach((function(t, i) {
                                        s += "<div>";
                                        var o = t[0],
                                            l = o,
                                            n = e.labelColors[i].backgroundColor instanceof Object ? e.labelColors[i].borderColor : e.labelColors[i].backgroundColor;
                                        s += (settings.options.tooltips.hasIndicator ? '<span class="d-inline-block rounded-circle mr-1" style="width: ' + settings.options.tooltips.indicatorWidth + "; height: " + settings.options.tooltips.indicatorHeight + "; background-color: " + n + '"></span>' : "") + settings.options.tooltips.prefix + (o.length > 3 ? l : t) + settings.options.tooltips.postfix, s += "</div>"
                                    })), s += "</div>", i.querySelector(".hs-chartjs-tooltip").innerHTML = s
                                }
                                var a = this._chart.canvas.getBoundingClientRect();
                                i.style.opacity = 1, settings.options.tooltips.lineMode ? i.style.left = e.caretX + "px" : i.style.left = a.left + window.pageXOffset + e.caretX - i.offsetWidth / 2 - 3 + "px", i.style.top = a.top + window.pageYOffset + e.caretY - i.offsetHeight - 25 + "px", i.style.pointerEvents = "none", i.style.transition = settings.options.tooltips.transition
                            }
                        }
                    }
                }, i, this.settings), new Chart(t, this.settings)
            }
        }
    }
    /*  * Circles wrapper
     * @version: 2.0.0 (Mon, 25 Nov 2019)
     * @requires: jQuery v3.0 or later, circles v0.0.6, appear.js v1.0.3
     * @author: HtmlStream
     * @event-namespace: .HSCore.components.HSCircles
     * @license: Htmlstream Libraries (https://htmlstream.com/licenses)
     * Copyright 2020 Htmlstream
     */
    , HSCore.components.HSCircles = {
        dataAttributeName: "data-hs-circles-options",
        defaults: {
            radius: 80,
            duration: 1e3,
            wrpClass: "circles-wrap",
            colors: ["#3170e5", "#e7eaf3"],
            bounds: -100,
            debounce: 10,
            rtl: !1,
            isHideValue: !1,
            dividerSpace: null,
            isViewportInit: !1,
            fgStrokeLinecap: null,
            fgStrokeMiterlimit: null,
            additionalTextType: null,
            additionalText: null,
            textFontSize: null,
            textFontWeight: null,
            textColor: null,
            secondaryText: null,
            secondaryTextFontWeight: null,
            secondaryTextFontSize: null,
            secondaryTextColor: null
        },
        collection: [],
        init(t, e, i) {
            const o = this;
            let l;
            l = t instanceof HTMLElement ? [t] : t instanceof Object ? t : document.querySelectorAll(t);
            for (let t = 0; t < l.length; t += 1) o.addToCollection(l[t], e, i || l[t].id);
            if (!o.collection.length) return !1;
            o._init()
        },
        setId: function(t, e) {
            t.setAttribute("id", e.id)
        },
        setTextStyles: function(t, e, i) {
            t.querySelectorAll('[class="' + (e.textClass || i._textClass) + '"]').forEach(t => {
                t.style.fontSize = e.textFontSize + "px", t.style.fontWeight = e.textFontWeight, t.style.color = e.textColor, t.style.lineHeight = "normal", t.style.height = "auto", t.style.top = "", t.style.left = ""
            })
        },
        setRtl: function(t, e) {
            t.querySelectorAll("svg").forEach(t => {
                t.style.transform = "transform"
            })
        },
        setStrokeLineCap: function(t, e, i) {
            t.querySelectorAll('[class="' + i._valClass + '"]').forEach(t => {
                t.setAttribute("stroke-linecap", e.fgStrokeLinecap)
            })
        },
        setStrokeMiterLimit: function(t, e, i) {
            t.querySelectorAll('[class="' + i._valClass + '"]').forEach(t => {
                t.setAttribute("stroke-miterlimit", e.fgStrokeMiterlimit)
            })
        },
        initAppear: function(t, e, i, o) {
            appear({
                bounds: e.bounds,
                debounce: e.debounce,
                elements: () => document.querySelectorAll("#" + e.id),
                appear: function(t) {
                    i.update(JSON.parse(t.getAttribute("data-hs-circles-options")).value)
                }
            })
        },
        addToCollection(t, e, i) {
            const o = Object.assign({}, this.defaults, t.hasAttribute(this.dataAttributeName) ? JSON.parse(t.getAttribute(this.dataAttributeName)) : {}, e);
            this.collection.push({
                $el: t,
                options: Object.assign({}, {
                    id: "circle-" + Math.random().toString().slice(2),
                    value: 0,
                    text: function(t) {
                        return "iconic" === o.type ? o.icon : "prefix" === o.additionalTextType ? o.secondaryText ? (o.additionalText || "") + (o.isHideValue ? "" : t) + '<div style="margin-top: ' + (o.dividerSpace / 2 + "px" || "0") + "; margin-bottom: " + (o.dividerSpace / 2 + "px" || "0") + ';"></div><div style="font-weight: ' + o.secondaryTextFontWeight + "; font-size: " + o.secondaryTextFontSize + "px; color: " + o.secondaryTextColor + ';">' + o.secondaryText + "</div>" : (o.additionalText || "") + (o.isHideValue ? "" : t) : o.secondaryText ? (o.isHideValue ? "" : t) + (o.additionalText || "") + '<div style="margin-top: ' + (o.dividerSpace / 2 + "px" || "0") + "; margin-bottom: " + (o.dividerSpace / 2 + "px" || "0") + ';"></div><div style="font-weight: ' + o.secondaryTextFontWeight + "; font-size: " + o.secondaryTextFontSize + "px; color: " + o.secondaryTextColor + ';">' + o.secondaryText + "</div>" : (o.isHideValue ? "" : t) + (o.additionalText || "")
                    }
                }, o),
                id: i || null
            })
        },
        getItems() {
            const t = this;
            let e = [];
            for (let i = 0; i < t.collection.length; i += 1) e.push(t.collection[i].$initializedEl);
            return e
        },
        getItem(t) {
            return "number" == typeof t ? this.collection[t].$initializedEl : this.collection.find(e => e.id === t).$initializedEl
        },
        _init() {
            const t = this;
            for (let e = 0; e < t.collection.length; e += 1) {
                let i, o;
                t.collection[e].hasOwnProperty("$initializedEl") || (i = t.collection[e].options, o = t.collection[e].$el, i.isViewportInit && (i.value = 0), t.setId(o, i), t.collection[e].$initializedEl = Circles.create(i), t.setTextStyles(o, i, t.collection[e].$initializedEl), i.rtl && t.setRtl(o, i), i.fgStrokeLinecap && t.setStrokeLineCap(o, i, t.collection[e].$initializedEl), i.fgStrokeMiterlimit && t.setStrokeMiterLimit(o, i, t.collection[e].$initializedEl), i.isViewportInit && t.initAppear(o, i, t.collection[e].$initializedEl))
            }
        }
    }
    /*
     * Dropzone wrapper
     * @version: 3.0.1 (Wed, 28 Jul 2021)
     * @requires: dropzone v5.5.0
     * @author: HtmlStream
     * @event-namespace: .HSCore.components.HSDropzone
     * @license: Htmlstream Libraries (https://htmlstream.com/licenses)
     * Copyright 2021 Htmlstream
     */
    , HSCore.components.HSDropzone = {
        dataAttributeName: "data-hs-dropzone-options",
        defaults: {
            url: "index.html",
            thumbnailWidth: 300,
            thumbnailHeight: 300,
            previewTemplate: '<div class="col h-100 mb-4">    <div class="dz-preview dz-file-preview">      <div class="d-flex justify-content-end dz-close-icon">        <small class="bi-x" data-dz-remove></small>      </div>      <div class="dz-details d-flex">        <div class="dz-img flex-shrink-0">         <img class="img-fluid dz-img-inner" data-dz-thumbnail>        </div>        <div class="dz-file-wrapper flex-grow-1">         <h6 class="dz-filename">          <span class="dz-title" data-dz-name></span>         </h6>         <div class="dz-size" data-dz-size></div>        </div>      </div>      <div class="dz-progress progress">        <div class="dz-upload progress-bar bg-success" role="progressbar" style="width: 0" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>      </div>      <div class="d-flex align-items-center">        <div class="dz-success-mark">          <span class="bi-check-lg"></span>        </div>        <div class="dz-error-mark">          <span class="bi-x-lg"></span>        </div>        <div class="dz-error-message">          <small data-dz-errormessage></small>        </div>      </div>    </div></div>'
        },
        collection: [],
        init(t, e, i) {
            const o = this;
            let l;
            l = t instanceof HTMLElement ? [t] : t instanceof Object ? t : document.querySelectorAll(t);
            for (let t = 0; t < l.length; t += 1) o.addToCollection(l[t], e, i || l[t].id);
            if (!o.collection.length) return !1;
            o._init()
        },
        addToCollection(t, e, i) {
            this.collection.push({
                $el: t,
                id: i || null,
                options: Object.assign({}, this.defaults, t.hasAttribute(this.dataAttributeName) ? JSON.parse(t.getAttribute(this.dataAttributeName)) : {}, e)
            })
        },
        getItems() {
            const t = this;
            let e = [];
            for (let i = 0; i < t.collection.length; i += 1) e.push(t.collection[i].$initializedEl);
            return e
        },
        getItem(t) {
            return "number" == typeof t ? this.collection[t].$initializedEl : this.collection.find(e => e.id === t).$initializedEl
        },
        _init() {
            const t = this;
            for (let e = 0; e < t.collection.length; e += 1) {
                let i, o;
                t.collection[e].hasOwnProperty("$initializedEl") || (i = t.collection[e].options, o = t.collection[e].$el, t.collection[e].$initializedEl = new Dropzone(o, i))
            }
        }
    }
    /*
     * HSMask Plugin
     * @version: 2.0.1 (Sat, 30 Jul 2021)
     * @requires: imask v1.14.16
     * @author: HtmlStream
     * @event-namespace: .HSMask
     * @license: Htmlstream Libraries (https://htmlstream.com/)
     * Copyright 2021 Htmlstream
     */
    , HSCore.components.HSMask = {
        dataAttributeName: "data-hs-mask-options",
        defaults: {
            mask: null
        },
        collection: [],
        init(t, e, i) {
            const o = this;
            let l;
            l = t instanceof HTMLElement ? [t] : t instanceof Object ? t : document.querySelectorAll(t);
            for (let t = 0; t < l.length; t += 1) o.addToCollection(l[t], e, i || l[t].id);
            if (!o.collection.length) return !1;
            o._init()
        },
        addToCollection(t, e, i) {
            this.collection.push({
                $el: t,
                id: i || null,
                options: Object.assign({}, this.defaults, t.hasAttribute(this.dataAttributeName) ? JSON.parse(t.getAttribute(this.dataAttributeName)) : {}, e)
            })
        },
        getItems() {
            const t = this;
            let e = [];
            for (let i = 0; i < t.collection.length; i += 1) e.push(t.collection[i].$initializedEl);
            return e
        },
        getItem(t) {
            return "number" == typeof t ? this.collection[t].$initializedEl : this.collection.find(e => e.id === t).$initializedEl
        },
        _init() {
            const t = this;
            for (let e = 0; e < t.collection.length; e += 1) {
                let i, o;
                t.collection[e].hasOwnProperty("$initializedEl") || (i = t.collection[e].options, o = t.collection[e].$el, t.collection[e].$initializedEl = new IMask(o, i))
            }
        }
    }, HSCore.components.HSLeaflet = {
        init: function(t, e) {
            if (this.$el = "string" == typeof t ? document.querySelector(t) : t, this.$el) {
                this.defaults = {
                    map: {
                        coords: [51.505, -.09],
                        zoom: 13
                    },
                    layer: {
                        token: "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
                        id: "mapbox/streets-v11",
                        maxZoom: 18
                    },
                    marker: null
                };
                var i = this.$el.hasAttribute("data-hs-leaflet-options") ? JSON.parse(this.$el.getAttribute("data-hs-leaflet-options")) : {};
                this.settings = mergeDeep(this.defaults, { ...e,
                    ...i
                });
                var o = L.map(this.$el, this.settings.map);
                if (o.setView(this.settings.map.coords, this.settings.map.zoom), L.tileLayer(this.settings.layer.token, this.settings.layer).addTo(o), this.settings.marker)
                    for (var l = 0; l < this.settings.marker.length; l++) {
                        this.settings.marker[l].icon = L.icon(this.settings.marker[l].icon);
                        let t = L.marker(this.settings.marker[l].coords, this.settings.marker[l]).addTo(o);
                        this.settings.marker[l].popup && t.bindPopup(this.settings.marker[l].popup.text)
                    }
                return o
            }
        }
    }, HSCore.components.HSList = {
        dataAttributeName: "data-hs-list-options",
        defaults: {
            searchMenu: !1,
            searchMenuDelay: 300,
            searchMenuOutsideClose: !0,
            searchMenuInsideClose: !0,
            clearSearchInput: !0,
            keyboard: !1,
            empty: !1
        },
        collection: [],
        init: function(t, e, i) {
            const o = this;
            let l;
            l = t instanceof HTMLElement ? [t] : t instanceof Object ? t : document.querySelectorAll(t);
            for (let t = 0; t < l.length; t += 1) o.addToCollection(l[t], e, i || l[t].id);
            return !!o.collection.length && (o._init(), this)
        },
        initializeHover: function(t, e, i) {
            const o = this;
            var l = t.querySelector("." + i.searchClass),
                n = !1;
            l.addEventListener("keydown", s => {
                if (40 === s.which) s.preventDefault(), o.searchMenuShow(t, e, i), (a = i.list.querySelector(".active")) ? a.nextElementSibling && ((r = a.nextElementSibling).classList.add("active"), n.classList.remove("active"), n = r, i.list.offsetHeight < r.getBoundingClientRect().top && (i.list.scrollTop = r.getBoundingClientRect().top + i.list.scrollTop)) : (n = i.list.firstChild).classList.add("active");
                else if (38 === s.which) {
                    var a, r;
                    if (s.preventDefault(), a = i.list.querySelector(".active")) {
                        if (a.previousElementSibling)(r = a.previousElementSibling).classList.add("active"), n.classList.remove("active"), n = r, 0 > r.getBoundingClientRect().top && (i.list.scrollTop = r.getBoundingClientRect().top + i.list.scrollTop - i.list.offsetHeight)
                    } else(n = i.list.firstChild.parentNode).classList.add("active")
                } else if (13 == s.which && l.value.length > 0) {
                    s.preventDefault();
                    const t = n.querySelector("a").getAttribute("href");
                    t && (window.location = t)
                }
            })
        },
        searchMenu: function(t, e, i) {
            const o = this;
            if (0 === t.querySelector("." + i.searchClass).value.length || 0 === i.visibleItems.length && !e.empty) return o.helpers.fadeOut(i.list, e.searchMenuDelay), o.helpers.hide(e.empty);
            o.searchMenuShow(t, e, i)
        },
        searchMenuShow: function(t, e, i) {
            const o = this;
            if (o.helpers.fadeIn(i.list, e.searchMenuDelay), !i.visibleItems.length) {
                var l = o.helpers.show(document.querySelector(e.empty).cloneNode(!0));
                i.list.innerHTML = l.outerHTML
            }
        },
        searchMenuHide: function(t, e, i) {
            const o = this;
            var l = t.querySelector("." + i.searchClass);
            e.searchMenuOutsideClose && document.addEventListener("click", () => {
                o.helpers.fadeOut(i.list, e.searchMenuDelay), e.clearSearchInput && (l.value = "")
            }), e.searchMenuInsideClose || i.list.addEventListener("click", t => {
                t.stopPropagation(), e.clearSearchInput && l.val("")
            })
        },
        emptyBlock: function(t, e, i) {
            const o = this;
            if (0 === t.querySelector("." + i.searchClass).value.length || 0 === i.visibleItems.length && !e.empty) o.helpers.hide(e.empty);
            else if (o.helpers.fadeIn(i.list, e.searchMenuDelay), !i.visibleItems.length) {
                var l = document.querySelector(e.empty).clone();
                o.helpers.show(l), i.list.innerHTML = l.outerHTML
            }
        },
        helpers: {
            fadeIn: (t, e) => {
                if (!t || null !== t.offsetParent) return t;
                t.style.opacity = 0, t.style.display = "block";
                var i = +new Date,
                    o = function() {
                        t.style.opacity = +t.style.opacity + (new Date - i) / e, i = +new Date, +t.style.opacity < 1 && (window.requestAnimationFrame && requestAnimationFrame(o) || setTimeout(o, 16))
                    };
                o()
            },
            fadeOut: (t, e) => {
                if (!t || null === t.offsetParent) return t;
                if (!e) return t.style.display = "none";
                var i = setInterval((function() {
                    t.style.opacity || (t.style.opacity = 1), t.style.opacity > 0 ? t.style.opacity -= .1 : (clearInterval(i), t.style.display = "none")
                }), e / 10)
            },
            hide: t => ((t = "object" == typeof t ? t : document.querySelector(t)) && (t.style.display = "none"), t),
            show: t => ((t = "object" == typeof t ? t : document.querySelector(t)) && (t.style.display = "block"), t)
        },
        addToCollection(t, e, i) {
            this.collection.push({
                $el: t,
                id: i || null,
                options: Object.assign({}, this.defaults, t.hasAttribute(this.dataAttributeName) ? JSON.parse(t.getAttribute(this.dataAttributeName)) : {}, e)
            })
        },
        _init() {
            const t = this;
            for (let e = 0; e < t.collection.length; e += 1) {
                let i, o;
                t.collection[e].hasOwnProperty("$initializedEl") || (i = t.collection[e].$el, o = t.collection[e].options, t.collection[e].$initializedEl = new List(i, o, o.values), o.searchMenu && t.helpers.hide(t.collection[e].$initializedEl.list), t.collection[e].$initializedEl.on("searchComplete", () => {
                    o.searchMenu && (t.searchMenu(i, o, t.collection[e].$initializedEl), t.searchMenuHide(i, o, t.collection[e].$initializedEl)), !o.searchMenu && o.empty && t.emptyBlock(i, o, t.collection[e].$initializedEl)
                }), o.searchMenu && o.keyboard && t.initializeHover(i, o, t.collection[e].$initializedEl))
            }
        },
        getItem(t) {
            return "number" == typeof t ? this.collection[t].$initializedEl : this.collection.find(e => e.id === t).$initializedEl
        }
    }
    /*
     * HSMask Plugin
     * @version: 3.0.0 (Sun, 12 June 2021)
     * @requires: nouislider v15.1.1
     * @author: HtmlStream
     * @event-namespace: .HSNoUISlider
     * @license: Htmlstream Libraries (https://htmlstream.com/)
     * Copyright 2021 Htmlstream
     */
    , HSCore.components.HSNoUISlider = {
        dataAttributeName: "data-hs-nouislider-options",
        defaults: {
            connect: !0,
            result_min_target_el: null,
            result_max_target_el: null,
            foreground_target_el: null,
            tooltip: {}
        },
        collection: [],
        init(t, e, i) {
            const o = this;
            let l;
            l = t instanceof HTMLElement ? [t] : t instanceof Object ? t : document.querySelectorAll(t);
            for (let t = 0; t < l.length; t += 1) o.addToCollection(l[t], e, i || l[t].id);
            if (!o.collection.length) return !1;
            o._init()
        },
        addToCollection(t, e, i) {
            this.collection.push({
                $el: t,
                id: i || null,
                options: Object.assign({}, this.defaults, t.hasAttribute(this.dataAttributeName) ? JSON.parse(t.getAttribute(this.dataAttributeName)) : {}, e)
            })
        },
        getItems() {
            const t = this;
            let e = [];
            for (let i = 0; i < t.collection.length; i += 1) e.push(t.collection[i].$initializedEl);
            return e
        },
        getItem(t) {
            return "number" == typeof t ? this.collection[t].$initializedEl : this.collection.find(e => e.id === t).$initializedEl
        },
        _init() {
            const t = this;
            for (let e = 0; e < t.collection.length; e += 1) {
                let i, o;
                t.collection[e].hasOwnProperty("$initializedEl") || (i = t.collection[e].options, o = t.collection[e].$el, t.collection[e].$initializedEl = noUiSlider.create(o, i), t.collection[e].$initializedEl.on("update", () => {
                    t.updateMinField(t.collection[e].$initializedEl, i), t.updateMaxField(t.collection[e].$initializedEl, i), t.updateChart(t.collection[e].$initializedEl, i)
                }), i.showTooltips && t.showTooltips(t.collection[e].$initializedEl, i), i.result_min_target_el && t.resultMinTargetEl(t.collection[e].$initializedEl, i), i.result_max_target_el && t.resultMaxTargetEl(t.collection[e].$initializedEl, i))
            }
        },
        updateMinField: function(t, e) {
            if (e.result_min_target_el && t.get().length) {
                const i = document.querySelector(e.result_min_target_el);
                i instanceof HTMLInputElement ? i.value = typeof t.get() === Array ? parseInt(t.get()[0]) : parseInt(t.get()) : i.innerHTML = typeof t.get() === Array ? parseInt(t.get()[0]) : parseInt(t.get())
            }
        },
        updateMaxField: function(t, e) {
            if (e.result_max_target_el && t.get().length <= 2) {
                const i = document.querySelector(e.result_max_target_el);
                i instanceof HTMLInputElement ? i.value = "object" == typeof t.get() ? parseInt(t.get()[1]) : parseInt(t.get()) : i.innerHTML = "object" == typeof t.get() ? parseInt(t.get()[1]) : parseInt(t.get())
            }
        },
        updateChart: function(t, e) {
            const i = 100 * parseInt(t.get()[0]) / e.range.max,
                o = 100 * parseInt(t.get()[1]) / e.range.max;
            if (e.foreground_target_el && t.get().length <= 2) {
                var l = 100 - (i + (100 - o));
                const t = document.querySelector(e.foreground_target_el);
                t.style.left = i + "%", t.style.width = l + "%";
                const n = document.querySelector(e.foreground_target_el + "> *");
                n.style.width = t.parentElement.clientWidth + "px", n.style.marginLeft = -t.parentElement.clientWidth / 100 * i + "px"
            }
        },
        showTooltips: function(t, e) {
            const i = Array.from("object" == typeof t.get() ? t.get() : [!0]);
            t.updateOptions({
                tooltips: i.map(t => wNumb({
                    decimals: 0,
                    postfix: e.tooltip.postfix,
                    prefix: e.tooltip.prefix
                }))
            })
        },
        resultMinTargetEl: function(t, e) {
            document.querySelector(e.result_min_target_el).addEventListener("change", e => {
                t.set([e.target.value, null])
            })
        },
        resultMaxTargetEl: function(t, e) {
            document.querySelector(e.result_max_target_el).addEventListener("change", e => {
                t.set([null, e.target.value])
            })
        }
    }
    /*
     * Quill wrapper
     * @version: 2.0.0 (Wed, 28 Jul 2021)
     * @requires: quill v1.3.7
     * @author: HtmlStream
     * @event-namespace: .HSCore.components.HSQuill
     * @license: Htmlstream Libraries (https://htmlstream.com/licenses)
     * Copyright 2021 Htmlstream
     */
    , HSCore.components.HSQuill = {
        dataAttributeName: "data-hs-quill-options",
        defaults: {
            theme: "snow",
            attach: !1
        },
        collection: [],
        init(t, e, i) {
            const o = this;
            let l;
            l = t instanceof HTMLElement ? [t] : t instanceof Object ? t : document.querySelectorAll(t);
            for (let t = 0; t < l.length; t += 1) o.addToCollection(l[t], e, i || l[t].id);
            if (!o.collection.length) return !1;
            o._init()
        },
        addToCollection(t, e, i) {
            this.collection.push({
                $el: t,
                id: i || null,
                options: Object.assign({}, this.defaults, t.hasAttribute(this.dataAttributeName) ? JSON.parse(t.getAttribute(this.dataAttributeName)) : {}, e)
            })
        },
        getItems() {
            const t = this;
            let e = [];
            for (let i = 0; i < t.collection.length; i += 1) e.push(t.collection[i].$initializedEl);
            return e
        },
        getItem(t) {
            return "number" == typeof t ? this.collection[t].$initializedEl : this.collection.find(e => e.id === t).$initializedEl
        },
        _init() {
            const t = this;
            for (let e = 0; e < t.collection.length; e += 1) {
                let i, o;
                t.collection[e].hasOwnProperty("$initializedEl") || (i = t.collection[e].options, o = t.collection[e].$el, t.collection[e].$initializedEl = new Quill(o, i), o.classList.add("hs-quill-initialized"), this.toolbarBottom(i, t.collection[e].$initializedEl))
            }
        },
        toolbarBottom: function(t, e) {
            if (t.toolbarBottom) {
                const i = e.container,
                    o = i.previousElementSibling;
                if (i.parentElement.classList.add("ql-toolbar-bottom"), t.attach) {
                    document.querySelector(t.attach).addEventListener("shown.bs.modal", () => {
                        i.style.paddingBottom = o.offsetHeight + "px"
                    })
                } else i.style.paddingBottom = o.offsetHeight + "px";
                o.style.position = "absolute", o.style.width = "100%", o.style.bottom = 0
            }
        }
    }
    /*
     * HSTomSelect Plugin
     * @version: 1.0.0 (Mon, 24 May 2021)
     * @requires: tom-select 1.7.26
     * @author: HtmlStream
     * @event-namespace: .HSTomSelect
     * @license: Htmlstream Libraries (https://htmlstream.com/)
     * Copyright 2021 Htmlstream
     */
    , HSCore.components.HSTomSelect = {
        dataAttributeName: "data-hs-tom-select-options",
        defaults: {
            dropdownWrapperClass: "tom-select-custom",
            searchInDropdown: !0,
            plugins: ["change_listener", "hs_smart_position"],
            hideSelected: !1,
            render: {
                option: function(t, e) {
                    return t.optionTemplate || `<div>${t.text}</div>>`
                },
                item: function(t, e) {
                    return t.optionTemplate || `<div>${t.text}</div>>`
                }
            }
        },
        collection: [],
        init(t, e, i) {
            const o = this;
            let l;
            l = t instanceof HTMLElement ? [t] : t instanceof Object ? t : document.querySelectorAll(t);
            for (let t = 0; t < l.length; t += 1) o.addToCollection(l[t], e, i || l[t].id);
            if (!o.collection.length) return !1;
            o._init()
        },
        addToCollection(t, e, i) {
            this.collection.push({
                $el: t,
                id: i || null,
                options: Object.assign({}, this.defaults, t.hasAttribute(this.dataAttributeName) ? JSON.parse(t.getAttribute(this.dataAttributeName)) : {}, e)
            })
        },
        getItems() {
            const t = this;
            let e = [];
            for (let i = 0; i < t.collection.length; i += 1) e.push(t.collection[i].$initializedEl);
            return e
        },
        getItem(t) {
            return "number" == typeof t ? this.collection[t].$initializedEl : this.collection.find(e => e.id === t).$initializedEl
        },
        _init() {
            const t = this;
            for (let e = 0; e < t.collection.length; e += 1) {
                let i, o;
                t.collection[e].hasOwnProperty("$initializedEl") || (i = t.collection[e].options, o = t.collection[e].$el, i.plugins.hasOwnProperty("hs_smart_position") && !o.closest(".modal") && (i.dropdownParent = "body"), o.hasAttribute("multiple") && (i.plugins = [...i.plugins, "remove_button"]), i.searchInDropdown && (i.plugins = [...i.plugins, "dropdown_input"]), TomSelect.define("hs_smart_position", (function(t) {
                    this.hook("after", "setup", (function() {
                        this.$menu = this.dropdown_content.parentElement, this.on("dropdown_open", t => {
                            const e = t.getBoundingClientRect(),
                                o = this.wrapper.getBoundingClientRect();
                            e.bottom > window.innerHeight && (t.style.top = parseInt(t.style.top) - (this.control.clientHeight + t.clientHeight + 10) + "px"), t.style.opacity = 0, setTimeout(() => {
                                const l = parseInt(t.style.width);
                                l > o.width && i.dropdownLeft && (t.style.left = parseInt(t.style.left) - Math.abs(e.width - l) + "px"), t.style.opacity = 1
                            })
                        }), window.addEventListener("scroll", () => function(t) {
                            const e = t.$menu.getBoundingClientRect();
                            e.bottom > window.innerHeight ? t.$menu.style.top = parseInt(t.$menu.style.top) - (t.control.clientHeight + t.$menu.clientHeight + 10) + "px" : e.top < 0 && (t.$menu.style.top = parseInt(t.$menu.style.top) + (t.control.clientHeight + t.$menu.clientHeight + 10) + "px")
                        }(this))
                    }))
                })), t.collection[e].$initializedEl = new TomSelect(o, i), i.hideSearch && t.hideSearch(t.collection[e].$initializedEl, i), i.disableSearch && t.disableSearch(t.collection[e].$initializedEl, i), i.width && t.width(t.collection[e].$initializedEl, i), i.singleMultiple && t.singleMultiple(t.collection[e].$initializedEl, i), i.hidePlaceholderOnSearch && t.hidePlaceholderOnSearch(t.collection[e].$initializedEl, i), i.create && t.openIfEmpty(t.collection[e].$initializedEl, i), i.hideSelectedFromField && t.hideSelectedFromField(t.collection[e].$initializedEl, i), i.dropdownWidth && t.dropdownWidth(t.collection[e].$initializedEl, i), t.renderPlaceholder(t.collection[e].$initializedEl, i), t.wrapContainer(t.collection[e].$initializedEl, i))
            }
        },
        hideSearch(t, e) {
            t.control_input.parentElement.removeChild(t.control_input)
        },
        disableSearch(t, e) {
            t.control_input.readOnly = !0
        },
        singleMultiple(t, e) {
            t.control.classList.add("hs-select-single-multiple");
            const i = (t.control_input.getAttribute("placeholder") || e.placeholder).replace(/(<([^>]+)>)/gi, ""),
                o = e => {
                    e.target.closest("[data-selectable].selected") && (e.target.classList.remove("selected"), setTimeout(() => {
                        t.removeItem(e.target.getAttribute("data-value"), !1), t.refreshItems()
                    }))
                },
                l = e => {
                    if (!t.wrapper.querySelector(".ts-selected-count")) {
                        const e = document.createElement("span");
                        e.classList.add("ts-selected-count"), t.wrapper.querySelector(".items").appendChild(e)
                    }
                    return t.wrapper.querySelector(".ts-selected-count").innerHTML = e
                };
            t.items.length && (e.searchInDropdown ? l(t.items.length ? t.items.length + " item(s) selected" : i) : t.control_input.setAttribute("placeholder", t.items.length + " item(s) selected")), t.on("dropdown_open", t => {
                t.addEventListener("mouseup", o)
            }), t.on("dropdown_close", t => {
                window.removeEventListener("mouseup", o)
            }), t.on("item_add", () => {
                t.items.length && (e.searchInDropdown ? l(t.items.length + " item(s) selected") : t.control_input.setAttribute("placeholder", t.items.length + " item(s) selected"))
            }), t.on("item_remove", () => {
                t.items.length ? e.searchInDropdown ? l(t.items.length + " item(s) selected") : t.control_input.setAttribute("placeholder", t.items.length + " item(s) selected") : e.searchInDropdown ? l(i) : t.control_input.setAttribute("placeholder", i)
            })
        },
        width(t, e) {
            t.wrapper.style.maxWidth = e.width
        },
        hidePlaceholderOnSearch(t, e) {
            const i = (t.control_input.getAttribute("placeholder") || e.placeholder).replace(/(<([^>]+)>)/gi, "");
            i && (t.on("dropdown_open", () => {
                t.control_input.setAttribute("placeholder", "")
            }), t.on("dropdown_close", () => {
                t.control_input.setAttribute("placeholder", i)
            }))
        },
        openIfEmpty(t, e) {
            t.control_input.addEventListener("focus", () => {
                t.$menu.querySelector(".option") || (t.open(), setTimeout(() => {
                    t.$menu.style.display = "block", t.$menu.querySelector(".ts-dropdown-content").append(t.render("no_results"))
                }, 10))
            })
        },
        hideSelectedFromField(t, e) {
            const i = () => {
                console.log(t)
            };
            t.on("item_select", i), t.on("item_add", i)
        },
        dropdownWidth(t, e) {
            t.on("dropdown_open", () => t.$menu.style.width = e.dropdownWidth)
        },
        width(t, e) {
            t.wrapper.style.width = e.width
        },
        renderPlaceholder(t, e) {
            if (e.singleMultiple || t.items.length) return;
            const i = t.input.getAttribute("placeholder") || e.placeholder;
            if (e.searchInDropdown && !e.hideSelected) {
                let e = null;
                const o = function() {
                        if (e = t.wrapper.querySelector(".ts-custom-placeholder"), t.items.length && e) return e.parentElement && e.parentElement.removeChild(e), e = null;
                        t.items.length || e || l()
                    },
                    l = function() {
                        t.items.length || (t.wrapper.querySelector(".items").innerHTML = `<span class="ts-custom-placeholder">${i}</span>`, e = t.wrapper.querySelector(".ts-custom-placeholder"))
                    };
                l(), t.on("change", o)
            }
            i && (t.control_input.offsetParent ? function(e) {
                t.control_input.setAttribute("placeholder", e.replace(/(<([^>]+)>)/gi, ""))
            }(i) : function(e) {
                const i = () => {
                    t.control.innerHTML = `<div class="ts-custom-placeholder">${e}</div>`
                };
                i(), t.on("change", () => {
                    t.items.length && (() => {
                        const e = t.wrapper.querySelector(".items .ts-custom-placeholder");
                        e && e.parentElement && e.parentElement.removeChild(e)
                    })(), t.items.length || i()
                })
            }(i))
        },
        wrapContainer(t, e) {
            var i = document.createElement("div");
            i.className += e.dropdownWrapperClass, t.$menu.parentNode.insertBefore(i, t.$menu), i.appendChild(t.$menu)
        }
    }, HSCore.components.HSTyped = {
        dataAttributeName: "data-hs-typed-options",
        defaults: {},
        collection: [],
        init(t, e, i) {
            const o = this;
            let l;
            l = t instanceof HTMLElement ? [t] : t instanceof Object ? t : document.querySelectorAll(t);
            for (let t = 0; t < l.length; t += 1) o.addToCollection(l[t], e, i || l[t].id);
            if (!o.collection.length) return !1;
            o._init()
        },
        addToCollection(t, e, i) {
            this.collection.push({
                $el: t,
                id: i || null,
                options: Object.assign({}, this.defaults, t.hasAttribute(this.dataAttributeName) ? JSON.parse(t.getAttribute(this.dataAttributeName)) : {}, e)
            })
        },
        _init: function() {
            const t = this;
            for (let e = 0; e < t.collection.length; e += 1) {
                let i, o;
                t.collection[e].hasOwnProperty("$initializedEl") || (i = t.collection[e].$el, o = t.collection[e].options, t.collection[e].$initializedEl = new Typed(i, o))
            }
        }
    };