"use strict";
(() => {
  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t3, e4, o4) {
      if (this._$cssResult$ = true, o4 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3, this.t = e4;
    }
    get styleSheet() {
      let t3 = this.o;
      const s4 = this.t;
      if (e && void 0 === t3) {
        const e4 = void 0 !== s4 && 1 === s4.length;
        e4 && (t3 = o.get(s4)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && o.set(s4, t3));
      }
      return t3;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
  var S = (s4, o4) => {
    if (e)
      s4.adoptedStyleSheets = o4.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
    else
      for (const e4 of o4) {
        const o5 = document.createElement("style"), n4 = t.litNonce;
        void 0 !== n4 && o5.setAttribute("nonce", n4), o5.textContent = e4.cssText, s4.appendChild(o5);
      }
  };
  var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e4 = "";
    for (const s4 of t4.cssRules)
      e4 += s4.cssText;
    return r(e4);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t3, s4) => t3;
  var u = { toAttribute(t3, s4) {
    switch (s4) {
      case Boolean:
        t3 = t3 ? l : null;
        break;
      case Object:
      case Array:
        t3 = null == t3 ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, s4) {
    let i4 = t3;
    switch (s4) {
      case Boolean:
        i4 = null !== t3;
        break;
      case Number:
        i4 = null === t3 ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          i4 = JSON.parse(t3);
        } catch (t4) {
          i4 = null;
        }
    }
    return i4;
  } };
  var f = (t3, s4) => !i2(t3, s4);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t3) {
      this._$Ei(), (this.l ??= []).push(t3);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t3, s4 = y) {
      if (s4.state && (s4.attribute = false), this._$Ei(), this.elementProperties.set(t3, s4), !s4.noAccessor) {
        const i4 = Symbol(), r5 = this.getPropertyDescriptor(t3, i4, s4);
        void 0 !== r5 && e2(this.prototype, t3, r5);
      }
    }
    static getPropertyDescriptor(t3, s4, i4) {
      const { get: e4, set: h3 } = r2(this.prototype, t3) ?? { get() {
        return this[s4];
      }, set(t4) {
        this[s4] = t4;
      } };
      return { get() {
        return e4?.call(this);
      }, set(s5) {
        const r5 = e4?.call(this);
        h3.call(this, s5), this.requestUpdate(t3, r5, i4);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties")))
        return;
      const t3 = n2(this);
      t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t4 = this.properties, s4 = [...h(t4), ...o2(t4)];
        for (const i4 of s4)
          this.createProperty(i4, t4[i4]);
      }
      const t3 = this[Symbol.metadata];
      if (null !== t3) {
        const s4 = litPropertyMetadata.get(t3);
        if (void 0 !== s4)
          for (const [t4, i4] of s4)
            this.elementProperties.set(t4, i4);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t4, s4] of this.elementProperties) {
        const i4 = this._$Eu(t4, s4);
        void 0 !== i4 && this._$Eh.set(i4, t4);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s4) {
      const i4 = [];
      if (Array.isArray(s4)) {
        const e4 = new Set(s4.flat(1 / 0).reverse());
        for (const s5 of e4)
          i4.unshift(c(s5));
      } else
        void 0 !== s4 && i4.push(c(s4));
      return i4;
    }
    static _$Eu(t3, s4) {
      const i4 = s4.attribute;
      return false === i4 ? void 0 : "string" == typeof i4 ? i4 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
    }
    addController(t3) {
      (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
    }
    removeController(t3) {
      this._$EO?.delete(t3);
    }
    _$E_() {
      const t3 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
      for (const i4 of s4.keys())
        this.hasOwnProperty(i4) && (t3.set(i4, this[i4]), delete this[i4]);
      t3.size > 0 && (this._$Ep = t3);
    }
    createRenderRoot() {
      const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t3, this.constructor.elementStyles), t3;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      this._$EO?.forEach((t3) => t3.hostDisconnected?.());
    }
    attributeChangedCallback(t3, s4, i4) {
      this._$AK(t3, i4);
    }
    _$EC(t3, s4) {
      const i4 = this.constructor.elementProperties.get(t3), e4 = this.constructor._$Eu(t3, i4);
      if (void 0 !== e4 && true === i4.reflect) {
        const r5 = (void 0 !== i4.converter?.toAttribute ? i4.converter : u).toAttribute(s4, i4.type);
        this._$Em = t3, null == r5 ? this.removeAttribute(e4) : this.setAttribute(e4, r5), this._$Em = null;
      }
    }
    _$AK(t3, s4) {
      const i4 = this.constructor, e4 = i4._$Eh.get(t3);
      if (void 0 !== e4 && this._$Em !== e4) {
        const t4 = i4.getPropertyOptions(e4), r5 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
        this._$Em = e4, this[e4] = r5.fromAttribute(s4, t4.type), this._$Em = null;
      }
    }
    requestUpdate(t3, s4, i4) {
      if (void 0 !== t3) {
        if (i4 ??= this.constructor.getPropertyOptions(t3), !(i4.hasChanged ?? f)(this[t3], s4))
          return;
        this.P(t3, s4, i4);
      }
      false === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t3, s4, i4) {
      this._$AL.has(t3) || this._$AL.set(t3, s4), true === i4.reflect && this._$Em !== t3 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t3);
    }
    async _$ET() {
      this.isUpdatePending = true;
      try {
        await this._$ES;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.scheduleUpdate();
      return null != t3 && await t3, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t5, s5] of this._$Ep)
            this[t5] = s5;
          this._$Ep = void 0;
        }
        const t4 = this.constructor.elementProperties;
        if (t4.size > 0)
          for (const [s5, i4] of t4)
            true !== i4.wrapped || this._$AL.has(s5) || void 0 === this[s5] || this.P(s5, this[s5], i4);
      }
      let t3 = false;
      const s4 = this._$AL;
      try {
        t3 = this.shouldUpdate(s4), t3 ? (this.willUpdate(s4), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s4)) : this._$EU();
      } catch (s5) {
        throw t3 = false, this._$EU(), s5;
      }
      t3 && this._$AE(s4);
    }
    willUpdate(t3) {
    }
    _$AE(t3) {
      this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    _$EU() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$ES;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      this._$Ej &&= this._$Ej.forEach((t4) => this._$EC(t4, this[t4])), this._$EU();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.4");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = t2.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var e3 = "$lit$";
  var h2 = `lit$${(Math.random() + "").slice(9)}$`;
  var o3 = "?" + h2;
  var n3 = `<${o3}>`;
  var r3 = document;
  var l2 = () => r3.createComment("");
  var c3 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
  var a2 = Array.isArray;
  var u2 = (t3) => a2(t3) || "function" == typeof t3?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t3) => (i4, ...s4) => ({ _$litType$: t3, strings: i4, values: s4 });
  var x = y2(1);
  var b2 = y2(2);
  var w = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var E = r3.createTreeWalker(r3, 129);
  function C(t3, i4) {
    if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i4) : i4;
  }
  var P = (t3, i4) => {
    const s4 = t3.length - 1, o4 = [];
    let r5, l3 = 2 === i4 ? "<svg>" : "", c4 = f2;
    for (let i5 = 0; i5 < s4; i5++) {
      const s5 = t3[i5];
      let a3, u3, d3 = -1, y3 = 0;
      for (; y3 < s5.length && (c4.lastIndex = y3, u3 = c4.exec(s5), null !== u3); )
        y3 = c4.lastIndex, c4 === f2 ? "!--" === u3[1] ? c4 = v : void 0 !== u3[1] ? c4 = _ : void 0 !== u3[2] ? ($.test(u3[2]) && (r5 = RegExp("</" + u3[2], "g")), c4 = m) : void 0 !== u3[3] && (c4 = m) : c4 === m ? ">" === u3[0] ? (c4 = r5 ?? f2, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? m : '"' === u3[3] ? g : p2) : c4 === g || c4 === p2 ? c4 = m : c4 === v || c4 === _ ? c4 = f2 : (c4 = m, r5 = void 0);
      const x2 = c4 === m && t3[i5 + 1].startsWith("/>") ? " " : "";
      l3 += c4 === f2 ? s5 + n3 : d3 >= 0 ? (o4.push(a3), s5.slice(0, d3) + e3 + s5.slice(d3) + h2 + x2) : s5 + h2 + (-2 === d3 ? i5 : x2);
    }
    return [C(t3, l3 + (t3[s4] || "<?>") + (2 === i4 ? "</svg>" : "")), o4];
  };
  var V = class _V {
    constructor({ strings: t3, _$litType$: s4 }, n4) {
      let r5;
      this.parts = [];
      let c4 = 0, a3 = 0;
      const u3 = t3.length - 1, d3 = this.parts, [f3, v2] = P(t3, s4);
      if (this.el = _V.createElement(f3, n4), E.currentNode = this.el.content, 2 === s4) {
        const t4 = this.el.content.firstChild;
        t4.replaceWith(...t4.childNodes);
      }
      for (; null !== (r5 = E.nextNode()) && d3.length < u3; ) {
        if (1 === r5.nodeType) {
          if (r5.hasAttributes())
            for (const t4 of r5.getAttributeNames())
              if (t4.endsWith(e3)) {
                const i4 = v2[a3++], s5 = r5.getAttribute(t4).split(h2), e4 = /([.?@])?(.*)/.exec(i4);
                d3.push({ type: 1, index: c4, name: e4[2], strings: s5, ctor: "." === e4[1] ? k : "?" === e4[1] ? H : "@" === e4[1] ? I : R }), r5.removeAttribute(t4);
              } else
                t4.startsWith(h2) && (d3.push({ type: 6, index: c4 }), r5.removeAttribute(t4));
          if ($.test(r5.tagName)) {
            const t4 = r5.textContent.split(h2), s5 = t4.length - 1;
            if (s5 > 0) {
              r5.textContent = i3 ? i3.emptyScript : "";
              for (let i4 = 0; i4 < s5; i4++)
                r5.append(t4[i4], l2()), E.nextNode(), d3.push({ type: 2, index: ++c4 });
              r5.append(t4[s5], l2());
            }
          }
        } else if (8 === r5.nodeType)
          if (r5.data === o3)
            d3.push({ type: 2, index: c4 });
          else {
            let t4 = -1;
            for (; -1 !== (t4 = r5.data.indexOf(h2, t4 + 1)); )
              d3.push({ type: 7, index: c4 }), t4 += h2.length - 1;
          }
        c4++;
      }
    }
    static createElement(t3, i4) {
      const s4 = r3.createElement("template");
      return s4.innerHTML = t3, s4;
    }
  };
  function N(t3, i4, s4 = t3, e4) {
    if (i4 === w)
      return i4;
    let h3 = void 0 !== e4 ? s4._$Co?.[e4] : s4._$Cl;
    const o4 = c3(i4) ? void 0 : i4._$litDirective$;
    return h3?.constructor !== o4 && (h3?._$AO?.(false), void 0 === o4 ? h3 = void 0 : (h3 = new o4(t3), h3._$AT(t3, s4, e4)), void 0 !== e4 ? (s4._$Co ??= [])[e4] = h3 : s4._$Cl = h3), void 0 !== h3 && (i4 = N(t3, h3._$AS(t3, i4.values), h3, e4)), i4;
  }
  var S2 = class {
    constructor(t3, i4) {
      this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i4;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t3) {
      const { el: { content: i4 }, parts: s4 } = this._$AD, e4 = (t3?.creationScope ?? r3).importNode(i4, true);
      E.currentNode = e4;
      let h3 = E.nextNode(), o4 = 0, n4 = 0, l3 = s4[0];
      for (; void 0 !== l3; ) {
        if (o4 === l3.index) {
          let i5;
          2 === l3.type ? i5 = new M(h3, h3.nextSibling, this, t3) : 1 === l3.type ? i5 = new l3.ctor(h3, l3.name, l3.strings, this, t3) : 6 === l3.type && (i5 = new L(h3, this, t3)), this._$AV.push(i5), l3 = s4[++n4];
        }
        o4 !== l3?.index && (h3 = E.nextNode(), o4++);
      }
      return E.currentNode = r3, e4;
    }
    p(t3) {
      let i4 = 0;
      for (const s4 of this._$AV)
        void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t3, s4, i4), i4 += s4.strings.length - 2) : s4._$AI(t3[i4])), i4++;
    }
  };
  var M = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t3, i4, s4, e4) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t3, this._$AB = i4, this._$AM = s4, this.options = e4, this._$Cv = e4?.isConnected ?? true;
    }
    get parentNode() {
      let t3 = this._$AA.parentNode;
      const i4 = this._$AM;
      return void 0 !== i4 && 11 === t3?.nodeType && (t3 = i4.parentNode), t3;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t3, i4 = this) {
      t3 = N(this, t3, i4), c3(t3) ? t3 === T || null == t3 || "" === t3 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t3 !== this._$AH && t3 !== w && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : u2(t3) ? this.k(t3) : this._(t3);
    }
    S(t3) {
      return this._$AA.parentNode.insertBefore(t3, this._$AB);
    }
    T(t3) {
      this._$AH !== t3 && (this._$AR(), this._$AH = this.S(t3));
    }
    _(t3) {
      this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(r3.createTextNode(t3)), this._$AH = t3;
    }
    $(t3) {
      const { values: i4, _$litType$: s4 } = t3, e4 = "number" == typeof s4 ? this._$AC(t3) : (void 0 === s4.el && (s4.el = V.createElement(C(s4.h, s4.h[0]), this.options)), s4);
      if (this._$AH?._$AD === e4)
        this._$AH.p(i4);
      else {
        const t4 = new S2(e4, this), s5 = t4.u(this.options);
        t4.p(i4), this.T(s5), this._$AH = t4;
      }
    }
    _$AC(t3) {
      let i4 = A.get(t3.strings);
      return void 0 === i4 && A.set(t3.strings, i4 = new V(t3)), i4;
    }
    k(t3) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i4 = this._$AH;
      let s4, e4 = 0;
      for (const h3 of t3)
        e4 === i4.length ? i4.push(s4 = new _M(this.S(l2()), this.S(l2()), this, this.options)) : s4 = i4[e4], s4._$AI(h3), e4++;
      e4 < i4.length && (this._$AR(s4 && s4._$AB.nextSibling, e4), i4.length = e4);
    }
    _$AR(t3 = this._$AA.nextSibling, i4) {
      for (this._$AP?.(false, true, i4); t3 && t3 !== this._$AB; ) {
        const i5 = t3.nextSibling;
        t3.remove(), t3 = i5;
      }
    }
    setConnected(t3) {
      void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
    }
  };
  var R = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t3, i4, s4, e4, h3) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t3, this.name = i4, this._$AM = e4, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = T;
    }
    _$AI(t3, i4 = this, s4, e4) {
      const h3 = this.strings;
      let o4 = false;
      if (void 0 === h3)
        t3 = N(this, t3, i4, 0), o4 = !c3(t3) || t3 !== this._$AH && t3 !== w, o4 && (this._$AH = t3);
      else {
        const e5 = t3;
        let n4, r5;
        for (t3 = h3[0], n4 = 0; n4 < h3.length - 1; n4++)
          r5 = N(this, e5[s4 + n4], i4, n4), r5 === w && (r5 = this._$AH[n4]), o4 ||= !c3(r5) || r5 !== this._$AH[n4], r5 === T ? t3 = T : t3 !== T && (t3 += (r5 ?? "") + h3[n4 + 1]), this._$AH[n4] = r5;
      }
      o4 && !e4 && this.j(t3);
    }
    j(t3) {
      t3 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t3) {
      this.element[this.name] = t3 === T ? void 0 : t3;
    }
  };
  var H = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t3) {
      this.element.toggleAttribute(this.name, !!t3 && t3 !== T);
    }
  };
  var I = class extends R {
    constructor(t3, i4, s4, e4, h3) {
      super(t3, i4, s4, e4, h3), this.type = 5;
    }
    _$AI(t3, i4 = this) {
      if ((t3 = N(this, t3, i4, 0) ?? T) === w)
        return;
      const s4 = this._$AH, e4 = t3 === T && s4 !== T || t3.capture !== s4.capture || t3.once !== s4.once || t3.passive !== s4.passive, h3 = t3 !== T && (s4 === T || e4);
      e4 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
    }
    handleEvent(t3) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
    }
  };
  var L = class {
    constructor(t3, i4, s4) {
      this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s4;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t3) {
      N(this, t3);
    }
  };
  var Z = t2.litHtmlPolyfillSupport;
  Z?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.2");
  var j = (t3, i4, s4) => {
    const e4 = s4?.renderBefore ?? i4;
    let h3 = e4._$litPart$;
    if (void 0 === h3) {
      const t4 = s4?.renderBefore ?? null;
      e4._$litPart$ = h3 = new M(i4.insertBefore(l2(), t4), t4, void 0, s4 ?? {});
    }
    return h3._$AI(t3), h3;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t3 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t3.firstChild, t3;
    }
    update(t3) {
      const i4 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = j(i4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return w;
    }
  };
  s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
  var r4 = globalThis.litElementPolyfillSupport;
  r4?.({ LitElement: s3 });
  (globalThis.litElementVersions ??= []).push("4.0.4");

  // client/components/vulkano-webcomponent/main.js
  var VulkanoWebcomponent = class extends s3 {
    createRenderRoot() {
      return this;
    }
    static properties = {
      name: { type: String }
    };
    constructor() {
      super();
      this.name = "webcomponent";
    }
    render() {
      return x`
      <div class="rules">
      <main class="">
        <div class="">

          <h2>Tyson vs. Paul Sweepstakes</h2>

          <p><br>To participate in this Sweepstakes, you must agree to and abide by these Official Rules.<br><br><strong>NO PURCHASE NECESSARY. A PURCHASE WILL NOT IMPROVE YOUR CHANCES OF WINNING.</strong></p>

          <p><strong>Grand Prize is a 4-day/3-night trip for two (2) to attend the Jake Paul vs. Mike Tyson fight scheduled for November 15, 2024 at AT&amp;T Stadium in Arlington, Texas.&nbsp;</strong></p>

          <p><strong>Grand Prize winner must travel November 13-16, 2024.</strong></p>

          <ol start="1">
            <li><p><strong>Sponsor/Administrator</strong><strong>: </strong>Probability LLC («<strong>Probability</strong>«), 2 Woodstock Meadows Ln, PO Box 1484, Woodstock, NY 12498 («<strong>Sponsor/Administrator</strong>«).</p></li>
          </ol>

          <ol start="2">
            <li>
              <strong>Eligibility</strong><strong>:</strong> The <em>«Tyson vs. Paul Sweepstakes» </em>(«<strong>Sweepstakes</strong>«) is open only to legal residents of the 50 United States and the District of Columbia who are at least eighteen (18) years of age (or the age of majority in their jurisdiction of primary residence, whichever is older) at time of Entry («<strong>Entrants</strong>«). Any employees, directors, officers, consultants, independent contractors, and interns who have, within the past six months, performed services for Sponsor/Administrator, Netflix Media, LLC («<strong>Netflix</strong>«), or any organizations responsible for sponsoring, fulfilling, administering, advertising or promoting the Sweepstakes or the Mike Tyson vs. Jake Paul professional boxing match on November 15, 2024 in Arlington, Texas (including but not limited to the management and representation of either Mr. Paul or Mr. Tyson) (collectively, the «<strong>Sweepstakes Entities</strong>«), and/or their respective parent, subsidiary, affiliated and successor companies, and immediate family and household members of such individuals, are not eligible to enter or win the prize. «<strong>Immediate family members</strong>» shall mean parents, step-parents, children, step-children, siblings, step-siblings, or spouses, regardless of where they live. «<strong>Household members</strong>» shall mean people who share the same residence at least three months a year, whether related or not. Void where prohibited or restricted by law.
              <p><strong>If selected as the potential winner, the Entrant and their potential guest will be required to consent to a background check to verify eligibility; and, failure to sign such consents and authorizations and/or to furnish all required information will result in disqualification without compensation of any kind. In addition, Sponsor/Administrator reserves the right in its sole discretion to disqualify the potential winner or their potential guest (without explanation or compensation of any kind) if the results of such background check reveal that such potential winner or their potential guest does not meet the Sweepstakes eligibility requirements or has been charged with a felony or misdemeanor, a crime of moral turpitude or an act of insurrection, or any other act that might reflect negatively on Sponsor/Administrator, Netflix or any of the Sweepstakes Entities, as determined by the Sponsor/Administrator in its sole discretion. All such decisions of the Sponsor/Administrator are final and binding in all respects and not subject to appeal.</strong></p>
            </li>
          </ol>


          <ol start="3">
          <li><strong>Sweepstakes Schedule:</strong> The Sweepstakes begins on or about 12:00:01 a.m. Eastern Time («<strong>ET</strong>«) on October 15, 2024 and ends at 11:59:59 p.m. ET on October 25, 2024 («<strong>Promotion Period</strong>«). Sponsor’s/Administrator’s computer is the official clock for this Sweepstakes. </li>
          </ol>



          <ol start="4">
          <li><strong>Sweepstakes Entry:</strong>
            <p>To enter, navigate the internet to <a href="http://tudumpaulvstysonsweepstakes.com/" rel="nofollow" target="_blank">http://tudumpaulvstysonsweepstakes.com/</a> (the «<strong>Website</strong>«) and complete and submit the entry form with the following information: first and last name, phone number and valid email address.</p>

            <p>CLICK THE CHECKBOX SIGNIFYING THAT YOU COMPLY WITH THE ELIGIBILITY REQUIREMENTS AND HAVE READ AND AGREE TO THESE OFFICIAL RULES. IF YOU DO NOT CHECK THE BOX INDICATING YOUR AGREEMENT TO THE ABOVE, YOU WILL NOT BE ENTERED IN THE SWEEPSTAKES AND CANNOT WIN THE PRIZE.</p>

            <p>During the entry process, you may be asked to consent to receive promotional emails and reminder emails from Netflix. Consenting to receive promotional emails and reminder emails is optional and does not have to be agreed upon in order to be eligible to participate in the Sweepstakes and does not improve your chances of winning the prize. In the event you do consent to receive these emails, the use of such emails shall be subject to the privacy policy of Netflix (<a href="https://help.netflix.com/en/legal/privacy" target="_blank">https://help.netflix.com/en/legal/privacy</a>) and you may opt out of receiving these emails at any time.&nbsp;</p>

            <p>This Sweepstakes is sponsored/administered by Probability LLC for Netflix.&nbsp; Sponsor/Administrator will be collecting personal data about entrants online, in accordance with its privacy policy.&nbsp; Please review the Sponsor/Administrator’s privacy policy at <a href="https://www.probabilityworks.com/privacypolicy" target="_blank">https://www.probabilityworks.com/privacypolicy</a><strong>. </strong>By participating in the Sweepstakes, entrants hereby agree to Sponsor/Administrator’s collection and usage of their personal information and acknowledge that they have read and accepted Sponsor/Administrator’s privacy policy. Probability LLC will use the information provided by entrants in connection with this Sweepstakes solely for the purpose of administering this Sweepstakes and/or fulfilling the prize and under no circumstance will Probability LLC use said information for any other purpose.</p>

            <p><strong>Limit one (1) entry per person per day during the Promotion Period, regardless of the number of email addresses a person may have</strong>.</p>

            <p>Multiple entries or mass entry attempts will result in disqualification of all entries by such person. Entries must be manually key-stroked by the entrant; use of automated entry devices or programs, or entries by third parties, are prohibited. Proof of entering information at the Website or entry form is not considered proof of delivery or receipt of such entry.</p>

            <p>If entrant chooses to enter using a mobile device, standard data rates may apply. Check your carrier for applicable charges.</p>

            <p>If for any reason the Sweepstakes is not capable of running as planned, including infection by computer virus, bugs, tampering, unauthorized intervention, fraud, epidemics, pandemics, or technical failures beyond Sponsor’s/Administrator’s control (or Netflix’s control) that corrupt or affect the administration, security, fairness, integrity or proper conduct of the Sweepstakes, Sponsor/Administrator reserves the right, in its sole discretion, to disqualify any individual who tampers with the entry process, and to terminate, modify or suspend the Sweepstakes. In such event, Sponsor/Administrator reserves the right to conduct the Sweepstakes and award the prize by means of a random drawing comprised of all eligible entries received prior to and/or after (as appropriate) the action taken by Sponsor/Administrator or otherwise award the prize in a manner which is fair, appropriate and consistent with these Official Rules, as determined by Sponsor/Administrator in its sole discretion. Notice of termination/modification/suspension of Sweepstakes will be posted on the Website. Without limitation of any other term herein, Sponsor/Administrator and its agencies are not responsible for failed, partial or garbled computer transmissions, technical failures of any kind (including but not limited to electronic malfunction or damage of any network, hardware or software), any error, omission, interruption, deletion, defect, delay in operation or transmission, communications line failure, theft or loss, destruction or unauthorized access to, or alteration of, entries; or any problems or technical malfunctions of any telephone network or lines, computer online systems, servers, or providers, computer equipment, software, failure of any e-mail or electronic entry to be received on account of technical problems or traffic congestion on the Internet or at any website, or any combination thereof, including any injury or damage to entrant&#8217;s or any other person&#8217;s computer/mobile device related to or resulting from participation in this Sweepstakes.</p>

            <p>Entrants further agree not to knowingly damage or cause interruption of the Sweepstakes and/or prevent others from participating in the Sweepstakes. CAUTION: ANY ATTEMPT TO DAMAGE ANY ONLINE SERVICE OR WEBSITE OR UNDERMINE THE LEGITIMATE OPERATION OF THE SWEEPSTAKES VIOLATES CRIMINAL OR CIVIL LAWS. IF SUCH AN ATTEMPT IS MADE, SPONSOR/ADMINISTRATOR MAY DISQUALIFY ANY ENTRANT MAKING SUCH ATTEMPT FROM THIS SWEEPSTAKES AND SEEK DAMAGES TO THE FULLEST EXTENT OF THE LAW.</p>
          </li>
          </ol>

          <ol start="5">
          <li>
            <strong>R</strong><strong>andom Drawing and Odds</strong><strong>:</strong> Potential prize winner will be selected via random drawing, on or about October 28, 2024 from among all eligible entries received during the Promotion Period. The random drawing will be conducted by Sponsor/Administrator, whose decisions are final and binding on all matters related to the Sweepstakes.
            <p>Odds of winning the prize depend on the total number of eligible Entries received during the Promotion Period.&nbsp;</p>
          </li>
          </ol>


          <ol start="6">
            <li>
              <strong>Winner Notification:</strong> Potential winner will be notified by email on or about October 28, 2024. In order to remain eligible, potential prize winner must sign and return within two (2) days (or such shorter time period as indicated thereon), an Affidavit or Declaration of Eligibility, Release and Indemnification, a Publicity Release where allowed by law, a tax acknowledgment, Guest Release and the necessary paperwork for a background check (collectively, «<strong>Prize Claim Documents</strong>«). If the Prize Claim Documents are not returned to Sponsor/Administrator within the specified time period, or if prize notification is returned as non-deliverable, or if potential winner is found to be ineligible or otherwise not in compliance with these Official Rules, or declines the prize for any reason prior to award, prize may be forfeited and potential winner may be disqualified and an alternate winner may be selected from all remaining eligible Entries received during the Promotion Period (time permitting). Prize Claim Documents are in addition to any waivers and releases that may be required by the organizers of the professional boxing match between Mike Tyson and Jake Paul on November 15, 2024 in Arlington, Texas in conjunction with attendance by Grand Prize winner and their guest.
              <p>In the event of any dispute concerning the identity of any online entrant, the entry will be deemed submitted by the natural person who is the authorized account holder of the e-mail address used to enter and such individual must comply with these rules. «<strong>Authorized account holder</strong>» is defined as the natural person who is assigned to an email address by an Internet access provider, online service provider, or other organization (e.g., business, educational institution, etc.) that is responsible for assigning email addresses for the domain associated with the submitted e-mail address.&nbsp;</p>
            </li>
          </ol>



          <ol start="7">
          <li><strong>Prize and Approximate Retail Value («ARV»)</strong><strong>:</strong>

          <p><strong>One (1) Grand Prize winner:</strong> Grand Prize winner will receive a 4-day/3-night trip («<strong>Trip</strong>«) for the winner and one (1) guest to attend the Jake Paul vs. Mike Tyson fight scheduled for November 15, 2024 at AT&amp;T Stadium in Arlington, Texas. («<strong>Event</strong>«). <strong>Grand Prize winner and their guest must be available to travel November 13-16, 2024.</strong><strong> If Grand Prize winner</strong> <strong>cannot do so for any reason, Grand Prize will be forfeited without compensation of any kind, and an alternate winner may be selected as per Section 6 (time permitting).</strong> The Trip includes: roundtrip coach air transportation for two (2) from a major commercial airport near Grand Prize winner’s legal residence (as selected by the Sponsor/Administrator) («<strong>Airport of Origin</strong>«) to Dallas/Fort Worth airport (with possible layovers/flight may not be direct) («<strong>Destination City Airport»</strong>); however, if Grand Prize winner resides within one-hundred fifty (150) miles of Arlington, TX (as determined by the Sponsor/Administrator in its sole discretion), air travel will not be provided and ground transportation may be provided instead (and, in such case, no alternate prize or compensation will be provided); ground transportation to/from Destination City Airport and hotel; three (3) nights’ hotel accommodations (standard room, double occupancy), two (2) tickets to the Event on November 15, 2024, and ground transportation to/from hotel and Event. Grand Prize winner will also receive $500 spending money to be awarded in the form of a check or Zelle** payment in the name of the Grand Prize winner (Sponsor/Administrator in its sole discretion to determine form in which spending money is awarded). <strong>ARV of Grand Prize: $5,000.00.</strong>&nbsp;</p>



          <p>**Trademark used solely for reference purposes. No endorsement, sponsorship, authorization or affiliation is intended or implied by such use.</p>



          <p>Grand Prize winner and their guest must travel together on specified itinerary as set by the Sponsor/Administrator, including same departure date, destination and return date or Grand Prize may be forfeited in its entirety. The Sponsor/Administrator are not liable for delays, cancellation or unforeseen events related to the flights. Grand Prize winner and their guest will be solely responsible for obtaining valid identification. In addition, Grand Prize winner may be required to present a valid credit card at the hotel at the time of check-in. Should Grand Prize winner not have a credit card/payment instrument with sufficient available credit/funds to pay for a hotel stay of three (3) nights (or in such other amount as prescribed by hotel), Grand Prize winner agrees to sign additional documents and/or take other steps prescribed by Sponsor/Administrator, upon request and without compensation of any kind, so as protect Sponsor/Administrator from incurring any liability for damage to the hotel room caused during the hotel stay by Grand Prize winner and their guest.</p>



          <p>Guest of Grand Prize winner must be at least eighteen years of age (or age of majority in their jurisdiction of residence, whichever is older). Guest must complete, sign and return a Liability Release, Publicity Release (where lawful) and the necessary paperwork for a background check prior to prize travel. Should Grand Prize winner elect to travel without a guest (or if guest fails to timely return signed Release), Grand Prize will be awarded in increments appropriate for a single traveler (that is, the Grand Prize winner himself/herself/themselves) and no alternate prize or compensation will be awarded. The preceding includes the Grand Prize winner receiving only one (1) ticket to the Event.</p>



          <p>Actual final value of Grand Prize may vary depending upon point of departure and fare fluctuations; and, under no circumstances will Grand Prize winner receive the difference between ARV and actual final value of Grand Prize in cash (or in any other form). Grand Prize is non-transferable and cannot be extended beyond the date set forth above. Grand Prize Winner is solely responsible for all other expenses related to trip not specified herein, including but not limited to: roundtrip transportation between Grand Prize winner’s residence and Airport of Origin, airline baggage fees, meals, tips, taxes, travel (or other) insurance and hotel incidentals. Air transportation tickets are non-refundable/non-transferable and are not valid for upgrades and/or frequent flyer miles. All air transportation tickets are subject to the vagaries of flight variation, work stoppages and schedule or route changes. The Sponsor/Administrator and its agencies are not liable for any expenses incurred as a consequence of Event or flight cancellation/delay.</p>



          <p>Ticket type for Event will be determined by Sponsor/Administrator in its sole discretion. Attendance at Event is subject to the terms and conditions of use as set forth on the tickets as well as venue restrictions. Without limitation, any re-sale, auctioning, trading or other provision of ticket to any other person constitutes an actionable violation of such terms and conditions. Attendance at Event may also be conditioned on the agreement of winner/guest to (a) allow a search of their person for security purposes; (b) not bring weapons, alcohol or other prohibited items into the Event venue; (c) comply with restrictions as to re-entry; and (d) comply with the organizer’s policies relating to postponement/cancellation/re-scheduling of Event.</p>



          <p>Grand Prize winner and their guest must follow all instructions of the Sponsor/Administrator, Netflix as well as the organizer of Event. Failure to do so may result in forfeiture of the prize. Should Grand Prize winner and/or guest fail to adhere to any such instructions or engage in unruly, obnoxious, illegal, threatening, or otherwise inappropriate behavior (as determined by the Sponsor/Administrator, Netflix or organizer of Event in the sole discretion of any party), the Sponsor/Administrator reserves the right, without further notice or warning, to terminate the Trip, Event or other applicable experience early, in whole or in part, and send Grand Prize winner and/or their guest home and/or take other actions as the Sponsor/Administrator deems appropriate in their sole discretion without any liability or other obligation to Grand Prize winner or his/her/their guest. Inappropriate behavior includes but is not limited to the failure of Grand Prize winner or guest to comply with governmental mandates or other third-party requirements designed to prevent the spread of COVID-19 (such as, mask-wearing, social distancing, completion of health questionnaire). Participation in applicable activities (including attendance at Event) may also be conditioned upon provision of proof of a negative COVID-19 test or satisfactory proof of being fully vaccinated against COVID-19.</p>



          <p>In connection with any visit to any location in connection with the Grand Prize (including venue for Event), please be advised that Sponsor/Administrator or any prize supplier’s policies, CDC guidelines, and the recommendations of health officials must be followed. Please note that any public location where people are present provides an inherent risk of exposure to COVID-19, and Sponsor/Administrator cannot guarantee that any person will not be exposed during the Trip.</p>



          <p>All details of the Grand Prize will be determined in Sponsor&#8217;s/Administrator’s sole discretion. Sponsor/Administrator reserves the right to substitute Grand Prize (or portion thereof; as applicable) with a similar prize (or prize element; as applicable) of comparable or greater value. All taxes and other unspecified expenses, costs, or fees associated with the acceptance and/or use of Grand Prize are the sole responsibility of the Grand Prize winner. Prize cannot be transferred by winner or redeemed for cash** and is valid only for the items detailed above, with no substitution of Prize by winner.&nbsp;</p>



          <p>**Excluding the $500 spending money.</p>



          <p>In the event the Grand Prize winner is able to participate in the Trip as scheduled but the Event does not or cannot take place as scheduled or at all, for reasons including but not limited to scheduling conflicts, cancellations, postponement, location changes, an event of force majeure, or for any other reason, Sponsor/Administrator reserve the right to award the remainder of the Grand Prize with no further obligation to the Grand Prize winners. Event is subject to, and Sponsor/Administrator and Netflix are not responsible for, changes to production schedule, production exigencies or delays, postponements or cancellation of the Event.</p>



          <p>THE GRAND PRIZE WINNER WILL BE ISSUED A FORM 1099 FOR TAX PURPOSES IN THE AMOUNT OF THE ACTUAL RETAIL VALUE OF THEIR PRIZE AND MUST SUBMIT THEIR SOCIAL SECURITY NUMBER (AND OTHERWISE COOPERATE WITH SPONSOR/ADMINISTRATOR IN REPORTING HIS/HER/THEIR RECEIPT OF GRAND PRIZE TO THE INTERNAL REVENUE SERVICE AND/OR OTHER TAX AUTHORITIES), AS REQUIRED BY LAW. ALL FEDERAL, STATE, AND OTHER TAXES IMPOSED ON THE ACCEPTANCE OF THE PRIZE ARE SOLELY THE RESPONSIBILITY OF THE WINNER.</p>
          </li>
          </ol>


          <ol start="8">
          <li>
            <strong>Conditions and Limitations of Liability:</strong> By participating, each Entrant agrees: (a) to be bound by these Official Rules and the decisions of Sponsor/Administrator, which shall be final in all respects; and (b) to release, discharge and hold harmless Sponsor/Administrator, Netflix Media, LLC, the Sweepstakes Entities, including the entities involved in staging the Mike Tyson vs. Jake Paul professional boxing match on November 15, 2024 in Arlington, Texas (including but not limited to the management and representation of either Mr. Paul or Mr. Tyson), each of their respective advertising and promotion agencies, each of the foregoing entities’ respective parent, subsidiary, related, affiliated and successor companies, and each of their respective officers, directors, agents, representatives and employees (collectively, the «<strong>Released Parties</strong>«) from any and all actions, claims, injury, loss or damage, including, without limitation, death and bodily injury, arising in any manner, directly or indirectly, in whole or in part, from participation in this Sweepstakes or any Sweepstakes-related activity, and/or from Entrant’s acceptance, receipt, use or misuse of the prize and for any claims based on publicity rights, defamation or invasion of privacy and merchandise delivery. Released Parties are not responsible if Sweepstakes cannot take place or if the prize cannot be awarded due to travel cancellations, delays or interruptions due to acts of God, acts of war, natural disasters, epidemics, pandemics, weather or acts of terrorism.
            <p>IN NO EVENT WILL THE RELEASED PARTIES BE RESPONSIBLE OR LIABLE FOR ANY DAMAGES OR LOSSES OF ANY KIND, INCLUDING DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES ARISING OUT OF YOUR ACCESS TO AND/OR USE OF THE WEBSITE AND/OR DOWNLOADING FROM AND/OR PRINTING MATERIAL DOWNLOADED FROM ANY WEBSITES ASSOCIATED WITH THE SWEEPSTAKES. WITHOUT LIMITING THE FOREGOING, THIS SWEEPSTAKES AND THE PRIZE IS PROVIDED «AS IS» WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. SOME JURISDICTIONS MAY NOT ALLOW THE LIMITATIONS OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES OR EXCLUSION OF IMPLIED WARRANTIES SO SOME OF THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT APPLY TO YOU. CHECK YOUR LOCAL LAWS FOR ANY RESTRICTIONS OR LIMITATIONS REGARDING THESE LIMITATIONS OR EXCLUSIONS.</p>
          </li>
          </ol>


          <ol start="9">
            <li><strong>Additional Conditions</strong><strong>:</strong>  By accepting the prize, winner grants Sponsor/Administrator and its designees (including Netflix) permission to use their name, voice, likeness, photograph, prize information, biographical data and city and state of residence on a winner’s list and for programming, publicity and promotional purposes, worldwide in all forms of media now known or hereafter developed, in perpetuity, without further compensation unless prohibited by law. Sponsor/Administrator and its designees (including Netflix) are not obligated to use any of the above mentioned information or materials, but may do so and may edit such information or materials, at Sponsor’s/Administrator’s sole discretion, without further obligation or compensation. Sweepstakes subject to the laws of the United States only. All federal, state and local laws and regulations apply.</li>
          </ol>



          <ol start="10">
            <li><strong>Disputes: Jurisdiction/Choice Of Law:</strong><strong> </strong> To the fullest extent permitted by law, Entrant  agrees that: (1) any and all disputes, claims and causes of action arising out of or connected with this Sweepstakes or the awarding of the prize shall be resolved individually, without resort to any form of class action, and exclusively by the courts within the County of New York, State of New York, with such courts having personal jurisdiction over them, with Entrant waiving any right of forum non conveniens, change of venue or any like right; (2) any and all claims, judgments and awards shall be limited to actual out-of-pocket costs incurred, including costs associated with participating in this Sweepstakes, but in no event attorneys&#8217; fees; and (3) under no circumstances will Entrant be permitted to obtain awards for, and Entrant hereby waives all rights to claim, indirect, punitive, incidental and consequential damages and any other damages, other than for actual out-of-pocket expenses, and any and all rights to have damages multiplied or otherwise increased as well as waiving any rights to an injunction or other forms of equitable relief. All issues and questions concerning the construction, validity, interpretation and enforceability of these Official Rules, or the rights and obligations of the Entrant, Sponsor/Administrator and Netflix in connection with the Sweepstakes shall be governed by, and construed in accordance with, the laws of the State of New York, without giving effect to any choice of law or conflict of law rules (whether of the State of New York or any other jurisdiction), which would cause the application of the laws of any jurisdiction other than the State of New York.</li>
          </ol>



          <ol start="11">
            <li><strong>Winner’s List:</strong> For the name of the winner, mail a self-addressed, stamped envelope to: Netflix Tyson vs. Paul Sweepstakes, c/o Probability, PO Box 1559, Social Circle, GA 30025-1559. All such requests must be received by November 22, 2024.</li>
          </ol>

          </div>
        </main>
      </div>
    `;
    }
  };
  customElements.define("vulkano-webcomponent", VulkanoWebcomponent);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=vulkano-webcomponent.js.map
