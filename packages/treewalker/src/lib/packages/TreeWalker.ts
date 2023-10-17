/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export interface TreeWalkerWithShadowDom extends TreeWalker {
  __isShadowRoot__?: boolean;
}

export class ShadowDOMTreeWalker implements TreeWalker {
  public readonly filter: NodeFilter | null = null;
  public readonly root: Node;
  public readonly whatToShow: number;

  private _document: Document;
  private _walkers: TreeWalkerWithShadowDom[] = [];
  private _currentWalker: TreeWalkerWithShadowDom;

  constructor(
    root: Node,
    whatToShow?: number,
    filter?: NodeFilter | null,
    doc?: Document
  ) {
    this._document = doc ?? document;
    this.root = root;
    this.filter = filter ?? null;
    this.whatToShow = whatToShow ?? NodeFilter.SHOW_ALL;

    this._currentWalker = this._pushWalker(root);
  }

  public get currentNode(): Node {
    return this._currentWalker.currentNode;
  }

  public firstChild(): Node | null {
    this._maybeHandleShadowRoot();

    return this._currentWalker.firstChild();
  }

  public lastChild(): Node | null {
    this._maybeHandleShadowRoot();

    return this._currentWalker.lastChild();
  }

  public nextNode(): Node | null {
    this._maybeHandleShadowRoot();

    const next = this._currentWalker.nextNode();
    if (next === null && this._walkerIsInShadowRoot()) {
      this._popWalker();
      return this._currentWalker.nextNode();
    }

    return next;
  }

  public nextSibling(): Node | null {
    const sib = this._currentWalker.nextSibling();
    return sib;
  }

  public parentNode(): Node | null {
    const parent = this._currentWalker.parentNode();
    if (!parent && this._walkerIsInShadowRoot()) {
      this._popWalker();
      return this.currentNode;
    }

    return parent;
  }

  public previousNode(): Node | null {
    if (this._hasShadowRoot(this.currentNode)) {
      this._popWalker();
    }

    return this._currentWalker.previousNode();
  }

  public previousSibling(): Node | null {
    return this._currentWalker.previousSibling();
  }

  private _maybeHandleShadowRoot(): boolean {
    if (this._hasShadowRoot(this.currentNode)) {
      const shadowRoot = (this.currentNode as HTMLElement).shadowRoot;
      if (shadowRoot?.firstChild) {
        this._pushWalker(shadowRoot, true);
        return true;
      }
    }

    return false;
  }

  private _pushWalker(
    root: Node,
    isShadow = false
  ): TreeWalkerWithShadowDom {
    const walker: TreeWalkerWithShadowDom = this._document.createTreeWalker(
      root,
      this.whatToShow,
      this.filter
    );

    walker.__isShadowRoot__ = isShadow;
    this._walkers.push(walker);
    this._currentWalker = walker;

    return this._currentWalker;
  }

  private _popWalker(): TreeWalkerWithShadowDom {
    this._walkers.pop();
    this._currentWalker = this._walkers[this._walkers.length - 1];

    return this._currentWalker;
  }

  private _hasShadowRoot(node: Node): boolean {
    return (node as HTMLElement).shadowRoot !== null;
  }

  private _walkerIsInShadowRoot(): boolean {
    return this._currentWalker.__isShadowRoot__ === true;
  }
}
