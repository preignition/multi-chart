import { LitElement, PropertyValues } from 'lit-element';
/**
 * A custom element similar to the HTML5 `<progress>` element.
 *
 * @element progress-bar
 *
 * @cssprop --progress-bar-fill-color - Color of the filled progress bar part.
 * @cssprop --progress-bar-opacity - Opacity set on the underlying track.
 *
 * @csspart bar - A progress bar background.
 * @csspart value - A progress bar foreground.
 */
export declare class ProgressBar extends LitElement {
    /**
     * Current progress value.
     */
    value: number;
    /**
     * Minimum bound of the progress bar.
     */
    min: number;
    /**
     * Maximum bound of the progress bar.
     */
    max: number;
    /**
     * Indeterminate state of the progress bar.
     * This property takes precedence over other state properties (min, max, value).
     */
    indeterminate: boolean;
    static readonly styles: any;
    protected render(): any;
    protected firstUpdated(): void;
    protected updated(props: PropertyValues): void;
    private _normalizedValueChanged;
    private _valueChanged;
    private _minChanged;
    private _maxChanged;
}
//# sourceMappingURL=progress-bar.d.ts.map