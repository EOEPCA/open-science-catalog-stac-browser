//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = globalThis, u = l.ShadowRoot && (l.ShadyCSS === void 0 || l.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, d = Symbol(), f = /* @__PURE__ */ new WeakMap(), p = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== d) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (u && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = f.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && f.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, m = (e) => new p(typeof e == "string" ? e : e + "", void 0, d), h = (e, t) => {
	if (u) e.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
	else for (let n of t) {
		let t = document.createElement("style"), r = l.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, g = u ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return m(t);
})(e) : e, { is: _, defineProperty: v, getOwnPropertyDescriptor: y, getOwnPropertyNames: b, getOwnPropertySymbols: x, getPrototypeOf: S } = Object, C = globalThis, w = C.trustedTypes, T = w ? w.emptyScript : "", E = C.reactiveElementPolyfillSupport, D = (e, t) => e, O = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? T : null;
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
}, k = (e, t) => !_(e, t), A = {
	attribute: !0,
	type: String,
	converter: O,
	reflect: !1,
	useDefault: !1,
	hasChanged: k
};
Symbol.metadata ??= Symbol("metadata"), C.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var j = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = A) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && v(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = y(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? A;
	}
	static _$Ei() {
		if (this.hasOwnProperty(D("elementProperties"))) return;
		let e = S(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(D("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
			let e = this.properties, t = [...b(e), ...x(e)];
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
			for (let e of n) t.unshift(g(e));
		} else e !== void 0 && t.push(g(e));
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
		this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((e) => e(this)));
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
		return h(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach(((e) => e.hostDisconnected?.()));
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? O : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? O : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n) {
		if (e !== void 0) {
			let r = this.constructor, i = this[e];
			if (n ??= r.getPropertyOptions(e), !((n.hasChanged ?? k)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, n)))) return;
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
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach(((e) => e.hostUpdate?.())), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach(((e) => e.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
		this._$Eq &&= this._$Eq.forEach(((e) => this._$ET(e, this[e]))), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
j.elementStyles = [], j.shadowRootOptions = { mode: "open" }, j[D("elementProperties")] = /* @__PURE__ */ new Map(), j[D("finalized")] = /* @__PURE__ */ new Map(), E?.({ ReactiveElement: j }), (C.reactiveElementVersions ??= []).push("2.1.1");
//#endregion
//#region ../../node_modules/lit-html/lit-html.js
var ee = globalThis, te = ee.trustedTypes, M = te ? te.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ne = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, P = "?" + N, re = `<${P}>`, ie = document, ae = () => ie.createComment(""), oe = (e) => e === null || typeof e != "object" && typeof e != "function", se = Array.isArray, ce = (e) => se(e) || typeof e?.[Symbol.iterator] == "function", F = "[ 	\n\f\r]", I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, L = /-->/g, le = />/g, ue = RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), R = /'/g, de = /"/g, fe = /^(?:script|style|textarea|title)$/i, z = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), pe = Symbol.for("lit-noChange"), B = Symbol.for("lit-nothing"), me = /* @__PURE__ */ new WeakMap(), he = ie.createTreeWalker(ie, 129);
function ge(e, t) {
	if (!se(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return M === void 0 ? t : M.createHTML(t);
}
var _e = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = I;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === I ? c[1] === "!--" ? o = L : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = ue) : (fe.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = ue) : o = le : o === ue ? c[0] === ">" ? (o = i ?? I, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? ue : c[3] === "\"" ? de : R) : o === de || o === R ? o = ue : o === L || o === le ? o = I : (o = ue, i = void 0);
		let d = o === ue && e[t + 1].startsWith("/>") ? " " : "";
		a += o === I ? n + re : l >= 0 ? (r.push(s), n.slice(0, l) + ne + n.slice(l) + N + d) : n + N + (l === -2 ? t : d);
	}
	return [ge(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, ve = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = _e(t, n);
		if (this.el = e.createElement(l, r), he.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = he.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ne)) {
					let t = u[o++], n = i.getAttribute(e).split(N), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Se : r[1] === "?" ? Ce : r[1] === "@" ? we : xe
					}), i.removeAttribute(e);
				} else e.startsWith(N) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (fe.test(i.tagName)) {
					let e = i.textContent.split(N), t = e.length - 1;
					if (t > 0) {
						i.textContent = te ? te.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], ae()), he.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], ae());
					}
				}
			} else if (i.nodeType === 8) if (i.data === P) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(N, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += N.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = ie.createElement("template");
		return n.innerHTML = e, n;
	}
};
function V(e, t, n = e, r) {
	if (t === pe) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = oe(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = V(e, i._$AS(e, t.values), i, r)), t;
}
var ye = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? ie).importNode(t, !0);
		he.currentNode = r;
		let i = he.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new be(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Te(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = he.nextNode(), a++);
		}
		return he.currentNode = ie, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, be = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = B, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = V(this, e, t), oe(e) ? e === B || e == null || e === "" ? (this._$AH !== B && this._$AR(), this._$AH = B) : e !== this._$AH && e !== pe && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? ce(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== B && oe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ie.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ve.createElement(ge(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new ye(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = me.get(e.strings);
		return t === void 0 && me.set(e.strings, t = new ve(e)), t;
	}
	k(t) {
		se(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(ae()), this.O(ae()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = e.nextSibling;
			e.remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, xe = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = B, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = B;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = V(this, e, t, 0), a = !oe(e) || e !== this._$AH && e !== pe, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = V(this, r[n + o], t, o), s === pe && (s = this._$AH[o]), a ||= !oe(s) || s !== this._$AH[o], s === B ? e = B : e !== B && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === B ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Se = class extends xe {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === B ? void 0 : e;
	}
}, Ce = class extends xe {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== B);
	}
}, we = class extends xe {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = V(this, e, t, 0) ?? B) === pe) return;
		let n = this._$AH, r = e === B && n !== B || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== B && (n === B || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Te = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		V(this, e);
	}
}, Ee = {
	M: ne,
	P: N,
	A: P,
	C: 1,
	L: _e,
	R: ye,
	D: ce,
	V,
	I: be,
	H: xe,
	N: Ce,
	U: we,
	B: Se,
	F: Te
}, De = ee.litHtmlPolyfillSupport;
De?.(ve, be), (ee.litHtmlVersions ??= []).push("3.3.1");
var Oe = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new be(t.insertBefore(ae(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, ke = globalThis, H = class extends j {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Oe(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return pe;
	}
};
H._$litElement$ = !0, H.finalized = !0, ke.litElementHydrateSupport?.({ LitElement: H });
var Ae = ke.litElementPolyfillSupport;
Ae?.({ LitElement: H }), (ke.litElementVersions ??= []).push("4.2.1");
//#endregion
//#region ../../node_modules/lit-html/directives/map.js
function* je(e, t) {
	if (e !== void 0) {
		let n = 0;
		for (let r of e) yield t(r, n++);
	}
}
//#endregion
//#region ../../node_modules/lit-html/directives/when.js
function U(e, t, n) {
	return e ? t(e) : n?.(e);
}
//#endregion
//#region src/style.js
var Me = "\n:host {\n  display: flex;\n  box-sizing: border-box;\n  height: 100%;\n  line-height: 1;\n}\n*,\n*:before,\n*:after {\n  box-sizing: inherit;\n}\nform#itemfilter {\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  display: flex;\n  flex-direction: column;\n}\nform#itemfilter:not(.inline) {\n  height: 100%;\n  overflow: hidden;\n}\ndetails {\n  width: 100%;\n}\n", Ne = "@import \"https://eox.at/fonts/inter/inter.css\";@import \"https://eox.at/fonts/materialdesignicons/materialdesignicons.min.css\";:root{--size:1rem;--font:Inter, Roboto, \"Helvetica Neue\", \"Arial Nova\", \"Nimbus Sans\", \"Noto Sans\", Arial, sans-serif;--font-icon:\"Material Symbols Outlined\";--speed1:.1s;--speed2:.2s;--speed3:.3s;--speed4:.4s;--active:#80808031;--overlay:#00000080;--elevate1:0 .125rem .125rem 0 #00000052;--elevate2:0 .25rem .5rem 0 #0006;--elevate3:0 .375rem .75rem 0 #0000007a;--top:env(safe-area-inset-top);--bottom:env(safe-area-inset-bottom);--left:env(safe-area-inset-left);--right:env(safe-area-inset-right)}html{font-size:var(--size)}body{color:var(--on-surface);background-color:var(--surface);font-family:var(--font);letter-spacing:.0313rem;font-size:.875rem;line-height:1.5rem;overflow-x:hidden}@media (pointer:fine){body ::-webkit-scrollbar{background:0 0;block-size:.4rem;inline-size:.4rem}body ::-webkit-scrollbar-thumb{background:0 0;block-size:.4rem;inline-size:.4rem}body ::-webkit-scrollbar-button{background:0 0;block-size:.4rem;inline-size:.4rem}body :is(:focus,:hover)::-webkit-scrollbar-thumb{background:var(--outline);border-radius:1rem}body :has(:focus,:hover)::-webkit-scrollbar-thumb{background:var(--outline);border-radius:1rem}}@media (pointer:coarse){:is(body:has(dialog[open],dialog.active),body:has(input[type=range]:focus)){overflow:hidden}}body.dark{--primary:#cfbcff;--on-primary:#381e72;--primary-container:#4f378a;--on-primary-container:#e9ddff;--secondary:#cbc2db;--on-secondary:#332d41;--secondary-container:#4a4458;--on-secondary-container:#e8def8;--tertiary:#efb8c8;--on-tertiary:#4a2532;--tertiary-container:#633b48;--on-tertiary-container:#ffd9e3;--error:#ffb4ab;--on-error:#690005;--error-container:#93000a;--on-error-container:#ffb4ab;--background:#1c1b1e;--on-background:#e6e1e6;--surface:#141316;--on-surface:#e6e1e6;--surface-variant:#49454e;--on-surface-variant:#cac4cf;--outline:#948f99;--outline-variant:#49454e;--shadow:#000;--scrim:#000;--inverse-surface:#e6e1e6;--inverse-on-surface:#313033;--inverse-primary:#6750a4;--surface-dim:#141316;--surface-bright:#3a383c;--surface-container-lowest:#0f0e11;--surface-container-low:#1c1b1e;--surface-container:#201f22;--surface-container-high:#2b292d;--surface-container-highest:#363438}@font-face{font-family:Material Symbols Outlined;font-style:normal;font-weight:400;font-display:swap;src:url(/material-symbols-outlined.woff2)format(\"woff2\"),url(https://cdn.jsdelivr.net/npm/beercss@4.0.16/dist/cdn/material-symbols-outlined.woff2)format(\"woff2\")}@font-face{font-family:Material Symbols Rounded;font-style:normal;font-weight:400;font-display:swap;src:url(/material-symbols-rounded.woff2)format(\"woff2\"),url(https://cdn.jsdelivr.net/npm/beercss@4.0.16/dist/cdn/material-symbols-rounded.woff2)format(\"woff2\")}@font-face{font-family:Material Symbols Sharp;font-style:normal;font-weight:400;font-display:swap;src:url(/material-symbols-sharp.woff2)format(\"woff2\"),url(https://cdn.jsdelivr.net/npm/beercss@4.0.16/dist/cdn/material-symbols-sharp.woff2)format(\"woff2\")}@font-face{font-family:Material Symbols Subset;font-style:normal;font-weight:400;font-display:swap;src:url(/material-symbols-subset.woff2)format(\"woff2\"),url(https://cdn.jsdelivr.net/npm/beercss@4.0.16/dist/cdn/material-symbols-subset.woff2)format(\"woff2\")}*{-webkit-tap-highlight-color:transparent;vertical-align:middle;color:inherit;border-radius:inherit;box-sizing:border-box;margin:0;padding:0;position:relative}:after,:before{all:unset}label{vertical-align:baseline;font-size:.75rem}a,b,i,span,strong,em,code{vertical-align:baseline}a,button,.button{cursor:pointer;outline:inherit;border:none;justify-content:center;align-items:center;font-family:inherit;text-decoration:none;display:inline-flex}:is(nav,.tabs,.field)>a,button,.button,.chip,i,label{-webkit-user-select:none;user-select:none}:not(.grid,nav,.row)>:not(progress.max)+:is(address,article,blockquote,code,.field,fieldset,form,.grid,h1,h2,h3,h4,h5,h6,nav,ol,p,pre,.row,section,aside,table,.tabs,ul):not([class*=margin],.right,.left,.top,.bottom){margin-block-start:1rem}:has(>[class*=margin]){padding:.1px}:is(a,button,.button,.chip,summary):focus-visible{outline:.125rem solid var(--primary);outline-offset:.25rem}:is(nav,.row,li).group>:focus-visible{z-index:1}:is(button,.button,.chip)>:is(span,i,img,svg){pointer-events:none}div:is(:not([class]),[class=active]):has(>:not(.responsive)~:is(menu,.tooltip,input)){display:inline-flex}.middle-align{display:flex;align-items:center!important}.bottom-align{display:flex;align-items:flex-end!important}.top-align{display:flex;align-items:flex-start!important}.left-align{text-align:start;justify-content:flex-start!important}.right-align{text-align:end;justify-content:flex-end!important}.center-align{text-align:center;justify-content:center!important}[class*=blur],[class*=blur].light{--_blur:1rem;-webkit-backdrop-filter:blur(var(--_blur));backdrop-filter:blur(var(--_blur));color:var(--on-surface);background-color:#ffffff80!important}.dark [class*=blur],[class*=blur].dark{background-color:#00000080!important}.small-blur{--_blur:.5rem}.large-blur{--_blur:1.5rem}.horizontal{gap:1rem;display:inline-flex;flex-direction:row!important;inline-size:auto!important;max-inline-size:none!important}.horizontal>*{margin-block:0!important}.vertical{display:flex;flex-direction:column!important}:is(a,button,.button,.chip).vertical{gap:.25rem;padding-block:.5rem;display:inline-flex;block-size:auto!important;max-block-size:none!important}.vertical>*{margin-inline:0!important}.no-elevate{box-shadow:none!important}.small-elevate,.elevate{box-shadow:var(--elevate1)!important}.medium-elevate{box-shadow:var(--elevate2)!important}.large-elevate{box-shadow:var(--elevate3)!important}.round,[class*=-round]{--_round:2rem;border-radius:var(--_round)!important}.small-round{--_round:.5rem}.large-round{--_round:3.5rem}.no-round,.square,.top-round,.bottom-round,.left-round,.right-round{border-radius:.5rem!important}.top-round{border-start-start-radius:var(--_round)!important;border-start-end-radius:var(--_round)!important}.bottom-round{border-end-end-radius:var(--_round)!important;border-end-start-radius:var(--_round)!important}.left-round{border-start-start-radius:var(--_round)!important;border-end-start-radius:var(--_round)!important}.right-round{border-start-end-radius:var(--_round)!important;border-end-end-radius:var(--_round)!important}.circle:not(.extend){border-radius:50%}:is(.circle,.square):is(button,.button,.chip){block-size:var(--_size);inline-size:var(--_size);padding:0}:is(.circle,.square)>span:not([class]){display:none}:is(.circle,.square).round{border-radius:1rem!important}.border:not(table,.field,.list,menu,article){box-sizing:border-box;border:.0625rem solid var(--outline);box-shadow:none;background-color:#0000}.no-border{border-color:#0000!important}.margin,[class*=-margin]:not(.left-margin,.right-margin,.top-margin,.bottom-margin,.horizontal-margin,.vertical-margin){margin:var(--_margin)!important}.margin,[class*=-margin]{--_margin:1rem}.no-margin{--_margin:0}.auto-margin{--_margin:auto}.tiny-margin{--_margin:.25rem}.small-margin{--_margin:.5rem}.large-margin{--_margin:1.5rem}.left-margin,.horizontal-margin{margin-inline-start:var(--_margin)!important}.right-margin,.horizontal-margin{margin-inline-end:var(--_margin)!important}.top-margin,.vertical-margin{margin-block-start:var(--_margin)!important}.bottom-margin,.vertical-margin{margin-block-end:var(--_margin)!important}.no-opacity{opacity:1!important}.opacity{opacity:0!important}.small-opacity{opacity:.75!important}.medium-opacity{opacity:.5!important}.large-opacity{opacity:.25!important}.padding,[class*=-padding]:not(.left-padding,.right-padding,.top-padding,.bottom-padding,.horizontal-padding,.vertical-padding){padding:var(--_padding)!important}.padding,[class*=-padding]{--_padding:1rem}.no-padding{--_padding:0!important}.tiny-padding{--_padding:.25rem!important}.small-padding{--_padding:.5rem!important}.large-padding{--_padding:1.5rem!important}.left-padding,.horizontal-padding{padding-inline-start:var(--_padding)!important}.right-padding,.horizontal-padding{padding-inline-end:var(--_padding)!important}.top-padding,.vertical-padding{padding-block-start:var(--_padding)!important}.bottom-padding,.vertical-padding{padding-block-end:var(--_padding)!important}.front{z-index:10!important}.back{z-index:-10!important}.left{inset-inline-start:0}.right{inset-inline-end:0}.top{inset-block-start:0}.bottom{inset-block-end:0}.center{inset-inline-start:50%;transform:translate(-50%)}[dir=rtl] .center{transform:translate(50%)}.middle{inset-block-start:50%;transform:translateY(-50%)}.middle.center{transform:translate(-50%,-50%)}[dir=rtl] .middle.center{transform:translate(50%,-50%)}.ripple{--_duration:.6s}.fast-ripple{--_duration:.2s}.slow-ripple{--_duration:1.8s}.ripple-js{pointer-events:none;position:absolute;inset:0;overflow:hidden}.ripple-js>div{opacity:.3;animation:to-ripple var(--_duration) linear;background:currentColor;border-radius:50%;position:absolute;transform:scale(0)}@keyframes to-ripple{to{opacity:0;transform:scale(4)}}.scroll{overflow:auto}.no-scroll{overflow:hidden}.shadow{background-color:#00000050}:is(.left-shadow,.right-shadow,.top-shadow,.bottom-shadow){background-color:#0000!important}.left-shadow{background-image:linear-gradient(90deg,#000,#0000)!important}.right-shadow{background-image:linear-gradient(270deg,#000,#0000)!important}.bottom-shadow{background-image:linear-gradient(#0000,#000)!important}.top-shadow{background-image:linear-gradient(#000,#0000)!important}[class*=-width]{max-inline-size:100%}.auto-width{inline-size:auto}.small-width{inline-size:12rem!important}.medium-width{inline-size:24rem!important}.large-width{inline-size:36rem!important}.auto-height{block-size:auto}.small-height{block-size:12rem!important}.medium-height{block-size:24rem!important}.large-height{block-size:36rem!important}.wrap{white-space:normal;display:block}.no-wrap:not(menu){white-space:nowrap;display:flex}.tiny-space:not(nav,.row,.grid,table,.tooltip,.list,menu,.shape){block-size:.5rem}:is(.space,.small-space):not(nav,.row,.grid,table,.tooltip,.list,menu,.shape){block-size:1rem}.medium-space:not(nav,.row,.grid,table,.tooltip,.list,menu,.shape){block-size:2rem}.large-space:not(nav,.row,.grid,table,.tooltip,.list,menu,.shape){block-size:3rem}.extra-space:not(nav,.row,.grid,table,.tooltip,.list,menu,.shape){block-size:4rem}.responsive{inline-size:-webkit-fill-available;inline-size:-moz-available}@media only screen and (width<=600px){:is(.m,.l):not(.s){display:none!important}}@media only screen and (width>=601px) and (width<=992px){:is(.s,.l):not(.m){display:none!important}}@media only screen and (width>=993px){:is(.m,.s):not(.l){display:none!important}}h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6{align-items:center;font-weight:400;line-height:normal;display:block}h1,.h1{font-size:3.5625rem}h2,.h2{font-size:2.8125rem}h3,.h3{font-size:2.25rem}h4,.h4{font-size:2rem}h5,.h5{font-size:1.75rem}h6,.h6{font-size:1.5rem}:is(h1,.h1).small{font-size:3.0625rem}:is(h2,.h2).small{font-size:2.3125rem}:is(h3,.h3).small{font-size:1.75rem}:is(h4,.h4).small{font-size:1.5rem}:is(h5,.h5).small{font-size:1.25rem}:is(h6,.h6).small{font-size:1rem}:is(h1,.h1).large{font-size:4.0625rem}:is(h2,.h2).large{font-size:3.3125rem}:is(h3,.h3).large{font-size:2.75rem}:is(h4,.h4).large{font-size:2.5rem}:is(h5,.h5).large{font-size:2.25rem}:is(h6,.h6).large{font-size:2rem}.link{color:var(--primary)!important}.inverse-link{color:var(--inverse-primary)!important}.truncate{text-overflow:ellipsis;flex:inherit;overflow:hidden;white-space:nowrap!important}.truncate>*{white-space:nowrap!important}.small-text{font-size:.75rem}.medium-text{font-size:.875rem}.large-text{font-size:1rem}.upper{text-transform:uppercase}.lower{text-transform:lowercase}.capitalize{text-transform:capitalize}.bold{font-weight:700}.overline{text-decoration:line-through}.underline{text-decoration:underline}.italic{font-style:italic}p{margin:.5rem 0}.no-line{line-height:normal}.tiny-line{line-height:1.25rem}.small-line{line-height:1.5rem}.medium-line{line-height:1.75rem}.large-line{line-height:2rem}.extra-line{line-height:2.25rem}pre{background-color:var(--surface-container);white-space:pre-wrap;border-inline-start:.25rem solid var(--primary);border-radius:0;padding:1rem;font-family:inherit}blockquote{border-inline-start:.25rem solid var(--primary);border-radius:0;padding:1rem;font-family:inherit}code{background-color:var(--surface-container);white-space:pre-wrap;border-radius:0;padding:.25rem}pre>code,blockquote>code{padding:0}.scroll>code{white-space:pre}pre:has(>code){text-align:start;direction:ltr}sub{vertical-align:sub}sup{vertical-align:super}:is(.wave,.chip,.button,button,nav.tabbed>a,.tabs>a,nav.toolbar>a):not(.slow-ripple,.ripple,.fast-ripple):after,nav:is(.left,.right,.bottom,.top).max>a:after,nav:is(.left,.right,.bottom,.top).max>:is(ol,ul)>li>a:after,nav:is(.left,.right,.bottom,.top):not(.max)>a>i:after,nav:is(.left,.right,.bottom,.top):not(.max)>:is(ol,ul)>li>a>i:after{content:\"\";z-index:1;border-radius:inherit;opacity:0;pointer-events:none;background-image:radial-gradient(circle,currentColor 1%,#0000 1%);background-position:50%;block-size:100%;inline-size:100%;transition:none;position:absolute;inset:0}:is(.wave,.chip,.button,button,nav.tabbed>a,.tabs>a,nav.toolbar>a):not(.slow-ripple,.ripple,.fast-ripple):is(:focus-visible,:hover):after,nav:is(.left,.right,.bottom,.top).max>a:not(.button,.chip):is(:focus-visible,:hover):after,nav:is(.left,.right,.bottom,.top).max>:is(ol,ul)>li>a:not(.button,.chip):is(:focus-visible,:hover):after,nav:is(.left,.right,.bottom,.top):not(.max)>a:not(.button,.chip):is(:focus-visible,:hover)>i:after,nav:is(.left,.right,.bottom,.top):not(.max)>:is(ol,ul)>li>a:not(.button,.chip):is(:focus-visible,:hover)>i:after{opacity:.1;transition:background-size var(--speed2) linear;background-size:22500%}:is(.wave,.chip,.button,button,nav.tabbed>a,.tabs>a,nav.toolbar>a,nav.max>a):not(.slow-ripple,.ripple,.fast-ripple):active:after,nav:is(.left,.right,.bottom,.top).max>a:active:after,nav:is(.left,.right,.bottom,.top).max>:is(ol,ul)>li>a:active:after,nav:is(.left,.right,.bottom,.top):not(.max)>a:active>i:after,nav:is(.left,.right,.bottom,.top):not(.max)>:is(ol,ul)>li>a:active>i:after{opacity:0;background-size:0%;transition:none}.no-wave:after,.no-wave:is(:hover,:active):after{display:none}.zoom,.tiny-zoom{zoom:2}.small-zoom{zoom:3}.medium-zoom{zoom:4}.large-zoom{zoom:5}.extra-zoom{zoom:6}.badge{--_x:0;--_y:-100%;text-transform:none;z-index:2;background-color:var(--error);min-block-size:1rem;min-inline-size:1rem;color:var(--on-error);transform:translate(var(--_x,50%),var(--_y,-50%));font-size:.6875rem;line-height:normal;font-family:var(--font);border-radius:1rem;justify-content:center;align-items:center;padding:0 .25rem;display:inline-flex;position:absolute;inset:50% auto auto 50%}.badge.top{--_y:-100%}.badge.bottom{--_y:0}.badge.left{--_x:-100%}.badge.right{--_x:0}.badge.border{border-color:var(--error);color:var(--error);background-color:var(--surface)}.badge:is(.circle,.square){text-align:center;border-radius:1rem;block-size:auto;inline-size:auto;padding:0 .25rem}.badge.square{border-radius:0}.badge.min>*{display:none}.badge.min{clip-path:circle(18.75%)}nav:is(.left,.right,.top,.bottom)>a>.badge,nav:is(.left,.right,.top,.bottom)>:is(ol,ul)>li>a>.badge{inset:1rem auto auto 50%}.badge.none{margin:0 .125rem;position:relative;transform:none;inset:auto!important}header,footer{border-radius:0;align-content:center;padding:0 1rem;display:grid}:is(dialog,article)>:is(header,footer){padding-inline:0;inset:0}header{min-block-size:4rem}footer{min-block-size:5rem}:is(header,footer,menu>*).fixed{z-index:11;background-color:inherit;position:sticky;inset:0}header.fixed{inset:calc(-1 * var(--_padding,0)) 0 0 0;margin-block-start:calc(-1 * var(--_padding,0))}footer.fixed{inset:0 0 calc(-1 * var(--_padding,0)) 0;margin-block-end:calc(-1 * var(--_padding,0))}:is(header,footer).fixed.min{margin-inline:auto}dialog>:is(header,footer){background:0 0}dialog>:is(header,footer).fixed{background-color:inherit}:is(main,header,footer,section).responsive{max-inline-size:min(100vw,75rem);margin:0 auto}:is(main,header,footer,section).responsive.max{max-inline-size:none}:has(>main)>:is(header,footer).fixed{box-sizing:content-box;z-index:12;position:sticky;inset:0;transform:none}:has(>main)>header{padding-block-start:var(--top,0)}:has(>main)>footer{padding-block-end:var(--bottom,0)}nav.top~header,nav.bottom~footer{padding-block:0}nav.top~header.fixed{inset-block:calc(var(--top,0) + 4.5rem) 0}nav.bottom~footer.fixed{inset-block:0 calc(var(--bottom,0) + 4.5rem)}:is(nav,.row)>header{background-color:inherit}.button,button{--_padding:1rem;--_size:2.5rem;box-sizing:content-box;block-size:var(--_size);color:var(--on-primary);padding:0 var(--_padding);background-color:var(--primary);border-radius:var(--_size);transition:transform var(--speed3),border-radius var(--speed2),padding var(--speed3);-webkit-user-select:none;user-select:none;justify-content:center;align-items:center;gap:.5rem;font-size:.875rem;font-weight:500;line-height:normal;display:inline-flex}:is(button,.button).small{--_size:2rem;--_padding:.75rem}:is(button,.button).large{--_size:3rem;--_padding:1.25rem}:is(.button,button):is(.extra,.extend){--_size:3.5rem;--_padding:1.5rem;font-size:1rem}:is(button,.button):is(.square,.circle){--_padding:0}:is(button,.button).border{border-color:var(--outline-variant);color:var(--primary)}.extend>span:not([class]){display:none}.extend:is(:hover,.active){--_padding:1.5rem;inline-size:auto;padding:0 var(--_padding)}.extend:is(:hover,.active)>i+span{display:inherit;margin-inline-start:var(--_padding)}.extend:is(:hover,.active)>:is(img,svg)+span{display:inherit;margin-inline-start:calc(1rem + var(--_padding,0))}:is(.button,button)[disabled]{opacity:.5;cursor:not-allowed}.button[disabled]{pointer-events:none}:is(.button,button)[disabled]:before,:is(.button,button)[disabled]:after{display:none}:is(.button,button):not(.chip,.extend).fill{background-color:var(--secondary-container)!important;color:var(--on-secondary-container)!important}:is(.button,button):not(.chip,.extend).active{background-color:var(--primary-container);color:var(--on-primary-container)}:is(.button,button):not(.chip,.extend).fill.active{background-color:var(--secondary)!important;color:var(--on-secondary)!important}:is(.button,button):not(.chip,.extend).border.active{background-color:var(--inverse-surface)!important;color:var(--inverse-on-surface)!important;border-color:var(--inverse-surface)!important}:is(.button,button):not(.chip):active,:is(.button,button):not(.chip).active{border-radius:.5rem!important}article{--_padding:1rem;box-shadow:var(--elevate1);background-color:var(--surface-container-low);color:var(--on-surface);padding:var(--_padding);transition:transform var(--speed3),border-radius var(--speed3),padding var(--speed3);border-radius:.75rem;display:block}article.small{block-size:12rem}article.medium{block-size:20rem}article.large{block-size:32rem}article.border{box-shadow:none;border:.0625rem solid var(--outline-variant)}.chip{--_padding:.75rem;--_size:2rem;box-sizing:border-box;block-size:var(--_size);min-inline-size:var(--_size);border:.0625rem solid var(--outline-variant);color:var(--on-surface-variant);padding:0 var(--_padding);text-transform:none;transition:transform var(--speed3),border-radius var(--speed3),padding var(--speed3);-webkit-user-select:none;user-select:none;letter-spacing:normal;background-color:#0000;border-radius:.5rem;justify-content:center;align-items:center;gap:.5rem;font-size:.875rem;font-weight:500;line-height:normal;display:inline-flex}.chip.medium{--_size:2.5rem;--_padding:1rem}.chip.large{--_padding:1.25rem;--_size:3rem}.chip.fill{border:none}dialog{--_padding:1.5rem;--_top:calc(var(--_padding,0) + var(--top,0));--_bottom:calc(var(--_padding,0) + var(--bottom,0));visibility:hidden;opacity:0;box-shadow:var(--elevate2);color:var(--on-surface);background-color:var(--surface-container-high);padding:var(--_padding);z-index:100;max-block-size:80%;min-inline-size:20rem;max-inline-size:100%;transition:all var(--speed3),0s background-color;border:none;border-radius:1.75rem;outline:none;display:block;position:fixed;inset:10% auto auto 50%;overflow:hidden auto;transform:translate(-50%,-4rem)}dialog.small{block-size:25%;inline-size:25%}dialog.medium{block-size:50%;inline-size:50%}dialog.large{block-size:75%;inline-size:75%}dialog:is(.active,[open]){visibility:visible;opacity:1;transform:translate(-50%)}dialog:popover-open{visibility:visible;opacity:1;transform:translate(-50%)}dialog:is(.top,.right,.bottom,.left,.max){--_padding:1rem}dialog:is(.top,.bottom){opacity:1;block-size:auto;max-block-size:100%;inline-size:100%;min-inline-size:auto}dialog.top{border-radius:0 0 1rem 1rem;padding-block-start:var(--_top);inset:0 auto auto 0;transform:translateY(-100%)}dialog.bottom{border-radius:1rem 1rem 0 0;padding-block-end:var(--_bottom);inset:auto auto 0 0;transform:translateY(100%)}dialog:is(.left,.right){opacity:1;background-color:var(--surface);block-size:100%;max-block-size:100%;inline-size:auto;padding-block:var(--_top) var(--_bottom);inset:0 auto auto 0}[dir=rtl] dialog.right,dialog.left{border-radius:0 1rem 1rem 0;inset:0 auto auto 0;transform:translate(-100%)}[dir=rtl] dialog.left,dialog.right{border-radius:1rem 0 0 1rem;inset:0 0 auto auto;transform:translate(100%)}dialog.max{background-color:var(--surface);block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;padding-block:var(--_top) var(--_bottom);border-radius:0;inset:0 auto auto 0;transform:translateY(4rem)}dialog:is(.active,[open]):is(.left,.right,.top,.bottom,.max){transform:translate(0)}dialog:popover-open:is(.left,.right,.top,.bottom,.max){transform:translate(0)}dialog.small:is(.left,.right){inline-size:20rem}dialog.medium:is(.left,.right){inline-size:32rem}dialog.large:is(.left,.right){inline-size:44rem}dialog.small:is(.top,.bottom){block-size:16rem}dialog.medium:is(.top,.bottom){block-size:24rem}dialog.large:is(.top,.bottom){block-size:32rem}hr,[class*=divider]{all:unset;background-color:var(--outline-variant);block-size:.0625rem;min-block-size:auto;inline-size:-webkit-fill-available;display:block}hr+*,[class*=divider]+*{margin:0!important}hr.medium,.medium-divider{margin:1rem 0!important}hr.large,.large-divider{margin:1.5rem 0!important}hr.small,.small-divider{margin:.5rem 0!important}li:has(>:is(hr,.divider)){inline-size:-webkit-fill-available;background:0 0!important;align-self:normal!important;min-block-size:auto!important;min-inline-size:auto!important;padding:0!important}:is(hr,.divider).vertical{min-block-size:1.5rem;inline-size:.0625rem;min-inline-size:auto;align-self:center!important;padding:0!important}li:has(>:is(hr,.divider).vertical){min-block-size:1.5rem;inline-size:.0625rem;min-inline-size:auto;align-self:center!important;padding:0!important}summary{cursor:pointer;list-style-type:none}summary::-webkit-details-marker{display:none}summary>*{pointer-events:none;margin:0}li>details>summary+.list{margin:0!important}.field{--_input:3rem;--_start:1.2rem;--_middle:calc(var(--_input,0) / 2);min-block-size:var(--_input);border-radius:.25rem .25rem 0 0;flex-direction:column;display:flex}.field.fill{--_background:var(--surface-variant);background-color:unset!important;color:unset!important}.field.fill>:is(input,select,textarea){background-color:var(--_background);z-index:0}.field.small{--_input:2.5rem;--_start:1rem}.field.large{--_input:3.5rem;--_start:1.4rem}.field.extra{--_input:4rem;--_start:1.6rem}.field.border{border-radius:.25rem}.field[class*=round].small{border-radius:1.25rem}.field[class*=round]{border-radius:1.5rem}.field[class*=round].large{border-radius:1.75rem}.field[class*=round].extra{border-radius:2rem}.field>:is(i,img,svg,progress.circle,a){inset:calc((var(--_input,0) / 2) - .75rem) auto auto auto;cursor:pointer;z-index:10;pointer-events:none;block-size:1.5rem;inline-size:1.5rem;margin:auto 0;position:absolute}.field>:is(a,.front){pointer-events:all!important}.field>a>:is(i,img,svg,progress.circle,a){block-size:1.5rem;inline-size:1.5rem}.field>:is(i,img,svg,progress.circle,a),[dir=rtl] .field>:is(i,img,svg,progress.circle,a):first-child{inset:calc(var(--_middle,0) - .75rem) 1rem auto auto}.field>:is(i,img,svg,progress.circle,a):first-child,[dir=rtl] .field>:is(i,img,svg,progress.circle,a){inset:calc(var(--_middle,0) - .75rem) auto auto 1rem}.field.invalid>i{color:var(--error)}.field>progress.circle{border-width:.1875rem}.field>:is(input,textarea,select){all:unset;box-sizing:border-box;border-radius:inherit;min-block-size:var(--_input);z-index:1;resize:none;text-align:start;cursor:text;background:0 0;border:.0625rem solid #0000;outline:none;align-items:center;padding:0 .9375rem;font-family:inherit;font-size:1rem;display:flex;position:relative}input::-webkit-date-and-time-value{text-align:start}:-webkit-any(input,select,textarea):-webkit-any(:-webkit-autofill,:autofill){-webkit-text-fill-color:var(--on-surface);-webkit-background-clip:text}:is(input,select,textarea):is(:autofill,:autofill){-webkit-text-fill-color:var(--on-surface);-webkit-background-clip:text}.field>:is(input,textarea,select):focus{border:.125rem solid #0000;padding-inline:.875rem}.field>textarea:not([rows]){field-sizing:content;max-block-size:12rem}input[type=file],input[type=color],:not(.field)>input:is([type^=date],[type^=time],[type=month],[type=week]){opacity:0;border:0;outline:0;block-size:100%;inline-size:100%;margin:0;padding:0;position:absolute;inset:0;z-index:2!important}input::-webkit-calendar-picker-indicator{opacity:0;border:0;outline:0;block-size:100%;inline-size:100%;margin:0;padding:0;position:absolute;inset:0;z-index:2!important}@media (pointer:fine){.field>input::-webkit-calendar-picker-indicator{z-index:-1!important}}input::-webkit-search-decoration{display:none}input::-webkit-search-cancel-button{display:none}input::-webkit-search-results-button{display:none}input::-webkit-search-results-decoration{display:none}input::-webkit-inner-spin-button{display:none}input::-webkit-outer-spin-button{display:none}input[type=number]{appearance:textfield}.field.border>:is(input,textarea,select){border-color:var(--outline)}.field.border>:is(input,textarea,select):focus{border-color:var(--primary)}.field[class*=round]>:is(input,textarea,select){padding-inline:1.4376rem}.field[class*=round]>:is(input,textarea,select):focus{padding-inline:1.375rem}.field.prefix>:is(input,textarea,select){padding-inline-start:2.9375rem}.field.prefix>.slider{margin-inline-start:3.5rem}.field.prefix>:is(input,textarea,select):focus{padding-inline-start:2.875rem}.field.suffix>:is(input,textarea,select){padding-inline-end:2.9375rem}.field.suffix>.slider{margin-inline-end:3.5rem}.field.suffix>:is(input,textarea,select):focus{padding-inline-end:2.875rem}.field:not(.border,[class*=round])>:is(input,textarea,select){border-block-end-color:var(--outline)}.field:not(.border,[class*=round])>:is(input,textarea,select):focus{border-block-end-color:var(--primary)}.field[class*=round]:not(.border,.fill)>:is(input,textarea,select),.field[class*=round]:not(.border)>:is(input,textarea,select):focus{box-shadow:var(--elevate1)}.field[class*=round]:not(.border,.fill)>:is(input,textarea,select):focus{box-shadow:var(--elevate2)}.field.invalid:not(.border,[class*=round])>:is(input,textarea,select),.field.invalid:not(.border,[class*=round])>:is(input,textarea,select):focus{border-block-end-color:var(--error)}.field.invalid.border>:is(input,textarea,select),.field.invalid.border>:is(input,textarea,select):focus{border-color:var(--error)}.field:has(>:disabled){opacity:.5;cursor:not-allowed}.field>:disabled{cursor:not-allowed}.field>select{-webkit-user-select:none;user-select:none}@-moz-document url-prefix(){.field>select:focus{background-color:var(--surface)}.field.fill>select:focus{background-color:var(--surface-variant)}.field>select:focus+label{z-index:1}}.field>select>option{background-color:var(--surface)}.field>:is(input,select){padding-block-start:1rem}.field:not(.label)>:is(input,select),.field.border:not(.fill)>:is(input,select){padding-block-start:0}.field>textarea{padding-block-start:var(--_start)!important}.field>textarea:focus{padding-block-start:calc(var(--_start,0) - .01rem)!important}.field:not(.label)>textarea,.field.border:not(.fill)>textarea{padding-block-start:calc(var(--_start,0) - .5rem)!important}.field:not(.label)>textarea:focus,.field.border:not(.fill)>textarea:focus{padding-block-start:calc(var(--_start,0) - .51rem)!important}.field.label>label{--_start:1rem;inset:-.5rem 1rem 0 var(--_start);block-size:calc(var(--_input,0) + 1rem);line-height:calc(var(--_input,0) + 1rem);white-space:nowrap;pointer-events:none;gap:.25rem;font-size:1rem;transition:all .2s;display:flex;position:absolute}[dir=rtl] .field.label>label{inset:-.5rem var(--_start) 0 1rem}.field.label[class*=round]>label,[dir=rtl] .field.labell[class*=round]>label{inset:-.5rem 1.75rem 0 var(--_start)}.field.label.border.prefix:not(.fill)>:is(label.active,:focus+label,[placeholder]:not(:placeholder-shown)+label,select+label){--_start:1rem}.field.label[class*=round]>label,.field.label.border.prefix[class*=round]:not(.fill)>:is(label.active,:focus+label,[placeholder]:not(:placeholder-shown)+label,select+label){--_start:1.5rem}.field.label.prefix>label{--_start:3rem}.field.label>:is(label.active,:focus+label,[placeholder]:not(:placeholder-shown)+label,select+label){block-size:2.5rem;font-size:.75rem;line-height:2.5rem}.field.label.border:not(.fill)>:is(label.active,:focus+label,[placeholder]:not(:placeholder-shown)+label,select+label){block-size:1rem;line-height:1rem}.field.label.border:not(.fill)>label:after{content:\"\";border-block-start:.0625rem solid var(--outline);flex:auto;block-size:1rem;margin:.5rem 0 0;transition:none;display:block}.field.label.border:not(.fill)>:focus+label:after{border-block-start:.125rem solid var(--primary)}.field.label.border:not(.fill)>:is(input,textarea):is(:focus,[placeholder]:not(:placeholder-shown),.active),.field.label.border:not(.fill)>select{clip-path:polygon(-2% -2%,.75rem -2%,.75rem .5rem,calc(100% - 1rem) .5rem,calc(100% - 1rem) -2%,102% -2%,102% 102%,-2% 102%)}[dir=rtl] .field.label.border:not(.fill)>:is(input,textarea):is(:focus,[placeholder]:not(:placeholder-shown),.active),[dir=rtl] .field.label.border:not(.fill)>select{clip-path:polygon(-2% -2%,1rem -2%,1rem .5rem,calc(100% - .75rem) .5rem,calc(100% - .75rem) -2%,102% -2%,102% 102%,-2% 102%)}.field.label.border[class*=round]:not(.fill)>:is(input,textarea):is(:focus,[placeholder]:not(:placeholder-shown),.active),.field.label.border[class*=round]:not(.fill)>select{clip-path:polygon(-2% -2%,1.25rem -2%,1.25rem .5rem,calc(100% - 1.75rem) .5rem,calc(100% - 1.75rem) -2%,102% -2%,102% 102%,-2% 102%)}[dir=rtl] .field.label.border[class*=round]:not(.fill)>:is(input,textarea):is(:focus,[placeholder]:not(:placeholder-shown),.active),[dir=rtl] .field.label.border[class*=round]:not(.fill)>select{clip-path:polygon(-2% -2%,1.75rem -2%,1.75rem .5rem,calc(100% - 1.25rem) .5rem,calc(100% - 1.25rem) -2%,102% -2%,102% 102%,-2% 102%)}.field.label>:focus+label{color:var(--primary)}.field.label.invalid>label,.field.label.invalid>label:after{color:var(--error)!important;border-color:var(--error)!important}.field.label>label>a{block-size:inherit;line-height:inherit;inline-size:1rem}.field.label>label>a>:is(i,img,svg){block-size:1rem;inline-size:1rem;font-size:1rem;line-height:1rem}.field>output{align-self:start;padding:.25rem 1rem;font-size:.75rem;line-height:1.25rem;display:inline-block;background:0 0!important}.field>output.invalid{color:var(--error)!important}.field[class*=round]>output{padding:.25rem 1.5rem}.field.invalid>output:not(.invalid),.field:not(.invalid)>output.invalid{display:none}.field.invalid>output.invalid~menu,.field:not(.invalid)>output:not(.invalid)~menu{inset:auto auto 1.75rem 0}table td>.field{margin:0}fieldset{border:.0625rem solid var(--outline-variant);border-radius:.25rem;padding:1rem}fieldset>legend{margin:0 -.25rem;padding:0 .25rem}fieldset>legend+*{margin-block-start:0!important}.grid{--_gap:1rem;gap:var(--_gap);grid-template-columns:repeat(12,1fr);block-size:auto;display:grid}.grid.no-space{--_gap:0rem}.grid.medium-space{--_gap:1.5rem}.grid.large-space{--_gap:2rem}.grid>*{margin:0}.s1{grid-area:auto/span 1}.s2{grid-area:auto/span 2}.s3{grid-area:auto/span 3}.s4{grid-area:auto/span 4}.s5{grid-area:auto/span 5}.s6{grid-area:auto/span 6}.s7{grid-area:auto/span 7}.s8{grid-area:auto/span 8}.s9{grid-area:auto/span 9}.s10{grid-area:auto/span 10}.s11{grid-area:auto/span 11}.s12{grid-area:auto/span 12}@media only screen and (width>=601px){.m1{grid-area:auto/span 1}.m2{grid-area:auto/span 2}.m3{grid-area:auto/span 3}.m4{grid-area:auto/span 4}.m5{grid-area:auto/span 5}.m6{grid-area:auto/span 6}.m7{grid-area:auto/span 7}.m8{grid-area:auto/span 8}.m9{grid-area:auto/span 9}.m10{grid-area:auto/span 10}.m11{grid-area:auto/span 11}.m12{grid-area:auto/span 12}}@media only screen and (width>=993px){.l1{grid-area:auto/span 1}.l2{grid-area:auto/span 2}.l3{grid-area:auto/span 3}.l4{grid-area:auto/span 4}.l5{grid-area:auto/span 5}.l6{grid-area:auto/span 6}.l7{grid-area:auto/span 7}.l8{grid-area:auto/span 8}.l9{grid-area:auto/span 9}.l10{grid-area:auto/span 10}.l11{grid-area:auto/span 11}.l12{grid-area:auto/span 12}}i,:is(.checkbox,.radio,.switch)>span:before,:is(.checkbox,.radio,.switch)>span>i{--_size:1.5rem;font-family:var(--font-icon);font-style:normal;font-weight:400;font-size:var(--_size);letter-spacing:normal;text-transform:none;white-space:nowrap;word-wrap:normal;font-feature-settings:\"liga\";-webkit-font-smoothing:antialiased;vertical-align:middle;text-align:center;inline-size:var(--_size);min-inline-size:var(--_size);block-size:var(--_size);min-block-size:var(--_size);box-sizing:content-box;direction:ltr;border-radius:0;justify-content:center;align-items:center;line-height:normal;display:inline-flex;overflow:hidden}i:has(.badge){overflow:unset}i.tiny{--_size:1rem}.chip>i,i.small{--_size:1.25rem}i.medium{--_size:1.5rem}i.large{--_size:1.75rem}i.extra{--_size:2rem}i.fill,a.active>i,button.active>i{font-variation-settings:\"FILL\" 1}i>:is(img,svg){border-radius:inherit;block-size:100%;inline-size:100%;padding:inherit;background-size:100%;position:absolute;inset:0 auto auto 0}i[class*=fa-]{font-size:calc(var(--_size,0) * .85);block-size:auto;min-block-size:auto;line-height:normal}.absolute{position:absolute}.fixed{position:fixed}:is(.absolute,.fixed).left.right{inline-size:auto}:is(.absolute,.fixed).left.right.small{block-size:20rem}:is(.absolute,.fixed).left.right.medium{block-size:28rem}:is(.absolute,.fixed).left.right.large{block-size:44rem}:is(.absolute,.fixed).top.bottom.small{inline-size:20rem}:is(.absolute,.fixed).top.bottom.medium{inline-size:28rem}:is(.absolute,.fixed).top.bottom.large{inline-size:44rem}.list{flex-direction:column;flex:1;margin:0;padding:0;display:flex}.list>li,.list>li>details>summary,.list>li>a:only-child{all:unset;box-sizing:border-box;text-align:start;white-space:nowrap;cursor:pointer;flex:1;justify-content:flex-start;align-self:normal;align-items:center;gap:1rem;min-block-size:3.5rem;padding:.5rem 1rem;display:flex;position:relative}.list>li:has(ul,ol,details[open],a:only-child){padding:0}.list>li>.list{padding:0 0 0 1rem}.list>li>*,.list>li>a:only-child>*{margin:0}.list>li>:is(details,.max),.list>li>a:only-child>.max,.list>li>details>summary>.max{flex:1}.list.border>li:not(:last-child):before,.list.border>li>details[open]>summary:before{content:\"\";background-color:var(--outline-variant);block-size:.0625rem;inline-size:auto;position:absolute;inset:auto 0 0}.list.no-space>li,.list.no-space>li>details>summary{min-block-size:2.5rem}.list.medium-space>li,.list.medium-space>li>details>summary{min-block-size:4.5rem}.list.large-space>li,.list.large-space>li>details>summary{min-block-size:5.5rem}.list>li:focus-visible,.list>li>a:only-child:focus-visible{outline:.125rem solid var(--primary);outline-offset:-.25rem}:has(>main){box-sizing:border-box;background-color:var(--surface);grid-template:\"left top right\"\"left header right\"\"left main right\"minmax(0,1fr)\"left footer right\"\"left bottom right\"/auto minmax(0,1fr) auto;min-block-size:100dvh;display:grid}nav.left{grid-area:left}nav.right{grid-area:right}nav.top{grid-area:top}nav.bottom{grid-area:bottom}header{grid-area:header}footer{grid-area:footer}main{--_padding:.5rem;padding:var(--_padding);grid-area:main;overflow:hidden}aside{z-index:1}aside:not(.fixed,.absolute).right{float:right}aside:not(.fixed,.absolute).left{float:left}svg{fill:currentColor}:is(img,svg,video):is(.small,.medium,.large,.tiny,.extra,.round,.circle,.square,.responsive){--_size:3rem;object-fit:cover;object-position:center;transition:transform var(--speed3),border-radius var(--speed3),padding var(--speed3);block-size:var(--_size);inline-size:var(--_size)}:is(img,svg,video).round{--_round:.5rem}:is(img,svg,video).tiny{--_size:2rem}:is(img,svg,video).small{--_size:2.5rem}:is(img,svg,video).large{--_size:3.5rem}:is(img,svg,video).extra{--_size:4rem}:is(img,svg,video).responsive{--_size:100%;margin:0 auto}:is(img,svg,video).responsive.tiny{block-size:4rem;inline-size:100%}:is(img,svg,video).responsive.small{block-size:8rem;inline-size:100%}:is(img,svg,video).responsive.medium{block-size:12rem;inline-size:100%}:is(img,svg,video).responsive.large{block-size:16rem;inline-size:100%}:is(img,svg,video).responsive.extra{block-size:20rem;inline-size:100%}:is(img,svg,video).responsive.round{--_round:2rem}:is(img,svg,video).empty-state{inline-size:24rem;max-inline-size:100%}:is(button,.button,.chip):not(.transparent)>.responsive{border:.25rem solid #0000}:is(button,.button,.chip,.field)>:is(img,svg):not(.responsive),.tabs :is(img,svg):not(.responsive){min-block-size:1.5rem;max-block-size:1.5rem;min-inline-size:1.5rem;max-inline-size:1.5rem}:is(button,.button,.chip):not(.extend)>.responsive:first-child{margin-inline-start:calc(-1 * var(--_padding,0))}:is(button,.button,.chip):not(.extend)>.responsive:not(:first-child){margin-inline-end:calc(-1 * var(--_padding,0))}:is(button,.button,.chip,.circle,.square,.extend)>.responsive{--_size:inherit;margin:0 auto}.extend>:is(.responsive,i){z-index:1;margin:0;position:absolute;inset-inline:1rem}.extend>.responsive{inline-size:3.5rem;inset-inline:0}.extend.border>.responsive{inline-size:3.375rem}menu{opacity:0;visibility:hidden;box-shadow:var(--elevate2);background-color:var(--surface-container);z-index:11;text-transform:none;max-block-size:50vh;inline-size:100%;color:var(--on-surface);text-align:start;transition:all var(--speed2) var(--speed2);border-radius:1rem;flex-direction:column;justify-content:flex-start;gap:.125rem;padding:.25rem;font-size:.875rem;font-weight:400;line-height:normal;display:flex;position:absolute;inset:auto auto 0 0;overflow:hidden auto;transform:scale(.8)translateY(120%);max-inline-size:none!important}menu.no-space{gap:0}menu.small-space{gap:.25rem}menu.medium-space{gap:.375rem}menu.large-space{gap:.5rem}menu.extra-space{gap:.625rem}[dir=rtl] menu{inset:auto 0 0 auto}menu.no-wrap{white-space:nowrap!important;inline-size:max-content!important}menu.active,:not([data-ui]):focus-within>menu,menu>li:hover>menu,menu>li>menu:hover{opacity:1;visibility:visible;transition:all var(--speed2),background-color 0s;transform:scale(1)translateY(100%)}menu.top.active,:not([data-ui]):focus-within>menu.top,menu>li:hover>menu.top,menu>li>menu.top:hover{transform:scale(1)translateY(-100%)}menu:is(.min,.max).active,:not([data-ui]):focus-within>menu:is(.min,.max){transform:scale(1)}menu *{white-space:inherit!important}menu>li,menu>li>a:only-child{all:unset;box-sizing:border-box;text-align:start;align-self:normal;align-items:center;justify-content:inherit;white-space:nowrap;cursor:pointer;min-block-size:2.75rem;transition:border-radius var(--speed2);border-radius:.25rem;flex:1;gap:1rem;padding:.5rem 1rem;display:flex;position:relative;margin:0!important}menu>li:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}menu>li:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}menu>li:hover{background-color:color-mix(in srgb,currentColor 10%,transparent)}menu>li.active{background-color:var(--tertiary-container);color:var(--on-tertiary-container)}menu>li:is(.active,:active){border-radius:.75rem}menu>li>:is(.max,.field),menu>li>a:only-child>.max{flex:1;margin:0;padding:0}menu>li:has(.field,a:only-child){flex:1;margin:0;padding:0}menu.min{inset:0 0 auto;transform:scale(.8)}[dir=rtl] menu.min.right,menu.min.left,menu.top.left{inset:0 0 auto auto}[dir=rtl] menu.min.left,menu.min.right,menu.top,menu.top.right{inset:0 auto auto 0}menu.max{z-index:100;border-radius:0;block-size:100%;min-block-size:auto;max-block-size:none;position:fixed;inset:0;transform:scale(.8)}menu.max>li{flex:none!important}menu.no-wrap:is(.min,.max){min-inline-size:16rem}[dir=rtl] menu.right,[dir=rtl] menu.top.min.right,menu.left,menu.top.min.left{inset:auto 0 0 auto}[dir=rtl] menu.left,[dir=rtl] menu.top.min.left,menu.right,menu.top.min{inset:auto auto 0 0}menu.top{transform:scale(.8)translateY(-120%)}menu:has(menu){--_child:1;--_type:0;overflow:unset;white-space:nowrap;max-block-size:none;inline-size:auto;min-inline-size:12rem}menu>li>:is(menu,menu.right),[dir=rtl] menu>li>menu.left{inset:auto auto calc(3rem * (var(--_child,0) - var(--_type,0))) 100%}[dir=rtl] menu>li>:is(menu,menu.right),menu>li>menu.left{inset:auto 100% calc(3rem * (var(--_child,0) - var(--_type,0))) auto}menu>li>:is(menu.top,menu.top.right),[dir=rtl] menu>li>menu.top.left{inset:calc(3rem * (var(--_child,0) - var(--_type,0))) auto auto 100%}[dir=rtl] menu>li>:is(menu.top,menu.top.right),menu>li>menu.top.left{inset:calc(3rem * (var(--_child,0) - var(--_type,0))) 100% auto auto}menu.group{max-block-size:none;inline-size:100%;min-inline-size:auto;overflow:unset;box-shadow:none;background:0 0;padding:.5rem 0}menu.group>li{box-shadow:none;min-block-size:auto;padding:0}menu.group>li:hover{background:0 0}menu.group>li>menu,menu.group>li>menu:hover{opacity:1;visibility:visible;z-index:auto;border-radius:1rem 1rem .5rem .5rem;flex:1;max-block-size:none;transition:none;position:relative;inset:0;transform:none}menu.group>li:last-child>menu{border-radius:.5rem .5rem 1rem 1rem}menu>li:nth-last-child(2){--_child:2}menu>li:nth-last-child(3){--_child:3}menu>li:nth-last-child(4){--_child:4}menu>li:nth-last-child(5){--_child:5}menu>li:nth-last-child(6){--_child:6}menu>li:nth-last-child(7){--_child:7}menu>li:nth-last-child(8){--_child:8}menu>li:nth-last-child(9){--_child:9}menu>li:nth-last-child(10){--_child:10}menu>li:nth-last-child(11){--_child:11}menu>li:nth-last-of-type(2){--_type:1}menu>li:nth-last-of-type(3){--_type:2}menu>li:nth-last-of-type(4){--_type:3}menu>li:nth-last-of-type(5){--_type:4}menu>li:nth-last-of-type(6){--_type:5}menu>li:nth-last-of-type(7){--_type:6}menu>li:nth-last-of-type(8){--_type:7}menu>li:nth-last-of-type(9){--_type:8}menu>li:nth-last-of-type(10){--_type:9}menu>li:nth-last-of-type(11){--_type:10}@media (pointer:coarse){:not(menu,[data-ui]):hover>menu{opacity:1;visibility:visible;transform:scale(1)translateY(100%)}:not(menu,[data-ui]):hover>menu.top{transform:scale(1)translateY(-100%)}}nav>:is(ol,ul),nav>:is(ol,ul)>li{all:unset}nav,.row,a.row{text-align:start;white-space:nowrap;border-radius:0;justify-content:flex-start;align-self:normal;align-items:center;gap:1rem;display:flex}a.row,nav.row{min-block-size:3rem;margin:0}:is(nav,.row,.max)>:only-child,:is(nav,.row,.max)>span>*,nav>:is(ol,ul)>li>:only-child,nav>:is(ol,ul)>li>span>*{margin:0}:is(nav,.row)>:not(ul,ol,header,footer){white-space:normal;flex:none;margin:0}:is(nav,.row).min{display:inline-flex}:is(nav,.row,li).no-space{gap:0}:is(nav,.row,li).tiny-space{gap:.5rem}:is(nav,.row,li).medium-space{gap:1.5rem}:is(nav,.row,li).large-space{gap:2rem}:is(nav,.row)>.max,:is(nav,.row)>:is(ol,ul)>.max{flex:1}:is(nav,.row).wrap{flex-wrap:wrap;display:flex}:is(header,footer)>:is(nav,.row){min-block-size:inherit}nav:is(.left,.right,.top,.bottom){--_padding:.5rem;--_top:calc(var(--_padding,0) + var(--top,0));--_bottom:calc(var(--_padding,0) + var(--bottom,0));color:var(--on-surface);z-index:100;text-align:center;padding:var(--_padding);border:0;margin:0;position:sticky;inset:0;transform:none}nav:is(.left,.right){background-color:var(--surface);block-size:100dvh;min-inline-size:6rem;padding-block:var(--_top) var(--_bottom);flex-direction:column;justify-content:flex-start}nav:is(.top,.bottom){background-color:var(--surface-container);flex-direction:row;justify-content:center;block-size:auto;min-block-size:4.5rem;padding:.5rem;position:sticky;inset:0}nav.top{block-size:calc(var(--top,0) + 4.5rem);padding-block-start:var(--_top)}nav.bottom{block-size:calc(var(--bottom,0) + 4.5rem);padding-block-end:var(--_bottom)}nav>header{align-items:flex-start;gap:1rem;min-block-size:auto;margin:0 0 1rem;padding:0;background:0 0!important}nav:is(.top,.bottom)>header{flex-direction:row;align-items:center;margin:0 1rem 0 0}nav>header>*{margin:0;transition:none}nav.max>header>*{transition:all var(--speed1)}nav>header>.extend:hover{--_padding:0;inline-size:var(--_size)}nav>header>.extend:hover>span:not([class]){display:none}nav>:is(ol,ul){all:inherit;flex:auto;min-inline-size:auto;margin:0;padding:0}nav.max:is(.left,.right,.top,.bottom){inline-size:auto;min-inline-size:12.75rem;padding:var(--_top) 1.25rem var(--_bottom) 1.25rem;align-items:flex-start;gap:0}nav.max>:is(ol,ul){padding:0}nav.max>header{margin:0 0 1.25rem}nav.max:is(.top,.bottom)>header{margin:0 1.25rem 0 0}nav.max>header>.extend{--_padding:1.5rem;inline-size:auto;padding:0 var(--_padding)}nav.max>header>.extend>span:not([class]){margin-inline-start:var(--_padding);display:block}nav.max>header>.extend>:is(img,svg)+span{margin-inline-start:calc(1rem + var(--_padding,0))}nav.max:is(.top,.bottom){align-items:center;min-inline-size:auto;max-inline-size:none;padding:0 .5rem}nav:is(.left,.right,.top,.bottom)>a:not(.button,.chip),nav:is(.left,.right,.top,.bottom)>:is(ol,ul)>li>a:not(.button,.chip){flex-direction:column;gap:.25rem;inline-size:3.5rem;font-size:.8rem;line-height:normal;display:flex}nav:not(.max):is(.left,.right,.top,.bottom)>a:not(.button,.chip)>i,nav:not(.max):is(.left,.right,.top,.bottom)>:is(ol,ul)>li>a:not(.button,.chip)>i{border-radius:2rem;margin:0 auto;padding:.25rem 1rem}nav.max:is(.left,.right,.top,.bottom)>a:not(.button,.chip),nav.max:is(.left,.right,.top,.bottom)>:is(ol,ul)>li>a:not(.button,.chip){block-size:3.5rem;inline-size:auto;font-size:inherit;border-radius:2rem;flex-direction:row;gap:.5rem;padding:0 1rem}nav:is(.left,.right,.top,.bottom)>a.active:not(.button,.chip),nav:is(.left,.right,.top,.bottom)>:is(ol,ul)>li>a.active:not(.button,.chip){transition:padding var(--speed1) linear}nav.max:is(.top,.bottom)>a:not(.button,.chip),nav.max:is(.top,.bottom)>:is(ol,ul)>li>a:not(.button,.chip){gap:.25rem;block-size:2.5rem;font-size:.8rem}nav.max:is(.left,.right,.top,.bottom)>a.active:not(.button,.chip),nav.max:is(.left,.right,.top,.bottom)>:is(ol,ul)>li>a.active:not(.button,.chip),nav:is(.left,.right,.top,.bottom):not(.max)>a.active:not(.button,.chip)>i,nav:is(.left,.right,.top,.bottom):not(.max)>:is(ol,ul)>li>a.active:not(.button,.chip)>i{background-color:var(--secondary-container);color:var(--on-secondary-container)}nav.vertical>:is(ol,ul){align-items:normal}:is(nav,.row):is(.left-align,.top-align,.vertical){justify-content:flex-start}:is(nav,.row):is(.right-align,.bottom-align){justify-content:flex-end}:is(nav,.row):is(.center-align,.middle-align){justify-content:center}:is(nav,.row):is(.left-align,.top-align,.vertical).vertical{align-items:flex-start}:is(nav,.row):is(.right-align,.bottom-align).vertical{align-items:flex-end}:is(nav,.row):is(.center-align,.middle-align).vertical{align-items:center}nav:not(.left,.right)>.space{inline-size:.5rem}nav:not(.left,.right)>.medium-space{inline-size:1rem}nav:not(.left,.right)>.large-space{inline-size:1.5rem}nav.tabbed{background-color:var(--surface-container);gap:0;block-size:4rem;border-radius:4rem!important}nav.tabbed.small{block-size:3rem}nav.tabbed.large{block-size:5rem}nav.tabbed>a{border-radius:inherit;block-size:inherit;flex:1;align-items:center;gap:.5rem;padding-inline:1rem;font-size:1rem;display:inline-flex}nav.tabbed>a.active{background-color:var(--primary-container)}nav.toolbar{background-color:var(--surface-container);color:var(--on-surface);border-radius:2rem;justify-content:space-around;gap:.5rem;min-block-size:4rem;min-inline-size:4rem;padding:0 1rem;display:inline-flex}nav.toolbar>a{border-radius:1.75rem;gap:.5rem;min-block-size:2.5rem;min-inline-size:2.5rem;display:inline-flex}nav.toolbar>a:has(>:not(i)){padding:0 1rem}nav.toolbar>a.active{background-color:var(--secondary-container);color:var(--on-secondary-container)}nav.toolbar.fill{background-color:var(--primary-container)!important;color:var(--on-primary-container)!important}nav.toolbar.fill>a.active{background-color:var(--surface-container)!important;color:var(--on-surface)!important}nav.toolbar.vertical{align-self:center;min-inline-size:4rem;padding:1rem 0;flex-direction:column!important;align-items:center!important}nav.toolbar.vertical>a{block-size:2.5rem;inline-size:2.5rem}nav.toolbar.vertical>a>:is(div,span):not(.badge,.tooltip){display:none}nav.toolbar.max{border-radius:0;display:flex}nav.group{background:0 0!important}nav.group:is(.connected,.split){gap:.125rem}nav.group:not(.split)>:is(.button,button):not(.border){background-color:var(--surface-container);color:var(--on-surface-container)}nav.group:not(.split)>:is(.button,button).active{background-color:var(--primary);color:var(--on-primary)}nav.group.connected>:is(.button,button):not(.border){background-color:var(--surface-container);color:var(--on-surface-container)}nav.group.connected>:is(.button,button).active{background-color:var(--secondary-container);color:var(--on-secondary-container)}nav.group:is(.connected,.split)>:is(.button,button).active,nav.split>:is(.button,button):active{border-radius:2rem!important}:not(nav)>:is(ul,ol){all:revert}:is(.scroll,.no-scroll,.no-space,.tabs,.tabbed)>:focus-visible{outline:.125rem solid var(--primary);outline-offset:-.125rem}nav.split>:is(.button,button):not(.chip,.fill,.border){background-color:var(--primary);color:var(--on-primary)}@media only screen and (width<=600px){nav.top,nav.bottom{justify-content:space-around}}.overlay,dialog::backdrop{opacity:0;visibility:hidden;color:var(--on-surface);background-color:var(--overlay);z-index:100;transition:all var(--speed3),0s background-color;border-radius:0;position:fixed;inset:0;display:block!important}.overlay.active{opacity:1;visibility:visible}dialog:popover-open::backdrop{opacity:1;visibility:visible}.overlay+dialog::backdrop,.snackbar::backdrop{display:none}[popover]{border:0}.page{--_transform:translate(0, 0);opacity:0;display:none;position:absolute}.page.active{opacity:1;position:inherit;display:inherit;animation:var(--speed4) to-page ease}.page.active.top{--_transform:translate(0, -4rem)}.page.active.bottom{--_transform:translate(0, 4rem)}.page.active.left{--_transform:translate(-4rem, 0)}.page.active.right{--_transform:translate(4rem, 0)}@keyframes to-page{0%{opacity:0;transform:var(--_transform)}to{opacity:1;transform:translate(0)}}progress{--_light:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4AWJiYGAQBgAAAP//ZyYa+wAAAAZJREFUAwAAIgAWeX9MsQAAAABJRU5ErkJggg==);--_dark:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4AWL6//+/FAAAAP//qSv5QwAAAAZJREFUAwAJIAMaJWjIvQAAAABJRU5ErkJggg==);--_size:.25rem;inline-size:100%;block-size:var(--_size);color:var(--primary);background:var(--_light);writing-mode:horizontal-tb;appearance:none;direction:ltr;border:none;border-radius:1rem;flex:none;position:relative;overflow:hidden}.dark progress{background:var(--_dark)}progress.small{--_size:.25rem}progress.medium{--_size:.35rem}progress.large{--_size:.45rem}progress.indeterminate{--_value:100;animation:3.2s infinite to-indeterminate}progress:not(.circle,[value]):after{content:\"\";clip-path:none;background:currentColor;block-size:100%;inline-size:100%;animation:3.2s infinite to-linear;position:absolute;inset:0}progress:not(.circle,[value])::-moz-progress-bar{animation:3.2s infinite to-linear}progress:not(.circle,[value])::-webkit-progress-value{animation:3.2s infinite to-linear}progress::-webkit-progress-bar{background:0 0}progress::-webkit-progress-value{background:currentColor}progress::-moz-progress-bar{background:currentColor}progress.wavy{block-size:calc(var(--_size,0) * 2);background:0 0;background-image:var(--_light);background-position:0;background-repeat:repeat-x;background-size:auto calc(var(--_size,0) / 2)}.dark progress.wavy{background-image:var(--_dark)}progress.wavy:not(.circle,[value]):after{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1220'%20height='75'%20viewBox='610%201101%201220%2075'%3e%3cpath%20fill='%23d0bcff'%20d='M1870.425%201173.746c-29.448%200-58.665-7.477-84.493-21.622l-.09-.049c-43.555-23.82-95.546-23.809-139.091.039l-.113.062c-25.803%2014.109-54.984%2021.567-84.394%2021.568-29.449%200-58.667-7.478-84.495-21.623-43.554-23.852-95.539-23.865-139.089-.052l-.092.051c-25.83%2014.146-55.048%2021.623-84.497%2021.623-29.423%200-58.613-7.463-84.425-21.584l-.077-.042c-43.572-23.863-95.596-23.862-139.164-.001l-.085.046c-25.809%2014.117-55.001%2021.581-84.418%2021.581h-.001c-29.45-.001-58.669-7.479-84.498-21.625-43.534-23.845-95.513-23.863-139.063-.058l-.108.06c-25.829%2014.146-55.047%2021.623-84.496%2021.623-29.398%200-58.566-7.451-84.362-21.551l-.142-.075c-43.568-23.863-95.593-23.863-139.163%200l-.081.043c-25.811%2014.12-55.001%2021.583-84.421%2021.583-29.45%200-58.668-7.478-84.497-21.624-7.521-4.118-10.278-13.554-6.159-21.074s13.554-10.277%2021.074-6.158c43.57%2023.862%2095.593%2023.864%20139.163%200l.098-.053c25.807-14.114%2054.991-21.573%2084.406-21.573%2029.398%200%2058.567%207.451%2084.364%2021.55l.14.076c43.534%2023.843%2095.508%2023.864%20139.056.059l.113-.063c25.828-14.145%2055.049-21.622%2084.496-21.622h.002c29.449%200%2058.668%207.478%2084.497%2021.625%2043.57%2023.863%2095.595%2023.862%20139.165.001q.032-.019.065-.036c25.813-14.124%2055.011-21.591%2084.438-21.591%2029.42%200%2058.61%207.463%2084.421%2021.582l.082.045c43.539%2023.847%2095.521%2023.862%20139.074.049l.096-.053c25.829-14.146%2055.047-21.623%2084.496-21.623s58.667%207.477%2084.496%2021.623c43.58%2023.867%2095.604%2023.866%20139.172.005l.118-.064c25.803-14.108%2054.98-21.564%2084.389-21.564%2029.448-.001%2058.666%207.476%2084.494%2021.62l.114.063c43.549%2023.807%2095.528%2023.791%20139.063-.051%207.52-4.121%2016.955-1.361%2021.073%206.159%204.119%207.521%201.361%2016.955-6.159%2021.073-25.828%2014.146-55.045%2021.622-84.492%2021.622'%3e%3canimateTransform%20attributeName='transform'%20calcMode='linear'%20dur='1s'%20from='0%200'%20repeatCount='indefinite'%20to='312.5%200'%20type='translate'/%3e%3c/path%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1220'%20height='75'%20viewBox='610%201101%201220%2075'%3e%3cpath%20fill='%23d0bcff'%20d='M1870.425%201173.746c-29.448%200-58.665-7.477-84.493-21.622l-.09-.049c-43.555-23.82-95.546-23.809-139.091.039l-.113.062c-25.803%2014.109-54.984%2021.567-84.394%2021.568-29.449%200-58.667-7.478-84.495-21.623-43.554-23.852-95.539-23.865-139.089-.052l-.092.051c-25.83%2014.146-55.048%2021.623-84.497%2021.623-29.423%200-58.613-7.463-84.425-21.584l-.077-.042c-43.572-23.863-95.596-23.862-139.164-.001l-.085.046c-25.809%2014.117-55.001%2021.581-84.418%2021.581h-.001c-29.45-.001-58.669-7.479-84.498-21.625-43.534-23.845-95.513-23.863-139.063-.058l-.108.06c-25.829%2014.146-55.047%2021.623-84.496%2021.623-29.398%200-58.566-7.451-84.362-21.551l-.142-.075c-43.568-23.863-95.593-23.863-139.163%200l-.081.043c-25.811%2014.12-55.001%2021.583-84.421%2021.583-29.45%200-58.668-7.478-84.497-21.624-7.521-4.118-10.278-13.554-6.159-21.074s13.554-10.277%2021.074-6.158c43.57%2023.862%2095.593%2023.864%20139.163%200l.098-.053c25.807-14.114%2054.991-21.573%2084.406-21.573%2029.398%200%2058.567%207.451%2084.364%2021.55l.14.076c43.534%2023.843%2095.508%2023.864%20139.056.059l.113-.063c25.828-14.145%2055.049-21.622%2084.496-21.622h.002c29.449%200%2058.668%207.478%2084.497%2021.625%2043.57%2023.863%2095.595%2023.862%20139.165.001q.032-.019.065-.036c25.813-14.124%2055.011-21.591%2084.438-21.591%2029.42%200%2058.61%207.463%2084.421%2021.582l.082.045c43.539%2023.847%2095.521%2023.862%20139.074.049l.096-.053c25.829-14.146%2055.047-21.623%2084.496-21.623s58.667%207.477%2084.496%2021.623c43.58%2023.867%2095.604%2023.866%20139.172.005l.118-.064c25.803-14.108%2054.98-21.564%2084.389-21.564%2029.448-.001%2058.666%207.476%2084.494%2021.62l.114.063c43.549%2023.807%2095.528%2023.791%20139.063-.051%207.52-4.121%2016.955-1.361%2021.073%206.159%204.119%207.521%201.361%2016.955-6.159%2021.073-25.828%2014.146-55.045%2021.622-84.492%2021.622'%3e%3canimateTransform%20attributeName='transform'%20calcMode='linear'%20dur='1s'%20from='0%200'%20repeatCount='indefinite'%20to='312.5%200'%20type='translate'/%3e%3c/path%3e%3c/svg%3e\");-webkit-mask-position:0;mask-position:0;-webkit-mask-size:auto 100%;mask-size:auto 100%;-webkit-mask-repeat:repeat-x;mask-repeat:repeat-x}progress.wavy::-webkit-progress-value{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1220'%20height='75'%20viewBox='610%201101%201220%2075'%3e%3cpath%20fill='%23d0bcff'%20d='M1870.425%201173.746c-29.448%200-58.665-7.477-84.493-21.622l-.09-.049c-43.555-23.82-95.546-23.809-139.091.039l-.113.062c-25.803%2014.109-54.984%2021.567-84.394%2021.568-29.449%200-58.667-7.478-84.495-21.623-43.554-23.852-95.539-23.865-139.089-.052l-.092.051c-25.83%2014.146-55.048%2021.623-84.497%2021.623-29.423%200-58.613-7.463-84.425-21.584l-.077-.042c-43.572-23.863-95.596-23.862-139.164-.001l-.085.046c-25.809%2014.117-55.001%2021.581-84.418%2021.581h-.001c-29.45-.001-58.669-7.479-84.498-21.625-43.534-23.845-95.513-23.863-139.063-.058l-.108.06c-25.829%2014.146-55.047%2021.623-84.496%2021.623-29.398%200-58.566-7.451-84.362-21.551l-.142-.075c-43.568-23.863-95.593-23.863-139.163%200l-.081.043c-25.811%2014.12-55.001%2021.583-84.421%2021.583-29.45%200-58.668-7.478-84.497-21.624-7.521-4.118-10.278-13.554-6.159-21.074s13.554-10.277%2021.074-6.158c43.57%2023.862%2095.593%2023.864%20139.163%200l.098-.053c25.807-14.114%2054.991-21.573%2084.406-21.573%2029.398%200%2058.567%207.451%2084.364%2021.55l.14.076c43.534%2023.843%2095.508%2023.864%20139.056.059l.113-.063c25.828-14.145%2055.049-21.622%2084.496-21.622h.002c29.449%200%2058.668%207.478%2084.497%2021.625%2043.57%2023.863%2095.595%2023.862%20139.165.001q.032-.019.065-.036c25.813-14.124%2055.011-21.591%2084.438-21.591%2029.42%200%2058.61%207.463%2084.421%2021.582l.082.045c43.539%2023.847%2095.521%2023.862%20139.074.049l.096-.053c25.829-14.146%2055.047-21.623%2084.496-21.623s58.667%207.477%2084.496%2021.623c43.58%2023.867%2095.604%2023.866%20139.172.005l.118-.064c25.803-14.108%2054.98-21.564%2084.389-21.564%2029.448-.001%2058.666%207.476%2084.494%2021.62l.114.063c43.549%2023.807%2095.528%2023.791%20139.063-.051%207.52-4.121%2016.955-1.361%2021.073%206.159%204.119%207.521%201.361%2016.955-6.159%2021.073-25.828%2014.146-55.045%2021.622-84.492%2021.622'%3e%3canimateTransform%20attributeName='transform'%20calcMode='linear'%20dur='1s'%20from='0%200'%20repeatCount='indefinite'%20to='312.5%200'%20type='translate'/%3e%3c/path%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1220'%20height='75'%20viewBox='610%201101%201220%2075'%3e%3cpath%20fill='%23d0bcff'%20d='M1870.425%201173.746c-29.448%200-58.665-7.477-84.493-21.622l-.09-.049c-43.555-23.82-95.546-23.809-139.091.039l-.113.062c-25.803%2014.109-54.984%2021.567-84.394%2021.568-29.449%200-58.667-7.478-84.495-21.623-43.554-23.852-95.539-23.865-139.089-.052l-.092.051c-25.83%2014.146-55.048%2021.623-84.497%2021.623-29.423%200-58.613-7.463-84.425-21.584l-.077-.042c-43.572-23.863-95.596-23.862-139.164-.001l-.085.046c-25.809%2014.117-55.001%2021.581-84.418%2021.581h-.001c-29.45-.001-58.669-7.479-84.498-21.625-43.534-23.845-95.513-23.863-139.063-.058l-.108.06c-25.829%2014.146-55.047%2021.623-84.496%2021.623-29.398%200-58.566-7.451-84.362-21.551l-.142-.075c-43.568-23.863-95.593-23.863-139.163%200l-.081.043c-25.811%2014.12-55.001%2021.583-84.421%2021.583-29.45%200-58.668-7.478-84.497-21.624-7.521-4.118-10.278-13.554-6.159-21.074s13.554-10.277%2021.074-6.158c43.57%2023.862%2095.593%2023.864%20139.163%200l.098-.053c25.807-14.114%2054.991-21.573%2084.406-21.573%2029.398%200%2058.567%207.451%2084.364%2021.55l.14.076c43.534%2023.843%2095.508%2023.864%20139.056.059l.113-.063c25.828-14.145%2055.049-21.622%2084.496-21.622h.002c29.449%200%2058.668%207.478%2084.497%2021.625%2043.57%2023.863%2095.595%2023.862%20139.165.001q.032-.019.065-.036c25.813-14.124%2055.011-21.591%2084.438-21.591%2029.42%200%2058.61%207.463%2084.421%2021.582l.082.045c43.539%2023.847%2095.521%2023.862%20139.074.049l.096-.053c25.829-14.146%2055.047-21.623%2084.496-21.623s58.667%207.477%2084.496%2021.623c43.58%2023.867%2095.604%2023.866%20139.172.005l.118-.064c25.803-14.108%2054.98-21.564%2084.389-21.564%2029.448-.001%2058.666%207.476%2084.494%2021.62l.114.063c43.549%2023.807%2095.528%2023.791%20139.063-.051%207.52-4.121%2016.955-1.361%2021.073%206.159%204.119%207.521%201.361%2016.955-6.159%2021.073-25.828%2014.146-55.045%2021.622-84.492%2021.622'%3e%3canimateTransform%20attributeName='transform'%20calcMode='linear'%20dur='1s'%20from='0%200'%20repeatCount='indefinite'%20to='312.5%200'%20type='translate'/%3e%3c/path%3e%3c/svg%3e\");-webkit-mask-position:0;mask-position:0;-webkit-mask-size:auto 100%;mask-size:auto 100%;-webkit-mask-repeat:repeat-x;mask-repeat:repeat-x}progress.wavy::-moz-progress-bar{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1220'%20height='75'%20viewBox='610%201101%201220%2075'%3e%3cpath%20fill='%23d0bcff'%20d='M1870.425%201173.746c-29.448%200-58.665-7.477-84.493-21.622l-.09-.049c-43.555-23.82-95.546-23.809-139.091.039l-.113.062c-25.803%2014.109-54.984%2021.567-84.394%2021.568-29.449%200-58.667-7.478-84.495-21.623-43.554-23.852-95.539-23.865-139.089-.052l-.092.051c-25.83%2014.146-55.048%2021.623-84.497%2021.623-29.423%200-58.613-7.463-84.425-21.584l-.077-.042c-43.572-23.863-95.596-23.862-139.164-.001l-.085.046c-25.809%2014.117-55.001%2021.581-84.418%2021.581h-.001c-29.45-.001-58.669-7.479-84.498-21.625-43.534-23.845-95.513-23.863-139.063-.058l-.108.06c-25.829%2014.146-55.047%2021.623-84.496%2021.623-29.398%200-58.566-7.451-84.362-21.551l-.142-.075c-43.568-23.863-95.593-23.863-139.163%200l-.081.043c-25.811%2014.12-55.001%2021.583-84.421%2021.583-29.45%200-58.668-7.478-84.497-21.624-7.521-4.118-10.278-13.554-6.159-21.074s13.554-10.277%2021.074-6.158c43.57%2023.862%2095.593%2023.864%20139.163%200l.098-.053c25.807-14.114%2054.991-21.573%2084.406-21.573%2029.398%200%2058.567%207.451%2084.364%2021.55l.14.076c43.534%2023.843%2095.508%2023.864%20139.056.059l.113-.063c25.828-14.145%2055.049-21.622%2084.496-21.622h.002c29.449%200%2058.668%207.478%2084.497%2021.625%2043.57%2023.863%2095.595%2023.862%20139.165.001q.032-.019.065-.036c25.813-14.124%2055.011-21.591%2084.438-21.591%2029.42%200%2058.61%207.463%2084.421%2021.582l.082.045c43.539%2023.847%2095.521%2023.862%20139.074.049l.096-.053c25.829-14.146%2055.047-21.623%2084.496-21.623s58.667%207.477%2084.496%2021.623c43.58%2023.867%2095.604%2023.866%20139.172.005l.118-.064c25.803-14.108%2054.98-21.564%2084.389-21.564%2029.448-.001%2058.666%207.476%2084.494%2021.62l.114.063c43.549%2023.807%2095.528%2023.791%20139.063-.051%207.52-4.121%2016.955-1.361%2021.073%206.159%204.119%207.521%201.361%2016.955-6.159%2021.073-25.828%2014.146-55.045%2021.622-84.492%2021.622'%3e%3canimateTransform%20attributeName='transform'%20calcMode='linear'%20dur='1s'%20from='0%200'%20repeatCount='indefinite'%20to='312.5%200'%20type='translate'/%3e%3c/path%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1220'%20height='75'%20viewBox='610%201101%201220%2075'%3e%3cpath%20fill='%23d0bcff'%20d='M1870.425%201173.746c-29.448%200-58.665-7.477-84.493-21.622l-.09-.049c-43.555-23.82-95.546-23.809-139.091.039l-.113.062c-25.803%2014.109-54.984%2021.567-84.394%2021.568-29.449%200-58.667-7.478-84.495-21.623-43.554-23.852-95.539-23.865-139.089-.052l-.092.051c-25.83%2014.146-55.048%2021.623-84.497%2021.623-29.423%200-58.613-7.463-84.425-21.584l-.077-.042c-43.572-23.863-95.596-23.862-139.164-.001l-.085.046c-25.809%2014.117-55.001%2021.581-84.418%2021.581h-.001c-29.45-.001-58.669-7.479-84.498-21.625-43.534-23.845-95.513-23.863-139.063-.058l-.108.06c-25.829%2014.146-55.047%2021.623-84.496%2021.623-29.398%200-58.566-7.451-84.362-21.551l-.142-.075c-43.568-23.863-95.593-23.863-139.163%200l-.081.043c-25.811%2014.12-55.001%2021.583-84.421%2021.583-29.45%200-58.668-7.478-84.497-21.624-7.521-4.118-10.278-13.554-6.159-21.074s13.554-10.277%2021.074-6.158c43.57%2023.862%2095.593%2023.864%20139.163%200l.098-.053c25.807-14.114%2054.991-21.573%2084.406-21.573%2029.398%200%2058.567%207.451%2084.364%2021.55l.14.076c43.534%2023.843%2095.508%2023.864%20139.056.059l.113-.063c25.828-14.145%2055.049-21.622%2084.496-21.622h.002c29.449%200%2058.668%207.478%2084.497%2021.625%2043.57%2023.863%2095.595%2023.862%20139.165.001q.032-.019.065-.036c25.813-14.124%2055.011-21.591%2084.438-21.591%2029.42%200%2058.61%207.463%2084.421%2021.582l.082.045c43.539%2023.847%2095.521%2023.862%20139.074.049l.096-.053c25.829-14.146%2055.047-21.623%2084.496-21.623s58.667%207.477%2084.496%2021.623c43.58%2023.867%2095.604%2023.866%20139.172.005l.118-.064c25.803-14.108%2054.98-21.564%2084.389-21.564%2029.448-.001%2058.666%207.476%2084.494%2021.62l.114.063c43.549%2023.807%2095.528%2023.791%20139.063-.051%207.52-4.121%2016.955-1.361%2021.073%206.159%204.119%207.521%201.361%2016.955-6.159%2021.073-25.828%2014.146-55.045%2021.622-84.492%2021.622'%3e%3canimateTransform%20attributeName='transform'%20calcMode='linear'%20dur='1s'%20from='0%200'%20repeatCount='indefinite'%20to='312.5%200'%20type='translate'/%3e%3c/path%3e%3c/svg%3e\");-webkit-mask-position:0;mask-position:0;-webkit-mask-size:auto 100%;mask-size:auto 100%;-webkit-mask-repeat:repeat-x;mask-repeat:repeat-x}progress.circle{--_value:attr(value type(<number>), 50);background:conic-gradient(currentColor calc(var(--_value,0) * 1%),var(--active) 0%);border-radius:50%;block-size:2.5rem;inline-size:2.5rem;-webkit-mask-image:radial-gradient(circle,#0000 57%,currentColor 60%);mask-image:radial-gradient(circle,#0000 57%,currentColor 60%)}progress.circle::-webkit-progress-value{background:0 0}progress.circle::-moz-progress-bar{background:0 0}progress.circle.wavy{background:conic-gradient(currentColor calc(var(--_value,0) * 1%),var(--active) 0);-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='480'%20height='480'%20fill='none'%3e%3cpath%20fill='%23d0bcff'%20d='M295.84%2018.168c4.163%203.594%207.898%207.636%2011.723%2011.582%208.982%209.199%2015.965%2013.623%2029.054%2014.21%203.442.04%206.879.016%2010.32-.023%2024.023-.106%2046.223%208.762%2063.445%2025.426%2015.466%2015.648%2025.276%2037.002%2025.662%2059.176-.023%203.55-.086%207.096-.171%2010.645-.133%2010.66%201.763%2019.84%209.074%2027.985%202.227%202.22%204.504%204.374%206.803%206.518%207.48%207.24%2013.335%2014.117%2018.25%2023.313l1.723%203.156c9.935%2019.724%2011.982%2044.682%205.664%2065.89-5.617%2016.737-14.542%2029.311-27.137%2041.517-8.844%208.627-13.592%2015.6-14.21%2028.21-.044%203.536-.014%207.067.022%2010.602.1%2024.28-8.555%2046.572-25.425%2064.007-15.648%2015.466-37.002%2025.276-59.176%2025.662-3.55-.023-7.096-.086-10.645-.171-10.66-.133-19.84%201.763-27.985%209.074-2.22%202.227-4.374%204.504-6.519%206.803-7.238%207.48-14.116%2013.335-23.312%2018.25l-3.156%201.723c-19.724%209.935-44.682%2011.982-65.89%205.664-16.738-5.617-29.31-14.543-41.517-27.137-8.982-9.199-15.965-13.623-29.054-14.21-3.442-.04-6.879-.016-10.32.022-24.023.107-46.223-8.761-63.445-25.425-15.466-15.648-25.276-37.002-25.662-59.176.023-3.55.086-7.096.171-10.645.133-10.66-1.763-19.84-9.074-27.985-2.227-2.22-4.504-4.374-6.803-6.519C20.77%20299.075%2014.915%20292.197%2010%20283l-1.723-3.156c-9.935-19.724-11.982-44.682-5.664-65.89%205.617-16.737%2014.542-29.311%2027.137-41.517%208.844-8.627%2013.592-15.6%2014.21-28.21.044-3.536.014-7.067-.023-10.602-.098-24.28%208.556-46.572%2025.426-64.007%2015.648-15.466%2037.002-25.276%2059.176-25.662%203.55.023%207.096.086%2010.645.171%2010.66.133%2019.84-1.763%2027.985-9.074%202.22-2.227%204.374-4.504%206.518-6.803C180.928%2020.77%20187.804%2014.915%20197%2010l3.156-1.723c30.418-15.321%2069.005-11.063%2095.684%209.891M196%2050a154%20154%200%200%200-2.875%203.5c-9.82%2011.895-25.259%2019.027-40.367%2020.902a164%20164%200%200%201-16.782.508c-16.253-.278-30.131%204.27-42.66%2014.828-10.325%2010.081-17.964%2024.122-18.388%2038.735-.002%202.78.027%205.56.072%208.34.309%2019.165-3.59%2037.379-17.352%2051.62a813%20813%200%200%201-5.515%205.294c-11.667%2011.161-20.677%2023.997-21.371%2040.68-.409%2018.723%203.98%2033.495%2017.015%2047.402a71%2071%200%200%200%205.723%205.066c11.895%209.82%2019.027%2025.259%2020.902%2040.367.465%205.61.617%2011.153.508%2016.782-.278%2016.253%204.27%2030.131%2014.828%2042.66%2010.081%2010.325%2024.122%2017.964%2038.735%2018.388%202.78.002%205.56-.027%208.34-.072%2019.165-.309%2037.379%203.59%2051.62%2017.352a810%20810%200%200%201%205.294%205.515c11.161%2011.667%2023.997%2020.677%2040.68%2021.371%2018.723.409%2033.495-3.98%2047.402-17.015a71%2071%200%200%200%205.066-5.723c9.82-11.895%2025.259-19.027%2040.367-20.902a164%20164%200%200%201%2016.782-.508c16.253.278%2030.131-4.27%2042.66-14.828%2010.325-10.081%2017.964-24.122%2018.388-38.735a487%20487%200%200%200-.072-8.34c-.309-19.165%203.59-37.379%2017.352-51.62a810%20810%200%200%201%205.515-5.294c11.667-11.161%2020.677-23.997%2021.371-40.68.409-18.723-3.98-33.495-17.015-47.402a71%2071%200%200%200-5.723-5.066c-11.895-9.82-19.027-25.259-20.902-40.367a164%20164%200%200%201-.508-16.782c.278-16.253-4.27-30.131-14.828-42.66-10.081-10.325-24.122-17.964-38.735-18.388a487%20487%200%200%200-8.34.072c-19.165.309-37.379-3.59-51.62-17.352a813%20813%200%200%201-5.294-5.515c-11.161-11.667-23.997-20.677-40.68-21.371C225.65%2030.327%20210.23%2035.567%20196%2050'/%3e%3canimateTransform%20attributeName='transform'%20calcMode='linear'%20dur='8s'%20from='360'%20repeatCount='indefinite'%20to='0'%20type='rotate'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='480'%20height='480'%20fill='none'%3e%3cpath%20fill='%23d0bcff'%20d='M295.84%2018.168c4.163%203.594%207.898%207.636%2011.723%2011.582%208.982%209.199%2015.965%2013.623%2029.054%2014.21%203.442.04%206.879.016%2010.32-.023%2024.023-.106%2046.223%208.762%2063.445%2025.426%2015.466%2015.648%2025.276%2037.002%2025.662%2059.176-.023%203.55-.086%207.096-.171%2010.645-.133%2010.66%201.763%2019.84%209.074%2027.985%202.227%202.22%204.504%204.374%206.803%206.518%207.48%207.24%2013.335%2014.117%2018.25%2023.313l1.723%203.156c9.935%2019.724%2011.982%2044.682%205.664%2065.89-5.617%2016.737-14.542%2029.311-27.137%2041.517-8.844%208.627-13.592%2015.6-14.21%2028.21-.044%203.536-.014%207.067.022%2010.602.1%2024.28-8.555%2046.572-25.425%2064.007-15.648%2015.466-37.002%2025.276-59.176%2025.662-3.55-.023-7.096-.086-10.645-.171-10.66-.133-19.84%201.763-27.985%209.074-2.22%202.227-4.374%204.504-6.519%206.803-7.238%207.48-14.116%2013.335-23.312%2018.25l-3.156%201.723c-19.724%209.935-44.682%2011.982-65.89%205.664-16.738-5.617-29.31-14.543-41.517-27.137-8.982-9.199-15.965-13.623-29.054-14.21-3.442-.04-6.879-.016-10.32.022-24.023.107-46.223-8.761-63.445-25.425-15.466-15.648-25.276-37.002-25.662-59.176.023-3.55.086-7.096.171-10.645.133-10.66-1.763-19.84-9.074-27.985-2.227-2.22-4.504-4.374-6.803-6.519C20.77%20299.075%2014.915%20292.197%2010%20283l-1.723-3.156c-9.935-19.724-11.982-44.682-5.664-65.89%205.617-16.737%2014.542-29.311%2027.137-41.517%208.844-8.627%2013.592-15.6%2014.21-28.21.044-3.536.014-7.067-.023-10.602-.098-24.28%208.556-46.572%2025.426-64.007%2015.648-15.466%2037.002-25.276%2059.176-25.662%203.55.023%207.096.086%2010.645.171%2010.66.133%2019.84-1.763%2027.985-9.074%202.22-2.227%204.374-4.504%206.518-6.803C180.928%2020.77%20187.804%2014.915%20197%2010l3.156-1.723c30.418-15.321%2069.005-11.063%2095.684%209.891M196%2050a154%20154%200%200%200-2.875%203.5c-9.82%2011.895-25.259%2019.027-40.367%2020.902a164%20164%200%200%201-16.782.508c-16.253-.278-30.131%204.27-42.66%2014.828-10.325%2010.081-17.964%2024.122-18.388%2038.735-.002%202.78.027%205.56.072%208.34.309%2019.165-3.59%2037.379-17.352%2051.62a813%20813%200%200%201-5.515%205.294c-11.667%2011.161-20.677%2023.997-21.371%2040.68-.409%2018.723%203.98%2033.495%2017.015%2047.402a71%2071%200%200%200%205.723%205.066c11.895%209.82%2019.027%2025.259%2020.902%2040.367.465%205.61.617%2011.153.508%2016.782-.278%2016.253%204.27%2030.131%2014.828%2042.66%2010.081%2010.325%2024.122%2017.964%2038.735%2018.388%202.78.002%205.56-.027%208.34-.072%2019.165-.309%2037.379%203.59%2051.62%2017.352a810%20810%200%200%201%205.294%205.515c11.161%2011.667%2023.997%2020.677%2040.68%2021.371%2018.723.409%2033.495-3.98%2047.402-17.015a71%2071%200%200%200%205.066-5.723c9.82-11.895%2025.259-19.027%2040.367-20.902a164%20164%200%200%201%2016.782-.508c16.253.278%2030.131-4.27%2042.66-14.828%2010.325-10.081%2017.964-24.122%2018.388-38.735a487%20487%200%200%200-.072-8.34c-.309-19.165%203.59-37.379%2017.352-51.62a810%20810%200%200%201%205.515-5.294c11.667-11.161%2020.677-23.997%2021.371-40.68.409-18.723-3.98-33.495-17.015-47.402a71%2071%200%200%200-5.723-5.066c-11.895-9.82-19.027-25.259-20.902-40.367a164%20164%200%200%201-.508-16.782c.278-16.253-4.27-30.131-14.828-42.66-10.081-10.325-24.122-17.964-38.735-18.388a487%20487%200%200%200-8.34.072c-19.165.309-37.379-3.59-51.62-17.352a813%20813%200%200%201-5.294-5.515c-11.161-11.667-23.997-20.677-40.68-21.371C225.65%2030.327%20210.23%2035.567%20196%2050'/%3e%3canimateTransform%20attributeName='transform'%20calcMode='linear'%20dur='8s'%20from='360'%20repeatCount='indefinite'%20to='0'%20type='rotate'/%3e%3c/svg%3e\");-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}progress.circle.small{block-size:1.5rem;inline-size:1.5rem}progress.circle.large{block-size:3.5rem;inline-size:3.5rem}progress.circle:not([value]),progress.circle.indeterminate{--_value:50;animation:1s linear infinite to-rotate}:is(nav,.row,.field)>progress:not(.circle,.small,.medium,.large){flex:auto}progress.max{display:unset;color:currentColor;border-radius:inherit;writing-mode:horizontal-tb;opacity:.33;background:0 0;animation:none;position:absolute;inset:0;block-size:100%!important;inline-size:100%!important}progress.max[class*=-text]{opacity:1}progress.max+*{margin-block-start:0}:is(.button,button,.chip)>progress.circle{color:inherit}@keyframes to-linear{0%{margin:0 0 0 -100%}50%{margin:0}to{margin:0 0 0 100%}}@keyframes to-indeterminate{0%{padding:0 100% 0 0}50%{padding:0}to{padding:0 0 0 100%}}@keyframes to-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.shape{color:var(--on-primary);background-color:var(--primary);border-radius:0;justify-content:center;align-items:center;block-size:3.5rem;inline-size:3.5rem;display:flex;-webkit-mask-position:50%;mask-position:50%;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;border:0!important;margin:0!important;padding:0!important}.transparent>.shape>i{filter:invert()}.shape.tiny-space{-webkit-mask-size:90%;mask-size:90%}.shape.space,.shape.small-space{-webkit-mask-size:80%;mask-size:80%}.shape.medium-space{-webkit-mask-size:70%;mask-size:70%}.shape.large-space{-webkit-mask-size:60%;mask-size:60%}.shape.extra-space{-webkit-mask-size:50%;mask-size:50%}.shape.tiny{block-size:2.5rem;inline-size:2.5rem}.shape.medium{block-size:4.5rem;inline-size:4.5rem}.shape.large{block-size:5.5rem;inline-size:5.5rem}.shape.extra{block-size:6.5rem;inline-size:6.5rem}.shape.max,.shape>.responsive,.shape>.responsive>.responsive{block-size:100%;inline-size:100%;position:absolute;inset:0;border:0!important;margin:0!important;padding:0!important}.shape>.responsive{background:inherit;color:inherit}.shape.rotate{animation:12s linear infinite to-shape-rotate}.shape.rotate>*{animation:12s linear infinite reverse to-shape-rotate}.shape.fast-rotate{animation:6s linear infinite to-shape-rotate}.shape.fast-rotate>*{animation:6s linear infinite reverse to-shape-rotate}.shape.slow-rotate{animation:24s linear infinite to-shape-rotate}.shape.slow-rotate>*{animation:24s linear infinite reverse to-shape-rotate}:is(button,.button,.chip):has(>.shape)>.responsive{border:none}.shape.arch{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='304'%20height='304'%20fill='none'%20viewBox='0%200%20304%20304'%3e%3cpath%20fill='%23d0bcff'%20d='M304%20253.72c0%206.11%200%209.17-.31%2011.74-2.38%2020.05-18.18%2035.85-38.23%2038.23-2.57.31-5.63.31-11.74.31H50.281c-6.112%200-9.168%200-11.737-.31-20.049-2.38-35.856-18.18-38.239-38.23C0%20262.89%200%20259.83%200%20253.72V152C0%2068.05%2068.053%200%20152%200c83.95%200%20152%2068.05%20152%20152z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='304'%20height='304'%20fill='none'%20viewBox='0%200%20304%20304'%3e%3cpath%20fill='%23d0bcff'%20d='M304%20253.72c0%206.11%200%209.17-.31%2011.74-2.38%2020.05-18.18%2035.85-38.23%2038.23-2.57.31-5.63.31-11.74.31H50.281c-6.112%200-9.168%200-11.737-.31-20.049-2.38-35.856-18.18-38.239-38.23C0%20262.89%200%20259.83%200%20253.72V152C0%2068.05%2068.053%200%20152%200c83.95%200%20152%2068.05%20152%20152z'/%3e%3c/svg%3e\")}.shape.arrow{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='316'%20height='278'%20fill='none'%20viewBox='0%200%20316%20278'%3e%3cpath%20fill='%23d0bcff'%20d='M271.57%20122.2c-14.018-21.58-28.035-43.19-42.053-64.77-9.094-14.01-18.35-28.21-30.645-39.34-12.296-11.15-28.224-19.03-44.556-18-14.34.92-27.632%208.63-38.125%2018.7S97.546%2041.26%2089.528%2053.54C67.842%2086.72%2046.13%20119.9%2024.444%20153.1%2014.139%20168.86%203.565%20185.31.713%20204.09c-3.444%2022.69%205.839%2045.8%2022.305%2060.89%2017.219%2015.78%2045.12%2014.5%2066.08%2010.18%2022.977-4.75%2045.443-13.68%2068.877-13.65%2020.072%200%2039.471%206.6%2059.004%2011.4%2019.506%204.77%2040.466%207.71%2059.3.61%2023.38-8.79%2040.169-33.79%2039.712-59.45-.431-23.41-13.534-44.32-26.152-63.8-6.081-9.35-12.161-18.72-18.242-28.07z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='316'%20height='278'%20fill='none'%20viewBox='0%200%20316%20278'%3e%3cpath%20fill='%23d0bcff'%20d='M271.57%20122.2c-14.018-21.58-28.035-43.19-42.053-64.77-9.094-14.01-18.35-28.21-30.645-39.34-12.296-11.15-28.224-19.03-44.556-18-14.34.92-27.632%208.63-38.125%2018.7S97.546%2041.26%2089.528%2053.54C67.842%2086.72%2046.13%20119.9%2024.444%20153.1%2014.139%20168.86%203.565%20185.31.713%20204.09c-3.444%2022.69%205.839%2045.8%2022.305%2060.89%2017.219%2015.78%2045.12%2014.5%2066.08%2010.18%2022.977-4.75%2045.443-13.68%2068.877-13.65%2020.072%200%2039.471%206.6%2059.004%2011.4%2019.506%204.77%2040.466%207.71%2059.3.61%2023.38-8.79%2040.169-33.79%2039.712-59.45-.431-23.41-13.534-44.32-26.152-63.8-6.081-9.35-12.161-18.72-18.242-28.07z'/%3e%3c/svg%3e\")}.shape.boom{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M156.818%2010.16c.753-6.02%201.13-9.03%201.702-9.57a2.145%202.145%200%200%201%202.96%200c.572.54.949%203.55%201.702%209.57l9.578%2076.58c.304%202.43.456%203.64.892%204.15.633.72%201.668.95%202.541.54.601-.28%201.232-1.33%202.493-3.43l39.729-66.04c3.124-5.19%204.686-7.79%205.427-8.05%201.078-.37%202.26.16%202.704%201.22.305.72-.569%203.63-2.317%209.44l-22.23%2073.87c-.706%202.35-1.058%203.52-.863%204.15a2.17%202.17%200%200%200%202.102%201.54c.663-.01%201.663-.71%203.663-2.11l63.01-44.08c4.956-3.47%207.433-5.2%208.214-5.14a2.177%202.177%200%200%201%201.98%202.21c-.014.79-1.988%203.09-5.935%207.68l-50.194%2058.4c-1.593%201.85-2.389%202.78-2.468%203.44-.115.96.414%201.88%201.299%202.26.609.27%201.806.03%204.199-.43l75.397-14.5c5.929-1.14%208.894-1.71%209.58-1.33.998.55%201.398%201.79.915%202.83-.332.71-3.064%202-8.528%204.58l-69.478%2032.83c-2.206%201.04-3.308%201.56-3.648%202.13-.493.83-.382%201.89.272%202.6.45.49%201.636.77%204.009%201.32l74.747%2017.59c5.878%201.38%208.818%202.07%209.29%202.7.687.91.552%202.21-.309%202.96-.593.51-3.61.58-9.646.7l-76.75%201.57c-2.436.05-3.654.08-4.195.46a2.19%202.19%200%200%200-.803%202.49c.214.63%201.184%201.37%203.126%202.85l61.173%2046.62c4.81%203.67%207.216%205.51%207.393%206.27a2.18%202.18%200%200%201-1.48%202.58c-.749.23-3.531-.95-9.096-3.3l-70.749-29.95c-2.246-.95-3.369-1.43-4.019-1.3a2.18%202.18%200%200%200-1.739%201.94c-.059.66.528%201.74%201.703%203.88l37.021%2067.62c2.911%205.31%204.367%207.97%204.219%208.75a2.175%202.175%200%200%201-2.395%201.75c-.778-.1-2.843-2.31-6.973-6.74l-52.517-56.3c-1.667-1.78-2.501-2.68-3.146-2.82a2.15%202.15%200%200%200-2.374%201.06c-.323.58-.22%201.8-.015%204.24l6.467%2076.91c.509%206.05.763%209.07.315%209.72a2.16%202.16%200%200%201-2.895.62c-.672-.41-1.663-3.28-3.645-9.01l-25.204-72.9c-.8-2.32-1.2-3.47-1.73-3.87a2.16%202.16%200%200%200-2.598%200c-.53.4-.93%201.55-1.73%203.87l-25.204%2072.9c-1.982%205.73-2.973%208.6-3.645%209.01-.976.59-2.242.32-2.895-.62-.448-.65-.194-3.67.315-9.72l6.467-76.91c.205-2.44.308-3.66-.015-4.24a2.146%202.146%200%200%200-2.373-1.06c-.646.14-1.48%201.04-3.147%202.82l-52.517%2056.3c-4.13%204.43-6.195%206.64-6.973%206.74a2.175%202.175%200%200%201-2.395-1.75c-.148-.78%201.308-3.44%204.219-8.75l37.021-67.62c1.175-2.14%201.762-3.22%201.703-3.88a2.18%202.18%200%200%200-1.739-1.94c-.65-.13-1.773.35-4.019%201.3l-70.75%2029.95c-5.564%202.35-8.346%203.53-9.095%203.3a2.18%202.18%200%200%201-1.48-2.58c.177-.76%202.583-2.6%207.393-6.27l61.173-46.62c1.942-1.48%202.912-2.22%203.126-2.85a2.19%202.19%200%200%200-.803-2.49c-.541-.38-1.76-.41-4.195-.46l-76.75-1.57c-6.036-.12-9.054-.19-9.646-.7a2.19%202.19%200%200%201-.309-2.96c.472-.63%203.412-1.32%209.29-2.7l74.747-17.59c2.373-.55%203.559-.83%204.01-1.32.653-.71.764-1.77.271-2.6-.34-.57-1.442-1.09-3.648-2.13L15.63%20117.94c-5.464-2.58-8.196-3.87-8.528-4.58a2.18%202.18%200%200%201%20.915-2.83c.686-.38%203.65.19%209.58%201.33l75.397%2014.5c2.393.46%203.59.7%204.199.43a2.18%202.18%200%200%200%201.299-2.26c-.078-.66-.875-1.59-2.468-3.44L45.83%2062.69c-3.947-4.59-5.92-6.89-5.935-7.68a2.18%202.18%200%200%201%201.98-2.21c.78-.06%203.258%201.67%208.214%205.14l63.01%2044.08c2%201.4%203%202.1%203.663%202.11a2.17%202.17%200%200%200%202.102-1.54c.195-.63-.157-1.8-.863-4.15l-22.23-73.87c-1.748-5.81-2.622-8.72-2.317-9.44a2.17%202.17%200%200%201%202.704-1.22c.741.26%202.303%202.86%205.427%208.05L141.314%2088c1.261%202.1%201.892%203.15%202.493%203.43.873.41%201.908.18%202.541-.54.436-.51.588-1.72.892-4.15z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M156.818%2010.16c.753-6.02%201.13-9.03%201.702-9.57a2.145%202.145%200%200%201%202.96%200c.572.54.949%203.55%201.702%209.57l9.578%2076.58c.304%202.43.456%203.64.892%204.15.633.72%201.668.95%202.541.54.601-.28%201.232-1.33%202.493-3.43l39.729-66.04c3.124-5.19%204.686-7.79%205.427-8.05%201.078-.37%202.26.16%202.704%201.22.305.72-.569%203.63-2.317%209.44l-22.23%2073.87c-.706%202.35-1.058%203.52-.863%204.15a2.17%202.17%200%200%200%202.102%201.54c.663-.01%201.663-.71%203.663-2.11l63.01-44.08c4.956-3.47%207.433-5.2%208.214-5.14a2.177%202.177%200%200%201%201.98%202.21c-.014.79-1.988%203.09-5.935%207.68l-50.194%2058.4c-1.593%201.85-2.389%202.78-2.468%203.44-.115.96.414%201.88%201.299%202.26.609.27%201.806.03%204.199-.43l75.397-14.5c5.929-1.14%208.894-1.71%209.58-1.33.998.55%201.398%201.79.915%202.83-.332.71-3.064%202-8.528%204.58l-69.478%2032.83c-2.206%201.04-3.308%201.56-3.648%202.13-.493.83-.382%201.89.272%202.6.45.49%201.636.77%204.009%201.32l74.747%2017.59c5.878%201.38%208.818%202.07%209.29%202.7.687.91.552%202.21-.309%202.96-.593.51-3.61.58-9.646.7l-76.75%201.57c-2.436.05-3.654.08-4.195.46a2.19%202.19%200%200%200-.803%202.49c.214.63%201.184%201.37%203.126%202.85l61.173%2046.62c4.81%203.67%207.216%205.51%207.393%206.27a2.18%202.18%200%200%201-1.48%202.58c-.749.23-3.531-.95-9.096-3.3l-70.749-29.95c-2.246-.95-3.369-1.43-4.019-1.3a2.18%202.18%200%200%200-1.739%201.94c-.059.66.528%201.74%201.703%203.88l37.021%2067.62c2.911%205.31%204.367%207.97%204.219%208.75a2.175%202.175%200%200%201-2.395%201.75c-.778-.1-2.843-2.31-6.973-6.74l-52.517-56.3c-1.667-1.78-2.501-2.68-3.146-2.82a2.15%202.15%200%200%200-2.374%201.06c-.323.58-.22%201.8-.015%204.24l6.467%2076.91c.509%206.05.763%209.07.315%209.72a2.16%202.16%200%200%201-2.895.62c-.672-.41-1.663-3.28-3.645-9.01l-25.204-72.9c-.8-2.32-1.2-3.47-1.73-3.87a2.16%202.16%200%200%200-2.598%200c-.53.4-.93%201.55-1.73%203.87l-25.204%2072.9c-1.982%205.73-2.973%208.6-3.645%209.01-.976.59-2.242.32-2.895-.62-.448-.65-.194-3.67.315-9.72l6.467-76.91c.205-2.44.308-3.66-.015-4.24a2.146%202.146%200%200%200-2.373-1.06c-.646.14-1.48%201.04-3.147%202.82l-52.517%2056.3c-4.13%204.43-6.195%206.64-6.973%206.74a2.175%202.175%200%200%201-2.395-1.75c-.148-.78%201.308-3.44%204.219-8.75l37.021-67.62c1.175-2.14%201.762-3.22%201.703-3.88a2.18%202.18%200%200%200-1.739-1.94c-.65-.13-1.773.35-4.019%201.3l-70.75%2029.95c-5.564%202.35-8.346%203.53-9.095%203.3a2.18%202.18%200%200%201-1.48-2.58c.177-.76%202.583-2.6%207.393-6.27l61.173-46.62c1.942-1.48%202.912-2.22%203.126-2.85a2.19%202.19%200%200%200-.803-2.49c-.541-.38-1.76-.41-4.195-.46l-76.75-1.57c-6.036-.12-9.054-.19-9.646-.7a2.19%202.19%200%200%201-.309-2.96c.472-.63%203.412-1.32%209.29-2.7l74.747-17.59c2.373-.55%203.559-.83%204.01-1.32.653-.71.764-1.77.271-2.6-.34-.57-1.442-1.09-3.648-2.13L15.63%20117.94c-5.464-2.58-8.196-3.87-8.528-4.58a2.18%202.18%200%200%201%20.915-2.83c.686-.38%203.65.19%209.58%201.33l75.397%2014.5c2.393.46%203.59.7%204.199.43a2.18%202.18%200%200%200%201.299-2.26c-.078-.66-.875-1.59-2.468-3.44L45.83%2062.69c-3.947-4.59-5.92-6.89-5.935-7.68a2.18%202.18%200%200%201%201.98-2.21c.78-.06%203.258%201.67%208.214%205.14l63.01%2044.08c2%201.4%203%202.1%203.663%202.11a2.17%202.17%200%200%200%202.102-1.54c.195-.63-.157-1.8-.863-4.15l-22.23-73.87c-1.748-5.81-2.622-8.72-2.317-9.44a2.17%202.17%200%200%201%202.704-1.22c.741.26%202.303%202.86%205.427%208.05L141.314%2088c1.261%202.1%201.892%203.15%202.493%203.43.873.41%201.908.18%202.541-.54.436-.51.588-1.72.892-4.15z'/%3e%3c/svg%3e\")}.shape.bun{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='310'%20height='320'%20fill='none'%20viewBox='0%200%20310%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M0%2081.36A81.35%2081.35%200%200%201%2081.36%200h147.28a81.35%2081.35%200%200%201%2022.7%20159.5.5.5%200%200%200-.37.5c0%20.23.15.43.37.5a81.38%2081.38%200%200%201-22.7%20159.5H81.36A81.35%2081.35%200%200%201%200%20238.64a81.4%2081.4%200%200%201%2058-77.95.72.72%200%200%200%200-1.38A81.4%2081.4%200%200%201%200%2081.36'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='310'%20height='320'%20fill='none'%20viewBox='0%200%20310%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M0%2081.36A81.35%2081.35%200%200%201%2081.36%200h147.28a81.35%2081.35%200%200%201%2022.7%20159.5.5.5%200%200%200-.37.5c0%20.23.15.43.37.5a81.38%2081.38%200%200%201-22.7%20159.5H81.36A81.35%2081.35%200%200%201%200%20238.64a81.4%2081.4%200%200%201%2058-77.95.72.72%200%200%200%200-1.38A81.4%2081.4%200%200%201%200%2081.36'/%3e%3c/svg%3e\")}.shape.burst{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M157.39%202.55c.74-1.32%201.1-1.97%201.55-2.25.65-.4%201.47-.4%202.12%200%20.45.28.81.93%201.55%202.25l25.26%2045.15c.45.81.68%201.22.99%201.46.44.36%201.01.51%201.57.42.39-.06.79-.29%201.58-.77l44.46-26.47c1.29-.77%201.94-1.16%202.46-1.17.77-.03%201.47.38%201.84%201.05.25.47.24%201.22.22%202.73l-.7%2051.73c-.02.93-.02%201.39.12%201.76.2.53.62.95%201.15%201.15.37.14.83.14%201.76.12l51.73-.7c1.51-.02%202.26-.03%202.73.22.67.37%201.08%201.07%201.05%201.84-.01.52-.4%201.17-1.17%202.46l-26.47%2044.46c-.48.79-.71%201.19-.77%201.58-.09.56.06%201.13.42%201.57.24.31.65.54%201.46.99l45.15%2025.26c1.32.74%201.97%201.1%202.25%201.55.4.65.4%201.47%200%202.12-.28.45-.93.81-2.25%201.55l-45.15%2025.26c-.81.45-1.22.68-1.46.99-.36.44-.51%201.01-.42%201.57.06.39.29.79.77%201.58l26.47%2044.46c.77%201.29%201.16%201.94%201.17%202.46.03.77-.38%201.47-1.05%201.84-.47.25-1.22.24-2.73.22l-51.73-.7c-.93-.02-1.39-.02-1.76.12-.53.2-.95.62-1.15%201.15-.14.37-.14.83-.12%201.76l.7%2051.73c.02%201.51.03%202.26-.22%202.73-.37.67-1.07%201.08-1.84%201.05-.52-.01-1.17-.4-2.46-1.17l-44.46-26.47c-.79-.48-1.19-.71-1.58-.77-.56-.09-1.13.06-1.57.42-.31.24-.54.65-.99%201.46l-25.26%2045.15c-.74%201.32-1.1%201.97-1.55%202.25-.65.4-1.47.4-2.12%200-.45-.28-.81-.93-1.55-2.25l-25.26-45.15c-.45-.81-.68-1.22-.99-1.46-.44-.36-1.01-.51-1.57-.42-.39.06-.79.29-1.58.77l-44.46%2026.47c-1.29.77-1.94%201.16-2.46%201.17-.77.03-1.47-.38-1.84-1.05-.25-.47-.24-1.22-.22-2.73l.7-51.73c.02-.93.02-1.39-.12-1.76-.2-.53-.62-.95-1.15-1.15-.37-.14-.83-.14-1.76-.12l-51.73.7c-1.51.02-2.26.03-2.73-.22a2.01%202.01%200%200%201-1.05-1.84c.01-.52.4-1.17%201.17-2.46l26.47-44.46c.48-.79.71-1.19.77-1.58.09-.56-.06-1.13-.42-1.57-.24-.31-.65-.54-1.46-.99L2.55%20162.61c-1.32-.74-1.97-1.1-2.25-1.55-.4-.65-.4-1.47%200-2.12.28-.45.93-.81%202.25-1.55l45.15-25.26c.81-.45%201.22-.68%201.46-.99.36-.44.51-1.01.42-1.57-.06-.39-.29-.79-.77-1.58L22.34%2083.53c-.77-1.29-1.16-1.94-1.17-2.46-.03-.77.38-1.47%201.05-1.84.47-.25%201.22-.24%202.73-.22l51.73.7c.93.02%201.39.02%201.76-.12.53-.2.95-.62%201.15-1.15.14-.37.14-.83.12-1.76l-.7-51.73c-.02-1.51-.03-2.26.22-2.73.37-.67%201.07-1.08%201.84-1.05.52.01%201.17.4%202.46%201.17l44.46%2026.47c.79.48%201.19.71%201.58.77.56.09%201.13-.06%201.57-.42.31-.24.54-.65.99-1.46z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M157.39%202.55c.74-1.32%201.1-1.97%201.55-2.25.65-.4%201.47-.4%202.12%200%20.45.28.81.93%201.55%202.25l25.26%2045.15c.45.81.68%201.22.99%201.46.44.36%201.01.51%201.57.42.39-.06.79-.29%201.58-.77l44.46-26.47c1.29-.77%201.94-1.16%202.46-1.17.77-.03%201.47.38%201.84%201.05.25.47.24%201.22.22%202.73l-.7%2051.73c-.02.93-.02%201.39.12%201.76.2.53.62.95%201.15%201.15.37.14.83.14%201.76.12l51.73-.7c1.51-.02%202.26-.03%202.73.22.67.37%201.08%201.07%201.05%201.84-.01.52-.4%201.17-1.17%202.46l-26.47%2044.46c-.48.79-.71%201.19-.77%201.58-.09.56.06%201.13.42%201.57.24.31.65.54%201.46.99l45.15%2025.26c1.32.74%201.97%201.1%202.25%201.55.4.65.4%201.47%200%202.12-.28.45-.93.81-2.25%201.55l-45.15%2025.26c-.81.45-1.22.68-1.46.99-.36.44-.51%201.01-.42%201.57.06.39.29.79.77%201.58l26.47%2044.46c.77%201.29%201.16%201.94%201.17%202.46.03.77-.38%201.47-1.05%201.84-.47.25-1.22.24-2.73.22l-51.73-.7c-.93-.02-1.39-.02-1.76.12-.53.2-.95.62-1.15%201.15-.14.37-.14.83-.12%201.76l.7%2051.73c.02%201.51.03%202.26-.22%202.73-.37.67-1.07%201.08-1.84%201.05-.52-.01-1.17-.4-2.46-1.17l-44.46-26.47c-.79-.48-1.19-.71-1.58-.77-.56-.09-1.13.06-1.57.42-.31.24-.54.65-.99%201.46l-25.26%2045.15c-.74%201.32-1.1%201.97-1.55%202.25-.65.4-1.47.4-2.12%200-.45-.28-.81-.93-1.55-2.25l-25.26-45.15c-.45-.81-.68-1.22-.99-1.46-.44-.36-1.01-.51-1.57-.42-.39.06-.79.29-1.58.77l-44.46%2026.47c-1.29.77-1.94%201.16-2.46%201.17-.77.03-1.47-.38-1.84-1.05-.25-.47-.24-1.22-.22-2.73l.7-51.73c.02-.93.02-1.39-.12-1.76-.2-.53-.62-.95-1.15-1.15-.37-.14-.83-.14-1.76-.12l-51.73.7c-1.51.02-2.26.03-2.73-.22a2.01%202.01%200%200%201-1.05-1.84c.01-.52.4-1.17%201.17-2.46l26.47-44.46c.48-.79.71-1.19.77-1.58.09-.56-.06-1.13-.42-1.57-.24-.31-.65-.54-1.46-.99L2.55%20162.61c-1.32-.74-1.97-1.1-2.25-1.55-.4-.65-.4-1.47%200-2.12.28-.45.93-.81%202.25-1.55l45.15-25.26c.81-.45%201.22-.68%201.46-.99.36-.44.51-1.01.42-1.57-.06-.39-.29-.79-.77-1.58L22.34%2083.53c-.77-1.29-1.16-1.94-1.17-2.46-.03-.77.38-1.47%201.05-1.84.47-.25%201.22-.24%202.73-.22l51.73.7c.93.02%201.39.02%201.76-.12.53-.2.95-.62%201.15-1.15.14-.37.14-.83.12-1.76l-.7-51.73c-.02-1.51-.03-2.26.22-2.73.37-.67%201.07-1.08%201.84-1.05.52.01%201.17.4%202.46%201.17l44.46%2026.47c.79.48%201.19.71%201.58.77.56.09%201.13-.06%201.57-.42.31-.24.54-.65.99-1.46z'/%3e%3c/svg%3e\")}.shape.circle{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M320%20160c0%2088.366-71.634%20160-160%20160S0%20248.366%200%20160%2071.635%200%20160%200c88.366%200%20160%2071.635%20160%20160'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M320%20160c0%2088.366-71.634%20160-160%20160S0%20248.366%200%20160%2071.635%200%20160%200c88.366%200%20160%2071.635%20160%20160'/%3e%3c/svg%3e\")}.shape.clamshell{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='254'%20fill='none'%20viewBox='0%200%20320%20254'%3e%3cpath%20fill='%23d0bcff'%20d='M306.405%2084.081c6.709%2013.51%2010.063%2020.265%2011.757%2027.322a67.1%2067.1%200%200%201%200%2031.194c-1.694%207.057-5.048%2013.812-11.757%2027.322l-20.438%2041.16c-6.709%2013.51-10.063%2020.265-14.472%2025.501-6.375%207.568-14.411%2012.963-23.236%2015.597C242.155%20254%20235.446%20254%20222.028%20254H97.972c-13.418%200-20.127%200-26.231-1.822-8.825-2.635-16.861-8.029-23.236-15.598-4.409-5.235-7.763-11.991-14.472-25.501l-20.438-41.16c-6.709-13.51-10.063-20.265-11.757-27.322a67.1%2067.1%200%200%201%200-31.194c1.694-7.057%205.048-13.812%2011.757-27.322l20.438-41.16c6.709-13.51%2010.063-20.266%2014.472-25.501C54.88%209.851%2062.916%204.457%2071.741%201.822%2077.845%200%2084.554%200%2097.972%200h124.056c13.418%200%2020.127%200%2026.231%201.822%208.825%202.635%2016.861%208.029%2023.236%2015.598%204.409%205.235%207.763%2011.99%2014.472%2025.501z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='254'%20fill='none'%20viewBox='0%200%20320%20254'%3e%3cpath%20fill='%23d0bcff'%20d='M306.405%2084.081c6.709%2013.51%2010.063%2020.265%2011.757%2027.322a67.1%2067.1%200%200%201%200%2031.194c-1.694%207.057-5.048%2013.812-11.757%2027.322l-20.438%2041.16c-6.709%2013.51-10.063%2020.265-14.472%2025.501-6.375%207.568-14.411%2012.963-23.236%2015.597C242.155%20254%20235.446%20254%20222.028%20254H97.972c-13.418%200-20.127%200-26.231-1.822-8.825-2.635-16.861-8.029-23.236-15.598-4.409-5.235-7.763-11.991-14.472-25.501l-20.438-41.16c-6.709-13.51-10.063-20.265-11.757-27.322a67.1%2067.1%200%200%201%200-31.194c1.694-7.057%205.048-13.812%2011.757-27.322l20.438-41.16c6.709-13.51%2010.063-20.266%2014.472-25.501C54.88%209.851%2062.916%204.457%2071.741%201.822%2077.845%200%2084.554%200%2097.972%200h124.056c13.418%200%2020.127%200%2026.231%201.822%208.825%202.635%2016.861%208.029%2023.236%2015.598%204.409%205.235%207.763%2011.99%2014.472%2025.501z'/%3e%3c/svg%3e\")}.shape.diamond{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='268'%20height='320'%20fill='none'%20viewBox='0%200%20268%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M191.442%20276.481c-16.836%2022.033-25.254%2033.049-34.976%2038.067a49.02%2049.02%200%200%201-44.932%200c-9.722-5.018-18.14-16.034-34.976-38.067l-55.912-73.173c-10.24-13.402-15.36-20.102-17.895-27.276a48.1%2048.1%200%200%201%200-32.064c2.535-7.174%207.655-13.874%2017.895-27.276l55.912-73.173c16.836-22.033%2025.254-33.05%2034.976-38.067a49.02%2049.02%200%200%201%2044.932%200c9.722%205.018%2018.14%2016.034%2034.976%2038.068l55.912%2073.172c10.24%2013.402%2015.36%2020.102%2017.895%2027.276a48.1%2048.1%200%200%201%200%2032.064c-2.535%207.174-7.655%2013.874-17.895%2027.276z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='268'%20height='320'%20fill='none'%20viewBox='0%200%20268%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M191.442%20276.481c-16.836%2022.033-25.254%2033.049-34.976%2038.067a49.02%2049.02%200%200%201-44.932%200c-9.722-5.018-18.14-16.034-34.976-38.067l-55.912-73.173c-10.24-13.402-15.36-20.102-17.895-27.276a48.1%2048.1%200%200%201%200-32.064c2.535-7.174%207.655-13.874%2017.895-27.276l55.912-73.173c16.836-22.033%2025.254-33.05%2034.976-38.067a49.02%2049.02%200%200%201%2044.932%200c9.722%205.018%2018.14%2016.034%2034.976%2038.068l55.912%2073.172c10.24%2013.402%2015.36%2020.102%2017.895%2027.276a48.1%2048.1%200%200%201%200%2032.064c-2.535%207.174-7.655%2013.874-17.895%2027.276z'/%3e%3c/svg%3e\")}.shape.fan{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='280'%20height='280'%20fill='none'%20viewBox='0%200%20280%20280'%3e%3cpath%20fill='%23d0bcff'%20d='M0%2044.21c0-1.56%200-2.34.02-2.999C.717%2018.757%2018.757.717%2041.211.021c.66-.021%201.44-.021%203-.021C52.53%200%2056.69%200%2060.208.11%20179.96%203.825%20276.17%20100.037%20279.89%20219.791c.11%203.518.11%207.678.11%2015.997%200%201.56%200%202.34-.02%203-.7%2022.454-18.74%2040.494-41.19%2041.191-.66.02-1.44.02-3%20.02H62.945c-19.018%200-28.528%200-36.071-2.987a42.53%2042.53%200%200%201-23.887-23.887C0%20245.583%200%20236.073%200%20217.055z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='280'%20height='280'%20fill='none'%20viewBox='0%200%20280%20280'%3e%3cpath%20fill='%23d0bcff'%20d='M0%2044.21c0-1.56%200-2.34.02-2.999C.717%2018.757%2018.757.717%2041.211.021c.66-.021%201.44-.021%203-.021C52.53%200%2056.69%200%2060.208.11%20179.96%203.825%20276.17%20100.037%20279.89%20219.791c.11%203.518.11%207.678.11%2015.997%200%201.56%200%202.34-.02%203-.7%2022.454-18.74%2040.494-41.19%2041.191-.66.02-1.44.02-3%20.02H62.945c-19.018%200-28.528%200-36.071-2.987a42.53%2042.53%200%200%201-23.887-23.887C0%20245.583%200%20236.073%200%20217.055z'/%3e%3c/svg%3e\")}.shape.flower{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20fill-rule='evenodd'%20d='M273.13%2046.863c-11.88-11.875-38.94-6.003-71.58%2012.818C191.77%2023.286%20176.79%200%20160%200c-16.8%200-31.78%2023.284-41.55%2059.678-32.65-18.82-59.7-24.69-71.58-12.817-11.87%2011.876-6%2038.935%2012.82%2071.585C23.29%20128.222%200%20143.204%200%20160c0%2016.793%2023.28%2031.773%2059.68%2041.549-18.83%2032.651-24.7%2059.712-12.83%2071.588%2011.88%2011.876%2038.94%206.001%2071.59-12.827C128.22%20296.711%20143.2%20320%20160%20320c16.79%200%2031.77-23.291%2041.55-59.693%2032.66%2018.829%2059.72%2024.705%2071.6%2012.829%2011.87-11.876%206-38.936-12.83-71.587C296.72%20191.773%20320%20176.793%20320%20160c0-16.796-23.29-31.778-59.7-41.554%2018.83-32.65%2024.7-59.708%2012.83-71.583'%20clip-rule='evenodd'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20fill-rule='evenodd'%20d='M273.13%2046.863c-11.88-11.875-38.94-6.003-71.58%2012.818C191.77%2023.286%20176.79%200%20160%200c-16.8%200-31.78%2023.284-41.55%2059.678-32.65-18.82-59.7-24.69-71.58-12.817-11.87%2011.876-6%2038.935%2012.82%2071.585C23.29%20128.222%200%20143.204%200%20160c0%2016.793%2023.28%2031.773%2059.68%2041.549-18.83%2032.651-24.7%2059.712-12.83%2071.588%2011.88%2011.876%2038.94%206.001%2071.59-12.827C128.22%20296.711%20143.2%20320%20160%20320c16.79%200%2031.77-23.291%2041.55-59.693%2032.66%2018.829%2059.72%2024.705%2071.6%2012.829%2011.87-11.876%206-38.936-12.83-71.587C296.72%20191.773%20320%20176.793%20320%20160c0-16.796-23.29-31.778-59.7-41.554%2018.83-32.65%2024.7-59.708%2012.83-71.583'%20clip-rule='evenodd'/%3e%3c/svg%3e\")}.shape.gem{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='302'%20height='312'%20fill='none'%20viewBox='0%200%20302%20312'%3e%3cpath%20fill='%23d0bcff'%20d='M92.48%2026.632c18.16-13.196%2027.25-19.794%2036.93-23.074a67.3%2067.3%200%200%201%2043.18%200c9.68%203.28%2018.77%209.878%2036.93%2023.074l40.85%2029.673c10.79%207.836%2016.19%2011.754%2020.58%2016.458a67.2%2067.2%200%200%201%2014.32%2023.618c2.14%206.073%203.11%2012.667%205.07%2025.855l7.56%2051.001c3.43%2023.136%205.15%2034.704%203.42%2045.13a67.3%2067.3%200%200%201-21.46%2039.064c-7.87%207.055-18.56%2011.814-39.93%2021.332l-48.41%2021.563c-12.9%205.744-19.35%208.615-25.97%2010.083a67.3%2067.3%200%200%201-29.1%200c-6.62-1.468-13.07-4.339-25.97-10.083l-48.41-21.563c-21.37-9.518-32.06-14.277-39.93-21.332A67.3%2067.3%200%200%201%20.68%20218.367c-1.73-10.426-.01-21.994%203.42-45.13l7.56-51.001c1.96-13.188%202.93-19.782%205.07-25.855a67.2%2067.2%200%200%201%2014.32-23.618c4.39-4.704%209.79-8.622%2020.58-16.458z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='302'%20height='312'%20fill='none'%20viewBox='0%200%20302%20312'%3e%3cpath%20fill='%23d0bcff'%20d='M92.48%2026.632c18.16-13.196%2027.25-19.794%2036.93-23.074a67.3%2067.3%200%200%201%2043.18%200c9.68%203.28%2018.77%209.878%2036.93%2023.074l40.85%2029.673c10.79%207.836%2016.19%2011.754%2020.58%2016.458a67.2%2067.2%200%200%201%2014.32%2023.618c2.14%206.073%203.11%2012.667%205.07%2025.855l7.56%2051.001c3.43%2023.136%205.15%2034.704%203.42%2045.13a67.3%2067.3%200%200%201-21.46%2039.064c-7.87%207.055-18.56%2011.814-39.93%2021.332l-48.41%2021.563c-12.9%205.744-19.35%208.615-25.97%2010.083a67.3%2067.3%200%200%201-29.1%200c-6.62-1.468-13.07-4.339-25.97-10.083l-48.41-21.563c-21.37-9.518-32.06-14.277-39.93-21.332A67.3%2067.3%200%200%201%20.68%20218.367c-1.73-10.426-.01-21.994%203.42-45.13l7.56-51.001c1.96-13.188%202.93-19.782%205.07-25.855a67.2%2067.2%200%200%201%2014.32-23.618c4.39-4.704%209.79-8.622%2020.58-16.458z'/%3e%3c/svg%3e\")}.shape.ghost-ish{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='304'%20height='304'%20fill='none'%20viewBox='0%200%20304%20304'%3e%3cpath%20fill='%23d0bcff'%20d='M0%20144.762C0%2064.812%2068.053%200%20152%200s152%2064.812%20152%20144.762v101.333c0%2031.98-27.221%2057.905-60.8%2057.905-9.953%200-19.347-2.278-27.64-6.315-4.225-2.058-8.441-4.313-12.675-6.578-14.899-7.971-30.019-16.059-46.558-16.059h-8.654c-16.539%200-31.659%208.088-46.558%2016.059-4.234%202.265-8.45%204.52-12.675%206.578C80.147%20301.722%2070.753%20304%2060.8%20304%2027.221%20304%200%20278.075%200%20246.095z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='304'%20height='304'%20fill='none'%20viewBox='0%200%20304%20304'%3e%3cpath%20fill='%23d0bcff'%20d='M0%20144.762C0%2064.812%2068.053%200%20152%200s152%2064.812%20152%20144.762v101.333c0%2031.98-27.221%2057.905-60.8%2057.905-9.953%200-19.347-2.278-27.64-6.315-4.225-2.058-8.441-4.313-12.675-6.578-14.899-7.971-30.019-16.059-46.558-16.059h-8.654c-16.539%200-31.659%208.088-46.558%2016.059-4.234%202.265-8.45%204.52-12.675%206.578C80.147%20301.722%2070.753%20304%2060.8%20304%2027.221%20304%200%20278.075%200%20246.095z'/%3e%3c/svg%3e\")}.shape.heart{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='286'%20fill='none'%20viewBox='0%200%20320%20286'%3e%3cpath%20fill='%23d0bcff'%20d='M251.1.13c-21.661%200-40.987%2010.17-53.619%2026.07L160%2067.51v-.13l-37.481-41.32C109.887%2010.17%2090.561%200%2068.9%200%2030.848%200%200%2031.37%200%2070.06c0%2034%2028.375%2059.41%2048.919%2083.82%2020.47%2024.33%2040.937%2048.64%2061.404%2072.96l45.949%2054.6c1.244%201.47%202.484%202.95%203.728%204.43v.13c1.244-1.48%202.484-2.95%203.728-4.43%2015.315-18.2%2030.63-36.39%2045.949-54.59l61.404-72.96C291.625%20129.61%20320%20104.2%20320%2070.19%20320%2031.5%20289.152.13%20251.1.13'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='286'%20fill='none'%20viewBox='0%200%20320%20286'%3e%3cpath%20fill='%23d0bcff'%20d='M251.1.13c-21.661%200-40.987%2010.17-53.619%2026.07L160%2067.51v-.13l-37.481-41.32C109.887%2010.17%2090.561%200%2068.9%200%2030.848%200%200%2031.37%200%2070.06c0%2034%2028.375%2059.41%2048.919%2083.82%2020.47%2024.33%2040.937%2048.64%2061.404%2072.96l45.949%2054.6c1.244%201.47%202.484%202.95%203.728%204.43v.13c1.244-1.48%202.484-2.95%203.728-4.43%2015.315-18.2%2030.63-36.39%2045.949-54.59l61.404-72.96C291.625%20129.61%20320%20104.2%20320%2070.19%20320%2031.5%20289.152.13%20251.1.13'/%3e%3c/svg%3e\")}.shape.leaf-clover4{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='296'%20height='296'%20fill='none'%20viewBox='0%200%20296%20296'%3e%3cpath%20fill='%23d0bcff'%20d='M21%20148C7.9%20132.34%200%20112.13%200%2090.06%200%2040.32%2040.11%200%2089.6%200c22.39%200%2042.87%208.26%2058.57%2021.91C163.84%208.26%20184.27%200%20206.61%200%20255.98%200%20296%2040.32%20296%2090.06c0%2022.07-7.88%2042.28-20.95%2057.94%2013.07%2015.66%2020.95%2035.87%2020.95%2057.94%200%2049.74-40.02%2090.06-89.39%2090.06-22.34%200-42.77-8.26-58.44-21.91C132.47%20287.74%20111.99%20296%2089.6%20296%2040.11%20296%200%20255.68%200%20205.94c0-22.07%207.9-42.28%2021-57.94'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='296'%20height='296'%20fill='none'%20viewBox='0%200%20296%20296'%3e%3cpath%20fill='%23d0bcff'%20d='M21%20148C7.9%20132.34%200%20112.13%200%2090.06%200%2040.32%2040.11%200%2089.6%200c22.39%200%2042.87%208.26%2058.57%2021.91C163.84%208.26%20184.27%200%20206.61%200%20255.98%200%20296%2040.32%20296%2090.06c0%2022.07-7.88%2042.28-20.95%2057.94%2013.07%2015.66%2020.95%2035.87%2020.95%2057.94%200%2049.74-40.02%2090.06-89.39%2090.06-22.34%200-42.77-8.26-58.44-21.91C132.47%20287.74%20111.99%20296%2089.6%20296%2040.11%20296%200%20255.68%200%20205.94c0-22.07%207.9-42.28%2021-57.94'/%3e%3c/svg%3e\")}.shape.leaft-clover8{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M308.58%20160c25.85%2048.16%206.32%2091.77-43.51%20105.06-13.3%2049.84-56.91%2069.36-105.07%2043.52-48.17%2025.85-91.78%206.32-105.07-43.51C5.1%20251.77-14.43%20208.16%2011.42%20160-14.43%20111.83%205.1%2068.22%2054.93%2054.93%2068.22%205.1%20111.83-14.43%20160%2011.42c48.16-25.85%2091.77-6.32%20105.06%2043.51%2049.84%2013.29%2069.36%2056.9%2043.52%20105.07'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M308.58%20160c25.85%2048.16%206.32%2091.77-43.51%20105.06-13.3%2049.84-56.91%2069.36-105.07%2043.52-48.17%2025.85-91.78%206.32-105.07-43.51C5.1%20251.77-14.43%20208.16%2011.42%20160-14.43%20111.83%205.1%2068.22%2054.93%2054.93%2068.22%205.1%20111.83-14.43%20160%2011.42c48.16-25.85%2091.77-6.32%20105.06%2043.51%2049.84%2013.29%2069.36%2056.9%2043.52%20105.07'/%3e%3c/svg%3e\")}.shape.loading-indicator{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='4%204%2040%2040'%20width='40'%20height='40'%3e%3cpath%20fill='%23d0bcff'%3e%3canimate%20attributeName='d'%20calcMode='spline'%20dur='5s'%20keySplines='0.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8'%20keyTimes='0;%200.14;%200.29;%200.43;%200.57;%200.71;%200.86;%201'%20repeatCount='indefinite'%20values='m37.4%2024.7%200.5%200.7%200.8%200.9%200.8%201.0%200.6%201.0%20-0.1%200.8%20-0.0%200.1%20-0.6%200.7%20-1.1%200.5%20-1.3%200.3%20-1.0%200.2%20-0.9%200.4%20-0.7%201.1%200.1%201.0%200.1%201.1%200.0%201.2%20-0.2%201.1%20-0.4%200.5%20-0.3%200.2%20-0.8%200.2%20-1.2%20-0.4%20-1.2%20-0.4%20-1.0%20-0.5%20-0.8%20-0.1%20-1.3%200.5%20-0.5%200.8%20-0.6%200.9%20-0.6%201.0%20-0.8%200.8%20-0.8%200.2%20-0.1%20-0.0%20-0.9%20-0.3%20-0.8%20-1.0%20-0.6%20-1.0%20-0.6%20-0.9%20-0.5%20-0.7%20-1.3%20-0.3%20-0.9%200.2%20-0.9%200.4%20-1.2%200.5%20-1.2%200.3%20-0.8%20-0.3%20-0.0%20-0.1%20-0.6%20-0.6%20-0.1%20-1.2%200.1%20-1.2%200.0%20-1.1%200.0%20-0.9%20-0.7%20-1.1%20-0.9%20-0.3%20-1.1%20-0.3%20-1.2%20-0.3%20-1.1%20-0.4%20-0.5%20-0.8%20-0.0%200.0%20-0.1%20-0.9%200.6%20-1.0%200.8%20-0.9%200.8%20-0.9%200.5%20-0.7%20-0.0%20-1.4%20-0.5%20-0.7%20-0.8%20-0.9%20-0.8%20-0.9%20-0.6%20-1.0%200.1%20-0.9%200.0%20-0.0%200.5%20-0.8%201.1%20-0.4%201.2%20-0.3%201.1%20-0.3%200.9%20-0.3%200.7%20-1.1%200.0%20-0.9%20-0.0%20-1.1%20-0.1%20-1.2%200.1%20-1.2%200.6%20-0.6%200.0%20-0.1%200.8%20-0.3%201.2%200.3%201.2%200.5%200.9%200.4%200.9%200.2%201.3%20-0.3%200.5%20-0.7%200.6%20-0.9%200.6%20-1.0%200.8%20-1.0%200.9%20-0.3%200.1%200.0%200.8%200.2%200.8%200.8%200.6%201.0%200.6%200.9%200.5%200.8%201.3%200.5%200.8%20-0.1%201.0%20-0.5%201.2%20-0.4%201.2%20-0.4%200.8%200.2%200.3%200.2%200.4%200.5%200.2%201.1%20-0.0%201.2%20-0.1%201.1%20-0.1%201.0%200.7%201.1%200.9%200.4%201.0%200.2%201.3%200.3%201.1%200.5%200.6%200.7%200.0%200.1%200.1%200.8%20-0.5%201.0%20-0.9%201.0%20-0.8%200.9%20-0.5%200.7%20z;m39.9%2024.0%20-0.3%200.8%20-0.4%200.8%20-0.3%200.8%20-0.2%201.5%200.1%200.9%200.1%200.9%20-0.1%200.9%20-0.2%200.8%20-0.3%200.8%20-0.2%200.4%20-0.3%200.4%20-0.5%200.7%20-0.7%200.5%20-0.8%200.4%20-0.8%200.4%20-0.8%200.4%20-1.2%201.0%20-0.5%200.7%20-0.5%200.8%20-0.6%200.6%20-0.6%200.6%20-0.8%200.4%20-0.4%200.2%20-0.5%200.1%20-0.9%200.2%20-0.8%20-0.0%20-0.9%20-0.2%20-0.9%20-0.3%20-0.8%20-0.1%20-1.6%20-0.1%20-0.8%200.2%20-0.9%200.3%20-0.9%200.2%20-0.8%20-0.0%20-0.9%20-0.2%20-0.5%20-0.1%20-0.4%20-0.2%20-0.8%20-0.4%20-0.6%20-0.5%20-0.6%20-0.7%20-0.5%20-0.8%20-0.5%20-0.7%20-1.2%20-1.0%20-0.7%20-0.4%20-0.9%20-0.4%20-0.8%20-0.4%20-0.6%20-0.5%20-0.6%20-0.7%20-0.3%20-0.4%20-0.2%20-0.4%20-0.3%20-0.8%20-0.2%20-0.8%20-0.1%20-0.9%200.1%20-0.9%200.1%20-0.9%20-0.2%20-1.5%20-0.3%20-0.8%20-0.4%20-0.8%20-0.3%20-0.8%20-0.2%20-0.8%20-0.1%20-0.9%200.1%20-0.7%20-0.0%20-0.2%200.2%20-0.8%200.4%20-0.8%200.5%20-0.7%200.6%20-0.6%200.7%20-0.7%200.5%20-0.6%200.6%20-1.3%200.3%20-0.9%200.2%20-0.8%200.3%20-0.8%200.5%20-0.7%200.5%20-0.6%200.2%20-0.2%200.5%20-0.4%200.8%20-0.4%200.8%20-0.3%200.8%20-0.2%200.9%20-0.0%200.8%20-0.1%201.4%20-0.5%200.7%20-0.4%200.7%20-0.5%200.7%20-0.5%200.8%20-0.3%200.8%20-0.2%200.9%20-0.1%200.0%20-0.0%200.8%200.1%200.9%200.2%200.8%200.3%200.7%200.5%200.7%200.5%200.7%200.4%201.4%200.5%200.8%200.1%200.9%200.0%200.9%200.2%200.8%200.3%200.7%200.4%200.5%200.4%200.2%200.1%200.5%200.7%200.5%200.7%200.3%200.8%200.2%200.8%200.3%200.9%200.6%201.3%200.5%200.6%200.7%200.7%200.6%200.6%200.5%200.7%200.4%200.8%200.2%200.8%200.0%200.2%200.1%200.7%20-0.1%200.9%20z;m38.9%2024.2%20-0.2%200.8%20-0.2%200.7%20-0.3%200.8%20-0.2%200.8%20-0.3%200.7%20-0.2%200.8%20-0.3%200.8%20-0.2%200.7%20-0.3%200.8%20-0.2%200.8%20-0.3%200.7%20-0.2%200.8%20-0.4%201.0%20-0.4%200.8%20-0.4%200.8%20-0.6%200.6%20-0.7%200.5%200.0%200.1%20-0.7%200.4%20-0.8%200.3%20-0.8%200.3%20-0.9%200.1%20-1.1%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-1.1%20-0.0%20-0.9%20-0.1%20-0.8%20-0.3%20-0.8%20-0.3%20-0.7%20-0.5%20-0.1%200.0%20-0.6%20-0.5%20-0.6%20-0.7%20-0.4%20-0.7%20-0.4%20-0.8%20-0.4%20-1.0%20-0.2%20-0.8%20-0.3%20-0.7%20-0.2%20-0.8%20-0.3%20-0.8%20-0.2%20-0.7%20-0.3%20-0.8%20-0.2%20-0.8%20-0.3%20-0.7%20-0.2%20-0.8%20-0.3%20-0.7%20-0.2%20-0.8%20-0.3%20-0.8%20-0.2%20-0.7%20-0.3%20-1.1%20-0.2%20-0.9%20-0.0%20-0.8%200.0%20-0.9%200.2%20-0.8%200.1%20-0.1%200.3%20-0.7%200.4%20-0.8%200.6%20-0.6%200.6%20-0.6%200.9%20-0.7%200.6%20-0.5%200.7%20-0.4%200.6%20-0.5%200.7%20-0.5%200.6%20-0.4%200.7%20-0.5%200.6%20-0.5%200.7%20-0.5%200.6%20-0.4%200.7%20-0.5%200.6%20-0.5%200.7%20-0.4%200.6%20-0.5%200.9%20-0.7%200.8%20-0.4%200.8%20-0.3%200.8%20-0.2%200.8%20-0.0%200.1%20-0.0%200.9%200.0%200.8%200.2%200.8%200.3%200.8%200.4%200.9%200.7%200.6%200.5%200.7%200.4%200.6%200.5%200.7%200.5%200.6%200.4%200.7%200.5%200.6%200.5%200.7%200.5%200.6%200.4%200.7%200.5%200.6%200.5%200.7%200.4%200.6%200.5%200.9%200.7%200.6%200.6%200.6%200.7%200.4%200.7%200.3%200.7%200.0%200.1%200.2%200.8%200.1%200.9%20-0.0%200.9%20-0.2%200.8%20-0.3%201.1%20z;m39.6%2024.0%20-0.1%200.8%20-0.3%200.8%20-0.2%200.8%20-0.3%200.7%20-0.3%200.8%20-0.4%200.7%20-0.4%200.7%20-0.5%200.6%20-0.4%200.6%20-0.6%200.6%20-0.6%200.6%20-0.4%200.4%20-0.6%200.6%20-0.4%200.5%20-0.9%200.8%20-0.5%200.5%20-0.6%200.6%20-0.4%200.4%20-0.7%200.7%20-0.5%200.5%20-0.6%200.4%20-0.7%200.5%20-0.6%200.4%20-0.7%200.4%20-0.7%200.3%20-0.8%200.3%20-0.8%200.3%20-0.8%200.2%20-0.8%200.1%20-0.8%200.1%20-0.8%200.1%20-0.9%200.0%20-0.8%20-0.0%20-0.9%20-0.1%20-0.8%20-0.2%20-0.8%20-0.2%20-0.9%20-0.2%20-0.8%20-0.3%20-0.8%20-0.4%20-0.8%20-0.4%20-0.7%20-0.5%20-0.7%20-0.5%20-0.7%20-0.5%20-0.6%20-0.6%20-0.1%20-0.1%20-0.5%20-0.6%20-0.6%20-0.7%20-0.5%20-0.7%20-0.5%20-0.8%20-0.4%20-0.7%20-0.4%20-0.8%20-0.3%20-0.8%20-0.2%20-0.8%20-0.2%20-0.9%20-0.2%20-0.8%20-0.1%20-0.9%200.0%20-0.8%200.0%20-0.9%200.1%20-0.8%200.1%20-0.8%200.1%20-0.8%200.3%20-0.8%200.2%20-0.8%200.3%20-0.7%200.4%20-0.8%200.3%20-0.7%200.5%20-0.6%200.4%20-0.7%200.4%20-0.5%200.6%20-0.6%200.6%20-0.7%200.4%20-0.4%200.6%20-0.6%200.5%20-0.4%200.8%20-0.9%200.5%20-0.5%200.6%20-0.6%200.4%20-0.4%200.7%20-0.7%200.5%20-0.5%200.6%20-0.4%200.7%20-0.5%200.6%20-0.4%200.7%20-0.4%200.7%20-0.3%200.8%20-0.3%200.8%20-0.3%200.8%20-0.2%200.8%20-0.1%200.8%20-0.1%200.8%20-0.1%200.9%20-0.0%200.8%200.0%200.9%200.1%200.8%200.2%200.8%200.2%200.9%200.2%200.8%200.4%200.8%200.3%200.8%200.4%200.7%200.5%200.7%200.5%200.7%200.5%200.6%200.7%200.1%20-0.0%200.5%200.6%200.6%200.7%200.5%200.7%200.5%200.8%200.4%200.7%200.3%200.8%200.4%200.8%200.2%200.8%200.2%200.9%200.2%200.8%200.1%200.9%200.0%200.8%20-0.0%200.8%20-0.1%200.9%20z;m40.0%2024.0%20-0.1%200.8%20-0.5%200.8%20-0.6%200.8%20-0.6%200.6%20-0.6%200.7%20-0.5%200.6%20-0.7%201.2%20-0.1%200.7%20-0.1%200.8%20-0.0%200.9%20-0.1%200.9%20-0.1%200.9%20-0.2%200.9%20-0.5%200.7%20-0.0%200.0%20-0.7%200.5%20-0.9%200.2%20-0.9%200.1%20-0.9%200.1%20-0.8%200.0%20-0.8%200.1%20-0.8%200.1%20-1.2%200.7%20-0.6%200.5%20-0.7%200.6%20-0.6%200.6%20-0.8%200.6%20-0.8%200.5%20-0.8%200.1%20-0.0%200.0%20-0.8%20-0.1%20-0.8%20-0.5%20-0.8%20-0.6%20-0.6%20-0.6%20-0.7%20-0.6%20-0.6%20-0.5%20-1.2%20-0.7%20-0.7%20-0.1%20-0.8%20-0.1%20-0.9%20-0.0%20-0.9%20-0.1%20-0.9%20-0.1%20-0.9%20-0.2%20-0.7%20-0.5%20-0.0%200.0%20-0.5%20-0.7%20-0.2%20-0.9%20-0.1%20-0.9%20-0.1%20-0.9%20-0.0%20-0.8%20-0.1%20-0.8%20-0.1%20-0.8%20-0.7%20-1.2%20-0.5%20-0.6%20-0.6%20-0.7%20-0.6%20-0.6%20-0.6%20-0.8%20-0.5%20-0.8%20-0.1%20-0.8%20-0.0%20-0.0%200.1%20-0.8%200.5%20-0.8%200.6%20-0.8%200.6%20-0.6%200.6%20-0.7%200.5%20-0.6%200.7%20-1.2%200.1%20-0.7%200.1%20-0.8%200.0%20-0.9%200.1%20-0.9%200.1%20-0.9%200.2%20-0.9%200.5%20-0.7%20-0.0%20-0.0%200.7%20-0.5%200.9%20-0.2%200.9%20-0.1%200.9%20-0.1%200.8%20-0.0%200.8%20-0.1%200.8%20-0.1%201.2%20-0.7%200.6%20-0.5%200.7%20-0.6%200.6%20-0.6%200.8%20-0.6%200.8%20-0.5%200.8%20-0.1%200.0%20-0.0%200.8%200.1%200.8%200.5%200.8%200.6%200.6%200.6%200.7%200.6%200.6%200.5%201.2%200.7%200.7%200.1%200.8%200.1%200.9%200.0%200.9%200.1%200.9%200.1%200.9%200.2%200.7%200.5%200.0%20-0.0%200.5%200.7%200.2%200.9%200.1%200.9%200.1%200.9%200.0%200.8%200.1%200.8%200.1%200.8%200.7%201.2%200.5%200.6%200.6%200.7%200.6%200.6%200.6%200.8%200.5%200.8%200.1%200.8%20z;m36.9%2024.6%200.1%200.7%200.2%200.8%200.2%200.7%200.4%200.9%200.4%200.9%200.2%200.9%200.1%201.0%200.1%200.9%20-0.1%200.9%20-0.3%200.9%20-0.3%200.9%20-0.4%200.8%20-0.5%200.8%20-0.6%200.6%20-0.1%200.1%20-0.6%200.6%20-0.8%200.5%20-0.8%200.4%20-0.9%200.3%20-0.9%200.3%20-0.9%200.1%20-0.9%20-0.1%20-1.0%20-0.1%20-0.9%20-0.2%20-0.9%20-0.4%20-0.9%20-0.4%20-0.7%20-0.2%20-0.8%20-0.2%20-0.7%20-0.1%20-1.2%200.0%20-0.7%200.1%20-0.8%200.2%20-0.7%200.2%20-0.9%200.4%20-0.9%200.4%20-0.9%200.2%20-1.0%200.1%20-0.9%200.1%20-0.9%20-0.1%20-0.9%20-0.3%20-0.9%20-0.3%20-0.8%20-0.4%20-0.8%20-0.5%20-0.6%20-0.6%20-0.1%20-0.1%20-0.6%20-0.6%20-0.5%20-0.8%20-0.4%20-0.8%20-0.3%20-0.9%20-0.3%20-0.9%20-0.1%20-0.9%200.1%20-0.9%200.1%20-1.0%200.2%20-0.9%200.4%20-0.9%200.4%20-0.9%200.2%20-0.7%200.2%20-0.8%200.1%20-0.7%20-0.0%20-1.2%20-0.1%20-0.7%20-0.2%20-0.8%20-0.2%20-0.7%20-0.4%20-0.9%20-0.4%20-0.9%20-0.2%20-0.9%20-0.1%20-1.0%20-0.1%20-0.9%200.1%20-0.9%200.3%20-0.9%200.3%20-0.9%200.4%20-0.8%200.5%20-0.8%200.6%20-0.6%200.1%20-0.1%200.6%20-0.6%200.8%20-0.5%200.8%20-0.4%200.9%20-0.3%200.9%20-0.3%200.9%20-0.1%200.9%200.1%201.0%200.1%200.9%200.2%200.9%200.4%200.9%200.4%200.7%200.2%200.8%200.2%200.7%200.1%201.2%20-0.0%200.7%20-0.1%200.8%20-0.2%200.7%20-0.2%200.9%20-0.4%200.9%20-0.4%200.9%20-0.2%201.0%20-0.1%200.9%20-0.1%200.9%200.1%200.9%200.3%200.9%200.3%200.8%200.4%200.8%200.5%200.6%200.6%200.1%200.1%200.6%200.6%200.5%200.8%200.4%200.8%200.3%200.9%200.3%200.9%200.1%200.9%20-0.1%200.9%20-0.1%201.0%20-0.2%200.9%20-0.4%200.9%20-0.4%200.9%20-0.2%200.7%20-0.2%200.8%20-0.1%200.7%20z;m37.7%2024.0%20-0.3%200.7%20-0.4%200.7%20-0.3%200.6%20-0.3%200.7%20-0.4%200.6%20-0.3%200.5%20-0.4%200.6%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.3%200.4%20-0.5%200.4%20-0.8%200.8%20-0.4%200.5%20-0.4%200.3%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.6%200.4%20-0.5%200.3%20-0.6%200.4%20-0.7%200.3%20-0.6%200.3%20-0.7%200.4%20-0.7%200.3%20-0.7%200.2%20-0.7%200.3%20-0.9%200.3%20-0.8%200.2%20-0.8%200.1%20-0.9%200.1%20-1.0%200.1%20-0.9%20-0.0%20-0.9%20-0.1%20-0.9%20-0.1%20-0.9%20-0.3%20-0.9%20-0.3%20-0.8%20-0.4%20-0.8%20-0.6%20-0.7%20-0.6%20-0.0%200.0%20-0.6%20-0.7%20-0.6%20-0.8%20-0.4%20-0.8%20-0.3%20-0.9%20-0.3%20-0.9%20-0.1%20-0.9%20-0.1%20-0.9%200.0%20-0.9%200.1%20-1.0%200.1%20-0.9%200.1%20-0.8%200.2%20-0.8%200.3%20-0.9%200.3%20-0.7%200.2%20-0.7%200.3%20-0.7%200.4%20-0.7%200.3%20-0.6%200.3%20-0.7%200.4%20-0.6%200.3%20-0.5%200.4%20-0.6%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.3%20-0.4%200.5%20-0.4%200.8%20-0.8%200.4%20-0.5%200.4%20-0.3%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.6%20-0.4%200.5%20-0.3%200.6%20-0.4%200.7%20-0.3%200.6%20-0.3%200.7%20-0.4%200.7%20-0.3%200.7%20-0.2%200.7%20-0.3%200.9%20-0.3%200.8%20-0.2%200.8%20-0.1%200.9%20-0.1%201.0%20-0.1%200.9%200.0%200.9%200.1%200.9%200.1%200.9%200.3%200.9%200.3%200.8%200.4%200.8%200.6%200.7%200.6%20-0.0%200.0%200.6%200.7%200.6%200.8%200.4%200.8%200.3%200.9%200.3%200.9%200.1%200.9%200.1%200.9%20-0.0%200.9%20-0.1%201.0%20-0.1%200.9%20-0.1%200.8%20-0.2%200.8%20-0.3%200.9%20-0.3%200.7%20z;m37.4%2024.7%200.5%200.7%200.8%200.9%200.8%201.0%200.6%201.0%20-0.1%200.8%20-0.0%200.1%20-0.6%200.7%20-1.1%200.5%20-1.3%200.3%20-1.0%200.2%20-0.9%200.4%20-0.7%201.1%200.1%201.0%200.1%201.1%200.0%201.2%20-0.2%201.1%20-0.4%200.5%20-0.3%200.2%20-0.8%200.2%20-1.2%20-0.4%20-1.2%20-0.4%20-1.0%20-0.5%20-0.8%20-0.1%20-1.3%200.5%20-0.5%200.8%20-0.6%200.9%20-0.6%201.0%20-0.8%200.8%20-0.8%200.2%20-0.1%20-0.0%20-0.9%20-0.3%20-0.8%20-1.0%20-0.6%20-1.0%20-0.6%20-0.9%20-0.5%20-0.7%20-1.3%20-0.3%20-0.9%200.2%20-0.9%200.4%20-1.2%200.5%20-1.2%200.3%20-0.8%20-0.3%20-0.0%20-0.1%20-0.6%20-0.6%20-0.1%20-1.2%200.1%20-1.2%200.0%20-1.1%200.0%20-0.9%20-0.7%20-1.1%20-0.9%20-0.3%20-1.1%20-0.3%20-1.2%20-0.3%20-1.1%20-0.4%20-0.5%20-0.8%20-0.0%200.0%20-0.1%20-0.9%200.6%20-1.0%200.8%20-0.9%200.8%20-0.9%200.5%20-0.7%20-0.0%20-1.4%20-0.5%20-0.7%20-0.8%20-0.9%20-0.8%20-0.9%20-0.6%20-1.0%200.1%20-0.9%200.0%20-0.0%200.5%20-0.8%201.1%20-0.4%201.2%20-0.3%201.1%20-0.3%200.9%20-0.3%200.7%20-1.1%200.0%20-0.9%20-0.0%20-1.1%20-0.1%20-1.2%200.1%20-1.2%200.6%20-0.6%200.0%20-0.1%200.8%20-0.3%201.2%200.3%201.2%200.5%200.9%200.4%200.9%200.2%201.3%20-0.3%200.5%20-0.7%200.6%20-0.9%200.6%20-1.0%200.8%20-1.0%200.9%20-0.3%200.1%200.0%200.8%200.2%200.8%200.8%200.6%201.0%200.6%200.9%200.5%200.8%201.3%200.5%200.8%20-0.1%201.0%20-0.5%201.2%20-0.4%201.2%20-0.4%200.8%200.2%200.3%200.2%200.4%200.5%200.2%201.1%20-0.0%201.2%20-0.1%201.1%20-0.1%201.0%200.7%201.1%200.9%200.4%201.0%200.2%201.3%200.3%201.1%200.5%200.6%200.7%200.0%200.1%200.1%200.8%20-0.5%201.0%20-0.9%201.0%20-0.8%200.9%20-0.5%200.7%20z'/%3e%3canimateTransform%20attributeName='transform'%20attributeType='XML'%20calcMode='spline'%20dur='5s'%20keySplines='0.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8'%20keyTimes='0;%200.14;%200.29;%200.43;%200.57;%200.71;%200.86;%201'%20repeatCount='indefinite'%20type='rotate'%20values='0%2024%2024;%20154%2024%2024;%20309%2024%2024;%20463%2024%2024;%20617%2024%2024;%20771%2024%2024;%20926%2024%2024;%201080%2024%2024'/%3e%3c/path%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='4%204%2040%2040'%20width='40'%20height='40'%3e%3cpath%20fill='%23d0bcff'%3e%3canimate%20attributeName='d'%20calcMode='spline'%20dur='5s'%20keySplines='0.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8'%20keyTimes='0;%200.14;%200.29;%200.43;%200.57;%200.71;%200.86;%201'%20repeatCount='indefinite'%20values='m37.4%2024.7%200.5%200.7%200.8%200.9%200.8%201.0%200.6%201.0%20-0.1%200.8%20-0.0%200.1%20-0.6%200.7%20-1.1%200.5%20-1.3%200.3%20-1.0%200.2%20-0.9%200.4%20-0.7%201.1%200.1%201.0%200.1%201.1%200.0%201.2%20-0.2%201.1%20-0.4%200.5%20-0.3%200.2%20-0.8%200.2%20-1.2%20-0.4%20-1.2%20-0.4%20-1.0%20-0.5%20-0.8%20-0.1%20-1.3%200.5%20-0.5%200.8%20-0.6%200.9%20-0.6%201.0%20-0.8%200.8%20-0.8%200.2%20-0.1%20-0.0%20-0.9%20-0.3%20-0.8%20-1.0%20-0.6%20-1.0%20-0.6%20-0.9%20-0.5%20-0.7%20-1.3%20-0.3%20-0.9%200.2%20-0.9%200.4%20-1.2%200.5%20-1.2%200.3%20-0.8%20-0.3%20-0.0%20-0.1%20-0.6%20-0.6%20-0.1%20-1.2%200.1%20-1.2%200.0%20-1.1%200.0%20-0.9%20-0.7%20-1.1%20-0.9%20-0.3%20-1.1%20-0.3%20-1.2%20-0.3%20-1.1%20-0.4%20-0.5%20-0.8%20-0.0%200.0%20-0.1%20-0.9%200.6%20-1.0%200.8%20-0.9%200.8%20-0.9%200.5%20-0.7%20-0.0%20-1.4%20-0.5%20-0.7%20-0.8%20-0.9%20-0.8%20-0.9%20-0.6%20-1.0%200.1%20-0.9%200.0%20-0.0%200.5%20-0.8%201.1%20-0.4%201.2%20-0.3%201.1%20-0.3%200.9%20-0.3%200.7%20-1.1%200.0%20-0.9%20-0.0%20-1.1%20-0.1%20-1.2%200.1%20-1.2%200.6%20-0.6%200.0%20-0.1%200.8%20-0.3%201.2%200.3%201.2%200.5%200.9%200.4%200.9%200.2%201.3%20-0.3%200.5%20-0.7%200.6%20-0.9%200.6%20-1.0%200.8%20-1.0%200.9%20-0.3%200.1%200.0%200.8%200.2%200.8%200.8%200.6%201.0%200.6%200.9%200.5%200.8%201.3%200.5%200.8%20-0.1%201.0%20-0.5%201.2%20-0.4%201.2%20-0.4%200.8%200.2%200.3%200.2%200.4%200.5%200.2%201.1%20-0.0%201.2%20-0.1%201.1%20-0.1%201.0%200.7%201.1%200.9%200.4%201.0%200.2%201.3%200.3%201.1%200.5%200.6%200.7%200.0%200.1%200.1%200.8%20-0.5%201.0%20-0.9%201.0%20-0.8%200.9%20-0.5%200.7%20z;m39.9%2024.0%20-0.3%200.8%20-0.4%200.8%20-0.3%200.8%20-0.2%201.5%200.1%200.9%200.1%200.9%20-0.1%200.9%20-0.2%200.8%20-0.3%200.8%20-0.2%200.4%20-0.3%200.4%20-0.5%200.7%20-0.7%200.5%20-0.8%200.4%20-0.8%200.4%20-0.8%200.4%20-1.2%201.0%20-0.5%200.7%20-0.5%200.8%20-0.6%200.6%20-0.6%200.6%20-0.8%200.4%20-0.4%200.2%20-0.5%200.1%20-0.9%200.2%20-0.8%20-0.0%20-0.9%20-0.2%20-0.9%20-0.3%20-0.8%20-0.1%20-1.6%20-0.1%20-0.8%200.2%20-0.9%200.3%20-0.9%200.2%20-0.8%20-0.0%20-0.9%20-0.2%20-0.5%20-0.1%20-0.4%20-0.2%20-0.8%20-0.4%20-0.6%20-0.5%20-0.6%20-0.7%20-0.5%20-0.8%20-0.5%20-0.7%20-1.2%20-1.0%20-0.7%20-0.4%20-0.9%20-0.4%20-0.8%20-0.4%20-0.6%20-0.5%20-0.6%20-0.7%20-0.3%20-0.4%20-0.2%20-0.4%20-0.3%20-0.8%20-0.2%20-0.8%20-0.1%20-0.9%200.1%20-0.9%200.1%20-0.9%20-0.2%20-1.5%20-0.3%20-0.8%20-0.4%20-0.8%20-0.3%20-0.8%20-0.2%20-0.8%20-0.1%20-0.9%200.1%20-0.7%20-0.0%20-0.2%200.2%20-0.8%200.4%20-0.8%200.5%20-0.7%200.6%20-0.6%200.7%20-0.7%200.5%20-0.6%200.6%20-1.3%200.3%20-0.9%200.2%20-0.8%200.3%20-0.8%200.5%20-0.7%200.5%20-0.6%200.2%20-0.2%200.5%20-0.4%200.8%20-0.4%200.8%20-0.3%200.8%20-0.2%200.9%20-0.0%200.8%20-0.1%201.4%20-0.5%200.7%20-0.4%200.7%20-0.5%200.7%20-0.5%200.8%20-0.3%200.8%20-0.2%200.9%20-0.1%200.0%20-0.0%200.8%200.1%200.9%200.2%200.8%200.3%200.7%200.5%200.7%200.5%200.7%200.4%201.4%200.5%200.8%200.1%200.9%200.0%200.9%200.2%200.8%200.3%200.7%200.4%200.5%200.4%200.2%200.1%200.5%200.7%200.5%200.7%200.3%200.8%200.2%200.8%200.3%200.9%200.6%201.3%200.5%200.6%200.7%200.7%200.6%200.6%200.5%200.7%200.4%200.8%200.2%200.8%200.0%200.2%200.1%200.7%20-0.1%200.9%20z;m38.9%2024.2%20-0.2%200.8%20-0.2%200.7%20-0.3%200.8%20-0.2%200.8%20-0.3%200.7%20-0.2%200.8%20-0.3%200.8%20-0.2%200.7%20-0.3%200.8%20-0.2%200.8%20-0.3%200.7%20-0.2%200.8%20-0.4%201.0%20-0.4%200.8%20-0.4%200.8%20-0.6%200.6%20-0.7%200.5%200.0%200.1%20-0.7%200.4%20-0.8%200.3%20-0.8%200.3%20-0.9%200.1%20-1.1%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-0.8%20-0.0%20-1.1%20-0.0%20-0.9%20-0.1%20-0.8%20-0.3%20-0.8%20-0.3%20-0.7%20-0.5%20-0.1%200.0%20-0.6%20-0.5%20-0.6%20-0.7%20-0.4%20-0.7%20-0.4%20-0.8%20-0.4%20-1.0%20-0.2%20-0.8%20-0.3%20-0.7%20-0.2%20-0.8%20-0.3%20-0.8%20-0.2%20-0.7%20-0.3%20-0.8%20-0.2%20-0.8%20-0.3%20-0.7%20-0.2%20-0.8%20-0.3%20-0.7%20-0.2%20-0.8%20-0.3%20-0.8%20-0.2%20-0.7%20-0.3%20-1.1%20-0.2%20-0.9%20-0.0%20-0.8%200.0%20-0.9%200.2%20-0.8%200.1%20-0.1%200.3%20-0.7%200.4%20-0.8%200.6%20-0.6%200.6%20-0.6%200.9%20-0.7%200.6%20-0.5%200.7%20-0.4%200.6%20-0.5%200.7%20-0.5%200.6%20-0.4%200.7%20-0.5%200.6%20-0.5%200.7%20-0.5%200.6%20-0.4%200.7%20-0.5%200.6%20-0.5%200.7%20-0.4%200.6%20-0.5%200.9%20-0.7%200.8%20-0.4%200.8%20-0.3%200.8%20-0.2%200.8%20-0.0%200.1%20-0.0%200.9%200.0%200.8%200.2%200.8%200.3%200.8%200.4%200.9%200.7%200.6%200.5%200.7%200.4%200.6%200.5%200.7%200.5%200.6%200.4%200.7%200.5%200.6%200.5%200.7%200.5%200.6%200.4%200.7%200.5%200.6%200.5%200.7%200.4%200.6%200.5%200.9%200.7%200.6%200.6%200.6%200.7%200.4%200.7%200.3%200.7%200.0%200.1%200.2%200.8%200.1%200.9%20-0.0%200.9%20-0.2%200.8%20-0.3%201.1%20z;m39.6%2024.0%20-0.1%200.8%20-0.3%200.8%20-0.2%200.8%20-0.3%200.7%20-0.3%200.8%20-0.4%200.7%20-0.4%200.7%20-0.5%200.6%20-0.4%200.6%20-0.6%200.6%20-0.6%200.6%20-0.4%200.4%20-0.6%200.6%20-0.4%200.5%20-0.9%200.8%20-0.5%200.5%20-0.6%200.6%20-0.4%200.4%20-0.7%200.7%20-0.5%200.5%20-0.6%200.4%20-0.7%200.5%20-0.6%200.4%20-0.7%200.4%20-0.7%200.3%20-0.8%200.3%20-0.8%200.3%20-0.8%200.2%20-0.8%200.1%20-0.8%200.1%20-0.8%200.1%20-0.9%200.0%20-0.8%20-0.0%20-0.9%20-0.1%20-0.8%20-0.2%20-0.8%20-0.2%20-0.9%20-0.2%20-0.8%20-0.3%20-0.8%20-0.4%20-0.8%20-0.4%20-0.7%20-0.5%20-0.7%20-0.5%20-0.7%20-0.5%20-0.6%20-0.6%20-0.1%20-0.1%20-0.5%20-0.6%20-0.6%20-0.7%20-0.5%20-0.7%20-0.5%20-0.8%20-0.4%20-0.7%20-0.4%20-0.8%20-0.3%20-0.8%20-0.2%20-0.8%20-0.2%20-0.9%20-0.2%20-0.8%20-0.1%20-0.9%200.0%20-0.8%200.0%20-0.9%200.1%20-0.8%200.1%20-0.8%200.1%20-0.8%200.3%20-0.8%200.2%20-0.8%200.3%20-0.7%200.4%20-0.8%200.3%20-0.7%200.5%20-0.6%200.4%20-0.7%200.4%20-0.5%200.6%20-0.6%200.6%20-0.7%200.4%20-0.4%200.6%20-0.6%200.5%20-0.4%200.8%20-0.9%200.5%20-0.5%200.6%20-0.6%200.4%20-0.4%200.7%20-0.7%200.5%20-0.5%200.6%20-0.4%200.7%20-0.5%200.6%20-0.4%200.7%20-0.4%200.7%20-0.3%200.8%20-0.3%200.8%20-0.3%200.8%20-0.2%200.8%20-0.1%200.8%20-0.1%200.8%20-0.1%200.9%20-0.0%200.8%200.0%200.9%200.1%200.8%200.2%200.8%200.2%200.9%200.2%200.8%200.4%200.8%200.3%200.8%200.4%200.7%200.5%200.7%200.5%200.7%200.5%200.6%200.7%200.1%20-0.0%200.5%200.6%200.6%200.7%200.5%200.7%200.5%200.8%200.4%200.7%200.3%200.8%200.4%200.8%200.2%200.8%200.2%200.9%200.2%200.8%200.1%200.9%200.0%200.8%20-0.0%200.8%20-0.1%200.9%20z;m40.0%2024.0%20-0.1%200.8%20-0.5%200.8%20-0.6%200.8%20-0.6%200.6%20-0.6%200.7%20-0.5%200.6%20-0.7%201.2%20-0.1%200.7%20-0.1%200.8%20-0.0%200.9%20-0.1%200.9%20-0.1%200.9%20-0.2%200.9%20-0.5%200.7%20-0.0%200.0%20-0.7%200.5%20-0.9%200.2%20-0.9%200.1%20-0.9%200.1%20-0.8%200.0%20-0.8%200.1%20-0.8%200.1%20-1.2%200.7%20-0.6%200.5%20-0.7%200.6%20-0.6%200.6%20-0.8%200.6%20-0.8%200.5%20-0.8%200.1%20-0.0%200.0%20-0.8%20-0.1%20-0.8%20-0.5%20-0.8%20-0.6%20-0.6%20-0.6%20-0.7%20-0.6%20-0.6%20-0.5%20-1.2%20-0.7%20-0.7%20-0.1%20-0.8%20-0.1%20-0.9%20-0.0%20-0.9%20-0.1%20-0.9%20-0.1%20-0.9%20-0.2%20-0.7%20-0.5%20-0.0%200.0%20-0.5%20-0.7%20-0.2%20-0.9%20-0.1%20-0.9%20-0.1%20-0.9%20-0.0%20-0.8%20-0.1%20-0.8%20-0.1%20-0.8%20-0.7%20-1.2%20-0.5%20-0.6%20-0.6%20-0.7%20-0.6%20-0.6%20-0.6%20-0.8%20-0.5%20-0.8%20-0.1%20-0.8%20-0.0%20-0.0%200.1%20-0.8%200.5%20-0.8%200.6%20-0.8%200.6%20-0.6%200.6%20-0.7%200.5%20-0.6%200.7%20-1.2%200.1%20-0.7%200.1%20-0.8%200.0%20-0.9%200.1%20-0.9%200.1%20-0.9%200.2%20-0.9%200.5%20-0.7%20-0.0%20-0.0%200.7%20-0.5%200.9%20-0.2%200.9%20-0.1%200.9%20-0.1%200.8%20-0.0%200.8%20-0.1%200.8%20-0.1%201.2%20-0.7%200.6%20-0.5%200.7%20-0.6%200.6%20-0.6%200.8%20-0.6%200.8%20-0.5%200.8%20-0.1%200.0%20-0.0%200.8%200.1%200.8%200.5%200.8%200.6%200.6%200.6%200.7%200.6%200.6%200.5%201.2%200.7%200.7%200.1%200.8%200.1%200.9%200.0%200.9%200.1%200.9%200.1%200.9%200.2%200.7%200.5%200.0%20-0.0%200.5%200.7%200.2%200.9%200.1%200.9%200.1%200.9%200.0%200.8%200.1%200.8%200.1%200.8%200.7%201.2%200.5%200.6%200.6%200.7%200.6%200.6%200.6%200.8%200.5%200.8%200.1%200.8%20z;m36.9%2024.6%200.1%200.7%200.2%200.8%200.2%200.7%200.4%200.9%200.4%200.9%200.2%200.9%200.1%201.0%200.1%200.9%20-0.1%200.9%20-0.3%200.9%20-0.3%200.9%20-0.4%200.8%20-0.5%200.8%20-0.6%200.6%20-0.1%200.1%20-0.6%200.6%20-0.8%200.5%20-0.8%200.4%20-0.9%200.3%20-0.9%200.3%20-0.9%200.1%20-0.9%20-0.1%20-1.0%20-0.1%20-0.9%20-0.2%20-0.9%20-0.4%20-0.9%20-0.4%20-0.7%20-0.2%20-0.8%20-0.2%20-0.7%20-0.1%20-1.2%200.0%20-0.7%200.1%20-0.8%200.2%20-0.7%200.2%20-0.9%200.4%20-0.9%200.4%20-0.9%200.2%20-1.0%200.1%20-0.9%200.1%20-0.9%20-0.1%20-0.9%20-0.3%20-0.9%20-0.3%20-0.8%20-0.4%20-0.8%20-0.5%20-0.6%20-0.6%20-0.1%20-0.1%20-0.6%20-0.6%20-0.5%20-0.8%20-0.4%20-0.8%20-0.3%20-0.9%20-0.3%20-0.9%20-0.1%20-0.9%200.1%20-0.9%200.1%20-1.0%200.2%20-0.9%200.4%20-0.9%200.4%20-0.9%200.2%20-0.7%200.2%20-0.8%200.1%20-0.7%20-0.0%20-1.2%20-0.1%20-0.7%20-0.2%20-0.8%20-0.2%20-0.7%20-0.4%20-0.9%20-0.4%20-0.9%20-0.2%20-0.9%20-0.1%20-1.0%20-0.1%20-0.9%200.1%20-0.9%200.3%20-0.9%200.3%20-0.9%200.4%20-0.8%200.5%20-0.8%200.6%20-0.6%200.1%20-0.1%200.6%20-0.6%200.8%20-0.5%200.8%20-0.4%200.9%20-0.3%200.9%20-0.3%200.9%20-0.1%200.9%200.1%201.0%200.1%200.9%200.2%200.9%200.4%200.9%200.4%200.7%200.2%200.8%200.2%200.7%200.1%201.2%20-0.0%200.7%20-0.1%200.8%20-0.2%200.7%20-0.2%200.9%20-0.4%200.9%20-0.4%200.9%20-0.2%201.0%20-0.1%200.9%20-0.1%200.9%200.1%200.9%200.3%200.9%200.3%200.8%200.4%200.8%200.5%200.6%200.6%200.1%200.1%200.6%200.6%200.5%200.8%200.4%200.8%200.3%200.9%200.3%200.9%200.1%200.9%20-0.1%200.9%20-0.1%201.0%20-0.2%200.9%20-0.4%200.9%20-0.4%200.9%20-0.2%200.7%20-0.2%200.8%20-0.1%200.7%20z;m37.7%2024.0%20-0.3%200.7%20-0.4%200.7%20-0.3%200.6%20-0.3%200.7%20-0.4%200.6%20-0.3%200.5%20-0.4%200.6%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.3%200.4%20-0.5%200.4%20-0.8%200.8%20-0.4%200.5%20-0.4%200.3%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.6%200.4%20-0.5%200.3%20-0.6%200.4%20-0.7%200.3%20-0.6%200.3%20-0.7%200.4%20-0.7%200.3%20-0.7%200.2%20-0.7%200.3%20-0.9%200.3%20-0.8%200.2%20-0.8%200.1%20-0.9%200.1%20-1.0%200.1%20-0.9%20-0.0%20-0.9%20-0.1%20-0.9%20-0.1%20-0.9%20-0.3%20-0.9%20-0.3%20-0.8%20-0.4%20-0.8%20-0.6%20-0.7%20-0.6%20-0.0%200.0%20-0.6%20-0.7%20-0.6%20-0.8%20-0.4%20-0.8%20-0.3%20-0.9%20-0.3%20-0.9%20-0.1%20-0.9%20-0.1%20-0.9%200.0%20-0.9%200.1%20-1.0%200.1%20-0.9%200.1%20-0.8%200.2%20-0.8%200.3%20-0.9%200.3%20-0.7%200.2%20-0.7%200.3%20-0.7%200.4%20-0.7%200.3%20-0.6%200.3%20-0.7%200.4%20-0.6%200.3%20-0.5%200.4%20-0.6%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.4%20-0.5%200.3%20-0.4%200.5%20-0.4%200.8%20-0.8%200.4%20-0.5%200.4%20-0.3%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.5%20-0.4%200.6%20-0.4%200.5%20-0.3%200.6%20-0.4%200.7%20-0.3%200.6%20-0.3%200.7%20-0.4%200.7%20-0.3%200.7%20-0.2%200.7%20-0.3%200.9%20-0.3%200.8%20-0.2%200.8%20-0.1%200.9%20-0.1%201.0%20-0.1%200.9%200.0%200.9%200.1%200.9%200.1%200.9%200.3%200.9%200.3%200.8%200.4%200.8%200.6%200.7%200.6%20-0.0%200.0%200.6%200.7%200.6%200.8%200.4%200.8%200.3%200.9%200.3%200.9%200.1%200.9%200.1%200.9%20-0.0%200.9%20-0.1%201.0%20-0.1%200.9%20-0.1%200.8%20-0.2%200.8%20-0.3%200.9%20-0.3%200.7%20z;m37.4%2024.7%200.5%200.7%200.8%200.9%200.8%201.0%200.6%201.0%20-0.1%200.8%20-0.0%200.1%20-0.6%200.7%20-1.1%200.5%20-1.3%200.3%20-1.0%200.2%20-0.9%200.4%20-0.7%201.1%200.1%201.0%200.1%201.1%200.0%201.2%20-0.2%201.1%20-0.4%200.5%20-0.3%200.2%20-0.8%200.2%20-1.2%20-0.4%20-1.2%20-0.4%20-1.0%20-0.5%20-0.8%20-0.1%20-1.3%200.5%20-0.5%200.8%20-0.6%200.9%20-0.6%201.0%20-0.8%200.8%20-0.8%200.2%20-0.1%20-0.0%20-0.9%20-0.3%20-0.8%20-1.0%20-0.6%20-1.0%20-0.6%20-0.9%20-0.5%20-0.7%20-1.3%20-0.3%20-0.9%200.2%20-0.9%200.4%20-1.2%200.5%20-1.2%200.3%20-0.8%20-0.3%20-0.0%20-0.1%20-0.6%20-0.6%20-0.1%20-1.2%200.1%20-1.2%200.0%20-1.1%200.0%20-0.9%20-0.7%20-1.1%20-0.9%20-0.3%20-1.1%20-0.3%20-1.2%20-0.3%20-1.1%20-0.4%20-0.5%20-0.8%20-0.0%200.0%20-0.1%20-0.9%200.6%20-1.0%200.8%20-0.9%200.8%20-0.9%200.5%20-0.7%20-0.0%20-1.4%20-0.5%20-0.7%20-0.8%20-0.9%20-0.8%20-0.9%20-0.6%20-1.0%200.1%20-0.9%200.0%20-0.0%200.5%20-0.8%201.1%20-0.4%201.2%20-0.3%201.1%20-0.3%200.9%20-0.3%200.7%20-1.1%200.0%20-0.9%20-0.0%20-1.1%20-0.1%20-1.2%200.1%20-1.2%200.6%20-0.6%200.0%20-0.1%200.8%20-0.3%201.2%200.3%201.2%200.5%200.9%200.4%200.9%200.2%201.3%20-0.3%200.5%20-0.7%200.6%20-0.9%200.6%20-1.0%200.8%20-1.0%200.9%20-0.3%200.1%200.0%200.8%200.2%200.8%200.8%200.6%201.0%200.6%200.9%200.5%200.8%201.3%200.5%200.8%20-0.1%201.0%20-0.5%201.2%20-0.4%201.2%20-0.4%200.8%200.2%200.3%200.2%200.4%200.5%200.2%201.1%20-0.0%201.2%20-0.1%201.1%20-0.1%201.0%200.7%201.1%200.9%200.4%201.0%200.2%201.3%200.3%201.1%200.5%200.6%200.7%200.0%200.1%200.1%200.8%20-0.5%201.0%20-0.9%201.0%20-0.8%200.9%20-0.5%200.7%20z'/%3e%3canimateTransform%20attributeName='transform'%20attributeType='XML'%20calcMode='spline'%20dur='5s'%20keySplines='0.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8;%200.5%200.2%200%200.8'%20keyTimes='0;%200.14;%200.29;%200.43;%200.57;%200.71;%200.86;%201'%20repeatCount='indefinite'%20type='rotate'%20values='0%2024%2024;%20154%2024%2024;%20309%2024%2024;%20463%2024%2024;%20617%2024%2024;%20771%2024%2024;%20926%2024%2024;%201080%2024%2024'/%3e%3c/path%3e%3c/svg%3e\")}.shape.oval{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='300'%20height='300'%20fill='none'%20viewBox='0%200%20300%20300'%3e%3cpath%20fill='%23d0bcff'%20d='M231.309%20231.31c-69.604%2069.6-162.432%2089.63-207.338%2044.72S-.913%20138.29%2068.69%2068.69s162.432-89.63%20207.338-44.72%2024.884%20137.74-44.72%20207.34'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='300'%20height='300'%20fill='none'%20viewBox='0%200%20300%20300'%3e%3cpath%20fill='%23d0bcff'%20d='M231.309%20231.31c-69.604%2069.6-162.432%2089.63-207.338%2044.72S-.913%20138.29%2068.69%2068.69s162.432-89.63%20207.338-44.72%2024.884%20137.74-44.72%20207.34'/%3e%3c/svg%3e\")}.shape.pentagon{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M109.63%2024.37c15.61-12.08%2023.41-18.12%2031.75-21.12a55%2055%200%200%201%2037.24%200c8.34%203%2016.14%209.04%2031.75%2021.12l34.14%2026.43%2034.12%2024.76c16.19%2011.75%2024.29%2017.63%2029.7%2025.01%207.82%2010.69%2011.94%2023.82%2011.66%2037.25-.2%209.29-3.41%2019-9.85%2038.41l-13.4%2040.43-12.36%2041.42c-5.81%2019.44-8.71%2029.16-13.78%2036.72-7.34%2010.94-18.01%2018.98-30.28%2022.83-8.48%202.67-18.26%202.51-37.82%202.2l-42.5-.67-42.5.67c-19.56.31-29.34.47-37.82-2.2-12.27-3.85-22.94-11.89-30.28-22.83-5.07-7.56-7.97-17.28-13.78-36.72l-12.36-41.42-13.4-40.43C3.42%20156.82.21%20147.11.01%20137.82c-.28-13.43%203.84-26.56%2011.66-37.25%205.41-7.38%2013.51-13.26%2029.7-25.01L75.49%2050.8z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M109.63%2024.37c15.61-12.08%2023.41-18.12%2031.75-21.12a55%2055%200%200%201%2037.24%200c8.34%203%2016.14%209.04%2031.75%2021.12l34.14%2026.43%2034.12%2024.76c16.19%2011.75%2024.29%2017.63%2029.7%2025.01%207.82%2010.69%2011.94%2023.82%2011.66%2037.25-.2%209.29-3.41%2019-9.85%2038.41l-13.4%2040.43-12.36%2041.42c-5.81%2019.44-8.71%2029.16-13.78%2036.72-7.34%2010.94-18.01%2018.98-30.28%2022.83-8.48%202.67-18.26%202.51-37.82%202.2l-42.5-.67-42.5.67c-19.56.31-29.34.47-37.82-2.2-12.27-3.85-22.94-11.89-30.28-22.83-5.07-7.56-7.97-17.28-13.78-36.72l-12.36-41.42-13.4-40.43C3.42%20156.82.21%20147.11.01%20137.82c-.28-13.43%203.84-26.56%2011.66-37.25%205.41-7.38%2013.51-13.26%2029.7-25.01L75.49%2050.8z'/%3e%3c/svg%3e\")}.shape.pill{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='300'%20height='300'%20fill='none'%20viewBox='0%200%20300%20300'%3e%3cpath%20fill='%23d0bcff'%20d='M79.86%2037.77c50.36-50.36%20132.01-50.36%20182.37%200s50.36%20132.01%200%20182.37l-42.09%2042.09c-50.36%2050.36-132.01%2050.36-182.37%200s-50.36-132.01%200-182.37z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='300'%20height='300'%20fill='none'%20viewBox='0%200%20300%20300'%3e%3cpath%20fill='%23d0bcff'%20d='M79.86%2037.77c50.36-50.36%20132.01-50.36%20182.37%200s50.36%20132.01%200%20182.37l-42.09%2042.09c-50.36%2050.36-132.01%2050.36-182.37%200s-50.36-132.01%200-182.37z'/%3e%3c/svg%3e\")}.shape.pixel-circle{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M225.19%200H94.81v20.74H50.37v26.67H23.704v47.4H0v130.38h23.704v47.4H50.37v26.67h44.44V320h130.38v-20.74h44.44v-26.67h26.67v-47.4H320V94.81h-23.7v-47.4h-26.67V20.74h-44.44z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M225.19%200H94.81v20.74H50.37v26.67H23.704v47.4H0v130.38h23.704v47.4H50.37v26.67h44.44V320h130.38v-20.74h44.44v-26.67h26.67v-47.4H320V94.81h-23.7v-47.4h-26.67V20.74h-44.44z'/%3e%3c/svg%3e\")}.shape.pixel-triangle{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='248'%20height='320'%20fill='none'%20viewBox='0%200%20248%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M55.64%200H0v320h55.64v-27.826h42.92v-26.435h44.52V235.13h36.56v-25.044h36.57v-30.608H248v-38.956h-31.79v-30.61h-36.57V84.869h-36.56V54.261H98.56V27.826H55.64z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='248'%20height='320'%20fill='none'%20viewBox='0%200%20248%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M55.64%200H0v320h55.64v-27.826h42.92v-26.435h44.52V235.13h36.56v-25.044h36.57v-30.608H248v-38.956h-31.79v-30.61h-36.57V84.869h-36.56V54.261H98.56V27.826H55.64z'/%3e%3c/svg%3e\")}.shape.puffy{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='280'%20fill='none'%20viewBox='0%200%20320%20280'%3e%3cpath%20fill='%23d0bcff'%20d='M319.98%20138.106c-.26-21.532-16.25-38.773-35.74-38.485-1.07%200-2.13.09-3.18.217.82-.74%201.62-1.497%202.38-2.327%2013.96-15.022%2014.25-39.729.67-55.167-.8-.901-1.59-1.803-2.41-2.669-13.96-15.022-36.28-14.698-49.88.74-.75.847-1.43%201.731-2.1%202.633.11-1.154.18-2.327.2-3.517C230.19%2017.998%20214.61.307%20195.14%200h-2.87C177.84%200%20165.46%209.594%20160%2023.318%20154.54%209.594%20142.15%200%20127.73%200h-2.87c-19.47.289-35.05%2017.98-34.79%2039.531%200%201.19.08%202.363.19%203.517a36%2036%200%200%200-2.1-2.633c-13.58-15.438-35.92-15.762-49.88-.74-.81.884-1.63%201.768-2.41%202.669-13.58%2015.438-13.29%2040.127.67%2055.167.77.83%201.56%201.587%202.38%202.327a30%2030%200%200%200-3.18-.217C16.27%2099.333.28%20116.574%200%20138.106v3.788c.26%2021.533%2016.26%2038.773%2035.74%2038.485%201.08%200%202.14-.09%203.18-.217-.82.74-1.61%201.497-2.38%202.327-13.96%2015.022-14.25%2039.729-.67%2055.167.8.901%201.6%201.803%202.41%202.669%2013.96%2015.022%2036.28%2014.698%2049.88-.74.75-.847%201.44-1.731%202.1-2.633a41%2041%200%200%200-.19%203.517c-.26%2021.533%2015.31%2039.242%2034.79%2039.531h2.87c14.43%200%2026.81-9.594%2032.27-23.318C165.46%20270.406%20177.85%20280%20192.27%20280h2.87c19.47-.289%2035.05-17.98%2034.79-39.531%200-1.19-.08-2.363-.19-3.517.66.902%201.35%201.786%202.1%202.633%2013.58%2015.438%2035.92%2015.762%2049.88.74.81-.884%201.63-1.768%202.41-2.669%2013.58-15.438%2013.29-40.127-.67-55.167-.77-.83-1.56-1.587-2.38-2.327a30%2030%200%200%200%203.18.217c19.47.288%2035.48-16.934%2035.74-38.485v-3.788z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='280'%20fill='none'%20viewBox='0%200%20320%20280'%3e%3cpath%20fill='%23d0bcff'%20d='M319.98%20138.106c-.26-21.532-16.25-38.773-35.74-38.485-1.07%200-2.13.09-3.18.217.82-.74%201.62-1.497%202.38-2.327%2013.96-15.022%2014.25-39.729.67-55.167-.8-.901-1.59-1.803-2.41-2.669-13.96-15.022-36.28-14.698-49.88.74-.75.847-1.43%201.731-2.1%202.633.11-1.154.18-2.327.2-3.517C230.19%2017.998%20214.61.307%20195.14%200h-2.87C177.84%200%20165.46%209.594%20160%2023.318%20154.54%209.594%20142.15%200%20127.73%200h-2.87c-19.47.289-35.05%2017.98-34.79%2039.531%200%201.19.08%202.363.19%203.517a36%2036%200%200%200-2.1-2.633c-13.58-15.438-35.92-15.762-49.88-.74-.81.884-1.63%201.768-2.41%202.669-13.58%2015.438-13.29%2040.127.67%2055.167.77.83%201.56%201.587%202.38%202.327a30%2030%200%200%200-3.18-.217C16.27%2099.333.28%20116.574%200%20138.106v3.788c.26%2021.533%2016.26%2038.773%2035.74%2038.485%201.08%200%202.14-.09%203.18-.217-.82.74-1.61%201.497-2.38%202.327-13.96%2015.022-14.25%2039.729-.67%2055.167.8.901%201.6%201.803%202.41%202.669%2013.96%2015.022%2036.28%2014.698%2049.88-.74.75-.847%201.44-1.731%202.1-2.633a41%2041%200%200%200-.19%203.517c-.26%2021.533%2015.31%2039.242%2034.79%2039.531h2.87c14.43%200%2026.81-9.594%2032.27-23.318C165.46%20270.406%20177.85%20280%20192.27%20280h2.87c19.47-.289%2035.05-17.98%2034.79-39.531%200-1.19-.08-2.363-.19-3.517.66.902%201.35%201.786%202.1%202.633%2013.58%2015.438%2035.92%2015.762%2049.88.74.81-.884%201.63-1.768%202.41-2.669%2013.58-15.438%2013.29-40.127-.67-55.167-.77-.83-1.56-1.587-2.38-2.327a30%2030%200%200%200%203.18.217c19.47.288%2035.48-16.934%2035.74-38.485v-3.788z'/%3e%3c/svg%3e\")}.shape.puffy-diamond{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M249.4%20249.754c12.08-12.088%2016.17-29.146%2012.26-44.597%2015.46%203.929%2032.54-.156%2044.64-12.255%2018.27-18.266%2018.27-47.882%200-66.148-12.03-12.027-28.98-16.135-44.36-12.324%203.43-15.144-.75-31.664-12.54-43.455-12.12-12.115-29.23-16.195-44.7-12.239%204.1-15.565.05-32.833-12.16-45.036-18.26-18.267-47.88-18.267-66.14%200-12.13%2012.13-16.21%2029.265-12.23%2044.758-15.17-3.472-31.74.7-43.55%2012.517-11.79%2011.792-15.97%2028.314-12.54%2043.459-15.39-3.818-32.35.289-44.38%2012.32-18.27%2018.266-18.27%2047.882%200%2066.148%2012.1%2012.103%2029.19%2016.187%2044.65%2012.251-3.91%2015.452.18%2032.512%2012.27%2044.601%2011.76%2011.767%2028.24%2015.954%2043.36%2012.56-3.65%2015.288.49%2032.057%2012.42%2043.986%2018.26%2018.267%2047.88%2018.267%2066.14%200%2012-11.999%2016.12-28.897%2012.35-44.257%2015.43%203.871%2032.44-.226%2044.51-12.289'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M249.4%20249.754c12.08-12.088%2016.17-29.146%2012.26-44.597%2015.46%203.929%2032.54-.156%2044.64-12.255%2018.27-18.266%2018.27-47.882%200-66.148-12.03-12.027-28.98-16.135-44.36-12.324%203.43-15.144-.75-31.664-12.54-43.455-12.12-12.115-29.23-16.195-44.7-12.239%204.1-15.565.05-32.833-12.16-45.036-18.26-18.267-47.88-18.267-66.14%200-12.13%2012.13-16.21%2029.265-12.23%2044.758-15.17-3.472-31.74.7-43.55%2012.517-11.79%2011.792-15.97%2028.314-12.54%2043.459-15.39-3.818-32.35.289-44.38%2012.32-18.27%2018.266-18.27%2047.882%200%2066.148%2012.1%2012.103%2029.19%2016.187%2044.65%2012.251-3.91%2015.452.18%2032.512%2012.27%2044.601%2011.76%2011.767%2028.24%2015.954%2043.36%2012.56-3.65%2015.288.49%2032.057%2012.42%2043.986%2018.26%2018.267%2047.88%2018.267%2066.14%200%2012-11.999%2016.12-28.897%2012.35-44.257%2015.43%203.871%2032.44-.226%2044.51-12.289'/%3e%3c/svg%3e\")}.shape.semicircle{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='200'%20fill='none'%20viewBox='0%200%20320%20200'%3e%3cpath%20fill='%23d0bcff'%20d='M320%20166.92c0%2018.27-14.81%2033.08-33.079%2033.08H33.079C14.81%20200%200%20185.19%200%20166.92V160C0%2071.63%2071.634%200%20160%200s160%2071.63%20160%20160z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='200'%20fill='none'%20viewBox='0%200%20320%20200'%3e%3cpath%20fill='%23d0bcff'%20d='M320%20166.92c0%2018.27-14.81%2033.08-33.079%2033.08H33.079C14.81%20200%200%20185.19%200%20166.92V160C0%2071.63%2071.634%200%20160%200s160%2071.63%20160%20160z'/%3e%3c/svg%3e\")}.shape.sided-cookie4{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='280'%20height='280'%20fill='none'%20viewBox='0%200%20280%20280'%3e%3cpath%20fill='%23d0bcff'%20d='M178.73%206.21c60.14-26.12%20121.18%2034.92%2095.06%2095.06l-4.32%209.94a72.32%2072.32%200%200%200%200%2057.58l4.32%209.94c26.12%2060.14-34.92%20121.18-95.06%2095.06l-9.94-4.32a72.32%2072.32%200%200%200-57.58%200l-9.94%204.32c-60.142%2026.12-121.184-34.92-95.063-95.06l4.319-9.94a72.28%2072.28%200%200%200%200-57.58l-4.32-9.94C-19.913%2041.13%2041.129-19.91%20101.27%206.21l9.94%204.32a72.32%2072.32%200%200%200%2057.58%200z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='280'%20height='280'%20fill='none'%20viewBox='0%200%20280%20280'%3e%3cpath%20fill='%23d0bcff'%20d='M178.73%206.21c60.14-26.12%20121.18%2034.92%2095.06%2095.06l-4.32%209.94a72.32%2072.32%200%200%200%200%2057.58l4.32%209.94c26.12%2060.14-34.92%20121.18-95.06%2095.06l-9.94-4.32a72.32%2072.32%200%200%200-57.58%200l-9.94%204.32c-60.142%2026.12-121.184-34.92-95.063-95.06l4.319-9.94a72.28%2072.28%200%200%200%200-57.58l-4.32-9.94C-19.913%2041.13%2041.129-19.91%20101.27%206.21l9.94%204.32a72.32%2072.32%200%200%200%2057.58%200z'/%3e%3c/svg%3e\")}.shape.sided-cookie6{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='296'%20height='316'%20fill='none'%20viewBox='0%200%20296%20316'%3e%3cpath%20fill='%23d0bcff'%20d='M92.186%2022.57c31.09-30.09%2080.538-30.09%20111.628%200a80.24%2080.24%200%200%200%2033.924%2019.52c41.681%2011.8%2066.404%2054.5%2055.814%2096.38a79.7%2079.7%200%200%200%200%2039.06c10.59%2041.88-14.133%2084.58-55.814%2096.38a80.24%2080.24%200%200%200-33.924%2019.52c-31.09%2030.09-80.538%2030.09-111.628%200a80.24%2080.24%200%200%200-33.924-19.52c-41.681-11.8-66.404-54.5-55.814-96.38a79.7%2079.7%200%200%200%200-39.06C-8.142%2096.59%2016.58%2053.89%2058.262%2042.09a80.24%2080.24%200%200%200%2033.924-19.52'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='296'%20height='316'%20fill='none'%20viewBox='0%200%20296%20316'%3e%3cpath%20fill='%23d0bcff'%20d='M92.186%2022.57c31.09-30.09%2080.538-30.09%20111.628%200a80.24%2080.24%200%200%200%2033.924%2019.52c41.681%2011.8%2066.404%2054.5%2055.814%2096.38a79.7%2079.7%200%200%200%200%2039.06c10.59%2041.88-14.133%2084.58-55.814%2096.38a80.24%2080.24%200%200%200-33.924%2019.52c-31.09%2030.09-80.538%2030.09-111.628%200a80.24%2080.24%200%200%200-33.924-19.52c-41.681-11.8-66.404-54.5-55.814-96.38a79.7%2079.7%200%200%200%200-39.06C-8.142%2096.59%2016.58%2053.89%2058.262%2042.09a80.24%2080.24%200%200%200%2033.924-19.52'/%3e%3c/svg%3e\")}.shape.sided-cookie7{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='316'%20fill='none'%20viewBox='0%200%20320%20316'%3e%3cpath%20fill='%23d0bcff'%20d='M112.67%2019.78c3.573-3.14%205.359-4.71%207.001-5.98%2023.754-18.4%2056.904-18.4%2080.658%200%201.642%201.27%203.428%202.84%207.001%205.98%201.196%201.06%201.794%201.58%202.394%202.09a66%2066%200%200%200%2029.196%2014.09c.768.16%201.551.3%203.118.58%204.681.84%207.021%201.25%209.037%201.75%2029.159%207.14%2049.827%2033.12%2050.289%2063.2.032%202.08-.081%204.46-.307%209.22-.075%201.6-.113%202.39-.132%203.18a66.24%2066.24%200%200%200%207.211%2031.66c.357.7.736%201.4%201.494%202.81%202.264%204.19%203.396%206.28%204.267%208.17%2012.606%2027.3%205.23%2059.7-17.948%2078.81-1.602%201.33-3.529%202.72-7.383%205.51-1.29.94-1.936%201.4-2.559%201.88a66.1%2066.1%200%200%200-20.204%2025.39c-.323.72-.634%201.45-1.256%202.92-1.857%204.39-2.786%206.58-3.715%208.44-13.439%2026.9-43.306%2041.32-72.67%2035.08-2.03-.44-4.32-1.08-8.9-2.36-1.534-.42-2.3-.64-3.059-.83a65.84%2065.84%200%200%200-32.406%200c-.759.19-1.525.41-3.059.83-4.58%201.28-6.87%201.92-8.9%202.36-29.364%206.24-59.23-8.18-72.67-35.08-.93-1.86-1.858-4.05-3.715-8.44-.622-1.47-.933-2.2-1.256-2.92a66.14%2066.14%200%200%200-20.204-25.39c-.623-.48-1.269-.94-2.559-1.88-3.854-2.79-5.78-4.18-7.383-5.51C.873%20216.23-6.503%20183.83%206.103%20156.53c.871-1.89%202.003-3.98%204.267-8.17.758-1.41%201.137-2.11%201.494-2.81a66.2%2066.2%200%200%200%207.21-31.66c-.018-.79-.056-1.58-.131-3.18-.226-4.76-.34-7.14-.307-9.22.462-30.08%2021.13-56.06%2050.29-63.2%202.015-.5%204.355-.91%209.036-1.75%201.567-.28%202.35-.42%203.117-.58a66%2066%200%200%200%2029.197-14.09c.6-.51%201.198-1.03%202.394-2.09'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='316'%20fill='none'%20viewBox='0%200%20320%20316'%3e%3cpath%20fill='%23d0bcff'%20d='M112.67%2019.78c3.573-3.14%205.359-4.71%207.001-5.98%2023.754-18.4%2056.904-18.4%2080.658%200%201.642%201.27%203.428%202.84%207.001%205.98%201.196%201.06%201.794%201.58%202.394%202.09a66%2066%200%200%200%2029.196%2014.09c.768.16%201.551.3%203.118.58%204.681.84%207.021%201.25%209.037%201.75%2029.159%207.14%2049.827%2033.12%2050.289%2063.2.032%202.08-.081%204.46-.307%209.22-.075%201.6-.113%202.39-.132%203.18a66.24%2066.24%200%200%200%207.211%2031.66c.357.7.736%201.4%201.494%202.81%202.264%204.19%203.396%206.28%204.267%208.17%2012.606%2027.3%205.23%2059.7-17.948%2078.81-1.602%201.33-3.529%202.72-7.383%205.51-1.29.94-1.936%201.4-2.559%201.88a66.1%2066.1%200%200%200-20.204%2025.39c-.323.72-.634%201.45-1.256%202.92-1.857%204.39-2.786%206.58-3.715%208.44-13.439%2026.9-43.306%2041.32-72.67%2035.08-2.03-.44-4.32-1.08-8.9-2.36-1.534-.42-2.3-.64-3.059-.83a65.84%2065.84%200%200%200-32.406%200c-.759.19-1.525.41-3.059.83-4.58%201.28-6.87%201.92-8.9%202.36-29.364%206.24-59.23-8.18-72.67-35.08-.93-1.86-1.858-4.05-3.715-8.44-.622-1.47-.933-2.2-1.256-2.92a66.14%2066.14%200%200%200-20.204-25.39c-.623-.48-1.269-.94-2.559-1.88-3.854-2.79-5.78-4.18-7.383-5.51C.873%20216.23-6.503%20183.83%206.103%20156.53c.871-1.89%202.003-3.98%204.267-8.17.758-1.41%201.137-2.11%201.494-2.81a66.2%2066.2%200%200%200%207.21-31.66c-.018-.79-.056-1.58-.131-3.18-.226-4.76-.34-7.14-.307-9.22.462-30.08%2021.13-56.06%2050.29-63.2%202.015-.5%204.355-.91%209.036-1.75%201.567-.28%202.35-.42%203.117-.58a66%2066%200%200%200%2029.197-14.09c.6-.51%201.198-1.03%202.394-2.09'/%3e%3c/svg%3e\")}.shape.sided-cookie9{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M125.26%2013.38c1.73-1.43%202.59-2.14%203.38-2.74a51.525%2051.525%200%200%201%2062.72%200c.79.6%201.65%201.31%203.38%202.74.77.63%201.15.95%201.53%201.26a51.7%2051.7%200%200%200%2030.55%2011.23c.48.01.98.02%201.97.03%202.23.03%203.35.04%204.33.09%2023.24%201.19%2042.86%2017.83%2048.05%2040.74.22.97.43%202.08.85%204.29.18.99.27%201.48.37%201.96%202.27%2011%207.97%2020.96%2016.25%2028.44.37.33.74.66%201.5%201.31%201.69%201.47%202.53%202.21%203.25%202.89%2017.05%2015.99%2021.5%2041.49%2010.9%2062.41-.45.89-1%201.87-2.09%203.83-.49.88-.73%201.32-.96%201.75a53%2053%200%200%200-5.64%2032.34c.07.49.15.98.31%201.97.36%202.23.54%203.34.66%204.33%202.88%2023.32-9.93%2045.74-31.36%2054.88-.91.39-1.96.79-4.04%201.59-.93.35-1.4.53-1.85.71-10.32%204.17-19.04%2011.57-24.9%2021.11-.25.42-.5.85-1.01%201.71-1.14%201.94-1.71%202.91-2.25%203.75-12.63%2019.73-36.7%2028.59-58.94%2021.67-.94-.29-2-.66-4.1-1.41-.94-.33-1.41-.5-1.87-.65a51.47%2051.47%200%200%200-32.5%200c-.46.15-.93.32-1.87.65-2.1.75-3.16%201.12-4.1%201.41-22.24%206.92-46.31-1.94-58.94-21.67-.54-.84-1.11-1.81-2.25-3.75-.51-.86-.76-1.29-1.01-1.71C69.72%20281%2061%20273.6%2050.68%20269.43c-.45-.18-.92-.36-1.85-.71-2.08-.8-3.13-1.2-4.04-1.59-21.43-9.14-34.24-31.56-31.36-54.88.12-.99.3-2.1.66-4.33.16-.99.24-1.48.31-1.97a53%2053%200%200%200-5.64-32.34c-.23-.43-.47-.87-.96-1.75-1.09-1.96-1.64-2.94-2.09-3.83-10.6-20.92-6.15-46.42%2010.9-62.41.72-.68%201.56-1.42%203.25-2.89.76-.65%201.13-.98%201.5-1.31a52.66%2052.66%200%200%200%2016.25-28.44c.1-.48.19-.97.37-1.96.42-2.21.63-3.32.85-4.29%205.19-22.91%2024.81-39.55%2048.05-40.74.98-.05%202.1-.06%204.33-.09.99-.01%201.49-.02%201.97-.03a51.7%2051.7%200%200%200%2030.55-11.23c.38-.31.76-.63%201.53-1.26'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M125.26%2013.38c1.73-1.43%202.59-2.14%203.38-2.74a51.525%2051.525%200%200%201%2062.72%200c.79.6%201.65%201.31%203.38%202.74.77.63%201.15.95%201.53%201.26a51.7%2051.7%200%200%200%2030.55%2011.23c.48.01.98.02%201.97.03%202.23.03%203.35.04%204.33.09%2023.24%201.19%2042.86%2017.83%2048.05%2040.74.22.97.43%202.08.85%204.29.18.99.27%201.48.37%201.96%202.27%2011%207.97%2020.96%2016.25%2028.44.37.33.74.66%201.5%201.31%201.69%201.47%202.53%202.21%203.25%202.89%2017.05%2015.99%2021.5%2041.49%2010.9%2062.41-.45.89-1%201.87-2.09%203.83-.49.88-.73%201.32-.96%201.75a53%2053%200%200%200-5.64%2032.34c.07.49.15.98.31%201.97.36%202.23.54%203.34.66%204.33%202.88%2023.32-9.93%2045.74-31.36%2054.88-.91.39-1.96.79-4.04%201.59-.93.35-1.4.53-1.85.71-10.32%204.17-19.04%2011.57-24.9%2021.11-.25.42-.5.85-1.01%201.71-1.14%201.94-1.71%202.91-2.25%203.75-12.63%2019.73-36.7%2028.59-58.94%2021.67-.94-.29-2-.66-4.1-1.41-.94-.33-1.41-.5-1.87-.65a51.47%2051.47%200%200%200-32.5%200c-.46.15-.93.32-1.87.65-2.1.75-3.16%201.12-4.1%201.41-22.24%206.92-46.31-1.94-58.94-21.67-.54-.84-1.11-1.81-2.25-3.75-.51-.86-.76-1.29-1.01-1.71C69.72%20281%2061%20273.6%2050.68%20269.43c-.45-.18-.92-.36-1.85-.71-2.08-.8-3.13-1.2-4.04-1.59-21.43-9.14-34.24-31.56-31.36-54.88.12-.99.3-2.1.66-4.33.16-.99.24-1.48.31-1.97a53%2053%200%200%200-5.64-32.34c-.23-.43-.47-.87-.96-1.75-1.09-1.96-1.64-2.94-2.09-3.83-10.6-20.92-6.15-46.42%2010.9-62.41.72-.68%201.56-1.42%203.25-2.89.76-.65%201.13-.98%201.5-1.31a52.66%2052.66%200%200%200%2016.25-28.44c.1-.48.19-.97.37-1.96.42-2.21.63-3.32.85-4.29%205.19-22.91%2024.81-39.55%2048.05-40.74.98-.05%202.1-.06%204.33-.09.99-.01%201.49-.02%201.97-.03a51.7%2051.7%200%200%200%2030.55-11.23c.38-.31.76-.63%201.53-1.26'/%3e%3c/svg%3e\")}.shape.sided-cookie12{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M136.7%209.85c.54-.53.81-.8%201.04-1.02%2012.51-11.77%2032.01-11.77%2044.52%200%20.23.22.5.49%201.04%201.02.33.31.49.47.64.62a32.48%2032.48%200%200%200%2030.09%208.06c.21-.05.43-.11.87-.22.73-.19%201.1-.28%201.41-.36%2016.71-3.94%2033.61%205.81%2038.55%2022.26.09.31.19.67.4%201.4.12.44.18.66.24.87a32.47%2032.47%200%200%200%2022.02%2022.02c.21.06.43.12.87.24.73.21%201.09.31%201.4.4%2016.45%204.94%2026.2%2021.84%2022.26%2038.55-.08.31-.17.68-.36%201.41-.11.44-.17.66-.22.87a32.48%2032.48%200%200%200%208.06%2030.09c.15.15.31.31.62.64.53.54.8.81%201.02%201.04%2011.77%2012.51%2011.77%2032.01%200%2044.52-.22.23-.49.5-1.02%201.04-.31.33-.47.49-.62.64a32.48%2032.48%200%200%200-8.06%2030.09c.05.21.11.43.22.87.19.73.28%201.1.36%201.41%203.94%2016.71-5.81%2033.61-22.26%2038.55-.31.09-.67.19-1.4.4-.44.12-.66.18-.87.24a32.47%2032.47%200%200%200-22.02%2022.02c-.06.21-.12.43-.24.87-.21.73-.31%201.09-.4%201.4-4.94%2016.45-21.84%2026.2-38.55%2022.26-.31-.08-.68-.17-1.41-.36-.44-.11-.66-.17-.87-.22a32.48%2032.48%200%200%200-30.09%208.06c-.15.15-.31.31-.64.62-.54.53-.81.8-1.04%201.02-12.51%2011.77-32.01%2011.77-44.52%200-.23-.22-.5-.49-1.04-1.02-.33-.31-.49-.47-.64-.62a32.48%2032.48%200%200%200-30.09-8.06c-.21.05-.43.11-.87.22-.73.19-1.1.28-1.41.36-16.71%203.94-33.61-5.81-38.55-22.26-.09-.31-.19-.67-.4-1.4-.12-.44-.18-.66-.24-.87a32.47%2032.47%200%200%200-22.02-22.02c-.21-.06-.43-.12-.87-.24-.73-.21-1.09-.31-1.4-.4-16.45-4.94-26.2-21.84-22.26-38.55.08-.31.17-.68.36-1.41.11-.44.17-.66.22-.87a32.48%2032.48%200%200%200-8.06-30.09c-.15-.15-.31-.31-.62-.64-.53-.54-.8-.81-1.02-1.04-11.77-12.51-11.77-32.01%200-44.52.22-.23.49-.5%201.02-1.04.31-.33.47-.49.62-.64a32.48%2032.48%200%200%200%208.06-30.09c-.05-.21-.11-.43-.22-.87-.19-.73-.28-1.1-.36-1.41-3.94-16.71%205.81-33.61%2022.26-38.55.31-.09.67-.19%201.4-.4.44-.12.66-.18.87-.24A32.47%2032.47%200%200%200%2064.5%2042.48c.06-.21.12-.43.24-.87.21-.73.31-1.09.4-1.4%204.94-16.45%2021.84-26.2%2038.55-22.26.31.08.68.17%201.41.36.44.11.66.17.87.22a32.48%2032.48%200%200%200%2030.09-8.06c.15-.15.31-.31.64-.62'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M136.7%209.85c.54-.53.81-.8%201.04-1.02%2012.51-11.77%2032.01-11.77%2044.52%200%20.23.22.5.49%201.04%201.02.33.31.49.47.64.62a32.48%2032.48%200%200%200%2030.09%208.06c.21-.05.43-.11.87-.22.73-.19%201.1-.28%201.41-.36%2016.71-3.94%2033.61%205.81%2038.55%2022.26.09.31.19.67.4%201.4.12.44.18.66.24.87a32.47%2032.47%200%200%200%2022.02%2022.02c.21.06.43.12.87.24.73.21%201.09.31%201.4.4%2016.45%204.94%2026.2%2021.84%2022.26%2038.55-.08.31-.17.68-.36%201.41-.11.44-.17.66-.22.87a32.48%2032.48%200%200%200%208.06%2030.09c.15.15.31.31.62.64.53.54.8.81%201.02%201.04%2011.77%2012.51%2011.77%2032.01%200%2044.52-.22.23-.49.5-1.02%201.04-.31.33-.47.49-.62.64a32.48%2032.48%200%200%200-8.06%2030.09c.05.21.11.43.22.87.19.73.28%201.1.36%201.41%203.94%2016.71-5.81%2033.61-22.26%2038.55-.31.09-.67.19-1.4.4-.44.12-.66.18-.87.24a32.47%2032.47%200%200%200-22.02%2022.02c-.06.21-.12.43-.24.87-.21.73-.31%201.09-.4%201.4-4.94%2016.45-21.84%2026.2-38.55%2022.26-.31-.08-.68-.17-1.41-.36-.44-.11-.66-.17-.87-.22a32.48%2032.48%200%200%200-30.09%208.06c-.15.15-.31.31-.64.62-.54.53-.81.8-1.04%201.02-12.51%2011.77-32.01%2011.77-44.52%200-.23-.22-.5-.49-1.04-1.02-.33-.31-.49-.47-.64-.62a32.48%2032.48%200%200%200-30.09-8.06c-.21.05-.43.11-.87.22-.73.19-1.1.28-1.41.36-16.71%203.94-33.61-5.81-38.55-22.26-.09-.31-.19-.67-.4-1.4-.12-.44-.18-.66-.24-.87a32.47%2032.47%200%200%200-22.02-22.02c-.21-.06-.43-.12-.87-.24-.73-.21-1.09-.31-1.4-.4-16.45-4.94-26.2-21.84-22.26-38.55.08-.31.17-.68.36-1.41.11-.44.17-.66.22-.87a32.48%2032.48%200%200%200-8.06-30.09c-.15-.15-.31-.31-.62-.64-.53-.54-.8-.81-1.02-1.04-11.77-12.51-11.77-32.01%200-44.52.22-.23.49-.5%201.02-1.04.31-.33.47-.49.62-.64a32.48%2032.48%200%200%200%208.06-30.09c-.05-.21-.11-.43-.22-.87-.19-.73-.28-1.1-.36-1.41-3.94-16.71%205.81-33.61%2022.26-38.55.31-.09.67-.19%201.4-.4.44-.12.66-.18.87-.24A32.47%2032.47%200%200%200%2064.5%2042.48c.06-.21.12-.43.24-.87.21-.73.31-1.09.4-1.4%204.94-16.45%2021.84-26.2%2038.55-22.26.31.08.68.17%201.41.36.44.11.66.17.87.22a32.48%2032.48%200%200%200%2030.09-8.06c.15-.15.31-.31.64-.62'/%3e%3c/svg%3e\")}.shape.slanted{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='300'%20fill='none'%20viewBox='0%200%20320%20300'%3e%3cpath%20fill='%23d0bcff'%20d='M15.715%2080.54c2.574-24.58%203.861-36.87%208.588-46.562C31.142%2019.945%2043.077%209.11%2057.628%203.723%2067.683%200%2079.933%200%20104.432%200h123.705c29.627%200%2044.441%200%2055.75%204.854%2016.374%207.028%2028.833%2020.995%2034.04%2038.166%203.596%2011.85%202.04%2026.71-1.073%2056.44l-12.569%20120c-2.574%2024.58-3.861%2036.87-8.588%2046.56-6.839%2014.03-18.774%2024.87-33.325%2030.26-10.055%203.72-22.305%203.72-46.804%203.72H91.863c-29.627%200-44.441%200-55.75-4.85-16.374-7.03-28.833-21-34.04-38.17-3.597-11.85-2.04-26.71%201.073-56.44z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='300'%20fill='none'%20viewBox='0%200%20320%20300'%3e%3cpath%20fill='%23d0bcff'%20d='M15.715%2080.54c2.574-24.58%203.861-36.87%208.588-46.562C31.142%2019.945%2043.077%209.11%2057.628%203.723%2067.683%200%2079.933%200%20104.432%200h123.705c29.627%200%2044.441%200%2055.75%204.854%2016.374%207.028%2028.833%2020.995%2034.04%2038.166%203.596%2011.85%202.04%2026.71-1.073%2056.44l-12.569%20120c-2.574%2024.58-3.861%2036.87-8.588%2046.56-6.839%2014.03-18.774%2024.87-33.325%2030.26-10.055%203.72-22.305%203.72-46.804%203.72H91.863c-29.627%200-44.441%200-55.75-4.85-16.374-7.03-28.833-21-34.04-38.17-3.597-11.85-2.04-26.71%201.073-56.44z'/%3e%3c/svg%3e\")}.shape.soft-boom{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M174.94%2084.95c22.54-113.265-52.39-113.265-29.86%200C122.55-28.315%2053.327.352%20117.49%2096.38%2053.327.352.352%2053.33%2096.38%20117.49.352%2053.33-28.315%20122.55%2084.95%20145.07c-113.265-22.53-113.265%2052.39%200%2029.86-113.265%2022.53-84.584%2091.74%2011.43%2027.58-96.014%2064.16-43.04%20117.14%2021.11%2021.11-64.163%2096.01%205.06%20124.68%2027.58%2011.43-22.53%20113.27%2052.39%20113.27%2029.86%200%2022.53%20113.27%2091.74%2084.58%2027.58-11.43%2064.16%2096.01%20117.14%2043.04%2021.11-21.11%2096.01%2064.16%20124.68-5.06%2011.43-27.58%20113.27%2022.53%20113.27-52.39%200-29.86%20113.27-22.53%2084.58-91.74-11.43-27.58C319.63%2053.33%20266.66.352%20202.51%2096.38c64.16-96.014-5.06-124.682-27.58-11.43z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M174.94%2084.95c22.54-113.265-52.39-113.265-29.86%200C122.55-28.315%2053.327.352%20117.49%2096.38%2053.327.352.352%2053.33%2096.38%20117.49.352%2053.33-28.315%20122.55%2084.95%20145.07c-113.265-22.53-113.265%2052.39%200%2029.86-113.265%2022.53-84.584%2091.74%2011.43%2027.58-96.014%2064.16-43.04%20117.14%2021.11%2021.11-64.163%2096.01%205.06%20124.68%2027.58%2011.43-22.53%20113.27%2052.39%20113.27%2029.86%200%2022.53%20113.27%2091.74%2084.58%2027.58-11.43%2064.16%2096.01%20117.14%2043.04%2021.11-21.11%2096.01%2064.16%20124.68-5.06%2011.43-27.58%20113.27%2022.53%20113.27-52.39%200-29.86%20113.27-22.53%2084.58-91.74-11.43-27.58C319.63%2053.33%20266.66.352%20202.51%2096.38c64.16-96.014-5.06-124.682-27.58-11.43z'/%3e%3c/svg%3e\")}.shape.soft-burst{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M145.15%207.904c6.83-10.539%2022.87-10.539%2029.7%200l16.39%2025.261c4.49%206.928%2013.56%209.745%2021.45%206.665l28.78-11.227c12.01-4.683%2024.98%204.329%2024.04%2016.697l-2.27%2029.65c-.63%208.13%204.97%2015.5%2013.25%2017.45l30.19%207.09c12.59%202.96%2017.55%2017.54%209.18%2027.02l-20.06%2022.7c-5.5%206.23-5.5%2015.35%200%2021.58l20.06%2022.7c8.37%209.48%203.41%2024.06-9.18%2027.02l-30.19%207.09c-8.28%201.95-13.88%209.32-13.25%2017.45l2.27%2029.65c.94%2012.37-12.03%2021.38-24.04%2016.7l-28.78-11.23c-7.89-3.08-16.96-.26-21.45%206.67l-16.39%2025.26c-6.83%2010.53-22.87%2010.53-29.7%200l-16.39-25.26c-4.49-6.93-13.56-9.75-21.45-6.67L78.53%20291.4c-12.01%204.68-24.98-4.33-24.04-16.7l2.27-29.65c.63-8.13-4.97-15.5-13.25-17.45l-30.19-7.09c-12.59-2.96-17.55-17.54-9.18-27.02l20.06-22.7c5.5-6.23%205.5-15.35%200-21.58l-20.06-22.7c-8.37-9.48-3.41-24.06%209.18-27.02l30.19-7.09c8.28-1.95%2013.88-9.32%2013.25-17.45L54.49%2045.3c-.94-12.368%2012.03-21.38%2024.04-16.697l28.78%2011.227c7.89%203.08%2016.96.263%2021.45-6.665z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M145.15%207.904c6.83-10.539%2022.87-10.539%2029.7%200l16.39%2025.261c4.49%206.928%2013.56%209.745%2021.45%206.665l28.78-11.227c12.01-4.683%2024.98%204.329%2024.04%2016.697l-2.27%2029.65c-.63%208.13%204.97%2015.5%2013.25%2017.45l30.19%207.09c12.59%202.96%2017.55%2017.54%209.18%2027.02l-20.06%2022.7c-5.5%206.23-5.5%2015.35%200%2021.58l20.06%2022.7c8.37%209.48%203.41%2024.06-9.18%2027.02l-30.19%207.09c-8.28%201.95-13.88%209.32-13.25%2017.45l2.27%2029.65c.94%2012.37-12.03%2021.38-24.04%2016.7l-28.78-11.23c-7.89-3.08-16.96-.26-21.45%206.67l-16.39%2025.26c-6.83%2010.53-22.87%2010.53-29.7%200l-16.39-25.26c-4.49-6.93-13.56-9.75-21.45-6.67L78.53%20291.4c-12.01%204.68-24.98-4.33-24.04-16.7l2.27-29.65c.63-8.13-4.97-15.5-13.25-17.45l-30.19-7.09c-12.59-2.96-17.55-17.54-9.18-27.02l20.06-22.7c5.5-6.23%205.5-15.35%200-21.58l-20.06-22.7c-8.37-9.48-3.41-24.06%209.18-27.02l30.19-7.09c8.28-1.95%2013.88-9.32%2013.25-17.45L54.49%2045.3c-.94-12.368%2012.03-21.38%2024.04-16.697l28.78%2011.227c7.89%203.08%2016.96.263%2021.45-6.665z'/%3e%3c/svg%3e\")}.shape.square{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M320%20172c0%2044.72%200%2067.08-7.02%2084.81-10.17%2025.68-30.49%2046-56.17%2056.17C239.08%20320%20216.72%20320%20172%20320h-24c-44.72%200-67.08%200-84.81-7.02-25.68-10.17-46-30.49-56.17-56.17C0%20239.08%200%20216.72%200%20172v-24c0-44.72%200-67.08%207.02-84.81A100%20100%200%200%201%2063.19%207.022C80.92%200%20103.28%200%20148%200h24c44.72%200%2067.08%200%2084.81%207.022a100%20100%200%200%201%2056.17%2056.168C320%2080.92%20320%20103.28%20320%20148z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M320%20172c0%2044.72%200%2067.08-7.02%2084.81-10.17%2025.68-30.49%2046-56.17%2056.17C239.08%20320%20216.72%20320%20172%20320h-24c-44.72%200-67.08%200-84.81-7.02-25.68-10.17-46-30.49-56.17-56.17C0%20239.08%200%20216.72%200%20172v-24c0-44.72%200-67.08%207.02-84.81A100%20100%200%200%201%2063.19%207.022C80.92%200%20103.28%200%20148%200h24c44.72%200%2067.08%200%2084.81%207.022a100%20100%200%200%201%2056.17%2056.168C320%2080.92%20320%20103.28%20320%20148z'/%3e%3c/svg%3e\")}.shape.sunny{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='340'%20height='340'%20fill='none'%20viewBox='0%200%20340%20340'%3e%3cpath%20fill='%23d0bcff'%20d='M261.856%2041.24c10.575.72%2015.862%201.08%2020.135%202.94a26.86%2026.86%200%200%201%2013.825%2013.83c1.869%204.27%202.228%209.56%202.946%2020.13l1.64%2024.13c.291%204.28.436%206.42.901%208.46a26.8%2026.8%200%200%200%203.451%208.33c1.115%201.78%202.525%203.39%205.343%206.62l15.904%2018.22c6.969%207.99%2010.454%2011.98%2012.154%2016.32a26.84%2026.84%200%200%201%200%2019.56c-1.7%204.34-5.185%208.33-12.154%2016.32l-15.904%2018.22c-2.818%203.23-4.228%204.84-5.343%206.62a26.8%2026.8%200%200%200-3.451%208.33c-.465%202.04-.61%204.18-.901%208.46l-1.64%2024.13c-.718%2010.57-1.077%2015.86-2.946%2020.13a26.86%2026.86%200%200%201-13.825%2013.83c-4.273%201.86-9.56%202.22-20.135%202.94l-24.131%201.64c-4.277.29-6.415.44-8.458.9a26.8%2026.8%200%200%200-8.33%203.45c-1.773%201.12-3.388%202.53-6.618%205.35L196.097%20326c-7.986%206.97-11.978%2010.45-16.322%2012.15a26.72%2026.72%200%200%201-19.55%200c-4.344-1.7-8.336-5.18-16.322-12.15l-18.222-15.9c-3.23-2.82-4.845-4.23-6.618-5.35a26.8%2026.8%200%200%200-8.33-3.45c-2.043-.46-4.181-.61-8.458-.9l-24.131-1.64c-10.575-.72-15.862-1.08-20.135-2.94a26.86%2026.86%200%200%201-13.825-13.83c-1.869-4.27-2.228-9.56-2.947-20.13l-1.64-24.13c-.29-4.28-.435-6.42-.9-8.46a26.8%2026.8%200%200%200-3.45-8.33c-1.116-1.78-2.526-3.39-5.344-6.62L13.999%20196.1c-6.969-7.99-10.454-11.98-12.154-16.32a26.84%2026.84%200%200%201%200-19.56c1.7-4.34%205.185-8.33%2012.154-16.32l15.904-18.22c2.818-3.23%204.228-4.84%205.343-6.62a26.8%2026.8%200%200%200%203.45-8.33c.466-2.04.611-4.18.902-8.46l1.64-24.13c.718-10.57%201.077-15.86%202.946-20.13A26.86%2026.86%200%200%201%2058.01%2044.18c4.273-1.86%209.56-2.22%2020.135-2.94l24.131-1.64c4.277-.29%206.415-.44%208.458-.9a26.8%2026.8%200%200%200%208.33-3.45c1.773-1.12%203.388-2.53%206.618-5.35L143.903%2014c7.986-6.97%2011.978-10.45%2016.322-12.15a26.72%2026.72%200%200%201%2019.55%200c4.344%201.7%208.336%205.18%2016.322%2012.15l18.222%2015.9c3.23%202.82%204.845%204.23%206.618%205.35a26.8%2026.8%200%200%200%208.33%203.45c2.043.46%204.181.61%208.458.9z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='340'%20height='340'%20fill='none'%20viewBox='0%200%20340%20340'%3e%3cpath%20fill='%23d0bcff'%20d='M261.856%2041.24c10.575.72%2015.862%201.08%2020.135%202.94a26.86%2026.86%200%200%201%2013.825%2013.83c1.869%204.27%202.228%209.56%202.946%2020.13l1.64%2024.13c.291%204.28.436%206.42.901%208.46a26.8%2026.8%200%200%200%203.451%208.33c1.115%201.78%202.525%203.39%205.343%206.62l15.904%2018.22c6.969%207.99%2010.454%2011.98%2012.154%2016.32a26.84%2026.84%200%200%201%200%2019.56c-1.7%204.34-5.185%208.33-12.154%2016.32l-15.904%2018.22c-2.818%203.23-4.228%204.84-5.343%206.62a26.8%2026.8%200%200%200-3.451%208.33c-.465%202.04-.61%204.18-.901%208.46l-1.64%2024.13c-.718%2010.57-1.077%2015.86-2.946%2020.13a26.86%2026.86%200%200%201-13.825%2013.83c-4.273%201.86-9.56%202.22-20.135%202.94l-24.131%201.64c-4.277.29-6.415.44-8.458.9a26.8%2026.8%200%200%200-8.33%203.45c-1.773%201.12-3.388%202.53-6.618%205.35L196.097%20326c-7.986%206.97-11.978%2010.45-16.322%2012.15a26.72%2026.72%200%200%201-19.55%200c-4.344-1.7-8.336-5.18-16.322-12.15l-18.222-15.9c-3.23-2.82-4.845-4.23-6.618-5.35a26.8%2026.8%200%200%200-8.33-3.45c-2.043-.46-4.181-.61-8.458-.9l-24.131-1.64c-10.575-.72-15.862-1.08-20.135-2.94a26.86%2026.86%200%200%201-13.825-13.83c-1.869-4.27-2.228-9.56-2.947-20.13l-1.64-24.13c-.29-4.28-.435-6.42-.9-8.46a26.8%2026.8%200%200%200-3.45-8.33c-1.116-1.78-2.526-3.39-5.344-6.62L13.999%20196.1c-6.969-7.99-10.454-11.98-12.154-16.32a26.84%2026.84%200%200%201%200-19.56c1.7-4.34%205.185-8.33%2012.154-16.32l15.904-18.22c2.818-3.23%204.228-4.84%205.343-6.62a26.8%2026.8%200%200%200%203.45-8.33c.466-2.04.611-4.18.902-8.46l1.64-24.13c.718-10.57%201.077-15.86%202.946-20.13A26.86%2026.86%200%200%201%2058.01%2044.18c4.273-1.86%209.56-2.22%2020.135-2.94l24.131-1.64c4.277-.29%206.415-.44%208.458-.9a26.8%2026.8%200%200%200%208.33-3.45c1.773-1.12%203.388-2.53%206.618-5.35L143.903%2014c7.986-6.97%2011.978-10.45%2016.322-12.15a26.72%2026.72%200%200%201%2019.55%200c4.344%201.7%208.336%205.18%2016.322%2012.15l18.222%2015.9c3.23%202.82%204.845%204.23%206.618%205.35a26.8%2026.8%200%200%200%208.33%203.45c2.043.46%204.181.61%208.458.9z'/%3e%3c/svg%3e\")}.shape.triangle{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='316'%20height='286'%20fill='none'%20viewBox='0%200%20316%20286'%3e%3cpath%20fill='%23d0bcff'%20d='M104.461%2051.2c15.136-26.38%2022.704-39.57%2031.881-45.14a41.73%2041.73%200%200%201%2043.316%200c9.177%205.57%2016.745%2018.76%2031.881%2045.14l81.77%20142.52c14.991%2026.13%2022.486%2039.19%2022.684%2049.86a41.63%2041.63%200%200%201-21.629%2037.28c-9.37%205.14-24.445%205.14-54.594%205.14H76.23c-30.15%200-45.224%200-54.594-5.14a41.62%2041.62%200%200%201-21.63-37.28c.199-10.67%207.694-23.73%2022.685-49.86z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='316'%20height='286'%20fill='none'%20viewBox='0%200%20316%20286'%3e%3cpath%20fill='%23d0bcff'%20d='M104.461%2051.2c15.136-26.38%2022.704-39.57%2031.881-45.14a41.73%2041.73%200%200%201%2043.316%200c9.177%205.57%2016.745%2018.76%2031.881%2045.14l81.77%20142.52c14.991%2026.13%2022.486%2039.19%2022.684%2049.86a41.63%2041.63%200%200%201-21.629%2037.28c-9.37%205.14-24.445%205.14-54.594%205.14H76.23c-30.15%200-45.224%200-54.594-5.14a41.62%2041.62%200%200%201-21.63-37.28c.199-10.67%207.694-23.73%2022.685-49.86z'/%3e%3c/svg%3e\")}.shape.very-sunny{-webkit-mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M136.72%2013.19c10.54-17.59%2036.02-17.59%2046.56%200l11.84%2019.77c6.15%2010.25%2018.28%2015.28%2029.87%2012.37l22.36-5.6c19.89-4.98%2037.9%2013.03%2032.92%2032.92l-5.6%2022.36c-2.91%2011.59%202.12%2023.72%2012.37%2029.87l19.77%2011.84c17.59%2010.54%2017.59%2036.02%200%2046.56l-19.77%2011.84c-10.25%206.15-15.28%2018.28-12.37%2029.87l5.6%2022.36c4.98%2019.89-13.03%2037.9-32.92%2032.92l-22.36-5.6c-11.59-2.91-23.72%202.12-29.87%2012.37l-11.84%2019.77c-10.54%2017.59-36.02%2017.59-46.56%200l-11.84-19.77c-6.15-10.25-18.28-15.28-29.87-12.37l-22.364%205.6c-19.883%204.98-37.899-13.03-32.917-32.92l5.604-22.36c2.905-11.59-2.119-23.72-12.373-29.87l-19.773-11.84c-17.583-10.54-17.583-36.02%200-46.56l19.773-11.84c10.254-6.15%2015.278-18.28%2012.373-29.87l-5.604-22.36c-4.982-19.89%2013.034-37.9%2032.916-32.92l22.365%205.6c11.59%202.91%2023.72-2.12%2029.87-12.37z'/%3e%3c/svg%3e\");mask-image:url(\"data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='320'%20fill='none'%20viewBox='0%200%20320%20320'%3e%3cpath%20fill='%23d0bcff'%20d='M136.72%2013.19c10.54-17.59%2036.02-17.59%2046.56%200l11.84%2019.77c6.15%2010.25%2018.28%2015.28%2029.87%2012.37l22.36-5.6c19.89-4.98%2037.9%2013.03%2032.92%2032.92l-5.6%2022.36c-2.91%2011.59%202.12%2023.72%2012.37%2029.87l19.77%2011.84c17.59%2010.54%2017.59%2036.02%200%2046.56l-19.77%2011.84c-10.25%206.15-15.28%2018.28-12.37%2029.87l5.6%2022.36c4.98%2019.89-13.03%2037.9-32.92%2032.92l-22.36-5.6c-11.59-2.91-23.72%202.12-29.87%2012.37l-11.84%2019.77c-10.54%2017.59-36.02%2017.59-46.56%200l-11.84-19.77c-6.15-10.25-18.28-15.28-29.87-12.37l-22.364%205.6c-19.883%204.98-37.899-13.03-32.917-32.92l5.604-22.36c2.905-11.59-2.119-23.72-12.373-29.87l-19.773-11.84c-17.583-10.54-17.583-36.02%200-46.56l19.773-11.84c10.254-6.15%2015.278-18.28%2012.373-29.87l-5.604-22.36c-4.982-19.89%2013.034-37.9%2032.916-32.92l22.365%205.6c11.59%202.91%2023.72-2.12%2029.87-12.37z'/%3e%3c/svg%3e\")}@keyframes to-shape-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.checkbox,.radio,.switch{--_size:1.5rem;white-space:nowrap;cursor:pointer;align-items:center;block-size:auto;inline-size:auto;line-height:normal;display:inline-flex}.switch{direction:ltr}:is(.checkbox,.radio,.switch).large{--_size:2rem}:is(.checkbox,.radio,.switch).extra{--_size:2.5rem}:is(.checkbox,.radio)>input{inline-size:var(--_size);block-size:var(--_size);opacity:0}.switch>input{opacity:0;block-size:2rem;inline-size:3.25rem}:is(.checkbox,.radio,.switch)>span{color:var(--on-surface);align-items:center;font-size:.875rem;display:inline-flex}:is(.checkbox,.radio)>span:not(:empty){padding-inline-start:.25rem}:is(.checkbox,.radio,.switch)>span:before,:is(.checkbox,.radio,.switch)>span>i,:is(.checkbox,.radio)>span:after{--_size:inherit;content:\"\";inline-size:var(--_size);block-size:var(--_size);box-sizing:border-box;color:var(--primary);inset:auto auto auto calc(var(--_size,0) * -1);-webkit-user-select:none;user-select:none;z-index:1;border-radius:50%;outline:none;margin:0 auto;position:absolute}[dir=rtl] :is(.checkbox,.radio)>span:before,[dir=rtl] :is(.checkbox,.radio)>span>i,[dir=rtl] :is(.checkbox,.radio)>span:after{--_size:inherit;inset:auto calc(var(--_size,0) * -1) auto auto}.switch>span:before,.switch.icon>span>i{transition:all var(--speed2);font-size:calc(var(--_size,0) - .5rem);-webkit-user-select:none;user-select:none;min-inline-size:var(--_size);min-block-size:var(--_size);content:\"\";color:var(--surface-variant);background-color:var(--outline);border-radius:50%;justify-content:center;align-items:center;display:inline-flex;position:absolute;inset:50% auto auto 0;transform:translate(-3rem,-50%)scale(.6)}.switch.icon>span>i{transform:translate(-3rem,-50%)scale(1)}.checkbox>span:before{content:\"check_box_outline_blank\"}.checkbox>input:checked+span:before{content:\"check_box\";font-variation-settings:\"FILL\" 1}.checkbox>input:indeterminate+span:before{content:\"indeterminate_check_box\"}.radio>span:before{content:\"radio_button_unchecked\"}.radio>input:checked+span:before{content:\"radio_button_checked\"}:is(.radio,.checkbox,.switch).icon>span:before{content:\"\"!important;font-variation-settings:unset!important}:is(.checkbox,.radio)>span:after{transition:all var(--speed1);opacity:0;background-color:currentColor;box-shadow:0 0}:is(.checkbox,.radio):hover>input:not(:disabled)+span:after,:is(.checkbox,.radio)>input:not(:disabled):focus+span:after{opacity:.1;box-shadow:0 0 0 .5rem}.switch>input:not(:disabled):is(:focus,:hover)+span:before,.switch.icon>input:not(:disabled):is(:focus,:hover)+span>i{box-shadow:0 0 0 .5rem var(--active)}:is(.checkbox,.radio)>input:checked+span:before,:is(.checkbox,.radio).icon>input:checked+span>i{color:var(--primary)}.icon>input:checked+span>i:first-child,.icon>span>i:last-child{opacity:0}.icon>input:checked+span>i:last-child,.icon>span>i:first-child{opacity:1}.switch>input:checked+span:after{background-color:var(--primary);border:none}.switch>input:checked+span:before,.switch.icon>input:checked+span>i{content:\"check\";color:var(--primary);background-color:var(--on-primary);transform:translate(-1.75rem,-50%)scale(1)}.switch>input:active:not(:disabled)+span:before,.switch.icon>input:active:not(:disabled)+span>i{transform:translate(-3rem,-50%)scale(1.2)}[dir=rtl] .switch>input:active:not(:disabled)+span:before,[dir=rtl] .switch.icon>input:active:not(:disabled)+span>i{transform:translate(-3rem,-50%)scale(-1.2)}.switch>input:active:checked:not(:disabled)+span:before,.switch.icon>input:active:checked:not(:disabled)+span>i{transform:translate(-1.75rem,-50%)scale(1.2)}[dir=rtl] .switch>input:active:checked:not(:disabled)+span:before,[dir=rtl] .switch.icon>input:active:checked:not(:disabled)+span>i{transform:translate(-1.75rem,-50%)scale(-1.2)}:is(.checkbox,.radio,.switch)>input:disabled+span{opacity:.5;cursor:not-allowed}.switch>span:after{content:\"\";background-color:var(--active);border:.125rem solid var(--outline);box-sizing:border-box;border-radius:2rem;block-size:2rem;inline-size:3.25rem;position:absolute;inset:50% auto auto 0;transform:translate(-3.25rem,-50%)}.field>:is(nav,.row){flex-grow:1;padding:0 1rem}.field.round>:is(nav,.row){flex-grow:1;padding:0 1.5rem}[dir=rtl] .switch{transform:scale(-1)}[dir=rtl] .switch>span:before,[dir=rtl] .switch.icon>span>i{transform:translate(-3rem,-50%)scale(-.6)}[dir=rtl] .switch.icon>span>i{transform:translate(-3rem,-50%)scale(-1)}[dir=rtl] .switch>input:checked+span:before,[dir=rtl] .switch.icon>input:checked+span>i{transform:translate(-1.75rem,-50%)scale(-1)}.switch>:focus-visible+span:after{outline:.125rem solid var(--primary);outline-offset:.25rem}:is(.checkbox,.radio)>:focus-visible+span:before{outline:.125rem solid var(--primary);outline-offset:.375rem}.slider{--_start:0%;--_end:0%;--_value1:\"\";--_value2:\"\";--_track:1rem;--_thumb:max(2.5rem, calc(var(--_track,0) + .5rem));inline-size:auto;block-size:var(--_thumb);color:var(--primary);direction:ltr;flex:none;margin:0 1.25rem;display:flex;align-items:center!important}[dir=rtl] .slider{transform:scaleX(-1)}.slider.vertical{inline-size:100%;padding:50% 0;transform:rotate(-90deg);flex-direction:row!important;margin:.5rem auto!important}.slider.tiny{--_track:1rem}.slider.small{--_track:1.5rem}.slider.medium{--_track:2.5rem}.slider.large{--_track:3.5rem}.slider.extra{--_track:6rem}.slider>input{appearance:none;box-shadow:none;pointer-events:none;inline-size:100%;block-size:var(--_track);z-index:1;background:0 0;border:none;outline:none;margin:0;padding:0;transform:rotate(0)}.slider>input:only-of-type{pointer-events:all}.slider>input~input{position:absolute}.slider>input::-webkit-slider-thumb{appearance:none;box-shadow:none;pointer-events:all;block-size:var(--_thumb);cursor:grab;z-index:1;background:currentColor;border:none;border-radius:.25rem;outline:none;inline-size:.25rem;margin:0}.slider>input::-webkit-slider-thumb:active{cursor:grabbing}.slider>input::-moz-range-thumb{appearance:none;box-shadow:none;pointer-events:all;background:var(--primary);cursor:grab;border:none;border-radius:.25rem;outline:none;block-size:2.75rem;inline-size:.25rem;margin:0}.slider>input::-moz-range-thumb:active{cursor:grabbing}.slider>input:not(:disabled):focus::-webkit-slider-thumb{transform:scaleX(.6)}.slider>input:not(:disabled):focus::-moz-range-thumb{transform:scaleX(.6)}.slider>input:disabled{cursor:not-allowed;opacity:1}.slider>input:disabled::-webkit-slider-thumb{background:var(--outline);cursor:not-allowed}.slider>input:disabled::-moz-range-thumb{background:var(--outline);cursor:not-allowed}.slider>input:disabled~span:not([class]){background:var(--outline)}.slider>span:not([class]){block-size:var(--_track);color:currentColor;z-index:0;inset:calc(50% - (var(--_track,0) / 2)) calc(var(--_end) + .5rem) auto var(--_start);background:currentColor;border-radius:1rem 0 0 1rem;position:absolute}.slider>input[type=range]+input[type=range]~span:not([class]){inset:calc(50% - (var(--_track,0) / 2)) calc(var(--_end) + .5rem) auto calc(var(--_start) + .5rem);border-radius:0}.field>.slider{inline-size:100%}.slider:before{content:\"\";inline-size:100%;block-size:var(--_track);background:var(--active);clip-path:polygon(calc(var(--_start,0) - .5rem) 0,0 0,0 100%,calc(var(--_start,0) - .5rem) 100%,calc(var(--_start,0) - .5rem) 0,calc(100% - var(--_end,0) + .5rem) 0,100% 0,100% 100%,calc(100% - var(--_end,0) + .5rem) 100%,calc(100% - var(--_end,0) + .5rem) 0);border-radius:1rem;position:absolute}.slider:has(>[disabled]):before{background:var(--active)}.slider:has([disabled]){opacity:.62}.slider>span>i{color:currentColor;z-index:1;block-size:auto;position:absolute;inset:0 auto 0 .5rem}.slider:not(.medium,.large,.extra)>span>i{display:none}.slider.vertical>i{transform:rotate(90deg)}.slider>.tooltip{inset:0 auto auto calc(100% - var(--_end,0));transition:top var(--speed2) ease,opacity var(--speed2) ease;border-radius:2rem;padding:.75rem 1rem;visibility:hidden!important;opacity:0!important;transform:translate(-50%,-25%)!important}.slider>.tooltip.bottom{inset:auto auto 0 calc(100% - var(--_end,0));transition:bottom var(--speed2) ease,opacity var(--speed2) ease;transform:translate(-50%,25%)!important}[dir=rtl] .slider>.tooltip{transform:translate(-50%,-25%)scaleX(-1)!important}[dir=rtl] .slider>.tooltip.bottom{transform:translate(-50%,25%)scaleX(-1)!important}.slider>.tooltip+.tooltip{inset:.25rem calc(100% - var(--_start,0)) auto auto;transform:translate(50%,-25%)!important}.slider>.tooltip+.tooltip.bottom{inset:auto calc(100% - var(--_start,0)) -.25rem auto;transform:translate(50%,25%)!important}[dir=rtl] .slider>.tooltip+.tooltip{transform:translate(50%,-25%)scaleX(-1)!important}[dir=rtl] .slider>.tooltip+.tooltip.bottom{transform:translate(50%,25%)scaleX(-1)!important}.slider>.tooltip:before{content:var(--_value1)}.slider>.tooltip+.tooltip:before{content:var(--_value2)}.slider>:focus~.tooltip{inset-block:-1rem auto;opacity:1!important;visibility:visible!important}.slider>:focus~.tooltip.bottom{inset-block:auto -1rem}.slider.vertical>.tooltip{block-size:2.5rem;inline-size:2.5rem;inset-block:auto;margin-block:calc(-1 * var(--_thumb,0)) 0!important;transform:rotate(90deg)translate(-75%,50%)!important}.slider.vertical>.tooltip.bottom{inset-block:auto;margin-block:0 calc(-1 * var(--_thumb,0))!important;transform:rotate(90deg)translate(75%,50%)!important}.slider.vertical>.tooltip+.tooltip{transform:rotate(90deg)translate(-75%,-50%)!important}.slider.vertical>.tooltip+.tooltip.bottom{transform:rotate(90deg)translate(75%,-50%)!important}:is(nav,.row,.field)>.slider:not(.circle,.small,.medium,.large){flex:auto}.slider.max,.slider.max.vertical,.slider.max>input,.slider.max.vertical>input{all:unset;color:var(--primary);border-radius:inherit;z-index:2;cursor:grab;block-size:100%;inline-size:100%;position:absolute;inset:0;overflow:hidden;margin:0!important}.slider.max:before{display:none}.slider.max.vertical>input{writing-mode:vertical-lr;transform:rotate(-180deg)}.slider.max>input::-webkit-slider-thumb{opacity:0;block-size:100vh;inline-size:1rem;transform:none!important}.slider.max>input::-moz-range-thumb{opacity:0;block-size:100vh;inline-size:1rem;transform:none!important}.slider.max>span:not([class]){inset:0 var(--_end) 0 var(--_start);color:inherit;background:currentColor;border-radius:0;block-size:auto!important}.slider.max.vertical>span:not([class]){inset:var(--_end) 0 var(--_start) 0}.slider>input:focus-visible::-webkit-slider-thumb{outline:.1875rem solid var(--primary);outline-offset:.25rem}.slider>input:focus-visible::-moz-range-thumb{outline:.1875rem solid var(--primary);outline-offset:.25rem}.slider.max>input:focus-visible{outline:.1875rem solid var(--primary);outline-offset:-.125rem}@media (pointer:coarse){.slider>:hover~.tooltip{opacity:1!important;visibility:visible!important;inset-block:-1rem auto!important}.slider>:hover~.tooltip.bottom{inset-block:auto -1rem!important}}.snackbar{z-index:200;visibility:hidden;block-size:auto;inline-size:80%;box-shadow:var(--elevate2);color:var(--inverse-on-surface);background-color:var(--inverse-surface);cursor:pointer;text-align:start;transition:all var(--speed2);opacity:0;border-radius:.25rem;align-items:center;gap:.5rem;padding:1rem;display:flex;position:fixed;inset:auto auto 6rem 50%;transform:translate(-50%,1rem)}.snackbar.top{inset:6rem auto auto 50%}.snackbar.active{visibility:visible;opacity:1;transform:translate(-50%)}.snackbar:popover-open{visibility:visible;opacity:1;transform:translate(-50%)}.snackbar>.max{flex:auto}@media only screen and (width>=993px){.snackbar{inline-size:40%}}table{border-spacing:0;text-align:start;inline-size:100%;font-size:.875rem}.scroll>table,table :is(thead,tbody,tfoot,tr,th,td){background-color:inherit;color:inherit}:is(th,td){inline-size:auto;text-align:inherit;border-radius:0;padding:.5rem}:is(th,td)>*{vertical-align:middle}table.border>tbody>tr:not(:last-child)>td,thead>tr>th{border-block-end:.0625rem solid var(--outline)}tfoot>tr>th{border-block-start:.0625rem solid var(--outline)}table.stripes>tbody>tr:nth-child(odd){background-color:var(--active)}table.no-space :is(th,td){padding:0}table.medium-space :is(th,td){padding:.75rem}table.large-space :is(th,td){padding:1rem}table>.fixed,th.fixed{z-index:1;position:sticky;inset-block-start:0}tfoot.fixed,tfoot th.fixed{inset-block-end:0}:is(td,th).min{white-space:nowrap;inline-size:.1%}.tabs{white-space:nowrap;border-block-end:.0625rem solid var(--surface-variant);border-radius:0;display:flex}.tabs:not(.left-align,.right-align,.center-align){justify-content:space-around}.tabs>a{color:var(--on-surface-variant);text-align:center;gap:.25rem;min-block-size:3rem;inline-size:100%;padding:.5rem 1rem;font-size:.875rem;font-weight:500;display:flex}.tabs.small>a{min-block-size:2rem}.tabs.large>a{min-block-size:4rem}.tabs>a.active,.tabs>a.active>i{color:var(--primary)}.tabs>a.active:before{content:\"\";background-color:var(--primary);block-size:.125rem;position:absolute;inset:auto 0 0}.tabs.min>a.active:before{max-inline-size:min(100%,4rem);margin:0 auto}.tabs:is(.left-align,.center-align,.right-align)>a{inline-size:auto}.tooltip{--_space:-.5rem;visibility:hidden;background-color:var(--inverse-surface);color:var(--inverse-on-surface);text-align:center;z-index:200;white-space:nowrap;opacity:0;inline-size:auto;transition:all var(--speed2);border-radius:.25rem;justify-content:center;align-items:center;gap:.5rem;padding:.5rem;font-size:.75rem;font-weight:500;line-height:normal;display:flex;position:absolute;inset:0 auto auto 50%;transform:translate(-50%,-100%)scale(.9)}.tooltip:not(.max):hover{visibility:hidden;opacity:0}.tooltip.left{inset:50% auto auto 0;transform:translate(-100%,-50%)scale(.9)}.tooltip.right{inset:50% 0 auto auto;transform:translate(100%,-50%)scale(.9)}.tooltip.bottom{inset:auto auto 0 50%;transform:translate(-50%,100%)scale(.9)}.tooltip.small{white-space:normal;inline-size:8rem}.tooltip.medium{white-space:normal;inline-size:12rem}.tooltip.large{white-space:normal;inline-size:16rem}:hover>.tooltip{visibility:visible;opacity:1;transform:translate(-50%,-100%)scale(1)}:hover>.tooltip.left{transform:translate(-100%,-50%)scale(1)}:hover>.tooltip.right{transform:translate(100%,-50%)scale(1)}:hover>.tooltip.bottom{transform:translate(-50%,100%)scale(1)}.tooltip.no-space{--_space:0}.tooltip.medium-space{--_space:-1rem}.tooltip.large-space{--_space:-1.5rem}.tooltip:not(.left,.right,.bottom){margin-block-start:var(--_space)!important}.tooltip.left,.tooltip.right{margin-inline:var(--_space)!important}.tooltip.bottom{margin-block-end:var(--_space)!important}menu:active~.tooltip,:is(button,.button):focus>menu~.tooltip,.field>:focus~menu~.tooltip{visibility:hidden}.slider>.tooltip{--_space:-1.25rem}.slider.vertical>.tooltip{--_space:-.75rem}.slider.vertical>.tooltip:is(.left,.right){--_space:-.5rem}.tooltip.max{font-size:inherit;white-space:normal;text-align:start;inline-size:20rem;box-shadow:var(--elevate2);border-radius:.5rem;padding:1rem;display:block}.transparent{box-shadow:none!important;color:inherit!important;background-color:#0000!important}.primary{background-color:var(--primary)!important;color:var(--on-primary)!important}.primary-text{color:var(--primary)!important}.primary-border{border-color:var(--primary)!important}.primary-container{background-color:var(--primary-container)!important;color:var(--on-primary-container)!important}.secondary{background-color:var(--secondary)!important;color:var(--on-secondary)!important}.secondary-text{color:var(--secondary)!important}.secondary-border{border-color:var(--secondary)!important}.secondary-container{background-color:var(--secondary-container)!important;color:var(--on-secondary-container)!important}.tertiary{background-color:var(--tertiary)!important;color:var(--on-tertiary)!important}.tertiary-text{color:var(--tertiary)!important}.tertiary-border{border-color:var(--tertiary)!important}.tertiary-container{background-color:var(--tertiary-container)!important;color:var(--on-tertiary-container)!important}.error{background-color:var(--error)!important;color:var(--on-error)!important}.error-text{color:var(--error)!important}.error-border{border-color:var(--error)!important}.error-container{background-color:var(--error-container)!important;color:var(--on-error-container)!important}.background{background-color:var(--background)!important;color:var(--on-background)!important}.surface,.surface-dim,.surface-bright,.surface-container-lowest,.surface-container-low,.surface-container,.surface-container-high,.surface-container-highest{background-color:var(--surface)!important;color:var(--on-surface)!important}.surface-variant{background-color:var(--surface-variant)!important;color:var(--on-surface-variant)!important}.inverse-surface{background-color:var(--inverse-surface);color:var(--inverse-on-surface)}.inverse-primary{background-color:var(--inverse-primary);color:var(--primary)}.inverse-primary-text{color:var(--inverse-primary)!important}.inverse-primary-border{border-color:var(--inverse-primary)!important}.surface-dim{background-color:var(--surface-dim)!important}.surface-bright{background-color:var(--surface-bright)!important}.surface-container-lowest{background-color:var(--surface-container-lowest)!important}.surface-container{background-color:var(--surface-container)!important}.surface-container-high{background-color:var(--surface-container-high)!important}.surface-container-highest{background-color:var(--surface-container-highest)!important}.surface-container-low{background-color:var(--surface-container-low)!important}.black{background-color:#000!important}.black-border{border-color:#000!important}.black-text{color:#000!important}.white{background-color:#fff!important}.white-border{border-color:#fff!important}.white-text{color:#fff!important}.transparent-border{border-color:#0000!important}.transparent-text{color:#0000!important}.fill:not(i){background-color:var(--surface-variant)!important;color:var(--on-surface-variant)!important}nav.primary-container>button,:is(nav,menu).primary>:is(button,a,li).active{background-color:var(--primary-container)!important;color:var(--on-primary-container)!important}nav.primary>button,:is(nav,menu).primary-container>:is(button,a,li).active{background-color:var(--primary)!important;color:var(--on-primary)!important}nav.secondary-container>button,:is(nav,menu).secondary>:is(button,a,li).active{background-color:var(--secondary-container)!important;color:var(--on-secondary-container)!important}nav.secondary>button,:is(nav,menu).secondary-container>:is(button,a,li).active{background-color:var(--secondary)!important;color:var(--on-secondary)!important}nav.tertiary-container>button,:is(nav,menu).tertiary>:is(button,a,li).active{background-color:var(--tertiary-container)!important;color:var(--on-tertiary-container)!important}nav.tertiary>button,:is(nav,menu).tertiary-container>:is(button,a,li).active{background-color:var(--tertiary)!important;color:var(--on-tertiary)!important}.red,.red6{background-color:#f44336!important}.red-border{border-color:#f44336!important}.red-text{color:#f44336!important}.red1{background-color:#ffebee!important}.red2{background-color:#ffcdd2!important}.red3{background-color:#ef9a9a!important}.red4{background-color:#e57373!important}.red5{background-color:#ef5350!important}.red7{background-color:#e53935!important}.red8{background-color:#d32f2f!important}.red9{background-color:#c62828!important}.red10{background-color:#b71c1c!important}.pink,.pink6{background-color:#e91e63!important}.pink-border{border-color:#e91e63!important}.pink-text{color:#e91e63!important}.pink1{background-color:#fce4ec!important}.pink2{background-color:#f8bbd0!important}.pink3{background-color:#f48fb1!important}.pink4{background-color:#f06292!important}.pink5{background-color:#ec407a!important}.pink7{background-color:#d81b60!important}.pink8{background-color:#c2185b!important}.pink9{background-color:#ad1457!important}.pink10{background-color:#880e4f!important}.purple,.purple6{background-color:#9c27b0!important}.purple-border{border-color:#9c27b0!important}.purple-text{color:#9c27b0!important}.purple1{background-color:#f3e5f5!important}.purple2{background-color:#e1bee7!important}.purple3{background-color:#ce93d8!important}.purple4{background-color:#ba68c8!important}.purple5{background-color:#ab47bc!important}.purple7{background-color:#8e24aa!important}.purple8{background-color:#7b1fa2!important}.purple9{background-color:#6a1b9a!important}.purple10{background-color:#4a148c!important}.deep-purple,.deep-purple6{background-color:#673ab7!important}.deep-purple-border{border-color:#673ab7!important}.deep-purple-text{color:#673ab7!important}.deep-purple1{background-color:#ede7f6!important}.deep-purple2{background-color:#d1c4e9!important}.deep-purple3{background-color:#b39ddb!important}.deep-purple4{background-color:#9575cd!important}.deep-purple5{background-color:#7e57c2!important}.deep-purple7{background-color:#5e35b1!important}.deep-purple8{background-color:#512da8!important}.deep-purple9{background-color:#4527a0!important}.deep-purple10{background-color:#311b92!important}.indigo,.indigo6{background-color:#3f51b5!important}.indigo-border{border-color:#3f51b5!important}.indigo-text{color:#3f51b5!important}.indigo1{background-color:#e8eaf6!important}.indigo2{background-color:#c5cae9!important}.indigo3{background-color:#9fa8da!important}.indigo4{background-color:#7986cb!important}.indigo5{background-color:#5c6bc0!important}.indigo7{background-color:#3949ab!important}.indigo8{background-color:#303f9f!important}.indigo9{background-color:#283593!important}.indigo10{background-color:#1a237e!important}.blue,.blue6{background-color:#2196f3!important}.blue-border{border-color:#2196f3!important}.blue-text{color:#2196f3!important}.blue1{background-color:#e3f2fd!important}.blue2{background-color:#bbdefb!important}.blue3{background-color:#90caf9!important}.blue4{background-color:#64b5f6!important}.blue5{background-color:#42a5f5!important}.blue7{background-color:#1e88e5!important}.blue8{background-color:#1976d2!important}.blue9{background-color:#1565c0!important}.blue10{background-color:#0d47a1!important}.light-blue,.light-blue6{background-color:#03a9f4!important}.light-blue-border{border-color:#03a9f4!important}.light-blue-text{color:#03a9f4!important}.light-blue1{background-color:#e1f5fe!important}.light-blue2{background-color:#b3e5fc!important}.light-blue3{background-color:#81d4fa!important}.light-blue4{background-color:#4fc3f7!important}.light-blue5{background-color:#29b6f6!important}.light-blue7{background-color:#039be5!important}.light-blue8{background-color:#0288d1!important}.light-blue9{background-color:#0277bd!important}.light-blue10{background-color:#01579b!important}.cyan,.cyan6{background-color:#00bcd4!important}.cyan-border{border-color:#00bcd4!important}.cyan-text{color:#00bcd4!important}.cyan1{background-color:#e0f7fa!important}.cyan2{background-color:#b2ebf2!important}.cyan3{background-color:#80deea!important}.cyan4{background-color:#4dd0e1!important}.cyan5{background-color:#26c6da!important}.cyan7{background-color:#00acc1!important}.cyan8{background-color:#0097a7!important}.cyan9{background-color:#00838f!important}.cyan10{background-color:#006064!important}.teal,.teal6{background-color:#009688!important}.teal-border{border-color:#009688!important}.teal-text{color:#009688!important}.teal1{background-color:#e0f2f1!important}.teal2{background-color:#b2dfdb!important}.teal3{background-color:#80cbc4!important}.teal4{background-color:#4db6ac!important}.teal5{background-color:#26a69a!important}.teal7{background-color:#00897b!important}.teal8{background-color:#00796b!important}.teal9{background-color:#00695c!important}.teal10{background-color:#004d40!important}.green,.green6{background-color:#4caf50!important}.green-border{border-color:#4caf50!important}.green-text{color:#4caf50!important}.green1{background-color:#e8f5e9!important}.green2{background-color:#c8e6c9!important}.green3{background-color:#a5d6a7!important}.green4{background-color:#81c784!important}.green5{background-color:#66bb6a!important}.green7{background-color:#43a047!important}.green8{background-color:#388e3c!important}.green9{background-color:#2e7d32!important}.green10{background-color:#1b5e20!important}.light-green,.light-green6{background-color:#8bc34a!important}.light-green-border{border-color:#8bc34a!important}.light-green-text{color:#8bc34a!important}.light-green1{background-color:#f1f8e9!important}.light-green2{background-color:#dcedc8!important}.light-green3{background-color:#c5e1a5!important}.light-green4{background-color:#aed581!important}.light-green5{background-color:#9ccc65!important}.light-green7{background-color:#7cb342!important}.light-green8{background-color:#689f38!important}.light-green9{background-color:#558b2f!important}.light-green10{background-color:#33691e!important}.lime,.lime6{background-color:#cddc39!important}.lime-border{border-color:#cddc39!important}.lime-text{color:#cddc39!important}.lime1{background-color:#f9fbe7!important}.lime2{background-color:#f0f4c3!important}.lime3{background-color:#e6ee9c!important}.lime4{background-color:#dce775!important}.lime5{background-color:#d4e157!important}.lime7{background-color:#c0ca33!important}.lime8{background-color:#afb42b!important}.lime9{background-color:#9e9d24!important}.lime10{background-color:#827717!important}.yellow,.yellow6{background-color:#ffeb3b!important}.yellow-border{border-color:#ffeb3b!important}.yellow-text{color:#ffeb3b!important}.yellow1{background-color:#fffde7!important}.yellow2{background-color:#fff9c4!important}.yellow3{background-color:#fff59d!important}.yellow4{background-color:#fff176!important}.yellow5{background-color:#ffee58!important}.yellow7{background-color:#fdd835!important}.yellow8{background-color:#fbc02d!important}.yellow9{background-color:#f9a825!important}.yellow10{background-color:#f57f17!important}.amber,.amber6{background-color:#ffc107!important}.amber-border{border-color:#ffc107!important}.amber-text{color:#ffc107!important}.amber1{background-color:#fff8e1!important}.amber2{background-color:#ffecb3!important}.amber3{background-color:#ffe082!important}.amber4{background-color:#ffd54f!important}.amber5{background-color:#ffca28!important}.amber7{background-color:#ffb300!important}.amber8{background-color:#ffa000!important}.amber9{background-color:#ff8f00!important}.amber10{background-color:#ff6f00!important}.orange,.orange6{background-color:#ff9800!important}.orange-border{border-color:#ff9800!important}.orange-text{color:#ff9800!important}.orange1{background-color:#fff3e0!important}.orange2{background-color:#ffe0b2!important}.orange3{background-color:#ffcc80!important}.orange4{background-color:#ffb74d!important}.orange5{background-color:#ffa726!important}.orange7{background-color:#fb8c00!important}.orange8{background-color:#f57c00!important}.orange9{background-color:#ef6c00!important}.orange10{background-color:#e65100!important}.deep-orange,.deep-orange6{background-color:#ff5722!important}.deep-orange-border{border-color:#ff5722!important}.deep-orange-text{color:#ff5722!important}.deep-orange1{background-color:#fbe9e7!important}.deep-orange2{background-color:#ffccbc!important}.deep-orange3{background-color:#ffab91!important}.deep-orange4{background-color:#ff8a65!important}.deep-orange5{background-color:#ff7043!important}.deep-orange7{background-color:#f4511e!important}.deep-orange8{background-color:#e64a19!important}.deep-orange9{background-color:#d84315!important}.deep-orange10{background-color:#bf360c!important}.brown,.brown6{background-color:#795548!important}.brown-border{border-color:#795548!important}.brown-text{color:#795548!important}.brown1{background-color:#efebe9!important}.brown2{background-color:#d7ccc8!important}.brown3{background-color:#bcaaa4!important}.brown4{background-color:#a1887f!important}.brown5{background-color:#8d6e63!important}.brown7{background-color:#6d4c41!important}.brown8{background-color:#5d4037!important}.brown9{background-color:#4e342e!important}.brown10{background-color:#3e2723!important}.blue-grey,.blue-grey6{background-color:#607d8b!important}.blue-grey-border{border-color:#607d8b!important}.blue-grey-text{color:#607d8b!important}.blue-grey1{background-color:#eceff1!important}.blue-grey2{background-color:#cfd8dc!important}.blue-grey3{background-color:#b0bec5!important}.blue-grey4{background-color:#90a4ae!important}.blue-grey5{background-color:#78909c!important}.blue-grey7{background-color:#546e7a!important}.blue-grey8{background-color:#455a64!important}.blue-grey9{background-color:#37474f!important}.blue-grey10{background-color:#263238!important}.grey,.grey6{background-color:#9e9e9e!important}.grey-border{border-color:#9e9e9e!important}.grey-text{color:#9e9e9e!important}.grey1{background-color:#fafafa!important}.grey2{background-color:#f5f5f5!important}.grey3{background-color:#eee!important}.grey4{background-color:#e0e0e0!important}.grey5{background-color:#bdbdbd!important}.grey7{background-color:#757575!important}.grey8{background-color:#616161!important}.grey9{background-color:#424242!important}.grey10{background-color:#212121!important}:root{--eox-theme-light-background:253, 252, 255;--eox-theme-light-code:245, 245, 245;--eox-theme-light-error-container:255, 218, 214;--eox-theme-light-error:186, 26, 26;--eox-theme-light-inverse-on-surface:240, 240, 245;--eox-theme-light-inverse-primary:158, 202, 255;--eox-theme-light-inverse-surface:46, 48, 52;--eox-theme-light-kbd:33, 37, 41;--eox-theme-light-neutral-palette-key-color:117, 119, 123;--eox-theme-light-neutral-variant-palette-key-color:114, 119, 128;--eox-theme-light-on-background:0, 0, 0;--eox-theme-light-on-code:0, 0, 0;--eox-theme-light-on-error-container:65, 0, 2;--eox-theme-light-on-error:255, 255, 255;--eox-theme-light-on-inverse-on-surface:0, 0, 0;--eox-theme-light-on-inverse-primary:0, 0, 0;--eox-theme-light-on-inverse-surface:255, 255, 255;--eox-theme-light-on-kbd:255, 255, 255;--eox-theme-light-on-neutral-palette-key-color:255, 255, 255;--eox-theme-light-on-neutral-variant-palette-key-color:255, 255, 255;--eox-theme-light-on-outline-variant:0, 0, 0;--eox-theme-light-on-outline:255, 255, 255;--eox-theme-light-on-primary-container:0, 29, 54;--eox-theme-light-on-primary-fixed-dim:0, 0, 0;--eox-theme-light-on-primary-fixed-variant:16, 73, 120;--eox-theme-light-on-primary-fixed:0, 29, 54;--eox-theme-light-on-primary-palette-key-color:255, 255, 255;--eox-theme-light-on-primary:255, 255, 255;--eox-theme-light-on-scrim:255, 255, 255;--eox-theme-light-on-secondary-container:0, 31, 40;--eox-theme-light-on-secondary-fixed-dim:0, 0, 0;--eox-theme-light-on-secondary-fixed-variant:15, 77, 95;--eox-theme-light-on-secondary-fixed:0, 31, 40;--eox-theme-light-on-secondary-palette-key-color:255, 255, 255;--eox-theme-light-on-secondary:255, 255, 255;--eox-theme-light-on-shadow:255, 255, 255;--eox-theme-light-on-surface-bright:0, 0, 0;--eox-theme-light-on-surface-container-high:0, 0, 0;--eox-theme-light-on-surface-container-highest:0, 0, 0;--eox-theme-light-on-surface-container-low:0, 0, 0;--eox-theme-light-on-surface-container-lowest:0, 0, 0;--eox-theme-light-on-surface-container:0, 0, 0;--eox-theme-light-on-surface-dim:0, 0, 0;--eox-theme-light-on-surface-light:0, 0, 0;--eox-theme-light-on-surface-tint:255, 255, 255;--eox-theme-light-on-surface:26, 28, 31;--eox-theme-light-on-tertiary-container:17, 19, 79;--eox-theme-light-on-tertiary-fixed-dim:0, 0, 0;--eox-theme-light-on-tertiary-fixed-variant:62, 65, 124;--eox-theme-light-on-tertiary-fixed:17, 19, 79;--eox-theme-light-on-tertiary-palette-key-color:255, 255, 255;--eox-theme-light-on-tertiary:255, 255, 255;--eox-theme-light-outline-variant:194, 199, 208;--eox-theme-light-outline:114, 119, 128;--eox-theme-light-primary-container:209, 228, 255;--eox-theme-light-primary-fixed-dim:158, 202, 255;--eox-theme-light-primary-fixed:209, 228, 255;--eox-theme-light-primary-palette-key-color:0, 65, 112;--eox-theme-light-primary:0, 65, 112;--eox-theme-light-scrim:0, 0, 0;--eox-theme-light-secondary-container:184, 234, 255;--eox-theme-light-secondary-fixed-dim:154, 206, 228;--eox-theme-light-secondary-fixed:184, 234, 255;--eox-theme-light-secondary-palette-key-color:0, 69, 87;--eox-theme-light-secondary:47, 101, 120;--eox-theme-light-shadow:0, 0, 0;--eox-theme-light-surface-bright:250, 249, 252;--eox-theme-light-surface-container-high:231, 232, 236;--eox-theme-light-surface-container-highest:226, 226, 231;--eox-theme-light-surface-container-low:243, 243, 248;--eox-theme-light-surface-container-lowest:255, 255, 255;--eox-theme-light-surface-container:237, 237, 242;--eox-theme-light-surface-dim:217, 218, 222;--eox-theme-light-surface-light:231, 232, 236;--eox-theme-light-surface-tint:49, 97, 146;--eox-theme-light-surface:250, 249, 252;--eox-theme-light-tertiary-container:225, 224, 255;--eox-theme-light-tertiary-fixed-dim:191, 193, 255;--eox-theme-light-tertiary-fixed:225, 224, 255;--eox-theme-light-tertiary-palette-key-color:54, 57, 116;--eox-theme-light-tertiary:86, 89, 150;--eox-theme-dark-background:26, 28, 30;--eox-theme-dark-code:52, 52, 52;--eox-theme-dark-error-container:147, 0, 10;--eox-theme-dark-error:255, 180, 171;--eox-theme-dark-inverse-on-surface:46, 48, 52;--eox-theme-dark-inverse-primary:49, 97, 146;--eox-theme-dark-inverse-surface:226, 226, 231;--eox-theme-dark-kbd:33, 37, 41;--eox-theme-dark-neutral-palette-key-color:117, 119, 123;--eox-theme-dark-neutral-variant-palette-key-color:114, 119, 128;--eox-theme-dark-on-background:255, 255, 255;--eox-theme-dark-on-code:204, 204, 204;--eox-theme-dark-on-error-container:255, 180, 171;--eox-theme-dark-on-error:105, 0, 5;--eox-theme-dark-on-inverse-on-surface:255, 255, 255;--eox-theme-dark-on-inverse-primary:158, 202, 255;--eox-theme-dark-on-inverse-surface:0, 0, 0;--eox-theme-dark-on-kbd:255, 255, 255;--eox-theme-dark-on-neutral-palette-key-color:255, 255, 255;--eox-theme-dark-on-neutral-variant-palette-key-color:255, 255, 255;--eox-theme-dark-on-outline-variant:255, 255, 255;--eox-theme-dark-on-outline:255, 255, 255;--eox-theme-dark-on-primary-container:209, 228, 255;--eox-theme-dark-on-primary-fixed-dim:0, 0, 0;--eox-theme-dark-on-primary-fixed-variant:16, 73, 120;--eox-theme-dark-on-primary-fixed:0, 29, 54;--eox-theme-dark-on-primary-palette-key-color:255, 255, 255;--eox-theme-dark-on-primary:0, 50, 88;--eox-theme-dark-on-scrim:255, 255, 255;--eox-theme-dark-on-secondary-container:184, 234, 255;--eox-theme-dark-on-secondary-fixed-dim:0, 0, 0;--eox-theme-dark-on-secondary-fixed-variant:15, 77, 95;--eox-theme-dark-on-secondary-fixed:0, 31, 40;--eox-theme-dark-on-secondary-palette-key-color:255, 255, 255;--eox-theme-dark-on-secondary:0, 53, 68;--eox-theme-dark-on-shadow:255, 255, 255;--eox-theme-dark-on-surface-bright:255, 255, 255;--eox-theme-dark-on-surface-container-high:255, 255, 255;--eox-theme-dark-on-surface-container-highest:255, 255, 255;--eox-theme-dark-on-surface-container-low:255, 255, 255;--eox-theme-dark-on-surface-container-lowest:255, 255, 255;--eox-theme-dark-on-surface-container:255, 255, 255;--eox-theme-dark-on-surface-dim:255, 255, 255;--eox-theme-dark-on-surface-light:255, 255, 255;--eox-theme-dark-on-surface-tint:0, 0, 0;--eox-theme-dark-on-surface:226, 226, 231;--eox-theme-dark-on-tertiary-container:225, 224, 255;--eox-theme-dark-on-tertiary-fixed-dim:0, 0, 0;--eox-theme-dark-on-tertiary-fixed-variant:62, 65, 124;--eox-theme-dark-on-tertiary-fixed:17, 19, 79;--eox-theme-dark-on-tertiary-palette-key-color:255, 255, 255;--eox-theme-dark-on-tertiary:39, 42, 100;--eox-theme-dark-outline-variant:66, 71, 79;--eox-theme-dark-outline:140, 145, 154;--eox-theme-dark-primary-container:16, 73, 120;--eox-theme-dark-primary-fixed-dim:158, 202, 255;--eox-theme-dark-primary-fixed-variant:209, 228, 255;--eox-theme-dark-primary-fixed:209, 228, 255;--eox-theme-dark-primary-palette-key-color:0, 65, 112;--eox-theme-dark-primary:158, 202, 255;--eox-theme-dark-scrim:0, 0, 0;--eox-theme-dark-secondary-container:15, 77, 95;--eox-theme-dark-secondary-fixed-dim:154, 206, 228;--eox-theme-dark-secondary-fixed-variant:184, 234, 255;--eox-theme-dark-secondary-fixed:184, 234, 255;--eox-theme-dark-secondary-palette-key-color:0, 69, 87;--eox-theme-dark-secondary:154, 206, 228;--eox-theme-dark-shadow:0, 0, 0;--eox-theme-dark-surface-bright:56, 57, 60;--eox-theme-dark-surface-container-high:40, 42, 46;--eox-theme-dark-surface-container-highest:51, 53, 56;--eox-theme-dark-surface-container-low:26, 28, 31;--eox-theme-dark-surface-container-lowest:12, 14, 17;--eox-theme-dark-surface-container:30, 32, 35;--eox-theme-dark-surface-dim:17, 19, 23;--eox-theme-dark-surface-light:55, 57, 61;--eox-theme-dark-surface-tint:158, 202, 255;--eox-theme-dark-surface:18, 19, 22;--eox-theme-dark-tertiary-container:62, 65, 124;--eox-theme-dark-tertiary-fixed-dim:191, 193, 255;--eox-theme-dark-tertiary-fixed-variant:225, 224, 255;--eox-theme-dark-tertiary-fixed:225, 224, 255;--eox-theme-dark-tertiary-palette-key-color:54, 57, 116;--eox-theme-dark-tertiary:191, 193, 255;--eox-slider-thumb-height:20px;--eox-slider-thumb-width:20px;--eox-slider-track-height:6px;--eox-slider-track-color:var(--outline-variant);--eox-slider-brightness-hover:100%;--eox-slider-brightness-down:100%;--eox-slider-clip-edges:4px;--eox-slider-margin:1.125rem}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input){color:var(--primary);background:0 0;width:100%;font-size:1.5rem;overflow:hidden}input[type=range]:not(.slider input[type=range]){margin:var(--eox-slider-margin);width:100%}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):active{cursor:grabbing}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):disabled{filter:grayscale();opacity:.3;cursor:not-allowed}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input){-webkit-appearance:none;height:var(--eox-slider-thumb-height);transition:all .1s}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-webkit-slider-runnable-track{-webkit-appearance:none;height:var(--eox-slider-thumb-height);transition:all .1s}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-webkit-slider-thumb{-webkit-appearance:none;height:var(--eox-slider-thumb-height);transition:all .1s}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-webkit-slider-runnable-track{position:relative}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-webkit-slider-thumb{position:relative}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-webkit-slider-runnable-track{border-radius:var(--eox-slider-track-height)}input[type=range]:not(.slider input)::-webkit-slider-thumb{--thumb-radius:calc((var(--eox-slider-thumb-height) * .5) - 1px);--clip-top:calc((var(--eox-slider-thumb-height) - var(--eox-slider-track-height)) * .5 - .5px);--clip-bottom:calc(var(--eox-slider-thumb-height) - var(--clip-top));--clip-further:calc(100% + 1px);--box-fill:calc(-100vmax - var(--eox-slider-thumb-width,var(--eox-slider-thumb-height))) 0 0 100vmax currentColor;width:var(--eox-slider-thumb-width,var(--eox-slider-thumb-height));background:linear-gradient(currentColor 0 0) scroll no-repeat left center / 50% calc(var(--eox-slider-track-height) + 1px);box-shadow:var(--box-fill);border-radius:var(--eox-slider-thumb-width,var(--eox-slider-thumb-height));filter:brightness();clip-path:polygon(100% -1px,var(--eox-slider-clip-edges) -1px,0 var(--clip-top),-100vmax var(--clip-top),-100vmax var(--clip-bottom),0 var(--clip-bottom),var(--eox-slider-clip-edges) 100%,var(--clip-further) var(--clip-further));background-color:currentColor}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):hover::-webkit-slider-thumb{filter:brightness(var(--eox-slider-brightness-hover));cursor:grab}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):active::-webkit-slider-thumb{filter:brightness(var(--eox-slider-brightness-down));cursor:grabbing}input[type=range]:not(.slider input)::-webkit-slider-runnable-track{background:linear-gradient(var(--eox-slider-track-color) 0 0) scroll no-repeat center / 100% calc(var(--eox-slider-track-height) + 1px)}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):disabled::-webkit-slider-thumb{cursor:not-allowed}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input){appearance:none;height:var(--eox-slider-thumb-height);transition:all .1s}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-track{appearance:none;height:var(--eox-slider-thumb-height);transition:all .1s}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-thumb{appearance:none;height:var(--eox-slider-thumb-height);transition:all .1s}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-track{background:#fff0}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-thumb{background:#fff0}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-progress{background:#fff0}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-thumb{width:var(--eox-slider-thumb-width,var(--eox-slider-thumb-height));border-radius:var(--eox-slider-thumb-width,var(--eox-slider-thumb-height));cursor:grab;background:currentColor;border:0}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):active::-moz-range-thumb{cursor:grabbing}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-track{background:var(--eox-slider-track-color);width:100%}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-progress{appearance:none;background:currentColor;transition-delay:30ms}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-track{height:calc(var(--eox-slider-track-height) + 1px);border-radius:var(--eox-slider-track-height)}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-progress{height:calc(var(--eox-slider-track-height) + 1px);border-radius:var(--eox-slider-track-height)}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-thumb{filter:brightness()}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input)::-moz-range-progress{filter:brightness()}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):hover::-moz-range-thumb{filter:brightness(var(--eox-slider-brightness-hover))}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):hover::-moz-range-progress{filter:brightness(var(--eox-slider-brightness-hover))}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):active::-moz-range-thumb{filter:brightness(var(--eox-slider-brightness-down))}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):active::-moz-range-progress{filter:brightness(var(--eox-slider-brightness-down))}input[type=range]:not(.slider.large input,.slider.small input,.slider.medium input,.slider.extra input):disabled::-moz-range-thumb{cursor:not-allowed}.slider.tiny{--_track:var(--eox-slider-track-height);margin:var(--eox-slider-margin);--_track-color:var(--eox-slider-track-color)!important}.slider.tiny:before{background:var(--eox-slider-track-color)}label.slider.tiny:before{height:var(--eox-slider-track-height);background:var(--outline-variant);clip-path:none}label.slider.tiny>span,.slider.tiny>input[type=range]+input[type=range]~span{height:var(--eox-slider-track-height);top:var(--eox-slider-track-height) - 1;clip-path:none}.slider.tiny>input[type=range]::-webkit-slider-thumb{box-shadow:unset;width:var(--eox-slider-thumb-width,var(--eox-slider-thumb-height));border-radius:var(--eox-slider-thumb-width,var(--eox-slider-thumb-height))}.slider.tiny>input[type=range]::-webkit-slider-runnable-track{background:unset}.slider.tiny>input[type=range]:not(:disabled):focus::-webkit-slider-thumb{transform:scaleX(1)}.slider.tiny>input:not(:disabled):focus::-moz-range-thumb{transform:scaleX(1)}.slider:before{clip-path:none!important}.slider>span:not([class]){z-index:1;pointer-events:none;inset:calc(50% - (var(--_track,0) / 2)) var(--_end) auto var(--_start)!important}tc-range-slider{--panel-bg-fill:var(--primary);--pointer-bg:var(--primary);--pointer-bg-focus:var(--primary);--pointer-bg-hover:var(--primary);--pointer-border:0;--pointer-border-focus:0;--pointer-border-hover:0;--pointer-width:var(--eox-slider-thumb-width,var(--eox-slider-thumb-height));--pointer-height:var(--eox-slider-thumb-width,var(--eox-slider-thumb-height));--pointer-shadow:0 3px 4px #0003;--pointer-shadow-hover:0 0 0 10px #0000000a;--height:var(--eox-slider-track-height);--width:100%;--panel-bg-border-radius:var(--eox-slider-track-height);--panel-bg:var(--eox-slider-track-color);--panel-bg-hover:var(--eox-slider-track-color);margin:calc(var(--eox-slider-margin) + var(--eox-slider-thumb-height)) var(--eox-slider-margin);display:block}.v-slider.v-input--horizontal{margin:var(--eox-slider-margin)}.v-slider.v-input--horizontal .v-slider-track{height:calc(var(--eox-slider-track-height) + 2px)!important;--v-slider-track-size:var(--eox-slider-track-height)!important}.v-slider-track .v-slider-track__background{background-color:var(--eox-slider-track-color)!important}.v-slider-track__fill.bg-primary{background-color:var(--primary)!important;height:calc(var(--eox-slider-track-height))!important}.v-slider-track__background--opacity{opacity:1}.v-slider-thumb__surface{background:var(--primary)}:root{--eox-body-font-family:Inter, Roboto, \"Helvetica Neue\", \"Arial Nova\", \"Nimbus Sans\", Noto Sans, Arial, sans-serif;--eox-header-font-family:var(--eox-body-font-family);--size:1rem;--font:var(--eox-body-font-family);--font-icon:\"Material Symbols Subset\";--speed1:.1s;--speed2:.2s;--speed3:.3s;--speed4:.4s;--active:#80808031;--overlay:#00000080;--elevate1:0 .125rem .125rem 0 #00000052;--elevate2:0 .25rem .5rem 0 #0006;--elevate3:0 .375rem .75rem 0 #0000007a;--top:env(safe-area-inset-top);--bottom:env(safe-area-inset-bottom);--left:env(safe-area-inset-left);--right:env(safe-area-inset-right)}*{font-family:var(--eox-body-font-family)}h1,h2,h3,h4,h5,h6{font-family:var(--eox-header-font-family)}:root,body.light{--primary:rgb(var(--eox-theme-light-primary));--on-primary:rgb(var(--eox-theme-light-on-primary));--primary-container:rgb(var(--eox-theme-light-primary-container));--on-primary-container:#001d36;--secondary:rgb(var(--eox-theme-light-secondary));--on-secondary:rgb(var(--eox-theme-light-on-secondary));--secondary-container:#d7e3f7;--on-secondary-container:#101c2b;--tertiary:rgb(var(--eox-theme-light-tertiary));--on-tertiary:rgb(var(--eox-theme-light-on-tertiary));--tertiary-container:#f2daff;--on-tertiary-container:#251431;--error:rgb(var(--eox-theme-light-error));--on-error:rgb(var(--eox-theme-light-on-error));--error-container:#ffdad6;--on-error-container:#410002;--background:rgb(var(--eox-theme-light-background));--on-background:#1a1c1e;--surface:rgb(var(--eox-theme-light-surface));--on-surface:rgb(var(--eox-theme-light-on-surface));--surface-variant:#dfe2eb;--on-surface-variant:#43474e;--outline:rgb(var(--eox-theme-light-outline));--outline-variant:rgb(var(--eox-theme-light-outline-variant));--shadow:#000;--scrim:#000;--inverse-surface:#2f3033;--inverse-on-surface:#f1f0f4;--inverse-primary:#9ecaff;--surface-dim:rgb(var(--eox-theme-light-surface-dim));--surface-bright:rgb(var(--eox-theme-light-surface-bright));--surface-container-lowest:#fff;--surface-container-low:#f4f3f7;--surface-container:#eeedf1;--surface-container-high:#e8e8eb;--surface-container-highest:#e2e2e6}body.dark{--primary:rgb(var(--eox-theme-dark-primary));--on-primary:rgb(var(--eox-theme-dark-on-primary));--primary-container:rgb(var(--eox-theme-dark-primary-container));--on-primary-container:#d1e4ff;--secondary:rgb(var(--eox-theme-dark-secondary));--secondary-container:#3b4858;--on-secondary-container:rgb(var(--eox-theme-dark-on-secondary-container));--tertiary:rgb(var(--eox-theme-dark-tertiary));--on-tertiary:rgb(var(--eox-theme-dark-on-tertiary));--tertiary-container:#523f5f;--on-tertiary-container:#f2daff;--error:rgb(var(--eox-theme-dark-error));--on-error:rgb(var(--eox-theme-dark-on-error));--error-container:#93000a;--on-error-container:#ffb4ab;--background:rgb(var(--eox-theme-dark-background));--on-background:#e2e2e6;--surface:rgb(var(--eox-theme-dark-surface));--on-surface:rgb(var(--eox-theme-dark-on-surface));--surface-variant:#43474e;--on-surface-variant:#c3c7cf;--outline:rgb(var(--eox-theme-dark-outline));--outline-variant:rgb(var(--eox-theme-dark-outline-variant));--shadow:#000;--scrim:#000;--inverse-surface:#e2e2e6;--inverse-on-surface:#2f3033;--inverse-primary:#0161a3;--surface-dim:rgb(var(--eox-theme-dark-surface-dim));--surface-bright:rgb(var(--eox-theme-dark-surface-bright));--surface-container-lowest:#0d0e11;--surface-container-low:#1a1c1e;--surface-container:#1e2022;--surface-container-high:#282a2d;--surface-container-highest:#333538}.list.no-space>li,.list.no-space>li>details>summary{min-block-size:0;padding:0 1rem}:is(.checkbox,.radio,.switch).small{--_size:1.2rem}:is(.checkbox,.radio):hover>input:not(:disabled)+span:after,:is(.checkbox,.radio)>input:not(:disabled):focus+span:after{box-shadow:0 0 0 .4rem}:is(.checkbox,.radio,.switch):is(.no-round,.square)>span:before,:is(.checkbox,.radio,.switch):is(.no-round,.square)>span>i,:is(.checkbox,.radio):is(.no-round,.square)>span:after{border-radius:.15rem}.scroll::-webkit-scrollbar{background:0 0;block-size:.4rem;inline-size:.4rem}.scroll::-webkit-scrollbar-thumb{background:0 0;block-size:.4rem;inline-size:.4rem}.scroll::-webkit-scrollbar-button{background:0 0;block-size:.4rem;inline-size:.4rem}.scroll:is(:hover,:focus)::-webkit-scrollbar-thumb{background:var(--outline);border-radius:1rem}h1.tiny{font-size:2.6875rem}h2.tiny{font-size:1.9375rem}h3.tiny{font-size:1.375rem}h4.tiny{font-size:1.125rem}h5.tiny{font-size:.875rem}h6.tiny{font-size:.625rem}.link{text-decoration:underline}.link:hover{color:var(--on-primary-container)!important}details summary .rotate{transition:transform .3s}details[open]:not(.is-closing) summary .rotate{transform:rotate(180deg)}details.fast-animate summary .rotate{transition:transform .15s}details.slow-animate summary .rotate{transition:transform .5s}details.no-animate summary .rotate{transition:none}";
//#endregion
//#region src/style.eox.js
(() => {
	let e = "eox-elements";
	if (!document.head.querySelector(`style#${e}`)) {
		let t = new CSSStyleSheet();
		t.replaceSync(Ne);
		let n = Array.from(t.cssRules).filter((e) => e.cssText.includes(":root")).map((e) => e.cssText).join(" "), r = document.createElement("style");
		r.setAttribute("id", e), r.innerHTML = `
    @import url("https://eox.at/fonts/inter/inter.css");

    @font-face {
      font-family: "Material Symbols Subset";
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(https://cdn.jsdelivr.net/npm/@eox/ui@0.3.4/dist/material-symbols-subset.woff2) format("woff2");
    }
  
    eox-chart,
    eox-drawtools,
    eox-feedback,
    eox-geosearch,
    eox-itemfilter,
    eox-jsonform,
    eox-layercontrol,
    eox-map,
    eox-stacinfo,
    eox-storytelling,
    eox-timecontrol,
    eox-tour {
      font-family: var(--font);
      font-size: .875rem;
      line-height: 1.5rem;
      letter-spacing: .0313rem;
    }
    ${n}
  `, document.head.appendChild(r);
	}
})();
var Pe = `
${Ne}
.field {
  margin-block-end: 0;
}
.field>:is(input,textarea,select) {
  width: 100%;
}
.field.small>:is(input,textarea,select) {
  font-size: 0.75rem;
}

:host, :root {
  --primary-color: var(--primary);
  --secondary-color: var(--secondary);
  --item-color: color-mix(
    in srgb,
    var(--primary-color) 10%,
    transparent
  );
  --item-hover-color: color-mix(
    in srgb,
    var(--surface) 80%,
    transparent
  );
  --item-select-color: var(--surface-variant);
  --inline-bg-color: color-mix(
    in srgb,
    var(--secondary-color) 10%,
    transparent
  );
  --border-color: color-mix(
    in srgb,
    #000000 20%,
    transparent
  );
  --_background-color: var(--background-color, var(--eox-background-color, transparent));
  --_padding: var(--padding, 0.5rem);
  --_padding-vertical: var(--padding-vertical, 0.25rem);
  --_list-padding: var(--list-padding, 2rem);
  --_text-transform: var(--text-transform, capitalize);
  --_form-flex-direction: var(--form-flex-direction, column);
  --_filter-display: var(--filter-display, block);
  background-color: var(--_background-color);
  display: flex;
  flex-direction: column;
}
form#itemfilter {
  flex-direction: var(--_form-flex-direction);
  margin-top: 0;
}
eox-itemfilter-container {
  min-width: 200px;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;
  height: 100%;
}
eox-itemfilter-results {
  flex-grow: 1;
  overflow: hidden;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}
eox-itemfilter-results button.chip {
  pointer-events: none;
}
.list li {
  padding: 0 var(--_padding) !important;
}
.list.no-padding > li {
  padding: 0 !important;
}
li label {
  display: flex;
  align-items: center;
}
.title {
  text-transform: var(--_text-transform);
}
.title.highlight-enabled {
  text-transform: inherit;
}
.subtitle {
  opacity: .7;
}
.image {
  object-fit: cover;
  overflow: hidden;
}
.title-container {
  display: flex;
  flex-direction: column;
}
eox-itemfilter-expandcontainer {
  max-height: 400px;
  width: 100%;
}
eox-itemfilter-expandcontainer > [data-type=filter] {
  display: block;
  height: calc(100% - 32px);
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100%;
}
form#itemfilter.inline eox-itemfilter-expandcontainer {
  max-height: none;
}
form#itemfilter.inline eox-itemfilter-expandcontainer > [data-type=filter] {
  height: auto;
  overflow: visible;
}
[data-type=filter] .title,
details summary {
  text-transform: var(--_text-transform);
}
details summary nav {
  height: 32px;
}
details > summary {
  min-block-size: 0rem;
  padding: 0 var(--_padding);
  user-select: none;
}
details > summary i {
  transition: transform 0.1s ease-in-out;
}
details[open] > summary i {
  transform: rotate(90deg);
}
summary > * {
  pointer-events: all;
}
ul.multiselect.list > li,
ul.select.list > li,
details > div > ul#results.list > li {
  padding-left: var(--_list-padding) !important;
}
section:not(section:last-of-type) {
  margin-bottom: 1rem;
}
#section-results {
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 0;
}
#container-results {
  border-radius: none;
}
.no-results {
  padding-left: var(--_padding);
  padding-right: var(--_padding);
}
ul#results li:not(:hover) .result-action {
  display: none;
}
eox-layout {
  padding: var(--_padding-vertical) var(--_padding);
  gap: var(--card-gap, 16px);
  --column-width: var(--card-width, 300px);
  --row-height: var(--card-height, 200px);
}
eox-layout-item {
  position: relative;
  border-radius: var(--card-border-radius, 8px);
  cursor: pointer;
  transition: var(--card-transition);
  box-shadow: var(--card-box-shadow);
}
eox-layout-item:hover {
  transform: var(--card-hover-transform);
}
eox-layout-item > span {
  display: block;
  height: 100%;
}
eox-layout-item .image {
  width: 100%;
  height: 100%;
  transition: filter .3s ease-in-out;
  margin: 0;
}
eox-layout-item:hover .image {
  filter: brightness(.5);
}
eox-layout-item nav {
  height: 100%;
}
eox-layout-item .title-container {
  position: absolute;
  bottom: 0;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85),
    transparent
  );
  padding-top: 25px;
}
eox-layout-item .title {
  font-weight: bold;
  font-family: var(--card-title-font);
}
eox-layout-item .result-action {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #ffffffbb;
  padding: 8px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
ul#results eox-layout-item.highlighted .result-action > * {
  filter: none;
}
section {
  position: relative;
  background-color: var(--_background-color);
}
nav.title-nav {
  padding-left: var(--_padding);
  padding-right: var(--_padding);
}
eox-itemfilter-range {
  display: block;
  margin-left: var(--_list-padding);
  padding-right: var(--_padding);
}
.range-wrapper {
  margin-left: var(--_list-padding);
  padding-right: var(--_padding);
}
tc-range-slider {
  width: 100%;
  --width: 100%;
}
.range-labels {
  display: flex;
  justify-content: space-between;
}
.range-before,
.range-after {
  font-size: x-small;
}

.inline-content {
  max-height: 300px;
  overflow-y: auto;
  margin-top: 4px;
  padding: 8px;
}
.inline-container-wrapper {
  width: 100%;
  position: relative;
  height: var(--inline-container-height, auto);
}
.inline-container {
  position: relative;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  flex: 1;
  justify-content: space-between;
  cursor: text;
  transition: all 0.2s ease-in-out;
  display: flex;
  inline-size: 100%;
  block-size: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
[popover] {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  border: none;
}
.input-container {
  display: flex;
  flex: 1;
  align-items: center;
}
.input-container input,
.input-container input:focus {
  height: 100%;
  border: none;
  outline: none;
  border: 0;
  min-width: 25%;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 1px;
  top: 5px;
  height: calc(100% - 10px);
  width: 34px;
  background: white;
}
button.icon {
  color: #004170;
  height: 24px;
  font-size: large;
  width: unset;
}
-container-results::-webkit-scrollbar,
.inline-container::-webkit-scrollbar,
.inline-content::-webkit-scrollbar,
form#itemfilter > div::-webkit-scrollbar {
  inline-size: 0.4rem;
  block-size: 0.4rem;
}
-container-results::-webkit-scrollbar-thumb,
.inline-container::-webkit-scrollbar-thumb,
.inline-content::-webkit-scrollbar-thumb,
form#itemfilter > div::-webkit-scrollbar-thumb {
  background: lightgrey;
  border-radius: 1rem;
  cursor: default;
}
.inline-container:is(:hover,:focus)::-webkit-scrollbar-thumb,
.inline-content:is(:hover,:focus)::-webkit-scrollbar-thumb,
form#itemfilter > div:is(:hover,:focus)::-webkit-scrollbar-thumb {
  background: var(--outline);
}
form#itemfilter > div::-webkit-scrollbar-thumb {
  background: transparent; 
}
.hidden {
  height: 0;
  padding: 0;
  border: none;
}
.hidden:hover {
  border: none;
}
.autocomplete-container,
.text-container {
  position: relative;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  cursor: text;
}
.autocomplete-container .field input,
.text-container .field input {
  background: none !important;
  border-block-end-color: var(--outline);
  border-radius: 0 !important;
  box-shadow: none !important;
}
.autocomplete-container-wrapper,
.text-container-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.autocomplete-container-wrapper::-webkit-scrollbar {
  display: none;
}
.chip-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.chip-wrapper::-webkit-scrollbar {
  display: none;
  width: 0;
  background: transparent;
}
.autocomplete-input,
.text-input {
  flex: 1;
  border: 1px solid var(--border-color);
  outline: none;
  box-sizing: border-box;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  min-width: 150px;
}
input[type="text"].text-input,
input[type="text"].autocomplete-input {
  padding: 9px 6px !important;
  border-radius: 4px;
}
.text-input:invalid {
  border: 1px solid red;
}
.selected-items {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
}
.select li,
.multiselect li,
eox-itemfilter-results li {
  border-radius: .5rem !important;
  display: flex;
  justify-content: space-between;
  min-block-size: 32px !important;
}
.select li:hover,
.multiselect li:hover,
eox-itemfilter-results li:hover,
details summary:hover {
  background: var(--item-hover-color);
}
eox-itemfilter-results li.highlighted {
  background: var(--item-select-color);
}
mark.highlight {
  all: inherit;
  display: inline;
  background: yellow;
  color: black;
}
.selected-item span {
  margin-right: 8px;
}
.selected-item button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}
.multiselect-container,
.select-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.multiselect-container label,
.select-container label {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.multiselect-container input,
.select-container input {
  margin-right: 8px;
  max-width: 170px;
}
.select-overflow {
  max-height: calc(32px * var(--select-filter-max-items));
  overflow-y: auto;
}
.chip-title strong {
  font-weight: 500;
}
.chip-wrapper {
  max-width: 100%;
  overflow-x: scroll;
}
.chip-container {
  display: flex;
  flex: 0;
  align-items: center;
  height: var(--inline-container-height, auto);
}
.chip {
  white-space: nowrap;
  max-height: calc(var(--inline-container-height, auto) - .5rem);
}
.input-container.field {
  min-width: 10rem;
}
.input-container.dirty-filter-input {
  margin-left: 25px;
}
.error-validation {
  position: relative;
  color: #ba1a1a !important;
  font-size: x-small;
}
.row {
  display: flex;
  flex-direction: row;
  gap: 8px;
}
@media (prefers-color-scheme: dark) {
  .error-validation {
    color: #ffb4ab !important;
  }
}
input {
  background-color: var(--_background-color);
}
`, Fe = class extends H {
	static get properties() {
		return {
			filterObject: {
				attribute: !1,
				type: Object
			},
			unstyled: { type: Boolean }
		};
	}
	constructor() {
		super(), this.filterObject = {}, this.unstyled = !1;
	}
	#e(e) {
		this.dispatchEvent(new CustomEvent("details-toggled", {
			detail: e,
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return z`
      <style>
        ${!this.unstyled && Pe}
      </style>

      ${U(this.filterObject.featured, () => z`<slot name="filter"></slot>`, () => z`<details
            @toggle="${this.#e}"
            class="details-filter max-width"
            ?open=${this.filterObject.expanded || B}
          >
            <summary class="square">
              <nav class="responsive tiny-space">
                <i class="small">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>chevron-right</title>
                    <path
                      d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                    />
                  </svg>
                </i>
                <span
                  class="title max"
                  style="${!this.filterObject.title && "text-transform: var(--text-transform)"}"
                >
                  ${this.filterObject.title || this.filterObject.key || "Filter"}
                </span>
                <slot name="reset-button"></slot>
              </nav>
            </summary>
            <div>
              <slot name="filter"></slot>
            </div>
          </details>`)}
    `;
	}
};
customElements.define("eox-itemfilter-expandcontainer", Fe);
//#endregion
//#region ../../node_modules/fuse.js/dist/fuse.mjs
function W(e) {
	return Array.isArray ? Array.isArray(e) : Ue(e) === "[object Array]";
}
function Ie(e) {
	if (typeof e == "string") return e;
	if (typeof e == "bigint") return e.toString();
	let t = e + "";
	return t == "0" && 1 / e == -Infinity ? "-0" : t;
}
function Le(e) {
	return e == null ? "" : Ie(e);
}
function G(e) {
	return typeof e == "string";
}
function Re(e) {
	return typeof e == "number";
}
function ze(e) {
	return e === !0 || e === !1 || Ve(e) && Ue(e) == "[object Boolean]";
}
function Be(e) {
	return typeof e == "object";
}
function Ve(e) {
	return Be(e) && e !== null;
}
function K(e) {
	return e != null;
}
function He(e) {
	return !e.trim().length;
}
function Ue(e) {
	return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
var We = "Incorrect 'index' type", Ge = (e) => `Invalid value for key ${e}`, Ke = (e) => `Pattern length exceeds max of ${e}.`, qe = (e) => `Missing ${e} property in key`, Je = (e) => `Property 'weight' in key '${e}' must be a positive integer`, Ye = Object.prototype.hasOwnProperty, Xe = class {
	constructor(e) {
		this._keys = [], this._keyMap = {};
		let t = 0;
		e.forEach((e) => {
			let n = Ze(e);
			this._keys.push(n), this._keyMap[n.id] = n, t += n.weight;
		}), this._keys.forEach((e) => {
			e.weight /= t;
		});
	}
	get(e) {
		return this._keyMap[e];
	}
	keys() {
		return this._keys;
	}
	toJSON() {
		return JSON.stringify(this._keys);
	}
};
function Ze(e) {
	let t = null, n = null, r = null, i = 1, a = null;
	if (G(e) || W(e)) r = e, t = Qe(e), n = $e(e);
	else {
		if (!Ye.call(e, "name")) throw Error(qe("name"));
		let o = e.name;
		if (r = o, Ye.call(e, "weight") && (i = e.weight, i <= 0)) throw Error(Je(o));
		t = Qe(o), n = $e(o), a = e.getFn;
	}
	return {
		path: t,
		id: n,
		weight: i,
		src: r,
		getFn: a
	};
}
function Qe(e) {
	return W(e) ? e : e.split(".");
}
function $e(e) {
	return W(e) ? e.join(".") : e;
}
function et(e, t) {
	let n = [], r = !1, i = (e, t, a, o) => {
		if (K(e)) if (!t[a]) n.push(o === void 0 ? e : {
			v: e,
			i: o
		});
		else {
			let s = e[t[a]];
			if (!K(s)) return;
			if (a === t.length - 1 && (G(s) || Re(s) || ze(s) || typeof s == "bigint")) n.push(o === void 0 ? Le(s) : {
				v: Le(s),
				i: o
			});
			else if (W(s)) {
				r = !0;
				for (let e = 0, n = s.length; e < n; e += 1) i(s[e], t, a + 1, e);
			} else t.length && i(s, t, a + 1, o);
		}
	};
	return i(e, G(t) ? t.split(".") : t, 0), r ? n : n[0];
}
var tt = {
	includeMatches: !1,
	findAllMatches: !1,
	minMatchCharLength: 1
}, nt = {
	isCaseSensitive: !1,
	ignoreDiacritics: !1,
	includeScore: !1,
	keys: [],
	shouldSort: !0,
	sortFn: (e, t) => e.score === t.score ? e.idx < t.idx ? -1 : 1 : e.score < t.score ? -1 : 1
}, rt = {
	location: 0,
	threshold: .6,
	distance: 100
}, it = {
	useExtendedSearch: !1,
	useTokenSearch: !1,
	getFn: et,
	ignoreLocation: !1,
	ignoreFieldNorm: !1,
	fieldNormWeight: 1
}, q = Object.freeze({
	...nt,
	...tt,
	...rt,
	...it
}), at = /[^ ]+/g;
function ot(e = 1, t = 3) {
	let n = /* @__PURE__ */ new Map(), r = 10 ** t;
	return {
		get(t) {
			let i = t.match(at).length;
			if (n.has(i)) return n.get(i);
			let a = 1 / i ** (.5 * e), o = parseFloat(Math.round(a * r) / r);
			return n.set(i, o), o;
		},
		clear() {
			n.clear();
		}
	};
}
var st = class {
	constructor({ getFn: e = q.getFn, fieldNormWeight: t = q.fieldNormWeight } = {}) {
		this.norm = ot(t, 3), this.getFn = e, this.isCreated = !1, this.docs = [], this.keys = [], this._keysMap = {}, this.setIndexRecords();
	}
	setSources(e = []) {
		this.docs = e;
	}
	setIndexRecords(e = []) {
		this.records = e;
	}
	setKeys(e = []) {
		this.keys = e, this._keysMap = {}, e.forEach((e, t) => {
			this._keysMap[e.id] = t;
		});
	}
	create() {
		this.isCreated || !this.docs.length || (this.isCreated = !0, G(this.docs[0]) ? this.docs.forEach((e, t) => {
			this._addString(e, t);
		}) : this.docs.forEach((e, t) => {
			this._addObject(e, t);
		}), this.norm.clear());
	}
	add(e) {
		let t = this.size();
		G(e) ? this._addString(e, t) : this._addObject(e, t);
	}
	removeAt(e) {
		this.records.splice(e, 1);
		for (let t = e, n = this.size(); t < n; t += 1) --this.records[t].i;
	}
	removeAll(e) {
		for (let t = e.length - 1; t >= 0; --t) this.records.splice(e[t], 1);
		for (let e = 0, t = this.records.length; e < t; e += 1) this.records[e].i = e;
	}
	getValueForItemAtKeyId(e, t) {
		return e[this._keysMap[t]];
	}
	size() {
		return this.records.length;
	}
	_addString(e, t) {
		if (!K(e) || He(e)) return;
		let n = {
			v: e,
			i: t,
			n: this.norm.get(e)
		};
		this.records.push(n);
	}
	_addObject(e, t) {
		let n = {
			i: t,
			$: {}
		};
		this.keys.forEach((t, r) => {
			let i = t.getFn ? t.getFn(e) : this.getFn(e, t.path);
			if (K(i)) {
				if (W(i)) {
					let e = [];
					for (let t = 0, n = i.length; t < n; t += 1) {
						let n = i[t];
						if (K(n)) {
							if (G(n)) {
								if (!He(n)) {
									let r = {
										v: n,
										i: t,
										n: this.norm.get(n)
									};
									e.push(r);
								}
							} else if (K(n.v)) {
								let t = G(n.v) ? n.v : Le(n.v);
								if (!He(t)) {
									let r = {
										v: t,
										i: n.i,
										n: this.norm.get(t)
									};
									e.push(r);
								}
							}
						}
					}
					n.$[r] = e;
				} else if (G(i) && !He(i)) {
					let e = {
						v: i,
						n: this.norm.get(i)
					};
					n.$[r] = e;
				}
			}
		}), this.records.push(n);
	}
	toJSON() {
		return {
			keys: this.keys.map(({ getFn: e, ...t }) => t),
			records: this.records
		};
	}
};
function ct(e, t, { getFn: n = q.getFn, fieldNormWeight: r = q.fieldNormWeight } = {}) {
	let i = new st({
		getFn: n,
		fieldNormWeight: r
	});
	return i.setKeys(e.map(Ze)), i.setSources(t), i.create(), i;
}
function lt(e, { getFn: t = q.getFn, fieldNormWeight: n = q.fieldNormWeight } = {}) {
	let { keys: r, records: i } = e, a = new st({
		getFn: t,
		fieldNormWeight: n
	});
	return a.setKeys(r), a.setIndexRecords(i), a;
}
function ut(e = [], t = q.minMatchCharLength) {
	let n = [], r = -1, i = -1, a = 0;
	for (let o = e.length; a < o; a += 1) {
		let o = e[a];
		o && r === -1 ? r = a : !o && r !== -1 && (i = a - 1, i - r + 1 >= t && n.push([r, i]), r = -1);
	}
	return e[a - 1] && a - r >= t && n.push([r, a - 1]), n;
}
var J = 32;
function Y(e, t, n, { location: r = q.location, distance: i = q.distance, threshold: a = q.threshold, findAllMatches: o = q.findAllMatches, minMatchCharLength: s = q.minMatchCharLength, includeMatches: c = q.includeMatches, ignoreLocation: l = q.ignoreLocation } = {}) {
	if (t.length > J) throw Error(Ke(J));
	let u = t.length, d = e.length, f = Math.max(0, Math.min(r, d)), p = a, m = f, h = (e, t) => {
		let n = e / u;
		if (l) return n;
		let r = Math.abs(f - t);
		return i ? n + r / i : r ? 1 : n;
	}, g = s > 1 || c, _ = g ? Array(d) : [], v;
	for (; (v = e.indexOf(t, m)) > -1;) {
		let e = h(0, v);
		if (p = Math.min(e, p), m = v + u, g) {
			let e = 0;
			for (; e < u;) _[v + e] = 1, e += 1;
		}
	}
	m = -1;
	let y = [], b = 1, x = u + d, S = 1 << u - 1;
	for (let t = 0; t < u; t += 1) {
		let r = 0, i = x;
		for (; r < i;) h(t, f + i) <= p ? r = i : x = i, i = Math.floor((x - r) / 2 + r);
		x = i;
		let a = Math.max(1, f - i + 1), s = o ? d : Math.min(f + i, d) + u, c = Array(s + 2);
		c[s + 1] = (1 << t) - 1;
		for (let r = s; r >= a; --r) {
			let i = r - 1, o = n[e[i]];
			if (g && (_[i] = +!!o), c[r] = (c[r + 1] << 1 | 1) & o, t && (c[r] |= (y[r + 1] | y[r]) << 1 | 1 | y[r + 1]), c[r] & S && (b = h(t, i), b <= p)) {
				if (p = b, m = i, m <= f) break;
				a = Math.max(1, 2 * f - m);
			}
		}
		if (h(t + 1, f) > p) break;
		y = c;
	}
	let C = {
		isMatch: m >= 0,
		score: Math.max(.001, b)
	};
	if (g) {
		let e = ut(_, s);
		e.length ? c && (C.indices = e) : C.isMatch = !1;
	}
	return C;
}
function dt(e) {
	let t = {};
	for (let n = 0, r = e.length; n < r; n += 1) {
		let i = e.charAt(n);
		t[i] = (t[i] || 0) | 1 << r - n - 1;
	}
	return t;
}
function ft(e) {
	if (e.length <= 1) return e;
	e.sort((e, t) => e[0] - t[0] || e[1] - t[1]);
	let t = [e[0]];
	for (let n = 1, r = e.length; n < r; n += 1) {
		let r = t[t.length - 1], i = e[n];
		i[0] <= r[1] + 1 ? r[1] = Math.max(r[1], i[1]) : t.push(i);
	}
	return t;
}
var pt = {
	ł: "l",
	Ł: "L",
	đ: "d",
	Đ: "D",
	ø: "o",
	Ø: "O",
	ħ: "h",
	Ħ: "H",
	ŧ: "t",
	Ŧ: "T",
	ı: "i",
	ß: "ss"
}, mt = RegExp("[" + Object.keys(pt).join("") + "]", "g"), ht = String.prototype.normalize ? (e) => e.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "").replace(mt, (e) => pt[e]) : (e) => e, gt = class {
	constructor(e, { location: t = q.location, threshold: n = q.threshold, distance: r = q.distance, includeMatches: i = q.includeMatches, findAllMatches: a = q.findAllMatches, minMatchCharLength: o = q.minMatchCharLength, isCaseSensitive: s = q.isCaseSensitive, ignoreDiacritics: c = q.ignoreDiacritics, ignoreLocation: l = q.ignoreLocation } = {}) {
		if (this.options = {
			location: t,
			threshold: n,
			distance: r,
			includeMatches: i,
			findAllMatches: a,
			minMatchCharLength: o,
			isCaseSensitive: s,
			ignoreDiacritics: c,
			ignoreLocation: l
		}, e = s ? e : e.toLowerCase(), e = c ? ht(e) : e, this.pattern = e, this.chunks = [], !this.pattern.length) return;
		let u = (e, t) => {
			this.chunks.push({
				pattern: e,
				alphabet: dt(e),
				startIndex: t
			});
		}, d = this.pattern.length;
		if (d > J) {
			let e = 0, t = d % J, n = d - t;
			for (; e < n;) u(this.pattern.substr(e, J), e), e += J;
			if (t) {
				let e = d - J;
				u(this.pattern.substr(e), e);
			}
		} else u(this.pattern, 0);
	}
	searchIn(e) {
		let { isCaseSensitive: t, ignoreDiacritics: n, includeMatches: r } = this.options;
		if (e = t ? e : e.toLowerCase(), e = n ? ht(e) : e, this.pattern === e) {
			let t = {
				isMatch: !0,
				score: 0
			};
			return r && (t.indices = [[0, e.length - 1]]), t;
		}
		let { location: i, distance: a, threshold: o, findAllMatches: s, minMatchCharLength: c, ignoreLocation: l } = this.options, u = [], d = 0, f = !1;
		this.chunks.forEach(({ pattern: t, alphabet: n, startIndex: p }) => {
			let { isMatch: m, score: h, indices: g } = Y(e, t, n, {
				location: i + p,
				distance: a,
				threshold: o,
				findAllMatches: s,
				minMatchCharLength: c,
				includeMatches: r,
				ignoreLocation: l
			});
			m && (f = !0), d += h, m && g && u.push(...g);
		});
		let p = {
			isMatch: f,
			score: f ? d / this.chunks.length : 1
		};
		return f && r && (p.indices = ft(u)), p;
	}
}, _t = class {
	constructor(e) {
		this.pattern = e;
	}
	static isMultiMatch(e) {
		return vt(e, this.multiRegex);
	}
	static isSingleMatch(e) {
		return vt(e, this.singleRegex);
	}
	search(e) {
		return {
			isMatch: !1,
			score: 1
		};
	}
};
function vt(e, t) {
	let n = e.match(t);
	return n ? n[1] : null;
}
var yt = class extends _t {
	constructor(e) {
		super(e);
	}
	static get type() {
		return "exact";
	}
	static get multiRegex() {
		return /^="(.*)"$/;
	}
	static get singleRegex() {
		return /^=(.*)$/;
	}
	search(e) {
		let t = e === this.pattern;
		return {
			isMatch: t,
			score: +!t,
			indices: [0, this.pattern.length - 1]
		};
	}
}, bt = class extends _t {
	constructor(e) {
		super(e);
	}
	static get type() {
		return "inverse-exact";
	}
	static get multiRegex() {
		return /^!"(.*)"$/;
	}
	static get singleRegex() {
		return /^!(.*)$/;
	}
	search(e) {
		let t = e.indexOf(this.pattern) === -1;
		return {
			isMatch: t,
			score: +!t,
			indices: [0, e.length - 1]
		};
	}
}, xt = class extends _t {
	constructor(e) {
		super(e);
	}
	static get type() {
		return "prefix-exact";
	}
	static get multiRegex() {
		return /^\^"(.*)"$/;
	}
	static get singleRegex() {
		return /^\^(.*)$/;
	}
	search(e) {
		let t = e.startsWith(this.pattern);
		return {
			isMatch: t,
			score: +!t,
			indices: [0, this.pattern.length - 1]
		};
	}
}, St = class extends _t {
	constructor(e) {
		super(e);
	}
	static get type() {
		return "inverse-prefix-exact";
	}
	static get multiRegex() {
		return /^!\^"(.*)"$/;
	}
	static get singleRegex() {
		return /^!\^(.*)$/;
	}
	search(e) {
		let t = !e.startsWith(this.pattern);
		return {
			isMatch: t,
			score: +!t,
			indices: [0, e.length - 1]
		};
	}
}, Ct = class extends _t {
	constructor(e) {
		super(e);
	}
	static get type() {
		return "suffix-exact";
	}
	static get multiRegex() {
		return /^"(.*)"\$$/;
	}
	static get singleRegex() {
		return /^(.*)\$$/;
	}
	search(e) {
		let t = e.endsWith(this.pattern);
		return {
			isMatch: t,
			score: +!t,
			indices: [e.length - this.pattern.length, e.length - 1]
		};
	}
}, wt = class extends _t {
	constructor(e) {
		super(e);
	}
	static get type() {
		return "inverse-suffix-exact";
	}
	static get multiRegex() {
		return /^!"(.*)"\$$/;
	}
	static get singleRegex() {
		return /^!(.*)\$$/;
	}
	search(e) {
		let t = !e.endsWith(this.pattern);
		return {
			isMatch: t,
			score: +!t,
			indices: [0, e.length - 1]
		};
	}
}, Tt = class extends _t {
	constructor(e, { location: t = q.location, threshold: n = q.threshold, distance: r = q.distance, includeMatches: i = q.includeMatches, findAllMatches: a = q.findAllMatches, minMatchCharLength: o = q.minMatchCharLength, isCaseSensitive: s = q.isCaseSensitive, ignoreDiacritics: c = q.ignoreDiacritics, ignoreLocation: l = q.ignoreLocation } = {}) {
		super(e), this._bitapSearch = new gt(e, {
			location: t,
			threshold: n,
			distance: r,
			includeMatches: i,
			findAllMatches: a,
			minMatchCharLength: o,
			isCaseSensitive: s,
			ignoreDiacritics: c,
			ignoreLocation: l
		});
	}
	static get type() {
		return "fuzzy";
	}
	static get multiRegex() {
		return /^"(.*)"$/;
	}
	static get singleRegex() {
		return /^(.*)$/;
	}
	search(e) {
		return this._bitapSearch.searchIn(e);
	}
}, Et = class extends _t {
	constructor(e) {
		super(e);
	}
	static get type() {
		return "include";
	}
	static get multiRegex() {
		return /^'"(.*)"$/;
	}
	static get singleRegex() {
		return /^'(.*)$/;
	}
	search(e) {
		let t = 0, n, r = [], i = this.pattern.length;
		for (; (n = e.indexOf(this.pattern, t)) > -1;) t = n + i, r.push([n, t - 1]);
		let a = !!r.length;
		return {
			isMatch: a,
			score: +!a,
			indices: r
		};
	}
}, Dt = [
	yt,
	Et,
	xt,
	St,
	wt,
	Ct,
	bt,
	Tt
], Ot = Dt.length, kt = "\0", At = "|";
function jt(e) {
	let t = [], n = e.length, r = 0;
	for (; r < n;) {
		for (; r < n && e[r] === " ";) r++;
		if (r >= n) break;
		let i = r;
		for (; i < n && e[i] !== " " && e[i] !== "\"";) i++;
		if (i < n && e[i] === "\"") {
			for (i++; i < n;) {
				if (e[i] === "\"") {
					let t = i + 1;
					if (t >= n || e[t] === " ") {
						i++;
						break;
					}
					if (e[t] === "$" && (t + 1 >= n || e[t + 1] === " ")) {
						i += 2;
						break;
					}
				}
				i++;
			}
			t.push(e.substring(r, i)), r = i;
		} else {
			for (; i < n && e[i] !== " ";) i++;
			t.push(e.substring(r, i)), r = i;
		}
	}
	return t;
}
function Mt(e, t = {}) {
	return e.replace(/\\\|/g, kt).split(At).map((e) => {
		let n = jt(e.replace(/\u0000/g, "|").trim()).filter((e) => e && !!e.trim()), r = [];
		for (let e = 0, i = n.length; e < i; e += 1) {
			let i = n[e], a = !1, o = -1;
			for (; !a && ++o < Ot;) {
				let e = Dt[o], n = e.isMultiMatch(i);
				n && (r.push(new e(n, t)), a = !0);
			}
			if (!a) for (o = -1; ++o < Ot;) {
				let e = Dt[o], n = e.isSingleMatch(i);
				if (n) {
					r.push(new e(n, t));
					break;
				}
			}
		}
		return r;
	});
}
var Nt = new Set([Tt.type, Et.type]), Pt = class {
	constructor(e, { isCaseSensitive: t = q.isCaseSensitive, ignoreDiacritics: n = q.ignoreDiacritics, includeMatches: r = q.includeMatches, minMatchCharLength: i = q.minMatchCharLength, ignoreLocation: a = q.ignoreLocation, findAllMatches: o = q.findAllMatches, location: s = q.location, threshold: c = q.threshold, distance: l = q.distance } = {}) {
		this.query = null, this.options = {
			isCaseSensitive: t,
			ignoreDiacritics: n,
			includeMatches: r,
			minMatchCharLength: i,
			findAllMatches: o,
			ignoreLocation: a,
			location: s,
			threshold: c,
			distance: l
		}, e = t ? e : e.toLowerCase(), e = n ? ht(e) : e, this.pattern = e, this.query = Mt(this.pattern, this.options);
	}
	static condition(e, t) {
		return t.useExtendedSearch;
	}
	searchIn(e) {
		let t = this.query;
		if (!t) return {
			isMatch: !1,
			score: 1
		};
		let { includeMatches: n, isCaseSensitive: r, ignoreDiacritics: i } = this.options;
		e = r ? e : e.toLowerCase(), e = i ? ht(e) : e;
		let a = 0, o = [], s = 0, c = !1;
		for (let r = 0, i = t.length; r < i; r += 1) {
			let i = t[r];
			o.length = 0, a = 0, c = !1;
			for (let t = 0, r = i.length; t < r; t += 1) {
				let r = i[t], { isMatch: l, indices: u, score: d } = r.search(e);
				if (l) {
					a += 1, s += d;
					let e = r.constructor.type;
					e.startsWith("inverse") && (c = !0), n && (Nt.has(e) ? o.push(...u) : o.push(u));
				} else {
					s = 0, a = 0, o.length = 0, c = !1;
					break;
				}
			}
			if (a) {
				let e = {
					isMatch: !0,
					score: s / a
				};
				return c && (e.hasInverse = !0), n && (e.indices = ft(o)), e;
			}
		}
		return {
			isMatch: !1,
			score: 1
		};
	}
}, Ft = [];
function It(...e) {
	Ft.push(...e);
}
function Lt(e, t) {
	for (let n = 0, r = Ft.length; n < r; n += 1) {
		let r = Ft[n];
		if (r.condition(e, t)) return new r(e, t);
	}
	return new gt(e, t);
}
var Rt = {
	AND: "$and",
	OR: "$or"
}, zt = {
	PATH: "$path",
	PATTERN: "$val"
}, Bt = (e) => !!(e[Rt.AND] || e[Rt.OR]), Vt = (e) => !!e[zt.PATH], Ht = (e) => !W(e) && Be(e) && !Bt(e), Ut = (e) => ({ [Rt.AND]: Object.keys(e).map((t) => ({ [t]: e[t] })) });
function Wt(e, t, { auto: n = !0 } = {}) {
	let r = (e) => {
		if (G(e)) {
			let r = {
				keyId: null,
				pattern: e
			};
			return n && (r.searcher = Lt(e, t)), r;
		}
		let i = Object.keys(e), a = Vt(e);
		if (!a && i.length > 1 && !Bt(e)) return r(Ut(e));
		if (Ht(e)) {
			let r = a ? e[zt.PATH] : i[0], o = a ? e[zt.PATTERN] : e[r];
			if (!G(o)) throw Error(Ge(r));
			let s = {
				keyId: $e(r),
				pattern: o
			};
			return n && (s.searcher = Lt(o, t)), s;
		}
		let o = {
			children: [],
			operator: i[0]
		};
		return i.forEach((t) => {
			let n = e[t];
			W(n) && n.forEach((e) => {
				o.children.push(r(e));
			});
		}), o;
	};
	return Bt(e) || (e = Ut(e)), r(e);
}
function Gt(e, { ignoreFieldNorm: t = q.ignoreFieldNorm }) {
	let n = 1;
	return e.forEach(({ key: e, norm: r, score: i }) => {
		let a = e ? e.weight : null;
		n *= (i === 0 && a ? 2 ** -52 : i) ** +((a || 1) * (t ? 1 : r));
	}), n;
}
function Kt(e, { ignoreFieldNorm: t = q.ignoreFieldNorm }) {
	e.forEach((e) => {
		e.score = Gt(e.matches, { ignoreFieldNorm: t });
	});
}
var qt = class {
	constructor(e) {
		this.limit = e, this.heap = [];
	}
	get size() {
		return this.heap.length;
	}
	shouldInsert(e) {
		return this.size < this.limit || e < this.heap[0].score;
	}
	insert(e) {
		this.size < this.limit ? (this.heap.push(e), this._bubbleUp(this.size - 1)) : e.score < this.heap[0].score && (this.heap[0] = e, this._sinkDown(0));
	}
	extractSorted(e) {
		return this.heap.sort(e);
	}
	_bubbleUp(e) {
		let t = this.heap;
		for (; e > 0;) {
			let n = e - 1 >> 1;
			if (t[e].score <= t[n].score) break;
			let r = t[e];
			t[e] = t[n], t[n] = r, e = n;
		}
	}
	_sinkDown(e) {
		let t = this.heap, n = t.length, r = e;
		do {
			e = r;
			let i = 2 * e + 1, a = 2 * e + 2;
			if (i < n && t[i].score > t[r].score && (r = i), a < n && t[a].score > t[r].score && (r = a), r !== e) {
				let n = t[e];
				t[e] = t[r], t[r] = n;
			}
		} while (r !== e);
	}
};
function Jt(e, t) {
	let n = e.matches;
	t.matches = [], K(n) && n.forEach((e) => {
		if (!K(e.indices) || !e.indices.length) return;
		let { indices: n, value: r } = e, i = {
			indices: n,
			value: r
		};
		e.key && (i.key = e.key.src), e.idx > -1 && (i.refIndex = e.idx), t.matches.push(i);
	});
}
function Yt(e, t) {
	t.score = e.score;
}
function Xt(e, t, { includeMatches: n = q.includeMatches, includeScore: r = q.includeScore } = {}) {
	let i = [];
	return n && i.push(Jt), r && i.push(Yt), e.map((e) => {
		let { idx: n } = e, r = {
			item: t[n],
			refIndex: n
		};
		return i.length && i.forEach((t) => {
			t(e, r);
		}), r;
	});
}
var Zt = /\b\w+\b/g;
function Qt({ isCaseSensitive: e = !1, ignoreDiacritics: t = !1 } = {}) {
	return { tokenize(n) {
		return e || (n = n.toLowerCase()), t && (n = ht(n)), n.match(Zt) || [];
	} };
}
function $t(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = 0;
	function o(e, t, o, s) {
		let c = n.tokenize(e);
		if (!c.length) return;
		a++;
		let l = /* @__PURE__ */ new Map();
		for (let e of c) l.set(e, (l.get(e) || 0) + 1);
		for (let [e, n] of l) {
			let a = {
				docIdx: t,
				keyIdx: o,
				subIdx: s,
				tf: n
			}, c = r.get(e);
			c || (c = [], r.set(e, c)), c.push(a), i.set(e, (i.get(e) || 0) + 1);
		}
	}
	for (let n of e) {
		let { i: e, v: r, $: i } = n;
		if (r !== void 0) {
			o(r, e, -1, -1);
			continue;
		}
		if (i) for (let n = 0; n < t; n++) {
			let t = i[n];
			if (t) if (Array.isArray(t)) for (let r of t) o(r.v, e, n, r.i ?? -1);
			else o(t.v, e, n, -1);
		}
	}
	return {
		terms: r,
		fieldCount: a,
		df: i
	};
}
function en(e, t, n, r) {
	let { i, v: a, $: o } = t;
	function s(t, n, a) {
		let o = r.tokenize(t);
		if (!o.length) return;
		e.fieldCount++;
		let s = /* @__PURE__ */ new Map();
		for (let e of o) s.set(e, (s.get(e) || 0) + 1);
		for (let [t, r] of s) {
			let o = {
				docIdx: i,
				keyIdx: n,
				subIdx: a,
				tf: r
			}, s = e.terms.get(t);
			s || (s = [], e.terms.set(t, s)), s.push(o), e.df.set(t, (e.df.get(t) || 0) + 1);
		}
	}
	if (a !== void 0) {
		s(a, -1, -1);
		return;
	}
	if (o) for (let e = 0; e < n; e++) {
		let t = o[e];
		if (t) if (Array.isArray(t)) for (let n of t) s(n.v, e, n.i ?? -1);
		else s(t.v, e, -1);
	}
}
function tn(e, t) {
	for (let [n, r] of e.terms) {
		let i = r.filter((e) => e.docIdx !== t), a = r.length - i.length;
		a > 0 && (e.fieldCount -= a, e.df.set(n, (e.df.get(n) || 0) - a), i.length === 0 ? (e.terms.delete(n), e.df.delete(n)) : e.terms.set(n, i));
	}
}
var nn = class {
	constructor(e, t, n) {
		this.options = {
			...q,
			...t
		}, this.options.useExtendedSearch, this.options.useTokenSearch, this._keyStore = new Xe(this.options.keys), this._docs = e, this._myIndex = null, this._invertedIndex = null, this.setCollection(e, n), this._lastQuery = null, this._lastSearcher = null;
	}
	_getSearcher(e) {
		if (this._lastQuery === e) return this._lastSearcher;
		let t = Lt(e, this._invertedIndex ? {
			...this.options,
			_invertedIndex: this._invertedIndex
		} : this.options);
		return this._lastQuery = e, this._lastSearcher = t, t;
	}
	setCollection(e, t) {
		if (this._docs = e, t && !(t instanceof st)) throw Error(We);
		if (this._myIndex = t || ct(this.options.keys, this._docs, {
			getFn: this.options.getFn,
			fieldNormWeight: this.options.fieldNormWeight
		}), this.options.useTokenSearch) {
			let e = Qt({
				isCaseSensitive: this.options.isCaseSensitive,
				ignoreDiacritics: this.options.ignoreDiacritics
			});
			this._invertedIndex = $t(this._myIndex.records, this._myIndex.keys.length, e);
		}
	}
	add(e) {
		if (K(e) && (this._docs.push(e), this._myIndex.add(e), this._invertedIndex)) {
			let e = this._myIndex.records[this._myIndex.records.length - 1], t = Qt({
				isCaseSensitive: this.options.isCaseSensitive,
				ignoreDiacritics: this.options.ignoreDiacritics
			});
			en(this._invertedIndex, e, this._myIndex.keys.length, t);
		}
	}
	remove(e = () => !1) {
		let t = [], n = [];
		for (let r = 0, i = this._docs.length; r < i; r += 1) e(this._docs[r], r) && (t.push(this._docs[r]), n.push(r));
		if (n.length) {
			if (this._invertedIndex) for (let e of n) tn(this._invertedIndex, e);
			for (let e = n.length - 1; e >= 0; --e) this._docs.splice(n[e], 1);
			this._myIndex.removeAll(n);
		}
		return t;
	}
	removeAt(e) {
		this._invertedIndex && tn(this._invertedIndex, e);
		let t = this._docs.splice(e, 1)[0];
		return this._myIndex.removeAt(e), t;
	}
	getIndex() {
		return this._myIndex;
	}
	search(e, t) {
		let { limit: n = -1 } = t || {}, { includeMatches: r, includeScore: i, shouldSort: a, sortFn: o, ignoreFieldNorm: s } = this.options;
		if (G(e) && !e.trim()) {
			let e = this._docs.map((e, t) => ({
				item: e,
				refIndex: t
			}));
			return Re(n) && n > -1 && (e = e.slice(0, n)), e;
		}
		let c = Re(n) && n > 0 && G(e), l;
		if (c) {
			let t = new qt(n);
			G(this._docs[0]) ? this._searchStringList(e, {
				heap: t,
				ignoreFieldNorm: s
			}) : this._searchObjectList(e, {
				heap: t,
				ignoreFieldNorm: s
			}), l = t.extractSorted(o);
		} else l = G(e) ? G(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e), Kt(l, { ignoreFieldNorm: s }), a && l.sort(o), Re(n) && n > -1 && (l = l.slice(0, n));
		return Xt(l, this._docs, {
			includeMatches: r,
			includeScore: i
		});
	}
	_searchStringList(e, { heap: t, ignoreFieldNorm: n } = {}) {
		let r = this._getSearcher(e), { records: i } = this._myIndex, a = t ? null : [];
		return i.forEach(({ v: e, i, n: o }) => {
			if (!K(e)) return;
			let { isMatch: s, score: c, indices: l } = r.searchIn(e);
			if (s) {
				let r = {
					item: e,
					idx: i,
					matches: [{
						score: c,
						value: e,
						norm: o,
						indices: l
					}]
				};
				t ? (r.score = Gt(r.matches, { ignoreFieldNorm: n }), t.shouldInsert(r.score) && t.insert(r)) : a.push(r);
			}
		}), a;
	}
	_searchLogical(e) {
		let t = Wt(e, this.options), n = (e, t, r) => {
			if (!("children" in e)) {
				let { keyId: n, searcher: i } = e, a;
				return n === null ? (a = [], this._myIndex.keys.forEach((e, n) => {
					a.push(...this._findMatches({
						key: e,
						value: t[n],
						searcher: i
					}));
				})) : a = this._findMatches({
					key: this._keyStore.get(n),
					value: this._myIndex.getValueForItemAtKeyId(t, n),
					searcher: i
				}), a && a.length ? [{
					idx: r,
					item: t,
					matches: a
				}] : [];
			}
			let { children: i, operator: a } = e, o = [];
			for (let e = 0, s = i.length; e < s; e += 1) {
				let s = i[e], c = n(s, t, r);
				if (c.length) o.push(...c);
				else if (a === Rt.AND) return [];
			}
			return o;
		}, r = this._myIndex.records, i = /* @__PURE__ */ new Map(), a = [];
		return r.forEach(({ $: e, i: r }) => {
			if (K(e)) {
				let o = n(t, e, r);
				o.length && (i.has(r) || (i.set(r, {
					idx: r,
					item: e,
					matches: []
				}), a.push(i.get(r))), o.forEach(({ matches: e }) => {
					i.get(r).matches.push(...e);
				}));
			}
		}), a;
	}
	_searchObjectList(e, { heap: t, ignoreFieldNorm: n } = {}) {
		let r = this._getSearcher(e), { keys: i, records: a } = this._myIndex, o = t ? null : [];
		return a.forEach(({ $: e, i: a }) => {
			if (!K(e)) return;
			let s = [], c = !1, l = !1;
			if (i.forEach((t, n) => {
				let i = this._findMatches({
					key: t,
					value: e[n],
					searcher: r
				});
				i.length ? (s.push(...i), i[0].hasInverse && (l = !0)) : c = !0;
			}), !(l && c) && s.length) {
				let r = {
					idx: a,
					item: e,
					matches: s
				};
				t ? (r.score = Gt(r.matches, { ignoreFieldNorm: n }), t.shouldInsert(r.score) && t.insert(r)) : o.push(r);
			}
		}), o;
	}
	_findMatches({ key: e, value: t, searcher: n }) {
		if (!K(t)) return [];
		let r = [];
		if (W(t)) t.forEach(({ v: t, i, n: a }) => {
			if (!K(t)) return;
			let { isMatch: o, score: s, indices: c, hasInverse: l } = n.searchIn(t);
			o && r.push({
				score: s,
				key: e,
				value: t,
				idx: i,
				norm: a,
				indices: c,
				hasInverse: l
			});
		});
		else {
			let { v: i, n: a } = t, { isMatch: o, score: s, indices: c, hasInverse: l } = n.searchIn(i);
			o && r.push({
				score: s,
				key: e,
				value: i,
				norm: a,
				indices: c,
				hasInverse: l
			});
		}
		return r;
	}
}, rn = class {
	static condition(e, t) {
		return t.useTokenSearch;
	}
	constructor(e, t) {
		this.options = t, this.analyzer = Qt({
			isCaseSensitive: t.isCaseSensitive,
			ignoreDiacritics: t.ignoreDiacritics
		});
		let n = this.analyzer.tokenize(e), { df: r, fieldCount: i } = t._invertedIndex;
		this.termSearchers = [], this.idfWeights = [];
		for (let e of n) {
			this.termSearchers.push(new gt(e, {
				location: t.location,
				threshold: t.threshold,
				distance: t.distance,
				includeMatches: t.includeMatches,
				findAllMatches: t.findAllMatches,
				minMatchCharLength: t.minMatchCharLength,
				isCaseSensitive: t.isCaseSensitive,
				ignoreDiacritics: t.ignoreDiacritics,
				ignoreLocation: !0
			}));
			let n = r.get(e) || 0, a = Math.log(1 + (i - n + .5) / (n + .5));
			this.idfWeights.push(a);
		}
	}
	searchIn(e) {
		if (!this.termSearchers.length) return {
			isMatch: !1,
			score: 1
		};
		let t = [], n = 0, r = 0, i = 0;
		for (let a = 0; a < this.termSearchers.length; a++) {
			let o = this.termSearchers[a].searchIn(e), s = this.idfWeights[a];
			r += s, o.isMatch && (i++, n += s * (1 - o.score), o.indices && t.push(...o.indices));
		}
		if (i === 0) return {
			isMatch: !1,
			score: 1
		};
		let a = r > 0 ? 1 - n / r : 0, o = {
			isMatch: !0,
			score: Math.max(.001, a)
		};
		return this.options.includeMatches && t.length && (o.indices = ft(t)), o;
	}
};
nn.version = "7.3.0", nn.createIndex = ct, nn.parseIndex = lt, nn.config = q, nn.match = function(e, t, n) {
	return Lt(e, {
		...q,
		...n
	}).searchIn(t);
}, nn.parseQuery = Wt, It(Pt), It(rn), nn.use = function(...e) {
	e.forEach((e) => It(e));
};
//#endregion
//#region src/methods/container/search-filter.js
function an(e, t) {
	let n = new nn(t.filterProperties, { keys: ["title"] });
	if (!(e.target instanceof HTMLInputElement)) return;
	let r = e.target.value, i = n.search(r).map((e) => e.item.key || e.item.keys.join("|"));
	Object.keys(t.filters).forEach((e) => {
		t.querySelector(`[data-details="${e}"]`).parentElement.style.display = i.includes(e) || !r ? "" : "none";
	});
}
//#endregion
//#region src/methods/container/reset-filter.js
function on(e, t) {
	if (!(e.target instanceof HTMLElement)) return;
	let n = e.target.getAttribute("data-close").replace("|", "-");
	t.querySelector(`#filter-${n}`).reset(), t.dispatchEvent(new CustomEvent("filter")), t.requestUpdate();
}
//#endregion
//#region ../../node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sn = Math.min, cn = Math.max, ln = Math.round, un = Math.floor, X = (e) => ({
	x: e,
	y: e
});
function dn(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function fn(e) {
	return e.split("-")[0];
}
function pn(e) {
	return e.split("-")[1];
}
function mn(e) {
	return e === "x" ? "y" : "x";
}
function hn(e) {
	return e === "y" ? "height" : "width";
}
function gn(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function _n(e) {
	return mn(gn(e));
}
function vn(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function yn(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : vn(e);
}
function bn(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region ../../node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function xn(e, t, n) {
	let { reference: r, floating: i } = e, a = gn(t), o = _n(t), s = hn(o), c = fn(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	switch (pn(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function Sn(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = dn(t, e), p = yn(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = bn(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = bn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Cn = 50, wn = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Sn
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = xn(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Cn && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = xn(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
};
//#endregion
//#region ../../node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Tn() {
	return typeof window < "u";
}
function En(e) {
	return kn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Dn(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function On(e) {
	return ((kn(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function kn(e) {
	return Tn() ? e instanceof Node || e instanceof Dn(e).Node : !1;
}
function An(e) {
	return Tn() ? e instanceof Element || e instanceof Dn(e).Element : !1;
}
function jn(e) {
	return Tn() ? e instanceof HTMLElement || e instanceof Dn(e).HTMLElement : !1;
}
function Mn(e) {
	return !Tn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Dn(e).ShadowRoot;
}
function Nn(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Wn(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Pn(e) {
	return /^(table|td|th)$/.test(En(e));
}
function Fn(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var In = /transform|translate|scale|rotate|perspective|filter/, Ln = /paint|layout|strict|content/, Rn = (e) => !!e && e !== "none", zn;
function Bn(e) {
	let t = An(e) ? Wn(e) : e;
	return Rn(t.transform) || Rn(t.translate) || Rn(t.scale) || Rn(t.rotate) || Rn(t.perspective) || !Hn() && (Rn(t.backdropFilter) || Rn(t.filter)) || In.test(t.willChange || "") || Ln.test(t.contain || "");
}
function Vn(e) {
	let t = Kn(e);
	for (; jn(t) && !Un(t);) {
		if (Bn(t)) return t;
		if (Fn(t)) return null;
		t = Kn(t);
	}
	return null;
}
function Hn() {
	return zn ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), zn;
}
function Un(e) {
	return /^(html|body|#document)$/.test(En(e));
}
function Wn(e) {
	return Dn(e).getComputedStyle(e);
}
function Gn(e) {
	return An(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Kn(e) {
	if (En(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Mn(e) && e.host || On(e);
	return Mn(t) ? t.host : t;
}
function qn(e) {
	let t = Kn(e);
	return Un(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : jn(t) && Nn(t) ? t : qn(t);
}
function Jn(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = qn(e), i = r === e.ownerDocument?.body, a = Dn(r);
	if (i) {
		let e = Yn(a);
		return t.concat(a, a.visualViewport || [], Nn(r) ? r : [], e && n ? Jn(e) : []);
	} else return t.concat(r, Jn(r, [], n));
}
function Yn(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region ../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Xn(e) {
	let t = Wn(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = jn(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = ln(n) !== a || ln(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Zn(e) {
	return An(e) ? e : e.contextElement;
}
function Qn(e) {
	let t = Zn(e);
	if (!jn(t)) return X(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Xn(t), o = (a ? ln(n.width) : n.width) / r, s = (a ? ln(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var $n = /* @__PURE__ */ X(0);
function er(e) {
	let t = Dn(e);
	return !Hn() || !t.visualViewport ? $n : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function tr(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== Dn(e) ? !1 : t;
}
function nr(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Zn(e), o = X(1);
	t && (r ? An(r) && (o = Qn(r)) : o = Qn(e));
	let s = tr(a, n, r) ? er(a) : X(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = Dn(a), t = r && An(r) ? Dn(r) : r, n = e, i = Yn(n);
		for (; i && r && t !== n;) {
			let e = Qn(i), t = i.getBoundingClientRect(), r = Wn(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Dn(i), i = Yn(n);
		}
	}
	return bn({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function rr(e, t) {
	let n = Gn(e).scrollLeft;
	return t ? t.left + n : nr(On(e)).left + n;
}
function ir(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - rr(e, n),
		y: n.top + t.scrollTop
	};
}
function ar(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = On(r), s = t ? Fn(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = X(1), u = X(0), d = jn(r);
	if ((d || !d && !a) && ((En(r) !== "body" || Nn(o)) && (c = Gn(r)), d)) {
		let e = nr(r);
		l = Qn(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? ir(o, c) : X(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function or(e) {
	return Array.from(e.getClientRects());
}
function sr(e) {
	let t = On(e), n = Gn(e), r = e.ownerDocument.body, i = cn(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = cn(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + rr(e), s = -n.scrollTop;
	return Wn(r).direction === "rtl" && (o += cn(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var cr = 25;
function lr(e, t) {
	let n = Dn(e), r = On(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = Hn();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = rr(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= cr && (a -= o);
	} else l <= cr && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function ur(e, t) {
	let n = nr(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = jn(e) ? Qn(e) : X(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function dr(e, t, n) {
	let r;
	if (t === "viewport") r = lr(e, n);
	else if (t === "document") r = sr(On(e));
	else if (An(t)) r = ur(t, n);
	else {
		let n = er(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return bn(r);
}
function fr(e, t) {
	let n = Kn(e);
	return n === t || !An(n) || Un(n) ? !1 : Wn(n).position === "fixed" || fr(n, t);
}
function pr(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Jn(e, [], !1).filter((e) => An(e) && En(e) !== "body"), i = null, a = Wn(e).position === "fixed", o = a ? Kn(e) : e;
	for (; An(o) && !Un(o);) {
		let t = Wn(o), n = Bn(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || Nn(o) && !n && fr(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = Kn(o);
	}
	return t.set(e, r), r;
}
function mr(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Fn(t) ? [] : pr(t, this._c) : [].concat(n), r], o = dr(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = dr(t, a[e], i);
		s = cn(n.top, s), c = sn(n.right, c), l = sn(n.bottom, l), u = cn(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function hr(e) {
	let { width: t, height: n } = Xn(e);
	return {
		width: t,
		height: n
	};
}
function gr(e, t, n) {
	let r = jn(t), i = On(t), a = n === "fixed", o = nr(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = X(0);
	function l() {
		c.x = rr(i);
	}
	if (r || !r && !a) if ((En(t) !== "body" || Nn(i)) && (s = Gn(t)), r) {
		let e = nr(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? ir(i, s) : X(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function _r(e) {
	return Wn(e).position === "static";
}
function vr(e, t) {
	if (!jn(e) || Wn(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return On(e) === n && (n = n.ownerDocument.body), n;
}
function yr(e, t) {
	let n = Dn(e);
	if (Fn(e)) return n;
	if (!jn(e)) {
		let t = Kn(e);
		for (; t && !Un(t);) {
			if (An(t) && !_r(t)) return t;
			t = Kn(t);
		}
		return n;
	}
	let r = vr(e, t);
	for (; r && Pn(r) && _r(r);) r = vr(r, t);
	return r && Un(r) && _r(r) && !Bn(r) ? n : r || Vn(e) || n;
}
var br = async function(e) {
	let t = this.getOffsetParent || yr, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: gr(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function xr(e) {
	return Wn(e).direction === "rtl";
}
var Sr = {
	convertOffsetParentRelativeRectToViewportRelativeRect: ar,
	getDocumentElement: On,
	getClippingRect: mr,
	getOffsetParent: yr,
	getElementRects: br,
	getClientRects: or,
	getDimensions: hr,
	getScale: Qn,
	isElement: An,
	isRTL: xr
};
function Cr(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function wr(e, t) {
	let n = null, r, i = On(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = un(d), h = un(i.clientWidth - (u + f)), g = un(i.clientHeight - (d + p)), _ = un(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: cn(0, sn(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !Cr(l, e.getBoundingClientRect()) && o(), y = !1;
		}
		try {
			n = new IntersectionObserver(b, {
				...v,
				root: i.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(b, v);
		}
		n.observe(e);
	}
	return o(!0), a;
}
function Tr(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Zn(e), u = i || a ? [...l ? Jn(l) : [], ...t ? Jn(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? wr(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? nr(e) : null;
	c && g();
	function g() {
		let t = nr(e);
		h && !Cr(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Er = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: Sr,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return wn(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region src/methods/container/init-popver.js
function Dr(e) {
	let t = e.renderRoot.querySelector(".inline-container-wrapper"), n = e.renderRoot.querySelector("[popover]");
	return Tr(t, n, () => {
		n.matches(":popover-open") && Er(t, n, { strategy: "fixed" }).then(({ x: e, y: r }) => {
			Object.assign(n.style, {
				left: `${e}px`,
				top: `${r}px`,
				width: `${t.getBoundingClientRect().width}px`
			});
		});
	}, { animationFrame: !0 });
}
//#endregion
//#region src/methods/container/reset-search.js
function Or(e) {
	e.renderRoot.querySelector("#eox-itemfilter-input-search").value = "", an({ target: { value: "" } }, e);
}
//#endregion
//#region src/methods/container/handler.js
function kr(e, t) {
	t.inlineMode && e.stopPropagation();
}
function Ar(e) {
	e.inlineMode && (e.showDropdown = !0);
}
function jr(e, t) {
	t.inlineMode && (e.stopPropagation(), t.showDropdown = !0);
}
function Mr(e, t) {
	t.inlineMode && e.key === "Escape" && t.showDropdown && (Or(t), t.showDropdown = !1);
}
function Nr(e, t) {
	t.inlineMode && e.target instanceof HTMLElement && e.target.tagName !== "DROPDOWN-FORM" && e.target.tagName !== "EOX-ITEMFILTER" && t.showDropdown && (Or(t), t.showDropdown = !1);
}
//#endregion
//#region ../../node_modules/robust-predicates/esm/util.js
var Z = 11102230246251565e-32, Pr = 134217729, Fr = (3 + 8 * Z) * Z;
function Ir(e, t, n, r, i) {
	let a, o, s, c, l = t[0], u = r[0], d = 0, f = 0;
	u > l == u > -l ? (a = l, l = t[++d]) : (a = u, u = r[++f]);
	let p = 0;
	if (d < e && f < n) for (u > l == u > -l ? (o = l + a, s = a - (o - l), l = t[++d]) : (o = u + a, s = a - (o - u), u = r[++f]), a = o, s !== 0 && (i[p++] = s); d < e && f < n;) u > l == u > -l ? (o = a + l, c = o - a, s = a - (o - c) + (l - c), l = t[++d]) : (o = a + u, c = o - a, s = a - (o - c) + (u - c), u = r[++f]), a = o, s !== 0 && (i[p++] = s);
	for (; d < e;) o = a + l, c = o - a, s = a - (o - c) + (l - c), l = t[++d], a = o, s !== 0 && (i[p++] = s);
	for (; f < n;) o = a + u, c = o - a, s = a - (o - c) + (u - c), u = r[++f], a = o, s !== 0 && (i[p++] = s);
	return (a !== 0 || p === 0) && (i[p++] = a), p;
}
function Lr(e, t) {
	let n = t[0];
	for (let r = 1; r < e; r++) n += t[r];
	return n;
}
function Q(e) {
	return new Float64Array(e);
}
//#endregion
//#region ../../node_modules/robust-predicates/esm/orient2d.js
var Rr = (3 + 16 * Z) * Z, zr = (2 + 12 * Z) * Z, Br = (9 + 64 * Z) * Z * Z, Vr = Q(4), Hr = Q(8), Ur = Q(12), Wr = Q(16), Gr = Q(4);
function Kr(e, t, n, r, i, a, o) {
	let s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T = e - i, E = n - i, D = t - a, O = r - a;
	b = T * O, f = Pr * T, p = f - (f - T), m = T - p, f = Pr * O, h = f - (f - O), g = O - h, x = m * g - (b - p * h - m * h - p * g), S = D * E, f = Pr * D, p = f - (f - D), m = D - p, f = Pr * E, h = f - (f - E), g = E - h, C = m * g - (S - p * h - m * h - p * g), _ = x - C, d = x - _, Vr[0] = x - (_ + d) + (d - C), v = b + _, d = v - b, y = b - (v - d) + (_ - d), _ = y - S, d = y - _, Vr[1] = y - (_ + d) + (d - S), w = v + _, d = w - v, Vr[2] = v - (w - d) + (_ - d), Vr[3] = w;
	let k = Lr(4, Vr), A = zr * o;
	if (k >= A || -k >= A || (d = e - T, s = e - (T + d) + (d - i), d = n - E, l = n - (E + d) + (d - i), d = t - D, c = t - (D + d) + (d - a), d = r - O, u = r - (O + d) + (d - a), s === 0 && c === 0 && l === 0 && u === 0) || (A = Br * o + Fr * Math.abs(k), k += T * u + O * s - (D * l + E * c), k >= A || -k >= A)) return k;
	b = s * O, f = Pr * s, p = f - (f - s), m = s - p, f = Pr * O, h = f - (f - O), g = O - h, x = m * g - (b - p * h - m * h - p * g), S = c * E, f = Pr * c, p = f - (f - c), m = c - p, f = Pr * E, h = f - (f - E), g = E - h, C = m * g - (S - p * h - m * h - p * g), _ = x - C, d = x - _, Gr[0] = x - (_ + d) + (d - C), v = b + _, d = v - b, y = b - (v - d) + (_ - d), _ = y - S, d = y - _, Gr[1] = y - (_ + d) + (d - S), w = v + _, d = w - v, Gr[2] = v - (w - d) + (_ - d), Gr[3] = w;
	let j = Ir(4, Vr, 4, Gr, Hr);
	b = T * u, f = Pr * T, p = f - (f - T), m = T - p, f = Pr * u, h = f - (f - u), g = u - h, x = m * g - (b - p * h - m * h - p * g), S = D * l, f = Pr * D, p = f - (f - D), m = D - p, f = Pr * l, h = f - (f - l), g = l - h, C = m * g - (S - p * h - m * h - p * g), _ = x - C, d = x - _, Gr[0] = x - (_ + d) + (d - C), v = b + _, d = v - b, y = b - (v - d) + (_ - d), _ = y - S, d = y - _, Gr[1] = y - (_ + d) + (d - S), w = v + _, d = w - v, Gr[2] = v - (w - d) + (_ - d), Gr[3] = w;
	let ee = Ir(j, Hr, 4, Gr, Ur);
	return b = s * u, f = Pr * s, p = f - (f - s), m = s - p, f = Pr * u, h = f - (f - u), g = u - h, x = m * g - (b - p * h - m * h - p * g), S = c * l, f = Pr * c, p = f - (f - c), m = c - p, f = Pr * l, h = f - (f - l), g = l - h, C = m * g - (S - p * h - m * h - p * g), _ = x - C, d = x - _, Gr[0] = x - (_ + d) + (d - C), v = b + _, d = v - b, y = b - (v - d) + (_ - d), _ = y - S, d = y - _, Gr[1] = y - (_ + d) + (d - S), w = v + _, d = w - v, Gr[2] = v - (w - d) + (_ - d), Gr[3] = w, Wr[Ir(ee, Ur, 4, Gr, Wr) - 1];
}
function qr(e, t, n, r, i, a) {
	let o = (t - a) * (n - i), s = (e - i) * (r - a), c = o - s, l = Math.abs(o + s);
	return Math.abs(c) >= Rr * l ? c : -Kr(e, t, n, r, i, a, l);
}
(7 + 56 * Z) * Z, (3 + 28 * Z) * Z, (26 + 288 * Z) * Z * Z, Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(8), Q(8), Q(8), Q(4), Q(8), Q(8), Q(8), Q(12), Q(192), Q(192), (10 + 96 * Z) * Z, (4 + 48 * Z) * Z, (44 + 576 * Z) * Z * Z, Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(8), Q(8), Q(8), Q(8), Q(8), Q(8), Q(8), Q(8), Q(8), Q(4), Q(4), Q(4), Q(8), Q(16), Q(16), Q(16), Q(32), Q(32), Q(48), Q(64), Q(1152), Q(1152), (16 + 224 * Z) * Z, (5 + 72 * Z) * Z, (71 + 1408 * Z) * Z * Z, Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(4), Q(24), Q(24), Q(24), Q(24), Q(24), Q(24), Q(24), Q(24), Q(24), Q(24), Q(1152), Q(1152), Q(1152), Q(1152), Q(1152), Q(2304), Q(2304), Q(3456), Q(5760), Q(8), Q(8), Q(8), Q(16), Q(24), Q(48), Q(48), Q(96), Q(192), Q(384), Q(384), Q(384), Q(768), Q(96), Q(96), Q(96), Q(1152);
//#endregion
//#region ../../node_modules/point-in-polygon-hao/dist/esm/index.js
function Jr(e, t) {
	var n, r, i = 0, a, o, s, c, l, u, d, f = e[0], p = e[1], m = t.length;
	for (n = 0; n < m; n++) {
		r = 0;
		var h = t[n], g = h.length - 1;
		if (u = h[0], u[0] !== h[g][0] && u[1] !== h[g][1]) throw Error("First and last coordinates in a ring must be the same");
		for (o = u[0] - f, s = u[1] - p; r < g; r++) {
			if (d = h[r + 1], c = d[0] - f, l = d[1] - p, s === 0 && l === 0) {
				if (c <= 0 && o >= 0 || o <= 0 && c >= 0) return 0;
			} else if (l >= 0 && s <= 0 || l <= 0 && s >= 0) {
				if (a = qr(o, c, s, l, 0, 0), a === 0) return 0;
				(a > 0 && l > 0 && s <= 0 || a < 0 && l <= 0 && s > 0) && i++;
			}
			u = d, s = l, o = c;
		}
	}
	return i % 2 != 0;
}
//#endregion
//#region ../../node_modules/@turf/helpers/dist/esm/index.js
var Yr = 6371008.8, Xr = {
	centimeters: Yr * 100,
	centimetres: Yr * 100,
	degrees: 360 / (2 * Math.PI),
	feet: Yr * 3.28084,
	inches: Yr * 39.37,
	kilometers: Yr / 1e3,
	kilometres: Yr / 1e3,
	meters: Yr,
	metres: Yr,
	miles: Yr / 1609.344,
	millimeters: Yr * 1e3,
	millimetres: Yr * 1e3,
	nauticalmiles: Yr / 1852,
	radians: 1,
	yards: Yr * 1.0936
};
function Zr(e, t, n = {}) {
	let r = { type: "Feature" };
	return (n.id === 0 || n.id) && (r.id = n.id), n.bbox && (r.bbox = n.bbox), r.properties = t || {}, r.geometry = e, r;
}
function Qr(e, t, n = {}) {
	if (!e) throw Error("coordinates is required");
	if (!Array.isArray(e)) throw Error("coordinates must be an Array");
	if (e.length < 2) throw Error("coordinates must be at least 2 numbers long");
	if (!ai(e[0]) || !ai(e[1])) throw Error("coordinates must contain numbers");
	return Zr({
		type: "Point",
		coordinates: e
	}, t, n);
}
function $r(e, t, n = {}) {
	if (e.length < 2) throw Error("coordinates must be an array of two or more positions");
	return Zr({
		type: "LineString",
		coordinates: e
	}, t, n);
}
function ei(e, t = {}) {
	let n = { type: "FeatureCollection" };
	return t.id && (n.id = t.id), t.bbox && (n.bbox = t.bbox), n.features = e, n;
}
function ti(e, t, n = {}) {
	return Zr({
		type: "MultiLineString",
		coordinates: e
	}, t, n);
}
function ni(e, t = "kilometers") {
	let n = Xr[t];
	if (!n) throw Error(t + " units is invalid");
	return e * n;
}
function ri(e) {
	return e % (2 * Math.PI) * 180 / Math.PI;
}
function ii(e) {
	return e % 360 * Math.PI / 180;
}
function ai(e) {
	return !isNaN(e) && e !== null && !Array.isArray(e);
}
function oi(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
//#endregion
//#region ../../node_modules/@turf/invariant/dist/esm/index.js
function si(e) {
	if (!e) throw Error("coord is required");
	if (!Array.isArray(e)) {
		if (e.type === "Feature" && e.geometry !== null && e.geometry.type === "Point") return [...e.geometry.coordinates];
		if (e.type === "Point") return [...e.coordinates];
	}
	if (Array.isArray(e) && e.length >= 2 && !Array.isArray(e[0]) && !Array.isArray(e[1])) return [...e];
	throw Error("coord must be GeoJSON Point or an Array of numbers");
}
function ci(e) {
	if (Array.isArray(e)) return e;
	if (e.type === "Feature") {
		if (e.geometry !== null) return e.geometry.coordinates;
	} else if (e.coordinates) return e.coordinates;
	throw Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
function li(e) {
	return e.type === "Feature" ? e.geometry : e;
}
function ui(e, t) {
	return e.type === "FeatureCollection" ? "FeatureCollection" : e.type === "GeometryCollection" ? "GeometryCollection" : e.type === "Feature" && e.geometry !== null ? e.geometry.type : e.type;
}
//#endregion
//#region ../../node_modules/@turf/boolean-point-in-polygon/dist/esm/index.js
function di(e, t, n = {}) {
	if (!e) throw Error("point is required");
	if (!t) throw Error("polygon is required");
	let r = si(e), i = li(t), a = i.type, o = t.bbox, s = i.coordinates;
	if (o && fi(r, o) === !1) return !1;
	a === "Polygon" && (s = [s]);
	let c = !1;
	for (var l = 0; l < s.length; ++l) {
		let e = Jr(r, s[l]);
		if (e === 0) return !n.ignoreBoundary;
		e && (c = !0);
	}
	return c;
}
function fi(e, t) {
	return t[0] <= e[0] && t[1] <= e[1] && t[2] >= e[0] && t[3] >= e[1];
}
//#endregion
//#region ../../node_modules/sweepline-intersections/dist/sweeplineIntersections.esm.js
var pi = class {
	constructor(e = [], t = mi) {
		if (this.data = e, this.length = this.data.length, this.compare = t, this.length > 0) for (let e = (this.length >> 1) - 1; e >= 0; e--) this._down(e);
	}
	push(e) {
		this.data.push(e), this.length++, this._up(this.length - 1);
	}
	pop() {
		if (this.length === 0) return;
		let e = this.data[0], t = this.data.pop();
		return this.length--, this.length > 0 && (this.data[0] = t, this._down(0)), e;
	}
	peek() {
		return this.data[0];
	}
	_up(e) {
		let { data: t, compare: n } = this, r = t[e];
		for (; e > 0;) {
			let i = e - 1 >> 1, a = t[i];
			if (n(r, a) >= 0) break;
			t[e] = a, e = i;
		}
		t[e] = r;
	}
	_down(e) {
		let { data: t, compare: n } = this, r = this.length >> 1, i = t[e];
		for (; e < r;) {
			let r = (e << 1) + 1, a = t[r], o = r + 1;
			if (o < this.length && n(t[o], a) < 0 && (r = o, a = t[o]), n(a, i) >= 0) break;
			t[e] = a, e = r;
		}
		t[e] = i;
	}
};
function mi(e, t) {
	return e < t ? -1 : +(e > t);
}
function hi(e, t) {
	return e.p.x > t.p.x ? 1 : e.p.x < t.p.x ? -1 : e.p.y === t.p.y || e.p.y > t.p.y ? 1 : -1;
}
function gi(e, t) {
	return e.rightSweepEvent.p.x > t.rightSweepEvent.p.x ? 1 : e.rightSweepEvent.p.x < t.rightSweepEvent.p.x ? -1 : e.rightSweepEvent.p.y === t.rightSweepEvent.p.y || e.rightSweepEvent.p.y < t.rightSweepEvent.p.y ? 1 : -1;
}
var _i = class {
	constructor(e, t, n, r) {
		this.p = {
			x: e[0],
			y: e[1]
		}, this.featureId = t, this.ringId = n, this.eventId = r, this.otherEvent = null, this.isLeftEndpoint = null;
	}
	isSamePoint(e) {
		return this.p.x === e.p.x && this.p.y === e.p.y;
	}
};
function vi(e, t) {
	if (e.type === "FeatureCollection") {
		let n = e.features;
		for (let e = 0; e < n.length; e++) Si(n[e], t);
	} else Si(e, t);
}
var yi = 0, bi = 0, xi = 0;
function Si(e, t) {
	let n = e.type === "Feature" ? e.geometry : e, r = n.coordinates;
	(n.type === "Polygon" || n.type === "MultiLineString") && (r = [r]), n.type === "LineString" && (r = [[r]]);
	for (let e = 0; e < r.length; e++) for (let n = 0; n < r[e].length; n++) {
		let i = r[e][n][0], a = null;
		bi += 1;
		for (let o = 0; o < r[e][n].length - 1; o++) {
			a = r[e][n][o + 1];
			let s = new _i(i, yi, bi, xi), c = new _i(a, yi, bi, xi + 1);
			s.otherEvent = c, c.otherEvent = s, hi(s, c) > 0 ? (c.isLeftEndpoint = !0, s.isLeftEndpoint = !1) : (s.isLeftEndpoint = !0, c.isLeftEndpoint = !1), t.push(s), t.push(c), i = a, xi += 1;
		}
	}
	yi += 1;
}
var Ci = class {
	constructor(e) {
		this.leftSweepEvent = e, this.rightSweepEvent = e.otherEvent;
	}
};
function wi(e, t) {
	if (e === null || t === null || e.leftSweepEvent.ringId === t.leftSweepEvent.ringId && (e.rightSweepEvent.isSamePoint(t.leftSweepEvent) || e.rightSweepEvent.isSamePoint(t.leftSweepEvent) || e.rightSweepEvent.isSamePoint(t.rightSweepEvent) || e.leftSweepEvent.isSamePoint(t.leftSweepEvent) || e.leftSweepEvent.isSamePoint(t.rightSweepEvent))) return !1;
	let n = e.leftSweepEvent.p.x, r = e.leftSweepEvent.p.y, i = e.rightSweepEvent.p.x, a = e.rightSweepEvent.p.y, o = t.leftSweepEvent.p.x, s = t.leftSweepEvent.p.y, c = t.rightSweepEvent.p.x, l = t.rightSweepEvent.p.y, u = (l - s) * (i - n) - (c - o) * (a - r), d = (c - o) * (r - s) - (l - s) * (n - o), f = (i - n) * (r - s) - (a - r) * (n - o);
	if (u === 0) return !1;
	let p = d / u, m = f / u;
	return p >= 0 && p <= 1 && m >= 0 && m <= 1 ? [n + p * (i - n), r + p * (a - r)] : !1;
}
function Ti(e, t) {
	t ||= !1;
	let n = [], r = new pi([], gi);
	for (; e.length;) {
		let i = e.pop();
		if (i.isLeftEndpoint) {
			let e = new Ci(i);
			for (let a = 0; a < r.data.length; a++) {
				let o = r.data[a];
				if (t && o.leftSweepEvent.featureId === i.featureId) continue;
				let s = wi(e, o);
				s !== !1 && n.push(s);
			}
			r.push(e);
		} else i.isLeftEndpoint === !1 && r.pop();
	}
	return n;
}
function Ei(e, t) {
	let n = new pi([], hi);
	return vi(e, n), Ti(n, t);
}
//#endregion
//#region ../../node_modules/@turf/line-intersect/dist/esm/index.js
var Di = Ei;
function Oi(e, t, n = {}) {
	let { removeDuplicates: r = !0, ignoreSelfIntersections: i = !0 } = n, a = [];
	e.type === "FeatureCollection" ? a = a.concat(e.features) : e.type === "Feature" ? a.push(e) : (e.type === "LineString" || e.type === "Polygon" || e.type === "MultiLineString" || e.type === "MultiPolygon") && a.push(Zr(e)), t.type === "FeatureCollection" ? a = a.concat(t.features) : t.type === "Feature" ? a.push(t) : (t.type === "LineString" || t.type === "Polygon" || t.type === "MultiLineString" || t.type === "MultiPolygon") && a.push(Zr(t));
	let o = Di(ei(a), i), s = [];
	if (r) {
		let e = {};
		o.forEach((t) => {
			let n = t.join(",");
			e[n] || (e[n] = !0, s.push(t));
		});
	} else s = o;
	return ei(s.map((e) => Qr(e)));
}
//#endregion
//#region ../../node_modules/@turf/meta/dist/esm/index.js
function ki(e, t, n) {
	if (e !== null) for (var r, i, a, o, s, c, l, u = 0, d = 0, f, p = e.type, m = p === "FeatureCollection", h = p === "Feature", g = m ? e.features.length : 1, _ = 0; _ < g; _++) {
		l = m ? e.features[_].geometry : h ? e.geometry : e, f = l ? l.type === "GeometryCollection" : !1, s = f ? l.geometries.length : 1;
		for (var v = 0; v < s; v++) {
			var y = 0, b = 0;
			if (o = f ? l.geometries[v] : l, o !== null) {
				c = o.coordinates;
				var x = o.type;
				switch (u = n && (x === "Polygon" || x === "MultiPolygon") ? 1 : 0, x) {
					case null: break;
					case "Point":
						if (t(c, d, _, y, b) === !1) return !1;
						d++, y++;
						break;
					case "LineString":
					case "MultiPoint":
						for (r = 0; r < c.length; r++) {
							if (t(c[r], d, _, y, b) === !1) return !1;
							d++, x === "MultiPoint" && y++;
						}
						x === "LineString" && y++;
						break;
					case "Polygon":
					case "MultiLineString":
						for (r = 0; r < c.length; r++) {
							for (i = 0; i < c[r].length - u; i++) {
								if (t(c[r][i], d, _, y, b) === !1) return !1;
								d++;
							}
							x === "MultiLineString" && y++, x === "Polygon" && b++;
						}
						x === "Polygon" && y++;
						break;
					case "MultiPolygon":
						for (r = 0; r < c.length; r++) {
							for (b = 0, i = 0; i < c[r].length; i++) {
								for (a = 0; a < c[r][i].length - u; a++) {
									if (t(c[r][i][a], d, _, y, b) === !1) return !1;
									d++;
								}
								b++;
							}
							y++;
						}
						break;
					case "GeometryCollection":
						for (r = 0; r < o.geometries.length; r++) if (ki(o.geometries[r], t, n) === !1) return !1;
						break;
					default: throw Error("Unknown Geometry Type");
				}
			}
		}
	}
}
function Ai(e, t) {
	if (e.type === "Feature") t(e, 0);
	else if (e.type === "FeatureCollection") for (var n = 0; n < e.features.length && t(e.features[n], n) !== !1; n++);
}
function ji(e, t, n) {
	var r = n;
	return Ai(e, function(e, i) {
		r = i === 0 && n === void 0 ? e : t(r, e, i);
	}), r;
}
function Mi(e, t) {
	var n, r, i, a, o, s, c, l, u, d, f = 0, p = e.type === "FeatureCollection", m = e.type === "Feature", h = p ? e.features.length : 1;
	for (n = 0; n < h; n++) {
		for (s = p ? e.features[n].geometry : m ? e.geometry : e, l = p ? e.features[n].properties : m ? e.properties : {}, u = p ? e.features[n].bbox : m ? e.bbox : void 0, d = p ? e.features[n].id : m ? e.id : void 0, c = s ? s.type === "GeometryCollection" : !1, o = c ? s.geometries.length : 1, i = 0; i < o; i++) {
			if (a = c ? s.geometries[i] : s, a === null) {
				if (t(null, f, l, u, d) === !1) return !1;
				continue;
			}
			switch (a.type) {
				case "Point":
				case "LineString":
				case "MultiPoint":
				case "Polygon":
				case "MultiLineString":
				case "MultiPolygon":
					if (t(a, f, l, u, d) === !1) return !1;
					break;
				case "GeometryCollection":
					for (r = 0; r < a.geometries.length; r++) if (t(a.geometries[r], f, l, u, d) === !1) return !1;
					break;
				default: throw Error("Unknown Geometry Type");
			}
		}
		f++;
	}
}
function Ni(e, t) {
	Mi(e, function(e, n, r, i, a) {
		var o = e === null ? null : e.type;
		switch (o) {
			case null:
			case "Point":
			case "LineString":
			case "Polygon": return t(Zr(e, r, {
				bbox: i,
				id: a
			}), n, 0) === !1 ? !1 : void 0;
		}
		var s;
		switch (o) {
			case "MultiPoint":
				s = "Point";
				break;
			case "MultiLineString":
				s = "LineString";
				break;
			case "MultiPolygon":
				s = "Polygon";
				break;
		}
		for (var c = 0; c < e.coordinates.length; c++) {
			var l = e.coordinates[c];
			if (t(Zr({
				type: s,
				coordinates: l
			}, r), n, c) === !1) return !1;
		}
	});
}
//#endregion
//#region ../../node_modules/@turf/polygon-to-line/dist/esm/index.js
function Pi(e, t = {}) {
	let n = li(e);
	switch (!t.properties && e.type === "Feature" && (t.properties = e.properties), n.type) {
		case "Polygon": return Fi(n, t);
		case "MultiPolygon": return Ii(n, t);
		default: throw Error("invalid poly");
	}
}
function Fi(e, t = {}) {
	let n = li(e).coordinates;
	return Li(n, t.properties ? t.properties : e.type === "Feature" ? e.properties : {});
}
function Ii(e, t = {}) {
	let n = li(e).coordinates, r = t.properties ? t.properties : e.type === "Feature" ? e.properties : {}, i = [];
	return n.forEach((e) => {
		i.push(Li(e, r));
	}), ei(i);
}
function Li(e, t) {
	return e.length > 1 ? ti(e, t) : $r(e[0], t);
}
//#endregion
//#region ../../node_modules/@turf/boolean-disjoint/dist/esm/index.js
function Ri(e, t, { ignoreSelfIntersections: n = !0 } = { ignoreSelfIntersections: !0 }) {
	let r = !0;
	return Ni(e, (e) => {
		Ni(t, (t) => {
			if (r === !1) return !1;
			r = zi(e.geometry, t.geometry, n);
		});
	}), r;
}
function zi(e, t, n) {
	switch (e.type) {
		case "Point":
			switch (t.type) {
				case "Point": return !Gi(e.coordinates, t.coordinates);
				case "LineString": return !Bi(t, e);
				case "Polygon": return !di(e, t);
			}
			break;
		case "LineString":
			switch (t.type) {
				case "Point": return !Bi(e, t);
				case "LineString": return !Vi(e, t, n);
				case "Polygon": return !Hi(t, e, n);
			}
			break;
		case "Polygon": switch (t.type) {
			case "Point": return !di(t, e);
			case "LineString": return !Hi(e, t, n);
			case "Polygon": return !Ui(t, e, n);
		}
	}
	return !1;
}
function Bi(e, t) {
	for (let n = 0; n < e.coordinates.length - 1; n++) if (Wi(e.coordinates[n], e.coordinates[n + 1], t.coordinates)) return !0;
	return !1;
}
function Vi(e, t, n) {
	return Oi(e, t, { ignoreSelfIntersections: n }).features.length > 0;
}
function Hi(e, t, n) {
	for (let n of t.coordinates) if (di(n, e)) return !0;
	return Oi(t, Pi(e), { ignoreSelfIntersections: n }).features.length > 0;
}
function Ui(e, t, n) {
	for (let n of e.coordinates[0]) if (di(n, t)) return !0;
	for (let n of t.coordinates[0]) if (di(n, e)) return !0;
	return Oi(Pi(e), Pi(t), { ignoreSelfIntersections: n }).features.length > 0;
}
function Wi(e, t, n) {
	let r = n[0] - e[0], i = n[1] - e[1], a = t[0] - e[0], o = t[1] - e[1];
	return r * o - i * a === 0 ? Math.abs(a) >= Math.abs(o) ? a > 0 ? e[0] <= n[0] && n[0] <= t[0] : t[0] <= n[0] && n[0] <= e[0] : o > 0 ? e[1] <= n[1] && n[1] <= t[1] : t[1] <= n[1] && n[1] <= e[1] : !1;
}
function Gi(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}
//#endregion
//#region ../../node_modules/@turf/boolean-intersects/dist/esm/index.js
function Ki(e, t, { ignoreSelfIntersections: n = !0 } = {}) {
	let r = !1;
	return Ni(e, (e) => {
		Ni(t, (t) => {
			if (r === !0) return !0;
			r = !Ri(e.geometry, t.geometry, { ignoreSelfIntersections: n });
		});
	}), r;
}
var qi = Ki;
//#endregion
//#region ../../node_modules/@turf/bbox/dist/esm/index.js
function Ji(e, t = {}) {
	if (e.bbox != null && !0 !== t.recompute) return e.bbox;
	let n = [
		Infinity,
		Infinity,
		-Infinity,
		-Infinity
	];
	return ki(e, (e) => {
		n[0] > e[0] && (n[0] = e[0]), n[1] > e[1] && (n[1] = e[1]), n[2] < e[0] && (n[2] = e[0]), n[3] < e[1] && (n[3] = e[1]);
	}), n;
}
//#endregion
//#region ../../node_modules/@turf/boolean-point-on-line/dist/esm/index.js
function Yi(e, t, n = {}) {
	let r = si(e), i = ci(t);
	for (let e = 0; e < i.length - 1; e++) {
		let t = !1;
		if (n.ignoreEndVertices && (e === 0 && (t = "start"), e === i.length - 2 && (t = "end"), e === 0 && e + 1 === i.length - 1 && (t = "both")), Xi(i[e], i[e + 1], r, t, n.epsilon === void 0 ? null : n.epsilon)) return !0;
	}
	return !1;
}
function Xi(e, t, n, r, i) {
	let a = n[0], o = n[1], s = e[0], c = e[1], l = t[0], u = t[1], d = n[0] - s, f = n[1] - c, p = l - s, m = u - c, h = d * m - f * p;
	if (i !== null) {
		if (Math.abs(h) > i) return !1;
	} else if (h !== 0) return !1;
	return Math.abs(p) === Math.abs(m) && Math.abs(p) === 0 ? r ? !1 : n[0] === e[0] && n[1] === e[1] : r ? r === "start" ? Math.abs(p) >= Math.abs(m) ? p > 0 ? s < a && a <= l : l <= a && a < s : m > 0 ? c < o && o <= u : u <= o && o < c : r === "end" ? Math.abs(p) >= Math.abs(m) ? p > 0 ? s <= a && a < l : l < a && a <= s : m > 0 ? c <= o && o < u : u < o && o <= c : r === "both" ? Math.abs(p) >= Math.abs(m) ? p > 0 ? s < a && a < l : l < a && a < s : m > 0 ? c < o && o < u : u < o && o < c : !1 : Math.abs(p) >= Math.abs(m) ? p > 0 ? s <= a && a <= l : l <= a && a <= s : m > 0 ? c <= o && o <= u : u <= o && o <= c;
}
//#endregion
//#region ../../node_modules/@turf/geojson-rbush/dist/esm/index.js
var Zi = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n ||= self).RBush = r();
	})(e, function() {
		function e(e, r, i, a, o) {
			(function e(n, r, i, a, o) {
				for (; a > i;) {
					if (a - i > 600) {
						var s = a - i + 1, c = r - i + 1, l = Math.log(s), u = .5 * Math.exp(2 * l / 3), d = .5 * Math.sqrt(l * u * (s - u) / s) * (c - s / 2 < 0 ? -1 : 1);
						e(n, r, Math.max(i, Math.floor(r - c * u / s + d)), Math.min(a, Math.floor(r + (s - c) * u / s + d)), o);
					}
					var f = n[r], p = i, m = a;
					for (t(n, i, r), o(n[a], f) > 0 && t(n, i, a); p < m;) {
						for (t(n, p, m), p++, m--; o(n[p], f) < 0;) p++;
						for (; o(n[m], f) > 0;) m--;
					}
					o(n[i], f) === 0 ? t(n, i, m) : t(n, ++m, a), m <= r && (i = m + 1), r <= m && (a = m - 1);
				}
			})(e, r, i || 0, a || e.length - 1, o || n);
		}
		function t(e, t, n) {
			var r = e[t];
			e[t] = e[n], e[n] = r;
		}
		function n(e, t) {
			return e < t ? -1 : +(e > t);
		}
		var r = function(e) {
			e === void 0 && (e = 9), this._maxEntries = Math.max(4, e), this._minEntries = Math.max(2, Math.ceil(.4 * this._maxEntries)), this.clear();
		};
		function i(e, t, n) {
			if (!n) return t.indexOf(e);
			for (var r = 0; r < t.length; r++) if (n(e, t[r])) return r;
			return -1;
		}
		function a(e, t) {
			o(e, 0, e.children.length, t, e);
		}
		function o(e, t, n, r, i) {
			i ||= m(null), i.minX = Infinity, i.minY = Infinity, i.maxX = -Infinity, i.maxY = -Infinity;
			for (var a = t; a < n; a++) {
				var o = e.children[a];
				s(i, e.leaf ? r(o) : o);
			}
			return i;
		}
		function s(e, t) {
			return e.minX = Math.min(e.minX, t.minX), e.minY = Math.min(e.minY, t.minY), e.maxX = Math.max(e.maxX, t.maxX), e.maxY = Math.max(e.maxY, t.maxY), e;
		}
		function c(e, t) {
			return e.minX - t.minX;
		}
		function l(e, t) {
			return e.minY - t.minY;
		}
		function u(e) {
			return (e.maxX - e.minX) * (e.maxY - e.minY);
		}
		function d(e) {
			return e.maxX - e.minX + (e.maxY - e.minY);
		}
		function f(e, t) {
			return e.minX <= t.minX && e.minY <= t.minY && t.maxX <= e.maxX && t.maxY <= e.maxY;
		}
		function p(e, t) {
			return t.minX <= e.maxX && t.minY <= e.maxY && t.maxX >= e.minX && t.maxY >= e.minY;
		}
		function m(e) {
			return {
				children: e,
				height: 1,
				leaf: !0,
				minX: Infinity,
				minY: Infinity,
				maxX: -Infinity,
				maxY: -Infinity
			};
		}
		function h(t, n, r, i, a) {
			for (var o = [n, r]; o.length;) if (!((r = o.pop()) - (n = o.pop()) <= i)) {
				var s = n + Math.ceil((r - n) / i / 2) * i;
				e(t, s, n, r, a), o.push(n, s, s, r);
			}
		}
		return r.prototype.all = function() {
			return this._all(this.data, []);
		}, r.prototype.search = function(e) {
			var t = this.data, n = [];
			if (!p(e, t)) return n;
			for (var r = this.toBBox, i = []; t;) {
				for (var a = 0; a < t.children.length; a++) {
					var o = t.children[a], s = t.leaf ? r(o) : o;
					p(e, s) && (t.leaf ? n.push(o) : f(e, s) ? this._all(o, n) : i.push(o));
				}
				t = i.pop();
			}
			return n;
		}, r.prototype.collides = function(e) {
			var t = this.data;
			if (!p(e, t)) return !1;
			for (var n = []; t;) {
				for (var r = 0; r < t.children.length; r++) {
					var i = t.children[r], a = t.leaf ? this.toBBox(i) : i;
					if (p(e, a)) {
						if (t.leaf || f(e, a)) return !0;
						n.push(i);
					}
				}
				t = n.pop();
			}
			return !1;
		}, r.prototype.load = function(e) {
			if (!e || !e.length) return this;
			if (e.length < this._minEntries) {
				for (var t = 0; t < e.length; t++) this.insert(e[t]);
				return this;
			}
			var n = this._build(e.slice(), 0, e.length - 1, 0);
			if (this.data.children.length) if (this.data.height === n.height) this._splitRoot(this.data, n);
			else {
				if (this.data.height < n.height) {
					var r = this.data;
					this.data = n, n = r;
				}
				this._insert(n, this.data.height - n.height - 1, !0);
			}
			else this.data = n;
			return this;
		}, r.prototype.insert = function(e) {
			return e && this._insert(e, this.data.height - 1), this;
		}, r.prototype.clear = function() {
			return this.data = m([]), this;
		}, r.prototype.remove = function(e, t) {
			if (!e) return this;
			for (var n, r, a, o = this.data, s = this.toBBox(e), c = [], l = []; o || c.length;) {
				if (o || (o = c.pop(), r = c[c.length - 1], n = l.pop(), a = !0), o.leaf) {
					var u = i(e, o.children, t);
					if (u !== -1) return o.children.splice(u, 1), c.push(o), this._condense(c), this;
				}
				a || o.leaf || !f(o, s) ? r ? (n++, o = r.children[n], a = !1) : o = null : (c.push(o), l.push(n), n = 0, r = o, o = o.children[0]);
			}
			return this;
		}, r.prototype.toBBox = function(e) {
			return e;
		}, r.prototype.compareMinX = function(e, t) {
			return e.minX - t.minX;
		}, r.prototype.compareMinY = function(e, t) {
			return e.minY - t.minY;
		}, r.prototype.toJSON = function() {
			return this.data;
		}, r.prototype.fromJSON = function(e) {
			return this.data = e, this;
		}, r.prototype._all = function(e, t) {
			for (var n = []; e;) e.leaf ? t.push.apply(t, e.children) : n.push.apply(n, e.children), e = n.pop();
			return t;
		}, r.prototype._build = function(e, t, n, r) {
			var i, o = n - t + 1, s = this._maxEntries;
			if (o <= s) return a(i = m(e.slice(t, n + 1)), this.toBBox), i;
			r || (r = Math.ceil(Math.log(o) / Math.log(s)), s = Math.ceil(o / s ** (r - 1))), (i = m([])).leaf = !1, i.height = r;
			var c = Math.ceil(o / s), l = c * Math.ceil(Math.sqrt(s));
			h(e, t, n, l, this.compareMinX);
			for (var u = t; u <= n; u += l) {
				var d = Math.min(u + l - 1, n);
				h(e, u, d, c, this.compareMinY);
				for (var f = u; f <= d; f += c) {
					var p = Math.min(f + c - 1, d);
					i.children.push(this._build(e, f, p, r - 1));
				}
			}
			return a(i, this.toBBox), i;
		}, r.prototype._chooseSubtree = function(e, t, n, r) {
			for (; r.push(t), !t.leaf && r.length - 1 !== n;) {
				for (var i = Infinity, a = Infinity, o = void 0, s = 0; s < t.children.length; s++) {
					var c = t.children[s], l = u(c), d = (f = e, p = c, (Math.max(p.maxX, f.maxX) - Math.min(p.minX, f.minX)) * (Math.max(p.maxY, f.maxY) - Math.min(p.minY, f.minY)) - l);
					d < a ? (a = d, i = l < i ? l : i, o = c) : d === a && l < i && (i = l, o = c);
				}
				t = o || t.children[0];
			}
			var f, p;
			return t;
		}, r.prototype._insert = function(e, t, n) {
			var r = n ? e : this.toBBox(e), i = [], a = this._chooseSubtree(r, this.data, t, i);
			for (a.children.push(e), s(a, r); t >= 0 && i[t].children.length > this._maxEntries;) this._split(i, t), t--;
			this._adjustParentBBoxes(r, i, t);
		}, r.prototype._split = function(e, t) {
			var n = e[t], r = n.children.length, i = this._minEntries;
			this._chooseSplitAxis(n, i, r);
			var o = this._chooseSplitIndex(n, i, r), s = m(n.children.splice(o, n.children.length - o));
			s.height = n.height, s.leaf = n.leaf, a(n, this.toBBox), a(s, this.toBBox), t ? e[t - 1].children.push(s) : this._splitRoot(n, s);
		}, r.prototype._splitRoot = function(e, t) {
			this.data = m([e, t]), this.data.height = e.height + 1, this.data.leaf = !1, a(this.data, this.toBBox);
		}, r.prototype._chooseSplitIndex = function(e, t, n) {
			for (var r, i, a, s, c, l, d, f = Infinity, p = Infinity, m = t; m <= n - t; m++) {
				var h = o(e, 0, m, this.toBBox), g = o(e, m, n, this.toBBox), _ = (i = h, a = g, s = void 0, c = void 0, l = void 0, d = void 0, s = Math.max(i.minX, a.minX), c = Math.max(i.minY, a.minY), l = Math.min(i.maxX, a.maxX), d = Math.min(i.maxY, a.maxY), Math.max(0, l - s) * Math.max(0, d - c)), v = u(h) + u(g);
				_ < f ? (f = _, r = m, p = v < p ? v : p) : _ === f && v < p && (p = v, r = m);
			}
			return r || n - t;
		}, r.prototype._chooseSplitAxis = function(e, t, n) {
			var r = e.leaf ? this.compareMinX : c, i = e.leaf ? this.compareMinY : l;
			this._allDistMargin(e, t, n, r) < this._allDistMargin(e, t, n, i) && e.children.sort(r);
		}, r.prototype._allDistMargin = function(e, t, n, r) {
			e.children.sort(r);
			for (var i = this.toBBox, a = o(e, 0, t, i), c = o(e, n - t, n, i), l = d(a) + d(c), u = t; u < n - t; u++) {
				var f = e.children[u];
				s(a, e.leaf ? i(f) : f), l += d(a);
			}
			for (var p = n - t - 1; p >= t; p--) {
				var m = e.children[p];
				s(c, e.leaf ? i(m) : m), l += d(c);
			}
			return l;
		}, r.prototype._adjustParentBBoxes = function(e, t, n) {
			for (var r = n; r >= 0; r--) s(t[r], e);
		}, r.prototype._condense = function(e) {
			for (var t = e.length - 1, n = void 0; t >= 0; t--) e[t].children.length === 0 ? t > 0 ? (n = e[t - 1].children).splice(n.indexOf(e[t]), 1) : this.clear() : a(e[t], this.toBBox);
		}, r;
	});
})))(), 1);
function Qi(e) {
	var t;
	if (e.bbox) t = e.bbox;
	else if (Array.isArray(e) && e.length === 4) t = e;
	else if (Array.isArray(e) && e.length === 6) t = [
		e[0],
		e[1],
		e[3],
		e[4]
	];
	else if (e.type === "Feature") t = Ji(e);
	else if (e.type === "FeatureCollection") t = Ji(e);
	else throw Error("invalid geojson");
	return {
		minX: t[0],
		minY: t[1],
		maxX: t[2],
		maxY: t[3]
	};
}
var $i = class {
	constructor(e = 9) {
		this.tree = new Zi.default(e), this.tree.toBBox = Qi;
	}
	insert(e) {
		if (e.type !== "Feature") throw Error("invalid feature");
		return e.bbox = e.bbox ? e.bbox : Ji(e), this.tree.insert(e), this;
	}
	load(e) {
		var t = [];
		return Array.isArray(e) ? e.forEach(function(e) {
			if (e.type !== "Feature") throw Error("invalid features");
			e.bbox = e.bbox ? e.bbox : Ji(e), t.push(e);
		}) : Ai(e, function(e) {
			if (e.type !== "Feature") throw Error("invalid features");
			e.bbox = e.bbox ? e.bbox : Ji(e), t.push(e);
		}), this.tree.load(t), this;
	}
	remove(e, t) {
		if (e.type !== "Feature") throw Error("invalid feature");
		return e.bbox = e.bbox ? e.bbox : Ji(e), this.tree.remove(e, t), this;
	}
	clear() {
		return this.tree.clear(), this;
	}
	search(e) {
		return ei(this.tree.search(Qi(e)));
	}
	collides(e) {
		return this.tree.collides(Qi(e));
	}
	all() {
		return ei(this.tree.all());
	}
	toJSON() {
		return this.tree.toJSON();
	}
	fromJSON(e) {
		return this.tree.fromJSON(e), this;
	}
};
function ea(e) {
	return new $i(e);
}
//#endregion
//#region ../../node_modules/@turf/truncate/dist/esm/index.js
function ta(e, t) {
	if (t ??= {}, !oi(t)) throw Error("options is invalid");
	var n = t.precision, r = t.coordinates, i = t.mutate;
	if (n = n == null || isNaN(n) ? 6 : n, r = r == null || isNaN(r) ? 3 : r, !e) throw Error("<geojson> is required");
	if (typeof n != "number") throw Error("<precision> must be a number");
	if (typeof r != "number") throw Error("<coordinates> must be a number");
	(i === !1 || i === void 0) && (e = JSON.parse(JSON.stringify(e)));
	var a = 10 ** n;
	return ki(e, function(e) {
		na(e, a, r);
	}), e;
}
function na(e, t, n) {
	e.length > n && e.splice(n, e.length);
	for (var r = 0; r < e.length; r++) e[r] = Math.round(e[r] * t) / t;
	return e;
}
//#endregion
//#region ../../node_modules/@turf/line-segment/dist/esm/index.js
function ra(e) {
	if (!e) throw Error("geojson is required");
	let t = [];
	return Ni(e, (e) => {
		ia(e, t);
	}), ei(t);
}
function ia(e, t) {
	let n = [], r = e.geometry;
	if (r !== null) {
		switch (r.type) {
			case "Polygon":
				n = ci(r);
				break;
			case "LineString": n = [ci(r)];
		}
		n.forEach((n) => {
			aa(n, e.properties).forEach((e) => {
				e.id = t.length, t.push(e);
			});
		});
	}
}
function aa(e, t) {
	let n = [];
	return e.reduce((e, r) => {
		let i = $r([e, r], t);
		return i.bbox = oa(e, r), n.push(i), r;
	}), n;
}
function oa(e, t) {
	let n = e[0], r = e[1], i = t[0], a = t[1];
	return [
		n < i ? n : i,
		r < a ? r : a,
		n > i ? n : i,
		r > a ? r : a
	];
}
//#endregion
//#region ../../node_modules/@turf/distance/dist/esm/index.js
function sa(e, t, n = {}) {
	var r = si(e), i = si(t), a = ii(i[1] - r[1]), o = ii(i[0] - r[0]), s = ii(r[1]), c = ii(i[1]), l = Math.sin(a / 2) ** 2 + Math.sin(o / 2) ** 2 * Math.cos(s) * Math.cos(c);
	return ni(2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l)), n.units);
}
//#endregion
//#region ../../node_modules/@turf/nearest-point-on-line/dist/esm/index.js
var ca = Object.defineProperty, la = Object.defineProperties, ua = Object.getOwnPropertyDescriptors, da = Object.getOwnPropertySymbols, fa = Object.prototype.hasOwnProperty, pa = Object.prototype.propertyIsEnumerable, ma = (e, t, n) => t in e ? ca(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ha = (e, t) => {
	for (var n in t ||= {}) fa.call(t, n) && ma(e, n, t[n]);
	if (da) for (var n of da(t)) pa.call(t, n) && ma(e, n, t[n]);
	return e;
}, ga = (e, t) => la(e, ua(t));
function _a(e, t, n = {}) {
	if (!e || !t) throw Error("lines and inputPoint are required arguments");
	let r = si(t), i = Qr([Infinity, Infinity], {
		lineStringIndex: -1,
		segmentIndex: -1,
		totalDistance: -1,
		lineDistance: -1,
		segmentDistance: -1,
		pointDistance: Infinity,
		multiFeatureIndex: -1,
		index: -1,
		location: -1,
		dist: Infinity
	}), a = 0, o = 0, s = -1;
	return Ni(e, function(e, c, l) {
		s !== l && (s = l, o = 0);
		let u = ci(e);
		for (let e = 0; e < u.length - 1; e++) {
			let s = Qr(u[e]), c = si(s), d = Qr(u[e + 1]), f = si(d), p = sa(s, d, n), m, h;
			f[0] === r[0] && f[1] === r[1] ? [m, h] = [f, !0] : c[0] === r[0] && c[1] === r[1] ? [m, h] = [c, !1] : [m, h] = wa(c, f, r);
			let g = sa(t, m, n);
			if (g < i.properties.pointDistance) {
				let t = sa(s, m, n);
				i = Qr(m, {
					lineStringIndex: l,
					segmentIndex: h ? e + 1 : e,
					totalDistance: a + t,
					lineDistance: o + t,
					segmentDistance: t,
					pointDistance: g,
					multiFeatureIndex: -1,
					index: -1,
					location: -1,
					dist: Infinity
				}), i.properties = ga(ha({}, i.properties), {
					multiFeatureIndex: i.properties.lineStringIndex,
					index: i.properties.segmentIndex,
					location: i.properties.totalDistance,
					dist: i.properties.pointDistance
				});
			}
			a += p, o += p;
		}
	}), i;
}
function va(e, t) {
	let [n, r, i] = e, [a, o, s] = t;
	return n * a + r * o + i * s;
}
function ya(e, t) {
	let [n, r, i] = e, [a, o, s] = t;
	return [
		r * s - i * o,
		i * a - n * s,
		n * o - r * a
	];
}
function ba(e) {
	return Math.sqrt(e[0] ** 2 + e[1] ** 2 + e[2] ** 2);
}
function xa(e) {
	let t = ba(e);
	return [
		e[0] / t,
		e[1] / t,
		e[2] / t
	];
}
function Sa(e) {
	let t = ii(e[1]), n = ii(e[0]);
	return [
		Math.cos(t) * Math.cos(n),
		Math.cos(t) * Math.sin(n),
		Math.sin(t)
	];
}
function Ca(e) {
	let [t, n, r] = e, i = ri(Math.asin(Math.min(Math.max(r, -1), 1)));
	return [ri(Math.atan2(n, t)), i];
}
function wa(e, t, n) {
	let r = Sa(e), i = Sa(t), a = Sa(n), o = ya(r, i);
	if (o[0] === 0 && o[1] === 0 && o[2] === 0) return va(r, i) > 0 ? [[...t], !0] : [[...n], !1];
	let s = ya(o, a);
	if (s[0] === 0 && s[1] === 0 && s[2] === 0) return [[...t], !0];
	let c = xa(ya(s, o)), l = [
		-c[0],
		-c[1],
		-c[2]
	], u = va(a, c) > va(a, l) ? c : l, d = xa(o), f = va(ya(r, u), d), p = va(ya(u, i), d);
	return f >= 0 && p >= 0 ? [Ca(u), !1] : va(r, a) > va(i, a) ? [[...e], !1] : [[...t], !0];
}
//#endregion
//#region ../../node_modules/@turf/line-split/dist/esm/index.js
function Ta(e, t) {
	if (!e) throw Error("line is required");
	if (!t) throw Error("splitter is required");
	let n = ui(e), r = ui(t);
	if (n !== "LineString") throw Error("line must be LineString");
	if (r === "FeatureCollection") throw Error("splitter cannot be a FeatureCollection");
	if (r === "GeometryCollection") throw Error("splitter cannot be a GeometryCollection");
	var i = ta(t, { precision: 7 });
	switch (e.type !== "Feature" && (e = Zr(e)), r) {
		case "Point": return Da(e, i);
		case "MultiPoint": return Ea(e, i);
		case "LineString":
		case "MultiLineString":
		case "Polygon":
		case "MultiPolygon": return Ea(e, Oi(e, i, { ignoreSelfIntersections: !0 }));
	}
}
function Ea(e, t) {
	var n = [], r = ea();
	return Ni(t, function(t) {
		if (n.forEach(function(e, t) {
			e.id = t;
		}), !n.length) n = Da(e, t).features, r.load(ei(n));
		else {
			var i = r.search(t);
			if (i.features.length) {
				var a = Oa(t, i);
				n = n.filter(function(e) {
					return e.id !== a.id;
				}), r.remove(a), Ai(Da(a, t), function(e) {
					n.push(e), r.insert(e);
				});
			}
		}
	}), ei(n);
}
function Da(e, t) {
	var n = [], r = ci(e)[0], i = ci(e)[e.geometry.coordinates.length - 1];
	if (ka(r, si(t)) || ka(i, si(t))) return ei([e]);
	var a = ea(), o = ra(e);
	a.load(o);
	var s = a.search(t);
	if (!s.features.length) return ei([e]);
	var c = Oa(t, s), l = ji(o, function(e, r, i) {
		var a = ci(r)[1], o = si(t);
		return i === c.id ? (e.push(o), n.push($r(e)), ka(o, a) ? [o] : [o, a]) : (e.push(a), e);
	}, [r]);
	return l.length > 1 && n.push($r(l)), ei(n);
}
function Oa(e, t) {
	if (!t.features.length) throw Error("lines must contain features");
	if (t.features.length === 1) return t.features[0];
	var n, r = Infinity;
	return Ai(t, function(t) {
		var i = _a(t, e).properties.pointDistance;
		i < r && (n = t, r = i);
	}), n;
}
function ka(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}
//#endregion
//#region ../../node_modules/@turf/boolean-within/dist/esm/index.js
function Aa(e, t) {
	var n = li(e), r = li(t), i = n.type, a = r.type;
	switch (i) {
		case "Point": switch (a) {
			case "MultiPoint": return ja(n, r);
			case "LineString": return Yi(n, r, { ignoreEndVertices: !0 });
			case "Polygon":
			case "MultiPolygon": return di(n, r, { ignoreBoundary: !0 });
			default: throw Error("feature2 " + a + " geometry not supported");
		}
		case "MultiPoint": switch (a) {
			case "MultiPoint": return Ma(n, r);
			case "LineString": return Na(n, r);
			case "Polygon":
			case "MultiPolygon": return Pa(n, r);
			default: throw Error("feature2 " + a + " geometry not supported");
		}
		case "LineString": switch (a) {
			case "LineString": return Fa(n, r);
			case "Polygon":
			case "MultiPolygon": return La(n, r);
			default: throw Error("feature2 " + a + " geometry not supported");
		}
		case "Polygon": switch (a) {
			case "Polygon":
			case "MultiPolygon": return Ra(n, r);
			default: throw Error("feature2 " + a + " geometry not supported");
		}
		default: throw Error("feature1 " + i + " geometry not supported");
	}
}
function ja(e, t) {
	var n, r = !1;
	for (n = 0; n < t.coordinates.length; n++) if (Ba(t.coordinates[n], e.coordinates)) {
		r = !0;
		break;
	}
	return r;
}
function Ma(e, t) {
	for (var n = 0; n < e.coordinates.length; n++) {
		for (var r = !1, i = 0; i < t.coordinates.length; i++) Ba(e.coordinates[n], t.coordinates[i]) && (r = !0);
		if (!r) return !1;
	}
	return !0;
}
function Na(e, t) {
	for (var n = !1, r = 0; r < e.coordinates.length; r++) {
		if (!Yi(e.coordinates[r], t)) return !1;
		n ||= Yi(e.coordinates[r], t, { ignoreEndVertices: !0 });
	}
	return n;
}
function Pa(e, t) {
	for (var n = !0, r = !1, i = !1, a = 0; a < e.coordinates.length; a++) {
		if (i = di(e.coordinates[a], t), !i) {
			n = !1;
			break;
		}
		r || (i = di(e.coordinates[a], t, { ignoreBoundary: !0 }));
	}
	return n && i;
}
function Fa(e, t) {
	for (var n = 0; n < e.coordinates.length; n++) if (!Yi(e.coordinates[n], t)) return !1;
	return !0;
}
function Ia(e, t) {
	let n = e.coordinates, r = [];
	for (let e = 0; e < n.length - 1; e++) {
		let i = $r([n[e], n[e + 1]]), a = Ta(i, Zr(t));
		a.features.length === 0 ? r.push(i) : r.push(...a.features);
	}
	return ei(r);
}
function La(e, t) {
	if (!za(Ji(t), Ji(e))) return !1;
	for (let n of e.coordinates) if (!di(n, t)) return !1;
	let n = !1, r = Ia(e, t);
	for (let e of r.features) {
		let r = Va(e.geometry.coordinates[0], e.geometry.coordinates[1]);
		if (!di(r, t)) return !1;
		!n && di(r, t, { ignoreBoundary: !0 }) && (n = !0);
	}
	return n;
}
function Ra(e, t) {
	var n = Ji(e);
	if (!za(Ji(t), n)) return !1;
	for (var r = 0; r < e.coordinates[0].length; r++) if (!di(e.coordinates[0][r], t)) return !1;
	return !0;
}
function za(e, t) {
	return !(e[0] > t[0] || e[2] < t[2] || e[1] > t[1] || e[3] < t[3]);
}
function Ba(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}
function Va(e, t) {
	return [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2];
}
var Ha = Aa, Ua = (e, t) => t ? qi(e, t) : !0, Wa = (e, t) => t ? Ha(e, t) : !0;
//#endregion
//#region src/helpers/highlighting.js
function Ga(e, t = "highlight", n = "title") {
	let r = (e, n = []) => {
		let r = "", i = 0, a = 0;
		return n.forEach((n, o) => {
			let s = n[1] + 1;
			o && a > n[0] || (a = n[1], r += [
				e.substring(i, n[0]),
				`<mark class="${t}">`,
				e.substring(n[0], s),
				"</mark>"
			].join(""), i = s);
		}), r += e.substring(i), r;
	};
	return e.filter(({ matches: e }) => e && e.length).map(({ item: e, matches: t }) => {
		let i = { ...e };
		return t.forEach((e) => {
			e.key === n && (i.highlightedText = r(ro(e.value), io(e.indices)));
		}), i;
	});
}
//#endregion
//#region src/helpers/filter-client.js
var $ = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	(function(n, r) {
		typeof e == "object" && t !== void 0 ? t.exports = r() : typeof define == "function" && define.amd ? define(r) : (n = typeof globalThis < "u" ? globalThis : n || self).dayjs = r();
	})(e, (function() {
		var e = 1e3, t = 6e4, n = 36e5, r = "millisecond", i = "second", a = "minute", o = "hour", s = "day", c = "week", l = "month", u = "quarter", d = "year", f = "date", p = "Invalid Date", m = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, g = {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
			ordinal: function(e) {
				var t = [
					"th",
					"st",
					"nd",
					"rd"
				], n = e % 100;
				return "[" + e + (t[(n - 20) % 10] || t[n] || t[0]) + "]";
			}
		}, _ = function(e, t, n) {
			var r = String(e);
			return !r || r.length >= t ? e : "" + Array(t + 1 - r.length).join(n) + e;
		}, v = {
			s: _,
			z: function(e) {
				var t = -e.utcOffset(), n = Math.abs(t), r = Math.floor(n / 60), i = n % 60;
				return (t <= 0 ? "+" : "-") + _(r, 2, "0") + ":" + _(i, 2, "0");
			},
			m: function e(t, n) {
				if (t.date() < n.date()) return -e(n, t);
				var r = 12 * (n.year() - t.year()) + (n.month() - t.month()), i = t.clone().add(r, l), a = n - i < 0, o = t.clone().add(r + (a ? -1 : 1), l);
				return +(-(r + (n - i) / (a ? i - o : o - i)) || 0);
			},
			a: function(e) {
				return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
			},
			p: function(e) {
				return {
					M: l,
					y: d,
					w: c,
					d: s,
					D: f,
					h: o,
					m: a,
					s: i,
					ms: r,
					Q: u
				}[e] || String(e || "").toLowerCase().replace(/s$/, "");
			},
			u: function(e) {
				return e === void 0;
			}
		}, y = "en", b = {};
		b[y] = g;
		var x = "$isDayjsObject", S = function(e) {
			return e instanceof E || !(!e || !e[x]);
		}, C = function e(t, n, r) {
			var i;
			if (!t) return y;
			if (typeof t == "string") {
				var a = t.toLowerCase();
				b[a] && (i = a), n && (b[a] = n, i = a);
				var o = t.split("-");
				if (!i && o.length > 1) return e(o[0]);
			} else {
				var s = t.name;
				b[s] = t, i = s;
			}
			return !r && i && (y = i), i || !r && y;
		}, w = function(e, t) {
			if (S(e)) return e.clone();
			var n = typeof t == "object" ? t : {};
			return n.date = e, n.args = arguments, new E(n);
		}, T = v;
		T.l = C, T.i = S, T.w = function(e, t) {
			return w(e, {
				locale: t.$L,
				utc: t.$u,
				x: t.$x,
				$offset: t.$offset
			});
		};
		var E = function() {
			function g(e) {
				this.$L = C(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[x] = !0;
			}
			var _ = g.prototype;
			return _.parse = function(e) {
				this.$d = function(e) {
					var t = e.date, n = e.utc;
					if (t === null) return /* @__PURE__ */ new Date(NaN);
					if (T.u(t)) return /* @__PURE__ */ new Date();
					if (t instanceof Date) return new Date(t);
					if (typeof t == "string" && !/Z$/i.test(t)) {
						var r = t.match(m);
						if (r) {
							var i = r[2] - 1 || 0, a = (r[7] || "0").substring(0, 3);
							return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, a);
						}
					}
					return new Date(t);
				}(e), this.init();
			}, _.init = function() {
				var e = this.$d;
				this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
			}, _.$utils = function() {
				return T;
			}, _.isValid = function() {
				return this.$d.toString() !== p;
			}, _.isSame = function(e, t) {
				var n = w(e);
				return this.startOf(t) <= n && n <= this.endOf(t);
			}, _.isAfter = function(e, t) {
				return w(e) < this.startOf(t);
			}, _.isBefore = function(e, t) {
				return this.endOf(t) < w(e);
			}, _.$g = function(e, t, n) {
				return T.u(e) ? this[t] : this.set(n, e);
			}, _.unix = function() {
				return Math.floor(this.valueOf() / 1e3);
			}, _.valueOf = function() {
				return this.$d.getTime();
			}, _.startOf = function(e, t) {
				var n = this, r = !!T.u(t) || t, u = T.p(e), p = function(e, t) {
					var i = T.w(n.$u ? Date.UTC(n.$y, t, e) : new Date(n.$y, t, e), n);
					return r ? i : i.endOf(s);
				}, m = function(e, t) {
					return T.w(n.toDate()[e].apply(n.toDate("s"), (r ? [
						0,
						0,
						0,
						0
					] : [
						23,
						59,
						59,
						999
					]).slice(t)), n);
				}, h = this.$W, g = this.$M, _ = this.$D, v = "set" + (this.$u ? "UTC" : "");
				switch (u) {
					case d: return r ? p(1, 0) : p(31, 11);
					case l: return r ? p(1, g) : p(0, g + 1);
					case c:
						var y = this.$locale().weekStart || 0, b = (h < y ? h + 7 : h) - y;
						return p(r ? _ - b : _ + (6 - b), g);
					case s:
					case f: return m(v + "Hours", 0);
					case o: return m(v + "Minutes", 1);
					case a: return m(v + "Seconds", 2);
					case i: return m(v + "Milliseconds", 3);
					default: return this.clone();
				}
			}, _.endOf = function(e) {
				return this.startOf(e, !1);
			}, _.$set = function(e, t) {
				var n, c = T.p(e), u = "set" + (this.$u ? "UTC" : ""), p = (n = {}, n[s] = u + "Date", n[f] = u + "Date", n[l] = u + "Month", n[d] = u + "FullYear", n[o] = u + "Hours", n[a] = u + "Minutes", n[i] = u + "Seconds", n[r] = u + "Milliseconds", n)[c], m = c === s ? this.$D + (t - this.$W) : t;
				if (c === l || c === d) {
					var h = this.clone().set(f, 1);
					h.$d[p](m), h.init(), this.$d = h.set(f, Math.min(this.$D, h.daysInMonth())).$d;
				} else p && this.$d[p](m);
				return this.init(), this;
			}, _.set = function(e, t) {
				return this.clone().$set(e, t);
			}, _.get = function(e) {
				return this[T.p(e)]();
			}, _.add = function(r, u) {
				var f, p = this;
				r = Number(r);
				var m = T.p(u), h = function(e) {
					var t = w(p);
					return T.w(t.date(t.date() + Math.round(e * r)), p);
				};
				if (m === l) return this.set(l, this.$M + r);
				if (m === d) return this.set(d, this.$y + r);
				if (m === s) return h(1);
				if (m === c) return h(7);
				var g = (f = {}, f[a] = t, f[o] = n, f[i] = e, f)[m] || 1, _ = this.$d.getTime() + r * g;
				return T.w(_, this);
			}, _.subtract = function(e, t) {
				return this.add(-1 * e, t);
			}, _.format = function(e) {
				var t = this, n = this.$locale();
				if (!this.isValid()) return n.invalidDate || p;
				var r = e || "YYYY-MM-DDTHH:mm:ssZ", i = T.z(this), a = this.$H, o = this.$m, s = this.$M, c = n.weekdays, l = n.months, u = n.meridiem, d = function(e, n, i, a) {
					return e && (e[n] || e(t, r)) || i[n].slice(0, a);
				}, f = function(e) {
					return T.s(a % 12 || 12, e, "0");
				}, m = u || function(e, t, n) {
					var r = e < 12 ? "AM" : "PM";
					return n ? r.toLowerCase() : r;
				};
				return r.replace(h, (function(e, r) {
					return r || function(e) {
						switch (e) {
							case "YY": return String(t.$y).slice(-2);
							case "YYYY": return T.s(t.$y, 4, "0");
							case "M": return s + 1;
							case "MM": return T.s(s + 1, 2, "0");
							case "MMM": return d(n.monthsShort, s, l, 3);
							case "MMMM": return d(l, s);
							case "D": return t.$D;
							case "DD": return T.s(t.$D, 2, "0");
							case "d": return String(t.$W);
							case "dd": return d(n.weekdaysMin, t.$W, c, 2);
							case "ddd": return d(n.weekdaysShort, t.$W, c, 3);
							case "dddd": return c[t.$W];
							case "H": return String(a);
							case "HH": return T.s(a, 2, "0");
							case "h": return f(1);
							case "hh": return f(2);
							case "a": return m(a, o, !0);
							case "A": return m(a, o, !1);
							case "m": return String(o);
							case "mm": return T.s(o, 2, "0");
							case "s": return String(t.$s);
							case "ss": return T.s(t.$s, 2, "0");
							case "SSS": return T.s(t.$ms, 3, "0");
							case "Z": return i;
						}
						return null;
					}(e) || i.replace(":", "");
				}));
			}, _.utcOffset = function() {
				return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
			}, _.diff = function(r, f, p) {
				var m, h = this, g = T.p(f), _ = w(r), v = (_.utcOffset() - this.utcOffset()) * t, y = this - _, b = function() {
					return T.m(h, _);
				};
				switch (g) {
					case d:
						m = b() / 12;
						break;
					case l:
						m = b();
						break;
					case u:
						m = b() / 3;
						break;
					case c:
						m = (y - v) / 6048e5;
						break;
					case s:
						m = (y - v) / 864e5;
						break;
					case o:
						m = y / n;
						break;
					case a:
						m = y / t;
						break;
					case i:
						m = y / e;
						break;
					default: m = y;
				}
				return p ? m : T.a(m);
			}, _.daysInMonth = function() {
				return this.endOf(l).$D;
			}, _.$locale = function() {
				return b[this.$L];
			}, _.locale = function(e, t) {
				if (!e) return this.$L;
				var n = this.clone(), r = C(e, t, !0);
				return r && (n.$L = r), n;
			}, _.clone = function() {
				return T.w(this.$d, this);
			}, _.toDate = function() {
				return new Date(this.valueOf());
			}, _.toJSON = function() {
				return this.isValid() ? this.toISOString() : null;
			}, _.toISOString = function() {
				return this.$d.toISOString();
			}, _.toString = function() {
				return this.$d.toUTCString();
			}, g;
		}(), D = E.prototype;
		return w.prototype = D, [
			["$ms", r],
			["$s", i],
			["$m", a],
			["$H", o],
			["$W", s],
			["$M", l],
			["$y", d],
			["$D", f]
		].forEach((function(e) {
			D[e[1]] = function(t) {
				return this.$g(t, e[0], e[1]);
			};
		})), w.extend = function(e, t) {
			return e.$i ||= (e(t, E, w), !0), w;
		}, w.locale = C, w.isDayjs = S, w.unix = function(e) {
			return w(1e3 * e);
		}, w.en = b[y], w.Ls = b, w.p = {}, w;
	}));
})))(), 1), Ka, qa = (e, t) => {
	Ka = new nn(e, {
		threshold: .4,
		distance: 50,
		ignoreLocation: !0,
		includeMatches: !0,
		useExtendedSearch: !0,
		...t
	});
}, Ja = async (e, t, n) => {
	let r = Object.entries(t).filter(([, e]) => e.type === "text" || e.type === "select" || e.type === "multiselect").reduce((e, [t, n]) => {
		let r = [], i = (e, i) => {
			let a = {};
			n.type === "text" ? a[e] = `${i}` : a[t] = `="${e}"`, r.push(a);
		};
		return Object.entries(n.state).filter(([, e]) => e).forEach(([e, t]) => i(e, t)), r.length > 0 && e.push({ $or: r }), e;
	}, []), i;
	if (!(r.length > 0) && n.matchAllWhenEmpty !== !1) i = e;
	else {
		let e = { $and: [...r] }, t = Ka.search(e);
		i = n.enableHighlighting ? Ga(t, "highlight", n.titleProperty) : t.map((e) => e.item);
	}
	let a = Object.entries(t).filter(([, e]) => e.type === "range").reduce((e, [t, n]) => {
		let r = (e) => n.format === "date" ? (0, $.default)(e).valueOf() : parseFloat(e);
		return e[t] = {
			min: r(n.state.min),
			max: r(n.state.max),
			format: n.format
		}, e;
	}, {});
	if (Object.keys(a).length > 0) {
		let e = [];
		for (let t = 0; t < i.length; t++) {
			let n = {};
			for (let [e, r] of Object.entries(a)) {
				let o = (e) => r.format === "date" ? (0, $.default)(e).valueOf() : parseFloat(e), s = no(e, i[t]);
				if (s) if (Array.isArray(s)) {
					let t = "overlap";
					t === "overlap" ? n[e] = a[e].min <= o(s[1]) && o(s[0]) <= a[e].max : t === "contain" && (n[e] = o(s[0]) >= a[e].min && o(s[1]) <= a[e].max);
				} else o(s) >= a[e].min && o(s) <= a[e].max ? n[e] = !0 : n[e] = !1;
				else n[e] = !0;
			}
			Object.values(n).every((e) => !!e) && e.push(i[t]);
		}
		i = [...e];
	}
	let o = Object.entries(t).filter(([, e]) => e.type === "spatial").reduce((e, [t, n]) => (e[t] = {
		geometry: n.state.geometry,
		mode: n.state.mode
	}, e), {});
	if (Object.values(o).map((e) => e.geometry).filter((e) => !!e).length > 0) {
		let e = [];
		for (let t = 0; t < i.length; t++) {
			let n = {};
			for (let e of Object.keys(o)) {
				let r = no(e, i[t]), a = o[e].mode || "within";
				r && (a === "within" ? Wa(r, o[e].geometry) : Ua(r, o[e].geometry)) ? n[e] = !0 : n[e] = !1;
			}
			Object.values(n).every((e) => !!e) && e.push(i[t]);
		}
		i = [...e];
	}
	return i;
};
//#endregion
//#region src/helpers/map-layers.js
function Ya(e, t) {
	return [{
		type: "Tile",
		source: {
			type: "XYZ",
			url: "https://tiles.maps.eox.at/wmts/1.0.0/osm_3857/default/g/{z}/{y}/{x}.jpg",
			attribution: "{ OSM: Data &copy; OpenStreetMap contributors and others, Rendering &copy; EOX }"
		}
	}, {
		type: "Vector",
		properties: { id: "draw" },
		source: {
			type: "Vector",
			...e && { format: "GeoJSON" },
			...e && { url: t }
		},
		zIndex: 1,
		interactions: [{
			type: "draw",
			options: {
				id: "drawInteraction",
				type: "Box",
				modify: !0
			}
		}]
	}];
}
//#endregion
//#region src/helpers/reset-filter.js
function Xa(e) {
	if (!e.dirty) return null;
	switch (e.type) {
		case "multiselect":
			for (let t in e.state) e.state.hasOwnProperty(t) && (e.state[t] = !1);
			break;
		case "range":
			e.state.min = e.min, e.state.max = e.max;
			break;
		case "select":
			for (let t in e.state) e.state.hasOwnProperty(t) && (e.state[t] = !1);
			break;
		case "spatial":
			e.state.geometry = void 0;
			break;
		case "text":
			e.keys.forEach((t) => {
				e.state[t] = void 0;
			});
			break;
	}
	return delete e.stringifiedState, delete e.dirty, e;
}
//#endregion
//#region src/helpers/tab-index.js
function Za(e, t) {
	return e * 2 + t;
}
//#endregion
//#region src/helpers/chip-items.js
function Qa(e) {
	return Object.keys(e).map((t) => ({
		title: z`${e[t].title || e[t].key}:
      ${e[t].stringifiedState}`,
		key: t
	})).filter((t) => e[t.key].dirty);
}
//#endregion
//#region src/helpers/is-filters-dirty.js
function $a(e) {
	return Object.values(e).map((e) => e.dirty).filter((e) => e).length > 0;
}
//#endregion
//#region src/helpers/filter-external.js
async function eo(e, t, n) {
	let r = n.externalFilter(e, t), i = typeof r == "string" || r instanceof String ? r : r.url, a = typeof r == "object" && "fetchFn" in r ? await r.fetchFn(i) : await fetch(i).then(async (e) => await e.json());
	return r.key ? no(r.key, a) : a;
}
//#endregion
//#region src/helpers/toggle-accordion.js
function to(e, t, n) {
	let r;
	if (r = e.detail ? e.detail.target : e.target, r?.classList.contains("details-filter")) {
		if (!r.open || t?.expandMultipleFilters) return;
		n.shadowRoot.querySelectorAll("eox-itemfilter-expandcontainer").forEach((e) => {
			let t = e.shadowRoot.querySelector(".details-filter");
			t && t !== r && t.removeAttribute("open");
		});
	} else {
		if (!r?.open || t?.expandMultipleResults) return;
		n.querySelectorAll("details").forEach((e) => {
			e !== r && e.removeAttribute("open");
		});
	}
}
//#endregion
//#region src/helpers/get-value.js
function no(e, t) {
	return typeof e == "function" ? e(t) : e?.includes(".") ? e.split(".").reduce((e, t) => e && e[t], t) : t[e];
}
//#endregion
//#region src/helpers/capitalize.js
function ro(e) {
	return e.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
}
//#endregion
//#region src/helpers/merge-highlight-indices.js
function io(e, { mergeAdjacent: t = !1 } = {}) {
	if (!Array.isArray(e)) return [];
	let n = e.map(([e, t]) => e <= t ? [e, t] : [t, e]).sort((e, t) => e[0] - t[0] || e[1] - t[1]), r = [];
	for (let [e, i] of n) {
		if (r.length === 0) {
			r.push([e, i]);
			continue;
		}
		let n = r[r.length - 1];
		(t ? e <= n[1] + 1 : e <= n[1]) ? i > n[1] && (n[1] = i) : r.push([e, i]);
	}
	return r;
}
//#endregion
//#region src/helpers/is-date.js
function ao(e) {
	return e.format === "date";
}
//#endregion
//#region src/components/itemfilter-container.js
var oo = class extends H {
	static get properties() {
		return {
			filterProperties: {
				attribute: !1,
				type: Object
			},
			inlineMode: {
				attribute: "inline-mode",
				type: Boolean
			},
			unstyled: { type: Boolean },
			filters: {
				state: !0,
				type: Object
			}
		};
	}
	constructor() {
		super(), this.filterProperties = {}, this.unstyled = !1, this.inlineMode = !1, this.filters = {}, this._handleClickOutside = this.#r.bind(this), this._handleKeyDown = this.#i.bind(this);
	}
	set showDropdown(e) {
		this.renderRoot.querySelector("[popover]").togglePopover(e);
	}
	get showDropdown() {
		return this.renderRoot.querySelector("[popover]")?.matches(":popover-open");
	}
	#e() {
		setTimeout(() => this._overlayCleanup = Dr(this));
	}
	#t() {
		document.addEventListener("click", this._handleClickOutside), document.addEventListener("focusout", this._handleClickOutside), document.addEventListener("keydown", this._handleKeyDown), this.#e();
	}
	connectedCallback() {
		super.connectedCallback(), this.inlineMode && this.#t();
	}
	#n() {
		document.removeEventListener("click", this._handleClickOutside), document.removeEventListener("focusout", this._handleClickOutside), document.removeEventListener("keydown", this._handleKeyDown), this._overlayCleanup();
	}
	disconnectedCallback() {
		this.inlineMode && this.#n(), super.disconnectedCallback();
	}
	_overlayCleanup() {}
	#r(e) {
		Nr(e, this);
	}
	#i(e) {
		Mr(e, this);
	}
	#a(e) {
		jr(e, this);
	}
	#o() {
		Ar(this);
	}
	#s(e) {
		kr(e, this);
	}
	#c(e) {
		on(e, this);
	}
	#l(e) {
		an(e, this);
	}
	updateInline() {
		this.inlineMode && this.requestUpdate();
	}
	updated(e) {
		e.has("inlineMode") && (this.inlineMode ? this.#t() : this.#n());
	}
	render() {
		return z`
      <style>
        ${!this.unstyled && Pe}
      </style>
      ${this.inlineMode ? z`
            <div
              class="inline-container-wrapper"
              @click="${this.#a}"
            >
              <div class="inline-container square border" part="container">
                <div class="chip-container">
                  <div class="chip-wrapper">
                    <eox-itemfilter-chips
                      .items=${Qa(this.filters)}
                      .controller=${{ remove: (e) => this.#c(e) }}
                    >
                    </eox-itemfilter-chips>
                  </div>

                  ${U($a(this.filters), () => z`
                      <button
                        class="chip-close circle transparent small no-margin"
                        @click=${() => this.dispatchEvent(new CustomEvent("reset"))}
                      >
                        ${this.unstyled ? "x" : z`
                              <i class="small">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <title>close</title>
                                  <path
                                    d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                                  />
                                </svg>
                              </i>
                            `}
                      </button>
                    `)}
                </div>
                <div
                  class="input-container field no-margin ${$a(this.filters) ? "dirty-filter-input" : ""}"
                >
                  <input
                    autocomplete="off"
                    id="eox-itemfilter-input-search"
                    type="text"
                    @click="${this.#a}"
                    @focus="${this.#o}"
                    @input="${this.#l}"
                    placeholder="Search and add filter"
                    aria-haspopup="true"
                    aria-expanded="${this.showDropdown}"
                  />
                </div>
              </div>
              <div
                popover="manual"
                class="square surface-container-lowest small-elevate"
              >
                <div
                  class="inline-content"
                  slot="content"
                  @keydown="${this.#i}"
                  @click="${this.#s}"
                  @focus="${this.#s}"
                >
                  <slot name="section"></slot>
                </div>
              </div>
            </div>
          ` : z`<slot name="section"></slot>`}
    `;
	}
};
customElements.define("eox-itemfilter-container", oo);
//#endregion
//#region src/methods/filters/text.js
var so = /* @__PURE__ */ c((/* @__PURE__ */ o(((e, t) => {
	var n = "Expected a function", r = NaN, i = "[object Symbol]", a = /^\s+|\s+$/g, o = /^[-+]0x[0-9a-f]+$/i, s = /^0b[01]+$/i, c = /^0o[0-7]+$/i, l = parseInt, u = typeof global == "object" && global && global.Object === Object && global, d = typeof self == "object" && self && self.Object === Object && self, f = u || d || Function("return this")(), p = Object.prototype.toString, m = Math.max, h = Math.min, g = function() {
		return f.Date.now();
	};
	function _(e, t, r) {
		var i, a, o, s, c, l, u = 0, d = !1, f = !1, p = !0;
		if (typeof e != "function") throw TypeError(n);
		t = x(t) || 0, v(r) && (d = !!r.leading, f = "maxWait" in r, o = f ? m(x(r.maxWait) || 0, t) : o, p = "trailing" in r ? !!r.trailing : p);
		function _(t) {
			var n = i, r = a;
			return i = a = void 0, u = t, s = e.apply(r, n), s;
		}
		function y(e) {
			return u = e, c = setTimeout(C, t), d ? _(e) : s;
		}
		function b(e) {
			var n = e - l, r = e - u, i = t - n;
			return f ? h(i, o - r) : i;
		}
		function S(e) {
			var n = e - l, r = e - u;
			return l === void 0 || n >= t || n < 0 || f && r >= o;
		}
		function C() {
			var e = g();
			if (S(e)) return w(e);
			c = setTimeout(C, b(e));
		}
		function w(e) {
			return c = void 0, p && i ? _(e) : (i = a = void 0, s);
		}
		function T() {
			c !== void 0 && clearTimeout(c), u = 0, i = l = a = c = void 0;
		}
		function E() {
			return c === void 0 ? s : w(g());
		}
		function D() {
			var e = g(), n = S(e);
			if (i = arguments, a = this, l = e, n) {
				if (c === void 0) return y(l);
				if (f) return c = setTimeout(C, t), _(l);
			}
			return c === void 0 && (c = setTimeout(C, t)), s;
		}
		return D.cancel = T, D.flush = E, D;
	}
	function v(e) {
		var t = typeof e;
		return !!e && (t == "object" || t == "function");
	}
	function y(e) {
		return !!e && typeof e == "object";
	}
	function b(e) {
		return typeof e == "symbol" || y(e) && p.call(e) == i;
	}
	function x(e) {
		if (typeof e == "number") return e;
		if (b(e)) return r;
		if (v(e)) {
			var t = typeof e.valueOf == "function" ? e.valueOf() : e;
			e = v(t) ? t + "" : t;
		}
		if (typeof e != "string") return e === 0 ? e : +e;
		e = e.replace(a, "");
		var n = s.test(e);
		return n || c.test(e) ? l(e.slice(2), n ? 2 : 8) : o.test(e) ? r : +e;
	}
	t.exports = _;
})))(), 1);
function co(e) {
	let t = e.renderRoot.querySelector("input[type='text']");
	t.value = "", Xa(e.filterObject), e.requestUpdate();
}
function lo(e) {
	let t = e.renderRoot.querySelector("input[type='text']");
	e.isValid = t.checkValidity(), e.filterObject.keys.forEach((n) => {
		e.filterObject.state[n] = t.value;
	}), e.filterObject.dirty = !0, e.filterObject.stringifiedState = t.value, e.dispatchEvent(new CustomEvent("filter")), t.value === "" && e.reset();
}
//#endregion
//#region src/enums/config.js
var uo = Object.freeze({
	aggregateResults: void 0,
	autoSpreadSingle: !1,
	enableHighlighting: !1,
	externalFilter: () => {},
	filterProperties: [],
	fuseConfig: {},
	inlineMode: !1,
	matchAllWhenEmpty: !0,
	showResults: !0,
	idProperty: "id",
	titleProperty: "title",
	subTitleProperty: void 0,
	imageProperty: void 0,
	resultSorting: void 0,
	expandMultipleFilters: !0,
	expandResults: !0,
	expandMultipleResults: !0
}), fo = [
	"aggregateResults",
	"autoSpreadSingle",
	"enableHighlighting",
	"externalFilter",
	"filterProperties",
	"fuseConfig",
	"inlineMode",
	"matchAllWhenEmpty",
	"showResults",
	"titleProperty",
	"subTitleProperty",
	"imageProperty",
	"idProperty",
	"resultSorting",
	"expandMultipleFilters",
	"expandResults",
	"expandMultipleResults",
	"items"
], po = "YYYY-MM-DD";
//#endregion
//#region src/methods/filters/range.js
function mo(e) {
	if (Xa(e.filterObject), e.filterObject) {
		let t = e.filterObject.min, n = e.filterObject.max, r = e.querySelector("eox-timecontrol");
		r && r.dateChange([(0, $.default)(t).format(), (0, $.default)(n).format()], r);
		let i = e.querySelector("tc-range-slider");
		i && (i.value1 !== t && (i.value1 = t), i.value2 !== n && (i.value2 = n));
	}
	e.requestUpdate();
}
function ho(e, t) {
	let n = (e) => ao(t.filterObject) ? (0, $.default)(e).valueOf() : parseFloat(e), r = n(e.detail.values[0]), i = n(e.detail.values[1]), a = n(t.filterObject.state.min), o = n(t.filterObject.state.max), s = n(t.filterObject.min), c = n(t.filterObject.max), l, u, d, f;
	ao(t.filterObject) ? (l = (0, $.default)(r).isSame((0, $.default)(s), "day"), u = (0, $.default)(i).isSame((0, $.default)(c), "day"), d = (0, $.default)(r).isSame((0, $.default)(a), "day"), f = (0, $.default)(i).isSame((0, $.default)(o), "day")) : (l = r === s, u = i === c, d = r === a, f = i === o), !(d && f) && ([t.filterObject.state.min, t.filterObject.state.max] = [r, i], l && u ? (delete t.filterObject.dirty, delete t.filterObject.stringifiedState) : t.filterObject.dirty = !0, t.filterObject.dirty && (t.filterObject.stringifiedState = t.filterObject.format === "date" ? `${(0, $.default)(r).format(po)} - ${(0, $.default)(i).format(po)}` : `${r} - ${i}`), t.dispatchEvent(new CustomEvent("filter")), l && u ? t.reset() : t.requestUpdate());
}
function go(e, t, n) {
	let r = n.filterObject.state[e];
	return z`<div class="range-${t}">${ao(n.filterObject) ? (0, $.default)(r).format(po) : r}</div>`;
}
//#endregion
//#region src/methods/filters/selector.js
function _o(e) {
	vo(-1, e), Xa(e.filterObject), e.requestUpdate();
}
function vo(e, t) {
	t.selectedItems = e === -1 ? [] : t.selectedItems.filter((t, n) => n !== e), wo(t), To(t);
}
function yo(e, t) {
	let n = t.selectedItems.indexOf(e);
	n >= 0 ? t.selectedItems = t.selectedItems.filter((e, t) => t !== n) : t.type === "multiselect" ? t.selectedItems = [...t.selectedItems, e] : (t.selectedItems = [e], t.showSuggestions = !1), wo(t), To(t);
}
function bo(e, t) {
	e.target instanceof HTMLInputElement && (t.query = e.target.value, t.showSuggestions = !0);
}
function xo(e, t) {
	switch (e.key) {
		case "ArrowDown":
			t.highlightedIndex = Math.min(t.highlightedIndex + 1, t.filteredSuggestions.length - 1);
			break;
		case "ArrowUp":
			t.highlightedIndex = Math.max(t.highlightedIndex - 1, 0);
			break;
		case "Enter":
			t.highlightedIndex >= 0 && yo(t.filteredSuggestions[t.highlightedIndex], t);
			break;
		case "Escape":
			t.showSuggestions = !1;
			break;
	}
}
function So(e, t) {
	(e.has("suggestions") || e.has("query")) && wo(t);
}
function Co(e, t) {
	let n = e.filterObject?.sort || ((e, t) => e.toString().localeCompare(t.toString(), void 0, { numeric: !0 }));
	return t.sort(n).map((e) => e);
}
function wo(e) {
	let t = (e.filterObject?.filterKeys || e.suggestions).map((e) => `${e}`), n = t;
	e.query && (n = new nn(t, { threshold: .4 }).search(e.query).map((e) => e.item)), e.filteredSuggestions = e.filterObject?.filterKeys ? n : Co(e, n), e.filterObject?.filterKeys && (e.filterObject.state = t.reduce((e, t) => (t in e || (e[t] = void 0), e), e.filterObject.state)), e.highlightedIndex = -1;
}
function To(e) {
	Object.keys(e.filterObject.state).forEach((t) => {
		e.filterObject.state[t] = e.selectedItems.includes(t);
	}), e.filterObject.stringifiedState = Object.keys(e.filterObject.state).filter((t) => e.filterObject.state[t]).join(", ") || "", e.filterObject.dirty = e.filterObject.stringifiedState.length > 0, e.dispatchEvent(new CustomEvent("filter")), e.requestUpdate();
}
//#endregion
//#region src/methods/filters/spatial.js
function Eo(e) {
	Xa(e.filterObject), e.renderRoot.querySelector("eox-itemfilter-spatial-filter").reset(), e.requestUpdate();
}
function Do(e) {
	e.renderRoot.querySelector("#eox-map").innerHTML = "", ko(e);
}
function Oo(e, t) {
	t.filterObject.state.mode = e;
	let n = new CustomEvent("filter", { detail: { [t.filterObject.key]: {} } });
	t.dispatchEvent(n);
}
function ko(e) {
	let t = e.renderRoot.querySelector("#eox-map");
	t.innerHTML === "" && (t.innerHTML = "<eox-map part=\"map\" style=\"height: 400px\"></eox-map>");
	let n = e.geometry && Ao(e.geometry), r = Ya(e.geometry, n);
	e.eoxMap = e.renderRoot.querySelector("eox-map"), setTimeout(() => {
		e.eoxMap.layers = r;
		let t = (t) => {
			let n = new CustomEvent("filter", { detail: { geometry: {
				type: "Polygon",
				coordinates: t.getGeometry().clone().transform("EPSG:3857", "EPSG:4326").getCoordinates()
			} } });
			e.dispatchEvent(n);
		};
		e.eoxMap.interactions.drawInteraction.on("drawend", (n) => {
			t(n.feature), e.eoxMap.removeInteraction("drawInteraction");
		}), e.eoxMap.interactions.drawInteraction_modify.on("modifyend", (e) => {
			t(e.features.getArray()[0]);
		});
	}, 1e3);
}
function Ao(e) {
	return `data:text/json,${encodeURIComponent(JSON.stringify({
		type: "FeatureCollection",
		features: [{
			type: "Feature",
			properties: null,
			geometry: e
		}]
	}))}`;
}
//#endregion
//#region src/components/filters/text.js
var jo = class extends H {
	static get properties() {
		return {
			filterObject: {
				attribute: !1,
				type: Object
			},
			results: {
				state: !0,
				type: Array
			},
			tabIndex: {
				attribute: !1,
				type: Number
			},
			unstyled: { type: Boolean },
			isValid: {
				state: !0,
				type: Boolean
			}
		};
	}
	constructor() {
		super(), this.filterObject = {}, this.results = null, this.unstyled = !1, this.tabIndex = 0, this.isValid = !1;
	}
	#e = () => {
		lo(this);
	};
	#t = (e) => {
		e.key === "Enter" && e.target.value && this.results && this.results.length === 1 && (this.dispatchEvent(new CustomEvent("result", { detail: this.results[0] })), e.target.value = "", this.#e());
	};
	reset() {
		co(this);
	}
	debouncedInputHandler = (0, so.default)(this.#e, 500, { leading: !0 });
	createRenderRoot() {
		return this;
	}
	render() {
		return U(this.filterObject, () => z`
        <style></style>
        <div class="text-container">
          <div
            class="text-container-wrapper field small"
            style="margin-left: var(--_list-padding)"
          >
            <input
              type="text"
              placeholder=${this.filterObject.placeholder}
              data-cy="search"
              class="text-input"
              part="input-search"
              value="${Object.values(this.filterObject.state)[0]}"
              tabindex=${this.tabIndex}
              pattern="${this.filterObject.validation?.pattern || ".*"}"
              @input="${this.debouncedInputHandler}"
              @click=${(e) => e.stopPropagation()}
              @keydown=${this.#t}
            />
          </div>
        </div>
        <small
          class="error-validation"
          style="margin-left: var(--_list-padding)"
          >${this.filterObject.validation && this.isValid === !1 ? this.filterObject.validation.message : ""}</small
        >
      `);
	}
};
customElements.define("eox-itemfilter-text", jo);
//#endregion
//#region src/methods/results/aggregate-results.js
function Mo(e, t, n) {
	if (!t || typeof t == "string" && t.trim() === "") return [];
	let r = n.config.aggregateResults;
	return t === "No category" ? e.filter((e) => {
		let t = e[r];
		return Array.isArray(t) ? t.filter(Boolean).length === 0 : !t;
	}) : e.filter((e) => {
		let i = e[r];
		if (Array.isArray(i)) {
			if (i.filter(Boolean).length === 0) return !1;
		} else if (!i) return !1;
		let a;
		return n.filters[r] && (a = Object.keys(n.filters[r]).filter((e) => n.filters[r].state[e])), (!a?.length || a.includes(t)) && Array.isArray(i) ? i.includes(t) : i === t;
	});
}
//#endregion
//#region ../../node_modules/lit-html/static.js
var No = Symbol.for(""), Po = (e) => {
	if (e?.r === No) return e?._$litStatic$;
}, Fo = (e) => ({
	_$litStatic$: e,
	r: No
}), Io = /* @__PURE__ */ new Map(), Lo = ((e) => (t, ...n) => {
	let r = n.length, i, a, o = [], s = [], c, l = 0, u = !1;
	for (; l < r;) {
		for (c = t[l]; l < r && (a = n[l], i = Po(a)) !== void 0;) c += i + t[++l], u = !0;
		l !== r && s.push(a), o.push(c), l++;
	}
	if (l === r && o.push(t[r]), u) {
		let e = o.join("$$lit$$");
		(t = Io.get(e)) === void 0 && (o.raw = o, Io.set(e, t = o)), n = s;
	}
	return e(t, ...n);
})(z), Ro = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, zo = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Bo = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, { I: Vo } = Ee, Ho = () => document.createComment(""), Uo = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new Vo(r.insertBefore(Ho(), i), r.insertBefore(Ho(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = e.nextSibling;
				r.insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, Wo = (e, t, n = e) => (e._$AI(t, n), e), Go = {}, Ko = (e, t = Go) => e._$AH = t, qo = (e) => e._$AH, Jo = (e) => {
	e._$AR(), e._$AA.remove();
}, Yo = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, Xo = zo(class extends Bo {
	constructor(e) {
		if (super(e), e.type !== Ro.CHILD) throw Error("repeat() can only be used in text expressions");
	}
	dt(e, t, n) {
		let r;
		n === void 0 ? n = t : t !== void 0 && (r = t);
		let i = [], a = [], o = 0;
		for (let t of e) i[o] = r ? r(t, o) : o, a[o] = n(t, o), o++;
		return {
			values: a,
			keys: i
		};
	}
	render(e, t, n) {
		return this.dt(e, t, n).values;
	}
	update(e, [t, n, r]) {
		let i = qo(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = Wo(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = Wo(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = Wo(i[d], a[m]), Uo(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = Wo(i[f], a[p]), Uo(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = Yo(o, p, m), u = Yo(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
			let t = u.get(o[p]), n = t === void 0 ? null : i[t];
			if (n === null) {
				let t = Uo(e, i[d]);
				Wo(t, a[p]), c[p] = t;
			} else c[p] = Wo(n, a[p]), Uo(e, i[d], n), i[t] = null;
			p++;
		} else Jo(i[f]), f--;
		else Jo(i[d]), d++;
		for (; p <= m;) {
			let t = Uo(e, c[m + 1]);
			Wo(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && Jo(e);
		}
		return this.ut = o, Ko(e, c), pe;
	}
}), Zo = class extends Bo {
	constructor(e) {
		if (super(e), this.it = B, e.type !== Ro.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === B || e == null) return this._t = void 0, this.it = e;
		if (e === pe) return e;
		if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
		if (e === this.it) return this._t;
		this.it = e;
		let t = [e];
		return t.raw = t, this._t = {
			_$litType$: this.constructor.resultType,
			strings: t,
			values: []
		};
	}
};
Zo.directiveName = "unsafeHTML", Zo.resultType = 1;
var Qo = zo(Zo);
//#endregion
//#region src/methods/results/create.js
function $o(e, t) {
	return z`
    <details
      class="details-results"
      @toggle=${t.handleAccordion}
      ?open=${t.config.expandResults || B}
    >
      <summary class="square">
        <nav class="responsive tiny-space">
          <i class="small">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>chevron-right</title>
              <path
                d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
              />
            </svg>
          </i>
          <span class="title"> ${e} </span>
          <button
            class="chip"
            style="--_size: 1rem; padding: 0.7rem; font-size: small"
          >
            ${t.aggregateResults(t.results, e).length}
          </button>
        </nav>
      </summary>
      <div>
        ${es(t, e)}
      </div>
    </details>
  `;
}
function es(e, t) {
	let n = e.results, r = t ? e.aggregateResults(n, t) : n, i = e.config, a = (t) => e.selectedResult?.[i.idProperty] === t[i.idProperty] ? "highlighted" : B;
	return Lo`
    ${e.resultType === "cards" ? Fo("<eox-layout fill-grid>") : Fo("<ul id=\"results\" class=\"list no-space\" part=\"results\">")}
      ${Xo(r, (e) => e.id, (t) => Lo`
        ${e.resultType === "cards" ? Fo("<eox-layout-item") : Fo("<li")}
            class="${a(t)}"
            @click=${() => {
		e.selectedResult === t ? e.selectedResult = null : e.selectedResult = t, e.dispatchEvent(new CustomEvent("result", { detail: e.selectedResult }));
	}}
            @mouseenter=${() => {
		e.dispatchEvent(new CustomEvent("mouseenter:result", { detail: t }));
	}}
            @mouseleave=${() => {
		e.dispatchEvent(new CustomEvent("mouseleave:result", { detail: t }));
	}}
          >
            <nav id="${t.id}" class="responsive tiny-space">
              ${U(i.subTitleProperty || i.imageProperty, () => z`
                  ${U(e.resultType === "cards", () => no(i.imageProperty, t) ? z`
                            <img
                              loading="lazy"
                              fetchpriority="low"
                              class="image"
                              src="${no(i.imageProperty, t)}"
                            />
                          ` : z`
                            <svg
                              class="image"
                              width="100%"
                              height="100%"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="100%"
                                height="100%"
                                fill="var(--primary-color)"
                              />
                            </svg>
                          `, () => z`
                      <i class="small">
                        ${no(i.imageProperty, t) ? z`
                              <img
                                loading="lazy"
                                fetchpriority="low"
                                class="image"
                                src="${no(i.imageProperty, t)}"
                              />
                            ` : z`
                              <svg
                                class="image"
                                width="100%"
                                height="100%"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="100%"
                                  height="100%"
                                  fill="var(--primary-color)"
                                />
                              </svg>
                            `}
                      </i>
                    `)}
                  <div class="title-container small-line max truncate">
                    <span
                      class="title truncate ${t.highlightedText ? "highlight-enabled" : ""}"
                      >${Qo(t.highlightedText || no(i.titleProperty, t).toString())}</span
                    >
                    ${U(!!no(i.subTitleProperty, t), () => z`
                        <small class="subtitle no-line truncate"
                          >${Qo(no(i.subTitleProperty, t).toString())}</small
                        >
                      `)}
                  </div>
                `, () => z`
                  <div class="small-line max truncate">
                    <span
                      class="title truncate ${t.highlightedText ? "highlight-enabled" : ""}"
                      >${Qo(t.highlightedText || t[i.titleProperty])}</span
                    >
                  </div>
                `)}
              ${U(e.enableResultAction, () => z`
                  <button
                    class="result-action square transparent primary-text small"
                    @click=${(n) => {
		n.stopPropagation(), e.dispatchEvent(new CustomEvent("click:result-action", { detail: t }));
	}}
                  >
                    <icon class="small"
                      >${Qo(e.resultActionIcon)}</icon
                    >
                  </button>
                `)}
            </nav>
          </li>
        `)}
    ${e.resultType === "cards" ? Fo("</eox-layout>") : Fo("</ul>")}
  `;
}
//#endregion
//#region src/components/results.js
var ts = class extends H {
	static get properties() {
		return {
			config: {
				attribute: !1,
				type: Object
			},
			results: {
				state: !0,
				type: Array
			},
			filters: {
				state: !0,
				type: Object
			},
			resultAggregation: {
				attribute: !1,
				type: Array
			},
			selectedResult: {
				state: !0,
				type: Object
			},
			resultType: {
				attribute: "result-type",
				type: String
			},
			resultActionIcon: {
				attribute: !1,
				type: String
			}
		};
	}
	constructor() {
		super(), this.config = null, this.results = null, this.filters = {}, this.resultAggregation = [], this.selectedResult = null, this.resultType = "list", this.resultActionIcon = void 0;
	}
	#e(e) {
		return es(this, e);
	}
	#t(e) {
		return $o(e, this);
	}
	aggregateResults(e, t) {
		return Mo(e, t, this);
	}
	createRenderRoot() {
		return this;
	}
	handleAccordion(e) {
		to(e, this.config, this);
	}
	#n() {
		let e = this.resultAggregation.filter((e) => this.aggregateResults(this.results, e).length);
		return this.aggregateResults(this.results, "No category").length > 0 && e.push("No category"), e;
	}
	render() {
		return z`
      <section id="section-results">
        <div slot="resultstitle"></div>
        <div id="container-results" class="scroll">
          ${U(this.results.length < 1, () => z`<small class="no-results">No matching items</small>`, () => B)}
          ${U(this.config.aggregateResults, () => je(this.#n(), (e) => z`${U(this.aggregateResults(this.results, e).length === 1 && this.config.autoSpreadSingle, () => z`<div style="margin-left: -8px">
                        ${this.#e(e)}
                      </div>`, () => this.#t(e))}`), () => this.#e())}
        </div>
      </section>
    `;
	}
};
customElements.define("eox-itemfilter-results", ts);
//#endregion
//#region src/components/filters/selector.js
var ns = class extends H {
	static properties = {
		filterObject: {
			attribute: !1,
			type: Object
		},
		suggestions: {
			attribute: !1,
			type: Array
		},
		selectedItems: {
			state: !0,
			type: Array
		},
		query: {
			state: !0,
			type: String
		},
		showSuggestions: {
			state: !0,
			type: Boolean
		},
		highlightedIndex: {
			state: !0,
			type: Number
		},
		filteredSuggestions: {
			state: !0,
			type: Array
		},
		type: {
			attribute: !0,
			type: String
		},
		unstyled: { type: Boolean },
		tabIndex: {
			attribute: !1,
			type: Number
		},
		inlineMode: {
			attribute: "inline-mode",
			type: Boolean
		}
	};
	constructor() {
		super(), this.filterObject = {}, this.suggestions = [], this.selectedItems = [], this.query = "", this.showSuggestions = !1, this.highlightedIndex = -1, this.filteredSuggestions = [], this.type = "select", this.unstyled = !1, this.tabIndex = 0, this.inlineMode = !1;
	}
	updated(e) {
		e.has("filterObject") && this.filterObject.state && (this.selectedItems = Object.keys(this.filterObject.state).map((e) => this.filterObject.state[e] ? e : null).filter((e) => !!e)), So(e, this);
	}
	#e(e) {
		bo(e, this);
	}
	#t(e) {
		xo(e, this);
	}
	#n(e) {
		yo(e, this);
	}
	reset() {
		_o(this);
	}
	debouncedInputHandler = (0, so.default)(this.#n, 500, { leading: !0 });
	firstUpdated() {
		this.filterObject.state && (this.selectedItems = Object.keys(this.filterObject.state).map((e) => this.filterObject.state[e] ? e : null).filter((e) => !!e), this.filterObject.stringifiedState = this.selectedItems.join(", ") || "", this.requestUpdate());
	}
	createRenderRoot() {
		return this;
	}
	render() {
		let e = this.type.includes("multi") ? "checkbox" : "radio", t = this.filteredSuggestions.length > 5 ? "select-overflow scroll" : B;
		return z`
      <style>
        :host,
        :root {
          --select-filter-max-items: 5;
        }
      </style>
      ${U((this.filterObject.filterKeys || this.suggestions).length >= 10, () => z`<div class="autocomplete-container">
            <div
              class="autocomplete-container-wrapper field small no-round"
              style="margin-left: var(--_list-padding)"
            >
              <input
                autocomplete="off"
                tabindex=${this.tabIndex}
                class="autocomplete-input"
                type="text"
                .value=${this.query}
                placeholder="${this.filterObject.placeholder || "Find..."}"
                @input=${this.#e}
                @keydown=${this.#t}
                @blur=${() => this.showSuggestions = !1}
                @focus=${() => this.showSuggestions = !0}
              />
            </div>
          </div>`)}
      <div class="select-container ${t}">
        <ul class="${this.type} list no-space">
          ${this.filteredSuggestions.map((t) => z`
              <li
                data-identifier="${t.toString().toLowerCase()}"
                data-title="${t}"
              >
                <label class="${e} small max">
                  <input
                    type="${e}"
                    name=${t}
                    .checked=${this.selectedItems.includes(t)}
                    @change=${() => this.debouncedInputHandler(t)}
                    @keydown=${(e) => {
			e.key === " " && this.inlineMode && this.debouncedInputHandler(t);
		}}
                    tabindex=${this.tabIndex + 1}
                  />
                  <span class="title small-line">${t}</span>
                </label>
              </li>
            `)}
        </ul>
      </div>
    `;
	}
};
//#endregion
//#region ../../node_modules/toolcool-range-slider/dist/toolcool-range-slider.min.js
customElements.define("eox-itemfilter-select", ns), (() => {
	var e = Object.defineProperty, t = Math.pow, n = (t, n, r) => n in t ? e(t, n, {
		enumerable: !0,
		configurable: !0,
		writable: !0,
		value: r
	}) : t[n] = r, r = (e, t, r) => (n(e, typeof t == "symbol" ? t : t + "", r), r), i = (e, t) => ` ${t && t.length > 0 ? t.map((e) => `<link rel="stylesheet" href="${e}" />`).join("") : ""} <style> ${e} </style> <div class="range-slider-box"> <div class="row"> <div id="range-slider" class="range-slider"> <div class="container"> <div class="panel"></div> <div class="panel-fill"></div> <div class="container"> <div class="pointer" tabindex="0" role="slider"> <div class="pointer-shape"></div> </div> </div> </div> </div> </div> </div>`, a = ":host{--width:300px;--height:.25rem;--opacity:.4;--panel-bg:#cbd5e1;--panel-bg-hover:#94a3b8;--panel-bg-fill:#475569;--panel-bg-border-radius:1rem;--pointer-width:1rem;--pointer-height:1rem;--pointer-bg:#fff;--pointer-bg-hover:#dcdcdc;--pointer-bg-focus:#dcdcdc;--pointer-shadow:0 0 2px rgba(0,0,0,0.8);--pointer-shadow-hover:0 0 2px #000;--pointer-shadow-focus:var(--pointer-shadow-hover);--pointer-border:1px solid hsla(0,0%,88%,0.5);--pointer-border-hover:1px solid #94a3b8;--pointer-border-focus:var(--pointer-border-hover);--pointer-border-radius:100%;--animate-onclick:.3s}:host{max-width:100%}.range-slider-box{display:flex;position:relative;flex-direction:column}.range-slider{position:relative;width:var(--width,100%);height:var(--height,0.25rem);touch-action:none;max-width:100%;box-sizing:border-box;cursor:pointer}.row{width:100%;display:flex;align-items:center}.range-slider.disabled{opacity:var(--opacity,0.4);cursor:default}.pointer.disabled{-webkit-filter:brightness(0.8);filter:brightness(0.8);cursor:default}.range-slider *{box-sizing:border-box}.container{position:absolute;width:100%;height:100%}.panel{position:absolute;z-index:10;width:100%;height:100%;background:var(--panel-bg,#2d4373);border-radius:var(--panel-bg-border-radius,1rem);overflow:hidden;transition:.3s all ease}.panel-fill{background:var(--panel-bg-fill,#000);border-radius:var(--panel-bg-border-radius,1rem);overflow:hidden;height:100%;position:absolute;z-index:10}.panel:hover{background:var(--panel-bg-hover,#5f79b7)}.disabled .panel:hover{background:var(--panel-bg,#5f79b7)}.pointer{position:absolute;z-index:20;outline:0;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.pointer-shape{background:var(--pointer-bg,#fff);background-size:contain;box-shadow:var(--pointer-shadow);border:var(--pointer-border);border-radius:var(--pointer-border-radius,100%);-webkit-transform:translateX(-50%);transform:translateX(-50%);width:var(--pointer-width,15px);height:var(--pointer-height,15px);transition:.3s all ease}.pointer-shape:hover{background:var(--pointer-bg-hover,#fff);background-size:contain;border:var(--pointer-border-hover);box-shadow:var(--pointer-shadow-hover)}.disabled .pointer-shape:hover{background:var(--pointer-bg,#fff);background-size:contain;border:var(--pointer-border);box-shadow:var(--pointer-shadow)}.pointer:focus .pointer-shape{background:var(--pointer-bg-focus,#fff);background-size:contain;border:var(--pointer-border-focus);box-shadow:var(--pointer-shadow-focus)}.disabled .pointer:focus .pointer-shape{background:var(--pointer-bg,#fff);background-size:contain;border:var(--pointer-border);box-shadow:var(--pointer-shadow)}.type-vertical .range-slider{--width:.25rem;--height:300px;max-height:100%}.type-vertical .range-slider .pointer{left:50%}.type-vertical .range-slider .panel-fill{width:100%}.type-vertical.range-slider-box{flex-direction:row}.type-vertical .row{flex-direction:column}.animate-on-click .pointer,.animate-on-click .panel-fill{transition:all var(--animate-onclick)}.range-dragging .panel-fill{cursor:move}", o = "pointers-overlap", s = "pointers-min-distance", c = "pointers-max-distance", l = "range-dragging", u = "data", d = "min", f = "max", p = "step", m = "round", h = "type", g = "theme", _ = "rtl", v = "btt", y = "disabled", b = "keyboard-disabled", x = "mousewheel-disabled", S = "slider-width", C = "slider-height", w = "slider-radius", T = "slider-bg", E = "slider-bg-hover", D = "slider-bg-fill", O = "pointer-width", k = "pointer-height", A = "pointer-radius", j = "pointer-bg", ee = "pointer-bg-hover", te = "pointer-bg-focus", M = "pointer-shadow", ne = "pointer-shadow-hover", N = "pointer-shadow-focus", P = "pointer-border", re = "pointer-border-hover", ie = "pointer-border-focus", ae = "animate-onclick", oe = "css-links", se = "vertical", ce = "horizontal", F = (e, t, n, r, i) => {
		let a = t - e;
		return a === 0 ? n : (r - n) * (i - e) / a + n;
	}, I = (e) => !isNaN(parseFloat(e)) && isFinite(e), L = (e, t) => I(e) ? Number(e) : t, le = (e, t) => t === 0 ? 0 : Math.round(e / t) * t, ue = (e, n = Infinity) => {
		if (n === Infinity) return e;
		let r = t(10, n);
		return Math.round(e * r) / r;
	}, R = (e) => e == null ? !1 : typeof e == "boolean" ? e : e.trim().toLowerCase() === "true", de = (e, t) => {
		e.dispatchEvent(new CustomEvent("onPointerClicked", { detail: { $pointer: t } }));
	}, fe = (e, t) => {
		e.dispatchEvent(new CustomEvent("onMouseDown", { detail: { nativeEvent: t } }));
	}, z = (e, t) => {
		e.dispatchEvent(new CustomEvent("onMouseUp", { detail: { nativeEvent: t } }));
	}, pe = (e, t) => {
		e.dispatchEvent(new CustomEvent("onKeyDown", { detail: { nativeEvent: t } }));
	}, B = (e, t) => {
		if (!t || t.length <= 0) return;
		let n = t.map((e) => I(e) ? L(e, e) : e), r = { values: n || [] };
		r.value = n[0], r.value0 = n[0], r.value1 = n[0];
		for (let e = 1; e < n.length; e++) r[`value${e + 1}`] = n[e];
		e.dispatchEvent(new CustomEvent("change", { detail: r }));
	}, me = (e, t, n) => {
		let r = 0, i, a, o, s, c = !1, l = (e, n, i, a, o, s) => {
			let c = r;
			i !== void 0 && e > i && (e = i), n !== void 0 && e < n && (e = n), r = e;
			let l = r;
			return (a === se && s || a === ce && o) && (l = 100 - l), a === se ? t.style.top = `${l}%` : t.style.left = `${l}%`, c !== r;
		}, u = (e) => e === t || t.contains(e), d = (e, t, n, r) => {
			i = e, a = t, o = n, s = r;
		}, f = (e) => {
			c = e, t.classList.toggle("disabled", c), c ? t.setAttribute("aria-disabled", "true") : t.hasAttribute("aria-disabled") && t.removeAttribute("aria-disabled");
		}, p = (e, n) => {
			n == null ? t.removeAttribute(e) : t.setAttribute(e, n);
		}, m = (e) => t.getAttribute(e), h = (t) => {
			if (!c) {
				switch (t.key) {
					case "ArrowLeft":
						t.preventDefault(), typeof i == "function" && i(n);
						break;
					case "ArrowRight":
						t.preventDefault(), typeof a == "function" && a(n);
						break;
					case "ArrowUp":
						t.preventDefault(), typeof o == "function" && o(n);
						break;
					case "ArrowDown":
						t.preventDefault(), typeof s == "function" && s(n);
						break;
				}
				pe(e, t);
			}
		}, g = () => {
			c || de(e, t);
		};
		return t.className = `pointer pointer-${n}`, t.addEventListener("keydown", h), t.addEventListener("click", g), {
			$pointer: t,
			get percent() {
				return r;
			},
			get disabled() {
				return c;
			},
			set disabled(e) {
				f(e);
			},
			updatePosition: l,
			isClicked: u,
			setCallbacks: d,
			setAttr: p,
			getAttr: m,
			destroy: () => {
				t.removeEventListener("keydown", h), t.removeEventListener("click", g), t.remove();
			}
		};
	}, he = (e) => {
		if (e == null) return;
		if (Array.isArray(e)) return e;
		if (e.trim() === "") return;
		let t = e.split(","), n = [], r = !0;
		for (let e = 0; e < t.length; e++) {
			let i = t[e].trim();
			i !== "" && (n.push(i), I(i) || (r = !1));
		}
		return r ? n.map((e) => Number(e)) : n;
	}, ge = (e, t) => t ? t.findIndex((t) => t === e || t.toString().trim() === e.toString().trim()) : -1, _e = (e) => ({ updatePosition: (t, n, r, i) => {
		if (n.length <= 0) return;
		let a = n.length === 1, o = n[0], s = n[n.length - 1];
		t === se ? (e.style.removeProperty("width"), e.style.removeProperty("right"), e.style.removeProperty("left"), a ? e.style.height = `${o}%` : e.style.height = `${Math.abs(o - s)}%`, i ? (e.style.bottom = "0%", a ? e.style.top = "auto" : e.style.top = `${Math.min(100 - s, 100 - o)}%`) : (e.style.bottom = "auto", a ? e.style.top = "0%" : e.style.top = `${Math.min(o, s)}%`)) : (e.style.removeProperty("height"), e.style.removeProperty("top"), e.style.removeProperty("bottom"), a ? e.style.width = `${o}%` : e.style.width = `${Math.abs(o - s)}%`, r ? (e.style.right = "0%", a ? e.style.left = "auto" : e.style.left = `${Math.min(100 - s, 100 - o)}%`) : (e.style.right = "auto", a ? e.style.left = "0%" : e.style.left = `${Math.min(o, s)}%`));
	} }), ve = "--animate-onclick", V = "--width", ye = "--height", be = "--panel-bg-border-radius", xe = "--panel-bg", Se = "--panel-bg-hover", Ce = "--panel-bg-fill", we = "--pointer-width", Te = "--pointer-height", Ee = "--pointer-border-radius", De = "--pointer-bg", Oe = "--pointer-bg-hover", ke = "--pointer-bg-focus", H = "--pointer-shadow", Ae = "--pointer-shadow-hover", je = "--pointer-shadow-focus", U = "--pointer-border", Me = "--pointer-border-hover", Ne = "--pointer-border-focus", Pe = (e, t, n) => {
		let r = /* @__PURE__ */ new Map();
		for (let i of e.attributes) {
			let e = i.nodeName.trim().toLowerCase();
			if (!t.test(e)) continue;
			let a = e.replace(/\D/g, "").trim(), o = a === "" || a === "0" || a === "1" ? 0 : L(a, 0) - 1, s = n && typeof n == "function" ? n(i.value) : i.value;
			r.set(o, s);
		}
		return r;
	}, Fe = (e) => {
		if (!e) return null;
		let t = e.getAttribute(oe);
		if (!t) return null;
		let n = t.split(";"), r = [];
		for (let e of n) e.trim() !== "" && r.push(e.trim());
		return r;
	}, W = [
		[
			V,
			S,
			"sliderWidth",
			null
		],
		[
			ye,
			C,
			"sliderHeight",
			null
		],
		[
			be,
			w,
			"sliderRadius",
			null
		],
		[
			xe,
			T,
			"sliderBg",
			null
		],
		[
			Se,
			E,
			"sliderBgHover",
			null
		],
		[
			Ce,
			D,
			"sliderBgFill",
			null
		],
		[
			we,
			O,
			"pointer#Width",
			/^pointer([0-9]*)-width$/
		],
		[
			Te,
			k,
			"pointer#Height",
			/^pointer([0-9]*)-height$/
		],
		[
			Ee,
			A,
			"pointer#Radius",
			/^pointer([0-9]*)-radius$/
		],
		[
			De,
			j,
			"pointer#Bg",
			/^pointer([0-9]*)-bg$/
		],
		[
			Oe,
			ee,
			"pointer#BgHover",
			/^pointer([0-9]*)-bg-hover$/
		],
		[
			ke,
			te,
			"pointer#BgFocus",
			/^pointer([0-9]*)-bg-focus$/
		],
		[
			H,
			M,
			"pointer#Shadow",
			/^pointer([0-9]*)-shadow$/
		],
		[
			Ae,
			ne,
			"pointer#ShadowHover",
			/^pointer([0-9]*)-shadow-hover$/
		],
		[
			je,
			N,
			"pointer#ShadowFocus",
			/^pointer([0-9]*)-shadow-focus$/
		],
		[
			U,
			P,
			"pointer#Border",
			/^pointer([0-9]*)-border$/
		],
		[
			Me,
			re,
			"pointer#BorderHover",
			/^pointer([0-9]*)-border-hover$/
		],
		[
			Ne,
			ie,
			"pointer#BorderFocus",
			/^pointer([0-9]*)-border-focus$/
		]
	], Ie = (e, t, n) => {
		let r = null, i = [], a = /* @__PURE__ */ new Map(), o = (e, n = t) => {
			let r = [...n.classList];
			for (let n of r) n.startsWith(e) && t.classList.remove(n);
		}, s = () => {
			o("shape");
			let e = t.querySelectorAll(".pointer");
			for (let t of e) o("shape", t);
		}, c = (e) => {
			r = e, o("theme-"), typeof e == "string" && t.classList.add(`theme-${e}`);
		}, l = () => {
			if (s(), !(i.length <= 0)) {
				t.classList.add("shape", `shape-${i[0]}`);
				for (let e = 1; e < i.length; e++) {
					let n = i[e];
					if (!n) continue;
					let r = t.querySelector(`.pointer-${e}`);
					!r || r.classList.add("shape", `shape-${n}`);
				}
			}
		}, u = (e, t) => {
			i[e] = t, l();
		}, d = () => {
			s();
			let t = Pe(e, /^pointer([0-9]*)-shape$/);
			if (!(t.size <= 0)) {
				for (let e of t) {
					let t = e[0];
					i[t] = e[1];
				}
				l();
			}
		}, f = (e, t) => `${e}-${t}`, p = (e, r, i) => {
			let o = n[i];
			if (!o) return;
			let s = i === 0 ? t : o.$pointer;
			if (r == null) {
				a.has(f(e, i)) && a.delete(f(e, i)), s.style.removeProperty(e);
				return;
			}
			a.set(f(e, i), r), s.style.setProperty(e, r);
		}, m = (e, t) => a.get(f(e, t));
		return (() => {
			for (let t of W) {
				let [r, i, a, o] = t;
				if (o) {
					let t = Pe(e, o);
					for (let e of t) {
						let t = e[0], n = e[1];
						p(r, n, t);
					}
				} else p(r, e.getAttribute(i), 0);
				let s = [];
				if (a.indexOf("#") === -1) s.push([a, 0]);
				else {
					s.push([a.replace("#", ""), 0]), s.push([a.replace("#", "0"), 0]), s.push([a.replace("#", "1"), 0]);
					for (let e = 1; e < n.length; e++) s.push([a.replace("#", (e + 1).toString()), e]);
				}
				for (let t of s) try {
					let n = t[0], i = t[1];
					Object.prototype.hasOwnProperty.call(e, n) || Object.defineProperty(e, n, {
						get() {
							return m(r, i);
						},
						set: (e) => {
							p(r, e, i);
						}
					});
				} catch (e) {
					console.error(e);
				}
			}
			c(e.getAttribute(g)), d();
		})(), {
			setStyle: p,
			getStyle: m,
			get theme() {
				return r;
			},
			set theme(e) {
				c(e);
			},
			get pointerShapes() {
				return i;
			},
			setPointerShape: u
		};
	}, Le = "animate-on-click", G = "range-dragging", Re = (e, t, n, r) => {
		let i = [], a = (e) => {
			for (let t of i) t.update && typeof t.update == "function" && t.update(e);
		}, o = () => {
			for (let e of i) e.destroy && typeof e.destroy == "function" && e.destroy();
		}, s = (e, t) => {
			for (let n of i) n.onAttrChange && typeof n.onAttrChange == "function" && n.onAttrChange(e, t);
		}, c = (t) => {
			if (t.gettersAndSetters) {
				for (let n of t.gettersAndSetters) if (!(!n.name || !n.attributes)) try {
					Object.prototype.hasOwnProperty.call(e, n.name) || Object.defineProperty(e, n.name, n.attributes);
				} catch (e) {
					console.error("defineSettersGetters error:", e);
				}
			}
		}, l = (t) => {
			if (!t.css) return;
			let n = e.shadowRoot?.querySelector("style");
			!n || (n.innerHTML += t.css);
		};
		return {
			init: () => {
				if (window.tcRangeSliderPlugins) for (let a of window.tcRangeSliderPlugins) {
					let o = a();
					i.push(o), o.init && typeof o.init == "function" && (o.init(e, t, n, r), c(o), l(o));
				}
			},
			update: a,
			onAttrChange: s,
			destroy: o
		};
	}, ze = 10, Be = 20, Ve = (e, t) => {
		let n = /* @__PURE__ */ new Map(), r = /^value([0-9]*)$/;
		for (let t of e.attributes) {
			let e = t.nodeName.trim().toLowerCase();
			if (!r.test(e)) continue;
			let i = e.replace("value", "").trim(), a = i === "" || i === "0" || i === "1" ? 0 : L(i, 0) - 1, o = I(t.value) ? L(t.value, 0) : t.value;
			n.set(a, o);
		}
		let i = Math.max(...Array.from(n.keys())), a = [];
		a.push([me(e, t, 0), n.get(0)]);
		let o = t;
		for (let r = 1; r <= i; r++) {
			let i = t.cloneNode(!0);
			o.after(i), o = i, a.push([me(e, i, r), n.get(r)]);
		}
		return a;
	}, K = (e, t, n, r, i, a, o) => {
		try {
			Object.defineProperty(e, r, {
				configurable: !0,
				get() {
					if (!t) return;
					let e = t.pointers[n];
					if (!e) return;
					let r = t.getTextValue(e.percent);
					return I(r) ? L(r, r) : r;
				},
				set: (e) => {
					t.pointers[n] ? t?.setValue(e, n) : t?.addPointer(e);
				}
			}), Object.defineProperty(e, i, {
				configurable: !0,
				get() {
					return (t?.pointers[n])?.getAttr("aria-label") ?? void 0;
				},
				set: (e) => {
					!t || t.setAriaLabel(n, e);
				}
			}), Object.defineProperty(e, a, {
				configurable: !0,
				get() {
					return (t?.styles)?.pointerShapes[n] ?? null;
				},
				set: (e) => {
					!t || !t.styles || t.styles.setPointerShape(n, e);
				}
			}), Object.defineProperty(e, o, {
				configurable: !0,
				get() {
					return t?.pointers[n].disabled ?? !1;
				},
				set: (e) => {
					if (!t) return;
					let r = t?.pointers[n];
					!r || (r.disabled = e);
				}
			});
		} catch (e) {
			console.error(e);
		}
	}, He = (e, t) => {
		let n = [
			[
				"value",
				"ariaLabel",
				"pointerShape",
				"pointerDisabled",
				0
			],
			[
				"value0",
				"ariaLabel0",
				"pointerShape0",
				"pointer0Disabled",
				0
			],
			[
				"value1",
				"ariaLabel1",
				"pointerShape1",
				"pointer1Disabled",
				0
			]
		];
		for (let e = 2; e < ze; e++) n.push([
			`value${e}`,
			`ariaLabel${e}`,
			`pointer${e}Shape`,
			`pointer${e}Disabled`,
			e - 1
		]);
		for (let r of n) K(e, t, r[4], r[0], r[1], r[2], r[3]);
	}, Ue = (e, t, n) => {
		let r = n.shadowRoot?.querySelector(".container");
		if (r) for (let n of e) t ? r.prepend(n.$pointer) : r.append(n.$pointer);
	}, We = (e, t) => {
		if (!(!t || e.length <= 1)) {
			for (let t of e) t.$pointer.style.zIndex = Be.toString();
			t.$pointer.style.zIndex = (Be * 2).toString();
		}
	}, Ge = 0, Ke = 100, qe = 2, Je = "0.3s", Ye = (e, t, n) => {
		let r = n.map((e) => e[0]), i = null, a = null, g = null, S = null, C = Ge, w = Ke, T, E, D = ce, O = qe, k = !1, A = !1, j = !1, ee = 0, te = Infinity, M = !1, ne, N, P = !1, re = !1, ie = !1, oe = Je, de = [], pe = (t) => {
			P || (t.preventDefault && t.preventDefault(), xe(t), window.addEventListener("mousemove", xe), window.addEventListener("mouseup", V), fe(e, t));
		}, V = (n) => {
			P || (ne = void 0, N = void 0, window.removeEventListener("mousemove", xe), window.removeEventListener("mouseup", V), oe && t.classList.add(Le), z(e, n));
		}, ye = (e, n) => {
			if (r.length <= 0) return;
			if (r.length === 1) return r[0].isClicked(e) && oe && t.classList.remove(Le), r[0];
			let a = Oe(e);
			if (M) {
				let e = n, r = Ne(e);
				r !== void 0 && (e = le(e, r)), a ? (ne = e, N = 0, oe && t.classList.remove(Le)) : ne !== void 0 && (N = e - ne, ne = e);
			}
			if (!De(e) && !a) {
				for (let n of r) if (!(!n.isClicked(e) || n.disabled)) return oe && t.classList.remove(Le), n;
				for (let e of r) if (i === e) return e;
			}
			let o = Infinity, s = null;
			for (let e of r) {
				if (e.disabled) continue;
				let t = Math.abs(n - e.percent);
				t < o && (o = t, s = e);
			}
			return s;
		}, be = () => r.findIndex((e) => i === e && !e.disabled), xe = (e) => {
			let n;
			if (D === se) {
				let { height: r, top: i } = t.getBoundingClientRect(), a = e.type.indexOf("mouse") === -1 ? e.touches[0].clientY : e.clientY;
				n = Math.min(Math.max(0, a - i), r) * 100 / r;
			} else {
				let { width: r, left: i } = t.getBoundingClientRect(), a = e.type.indexOf("mouse") === -1 ? e.touches[0].clientX : e.clientX;
				n = Math.min(Math.max(0, a - i), r) * 100 / r;
			}
			if ((k || A) && (n = 100 - n), i = ye(e.target, n), i && We(r, i), M && r.length > 1 && N !== void 0) {
				let e = r[0], t = r[r.length - 1], n = e.percent + N < 0, i = t.percent + N > 100;
				if (n || i) return;
				for (let e = 0; e < r.length; e++) J(e, r[e].percent + N);
				return;
			}
			let a = be();
			a !== -1 && (J(a, n), i?.$pointer.focus());
		}, Se = (t) => {
			if (P || document.activeElement !== e || i?.disabled) return;
			t.stopPropagation(), t.preventDefault();
			let n = t.deltaY < 0, a = k || A, o = n ? !a : a, s = be();
			s !== -1 && (o ? ke(s, r[s].percent) : H(s, r[s].percent));
		}, Ce = (e) => {
			P || re || (D === se ? A ? J(e, 100) : J(e, 0) : k ? H(e, r[e].percent) : ke(e, r[e].percent));
		}, we = (e) => {
			P || re || (D === se ? A ? J(e, 0) : J(e, 100) : k ? ke(e, r[e].percent) : H(e, r[e].percent));
		}, Te = (e) => {
			P || re || (D === se ? A ? H(e, r[e].percent) : ke(e, r[e].percent) : k ? J(e, 100) : J(e, 0));
		}, Ee = (e) => {
			P || re || (D === se ? A ? ke(e, r[e].percent) : H(e, r[e].percent) : k ? J(e, 0) : J(e, 100));
		}, De = (e) => e.classList.contains("panel"), Oe = (e) => e.classList.contains("panel-fill"), ke = (e, t) => {
			if (t === void 0) return;
			let n = Ne(t);
			n ??= 1, t -= n, t < 0 && (t = 0), J(e, t);
		}, H = (e, t) => {
			if (t === void 0) return;
			let n = Ne(t);
			n ??= 1, t += n, t > 100 && (t = 100), J(e, t);
		}, Ae = () => {
			!S || S.update({
				percents: He(),
				values: Ye(),
				$pointers: Xe(),
				min: Ze(),
				max: Qe(),
				data: $e(),
				step: Be(),
				round: tt(),
				type: et(),
				textMin: W(),
				textMax: ze(),
				rightToLeft: q(),
				bottomToTop: at(),
				pointersOverlap: lt(),
				pointersMinDistance: nt(),
				pointersMaxDistance: rt(),
				rangeDragging: ut(),
				disabled: ot(),
				keyboardDisabled: st(),
				mousewheelDisabled: ct()
			});
		}, je = () => {
			Ae();
		}, U = (e) => {
			if (!(j || r.length <= 1 || w === C)) if (e === 0) {
				let t = te * 100 / (w - C);
				return Math.max(0, r[e + 1].percent - t);
			} else {
				let t = ee * 100 / (w - C);
				return Math.min(r[e - 1].percent + t, 100);
			}
		}, Me = (e) => {
			if (!(j || r.length <= 1 || w === C)) if (e === r.length - 1) {
				let t = te * 100 / (w - C);
				return Math.min(r[e - 1].percent + t, 100);
			} else {
				let t = ee * 100 / (w - C);
				return Math.max(0, r[e + 1].percent - t);
			}
		}, Ne = (e) => {
			let t;
			if (typeof T == "function") {
				let n = F(0, 100, C, w, e);
				t = T(n, e);
			} else t = T;
			if (I(t)) {
				let e = w - C;
				return t = e === 0 ? 0 : t * 100 / e, t;
			}
		}, Fe = (e) => {
			if (e === void 0) return;
			let t = F(0, 100, C, w, e);
			return E === void 0 ? ue(t, O) : E[Math.round(t)];
		}, W = () => E === void 0 ? C : E[C], ze = () => E === void 0 ? w : E[w], Be = () => T, Ve = (e) => e <= 0 || j ? W() : Fe(r[e - 1].percent) ?? "", K = (e) => r.length <= 1 || e >= r.length - 1 || j ? ze() : Fe(r[e + 1].percent) ?? "", He = () => r.map((e) => e.percent), Ye = () => r.map((e) => Fe(e.percent)), Xe = () => r.map((e) => e.$pointer), Ze = () => C, Qe = () => w, $e = () => E, et = () => D, tt = () => O, nt = () => ee, rt = () => te, it = (e) => de[e], q = () => k, at = () => A, ot = () => P, st = () => re, ct = () => ie, lt = () => j, ut = () => M, J = (t, n) => {
			if (n === void 0) return;
			let i = Ne(n);
			i !== void 0 && (n = le(n, i));
			let o = r[t];
			if (!o) return;
			let s = o.updatePosition(n, U(t), Me(t), D, k, A);
			a?.updatePosition(D, r.map((e) => e.percent), k, A), Ae();
			for (let e of r) {
				let t = Fe(e.percent);
				t !== void 0 && (e.setAttr("aria-valuenow", t.toString()), e.setAttr("aria-valuetext", t.toString()));
			}
			ft(), s && B(e, r.map((e) => Fe(e.percent)));
		}, Y = () => {
			for (let e = 0; e < r.length; e++) J(e, r[e].percent);
		}, dt = (e, t) => {
			C = E === void 0 ? L(e, Ge) : 0, w = E === void 0 ? L(t, Ke) : E.length - 1, pt(C), mt(w);
		}, ft = () => {
			for (let e = 0; e < r.length; e++) {
				let t = r[e];
				t.setAttr("aria-valuemin", (Ve(e) ?? "").toString()), t.setAttr("aria-valuemax", (K(e) ?? "").toString());
			}
		}, pt = (e) => {
			C = L(e, Ge), C > w && (w = C + Ke), Y();
		}, mt = (e) => {
			w = L(e, Ke), w < C && (w = C + Ke), Y();
		}, ht = (e) => {
			j = !0;
			for (let t = 0; t < e.length; t++) gt(e[t], t);
			j = !1;
			for (let t = 0; t < e.length; t++) gt(e[t], t);
		}, gt = (e, t) => {
			let n;
			E === void 0 ? (n = L(e, C), n < C && (n = C), n > w && (n = w)) : (n = e == null ? 0 : ge(e, E), n === -1 && (n = 0)), J(t, F(C, w, 0, 100, n));
		}, _t = (e) => {
			if (e == null) {
				T = void 0;
				return;
			}
			if (typeof e == "function") {
				T = e, Y();
				return;
			}
			if (I(e)) {
				T = L(e, 1);
				let t = Math.abs(w - C);
				T > t && (T = void 0), Y();
				return;
			}
			T = void 0;
		}, vt = (e) => {
			j = e, Y();
		}, yt = (e) => {
			(!I(e) || e < 0) && (e = 0), ee = e;
		}, bt = (e) => {
			(!I(e) || e < 0) && (e = Infinity), te = e;
		}, xt = (e) => {
			P = e, t.classList.toggle("disabled", P), P ? t.setAttribute("aria-disabled", "true") : t.hasAttribute("aria-disabled") && t.removeAttribute("aria-disabled");
		}, St = (e) => {
			re = e;
		}, Ct = (e) => {
			ie = e, ie ? document.removeEventListener("wheel", Se) : document.addEventListener("wheel", Se, { passive: !1 });
		}, wt = (e) => {
			if (e == null) {
				E = void 0;
				return;
			}
			if (E = he(e), E === void 0 || E.length <= 0) {
				E = void 0;
				return;
			}
			pt(0), mt(E.length - 1), T === void 0 && _t(1);
		}, Tt = (t) => {
			D = typeof t == "string" && t.trim().toLowerCase() === se ? se : ce;
			let n = e.shadowRoot?.querySelector(".range-slider-box");
			if (!n) return;
			n.className = `range-slider-box type-${D}`, Y();
			let i = D === se ? "vertical" : "horizontal";
			for (let e of r) e.setAttr("aria-orientation", i);
		}, Et = (t) => {
			k = t, r.length > 1 && Ue(r, k, e), Y(), Ae();
		}, Dt = (t) => {
			A = t, r.length > 1 && Ue(r, A, e), Y(), Ae();
		}, Ot = (e) => {
			O = L(e, qe), O < 0 && (O = qe), Ae();
		}, kt = (e) => {
			e == null || e.toString().trim().toLowerCase() === "false" ? (oe = void 0, t.style.removeProperty(ve), t.classList.remove(Le)) : (oe = e.toString(), t.style.setProperty(ve, oe), t.classList.add(Le));
		}, At = (e, t) => {
			let n = r[e];
			!n || (n.setAttr("aria-label", t), de[e] = t);
		}, jt = (e) => {
			if (ne = void 0, r.length <= 1) {
				M = !1, t.classList.remove(G);
				return;
			}
			M = e, t.classList.toggle(G, M);
		}, Mt = () => {
			xt(R(e.getAttribute(y))), re = R(e.getAttribute(b)), ie = R(e.getAttribute(x));
			let t = Pe(e, /^pointer([0-9]*)-disabled$/, (e) => R(e));
			for (let e of t) {
				let t = e[0];
				!r[t] || (r[t].disabled = e[1]);
			}
		}, Nt = () => {
			let t = Pe(e, /^aria-label([0-9]*)$/);
			for (let e of t) {
				let t = e[0];
				At(t, e[1]);
			}
		};
		return (() => {
			for (let e of r) e.setCallbacks(Ce, we, Te, Ee);
			let i = e.shadowRoot?.querySelector(".panel-fill");
			i && (a = _e(i)), Tt(e.getAttribute(h)), Et(R(e.getAttribute(_))), Dt(R(e.getAttribute(v))), dt(e.getAttribute(d), e.getAttribute(f)), _t(e.getAttribute(p)), wt(e.getAttribute(u)), ht(n.map((e) => e[1])), vt(R(e.getAttribute(o))), yt(L(e.getAttribute(s), 0)), bt(L(e.getAttribute(c), Infinity)), jt(R(e.getAttribute(l))), Ot(L(e.getAttribute(m), qe)), Mt(), Nt(), g = Ie(e, t, r), kt(e.getAttribute(ae) ?? Je), t.addEventListener("mousedown", pe), t.addEventListener("mouseup", V), t.addEventListener("touchmove", xe), t.addEventListener("touchstart", xe), ie || document.addEventListener("wheel", Se, { passive: !1 }), S = Re(e, je, {
				setValues: ht,
				setMin: pt,
				setMax: mt,
				setStep: _t,
				setPointersOverlap: vt,
				setPointersMinDistance: yt,
				setPointersMaxDistance: bt,
				setDisabled: xt,
				setType: Tt,
				setRightToLeft: Et,
				setBottomToTop: Dt,
				setRound: Ot,
				setKeyboardDisabled: St,
				setMousewheelDisabled: Ct,
				setRangeDragging: jt,
				setData: wt
			}, {
				getPercents: He,
				getValues: Ye,
				getPointerElements: Xe,
				getMin: Ze,
				getMax: Qe,
				getStep: Be,
				getData: $e,
				getType: et,
				getRound: tt,
				getTextMin: W,
				getTextMax: ze,
				isRightToLeft: q,
				isBottomToTop: at,
				isDisabled: ot,
				isKeyboardDisabled: st,
				isMousewheelDisabled: ct,
				isPointersOverlap: lt,
				isRangeDraggingEnabled: ut,
				getPointersMinDistance: nt,
				getPointersMaxDistance: rt
			}), S.init();
		})(), {
			get pointers() {
				return r;
			},
			get styles() {
				return g;
			},
			get pluginsManager() {
				return S;
			},
			get min() {
				return W();
			},
			get max() {
				return ze();
			},
			get step() {
				return Be();
			},
			get pointersOverlap() {
				return lt();
			},
			set pointersOverlap(e) {
				vt(e);
			},
			get pointersMinDistance() {
				return nt();
			},
			set pointersMinDistance(e) {
				yt(e);
			},
			get pointersMaxDistance() {
				return rt();
			},
			set pointersMaxDistance(e) {
				bt(e);
			},
			get disabled() {
				return ot();
			},
			set disabled(e) {
				xt(e);
			},
			get data() {
				return $e();
			},
			get type() {
				return et();
			},
			set type(e) {
				Tt(e);
			},
			get rightToLeft() {
				return q();
			},
			set rightToLeft(e) {
				Et(e);
			},
			get bottomToTop() {
				return at();
			},
			set bottomToTop(e) {
				Dt(e);
			},
			get round() {
				return tt();
			},
			set round(e) {
				Ot(e);
			},
			get animateOnClick() {
				return oe;
			},
			set animateOnClick(e) {
				kt(e);
			},
			get keyboardDisabled() {
				return st();
			},
			set keyboardDisabled(e) {
				St(e);
			},
			get mousewheelDisabled() {
				return ct();
			},
			set mousewheelDisabled(e) {
				Ct(e);
			},
			get rangeDragging() {
				return ut();
			},
			set rangeDragging(e) {
				jt(e);
			},
			setMin: pt,
			setMax: mt,
			setValue: gt,
			setStep: _t,
			setData: wt,
			getTextValue: Fe,
			setAriaLabel: At,
			getAriaLabel: it,
			addPointer: (t) => {
				let n = r.length, i = r[n - 1].$pointer, a = i.cloneNode(!0);
				i.after(a);
				let o = me(e, a, n);
				return o.setCallbacks(Ce, we, Te, Ee), r.push(o), gt(t, n), Y(), Ae(), n;
			},
			removePointer: () => {
				let e = r.length, t = r[e - 1];
				return t ? (t.destroy(), r.pop(), r.length <= 1 && jt(!1), Y(), Ae(), e - 1) : -1;
			},
			destroy: () => {
				t.removeEventListener("mousedown", pe), t.removeEventListener("mouseup", V), t.removeEventListener("touchmove", xe), t.removeEventListener("touchstart", xe), document.removeEventListener("wheel", Se);
				for (let e of r) e.destroy();
				S?.destroy();
			}
		};
	}, Xe = (e, t, n) => {
		let r = W.find(([e, n, r, i]) => n.replace("#", "") === t.replace(/\d+/g, ""));
		if (r && e.styles) {
			let [i, a, o, s] = r, c = t.replace(/\D/g, "").trim(), l = c === "" || c === "0" || c === "1" ? 0 : L(c, 0) - 1;
			e.styles.setStyle(i, n, l);
			return;
		}
		switch (e && e.pluginsManager && e.pluginsManager.onAttrChange(t, n), t) {
			case d:
				e.setMin(n);
				break;
			case f:
				e.setMax(n);
				break;
			case p:
				e.setStep(n);
				break;
			case o:
				e.pointersOverlap = R(n);
				break;
			case s:
				e.pointersMinDistance = L(n, 0);
				break;
			case l:
				e.rangeDragging = R(n);
				break;
			case c:
				e.pointersMaxDistance = L(n, Infinity);
				break;
			case y:
				e.disabled = R(n);
				break;
			case b:
				e.keyboardDisabled = R(n);
				break;
			case x:
				e.mousewheelDisabled = R(n);
				break;
			case u:
				e.setData(n);
				break;
			case h:
				e.type = n;
				break;
			case _:
				e.rightToLeft = R(n);
				break;
			case v:
				e.bottomToTop = R(n);
				break;
			case m:
				e.round = L(n, qe);
				break;
			case g:
				e.styles && (e.styles.theme = n);
				break;
			case ae:
				e.animateOnClick = n;
				break;
		}
		let i = null;
		if (/^value([0-9]*)$/.test(t) && (i = "value"), /^pointer([0-9]*)-disabled$/.test(t) && (i = "pointer-disabled"), /^aria-label([0-9]*)$/.test(t) && (i = "aria-label"), /^pointer([0-9]*)-shape$/.test(t) && (i = "pointer-shape"), !i) return;
		let a = t.replace(/\D/g, "").trim(), S = a === "" || a === "0" || a === "1" ? 0 : L(a, 0) - 1;
		switch (i) {
			case "value":
				e.setValue(n, S);
				break;
			case "pointer-disabled": {
				let t = e?.pointers[S];
				if (!t) return;
				t.disabled = R(n);
				break;
			}
			case "aria-label":
				e.setAriaLabel(S, n);
				break;
			case "pointer-shape":
				e.styles && e.styles.setPointerShape(S, n);
				break;
		}
	}, Ze = class extends HTMLElement {
		constructor() {
			super(), r(this, "slider"), r(this, "_externalCSSList", []), r(this, "_observer", null), this.attachShadow({ mode: "open" });
		}
		set step(e) {
			this.slider && this.slider.setStep(e);
		}
		get step() {
			return this.slider?.step;
		}
		set disabled(e) {
			this.slider && (this.slider.disabled = e);
		}
		get disabled() {
			return this.slider?.disabled ?? !1;
		}
		set data(e) {
			var t;
			(t = this.slider) == null || t.setData(e);
		}
		get data() {
			return this.slider?.data;
		}
		set min(e) {
			var t;
			(t = this.slider) == null || t.setMin(e);
		}
		get min() {
			return this.slider?.min;
		}
		set max(e) {
			var t;
			(t = this.slider) == null || t.setMax(e);
		}
		get max() {
			return this.slider?.max;
		}
		set round(e) {
			!this.slider || (this.slider.round = e);
		}
		get round() {
			return this.slider?.round ?? qe;
		}
		set type(e) {
			!this.slider || (this.slider.type = e ?? ce);
		}
		get type() {
			return this.slider?.type || ce;
		}
		set pointersOverlap(e) {
			!this.slider || (this.slider.pointersOverlap = e);
		}
		get pointersOverlap() {
			return this.slider?.pointersOverlap ?? !1;
		}
		set pointersMinDistance(e) {
			!this.slider || (this.slider.pointersMinDistance = e);
		}
		get pointersMinDistance() {
			return this.slider?.pointersMinDistance ?? 0;
		}
		set pointersMaxDistance(e) {
			!this.slider || (this.slider.pointersMaxDistance = e);
		}
		get pointersMaxDistance() {
			return this.slider?.pointersMaxDistance ?? Infinity;
		}
		set theme(e) {
			!this.slider || !this.slider.styles || (this.slider.styles.theme = e);
		}
		get theme() {
			return this.slider?.styles?.theme ?? null;
		}
		set rtl(e) {
			!this.slider || (this.slider.rightToLeft = e);
		}
		get rtl() {
			return this.slider?.rightToLeft ?? !1;
		}
		set btt(e) {
			!this.slider || (this.slider.bottomToTop = e);
		}
		get btt() {
			return this.slider?.bottomToTop ?? !1;
		}
		set keyboardDisabled(e) {
			!this.slider || (this.slider.keyboardDisabled = e);
		}
		get keyboardDisabled() {
			return this.slider?.keyboardDisabled ?? !1;
		}
		set mousewheelDisabled(e) {
			!this.slider || (this.slider.mousewheelDisabled = e);
		}
		get mousewheelDisabled() {
			return this.slider?.mousewheelDisabled ?? !1;
		}
		set animateOnClick(e) {
			!this.slider || (this.slider.animateOnClick = e);
		}
		get animateOnClick() {
			return this.slider?.animateOnClick;
		}
		get rangeDragging() {
			return this.slider?.rangeDragging ?? !1;
		}
		set rangeDragging(e) {
			this.slider && (this.slider.rangeDragging = R(e));
		}
		get externalCSSList() {
			return this._externalCSSList;
		}
		addPointer(e) {
			if (!this.slider) return;
			let t = this.slider?.addPointer(e) ?? 0;
			K(this, this.slider, t, `value${t + 1}`, `ariaLabel${t + 1}`, `pointerShape${t + 1}`, `pointer${t + 1}Disabled`);
		}
		removePointer() {
			var e;
			!this.slider || (e = this.slider) == null || e.removePointer();
		}
		addCSS(e) {
			if (!this.shadowRoot) return;
			let t = document.createElement("style");
			t.textContent = e, this.shadowRoot.appendChild(t);
		}
		connectedCallback() {
			if (!this.shadowRoot) return;
			this._externalCSSList = Fe(this), this.shadowRoot.innerHTML = i(a, this._externalCSSList);
			let e = this.shadowRoot?.querySelector(".pointer");
			if (!e) return;
			let t = this.shadowRoot?.getElementById("range-slider");
			if (!t) return;
			let n = Ve(this, e);
			this.slider = Ye(this, t, n), He(this, this.slider), this._observer = new MutationObserver((e) => {
				e.forEach((e) => {
					if (!this.slider || e.type !== "attributes") return;
					let t = e.attributeName;
					!t || Xe(this.slider, t, this.getAttribute(t) ?? "");
				});
			}), this._observer.observe(this, { attributes: !0 });
		}
		disconnectedCallback() {
			this._observer && this._observer.disconnect(), this.slider && this.slider.destroy();
		}
	};
	window.tcRangeSlider = Ze, customElements.get("toolcool-range-slider") || customElements.define("toolcool-range-slider", Ze), customElements.get("tc-range-slider") || customElements.define("tc-range-slider", class extends Ze {});
})();
//#endregion
//#region src/components/filters/range.js
var rs = class extends H {
	static properties = {
		filterObject: {
			attribute: !1,
			type: Object
		},
		suggestions: {
			attribute: !1,
			type: Array
		},
		tabIndex: {
			attribute: !1,
			type: Number
		},
		inlineMode: {
			attribute: "inline-mode",
			type: Boolean
		}
	};
	constructor() {
		super(), this.filterObject = {}, this.suggestions = [], this.tabIndex = 0, this.inlineMode = !1, this.inputHandler = this.#e.bind(this), this.debouncedInputHandler = (0, so.default)(this.inputHandler, 500, { leading: !1 });
	}
	#e(e) {
		ho(e, this);
	}
	#t(e, t) {
		return go(e, t, this);
	}
	reset() {
		mo(this);
	}
	createRenderRoot() {
		return this;
	}
	render() {
		return U(this.filterObject, () => z`
        ${U(ao(this.filterObject), () => z`
            <eox-timecontrol
              .controlValues=${[{
			id: this.filterObject.key,
			title: this.filterObject.title || "Filter",
			timeControlValues: (this.filterObject.filterKeys || this.suggestions || []).map((e) => typeof e == "object" ? e : { date: e })
		}]}
              .initDate=${[(0, $.default)(this.filterObject.state.min || this.filterObject.min).format(), (0, $.default)(this.filterObject.state.max || this.filterObject.max).format()]}
              @select=${(e) => ho(new CustomEvent("values", { detail: { values: [(0, $.default)(e.detail.date[0]).valueOf(), (0, $.default)(e.detail.date[1]).valueOf()] } }), this)}
            >
              <eox-timecontrol-date
                .format=${po}
              ></eox-timecontrol-date>
              <eox-timecontrol-picker
                style="${this.inlineMode ? "margin-bottom: 1rem; display: block;" : ""}"
                ?popup=${!this.inlineMode}
                range
                show-dots
                .position=${["bottom", "left"]}
              ></eox-timecontrol-picker>
            </eox-timecontrol>
          `, () => z`
            <div style="display: flex; gap: .5rem; align-items: center;">
              ${this.#t("min", "before")}
              <tc-range-slider
                min="${this.filterObject.min}"
                max="${this.filterObject.max}"
                value1="${this.filterObject.state.min || this.filterObject.min}"
                value2="${this.filterObject.state.max || this.filterObject.max}"
                step="${this.filterObject.step || 1}"
                @change=${this.debouncedInputHandler}
              ></tc-range-slider>
              ${this.#t("max", "after")}
            </div>
          `)}
      `);
	}
};
customElements.define("eox-itemfilter-range", rs);
//#endregion
//#region src/components/filters/spatial.js
var is = class extends H {
	static get properties() {
		return {
			filterObject: { type: Object },
			tabIndex: {
				attribute: !1,
				type: Number
			}
		};
	}
	constructor() {
		super(), this.filterObject = {}, this.tabIndex = 0;
	}
	reset() {
		Eo(this);
	}
	createRenderRoot() {
		return this;
	}
	#e(e) {
		Oo(e, this);
	}
	render() {
		return U(this.filterObject, () => z`
        <div
          style="margin-left: var(--_list-padding); padding-right: var(--_padding)"
        >
          <nav class="no-margin wrap">
            ${je(["intersects", "within"], (e) => z`
                <label class="radio small small-text">
                  <input
                    tabindex=${this.tabIndex}
                    type="radio"
                    name="mode"
                    .checked="${(this.filterObject.state.mode || "") === e || B}"
                    value="${e}"
                    @click=${() => this.#e(e)}
                  />
                  <span style="font-size: x-small">${e} geometry</span>
                </label>
              `)}
          </nav>
          <eox-itemfilter-spatial-filter
            exportparts="map: spatial-filter-map"
            .geometry="${this.filterObject.state?.geometry}"
            @filter="${(e) => {
			this.filterObject.state.geometry = e.detail.geometry, this.filterObject.dirty = !0, this.filterObject.stringifiedState = "Polygon", this.dispatchEvent(new CustomEvent("filter"));
		}}"
          ></eox-itemfilter-spatial-filter>
        </div>
      `);
	}
};
customElements.define("eox-itemfilter-spatial", is);
var as = class extends H {
	static get properties() {
		return {
			geometry: { type: Object },
			eoxMap: { type: Object }
		};
	}
	constructor() {
		super(), this.geometry = null, this.eoxMap = null;
	}
	firstUpdated() {
		this.#e();
	}
	#e() {
		ko(this);
	}
	reset() {
		Do(this);
	}
	render() {
		return z`<div id="eox-map"></div>`;
	}
};
customElements.define("eox-itemfilter-spatial-filter", as);
//#endregion
//#region src/methods/chips/handler.js
function os(e, t) {
	t.renderRoot.querySelectorAll(".chip").forEach((e) => {
		e.classList.remove("highlighted");
	}), e.target instanceof HTMLElement && e.target.classList.add("highlighted"), t.requestUpdate();
}
function ss(e, t) {
	let { code: n, target: r } = e;
	r instanceof HTMLElement && r.id !== "eox-itemfilter-input-search" || t.parentElement.classList.contains("hidden") && [
		"ArrowLeft",
		"ArrowRight",
		"Backspace"
	].includes(n) || (n === "Space" && e.preventDefault(), [
		"Escape",
		"Space",
		"Enter"
	].includes(n) || e.stopPropagation(), [
		"ArrowLeft",
		"ArrowRight",
		"Escape",
		"Backspace"
	].includes(n) && cs(n, e.target.value ?? "", t));
}
function cs(e, t, n) {
	let r = n.renderRoot.querySelector(".chip.highlighted");
	if ((e === "Escape" || t) && r && r.classList.remove("highlighted"), e === "Backspace" && !t) {
		if (n.items.length) {
			r && (r.querySelector(".chip-item-close").click(), n.items.splice(Array.from(n.renderRoot.querySelectorAll(".chip")).indexOf(r), 1));
			let e = n.renderRoot.querySelectorAll(".chip")[n.renderRoot.querySelectorAll(".chip").length - 1];
			e.classList.contains("highlighted") || e.classList.add("highlighted"), n.requestUpdate();
		}
		n._dispatchEvent();
	}
	if ((e === "ArrowLeft" || e === "ArrowRight") && !t) {
		if (n.renderRoot.querySelectorAll(".chip").length < 1) return;
		let t = 0, r = n.renderRoot.querySelector(".chip.highlighted");
		r && (t = Array.from(n.renderRoot.querySelectorAll(".chip")).indexOf(r), r.classList.remove("highlighted")), t += e === "ArrowLeft" ? -1 : 1, e === "ArrowLeft" && t < 0 && (t = n.renderRoot.querySelectorAll(".chip").length - 1), e === "ArrowRight" && t > n.renderRoot.querySelectorAll(".chip").length - 1 && (t = 0), Array.from(n.renderRoot.querySelectorAll(".chip"))[t].classList.add("highlighted");
	}
}
//#endregion
//#region src/components/chips.js
var ls = class extends H {
	static get properties() {
		return {
			items: {
				attribute: !1,
				type: Object
			},
			controller: {
				attribute: !1,
				type: Object
			}
		};
	}
	constructor() {
		super(), this.items = {}, this.controller = {};
	}
	createRenderRoot() {
		return this;
	}
	connectedCallback() {
		super.connectedCallback(), this.getRootNode().addEventListener("keydown", this.#e.bind(this));
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.getRootNode().removeEventListener("keydown", this.#e.bind(this));
	}
	_dispatchEvent() {
		this.dispatchEvent(new CustomEvent("items-selected", { detail: this.items }));
	}
	#e(e) {
		ss(e, this);
	}
	#t(e) {
		os(e, this);
	}
	render() {
		return z`
      <span class="chip-container">
        ${je(this.items, (e) => z`
            <span class="chip tiny-margin" @click=${this.#t.bind(this)}>
              <span class="chip-title">${e.title}</span>
                <span
                  class="chip-item-close hidden"
                  data-close=${e.key}
                  @click=${(e) => {
			e.stopPropagation(), this.controller.remove(e), this.requestUpdate();
		}}
                ></span>
              </span>
            </span>
          `)}
      </span>
    `;
	}
};
customElements.define("eox-itemfilter-chips", ls);
//#endregion
//#region ../../node_modules/lodash.uniq/index.js
var us = /* @__PURE__ */ o(((e, t) => {
	var n = 200, r = "__lodash_hash_undefined__", i = Infinity, a = "[object Function]", o = "[object GeneratorFunction]", s = /[\\^$.*+?()[\]{}|]/g, c = /^\[object .+?Constructor\]$/, l = typeof global == "object" && global && global.Object === Object && global, u = typeof self == "object" && self && self.Object === Object && self, d = l || u || Function("return this")();
	function f(e, t) {
		return !!(e && e.length) && h(e, t, 0) > -1;
	}
	function p(e, t, n) {
		for (var r = -1, i = e ? e.length : 0; ++r < i;) if (n(t, e[r])) return !0;
		return !1;
	}
	function m(e, t, n, r) {
		for (var i = e.length, a = n + (r ? 1 : -1); r ? a-- : ++a < i;) if (t(e[a], a, e)) return a;
		return -1;
	}
	function h(e, t, n) {
		if (t !== t) return m(e, g, n);
		for (var r = n - 1, i = e.length; ++r < i;) if (e[r] === t) return r;
		return -1;
	}
	function g(e) {
		return e !== e;
	}
	function _(e, t) {
		return e.has(t);
	}
	function v(e, t) {
		return e?.[t];
	}
	function y(e) {
		var t = !1;
		if (e != null && typeof e.toString != "function") try {
			t = !!(e + "");
		} catch {}
		return t;
	}
	function b(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e) {
			n[++t] = e;
		}), n;
	}
	var x = Array.prototype, S = Function.prototype, C = Object.prototype, w = d["__core-js_shared__"], T = function() {
		var e = /[^.]+$/.exec(w && w.keys && w.keys.IE_PROTO || "");
		return e ? "Symbol(src)_1." + e : "";
	}(), E = S.toString, D = C.hasOwnProperty, O = C.toString, k = RegExp("^" + E.call(D).replace(s, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), A = x.splice, j = V(d, "Map"), ee = V(d, "Set"), te = V(Object, "create");
	function M(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function ne() {
		this.__data__ = te ? te(null) : {};
	}
	function N(e) {
		return this.has(e) && delete this.__data__[e];
	}
	function P(e) {
		var t = this.__data__;
		if (te) {
			var n = t[e];
			return n === r ? void 0 : n;
		}
		return D.call(t, e) ? t[e] : void 0;
	}
	function re(e) {
		var t = this.__data__;
		return te ? t[e] !== void 0 : D.call(t, e);
	}
	function ie(e, t) {
		var n = this.__data__;
		return n[e] = te && t === void 0 ? r : t, this;
	}
	M.prototype.clear = ne, M.prototype.delete = N, M.prototype.get = P, M.prototype.has = re, M.prototype.set = ie;
	function ae(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function oe() {
		this.__data__ = [];
	}
	function se(e) {
		var t = this.__data__, n = me(t, e);
		return n < 0 ? !1 : (n == t.length - 1 ? t.pop() : A.call(t, n, 1), !0);
	}
	function ce(e) {
		var t = this.__data__, n = me(t, e);
		return n < 0 ? void 0 : t[n][1];
	}
	function F(e) {
		return me(this.__data__, e) > -1;
	}
	function I(e, t) {
		var n = this.__data__, r = me(n, e);
		return r < 0 ? n.push([e, t]) : n[r][1] = t, this;
	}
	ae.prototype.clear = oe, ae.prototype.delete = se, ae.prototype.get = ce, ae.prototype.has = F, ae.prototype.set = I;
	function L(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function le() {
		this.__data__ = {
			hash: new M(),
			map: new (j || ae)(),
			string: new M()
		};
	}
	function ue(e) {
		return ve(this, e).delete(e);
	}
	function R(e) {
		return ve(this, e).get(e);
	}
	function de(e) {
		return ve(this, e).has(e);
	}
	function fe(e, t) {
		return ve(this, e).set(e, t), this;
	}
	L.prototype.clear = le, L.prototype.delete = ue, L.prototype.get = R, L.prototype.has = de, L.prototype.set = fe;
	function z(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.__data__ = new L(); ++t < n;) this.add(e[t]);
	}
	function pe(e) {
		return this.__data__.set(e, r), this;
	}
	function B(e) {
		return this.__data__.has(e);
	}
	z.prototype.add = z.prototype.push = pe, z.prototype.has = B;
	function me(e, t) {
		for (var n = e.length; n--;) if (Ce(e[n][0], t)) return n;
		return -1;
	}
	function he(e) {
		return !Te(e) || be(e) ? !1 : (we(e) || y(e) ? k : c).test(xe(e));
	}
	function ge(e, t, r) {
		var i = -1, a = f, o = e.length, s = !0, c = [], l = c;
		if (r) s = !1, a = p;
		else if (o >= n) {
			var u = t ? null : _e(e);
			if (u) return b(u);
			s = !1, a = _, l = new z();
		} else l = t ? [] : c;
		outer: for (; ++i < o;) {
			var d = e[i], m = t ? t(d) : d;
			if (d = r || d !== 0 ? d : 0, s && m === m) {
				for (var h = l.length; h--;) if (l[h] === m) continue outer;
				t && l.push(m), c.push(d);
			} else a(l, m, r) || (l !== c && l.push(m), c.push(d));
		}
		return c;
	}
	var _e = ee && 1 / b(new ee([, -0]))[1] == i ? function(e) {
		return new ee(e);
	} : Ee;
	function ve(e, t) {
		var n = e.__data__;
		return ye(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
	}
	function V(e, t) {
		var n = v(e, t);
		return he(n) ? n : void 0;
	}
	function ye(e) {
		var t = typeof e;
		return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
	}
	function be(e) {
		return !!T && T in e;
	}
	function xe(e) {
		if (e != null) {
			try {
				return E.call(e);
			} catch {}
			try {
				return e + "";
			} catch {}
		}
		return "";
	}
	function Se(e) {
		return e && e.length ? ge(e) : [];
	}
	function Ce(e, t) {
		return e === t || e !== e && t !== t;
	}
	function we(e) {
		var t = Te(e) ? O.call(e) : "";
		return t == a || t == o;
	}
	function Te(e) {
		var t = typeof e;
		return !!e && (t == "object" || t == "function");
	}
	function Ee() {}
	t.exports = Se;
})), ds = /* @__PURE__ */ o(((e, t) => {
	var n = 200, r = "Expected a function", i = "__lodash_hash_undefined__", a = 1, o = 2, s = Infinity, c = 9007199254740991, l = "[object Arguments]", u = "[object Array]", d = "[object Boolean]", f = "[object Date]", p = "[object Error]", m = "[object Function]", h = "[object GeneratorFunction]", g = "[object Map]", _ = "[object Number]", v = "[object Object]", y = "[object Promise]", b = "[object RegExp]", x = "[object Set]", S = "[object String]", C = "[object Symbol]", w = "[object WeakMap]", T = "[object ArrayBuffer]", E = "[object DataView]", D = "[object Float32Array]", O = "[object Float64Array]", k = "[object Int8Array]", A = "[object Int16Array]", j = "[object Int32Array]", ee = "[object Uint8Array]", te = "[object Uint8ClampedArray]", M = "[object Uint16Array]", ne = "[object Uint32Array]", N = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, P = /^\w*$/, re = /^\./, ie = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ae = /[\\^$.*+?()[\]{}|]/g, oe = /\\(\\)?/g, se = /^\[object .+?Constructor\]$/, ce = /^(?:0|[1-9]\d*)$/, F = {};
	F[D] = F[O] = F[k] = F[A] = F[j] = F[ee] = F[te] = F[M] = F[ne] = !0, F[l] = F[u] = F[T] = F[d] = F[E] = F[f] = F[p] = F[m] = F[g] = F[_] = F[v] = F[b] = F[x] = F[S] = F[w] = !1;
	var I = typeof global == "object" && global && global.Object === Object && global, L = typeof self == "object" && self && self.Object === Object && self, le = I || L || Function("return this")(), ue = typeof e == "object" && e && !e.nodeType && e, R = ue && typeof t == "object" && t && !t.nodeType && t, de = R && R.exports === ue && I.process, fe = function() {
		try {
			return de && de.binding("util");
		} catch {}
	}(), z = fe && fe.isTypedArray;
	function pe(e, t) {
		for (var n = -1, r = e ? e.length : 0, i = Array(r); ++n < r;) i[n] = t(e[n], n, e);
		return i;
	}
	function B(e, t) {
		for (var n = -1, r = t.length, i = e.length; ++n < r;) e[i + n] = t[n];
		return e;
	}
	function me(e, t) {
		for (var n = -1, r = e ? e.length : 0; ++n < r;) if (t(e[n], n, e)) return !0;
		return !1;
	}
	function he(e) {
		return function(t) {
			return t?.[e];
		};
	}
	function ge(e, t) {
		for (var n = -1, r = Array(e); ++n < e;) r[n] = t(n);
		return r;
	}
	function _e(e) {
		return function(t) {
			return e(t);
		};
	}
	function ve(e, t) {
		return e?.[t];
	}
	function V(e) {
		var t = !1;
		if (e != null && typeof e.toString != "function") try {
			t = !!(e + "");
		} catch {}
		return t;
	}
	function ye(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e, r) {
			n[++t] = [r, e];
		}), n;
	}
	function be(e, t) {
		return function(n) {
			return e(t(n));
		};
	}
	function xe(e) {
		var t = -1, n = Array(e.size);
		return e.forEach(function(e) {
			n[++t] = e;
		}), n;
	}
	var Se = Array.prototype, Ce = Function.prototype, we = Object.prototype, Te = le["__core-js_shared__"], Ee = function() {
		var e = /[^.]+$/.exec(Te && Te.keys && Te.keys.IE_PROTO || "");
		return e ? "Symbol(src)_1." + e : "";
	}(), De = Ce.toString, Oe = we.hasOwnProperty, ke = we.toString, H = RegExp("^" + De.call(Oe).replace(ae, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Ae = le.Symbol, je = le.Uint8Array, U = we.propertyIsEnumerable, Me = Se.splice, Ne = Ae ? Ae.isConcatSpreadable : void 0, Pe = be(Object.keys, Object), Fe = Gt(le, "DataView"), W = Gt(le, "Map"), Ie = Gt(le, "Promise"), Le = Gt(le, "Set"), G = Gt(le, "WeakMap"), Re = Gt(Object, "create"), ze = an(Fe), Be = an(W), Ve = an(Ie), K = an(Le), He = an(G), Ue = Ae ? Ae.prototype : void 0, We = Ue ? Ue.valueOf : void 0, Ge = Ue ? Ue.toString : void 0;
	function Ke(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function qe() {
		this.__data__ = Re ? Re(null) : {};
	}
	function Je(e) {
		return this.has(e) && delete this.__data__[e];
	}
	function Ye(e) {
		var t = this.__data__;
		if (Re) {
			var n = t[e];
			return n === i ? void 0 : n;
		}
		return Oe.call(t, e) ? t[e] : void 0;
	}
	function Xe(e) {
		var t = this.__data__;
		return Re ? t[e] !== void 0 : Oe.call(t, e);
	}
	function Ze(e, t) {
		var n = this.__data__;
		return n[e] = Re && t === void 0 ? i : t, this;
	}
	Ke.prototype.clear = qe, Ke.prototype.delete = Je, Ke.prototype.get = Ye, Ke.prototype.has = Xe, Ke.prototype.set = Ze;
	function Qe(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function $e() {
		this.__data__ = [];
	}
	function et(e) {
		var t = this.__data__, n = _t(t, e);
		return n < 0 ? !1 : (n == t.length - 1 ? t.pop() : Me.call(t, n, 1), !0);
	}
	function tt(e) {
		var t = this.__data__, n = _t(t, e);
		return n < 0 ? void 0 : t[n][1];
	}
	function nt(e) {
		return _t(this.__data__, e) > -1;
	}
	function rt(e, t) {
		var n = this.__data__, r = _t(n, e);
		return r < 0 ? n.push([e, t]) : n[r][1] = t, this;
	}
	Qe.prototype.clear = $e, Qe.prototype.delete = et, Qe.prototype.get = tt, Qe.prototype.has = nt, Qe.prototype.set = rt;
	function it(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.clear(); ++t < n;) {
			var r = e[t];
			this.set(r[0], r[1]);
		}
	}
	function q() {
		this.__data__ = {
			hash: new Ke(),
			map: new (W || Qe)(),
			string: new Ke()
		};
	}
	function at(e) {
		return Ut(this, e).delete(e);
	}
	function ot(e) {
		return Ut(this, e).get(e);
	}
	function st(e) {
		return Ut(this, e).has(e);
	}
	function ct(e, t) {
		return Ut(this, e).set(e, t), this;
	}
	it.prototype.clear = q, it.prototype.delete = at, it.prototype.get = ot, it.prototype.has = st, it.prototype.set = ct;
	function lt(e) {
		var t = -1, n = e ? e.length : 0;
		for (this.__data__ = new it(); ++t < n;) this.add(e[t]);
	}
	function ut(e) {
		return this.__data__.set(e, i), this;
	}
	function J(e) {
		return this.__data__.has(e);
	}
	lt.prototype.add = lt.prototype.push = ut, lt.prototype.has = J;
	function Y(e) {
		this.__data__ = new Qe(e);
	}
	function dt() {
		this.__data__ = new Qe();
	}
	function ft(e) {
		return this.__data__.delete(e);
	}
	function pt(e) {
		return this.__data__.get(e);
	}
	function mt(e) {
		return this.__data__.has(e);
	}
	function ht(e, t) {
		var r = this.__data__;
		if (r instanceof Qe) {
			var i = r.__data__;
			if (!W || i.length < n - 1) return i.push([e, t]), this;
			r = this.__data__ = new it(i);
		}
		return r.set(e, t), this;
	}
	Y.prototype.clear = dt, Y.prototype.delete = ft, Y.prototype.get = pt, Y.prototype.has = mt, Y.prototype.set = ht;
	function gt(e, t) {
		var n = X(e) || un(e) ? ge(e.length, String) : [], r = n.length, i = !!r;
		for (var a in e) (t || Oe.call(e, a)) && !(i && (a == "length" || Yt(a, r))) && n.push(a);
		return n;
	}
	function _t(e, t) {
		for (var n = e.length; n--;) if (ln(e[n][0], t)) return n;
		return -1;
	}
	var vt = Rt(xt);
	function yt(e, t, n, r, i) {
		var a = -1, o = e.length;
		for (n ||= Jt, i ||= []; ++a < o;) {
			var s = e[a];
			t > 0 && n(s) ? t > 1 ? yt(s, t - 1, n, r, i) : B(i, s) : r || (i[i.length] = s);
		}
		return i;
	}
	var bt = zt();
	function xt(e, t) {
		return e && bt(e, t, Sn);
	}
	function St(e, t) {
		t = Xt(t, e) ? [t] : Lt(t);
		for (var n = 0, r = t.length; e != null && n < r;) e = e[rn(t[n++])];
		return n && n == r ? e : void 0;
	}
	function Ct(e) {
		return ke.call(e);
	}
	function wt(e, t) {
		return e != null && t in Object(e);
	}
	function Tt(e, t, n, r, i) {
		return e === t ? !0 : e == null || t == null || !hn(e) && !gn(t) ? e !== e && t !== t : Et(e, t, Tt, n, r, i);
	}
	function Et(e, t, n, r, i, a) {
		var s = X(e), c = X(t), d = u, f = u;
		s || (d = Kt(e), d = d == l ? v : d), c || (f = Kt(t), f = f == l ? v : f);
		var p = d == v && !V(e), m = f == v && !V(t), h = d == f;
		if (h && !p) return a ||= new Y(), s || vn(e) ? Bt(e, t, n, r, i, a) : Vt(e, t, d, n, r, i, a);
		if (!(i & o)) {
			var g = p && Oe.call(e, "__wrapped__"), _ = m && Oe.call(t, "__wrapped__");
			if (g || _) {
				var y = g ? e.value() : e, b = _ ? t.value() : t;
				return a ||= new Y(), n(y, b, r, i, a);
			}
		}
		return h ? (a ||= new Y(), Ht(e, t, n, r, i, a)) : !1;
	}
	function Dt(e, t, n, r) {
		var i = n.length, s = i, c = !r;
		if (e == null) return !s;
		for (e = Object(e); i--;) {
			var l = n[i];
			if (c && l[2] ? l[1] !== e[l[0]] : !(l[0] in e)) return !1;
		}
		for (; ++i < s;) {
			l = n[i];
			var u = l[0], d = e[u], f = l[1];
			if (c && l[2]) {
				if (d === void 0 && !(u in e)) return !1;
			} else {
				var p = new Y();
				if (r) var m = r(d, f, u, e, t, p);
				if (!(m === void 0 ? Tt(f, d, r, a | o, p) : m)) return !1;
			}
		}
		return !0;
	}
	function Ot(e) {
		return !hn(e) || Qt(e) ? !1 : (pn(e) || V(e) ? H : se).test(an(e));
	}
	function kt(e) {
		return gn(e) && mn(e.length) && !!F[ke.call(e)];
	}
	function At(e) {
		return typeof e == "function" ? e : e == null ? Cn : typeof e == "object" ? X(e) ? Pt(e[0], e[1]) : Nt(e) : wn(e);
	}
	function jt(e) {
		if (!$t(e)) return Pe(e);
		var t = [];
		for (var n in Object(e)) Oe.call(e, n) && n != "constructor" && t.push(n);
		return t;
	}
	function Mt(e, t) {
		var n = -1, r = dn(e) ? Array(e.length) : [];
		return vt(e, function(e, i, a) {
			r[++n] = t(e, i, a);
		}), r;
	}
	function Nt(e) {
		var t = Wt(e);
		return t.length == 1 && t[0][2] ? tn(t[0][0], t[0][1]) : function(n) {
			return n === e || Dt(n, e, t);
		};
	}
	function Pt(e, t) {
		return Xt(e) && en(t) ? tn(rn(e), t) : function(n) {
			var r = bn(n, e);
			return r === void 0 && r === t ? xn(n, e) : Tt(t, r, void 0, a | o);
		};
	}
	function Ft(e) {
		return function(t) {
			return St(t, e);
		};
	}
	function It(e) {
		if (typeof e == "string") return e;
		if (_n(e)) return Ge ? Ge.call(e) : "";
		var t = e + "";
		return t == "0" && 1 / e == -s ? "-0" : t;
	}
	function Lt(e) {
		return X(e) ? e : nn(e);
	}
	function Rt(e, t) {
		return function(n, r) {
			if (n == null) return n;
			if (!dn(n)) return e(n, r);
			for (var i = n.length, a = t ? i : -1, o = Object(n); (t ? a-- : ++a < i) && r(o[a], a, o) !== !1;);
			return n;
		};
	}
	function zt(e) {
		return function(t, n, r) {
			for (var i = -1, a = Object(t), o = r(t), s = o.length; s--;) {
				var c = o[e ? s : ++i];
				if (n(a[c], c, a) === !1) break;
			}
			return t;
		};
	}
	function Bt(e, t, n, r, i, s) {
		var c = i & o, l = e.length, u = t.length;
		if (l != u && !(c && u > l)) return !1;
		var d = s.get(e);
		if (d && s.get(t)) return d == t;
		var f = -1, p = !0, m = i & a ? new lt() : void 0;
		for (s.set(e, t), s.set(t, e); ++f < l;) {
			var h = e[f], g = t[f];
			if (r) var _ = c ? r(g, h, f, t, e, s) : r(h, g, f, e, t, s);
			if (_ !== void 0) {
				if (_) continue;
				p = !1;
				break;
			}
			if (m) {
				if (!me(t, function(e, t) {
					if (!m.has(t) && (h === e || n(h, e, r, i, s))) return m.add(t);
				})) {
					p = !1;
					break;
				}
			} else if (!(h === g || n(h, g, r, i, s))) {
				p = !1;
				break;
			}
		}
		return s.delete(e), s.delete(t), p;
	}
	function Vt(e, t, n, r, i, s, c) {
		switch (n) {
			case E:
				if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
				e = e.buffer, t = t.buffer;
			case T: return !(e.byteLength != t.byteLength || !r(new je(e), new je(t)));
			case d:
			case f:
			case _: return ln(+e, +t);
			case p: return e.name == t.name && e.message == t.message;
			case b:
			case S: return e == t + "";
			case g: var l = ye;
			case x:
				var u = s & o;
				if (l ||= xe, e.size != t.size && !u) return !1;
				var m = c.get(e);
				if (m) return m == t;
				s |= a, c.set(e, t);
				var h = Bt(l(e), l(t), r, i, s, c);
				return c.delete(e), h;
			case C: if (We) return We.call(e) == We.call(t);
		}
		return !1;
	}
	function Ht(e, t, n, r, i, a) {
		var s = i & o, c = Sn(e), l = c.length;
		if (l != Sn(t).length && !s) return !1;
		for (var u = l; u--;) {
			var d = c[u];
			if (!(s ? d in t : Oe.call(t, d))) return !1;
		}
		var f = a.get(e);
		if (f && a.get(t)) return f == t;
		var p = !0;
		a.set(e, t), a.set(t, e);
		for (var m = s; ++u < l;) {
			d = c[u];
			var h = e[d], g = t[d];
			if (r) var _ = s ? r(g, h, d, t, e, a) : r(h, g, d, e, t, a);
			if (!(_ === void 0 ? h === g || n(h, g, r, i, a) : _)) {
				p = !1;
				break;
			}
			m ||= d == "constructor";
		}
		if (p && !m) {
			var v = e.constructor, y = t.constructor;
			v != y && "constructor" in e && "constructor" in t && !(typeof v == "function" && v instanceof v && typeof y == "function" && y instanceof y) && (p = !1);
		}
		return a.delete(e), a.delete(t), p;
	}
	function Ut(e, t) {
		var n = e.__data__;
		return Zt(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
	}
	function Wt(e) {
		for (var t = Sn(e), n = t.length; n--;) {
			var r = t[n], i = e[r];
			t[n] = [
				r,
				i,
				en(i)
			];
		}
		return t;
	}
	function Gt(e, t) {
		var n = ve(e, t);
		return Ot(n) ? n : void 0;
	}
	var Kt = Ct;
	(Fe && Kt(new Fe(/* @__PURE__ */ new ArrayBuffer(1))) != E || W && Kt(new W()) != g || Ie && Kt(Ie.resolve()) != y || Le && Kt(new Le()) != x || G && Kt(new G()) != w) && (Kt = function(e) {
		var t = ke.call(e), n = t == v ? e.constructor : void 0, r = n ? an(n) : void 0;
		if (r) switch (r) {
			case ze: return E;
			case Be: return g;
			case Ve: return y;
			case K: return x;
			case He: return w;
		}
		return t;
	});
	function qt(e, t, n) {
		t = Xt(t, e) ? [t] : Lt(t);
		for (var r, i = -1, a = t.length; ++i < a;) {
			var o = rn(t[i]);
			if (!(r = e != null && n(e, o))) break;
			e = e[o];
		}
		if (r) return r;
		var a = e ? e.length : 0;
		return !!a && mn(a) && Yt(o, a) && (X(e) || un(e));
	}
	function Jt(e) {
		return X(e) || un(e) || !!(Ne && e && e[Ne]);
	}
	function Yt(e, t) {
		return t ??= c, !!t && (typeof e == "number" || ce.test(e)) && e > -1 && e % 1 == 0 && e < t;
	}
	function Xt(e, t) {
		if (X(e)) return !1;
		var n = typeof e;
		return n == "number" || n == "symbol" || n == "boolean" || e == null || _n(e) ? !0 : P.test(e) || !N.test(e) || t != null && e in Object(t);
	}
	function Zt(e) {
		var t = typeof e;
		return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
	}
	function Qt(e) {
		return !!Ee && Ee in e;
	}
	function $t(e) {
		var t = e && e.constructor;
		return e === (typeof t == "function" && t.prototype || we);
	}
	function en(e) {
		return e === e && !hn(e);
	}
	function tn(e, t) {
		return function(n) {
			return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
		};
	}
	var nn = cn(function(e) {
		e = yn(e);
		var t = [];
		return re.test(e) && t.push(""), e.replace(ie, function(e, n, r, i) {
			t.push(r ? i.replace(oe, "$1") : n || e);
		}), t;
	});
	function rn(e) {
		if (typeof e == "string" || _n(e)) return e;
		var t = e + "";
		return t == "0" && 1 / e == -s ? "-0" : t;
	}
	function an(e) {
		if (e != null) {
			try {
				return De.call(e);
			} catch {}
			try {
				return e + "";
			} catch {}
		}
		return "";
	}
	function on(e, t) {
		return yt(sn(e, t), 1);
	}
	function sn(e, t) {
		return (X(e) ? pe : Mt)(e, At(t, 3));
	}
	function cn(e, t) {
		if (typeof e != "function" || t && typeof t != "function") throw TypeError(r);
		var n = function() {
			var r = arguments, i = t ? t.apply(this, r) : r[0], a = n.cache;
			if (a.has(i)) return a.get(i);
			var o = e.apply(this, r);
			return n.cache = a.set(i, o), o;
		};
		return n.cache = new (cn.Cache || it)(), n;
	}
	cn.Cache = it;
	function ln(e, t) {
		return e === t || e !== e && t !== t;
	}
	function un(e) {
		return fn(e) && Oe.call(e, "callee") && (!U.call(e, "callee") || ke.call(e) == l);
	}
	var X = Array.isArray;
	function dn(e) {
		return e != null && mn(e.length) && !pn(e);
	}
	function fn(e) {
		return gn(e) && dn(e);
	}
	function pn(e) {
		var t = hn(e) ? ke.call(e) : "";
		return t == m || t == h;
	}
	function mn(e) {
		return typeof e == "number" && e > -1 && e % 1 == 0 && e <= c;
	}
	function hn(e) {
		var t = typeof e;
		return !!e && (t == "object" || t == "function");
	}
	function gn(e) {
		return !!e && typeof e == "object";
	}
	function _n(e) {
		return typeof e == "symbol" || gn(e) && ke.call(e) == C;
	}
	var vn = z ? _e(z) : kt;
	function yn(e) {
		return e == null ? "" : It(e);
	}
	function bn(e, t, n) {
		var r = e == null ? void 0 : St(e, t);
		return r === void 0 ? n : r;
	}
	function xn(e, t) {
		return e != null && qt(e, t, wt);
	}
	function Sn(e) {
		return dn(e) ? gt(e) : jt(e);
	}
	function Cn(e) {
		return e;
	}
	function wn(e) {
		return Xt(e) ? he(rn(e)) : Ft(e);
	}
	t.exports = on;
})), fs = /* @__PURE__ */ c(us(), 1), ps = /* @__PURE__ */ c(ds(), 1);
function ms(e, t, n) {
	let r = [];
	e.filterProperties.length && e.filterProperties.forEach((e) => {
		let r = {}, i = (t) => e.format === "date" ? (0, $.default)(t).valueOf() : parseFloat(t);
		t.forEach((t) => {
			if (e.type === "range") {
				let n = no(e.key, t);
				if (Array.isArray(n)) {
					let e = [i(n[0]), i(n[1])];
					r.min = r.min === void 0 ? e[0] : Math.min(r.min, e[0]), r.max = r.max === void 0 ? e[1] : Math.max(r.max, e[1]);
				} else {
					let e = i(n);
					r.min = r.min === void 0 ? e : Math.min(r.min, e), r.max = r.max === void 0 ? e : Math.max(r.max, e);
				}
				return;
			}
			Array.isArray(t[e.key]) ? t[e.key].forEach((e) => {
				r[e] = void 0;
			}) : e.type === "spatial" ? (r.geometry = e?.state?.geometry || void 0, r.geometry && (e.stringifiedState = r.geometry.type), r.mode = e.mode || "intersects") : e.key?.includes(".") ? (0, fs.default)((0, ps.default)(n.items, e.key)).filter((e) => e).forEach((e) => {
				r[e] = void 0;
			}) : r[t[e.key]] = void 0;
		});
		let a = e.key || e.keys.join("|"), o = n.filters[a], s;
		if (e.state) if (e.type === "range") {
			let t = (t) => e.format === "date" ? (0, $.default)(t).valueOf() : parseFloat(t), n = t(e.state.min), i = t(e.state.max), a = t(e.min ?? r.min), o = t(e.max ?? r.max);
			s = e.format === "date" ? !(0, $.default)(n).isSame((0, $.default)(a), "day") || !(0, $.default)(i).isSame((0, $.default)(o), "day") || void 0 : n !== a || i !== o || void 0;
		} else s = Object.values(e.state).some((e) => e) || void 0;
		if (n.filters[a] = Object.assign({
			type: e.type || "multiselect",
			dirty: s || o?.dirty,
			key: a
		}, e.type === "range" ? {
			min: r.min,
			max: r.max,
			format: e.format
		} : {}, e), e.type === "range" && n.filters[a].dirty) {
			let t = (t) => e.format === "date" ? (0, $.default)(t).valueOf() : parseFloat(t), r = t(e.state?.min === void 0 ? o?.state?.min : e.state.min), i = t(e.state?.max === void 0 ? o?.state?.max : e.state.max);
			n.filters[a].stringifiedState = e.format === "date" ? `${(0, $.default)(r).format(po)} - ${(0, $.default)(i).format(po)}` : `${r} - ${i}`;
		}
		if (n.filters[a].state = Object.assign({}, r, o?.state || {}, e.state), e.type === "range" && e.state) {
			let t = (t) => e.format === "date" ? (0, $.default)(t).valueOf() : parseFloat(t);
			e.state.min !== void 0 && (n.filters[a].state.min = t(e.state.min)), e.state.max !== void 0 && (n.filters[a].state.max = t(e.state.max));
		}
	}), e.matchAllWhenEmpty !== !1 && (n.results = n.sortResults(t), n.requestUpdate()), e.aggregateResults && (r = Array.from(new Set(t.reduce((t, n) => t.concat(n[e.aggregateResults]), []))).filter((e) => e).sort((e, t) => e.localeCompare(t)));
	let i = [];
	return Object.values(n.filters).forEach((e) => {
		e.type === "text" ? e.keys.forEach((e) => {
			i.includes(e) || i.push(e);
		}) : (e.type === "select" || e.type === "multiselect") && (i.includes(e.key) || i.push(e.key));
	}), qa(t, Object.assign({ keys: i }, e.fuseConfig)), r;
}
//#endregion
//#region src/methods/itemfilter/search.js
async function hs(e, t, n) {
	let r;
	r = n.externalFilter ? await eo(t, n.filters, e) : await Ja(t, n.filters, e), n.results = n.sortResults(r, { isExternalResult: !!n.externalFilter });
}
//#endregion
//#region src/methods/itemfilter/create-filter.js
function gs(e, t, n) {
	let r = `filter-${e.key}`.replace("|", "-");
	switch (e.type) {
		case "text": return z`<eox-itemfilter-text
        data-type="filter"
        data-cy="text-filter"
        slot="filter"
        id="${r}"
        .tabIndex=${t}
        .filterObject=${e}
        .results=${n.results}
        .unstyled=${n.unstyled}
        @result=${n.updateResult}
        @filter=${() => n.search()}
      ></eox-itemfilter-text>`;
		case "multiselect":
		case "select": return z`
        <eox-itemfilter-select
          .inlineMode=${n.inlineMode || !1}
          data-type="filter"
          id="${r}"
          .tabIndex=${t}
          .filterObject=${e}
          slot="filter"
          .suggestions="${(0, fs.default)((0, ps.default)(n.items, e.key)).filter((e) => e)}"
          type="${e.type}"
          .unstyled=${n.unstyled}
          @filter=${() => n.search()}
        ></eox-itemfilter-select>
      `;
		case "range": return z`
        <eox-itemfilter-range
          .inlineMode=${n.inlineMode || !1}
          id="${r}"
          data-type="filter"
          .tabIndex=${t}
          .filterObject=${e}
          slot="filter"
          .suggestions="${(0, fs.default)((0, ps.default)(n.items, e.key)).filter((e) => e)}"
          .unstyled=${n.unstyled}
          @filter=${() => n.search()}
        ></eox-itemfilter-range>
      `;
		case "spatial": return z`
        <eox-itemfilter-spatial
          id="${r}"
          data-type="filter"
          .tabIndex=${t}
          .filterObject=${e}
          slot="filter"
          @filter=${() => n.search()}
        ></eox-itemfilter-spatial>
      `;
		default: return z``;
	}
}
//#endregion
//#region src/methods/itemfilter/sort-results.js
function _s(e, t, n = {}) {
	let { resultSorting: r } = t;
	if (r === !1) return e;
	if (r === void 0) return n.isExternalResult || t.fuseConfig?.shouldSort ? e : [...e].sort((e, n) => {
		let r = no(t.titleProperty, e) || "", i = no(t.titleProperty, n) || "";
		return r.toString().localeCompare(i.toString());
	});
	if (typeof r == "function") return [...e].sort(r);
	let i = typeof r == "string" ? r : r.key, a = typeof r == "object" && r.order === "desc" ? -1 : 1;
	return i ? [...e].sort((e, t) => {
		let n = no(i, e) || "", r = no(i, t) || "";
		return n.toString().localeCompare(r.toString()) * a;
	}) : e;
}
//#endregion
//#region src/methods/itemfilter/create-reset.js
function vs(e, t, n) {
	return z`
    ${U(e.dirty, () => z`
        <button
          type="button"
          tabindex=${t}
          slot="reset-button"
          class="reset-icon icon square primary-text transparent small no-margin"
          @click=${(e) => {
		let t = e.target.parentElement.querySelector("[slot=filter]");
		t && typeof t.reset == "function" && t.reset(), n.search(), n.requestUpdate();
	}}
        >
          ${n.unstyled ? "Reset" : z`
                <i class="small">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>close</title>
                    <path
                      d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                    />
                  </svg>
                </i>
                <span class="tooltip left">Reset filter</span>
              `}
        </button>
      `)}
  `;
}
//#endregion
//#region src/methods/itemfilter/reset-filter.js
function ys(e) {
	e.renderRoot.querySelectorAll("[data-type='filter']").forEach((e) => {
		typeof e.reset == "function" && e.reset();
	}), e.search();
}
//#endregion
//#region src/main.js
var bs = class extends H {
	static get properties() {
		return {
			items: { type: Array },
			results: {
				state: !0,
				attribute: !1,
				type: Object
			},
			filters: {
				state: !0,
				attribute: !1,
				type: Object
			},
			selectedResult: { type: Object },
			aggregateResults: {
				attribute: "aggregate-results",
				type: String
			},
			autoSpreadSingle: {
				attribute: "auto-spread-single",
				type: Boolean
			},
			enableHighlighting: {
				attribute: "enable-highlighting",
				type: Boolean
			},
			filterProperties: { type: Array },
			fuseConfig: { type: Object },
			inlineMode: {
				attribute: "inline-mode",
				type: Boolean
			},
			matchAllWhenEmpty: {
				attribute: "match-all-when-empty",
				type: Boolean
			},
			showResults: {
				attribute: "show-result",
				type: Boolean
			},
			idProperty: {
				attribute: "id-property",
				type: String
			},
			titleProperty: {
				attribute: "title-property",
				type: String
			},
			subTitleProperty: {
				attribute: "sub-title-property",
				type: String
			},
			imageProperty: {
				attribute: "image-property",
				type: String
			},
			resultSorting: { type: Object },
			expandMultipleFilters: {
				attribute: "enable-multiple-filter",
				type: Boolean
			},
			expandResults: {
				attribute: "expand-result",
				type: Boolean
			},
			expandMultipleResults: {
				attribute: "expand-multiple-results",
				type: Boolean
			},
			externalFilter: {
				attribute: !1,
				type: Function
			},
			resultType: {
				attribute: "result-type",
				type: String
			},
			enableResultAction: { type: Boolean },
			resultActionIcon: { type: String },
			styleOverride: { type: String },
			unstyled: { type: Boolean }
		};
	}
	#e = [];
	#t = [];
	#n = uo;
	constructor() {
		super(), this.items = null, this.filters = {}, this.results = [], this.selectedResult = null, this.search = (0, so.default)(this.searchHandler, 100, { leading: !0 }), this.aggregateResults = void 0, this.autoSpreadSingle = !1, this.enableHighlighting = !1, this.externalFilter = null, this.filterProperties = [], this.fuseConfig = {}, this.inlineMode = !1, this.matchAllWhenEmpty = !0, this.showResults = !0, this.titleProperty = "title", this.subTitleProperty = void 0, this.imageProperty = void 0, this.resultSorting = void 0, this.idProperty = "id", this.expandMultipleFilters = !0, this.expandResults = !0, this.expandMultipleResults = !0, this.resultType = "list", this.enableResultAction = !1, this.resultActionIcon = "<svg style=\"width: 24px;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><title>click me!</title><path fill=\"currentColor\" d=\"M11.5,11L17.88,16.37L17,16.55L16.36,16.67C15.73,16.8 15.37,17.5 15.65,18.07L15.92,18.65L17.28,21.59L15.86,22.25L14.5,19.32L14.24,18.74C13.97,18.15 13.22,17.97 12.72,18.38L12.21,18.78L11.5,19.35V11M10.76,8.69A0.76,0.76 0 0,0 10,9.45V20.9C10,21.32 10.34,21.66 10.76,21.66C10.95,21.66 11.11,21.6 11.24,21.5L13.15,19.95L14.81,23.57C14.94,23.84 15.21,24 15.5,24C15.61,24 15.72,24 15.83,23.92L18.59,22.64C18.97,22.46 19.15,22 18.95,21.63L17.28,18L19.69,17.55C19.85,17.5 20,17.43 20.12,17.29C20.39,16.97 20.35,16.5 20,16.21L11.26,8.86L11.25,8.87C11.12,8.76 10.95,8.69 10.76,8.69M15,10V8H20V10H15M13.83,4.76L16.66,1.93L18.07,3.34L15.24,6.17L13.83,4.76M10,0H12V5H10V0M3.93,14.66L6.76,11.83L8.17,13.24L5.34,16.07L3.93,14.66M3.93,3.34L5.34,1.93L8.17,4.76L6.76,6.17L3.93,3.34M7,10H2V8H7V10\" /></svg>", this.styleOverride = "", this.unstyled = !1;
	}
	apply() {
		this.#n = fo.reduce((e, t) => (e[t] = this[t], e), {}), this.#e = ms(this.#n, this.#t, this), this.search();
	}
	async searchHandler() {
		await hs(this.#n, this.#t, this), this.dispatchEvent(new CustomEvent("filter", {
			detail: {
				results: this.results,
				filters: this.filters
			},
			bubbles: !0,
			composed: !0
		})), this.inlineMode && this.renderRoot.querySelector("eox-itemfilter-container").updateInline(), this.requestUpdate();
	}
	sortResults(e, t) {
		return _s(e, this.#n, t);
	}
	#r(e, t) {
		return gs(e, t, this);
	}
	#i(e, t) {
		return vs(e, t, this);
	}
	resetFilters() {
		ys(this);
	}
	firstUpdated(e) {
		let t = {};
		fo.map((e) => {
			t = {
				...t,
				[e]: this[e]
			};
		}), this.#n = t, this.#t = this.items?.map((e, t) => Object.assign({ id: e[this.idProperty] || `item-${t}` }, e)) || [], this.apply();
	}
	updated(e) {
		let t = !1, n = !1;
		fo.forEach((r) => {
			e.has(r) && (this.#n[r] = this[r], [
				"items",
				"filterProperties",
				"idProperty",
				"aggregateResults",
				"fuseConfig",
				"matchAllWhenEmpty",
				"externalFilter"
			].includes(r) ? t = !0 : r === "resultSorting" && (n = !0));
		}), t ? (this.#t = this.items?.map((e, t) => Object.assign({ id: e[this.idProperty] || `item-${t}` }, e)) || [], this.apply()) : n && this.search();
	}
	updateResult(e) {
		this.selectedResult = e.detail, this.dispatchEvent(new CustomEvent("select", {
			detail: this.selectedResult,
			bubbles: !0,
			composed: !0
		})), this.requestUpdate();
	}
	mouseEnterResult(e) {
		this.dispatchEvent(new CustomEvent("mouseenter:result", {
			detail: e.detail,
			bubbles: !0,
			composed: !0
		}));
	}
	mouseLeaveResult(e) {
		this.dispatchEvent(new CustomEvent("mouseleave:result", {
			detail: e.detail,
			bubbles: !0,
			composed: !0
		}));
	}
	emitResultAction(e) {
		this.dispatchEvent(new CustomEvent("click:result-action", {
			detail: e.detail,
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return z`
      <style>
        ${Me}
        ${!this.unstyled && Pe}
        ${this.styleOverride}
      </style>
      <form
        id="itemfilter"
        class=${this.inlineMode ? "inline" : B}
        @submit="${(e) => e.preventDefault()}"
      >
        ${U(this.filterProperties, () => z`
            <div
              style="display: var(--filter-display); min-height: ${this.inlineMode ? "100%" : this.filterProperties.length > 2 ? "50%" : this.filterProperties.length * 32 + 105 + "px"}"
            >
              <eox-itemfilter-container
                .filters=${this.filters}
                .filterProperties=${this.filterProperties}
                .inlineMode=${this.inlineMode || !1}
                @reset=${() => this.resetFilters()}
                @filter=${() => this.search()}
              >
                <section
                  slot="section"
                  style="height: 100%; overflow: hidden; display: flex; flex-direction: column;"
                >
                  ${U(!this.inlineMode, () => z`
                      <nav class="title-nav">
                        <div class="max">
                          <slot name="filterstitle"
                            ><p><strong>Filters</strong></p></slot
                          >
                        </div>
                        ${U(!this.inlineMode && this.#n.filterProperties && !this.inlineMode && this.#n.filterProperties && $a(this.filters), () => z`
                            <button
                              type="button"
                              id="filter-reset"
                              class="reset-icon border small"
                              data-cy="filter-reset"
                              @click=${() => this.resetFilters()}
                            >
                              ${this.unstyled ? B : z`
                                    <i class="small">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                      >
                                        <title>close</title>
                                        <path
                                          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                                        />
                                      </svg>
                                    </i>
                                  `}
                              <span class="small-text">Reset all</span>
                            </button>
                          `)}
                      </nav>
                    `)}
                  <div class="scroll" style="flex: 1; max-height: 100%">
                    <ul id="filters" class="list no-space">
                      ${je(Object.values(this.filters), (e, t) => z` <li class="no-padding">
                            <eox-itemfilter-expandcontainer
                              .filterObject=${e}
                              @details-toggled=${(e) => to(e, this.#n, this)}
                              data-details="${e.key}"
                            >
                              ${this.#i(e, Za(t, 1))}
                              ${this.#r(e, Za(t, 2))}
                            </eox-itemfilter-expandcontainer>
                          </li>`)}
                    </ul>
                  </div>
                </section>
              </eox-itemfilter-container>
            </div>
          `)}
        ${U(this.#n?.showResults && this.results, () => z`
            <div class="small-space"></div>
            <eox-itemfilter-results
              .config=${this.#n}
              .results=${this.results}
              .filters=${this.filters}
              .resultAggregation=${this.#e}
              .selectedResult=${this.selectedResult}
              .resultType=${this.resultType}
              .enableResultAction=${this.enableResultAction}
              .resultActionIcon=${this.resultActionIcon}
              @result=${this.updateResult}
              @mouseenter:result=${this.mouseEnterResult}
              @mouseleave:result=${this.mouseLeaveResult}
              @click:result-action=${this.emitResultAction}
            >
              <nav class="title-nav">
                <slot name="resultstitle"
                  ><p><strong>Results</strong></p></slot
                >
              </nav>
            </eox-itemfilter-results>
          `)}
      </form>
    `;
	}
};
customElements.define("eox-itemfilter", bs);
//#endregion
export { bs as EOxItemFilter };
