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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, _ = g ? g.emptyScript : "", v = h.reactiveElementPolyfillSupport, y = (e, t) => e, b = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? _ : null;
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
}, x = (e, t) => !l(e, t), S = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	useDefault: !1,
	hasChanged: x
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var C = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = S) {
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
		return this.elementProperties.get(e) ?? S;
	}
	static _$Ei() {
		if (this.hasOwnProperty(y("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(y("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(y("properties"))) {
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
			let i = (n.converter?.toAttribute === void 0 ? b : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? b : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? x)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
C.elementStyles = [], C.shadowRootOptions = { mode: "open" }, C[y("elementProperties")] = /* @__PURE__ */ new Map(), C[y("finalized")] = /* @__PURE__ */ new Map(), v?.({ ReactiveElement: C }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var w = globalThis, T = (e) => e, E = w.trustedTypes, D = E ? E.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ee = "$lit$", O = `lit$${Math.random().toFixed(9).slice(2)}$`, te = "?" + O, ne = `<${te}>`, k = document, A = () => k.createComment(""), j = (e) => e === null || typeof e != "object" && typeof e != "function", re = Array.isArray, ie = (e) => re(e) || typeof e?.[Symbol.iterator] == "function", ae = "[ 	\n\f\r]", M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, oe = /-->/g, se = />/g, N = RegExp(`>|${ae}(?:([^\\s"'>=/]+)(${ae}*=${ae}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ce = /'/g, le = /"/g, ue = /^(?:script|style|textarea|title)$/i, P = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), F = Symbol.for("lit-noChange"), I = Symbol.for("lit-nothing"), de = /* @__PURE__ */ new WeakMap(), L = k.createTreeWalker(k, 129);
function fe(e, t) {
	if (!re(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return D === void 0 ? t : D.createHTML(t);
}
var pe = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = M;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === M ? c[1] === "!--" ? o = oe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = N) : (ue.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = N) : o = se : o === N ? c[0] === ">" ? (o = i ?? M, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? N : c[3] === "\"" ? le : ce) : o === le || o === ce ? o = N : o === oe || o === se ? o = M : (o = N, i = void 0);
		let d = o === N && e[t + 1].startsWith("/>") ? " " : "";
		a += o === M ? n + ne : l >= 0 ? (r.push(s), n.slice(0, l) + ee + n.slice(l) + O + d) : n + O + (l === -2 ? t : d);
	}
	return [fe(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, R = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = pe(t, n);
		if (this.el = e.createElement(l, r), L.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = L.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ee)) {
					let t = u[o++], n = i.getAttribute(e).split(O), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? he : r[1] === "?" ? ge : r[1] === "@" ? _e : V
					}), i.removeAttribute(e);
				} else e.startsWith(O) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (ue.test(i.tagName)) {
					let e = i.textContent.split(O), t = e.length - 1;
					if (t > 0) {
						i.textContent = E ? E.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], A()), L.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], A());
					}
				}
			} else if (i.nodeType === 8) if (i.data === te) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(O, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += O.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = k.createElement("template");
		return n.innerHTML = e, n;
	}
};
function z(e, t, n = e, r) {
	if (t === F) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = j(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = z(e, i._$AS(e, t.values), i, r)), t;
}
var me = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? k).importNode(t, !0);
		L.currentNode = r;
		let i = L.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new B(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new ve(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = L.nextNode(), a++);
		}
		return L.currentNode = k, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, B = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = I, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = z(this, e, t), j(e) ? e === I || e == null || e === "" ? (this._$AH !== I && this._$AR(), this._$AH = I) : e !== this._$AH && e !== F && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ie(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== I && j(this._$AH) ? this._$AA.nextSibling.data = e : this.T(k.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = R.createElement(fe(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new me(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = de.get(e.strings);
		return t === void 0 && de.set(e.strings, t = new R(e)), t;
	}
	k(t) {
		re(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(A()), this.O(A()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = T(e).nextSibling;
			T(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, V = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = I, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = I;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = z(this, e, t, 0), a = !j(e) || e !== this._$AH && e !== F, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = z(this, r[n + o], t, o), s === F && (s = this._$AH[o]), a ||= !j(s) || s !== this._$AH[o], s === I ? e = I : e !== I && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === I ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, he = class extends V {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === I ? void 0 : e;
	}
}, ge = class extends V {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== I);
	}
}, _e = class extends V {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = z(this, e, t, 0) ?? I) === F) return;
		let n = this._$AH, r = e === I && n !== I || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== I && (n === I || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, ve = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		z(this, e);
	}
}, ye = w.litHtmlPolyfillSupport;
ye?.(R, B), (w.litHtmlVersions ??= []).push("3.3.3");
var be = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new B(t.insertBefore(A(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, H = globalThis, U = class extends C {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = be(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return F;
	}
};
U._$litElement$ = !0, U.finalized = !0, H.litElementHydrateSupport?.({ LitElement: U });
var xe = H.litElementPolyfillSupport;
xe?.({ LitElement: U }), (H.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/property.js
var Se = {
	attribute: !0,
	type: String,
	converter: b,
	reflect: !1,
	hasChanged: x
}, Ce = (e = Se, t, n) => {
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
function W(e) {
	return (t, n) => typeof n == "object" ? Ce(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function G(e) {
	return W({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/config.ts
var we = ["outdoor_temperature", "indoor_temperature"], Te = /^[a-z0-9_]+\.[a-z0-9_]+$/, Ee = /* @__PURE__ */ new Set([
	"auto",
	"landscape",
	"portrait"
]), De = /* @__PURE__ */ new Set(["hourly", "daily"]);
function Oe(e) {
	if (!e || typeof e != "object") throw Error("Weather Kiosk configuration is required.");
	if (!e.entities || typeof e.entities != "object") throw Error("Weather Kiosk requires an entities mapping.");
	for (let t of we) if (!ke(e.entities[t])) throw Error(`Weather Kiosk requires a valid entities.${t}.`);
	for (let [t, n] of Object.entries(e.entities)) if (n !== void 0 && !ke(n)) throw Error(`Invalid entity ID for entities.${t}: ${n}`);
	let t = e.layout ?? "auto";
	if (!Ee.has(t)) throw Error(`Invalid layout: ${String(t)}`);
	if (e.pressure_trend_threshold !== void 0 && (!Number.isFinite(e.pressure_trend_threshold) || e.pressure_trend_threshold < 0)) throw Error("pressure_trend_threshold must be a non-negative number.");
	if (e.forecast_entity !== void 0 && !ke(e.forecast_entity)) throw Error("forecast_entity must be a valid weather entity ID.");
	let n = e.forecast_type ?? "hourly";
	if (!De.has(n)) throw Error(`Invalid forecast_type: ${String(n)}`);
	return {
		...e,
		type: e.type || "custom:weather-kiosk-card",
		title: e.title?.trim() || "",
		forecast_type: n,
		layout: t
	};
}
function ke(e) {
	return typeof e == "string" && Te.test(e);
}
//#endregion
//#region src/history.ts
var Ae = [
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
async function je(e, t, n, r = /* @__PURE__ */ new Date()) {
	let i = /* @__PURE__ */ new Date(r.getTime() - n * 60 * 60 * 1e3);
	return Me(await e.callWS({
		type: "history/history_during_period",
		start_time: i.toISOString(),
		end_time: r.toISOString(),
		entity_ids: [t],
		minimal_response: !0,
		no_attributes: !0
	}), t);
}
function Me(e, t) {
	let n = (e[t] ?? []).map((e) => ({
		timestamp: (e.lc ?? e.lu) * 1e3,
		value: Number(e.s)
	})).filter((e) => Number.isFinite(e.timestamp) && Number.isFinite(e.value)).sort((e, t) => e.timestamp - t.timestamp);
	return n.filter((e, t) => t === 0 || e.timestamp !== n[t - 1]?.timestamp || e.value !== n[t - 1]?.value);
}
function Ne(e, t, n, r, i = 800, a = 300, o = 18) {
	let s = n - r * 60 * 60 * 1e3, c = n + r * 60 * 60 * 1e3, l = e.filter((e) => e.timestamp >= s && e.timestamp <= n), u = t.filter((e) => e.timestamp >= n && e.timestamp <= c), d = [...l, ...u];
	if (!d.length) return;
	let f = d.map((e) => e.value), p = Math.min(...f), m = Math.max(...f), h = Math.max((m - p) * .08, .1), g = p - h, _ = m + h, v = i - o * 2, y = a - o * 2, b = (e) => e.map((e) => ({
		x: o + (e.timestamp - s) / (c - s) * v,
		y: o + (_ - e.value) / (_ - g) * y
	})), x = b(l), S = b(l.length && u.length ? [{
		timestamp: n,
		value: l[l.length - 1].value
	}, ...u] : u), C = (e) => e.map(({ x: e, y: t }) => `${e.toFixed(1)},${t.toFixed(1)}`).join(" "), w = C(x), T = C(S), E = x[0] ?? S[0], D = x[x.length - 1] ?? S[0];
	return {
		points: w,
		forecastPoints: T,
		area: w ? `${E.x.toFixed(1)},${a - o} ${w} ${D.x.toFixed(1)},${a - o}` : "",
		minimum: p,
		maximum: m,
		start: s,
		end: c,
		latestX: D.x,
		latestY: D.y,
		nowX: i / 2
	};
}
function Pe(e, t = 800, n = 300, r = 18) {
	if (e.length === 0) return;
	let i = Fe(e, 600), a = i.map((e) => e.value), o = Math.min(...a), s = Math.max(...a), c = Math.max((s - o) * .08, .1), l = o - c, u = s + c, d = i[0].timestamp, f = Math.max(i[i.length - 1].timestamp, d + 1), p = t - r * 2, m = n - r * 2, h = i.map((e) => ({
		x: r + (e.timestamp - d) / (f - d) * p,
		y: r + (u - e.value) / (u - l) * m
	})), g = h.map(({ x: e, y: t }) => `${e.toFixed(1)},${t.toFixed(1)}`).join(" "), _ = h[0], v = h[h.length - 1];
	return {
		points: g,
		area: `${_.x.toFixed(1)},${n - r} ${g} ${v.x.toFixed(1)},${n - r}`,
		minimum: o,
		maximum: s,
		start: d,
		end: f,
		latestX: v.x,
		latestY: v.y
	};
}
function Fe(e, t) {
	if (e.length <= t) return e;
	let n = (e.length - 1) / (t - 1);
	return Array.from({ length: t }, (t, r) => e[Math.round(r * n)]);
}
//#endregion
//#region src/forecast.ts
async function Ie(e, t, n) {
	let r = await e.callWS({
		type: "call_service",
		domain: "weather",
		service: "get_forecasts",
		service_data: { type: n },
		target: { entity_id: t },
		return_response: !0
	});
	return ((r.response ?? r)[t]?.forecast ?? []).filter((e) => Number.isFinite(new Date(e.datetime).getTime()));
}
function Le(e, t, n, r, i, a) {
	return e.flatMap((e) => {
		let o = new Date(e.datetime).getTime();
		if (!Number.isFinite(o) || o < i || o > a) return [];
		let s = Be(e, t);
		if (s === void 0) return [];
		let c = Ve(s, n, r, t);
		return c === void 0 ? [] : [{
			timestamp: o,
			value: c
		}];
	});
}
function Re(e, t, n, r, i, a) {
	let o = Le(e, t, n, r, i, a).map((e) => e.value);
	if (t === "temperature") for (let s of e) {
		let e = new Date(s.datetime).getTime();
		if (e < i || e > a || typeof s.templow != "number" || !Number.isFinite(s.templow)) continue;
		let c = Ve(s.templow, n, r, t);
		c !== void 0 && o.push(c);
	}
	if (o.length) return {
		minimum: Math.min(...o),
		maximum: Math.max(...o)
	};
}
function ze(e, t) {
	return e === "temperature" ? t.temperature : e === "pressure" ? t.pressure : e === "wind_speed" ? t.wind_speed : e === "humidity" ? "%" : "°";
}
function Be(e, t) {
	if (t === "wind_bearing") {
		let t = Number(e.wind_bearing);
		return Number.isFinite(t) ? t : void 0;
	}
	let n = e[t];
	return typeof n == "number" && Number.isFinite(n) ? n : void 0;
}
function Ve(e, t, n, r) {
	if (!t || !n || K(t) === K(n)) return e;
	let i = K(t), a = K(n);
	if (r === "temperature") {
		let t = i === "°f" ? (e - 32) * (5 / 9) : i === "°c" ? e : void 0;
		return t === void 0 ? void 0 : a === "°f" ? 9 / 5 * t + 32 : a === "°c" ? t : void 0;
	}
	if (r === "pressure") {
		let t = i === "hpa" || i === "mbar" ? e : i === "kpa" ? e * 10 : i === "inhg" ? e * 33.8638866667 : i === "psi" ? e * 68.9475729 : void 0;
		return t === void 0 ? void 0 : a === "hpa" || a === "mbar" ? t : a === "kpa" ? t / 10 : a === "inhg" ? t / 33.8638866667 : a === "psi" ? t / 68.9475729 : void 0;
	}
	if (r === "wind_speed") {
		let t = i === "m/s" ? e : i === "km/h" ? e / 3.6 : i === "mph" ? e * .44704 : i === "kn" || i === "kt" ? e * .514444 : void 0;
		return t === void 0 ? void 0 : a === "m/s" ? t : a === "km/h" ? t * 3.6 : a === "mph" ? t / .44704 : a === "kn" || a === "kt" ? t / .514444 : void 0;
	}
	return r === "humidity" || r === "wind_bearing" ? e : void 0;
}
function K(e) {
	return e.trim().toLowerCase().replace("kph", "km/h");
}
//#endregion
//#region src/format.ts
var He = /* @__PURE__ */ new Set([
	"unknown",
	"unavailable",
	"none",
	""
]);
function q(e) {
	if (!e || He.has(e.state.toLowerCase())) return;
	let t = Number(e.state);
	return Number.isFinite(t) ? t : void 0;
}
function J(e, t, n = 1) {
	let r = q(e);
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
function Ue(e, t = "en") {
	if (e === void 0) return "—";
	let n = t.toLowerCase().startsWith("da") ? [
		"N",
		"NØ",
		"Ø",
		"SØ",
		"S",
		"SV",
		"V",
		"NV"
	] : [
		"N",
		"NE",
		"E",
		"SE",
		"S",
		"SW",
		"W",
		"NW"
	], r = (e % 360 + 360) % 360;
	return n[Math.round(r / 45) % 8] ?? "—";
}
//#endregion
//#region src/localize.ts
var We = {
	defaultTitle: "Weather",
	cardName: "Weather Kiosk",
	cardDescription: "A full-screen weather station card for wall-mounted displays.",
	temperatures: "Temperatures",
	weatherDetails: "Weather details",
	outdoor: "Outdoor",
	indoor: "Indoor",
	temperature: "temperature",
	humidity: "Humidity",
	pressure: "Pressure",
	rainNow: "Rain now",
	rain24h: "Rain · 24 h",
	wind: "Wind",
	windSpeed: "Wind speed",
	windDirection: "Wind direction",
	rising: "rising",
	steady: "steady",
	falling: "falling",
	trendUnavailable: "Trend unavailable",
	history: "History",
	closeHistory: "Close history",
	historyRange: "History range",
	loadingHistory: "Loading history…",
	now: "Now",
	noHistory: "No recorded numeric history for this period.",
	entityDetails: "Entity details",
	historyError: "History could not be loaded. Check that Recorder includes this entity.",
	forecast: "Forecast",
	forecast24h: "Next 24 h",
	minimumAbbreviation: "min",
	maximumAbbreviation: "max",
	showHistory: (e) => `Show ${e.toLowerCase()} history`,
	historyGraph: (e) => `${e} history graph`,
	editor: {
		display: "Display",
		displayDescription: "Choose the heading and how the card responds to its available space.",
		title: "Title",
		layout: "Layout",
		automatic: "Automatic",
		landscape: "Landscape",
		portrait: "Portrait",
		temperatures: "Temperatures",
		temperaturesDescription: "Both temperature sensors are required and shown at equal size.",
		humidity: "Humidity",
		humidityDescription: "Optional humidity readings shown with their matching temperature.",
		weatherDetails: "Weather details",
		weatherDetailsDescription: "Optional pressure, rain, and wind readings.",
		outdoorTemperature: "Outdoor temperature",
		indoorTemperature: "Indoor temperature",
		outdoorHumidity: "Outdoor humidity",
		indoorHumidity: "Indoor humidity",
		pressure: "Pressure",
		currentRainRate: "Current rain rate",
		rain24h: "Rain over the last 24 hours",
		windSpeed: "Wind speed",
		windDirection: "Wind direction",
		pressureTrend: "Pressure trend",
		pressureTrendDescription: "Leave blank to use the automatic threshold for the pressure unit.",
		steadyThreshold: "Steady threshold",
		automaticThreshold: "Automatic",
		pressureUnitHelper: "Uses the configured pressure sensor's unit.",
		forecast: "Forecast",
		forecastDescription: "Select a weather entity. Outdoor graphs then place now at the center, with history before it and forecast after it.",
		forecastEntity: "Weather entity",
		forecastType: "Forecast resolution",
		hourly: "Hourly",
		daily: "Daily"
	}
}, Ge = {
	defaultTitle: "Vejret",
	cardName: "Vejrkiosk",
	cardDescription: "Et vejrstationskort i fuld skærm til vægmonterede skærme.",
	temperatures: "Temperaturer",
	weatherDetails: "Vejrdata",
	outdoor: "Ude",
	indoor: "Inde",
	temperature: "temperatur",
	humidity: "Luftfugtighed",
	pressure: "Lufttryk",
	rainNow: "Regn nu",
	rain24h: "Regn · 24 t",
	wind: "Vind",
	windSpeed: "Vindhastighed",
	windDirection: "Vindretning",
	rising: "stigende",
	steady: "stabilt",
	falling: "faldende",
	trendUnavailable: "Trend ikke tilgængelig",
	history: "Historik",
	closeHistory: "Luk historik",
	historyRange: "Tidsinterval for historik",
	loadingHistory: "Indlæser historik…",
	now: "Nu",
	noHistory: "Der er ingen registrerede numeriske data for perioden.",
	entityDetails: "Entitetsoplysninger",
	historyError: "Historikken kunne ikke indlæses. Kontrollér, at Recorder medtager denne entitet.",
	forecast: "Prognose",
	forecast24h: "Næste 24 t",
	minimumAbbreviation: "min.",
	maximumAbbreviation: "maks.",
	showHistory: (e) => `Vis historik for ${e.toLowerCase()}`,
	historyGraph: (e) => `Historikgraf for ${e.toLowerCase()}`,
	editor: {
		display: "Visning",
		displayDescription: "Vælg overskrift, og hvordan kortet tilpasses den tilgængelige plads.",
		title: "Titel",
		layout: "Layout",
		automatic: "Automatisk",
		landscape: "Liggende",
		portrait: "Stående",
		temperatures: "Temperaturer",
		temperaturesDescription: "Begge temperatursensorer er påkrævede og vises lige store.",
		humidity: "Luftfugtighed",
		humidityDescription: "Valgfri luftfugtighed, som vises sammen med den tilhørende temperatur.",
		weatherDetails: "Vejrdata",
		weatherDetailsDescription: "Valgfri målinger af lufttryk, regn og vind.",
		outdoorTemperature: "Udendørstemperatur",
		indoorTemperature: "Indendørstemperatur",
		outdoorHumidity: "Udendørs luftfugtighed",
		indoorHumidity: "Indendørs luftfugtighed",
		pressure: "Lufttryk",
		currentRainRate: "Aktuel regnintensitet",
		rain24h: "Regn de seneste 24 timer",
		windSpeed: "Vindhastighed",
		windDirection: "Vindretning",
		pressureTrend: "Lufttrykstrend",
		pressureTrendDescription: "Lad feltet stå tomt for at bruge den automatiske grænse for lufttryksenheden.",
		steadyThreshold: "Grænse for stabilt lufttryk",
		automaticThreshold: "Automatisk",
		pressureUnitHelper: "Bruger den konfigurerede lufttrykssensors enhed.",
		forecast: "Prognose",
		forecastDescription: "Vælg en vejrentitet. Udendørsgrafer placerer derefter nu i midten med historik før og prognose efter.",
		forecastEntity: "Vejrentitet",
		forecastType: "Prognoseopløsning",
		hourly: "Timevis",
		daily: "Daglig"
	}
};
function Y(e) {
	return e?.toLowerCase().split(/[-_]/)[0] === "da" ? Ge : We;
}
//#endregion
//#region src/styles.ts
var Ke = o`
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

  .forecast-range {
    display: block;
    margin-top: 0.45em;
    color: var(--secondary-text-color);
    font-size: clamp(10px, 1.2vmin, 15px);
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.25;
    text-transform: none;
  }

  .secondary-value .forecast-range {
    display: inline;
    margin: 0 0 0 0.4em;
    font-size: 0.62em;
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

  .forecast-line {
    fill: none;
    stroke: var(--accent-color, var(--primary-color));
    stroke-dasharray: 9 7;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 4;
    vector-effect: non-scaling-stroke;
  }

  .now-line {
    stroke: var(--secondary-text-color);
    stroke-dasharray: 3 5;
    stroke-width: 1.5;
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

  .chart-legend {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 7px;
    margin-top: 5px;
    color: var(--secondary-text-color);
    font-size: 11px;
  }

  .chart-legend span {
    width: 24px;
    border-top: 3px dashed var(--accent-color, var(--primary-color));
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
function X(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/weather-kiosk-card.ts
var Z = class extends U {
	constructor(...e) {
		super(...e), this.historyPoints = [], this.historyLoading = !1, this.forecast = [], this.historyRequest = 0, this.pressureFetchedAt = 0, this.forecastFetchedAt = 0, this.closeHistory = () => {
			this.historyRequest += 1, this.activeHistory = void 0;
		}, this.handleBackdropClick = (e) => {
			e.target === e.currentTarget && this.closeHistory();
		}, this.handleKeydown = (e) => {
			e.key === "Escape" && this.activeHistory && this.closeHistory();
		};
	}
	static {
		this.styles = Ke;
	}
	setConfig(e) {
		this.config = Oe(e), this.pressureRequestKey = void 0, this.pressureEntityId = void 0, this.pressureFetchedAt = 0, this.forecastRequestKey = void 0, this.forecastFetchedAt = 0, this.forecast = [];
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
			title: Y(typeof document > "u" ? "en" : document.documentElement.lang).defaultTitle,
			entities: {
				outdoor_temperature: "sensor.outdoor_temperature",
				indoor_temperature: "sensor.indoor_temperature"
			}
		};
	}
	static getConfigElement() {
		return document.createElement("weather-kiosk-card-editor");
	}
	connectedCallback() {
		super.connectedCallback(), window.addEventListener("keydown", this.handleKeydown);
	}
	disconnectedCallback() {
		window.removeEventListener("keydown", this.handleKeydown), super.disconnectedCallback();
	}
	updated(e) {
		this.loadPressureTrend(), this.loadForecast();
	}
	render() {
		if (!this.config || !this.hass) return P`<ha-card aria-busy="true"></ha-card>`;
		let e = this.config.entities, t = this.translations;
		return P`
      <ha-card>
        <main class="kiosk ${this.config.layout}">
          <header><h1>${this.config.title || t.defaultTitle}</h1></header>
          <section class="temperatures" aria-label=${t.temperatures}>
            ${this.renderTemperature(t.outdoor, t.editor.outdoorTemperature, e.outdoor_temperature, e.outdoor_humidity, !0)}
            ${this.renderTemperature(t.indoor, t.editor.indoorTemperature, e.indoor_temperature, e.indoor_humidity, !1)}
          </section>
          <section class="metrics" aria-label=${t.weatherDetails}>
            ${this.renderPressure(e.pressure)}
            ${this.renderMetric(t.rainNow, e.rain_rate)}
            ${this.renderMetric(t.rain24h, e.rain_24h)}
            ${this.renderWind(e.wind_speed, e.wind_direction)}
          </section>
        </main>
        ${this.renderHistoryDialog()}
      </ha-card>
    `;
	}
	renderTemperature(e, t, n, r, i = !1) {
		let a = J(this.entity(n), this.language, 1), o = r ? J(this.entity(r), this.language, 0) : void 0;
		return P`
      <article class="temperature ${a.available ? "" : "unavailable"}">
        <button
          class="temperature-main"
          type="button"
          aria-label=${this.translations.showHistory(t)}
          @click=${() => this.openHistory(n, t, i ? "temperature" : void 0)}
        >
          <span class="label">${e}</span>
          <span class="temperature-value">
            ${a.value}<span class="unit">${a.unit}</span>
          </span>
          ${i ? this.renderForecastRange("temperature", n) : I}
        </button>
        ${r && o ? P`
              <button
                class="secondary-value"
                type="button"
                aria-label=${this.translations.showHistory(e === this.translations.outdoor ? this.translations.editor.outdoorHumidity : this.translations.editor.indoorHumidity)}
                @click=${() => this.openHistory(r, e === this.translations.outdoor ? this.translations.editor.outdoorHumidity : this.translations.editor.indoorHumidity, i ? "humidity" : void 0)}
              >
                <span>${this.translations.humidity}</span>
                <strong>${o.value}${o.unit}</strong>
                ${i ? this.renderForecastRange("humidity", r) : I}
              </button>
            ` : I}
      </article>
    `;
	}
	renderMetric(e, t, n) {
		if (!t) return P`
        <div class="metric unavailable">
          <span class="label">${e}</span>
          <span class="metric-value">—</span>
        </div>
      `;
		let r = J(this.entity(t), this.language, 1);
		return P`
      <button
        class="metric ${r.available ? "" : "unavailable"}"
        type="button"
        aria-label=${this.translations.showHistory(e)}
        @click=${() => this.openHistory(t, e, n)}
      >
        <span class="label">${e}</span>
        <span class="metric-value">
          ${r.value}<span class="unit">${r.unit}</span>
        </span>
        ${n ? this.renderForecastRange(n, t) : I}
      </button>
    `;
	}
	renderPressure(e) {
		let t = this.translations;
		if (!e) return this.renderMetric(t.pressure);
		let n = J(this.entity(e), this.language, 1), r = this.pressureTrend, i = r?.direction === "rising" ? "↗" : r?.direction === "falling" ? "↘" : "→", a = r ? t[r.direction] : void 0, o = r ? `${a} ${this.formatDelta(r.delta)}${n.unit} / 3 h` : t.trendUnavailable;
		return P`
      <button
        class="metric ${n.available ? "" : "unavailable"}"
        type="button"
        aria-label=${t.showHistory(t.pressure)}
        @click=${() => this.openHistory(e, t.pressure, "pressure")}
      >
        <span class="label">${t.pressure}</span>
        <span class="metric-value">
          ${n.value}<span class="unit">${n.unit}</span>
        </span>
        <span class="trend ${r?.direction ?? ""}">
          <span aria-hidden="true">${i}</span> ${o}
        </span>
        ${this.renderForecastRange("pressure", e)}
      </button>
    `;
	}
	renderWind(e, t) {
		let n = e ? J(this.entity(e), this.language, 1) : {
			value: "—",
			unit: "",
			available: !1
		}, r = t ? q(this.entity(t)) : void 0;
		return P`
      <article class="metric wind ${n.available ? "" : "unavailable"}">
        <span class="label">${this.translations.wind}</span>
        <div class="wind-values">
          ${t ? P`
                <button
                  class="wind-direction"
                  type="button"
                  aria-label=${this.translations.showHistory(this.translations.windDirection)}
                  @click=${() => this.openHistory(t, this.translations.windDirection, "wind_bearing")}
                >
                  <span
                    class="wind-arrow"
                    style=${r === void 0 ? "" : `transform: rotate(${r}deg)`}
                    aria-hidden="true"
                    >↑</span
                  >
                  <span class="direction-label"
                    >${Ue(r, this.language)}</span
                  >
                </button>
              ` : P`<span class="wind-arrow">↑</span>`}
          ${e ? P`
                <button
                  class="wind-speed"
                  type="button"
                  aria-label=${this.translations.showHistory(this.translations.windSpeed)}
                  @click=${() => this.openHistory(e, this.translations.windSpeed, "wind_speed")}
                >
                  ${n.value}<span class="unit">${n.unit}</span>
                  ${this.renderForecastRange("wind_speed", e)}
                </button>
              ` : P`<span class="wind-speed">—</span>`}
        </div>
      </article>
    `;
	}
	renderHistoryDialog() {
		if (!this.activeHistory) return I;
		let e = this.entity(this.activeHistory.entityId), t = J(e, this.language, 1), n = Date.now(), r = this.activeHistory.forecastMetric ? this.forecastPointsFor(this.activeHistory.forecastMetric, e?.attributes.unit_of_measurement, n, n + this.activeHistory.hours * 60 * 60 * 1e3) : [], i = this.activeHistory.forecastMetric && this.config?.forecast_entity ? Ne(this.historyPoints, r, n, this.activeHistory.hours) : void 0, a = i ?? Pe(this.historyPoints), o = !!i?.forecastPoints, s = new Intl.DateTimeFormat(this.language, {
			weekday: this.activeHistory.hours >= 168 ? "short" : void 0,
			hour: "2-digit",
			minute: "2-digit"
		}), c = new Intl.NumberFormat(this.language, { maximumFractionDigits: 1 });
		return P`
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
              <span class="dialog-eyebrow">${this.translations.history}</span>
              <h2 id="history-title">${this.activeHistory.label}</h2>
            </div>
            <div class="dialog-current">
              ${t.value}<span>${t.unit}</span>
            </div>
            <button
              class="close-button"
              type="button"
              aria-label=${this.translations.closeHistory}
              @click=${this.closeHistory}
            >
              ×
            </button>
          </header>

          <nav class="range-selector" aria-label=${this.translations.historyRange}>
            ${Ae.map((e) => P`
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
            ${this.historyLoading ? P`<div class="chart-message"><span class="spinner"></span>${this.translations.loadingHistory}</div>` : this.historyError ? P`<div class="chart-message error">${this.historyError}</div>` : a ? P`
                      <div class="chart-y-label max">
                        ${c.format(a.maximum)} ${t.unit}
                      </div>
                      <div class="chart-y-label min">
                        ${c.format(a.minimum)} ${t.unit}
                      </div>
                      <svg
                        class="history-chart"
                        viewBox="0 0 800 300"
                        preserveAspectRatio="none"
                        role="img"
                        aria-label=${this.translations.historyGraph(this.activeHistory.label)}
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
                        ${o ? P`<line class="now-line" x1="400" y1="18" x2="400" y2="282"></line>` : I}
                        <polygon class="chart-area" points=${a.area}></polygon>
                        <polyline class="chart-line" points=${a.points}></polyline>
                        ${o ? P`<polyline class="forecast-line" points=${i.forecastPoints}></polyline>` : I}
                        <circle class="latest-point" cx=${a.latestX} cy=${a.latestY} r="5"></circle>
                      </svg>
                      <div class="chart-x-labels">
                        <span>${s.format(a.start)}</span>
                        ${o ? P`<span>${this.translations.now}</span>` : I}
                        <span>${o ? s.format(a.end) : this.translations.now}</span>
                      </div>
                      ${o ? P`<div class="chart-legend"><span></span>${this.translations.forecast}</div>` : I}
                    ` : P`<div class="chart-message">${this.translations.noHistory}</div>`}
          </div>

          <footer class="dialog-footer">
            <span>${e?.attributes.friendly_name ?? this.activeHistory.entityId}</span>
            <button type="button" @click=${() => this.showMoreInfo(this.activeHistory.entityId)}>
              ${this.translations.entityDetails}
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
	get translations() {
		return Y(this.language);
	}
	openHistory(e, t, n) {
		this.activeHistory = {
			entityId: e,
			label: t,
			hours: 24,
			forecastMetric: n
		}, this.historyPoints = [], this.historyError = void 0, this.loadActiveHistory();
	}
	renderForecastRange(e, t) {
		if (!this.config?.forecast_entity || e === "wind_bearing") return I;
		let n = this.entity(t), r = Date.now(), i = Re(this.forecast, e, ze(e, this.forecastUnits), n?.attributes.unit_of_measurement, r, r + 864e5);
		if (!i) return I;
		let a = new Intl.NumberFormat(this.language, { maximumFractionDigits: 1 });
		return P`<span class="forecast-range">
      ${this.translations.forecast24h} · ${this.translations.minimumAbbreviation}
      ${a.format(i.minimum)} · ${this.translations.maximumAbbreviation}
      ${a.format(i.maximum)}
    </span>`;
	}
	forecastPointsFor(e, t, n, r) {
		return Le(this.forecast, e, ze(e, this.forecastUnits), typeof t == "string" ? t : void 0, n, r);
	}
	get forecastUnits() {
		let e = this.entity(this.config?.forecast_entity)?.attributes;
		return {
			temperature: typeof e?.temperature_unit == "string" ? e.temperature_unit : void 0,
			pressure: typeof e?.pressure_unit == "string" ? e.pressure_unit : void 0,
			wind_speed: typeof e?.wind_speed_unit == "string" ? e.wind_speed_unit : void 0
		};
	}
	async loadForecast() {
		let e = this.config?.forecast_entity, t = this.config?.forecast_type, n = this.hass;
		if (!n || !e || !t) return;
		let r = Date.now();
		if (r - this.forecastFetchedAt < 18e5) return;
		let i = `${e}:${t}:${r}`;
		this.forecastRequestKey = i, this.forecastFetchedAt = r;
		try {
			let r = await Ie(n, e, t);
			this.forecastRequestKey === i && (this.forecast = r);
		} catch (e) {
			console.warn("Weather Kiosk could not load forecast", e), this.forecastRequestKey === i && (this.forecast = []);
		}
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
			let r = await je(this.hass, t, n);
			if (e !== this.historyRequest) return;
			this.historyPoints = this.appendCurrentPoint(r, t);
		} catch (t) {
			if (e !== this.historyRequest) return;
			console.error("Weather Kiosk could not load history", t), this.historyError = this.translations.historyError;
		} finally {
			e === this.historyRequest && (this.historyLoading = !1);
		}
	}
	appendCurrentPoint(e, t) {
		let n = this.entity(t), r = q(n);
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
			let r = await je(t, e, 3);
			if (this.pressureRequestKey !== i) return;
			let a = q(n), o = r[0]?.value;
			if (a === void 0 || o === void 0) {
				this.pressureTrend = void 0;
				return;
			}
			let s = a - o, c = this.config?.pressure_trend_threshold ?? qe(n.attributes.unit_of_measurement);
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
X([W({ attribute: !1 })], Z.prototype, "hass", void 0), X([G()], Z.prototype, "config", void 0), X([G()], Z.prototype, "activeHistory", void 0), X([G()], Z.prototype, "historyPoints", void 0), X([G()], Z.prototype, "historyLoading", void 0), X([G()], Z.prototype, "historyError", void 0), X([G()], Z.prototype, "pressureTrend", void 0), X([G()], Z.prototype, "forecast", void 0);
function qe(e) {
	let t = String(e ?? "").toLowerCase();
	return t === "kpa" ? .05 : t === "inhg" ? .015 : t === "psi" ? .007 : .5;
}
//#endregion
//#region src/weather-kiosk-editor.ts
function Je(e) {
	return [
		{
			title: e.temperatures,
			description: e.temperaturesDescription,
			fields: [{
				key: "outdoor_temperature",
				label: e.outdoorTemperature,
				required: !0
			}, {
				key: "indoor_temperature",
				label: e.indoorTemperature,
				required: !0
			}]
		},
		{
			title: e.humidity,
			description: e.humidityDescription,
			fields: [{
				key: "outdoor_humidity",
				label: e.outdoorHumidity
			}, {
				key: "indoor_humidity",
				label: e.indoorHumidity
			}]
		},
		{
			title: e.weatherDetails,
			description: e.weatherDetailsDescription,
			fields: [
				{
					key: "pressure",
					label: e.pressure
				},
				{
					key: "rain_rate",
					label: e.currentRainRate
				},
				{
					key: "rain_24h",
					label: e.rain24h
				},
				{
					key: "wind_speed",
					label: e.windSpeed
				},
				{
					key: "wind_direction",
					label: e.windDirection
				}
			]
		}
	];
}
function Ye(e, t, n) {
	let r = { ...e.entities }, i = n?.trim();
	return i ? r[t] = i : delete r[t], {
		...e,
		entities: r
	};
}
var Q = class extends U {
	constructor(...e) {
		super(...e), this.handleTitleInput = (e) => {
			if (!this.config) return;
			let t = e.currentTarget.value;
			this.emitConfig({
				...this.config,
				title: t
			});
		}, this.handleLayoutChange = (e) => {
			if (!this.config) return;
			let t = e.currentTarget.value;
			this.emitConfig({
				...this.config,
				layout: t
			});
		}, this.handleThresholdChange = (e) => {
			if (!this.config) return;
			let t = e.currentTarget.value, n = { ...this.config };
			if (t === "") delete n.pressure_trend_threshold;
			else {
				let e = Number(t);
				if (!Number.isFinite(e) || e < 0) return;
				n.pressure_trend_threshold = e;
			}
			this.emitConfig(n);
		}, this.handleForecastEntityChanged = (e) => {
			if (!this.config) return;
			let t = e.detail.value?.trim(), n = { ...this.config };
			t ? n.forecast_entity = t : delete n.forecast_entity, this.emitConfig(n);
		}, this.handleForecastTypeChange = (e) => {
			if (!this.config) return;
			let t = e.currentTarget.value;
			this.emitConfig({
				...this.config,
				forecast_type: t
			});
		};
	}
	static {
		this.styles = o`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 24px;
    }

    section {
      display: grid;
      gap: 14px;
    }

    h3,
    p {
      margin: 0;
    }

    h3 {
      color: var(--primary-text-color);
      font-size: 16px;
      font-weight: 500;
    }

    p,
    .helper {
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.4;
    }

    .fields {
      display: grid;
      gap: 16px;
    }

    .field {
      display: grid;
      gap: 6px;
    }

    label {
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 500;
    }

    input,
    select {
      box-sizing: border-box;
      width: 100%;
      min-height: 48px;
      padding: 0 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      outline: none;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
    }

    input:focus,
    select:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 1px var(--primary-color);
    }

    option {
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    @media (min-width: 520px) {
      .display-fields {
        grid-template-columns: 1fr 1fr;
      }
    }
  `;
	}
	setConfig(e) {
		this.config = {
			...e,
			type: e.type || "custom:weather-kiosk-card",
			entities: { ...e.entities ?? {} }
		};
	}
	render() {
		if (!this.config) return I;
		let e = this.translations.editor;
		return P`
      <div class="editor">
        <section>
          <div>
            <h3>${e.display}</h3>
            <p>${e.displayDescription}</p>
          </div>
          <div class="fields display-fields">
            <div class="field">
              <label for="title">${e.title}</label>
              <input
                id="title"
                type="text"
                .value=${this.config.title ?? ""}
                placeholder=${this.translations.defaultTitle}
                @input=${this.handleTitleInput}
              />
            </div>
            <div class="field">
              <label for="layout">${e.layout}</label>
              <select
                id="layout"
                .value=${this.config.layout ?? "auto"}
                @change=${this.handleLayoutChange}
              >
                <option value="auto">${e.automatic}</option>
                <option value="landscape">${e.landscape}</option>
                <option value="portrait">${e.portrait}</option>
              </select>
            </div>
          </div>
        </section>

        ${Je(e).map((e) => this.renderEntityGroup(e))}

        <section>
          <div>
            <h3>${e.forecast}</h3>
            <p>${e.forecastDescription}</p>
          </div>
          <div class="fields display-fields">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this.config.forecast_entity ?? ""}
              .label=${e.forecastEntity}
              .includeDomains=${["weather"]}
              .allowCustomEntity=${!0}
              @value-changed=${this.handleForecastEntityChanged}
            ></ha-entity-picker>
            <div class="field">
              <label for="forecast-type">${e.forecastType}</label>
              <select
                id="forecast-type"
                .value=${this.config.forecast_type ?? "hourly"}
                @change=${this.handleForecastTypeChange}
              >
                <option value="hourly">${e.hourly}</option>
                <option value="daily">${e.daily}</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <div>
            <h3>${e.pressureTrend}</h3>
            <p>${e.pressureTrendDescription}</p>
          </div>
          <div class="field">
            <label for="pressure-threshold">${e.steadyThreshold}</label>
            <input
              id="pressure-threshold"
              type="number"
              min="0"
              step="any"
              .value=${this.config.pressure_trend_threshold?.toString() ?? ""}
              placeholder=${e.automaticThreshold}
              @change=${this.handleThresholdChange}
            />
            <span class="helper">${e.pressureUnitHelper}</span>
          </div>
        </section>
      </div>
    `;
	}
	get translations() {
		return Y(this.hass?.locale?.language ?? this.hass?.language ?? "en");
	}
	renderEntityGroup(e) {
		return P`
      <section>
        <div>
          <h3>${e.title}</h3>
          <p>${e.description}</p>
        </div>
        <div class="fields">
          ${e.fields.map((e) => P`
              <ha-entity-picker
                .hass=${this.hass}
                .value=${this.config?.entities[e.key] ?? ""}
                .label=${`${e.label}${e.required ? " *" : ""}`}
                .includeDomains=${["sensor"]}
                .allowCustomEntity=${!0}
                @value-changed=${(t) => this.handleEntityChanged(e.key, t)}
              ></ha-entity-picker>
            `)}
        </div>
      </section>
    `;
	}
	handleEntityChanged(e, t) {
		this.config && this.emitConfig(Ye(this.config, e, t.detail.value));
	}
	emitConfig(e) {
		this.config = e, this.dispatchEvent(new CustomEvent("config-changed", {
			bubbles: !0,
			composed: !0,
			detail: { config: e }
		}));
	}
};
X([W({ attribute: !1 })], Q.prototype, "hass", void 0), X([G()], Q.prototype, "config", void 0);
//#endregion
//#region src/index.ts
var $ = "weather-kiosk-card", Xe = "weather-kiosk-card-editor";
if (customElements.get(Xe) || customElements.define(Xe, Q), customElements.get($) || customElements.define($, Z), window.customCards = window.customCards ?? [], !window.customCards.some((e) => e.type === $)) {
	let e = Y(document.documentElement.lang);
	window.customCards.push({
		type: $,
		name: e.cardName,
		description: e.cardDescription,
		preview: !1
	});
}
console.info("%c WEATHER-KIOSK-CARD %c 0.5.0 ", "color: white; background: #1565c0; font-weight: 700;", "color: #1565c0; background: white; font-weight: 700;");
//#endregion
