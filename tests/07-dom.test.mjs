// 07 — DOM behaviour: load the pure element/popup modules against a fake chrome
//      environment and assert the produced element tree.
import "./lib/chrome-env.mjs";
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadThemeModule } from "./lib/chrome-env.mjs";

const SS = "resources/second-sidebar";
const E = await loadThemeModule(`${SS}/xul/base/elements.mjs`);
const XUL = await loadThemeModule(`${SS}/utils/xul.mjs`);
const { PopupPanel } = await loadThemeModule(`${SS}/xul/popup_panel.mjs`);

// XULElement wrappers expose the raw DOM node via getXUL().
const raw = (x) => x.getXUL();
const tags = (x) => raw(x).children.map((c) => c.localName);

test("element factories create the right tags/namespaces", () => {
  assert.equal(raw(new E.Box({})).localName, "box");
  assert.equal(raw(new E.Box({})).isXUL, true);
  assert.equal(raw(new E.VBox({})).localName, "vbox");
  assert.equal(raw(new E.HBox({})).localName, "hbox");
  assert.equal(raw(new E.Div({})).isXUL, false);
  assert.equal(raw(new E.Div({})).localName, "div");
  assert.equal(raw(new E.Span({})).isXUL, false);
  assert.equal(raw(new E.Label({})).localName, "label");
  assert.equal(raw(new E.Button({})).isXUL, false);
  assert.equal(raw(new E.Image({})).localName, "image");
  assert.equal(raw(new E.Img({})).isXUL, false);
  assert.equal(raw(new E.Menu({})).localName, "menu");
  assert.equal(raw(new E.MenuItem({})).localName, "menuitem");
  assert.equal(raw(new E.MenuSeparator({})).localName, "menuseparator");
  assert.equal(raw(new E.PanelMultiView({})).localName, "panelmultiview");
  assert.equal(raw(new E.Splitter({})).localName, "splitter");
  assert.equal(raw(new E.Toolbar({})).localName, "toolbar");
  assert.equal(raw(new E.ToolbarSeparator({})).localName, "toolbarseparator");
  assert.equal(raw(new E.Toggle({})).isXUL, false);
  assert.equal(raw(new E.Toggle({})).localName, "moz-toggle");
  assert.equal(raw(new E.MozButton({})).localName, "moz-button");
  assert.equal(raw(new E.MenuPopup({})).localName, "menupopup");
});

test("generic setters behave", () => {
  const label = new E.Label({ id: "l", classList: ["a"] });
  assert.equal(label.id, "l");
  assert.equal(label.hasClass("a"), true);
  label.setText("hi");
  assert.equal(label.getText(), "hi");
  const t = new E.Toolbar({});
  t.setMode("icons");
  assert.equal(t.getAttribute("mode"), "icons");
  const toggle = new E.Toggle({});
  toggle.setPressed(true);
  assert.equal(toggle.getPressed(), true);
  const img = new E.Image({});
  img.setSrc("x.png");
  assert.equal(raw(img).src, "x.png");
  const moz = new E.MozButton({});
  moz.setLabel("Go").setType("primary");
  assert.equal(moz.getAttribute("label"), "Go");
  assert.equal(moz.getAttribute("type"), "primary");
  const h = new E.Header(2);
  assert.equal(raw(h).localName, "h2");
  h.setText("Title");
  assert.equal(h.getText(), "Title");
});

test("MenuPopup wires panelopen listeners", () => {
  const popup = new E.MenuPopup({});
  assert.equal(popup.getAttribute("consumeoutsideclicks"), "false");
  assert.equal(popup.isPanelOpen(), false);
  raw(popup).dispatchEvent({ type: "popupshowing" });
  assert.equal(popup.isPanelOpen(), true);
  raw(popup).dispatchEvent({ type: "popuphiding" });
  assert.equal(popup.isPanelOpen(), false);
});

test("append/prepend/insert ordering is correct", () => {
  const box = new E.VBox({});
  const a = new E.Label({ id: "a" });
  const b = new E.Label({ id: "b" });
  const c = new E.Label({ id: "c" });
  box.appendChild(a).appendChild(c);
  box.insertBefore(b, c);
  assert.deepEqual(raw(box).children.map((x) => x.id), ["a", "b", "c"]);
  box.prependChild(b);
  assert.deepEqual(raw(box).children.map((x) => x.id), ["b", "a", "c"]);
  assert.equal(box.querySelector("#a").id, "a");
});

test("utils/xul composition helpers build the expected structure", () => {
  const set = XUL.createPopupSet("Heading", [new E.Label().setText("x")]);
  assert.equal(raw(set).localName, "vbox");
  assert.equal(set.hasClass("sb2-popup-set"), true);
  const setKids = raw(set).children;
  assert.equal(setKids[0].localName, "h1");
  assert.equal(setKids[0].textContent, "Heading");
  assert.equal(setKids[1].classList.contains("sb2-popup-set-body"), true);

  const row = XUL.createPopupRow(new E.Label(), new E.Label());
  assert.equal(raw(row).localName, "hbox");
  assert.equal(row.hasClass("sb2-popup-row"), true);
  assert.equal(raw(row).children.length, 2);

  const group = XUL.createPopupGroup("G", new E.Toggle());
  assert.equal(raw(group).localName, "hbox");
  assert.equal(group.hasClass("sb2-popup-group"), true);

  const cancel = XUL.createCancelButton();
  assert.equal(raw(cancel).localName, "moz-button");
  assert.equal(cancel.getAttribute("label"), "Cancel");
  assert.equal(XUL.createSaveButton().getAttribute("label"), "Save");
  assert.equal(XUL.createDeleteButton().getAttribute("type"), "destructive");
  assert.equal(XUL.createCreateButton().getAttribute("type"), "primary");
});

test("PopupPanel.compose assembles header/body/footer/trailing in order", () => {
  const panel = new PopupPanel({ id: "p", classList: ["sb2-popup-with-header"] });
  panel.compose({
    role: "group",
    title: "T",
    body: [new E.Label({ id: "body" })],
    footer: [new E.Label({ id: "foot" })],
    trailing: [new E.VBox({ id: "trail" })],
  });
  assert.equal(raw(panel).localName, "panel");
  assert.equal(panel.getAttribute("type"), "arrow");
  assert.equal(panel.getAttribute("role"), "group");
  assert.equal(panel.hasClass("sb2-popup"), true);
  assert.equal(panel.hasClass("sb2-popup-with-header"), true);

  const mv = raw(panel).children[0];
  assert.equal(mv.localName, "panelmultiview");
  assert.deepEqual(
    mv.children.map((c) => c.localName),
    ["vbox", "vbox", "hbox", "vbox"],
    "expected [header, body, footer, trailing]",
  );
  assert.equal(mv.children[0].classList.contains("sb2-popup-header"), true);
  assert.equal(mv.children[1].classList.contains("sb2-popup-body"), true);
  assert.equal(mv.children[2].classList.contains("sb2-popup-footer"), true);
  assert.equal(mv.children[3].id, "trail");
});

test("PopupPanel without title/footer/trailing omits them", () => {
  const panel = new PopupPanel({ id: "q" });
  panel.compose({ compact: true, body: [new E.Label()] });
  const mv = raw(panel).children[0];
  assert.deepEqual(mv.children.map((c) => c.localName), ["vbox"]);
  assert.equal(mv.children[0].classList.contains("sb2-popup-body"), true);
  assert.equal(mv.children[0].classList.contains("compact"), true);
});
