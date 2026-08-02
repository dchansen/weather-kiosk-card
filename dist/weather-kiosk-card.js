//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: ee } = Object, m = globalThis, h = m.trustedTypes, te = h ? h.emptyScript : "", g = m.reactiveElementPolyfillSupport, _ = (e, t) => e, v = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? te : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, y = (e, t) => !l(e, t), ne = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	useDefault: !1,
	hasChanged: y
};
Symbol.metadata ??= Symbol("metadata"), m.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ne) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ne;
	}
	static _$Ei() {
		if (this.hasOwnProperty(_("elementProperties"))) return;
		let e = ee(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(_("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? v : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? v : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? y)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[_("elementProperties")] = /* @__PURE__ */ new Map(), b[_("finalized")] = /* @__PURE__ */ new Map(), g?.({ ReactiveElement: b }), (m.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var x = globalThis, S = (e) => e, C = x.trustedTypes, w = C ? C.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, T = "$lit$", E = `lit$${Math.random().toFixed(9).slice(2)}$`, re = "?" + E, ie = `<${re}>`, D = document, O = () => D.createComment(""), k = (e) => e === null || typeof e != "object" && typeof e != "function", A = Array.isArray, ae = (e) => A(e) || typeof e?.[Symbol.iterator] == "function", j = "[ 	\n\f\r]", M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, N = /-->/g, oe = />/g, P = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), se = /'/g, ce = /"/g, F = /^(?:script|style|textarea|title)$/i, I = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), L = Symbol.for("lit-noChange"), R = Symbol.for("lit-nothing"), z = /* @__PURE__ */ new WeakMap(), B = D.createTreeWalker(D, 129);
function V(e, t) {
	if (!A(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return w === void 0 ? t : w.createHTML(t);
}
var le = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = M;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === M ? c[1] === "!--" ? o = N : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = P) : (F.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = P) : o = oe : o === P ? c[0] === ">" ? (o = i ?? M, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? P : c[3] === "\"" ? ce : se) : o === ce || o === se ? o = P : o === N || o === oe ? o = M : (o = P, i = void 0);
		let d = o === P && e[t + 1].startsWith("/>") ? " " : "";
		a += o === M ? n + ie : l >= 0 ? (r.push(s), n.slice(0, l) + T + n.slice(l) + E + d) : n + E + (l === -2 ? t : d);
	}
	return [V(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, H = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = le(t, n);
		if (this.el = e.createElement(l, r), B.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = B.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(T)) {
					let t = u[o++], n = i.getAttribute(e).split(E), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? de : r[1] === "?" ? fe : r[1] === "@" ? pe : G
					}), i.removeAttribute(e);
				} else e.startsWith(E) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (F.test(i.tagName)) {
					let e = i.textContent.split(E), t = e.length - 1;
					if (t > 0) {
						i.textContent = C ? C.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], O()), B.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], O());
					}
				}
			} else if (i.nodeType === 8) if (i.data === re) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(E, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += E.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = D.createElement("template");
		return n.innerHTML = e, n;
	}
};
function U(e, t, n = e, r) {
	if (t === L) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = k(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = U(e, i._$AS(e, t.values), i, r)), t;
}
var ue = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? D).importNode(t, !0);
		B.currentNode = r;
		let i = B.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new W(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new me(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = B.nextNode(), a++);
		}
		return B.currentNode = D, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, W = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = R, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = U(this, e, t), k(e) ? e === R || e == null || e === "" ? (this._$AH !== R && this._$AR(), this._$AH = R) : e !== this._$AH && e !== L && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ae(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== R && k(this._$AH) ? this._$AA.nextSibling.data = e : this.T(D.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = H.createElement(V(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new ue(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = z.get(e.strings);
		return t === void 0 && z.set(e.strings, t = new H(e)), t;
	}
	k(t) {
		A(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(O()), this.O(O()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = S(e).nextSibling;
			S(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, G = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = R, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = R;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = U(this, e, t, 0), a = !k(e) || e !== this._$AH && e !== L, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = U(this, r[n + o], t, o), s === L && (s = this._$AH[o]), a ||= !k(s) || s !== this._$AH[o], s === R ? e = R : e !== R && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, de = class extends G {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === R ? void 0 : e;
	}
}, fe = class extends G {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== R);
	}
}, pe = class extends G {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = U(this, e, t, 0) ?? R) === L) return;
		let n = this._$AH, r = e === R && n !== R || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== R && (n === R || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, me = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		U(this, e);
	}
}, he = x.litHtmlPolyfillSupport;
he?.(H, W), (x.litHtmlVersions ??= []).push("3.3.3");
var ge = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new W(t.insertBefore(O(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, K = globalThis, q = class extends b {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ge(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return L;
	}
};
q._$litElement$ = !0, q.finalized = !0, K.litElementHydrateSupport?.({ LitElement: q });
var _e = K.litElementPolyfillSupport;
_e?.({ LitElement: q }), (K.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var ve = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	hasChanged: y
}, ye = (e = ve, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function be(e) {
	return (t, n) => typeof n == "object" ? ye(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function J(e) {
	return be({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/config.ts
var xe = ["outdoor_temperature", "indoor_temperature"], Se = /^[a-z0-9_]+\.[a-z0-9_]+$/, Ce = /* @__PURE__ */ new Set([
	"auto",
	"landscape",
	"portrait"
]);
function we(e) {
	if (!e || typeof e != "object") throw Error("Weather Kiosk configuration is required.");
	if (!e.entities || typeof e.entities != "object") throw Error("Weather Kiosk requires an entities mapping.");
	for (let t of xe) if (!Te(e.entities[t])) throw Error(`Weather Kiosk requires a valid entities.${t}.`);
	for (let [t, n] of Object.entries(e.entities)) if (n !== void 0 && !Te(n)) throw Error(`Invalid entity ID for entities.${t}: ${n}`);
	let t = e.layout ?? "auto";
	if (!Ce.has(t)) throw Error(`Invalid layout: ${String(t)}`);
	if (e.pressure_trend_threshold !== void 0 && (!Number.isFinite(e.pressure_trend_threshold) || e.pressure_trend_threshold < 0)) throw Error("pressure_trend_threshold must be a non-negative number.");
	return {
		...e,
		type: e.type || "custom:weather-kiosk-card",
		title: e.title?.trim() || "Weather",
		layout: t
	};
}
function Te(e) {
	return typeof e == "string" && Se.test(e);
}
//#endregion
//#region src/history.ts
var Ee = [
	{
		hours: 6,
		label: "6 h"
	},
	{
		hours: 24,
		label: "24 h"
	},
	{
		hours: 168,
		label: "7 d"
	}
];
async function De(e, t, n, r = /* @__PURE__ */ new Date()) {
	let i = /* @__PURE__ */ new Date(r.getTime() - n * 60 * 60 * 1e3);
	return Oe(await e.callWS({
		type: "history/history_during_period",
		start_time: i.toISOString(),
		end_time: r.toISOString(),
		entity_ids: [t],
		minimal_response: !0,
		no_attributes: !0
	}), t);
}
function Oe(e, t) {
	let n = (e[t] ?? []).map((e) => ({
		timestamp: (e.lc ?? e.lu) * 1e3,
		value: Number(e.s)
	})).filter((e) => Number.isFinite(e.timestamp) && Number.isFinite(e.value)).sort((e, t) => e.timestamp - t.timestamp);
	return n.filter((e, t) => t === 0 || e.timestamp !== n[t - 1]?.timestamp || e.value !== n[t - 1]?.value);
}
function ke(e, t = 800, n = 300, r = 18) {
	if (e.length === 0) return;
	let i = Ae(e, 600), a = i.map((e) => e.value), o = Math.min(...a), s = Math.max(...a), c = Math.max((s - o) * .08, .1), l = o - c, u = s + c, d = i[0].timestamp, f = Math.max(i[i.length - 1].timestamp, d + 1), p = t - r * 2, ee = n - r * 2, m = i.map((e) => ({
		x: r + (e.timestamp - d) / (f - d) * p,
		y: r + (u - e.value) / (u - l) * ee
	})), h = m.map(({ x: e, y: t }) => `${e.toFixed(1)},${t.toFixed(1)}`).join(" "), te = m[0], g = m[m.length - 1];
	return {
		points: h,
		area: `${te.x.toFixed(1)},${n - r} ${h} ${g.x.toFixed(1)},${n - r}`,
		minimum: o,
		maximum: s,
		start: d,
		end: f,
		latestX: g.x,
		latestY: g.y
	};
}
function Ae(e, t) {
	if (e.length <= t) return e;
	let n = (e.length - 1) / (t - 1);
	return Array.from({ length: t }, (t, r) => e[Math.round(r * n)]);
}
//#endregion
//#region src/format.ts
var je = /* @__PURE__ */ new Set([
	"unknown",
	"unavailable",
	"none",
	""
]);
function Y(e) {
	if (!e || je.has(e.state.toLowerCase())) return;
	let t = Number(e.state);
	return Number.isFinite(t) ? t : void 0;
}
function X(e, t, n = 1) {
	let r = Y(e);
	return r === void 0 ? {
		value: "—",
		unit: e?.attributes.unit_of_measurement ?? "",
		available: !1
	} : {
		value: new Intl.NumberFormat(t || "en", {
			maximumFractionDigits: n,
			minimumFractionDigits: 0
		}).format(r),
		unit: e?.attributes.unit_of_measurement ?? "",
		available: !0
	};
}
function Me(e) {
	if (e === void 0) return "—";
	let t = [
		"N",
		"NE",
		"E",
		"SE",
		"S",
		"SW",
		"W",
		"NW"
	], n = (e % 360 + 360) % 360;
	return t[Math.round(n / 45) % 8] ?? "—";
}
//#endregion
//#region src/styles.ts
var Ne = o`
  :host {
    display: block;
    height: 100%;
    min-height: 420px;
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
  }

  ha-card {
    box-sizing: border-box;
    height: 100%;
    min-height: inherit;
    overflow: hidden;
    padding: clamp(16px, 2.6vmin, 32px);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
  }

  button {
    border: 0;
    color: inherit;
    font: inherit;
  }

  .kiosk {
    display: grid;
    height: 100%;
    gap: clamp(12px, 2vmin, 24px);
    grid-template-rows: auto minmax(0, 1fr) auto;
  }

  header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    min-width: 0;
  }

  h1,
  h2 {
    margin: 0;
  }

  h1 {
    overflow: hidden;
    font-size: clamp(18px, 2.4vmin, 30px);
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .temperatures {
    display: grid;
    min-height: 0;
    gap: clamp(12px, 2vmin, 24px);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .temperature,
  .metric {
    border: 1px solid color-mix(in srgb, var(--divider-color) 75%, transparent);
    border-radius: var(--ha-card-border-radius, 16px);
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  }

  button.temperature-main,
  button.metric {
    width: 100%;
    text-align: inherit;
    cursor: pointer;
  }

  button:hover,
  button:focus-visible {
    outline: none;
  }

  .temperature:focus-within,
  button.metric:hover,
  button.metric:focus-visible,
  .wind:focus-within {
    border-color: var(--primary-color);
  }

  .temperature {
    display: flex;
    min-height: 190px;
    flex-direction: column;
    justify-content: center;
    padding: clamp(14px, 2.8vmin, 34px);
  }

  .temperature-main {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    background: transparent;
  }

  .label {
    color: var(--secondary-text-color);
    font-size: clamp(13px, 1.7vmin, 21px);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .temperature-value {
    margin-top: 0.06em;
    font-size: clamp(58px, 11vmin, 136px);
    font-variant-numeric: tabular-nums;
    font-weight: 300;
    letter-spacing: -0.07em;
    line-height: 0.95;
  }

  .unit {
    margin-left: 0.12em;
    color: var(--secondary-text-color);
    font-size: 0.38em;
    letter-spacing: 0;
    vertical-align: top;
  }

  .secondary-value {
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 0.5em;
    margin-top: clamp(8px, 1.5vmin, 18px);
    padding: 0;
    background: transparent;
    color: var(--secondary-text-color);
    cursor: pointer;
    font-size: clamp(16px, 2.4vmin, 29px);
    font-variant-numeric: tabular-nums;
  }

  .secondary-value:hover,
  .secondary-value:focus-visible {
    color: var(--primary-color);
  }

  .secondary-value strong {
    color: var(--primary-text-color);
    font-weight: 500;
  }

  .metrics {
    display: grid;
    gap: clamp(8px, 1.4vmin, 16px);
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .metric {
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: center;
    padding: clamp(11px, 1.8vmin, 22px);
  }

  .metric-value {
    margin-top: 0.25em;
    overflow: hidden;
    font-size: clamp(23px, 4vmin, 48px);
    font-variant-numeric: tabular-nums;
    font-weight: 400;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .trend {
    display: block;
    overflow: hidden;
    margin-top: 0.65em;
    color: var(--secondary-text-color);
    font-size: clamp(11px, 1.25vmin, 15px);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .trend.rising {
    color: var(--success-color, #43a047);
  }

  .trend.falling {
    color: var(--warning-color, #fb8c00);
  }

  .wind-values {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: clamp(8px, 1.3vmin, 16px);
    margin-top: 0.25em;
  }

  .wind-direction,
  .wind-speed {
    padding: 0;
    background: transparent;
    cursor: pointer;
  }

  .wind-direction {
    display: grid;
    flex: none;
    place-items: center;
  }

  .wind-arrow {
    display: inline-block;
    color: var(--primary-color);
    font-size: clamp(28px, 4.4vmin, 53px);
    line-height: 0.85;
    transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .direction-label {
    color: var(--secondary-text-color);
    font-size: clamp(10px, 1.2vmin, 14px);
    font-weight: 700;
  }

  .wind-speed {
    overflow: hidden;
    font-size: clamp(23px, 4vmin, 48px);
    font-variant-numeric: tabular-nums;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .unavailable {
    opacity: 0.55;
  }

  .history-backdrop {
    position: fixed;
    z-index: 1000;
    display: grid;
    padding: clamp(12px, 3vmin, 36px);
    background: rgb(0 0 0 / 0.58);
    inset: 0;
    place-items: center;
    animation: fade-in 160ms ease-out;
  }

  .history-dialog {
    box-sizing: border-box;
    width: min(920px, 94vw);
    max-height: 92vh;
    overflow: auto;
    padding: clamp(18px, 3vmin, 34px);
    border: 1px solid var(--divider-color);
    border-radius: 24px;
    background: var(--ha-card-background, var(--card-background-color));
    box-shadow: 0 24px 80px rgb(0 0 0 / 0.38);
    animation: dialog-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .dialog-header {
    display: grid;
    align-items: center;
    gap: 20px;
    grid-template-columns: 1fr auto auto;
  }

  .dialog-eyebrow {
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .dialog-header h2 {
    margin-top: 3px;
    font-size: clamp(25px, 4vmin, 42px);
    font-weight: 500;
  }

  .dialog-current {
    font-size: clamp(30px, 5vmin, 52px);
    font-variant-numeric: tabular-nums;
    font-weight: 300;
  }

  .dialog-current span {
    margin-left: 0.12em;
    color: var(--secondary-text-color);
    font-size: 0.42em;
    vertical-align: top;
  }

  .close-button {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    cursor: pointer;
    font-size: 30px;
    line-height: 1;
  }

  .range-selector {
    display: flex;
    gap: 6px;
    margin: 22px 0 14px;
  }

  .range-selector button,
  .dialog-footer button {
    padding: 8px 15px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    cursor: pointer;
    font-weight: 600;
  }

  .range-selector button.selected {
    background: var(--primary-color);
    color: var(--text-primary-color, white);
  }

  .chart-frame {
    position: relative;
    min-height: min(38vh, 330px);
    padding: 18px 0 28px;
  }

  .history-chart {
    width: 100%;
    height: min(38vh, 330px);
    overflow: visible;
  }

  .grid-line {
    stroke: var(--divider-color);
    stroke-dasharray: 5 7;
    stroke-width: 1;
  }

  .chart-area {
    fill: url(#history-fill);
  }

  .chart-line {
    fill: none;
    stroke: var(--primary-color);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 4;
    vector-effect: non-scaling-stroke;
  }

  .latest-point {
    fill: var(--primary-color);
    stroke: var(--ha-card-background, var(--card-background-color));
    stroke-width: 3;
    vector-effect: non-scaling-stroke;
  }

  .chart-y-label {
    position: absolute;
    z-index: 1;
    left: 24px;
    padding: 2px 5px;
    border-radius: 4px;
    background: color-mix(in srgb, var(--card-background-color) 82%, transparent);
    color: var(--secondary-text-color);
    font-size: 11px;
    pointer-events: none;
  }

  .chart-y-label.max {
    top: 18px;
  }

  .chart-y-label.min {
    bottom: 31px;
  }

  .chart-x-labels {
    display: flex;
    justify-content: space-between;
    color: var(--secondary-text-color);
    font-size: 12px;
  }

  .chart-message {
    display: flex;
    min-height: min(38vh, 330px);
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--secondary-text-color);
    text-align: center;
  }

  .chart-message.error {
    color: var(--error-color);
  }

  .spinner {
    width: 22px;
    height: 22px;
    border: 3px solid var(--divider-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 700ms linear infinite;
  }

  .dialog-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: var(--secondary-text-color);
    font-size: 13px;
  }

  .dialog-footer span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .portrait .temperatures {
    grid-template-columns: 1fr;
  }

  .portrait .metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (orientation: portrait), (max-width: 680px) {
    .auto .temperatures {
      grid-template-columns: 1fr;
    }

    .auto .metrics {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .temperature-value {
      font-size: clamp(52px, 15vw, 100px);
    }

    .dialog-header {
      gap: 10px;
    }

    .dialog-current {
      display: none;
    }

    .dialog-header {
      grid-template-columns: 1fr auto;
    }
  }

  @keyframes fade-in {
    from { opacity: 0; }
  }

  @keyframes dialog-in {
    from { transform: translateY(12px) scale(0.98); opacity: 0; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    .wind-arrow,
    .history-backdrop,
    .history-dialog,
    .spinner {
      transition: none;
      animation: none;
    }
  }
`;
//#endregion
//#region \0@oxc-project+runtime@0.142.0/helpers/esm/decorate.js
function Z(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/weather-kiosk-card.ts
var Q = class extends q {
	constructor(...e) {
		super(...e), this.historyPoints = [], this.historyLoading = !1, this.historyRequest = 0, this.pressureFetchedAt = 0, this.closeHistory = () => {
			this.historyRequest += 1, this.activeHistory = void 0;
		}, this.handleBackdropClick = (e) => {
			e.target === e.currentTarget && this.closeHistory();
		}, this.handleKeydown = (e) => {
			e.key === "Escape" && this.activeHistory && this.closeHistory();
		};
	}
	static {
		this.styles = Ne;
	}
	setConfig(e) {
		this.config = we(e), this.pressureRequestKey = void 0, this.pressureEntityId = void 0, this.pressureFetchedAt = 0;
	}
	getCardSize() {
		return 9;
	}
	getGridOptions() {
		return {
			rows: 8,
			min_rows: 6,
			columns: "full",
			min_columns: 6
		};
	}
	static getStubConfig() {
		return {
			title: "Weather",
			entities: {
				outdoor_temperature: "sensor.outdoor_temperature",
				indoor_temperature: "sensor.indoor_temperature"
			}
		};
	}
	connectedCallback() {
		super.connectedCallback(), window.addEventListener("keydown", this.handleKeydown);
	}
	disconnectedCallback() {
		window.removeEventListener("keydown", this.handleKeydown), super.disconnectedCallback();
	}
	updated(e) {
		this.loadPressureTrend();
	}
	render() {
		if (!this.config || !this.hass) return I`<ha-card aria-busy="true"></ha-card>`;
		let e = this.config.entities;
		return I`
      <ha-card>
        <main class="kiosk ${this.config.layout}">
          <header><h1>${this.config.title}</h1></header>
          <section class="temperatures" aria-label="Temperatures">
            ${this.renderTemperature("Outdoor", e.outdoor_temperature, e.outdoor_humidity)}
            ${this.renderTemperature("Indoor", e.indoor_temperature, e.indoor_humidity)}
          </section>
          <section class="metrics" aria-label="Weather details">
            ${this.renderPressure(e.pressure)}
            ${this.renderMetric("Rain now", e.rain_rate)}
            ${this.renderMetric("Rain · 24 h", e.rain_24h)}
            ${this.renderWind(e.wind_speed, e.wind_direction)}
          </section>
        </main>
        ${this.renderHistoryDialog()}
      </ha-card>
    `;
	}
	renderTemperature(e, t, n) {
		let r = X(this.entity(t), this.language, 1), i = n ? X(this.entity(n), this.language, 0) : void 0;
		return I`
      <article class="temperature ${r.available ? "" : "unavailable"}">
        <button
          class="temperature-main"
          type="button"
          aria-label="Show ${e.toLowerCase()} temperature history"
          @click=${() => this.openHistory(t, `${e} temperature`)}
        >
          <span class="label">${e}</span>
          <span class="temperature-value">
            ${r.value}<span class="unit">${r.unit}</span>
          </span>
        </button>
        ${n && i ? I`
              <button
                class="secondary-value"
                type="button"
                aria-label="Show ${e.toLowerCase()} humidity history"
                @click=${() => this.openHistory(n, `${e} humidity`)}
              >
                <span>Humidity</span>
                <strong>${i.value}${i.unit}</strong>
              </button>
            ` : R}
      </article>
    `;
	}
	renderMetric(e, t) {
		if (!t) return I`
        <div class="metric unavailable">
          <span class="label">${e}</span>
          <span class="metric-value">—</span>
        </div>
      `;
		let n = X(this.entity(t), this.language, 1);
		return I`
      <button
        class="metric ${n.available ? "" : "unavailable"}"
        type="button"
        aria-label="Show ${e.toLowerCase()} history"
        @click=${() => this.openHistory(t, e)}
      >
        <span class="label">${e}</span>
        <span class="metric-value">
          ${n.value}<span class="unit">${n.unit}</span>
        </span>
      </button>
    `;
	}
	renderPressure(e) {
		if (!e) return this.renderMetric("Pressure");
		let t = X(this.entity(e), this.language, 1), n = this.pressureTrend, r = n?.direction === "rising" ? "↗" : n?.direction === "falling" ? "↘" : "→", i = n ? `${n.direction} ${this.formatDelta(n.delta)}${t.unit} / 3 h` : "Trend unavailable";
		return I`
      <button
        class="metric ${t.available ? "" : "unavailable"}"
        type="button"
        aria-label="Show pressure history"
        @click=${() => this.openHistory(e, "Pressure")}
      >
        <span class="label">Pressure</span>
        <span class="metric-value">
          ${t.value}<span class="unit">${t.unit}</span>
        </span>
        <span class="trend ${n?.direction ?? ""}">
          <span aria-hidden="true">${r}</span> ${i}
        </span>
      </button>
    `;
	}
	renderWind(e, t) {
		let n = e ? X(this.entity(e), this.language, 1) : {
			value: "—",
			unit: "",
			available: !1
		}, r = t ? Y(this.entity(t)) : void 0;
		return I`
      <article class="metric wind ${n.available ? "" : "unavailable"}">
        <span class="label">Wind</span>
        <div class="wind-values">
          ${t ? I`
                <button
                  class="wind-direction"
                  type="button"
                  aria-label="Show wind direction history"
                  @click=${() => this.openHistory(t, "Wind direction")}
                >
                  <span
                    class="wind-arrow"
                    style=${r === void 0 ? "" : `transform: rotate(${r}deg)`}
                    aria-hidden="true"
                    >↑</span
                  >
                  <span class="direction-label">${Me(r)}</span>
                </button>
              ` : I`<span class="wind-arrow">↑</span>`}
          ${e ? I`
                <button
                  class="wind-speed"
                  type="button"
                  aria-label="Show wind speed history"
                  @click=${() => this.openHistory(e, "Wind speed")}
                >
                  ${n.value}<span class="unit">${n.unit}</span>
                </button>
              ` : I`<span class="wind-speed">—</span>`}
        </div>
      </article>
    `;
	}
	renderHistoryDialog() {
		if (!this.activeHistory) return R;
		let e = this.entity(this.activeHistory.entityId), t = X(e, this.language, 1), n = ke(this.historyPoints), r = new Intl.DateTimeFormat(this.language, {
			weekday: this.activeHistory.hours >= 168 ? "short" : void 0,
			hour: "2-digit",
			minute: "2-digit"
		}), i = new Intl.NumberFormat(this.language, { maximumFractionDigits: 1 });
		return I`
      <div
        class="history-backdrop"
        @click=${this.handleBackdropClick}
        role="presentation"
      >
        <section
          class="history-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="history-title"
        >
          <header class="dialog-header">
            <div>
              <span class="dialog-eyebrow">History</span>
              <h2 id="history-title">${this.activeHistory.label}</h2>
            </div>
            <div class="dialog-current">
              ${t.value}<span>${t.unit}</span>
            </div>
            <button
              class="close-button"
              type="button"
              aria-label="Close history"
              @click=${this.closeHistory}
            >
              ×
            </button>
          </header>

          <nav class="range-selector" aria-label="History range">
            ${Ee.map((e) => I`
                <button
                  type="button"
                  class=${e.hours === this.activeHistory?.hours ? "selected" : ""}
                  aria-pressed=${e.hours === this.activeHistory?.hours}
                  @click=${() => this.changeHistoryRange(e.hours)}
                >
                  ${e.label}
                </button>
              `)}
          </nav>

          <div class="chart-frame" aria-live="polite">
            ${this.historyLoading ? I`<div class="chart-message"><span class="spinner"></span>Loading history…</div>` : this.historyError ? I`<div class="chart-message error">${this.historyError}</div>` : n ? I`
                      <div class="chart-y-label max">
                        ${i.format(n.maximum)} ${t.unit}
                      </div>
                      <div class="chart-y-label min">
                        ${i.format(n.minimum)} ${t.unit}
                      </div>
                      <svg
                        class="history-chart"
                        viewBox="0 0 800 300"
                        preserveAspectRatio="none"
                        role="img"
                        aria-label="${this.activeHistory.label} history graph"
                      >
                        <defs>
                          <linearGradient id="history-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"></stop>
                            <stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0.02"></stop>
                          </linearGradient>
                        </defs>
                        <line class="grid-line" x1="18" y1="18" x2="782" y2="18"></line>
                        <line class="grid-line" x1="18" y1="150" x2="782" y2="150"></line>
                        <line class="grid-line" x1="18" y1="282" x2="782" y2="282"></line>
                        <polygon class="chart-area" points=${n.area}></polygon>
                        <polyline class="chart-line" points=${n.points}></polyline>
                        <circle class="latest-point" cx=${n.latestX} cy=${n.latestY} r="5"></circle>
                      </svg>
                      <div class="chart-x-labels">
                        <span>${r.format(n.start)}</span>
                        <span>Now</span>
                      </div>
                    ` : I`<div class="chart-message">No recorded numeric history for this period.</div>`}
          </div>

          <footer class="dialog-footer">
            <span>${e?.attributes.friendly_name ?? this.activeHistory.entityId}</span>
            <button type="button" @click=${() => this.showMoreInfo(this.activeHistory.entityId)}>
              Entity details
            </button>
          </footer>
        </section>
      </div>
    `;
	}
	entity(e) {
		return e ? this.hass?.states[e] : void 0;
	}
	get language() {
		return this.hass?.locale?.language ?? this.hass?.language ?? "en";
	}
	openHistory(e, t) {
		this.activeHistory = {
			entityId: e,
			label: t,
			hours: 24
		}, this.historyPoints = [], this.historyError = void 0, this.loadActiveHistory();
	}
	changeHistoryRange(e) {
		!this.activeHistory || this.activeHistory.hours === e || (this.activeHistory = {
			...this.activeHistory,
			hours: e
		}, this.loadActiveHistory());
	}
	async loadActiveHistory() {
		if (!this.hass || !this.activeHistory) return;
		let e = ++this.historyRequest, { entityId: t, hours: n } = this.activeHistory;
		this.historyLoading = !0, this.historyError = void 0;
		try {
			let r = await De(this.hass, t, n);
			if (e !== this.historyRequest) return;
			this.historyPoints = this.appendCurrentPoint(r, t);
		} catch (t) {
			if (e !== this.historyRequest) return;
			console.error("Weather Kiosk could not load history", t), this.historyError = "History could not be loaded. Check that Recorder includes this entity.";
		} finally {
			e === this.historyRequest && (this.historyLoading = !1);
		}
	}
	appendCurrentPoint(e, t) {
		let n = this.entity(t), r = Y(n);
		if (r === void 0 || !n) return e;
		let i = new Date(n.last_updated).getTime();
		if (!Number.isFinite(i)) return e;
		let a = e[e.length - 1];
		return a?.timestamp === i && a.value === r ? e : [...e, {
			timestamp: i,
			value: r
		}].sort((e, t) => e.timestamp - t.timestamp);
	}
	async loadPressureTrend() {
		let e = this.config?.entities.pressure, t = this.hass, n = this.entity(e);
		if (!t || !e || !n) return;
		let r = Date.now();
		if (e === this.pressureEntityId && r - this.pressureFetchedAt < 6e5) return;
		let i = `${e}:${r}`;
		this.pressureRequestKey = i, this.pressureEntityId = e, this.pressureFetchedAt = r;
		try {
			let r = await De(t, e, 3);
			if (this.pressureRequestKey !== i) return;
			let a = Y(n), o = r[0]?.value;
			if (a === void 0 || o === void 0) {
				this.pressureTrend = void 0;
				return;
			}
			let s = a - o, c = this.config?.pressure_trend_threshold ?? Pe(n.attributes.unit_of_measurement);
			this.pressureTrend = {
				delta: s,
				direction: s > c ? "rising" : s < -c ? "falling" : "steady"
			};
		} catch (e) {
			console.warn("Weather Kiosk could not calculate pressure trend", e), this.pressureRequestKey === i && (this.pressureTrend = void 0);
		}
	}
	formatDelta(e) {
		return new Intl.NumberFormat(this.language, {
			maximumFractionDigits: 1,
			signDisplay: "always"
		}).format(e);
	}
	showMoreInfo(e) {
		this.dispatchEvent(new CustomEvent("hass-more-info", {
			bubbles: !0,
			composed: !0,
			detail: { entityId: e }
		}));
	}
};
Z([be({ attribute: !1 })], Q.prototype, "hass", void 0), Z([J()], Q.prototype, "config", void 0), Z([J()], Q.prototype, "activeHistory", void 0), Z([J()], Q.prototype, "historyPoints", void 0), Z([J()], Q.prototype, "historyLoading", void 0), Z([J()], Q.prototype, "historyError", void 0), Z([J()], Q.prototype, "pressureTrend", void 0);
function Pe(e) {
	let t = String(e ?? "").toLowerCase();
	return t === "kpa" ? .05 : t === "inhg" ? .015 : t === "psi" ? .007 : .5;
}
//#endregion
//#region src/index.ts
var $ = "weather-kiosk-card";
customElements.get($) || customElements.define($, Q), window.customCards = window.customCards ?? [], window.customCards.some((e) => e.type === $) || window.customCards.push({
	type: $,
	name: "Weather Kiosk",
	description: "A full-screen weather station card for wall-mounted displays.",
	preview: !1
}), console.info("%c WEATHER-KIOSK-CARD %c 0.2.0 ", "color: white; background: #1565c0; font-weight: 700;", "color: #1565c0; background: white; font-weight: 700;");
//#endregion
