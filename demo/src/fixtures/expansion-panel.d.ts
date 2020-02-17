import { LitElement, PropertyValues } from 'lit-element';
/**
 * A custom element similar to the HTML5 `<details>` element.
 *
 * @element expansion-panel
 *
 * @slot - Slot fot panel content
 * @slot header - Slot for panel header
 *
 * @attr {boolean} focused - State attribute set when element has focus.
 * @attr {boolean} focus-ring - State attribute set when focused from keyboard.
 *
 * @cssprop --panel-header-background - Default panel header background color.
 * @cssprop --panel-header-min-height - Panel header minimum height.
 * @cssprop --panel-ripple-background - Active toggle button ripple background.
 *
 * @csspart header - An element wrapping the `header` slot.
 * @csspart toggle - A toggle button, child of the header part.
 * @csspart content - An element wrapping the `content` slot.
 *
 * @fires opened-changed - Event fired when expanding / collapsing
 */
export declare class ExpansionPanel extends LitElement {
    /**
     * When true, the panel content is expanded and visible
     */
    opened?: boolean | null;
    /**
     * Disabled panel can not be expanded or collapsed
     */
    disabled: boolean;
    protected header?: HTMLDivElement;
    protected _isShiftTabbing: boolean;
    protected _tabPressed: boolean;
    private _boundBodyKeydown;
    private _boundBodyKeyup;
    static readonly styles: any;
    render(): any;
    connectedCallback(): void;
    disconnectedCallback(): void;
    focus(): void;
    protected firstUpdated(): void;
    protected updated(props: PropertyValues): void;
    private _setFocused;
    private _onToggleClick;
    private _onToggleKeyDown;
    private _onBodyKeydown;
    private _onBodyKeyup;
}
declare global {
    interface HTMLElementTagNameMap {
        'expansion-panel': ExpansionPanel;
    }
}
//# sourceMappingURL=expansion-panel.d.ts.map