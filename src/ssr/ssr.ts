// import {
//   ComponentElement,
//   HtmlElement,
//   ListElement,
//   LwElement,
//   LwNode,
//   ProviderElement,
//   ReactiveElement,
//   ShowElement,
//   TextElement,
//   computed,
//   createElements,
//   currentCmp,
//   isEventProp,
//   isSignal,
// } from "../core";
// import { serializeCss } from "../css";

// const createStringFromEls = (elements: LwElement[]): string => {
//   // @ts-ignore
//   return elements.map((el) => map[el.type](el)).join("");
// };

// const htmlElToString = (el: HtmlElement) => {
//   let s = `<${el.tag}`;

//   const props: string[] = [];
//   const keys = Object.keys(el.props);

//   for (const key of keys) {
//     const value = el.props[key];
//     if (isEventProp(key)) continue;

//     const keyAlias = ATTRIBUTE_ALIASES[key];

//     let v = value;

//     if (isSignal(v)) {
//       v = v.value;
//     }

//     if (key === "style") {
//       v = serializeCss(v);
//     }

//     props.push(`${keyAlias ?? key}="${v}"`);
//   }

//   if (props.length > 0) {
//     s += ` ${props.join(" ")}`;
//   }

//   if (el.children.length > 0) {
//     const childrenString = createStringFromEls(el.children);
//     s += `>${childrenString}</${el.tag}>`;
//   }
//   //
//   else {
//     s += "/>";
//   }

//   return s;
// };

// const ATTRIBUTE_ALIASES: Record<string, string> = {
//   className: "class",
//   htmlFor: "for",
// };

// const showElToString = (el: ShowElement) => {
//   const cond = el.rct.value;
//   el.children = cond ? el.yes : el.no;

//   return createStringFromEls(el.children);
// };

// const listElToString = <Item>(el: ListElement<Item>) => {
//   let len = el.rct.value.length;
//   for (let i = 0; i < len; i++) {
//     const item = el.rct.value[i];
//     const compIndex = computed(() => i);
//     const els = createElements(el.renderItem(item, compIndex));
//     el.children.push(...els);
//   }
//   return createStringFromEls(el.children);
// };

// const providerElToString = <T>(el: ProviderElement<T>) => {
//   return createStringFromEls(el.children);
// };

// const cmpElToString = <P>(el: ComponentElement<P>) => {
//   currentCmp.set(el);
//   el.children = createElements(el.render(el.props));
//   currentCmp.set(undefined);
//   return createStringFromEls(el.children);
// };

// const map = {
//   txt: (el: TextElement) => el.text,
//   rct: (el: ReactiveElement) => el.rct.value,
//   html: htmlElToString,
//   show: showElToString,
//   list: listElToString,
//   provider: providerElToString,
//   cmp: cmpElToString,
// } as const;

// export const ssr = (node: LwNode) => {
//   const els = createElements(node);

//   return createStringFromEls(els);
// };
export {};
