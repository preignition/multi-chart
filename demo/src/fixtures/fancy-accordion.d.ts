import { LitElement, PropertyValues } from 'lit-element';
import { ExpansionPanel } from './expansion-panel.js';
/**
 * A custom element implementing the accordion widget: a vertically stacked set of expandable panels
 * that wraps several instances of the `<expansion-panel>` element. Only one panel can be opened
 * (expanded) at a time.
 *
 * Panel headings function as controls that enable users to open (expand) or hide (collapse) their
 * associated sections of content. The user can toggle panels by mouse click, Enter and Space keys.
 *
 * The component supports keyboard navigation and is aligned with the
 * [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion).
 *
 * @element fancy-accordion
 *
 * @slot - Slot fot panel elements.
 *
 * @fires opened-index-changed - Event fired when changing currently opened panel.
 */
export declare class FancyAccordion extends LitElement {
    /**
     * Index of the currently opened panel. By default all the panels are closed.
     * Only one panel can be opened at the same time. Setting `null` or `undefined`
     * closes all the accordion panels.
     */
    openedIndex: number | null | undefined;
    protected _items: ExpansionPanel[];
    private _boundOnOpened;
    static readonly styles: any;
    protected render(): any;
    protected firstUpdated(): void;
    protected update(props: PropertyValues): void;
    readonly focused: Element | null;
    private _onKeydown;
    private _getAvailableIndex;
    private _onOpened;
    private _notifyOpen;
}
declare global {
    interface HTMLElementTagNameMap {
        'fancy-accordion': FancyAccordion;
    }
}
//# sourceMappingURL=fancy-accordion.d.ts.map