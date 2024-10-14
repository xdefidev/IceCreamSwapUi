/// <reference types="react" />
/// <reference types="react" />
import { UserMenuItemProps } from "./types";
export declare const UserMenuDivider: import("styled-components").IStyledComponent<"web", {
    ref?: import("react").LegacyRef<HTMLHRElement> | undefined;
    key?: import("react").Key | null | undefined;
    defaultChecked?: boolean | undefined;
    defaultValue?: string | number | readonly string[] | undefined;
    suppressContentEditableWarning?: boolean | undefined;
    suppressHydrationWarning?: boolean | undefined;
    accessKey?: string | undefined;
    autoFocus?: boolean | undefined;
    className?: string | undefined;
    contentEditable?: "inherit" | (boolean | "false" | "true") | undefined;
    contextMenu?: string | undefined;
    dir?: string | undefined;
    draggable?: (boolean | "false" | "true") | undefined;
    hidden?: boolean | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    nonce?: string | undefined;
    placeholder?: string | undefined;
    slot?: string | undefined;
    spellCheck?: (boolean | "false" | "true") | undefined;
    style?: import("react").CSSProperties | undefined;
    tabIndex?: number | undefined;
    title?: string | undefined;
    translate?: "yes" | "no" | undefined;
    radioGroup?: string | undefined;
    role?: import("react").AriaRole | undefined;
    about?: string | undefined;
    content?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    rel?: string | undefined;
    resource?: string | undefined;
    rev?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;
    autoCapitalize?: string | undefined;
    autoCorrect?: string | undefined;
    autoSave?: string | undefined;
    color?: string | undefined;
    itemProp?: string | undefined;
    itemScope?: boolean | undefined;
    itemType?: string | undefined;
    itemID?: string | undefined;
    itemRef?: string | undefined;
    results?: number | undefined;
    security?: string | undefined;
    unselectable?: "on" | "off" | undefined;
    inputMode?: "text" | "none" | "search" | "tel" | "url" | "email" | "numeric" | "decimal" | undefined;
    is?: string | undefined;
    tw?: string | undefined;
    'aria-activedescendant'?: string | undefined;
    'aria-atomic'?: (boolean | "false" | "true") | undefined;
    'aria-autocomplete'?: "none" | "both" | "inline" | "list" | undefined;
    'aria-braillelabel'?: string | undefined;
    'aria-brailleroledescription'?: string | undefined;
    'aria-busy'?: (boolean | "false" | "true") | undefined;
    'aria-checked'?: boolean | "mixed" | "false" | "true" | undefined;
    'aria-colcount'?: number | undefined;
    'aria-colindex'?: number | undefined;
    'aria-colindextext'?: string | undefined;
    'aria-colspan'?: number | undefined;
    'aria-controls'?: string | undefined;
    'aria-current'?: boolean | "page" | "false" | "true" | "time" | "step" | "location" | "date" | undefined;
    'aria-describedby'?: string | undefined;
    'aria-description'?: string | undefined;
    'aria-details'?: string | undefined;
    'aria-disabled'?: (boolean | "false" | "true") | undefined;
    'aria-dropeffect'?: "none" | "copy" | "move" | "link" | "execute" | "popup" | undefined;
    'aria-errormessage'?: string | undefined;
    'aria-expanded'?: (boolean | "false" | "true") | undefined;
    'aria-flowto'?: string | undefined;
    'aria-grabbed'?: (boolean | "false" | "true") | undefined;
    'aria-haspopup'?: boolean | "grid" | "listbox" | "menu" | "false" | "true" | "dialog" | "tree" | undefined;
    'aria-hidden'?: (boolean | "false" | "true") | undefined;
    'aria-invalid'?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
    'aria-keyshortcuts'?: string | undefined;
    'aria-label'?: string | undefined;
    'aria-labelledby'?: string | undefined;
    'aria-level'?: number | undefined;
    'aria-live'?: "off" | "assertive" | "polite" | undefined;
    'aria-modal'?: (boolean | "false" | "true") | undefined;
    'aria-multiline'?: (boolean | "false" | "true") | undefined;
    'aria-multiselectable'?: (boolean | "false" | "true") | undefined;
    'aria-orientation'?: "horizontal" | "vertical" | undefined;
    'aria-owns'?: string | undefined;
    'aria-placeholder'?: string | undefined;
    'aria-posinset'?: number | undefined;
    'aria-pressed'?: boolean | "mixed" | "false" | "true" | undefined;
    'aria-readonly'?: (boolean | "false" | "true") | undefined;
    'aria-relevant'?: "text" | "all" | "additions" | "additions removals" | "additions text" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals" | undefined;
    'aria-required'?: (boolean | "false" | "true") | undefined;
    'aria-roledescription'?: string | undefined;
    'aria-rowcount'?: number | undefined;
    'aria-rowindex'?: number | undefined;
    'aria-rowindextext'?: string | undefined;
    'aria-rowspan'?: number | undefined;
    'aria-selected'?: (boolean | "false" | "true") | undefined;
    'aria-setsize'?: number | undefined;
    'aria-sort'?: "none" | "ascending" | "descending" | "other" | undefined;
    'aria-valuemax'?: number | undefined;
    'aria-valuemin'?: number | undefined;
    'aria-valuenow'?: number | undefined;
    'aria-valuetext'?: string | undefined;
    children?: import("react").ReactNode;
    dangerouslySetInnerHTML?: {
        __html: string | TrustedHTML;
    } | undefined;
    onCopy?: import("react").ClipboardEventHandler<HTMLHRElement> | undefined;
    onCopyCapture?: import("react").ClipboardEventHandler<HTMLHRElement> | undefined;
    onCut?: import("react").ClipboardEventHandler<HTMLHRElement> | undefined;
    onCutCapture?: import("react").ClipboardEventHandler<HTMLHRElement> | undefined;
    onPaste?: import("react").ClipboardEventHandler<HTMLHRElement> | undefined;
    onPasteCapture?: import("react").ClipboardEventHandler<HTMLHRElement> | undefined;
    onCompositionEnd?: import("react").CompositionEventHandler<HTMLHRElement> | undefined;
    onCompositionEndCapture?: import("react").CompositionEventHandler<HTMLHRElement> | undefined;
    onCompositionStart?: import("react").CompositionEventHandler<HTMLHRElement> | undefined;
    onCompositionStartCapture?: import("react").CompositionEventHandler<HTMLHRElement> | undefined;
    onCompositionUpdate?: import("react").CompositionEventHandler<HTMLHRElement> | undefined;
    onCompositionUpdateCapture?: import("react").CompositionEventHandler<HTMLHRElement> | undefined;
    onFocus?: import("react").FocusEventHandler<HTMLHRElement> | undefined;
    onFocusCapture?: import("react").FocusEventHandler<HTMLHRElement> | undefined;
    onBlur?: import("react").FocusEventHandler<HTMLHRElement> | undefined;
    onBlurCapture?: import("react").FocusEventHandler<HTMLHRElement> | undefined;
    onChange?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onChangeCapture?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onBeforeInput?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onBeforeInputCapture?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onInput?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onInputCapture?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onReset?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onResetCapture?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onSubmit?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onSubmitCapture?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onInvalid?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onInvalidCapture?: import("react").FormEventHandler<HTMLHRElement> | undefined;
    onLoad?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onLoadCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onError?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onErrorCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onKeyDown?: import("react").KeyboardEventHandler<HTMLHRElement> | undefined;
    onKeyDownCapture?: import("react").KeyboardEventHandler<HTMLHRElement> | undefined;
    onKeyPress?: import("react").KeyboardEventHandler<HTMLHRElement> | undefined;
    onKeyPressCapture?: import("react").KeyboardEventHandler<HTMLHRElement> | undefined;
    onKeyUp?: import("react").KeyboardEventHandler<HTMLHRElement> | undefined;
    onKeyUpCapture?: import("react").KeyboardEventHandler<HTMLHRElement> | undefined;
    onAbort?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onAbortCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onCanPlay?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onCanPlayCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onCanPlayThrough?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onCanPlayThroughCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onDurationChange?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onDurationChangeCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onEmptied?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onEmptiedCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onEncrypted?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onEncryptedCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onEnded?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onEndedCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onLoadedData?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onLoadedDataCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onLoadedMetadata?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onLoadedMetadataCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onLoadStart?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onLoadStartCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onPause?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onPauseCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onPlay?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onPlayCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onPlaying?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onPlayingCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onProgress?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onProgressCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onRateChange?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onRateChangeCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onResize?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onResizeCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onSeeked?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onSeekedCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onSeeking?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onSeekingCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onStalled?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onStalledCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onSuspend?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onSuspendCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onTimeUpdate?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onTimeUpdateCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onVolumeChange?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onVolumeChangeCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onWaiting?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onWaitingCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onAuxClick?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onAuxClickCapture?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onClick?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onClickCapture?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onContextMenu?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onContextMenuCapture?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onDoubleClick?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onDoubleClickCapture?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onDrag?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragCapture?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragEnd?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragEndCapture?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragEnter?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragEnterCapture?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragExit?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragExitCapture?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragLeave?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragLeaveCapture?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragOver?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragOverCapture?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragStart?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDragStartCapture?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDrop?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onDropCapture?: import("react").DragEventHandler<HTMLHRElement> | undefined;
    onMouseDown?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseDownCapture?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseEnter?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseLeave?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseMove?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseMoveCapture?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseOut?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseOutCapture?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseOver?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseOverCapture?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseUp?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onMouseUpCapture?: import("react").MouseEventHandler<HTMLHRElement> | undefined;
    onSelect?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onSelectCapture?: import("react").ReactEventHandler<HTMLHRElement> | undefined;
    onTouchCancel?: import("react").TouchEventHandler<HTMLHRElement> | undefined;
    onTouchCancelCapture?: import("react").TouchEventHandler<HTMLHRElement> | undefined;
    onTouchEnd?: import("react").TouchEventHandler<HTMLHRElement> | undefined;
    onTouchEndCapture?: import("react").TouchEventHandler<HTMLHRElement> | undefined;
    onTouchMove?: import("react").TouchEventHandler<HTMLHRElement> | undefined;
    onTouchMoveCapture?: import("react").TouchEventHandler<HTMLHRElement> | undefined;
    onTouchStart?: import("react").TouchEventHandler<HTMLHRElement> | undefined;
    onTouchStartCapture?: import("react").TouchEventHandler<HTMLHRElement> | undefined;
    onPointerDown?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerDownCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerMove?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerMoveCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerUp?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerUpCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerCancel?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerCancelCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerEnter?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerEnterCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerLeave?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerLeaveCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerOver?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerOverCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerOut?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onPointerOutCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onGotPointerCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onGotPointerCaptureCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onLostPointerCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onLostPointerCaptureCapture?: import("react").PointerEventHandler<HTMLHRElement> | undefined;
    onScroll?: import("react").UIEventHandler<HTMLHRElement> | undefined;
    onScrollCapture?: import("react").UIEventHandler<HTMLHRElement> | undefined;
    onWheel?: import("react").WheelEventHandler<HTMLHRElement> | undefined;
    onWheelCapture?: import("react").WheelEventHandler<HTMLHRElement> | undefined;
    onAnimationStart?: import("react").AnimationEventHandler<HTMLHRElement> | undefined;
    onAnimationStartCapture?: import("react").AnimationEventHandler<HTMLHRElement> | undefined;
    onAnimationEnd?: import("react").AnimationEventHandler<HTMLHRElement> | undefined;
    onAnimationEndCapture?: import("react").AnimationEventHandler<HTMLHRElement> | undefined;
    onAnimationIteration?: import("react").AnimationEventHandler<HTMLHRElement> | undefined;
    onAnimationIterationCapture?: import("react").AnimationEventHandler<HTMLHRElement> | undefined;
    onTransitionEnd?: import("react").TransitionEventHandler<HTMLHRElement> | undefined;
    onTransitionEndCapture?: import("react").TransitionEventHandler<HTMLHRElement> | undefined;
}>;
export declare const UserMenuItem: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, UserMenuItemProps>>;
