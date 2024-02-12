// Libraries
import React, {
  Children,
  useContext,
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from 'react';
import classNames from 'classnames';
import './index.scss';

// Context
import { PointerContext } from 'components/PointerContext';
import { ScaleContext } from 'components/ScaleContext';
import { SequenceContext, Sequence } from 'components/SequenceContext';
import { useAppSelector } from 'state/hooks';

export interface InteractableWithTextConfig {
  id?: string;
  asset?: string;
  offset?: { // Offset for the component
    x: number;
    y: number;
    z?: number;
  };
}

interface InteractableWithTextProps extends InteractableWithTextConfig {
  id: string;
  innerText?: {
    title: string;
    font?: string;
    textCenter?: boolean; // Write texts inside canvas
    offset?: { // Optional: Used to set offset text to canvas 
      x: number;
      y: number;
      z?: number;
    };
  };
  outerText?: {  // Appears at the bottom of image in default. (Texts outside below on the image)
    title: string;
    offset?: {
      x: number;
      y: number;
      z?: number;
    };
  };
  hintText?: {  // Appears at the bottom on hover
    title: string;
    offset?: {
      x: number;
      y: number;
      z?: number;
    };
    noWrap?: boolean;
  };
  imageSize?: { // Specify the width of the image
    width: number;
    height?: number | undefined; // If height is not defined the image height size will be used
  }; 
  interactable?: boolean;
  persist?: boolean;
  action?: Sequence;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  render: boolean;
  children?: React.ReactNode;
}

export const InteractableWithText: React.FC<InteractableWithTextProps> = ({
  id,
  asset,
  innerText,
  imageSize,
  outerText,
  hintText,
  offset,
  interactable = true,
  persist,
  action,
  onClick,
  render: _render = true,
  children,
}) => {
  const { startSequence } = useContext(SequenceContext);
  const { moveTarget, clickTarget, setClickTarget, testMode } =
    useContext(PointerContext);
  const scale = useContext(ScaleContext);
  const { phone, inventory } = useAppSelector( state => state.display.hud );
  const [hover, setHover] = useState(false);
  const [render, setRender] = useState(_render);
  const [visible, setVisible] = useState(_render);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Disable pointer events if text or choices are visible
  const disabled = useAppSelector(
    (state) => !!state.display.text || !!state.display.choices
  );
  
  // Watch for changes in _render to make the item fade in/out
  useEffect(() => {
    // If _render changed to 'true', fade in
    if (_render) {
      setVisible(false);
      setRender(true);
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 0);

      return () => clearTimeout(timeout);
    } else {
      // Else, fade out
      setVisible(false);
      const timeout = setTimeout(() => {
        setRender(false);
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [_render, setVisible, setRender]);

  //Text Wrapper
  const wrapText = ({context, text, x, y, maxWidth, lineHeight} : any) => {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  // Load the asset and draw it
  useEffect(() => {
    if (!canvas.current) return;

    if (asset) {
      // Load the asset
      const image = new Image();
      const handleLoad = () => {
        if (!canvas.current) return;

        // Set the canvas dimensions
        if(imageSize) {
          // Adjust the size of image
          if( imageSize.height) { // Check if height is set. Go to types ImageTextConfig for reference
            canvas.current.width = imageSize.width;
            canvas.current.height = imageSize.height;
            setWidth(imageSize.width);
            setHeight(imageSize.height);
          } else {
            // Use only the width defined size and use the original image height
            canvas.current.width = imageSize.width;
            canvas.current.height = image.height;
            setWidth(imageSize.width);
            setHeight(image.height);
          }

        } else {
          // Use the original image size
          const width = image.width;
          const height = image.height;
          canvas.current.width = width;
          canvas.current.height = height;
          setWidth(width);
          setHeight(height);
        }


        // Draw the asset to the canvas
        const ctx = canvas.current.getContext('2d');
        if (!ctx)
          throw new Error(`Failed to obtain context for asset: ${innerText}`);
          ctx.drawImage(image, 0, 0, canvas.current.width, canvas.current.height);

        // Draw the text to the canvas
        if(innerText?.font) {
          // Use custom font settings
          ctx.font = innerText.font;
        } else {
          // Default font
          ctx.font = 'bold 3.5rem Fresca, Arial, sans-serif';
        }

        ctx.fillStyle = '#442200';

        if(innerText?.textCenter) {
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.lineWidth = 1;
          // context, text, x, y, maxWidth, lineHeight
          // wrapText({ context: canvas.current.getContext('2d'), text: innerText.title, x: canvas.current?.width! / 2 , y: canvas.current?.height! / 2, maxWidth: canvas.current?.width, lineHeight: 10 })

          ctx.fillText(innerText?.title, canvas.current?.width! / 2 , canvas.current?.height! / 2);
        } else {
          const x = innerText?.offset?.x;
          const y = innerText?.offset?.y;
          
          ctx.fillText(innerText?.title || '', x!, y!, canvas.current.width);
        }

      };

      image.addEventListener('load', handleLoad);
      image.src = asset;

      return () => {
        image.removeEventListener('load', handleLoad);
      };
    } 
  }, [asset, canvas.current, innerText, imageSize]);

  useEffect(() => {
    const ctx = canvas.current?.getContext('2d');

    if (moveTarget === id && interactable ) {
      // Check if it needs to persist interaction
      if (!disabled || persist) {
        setHover(true);
      }

      if (!ctx) return;
    } else {
      setHover(false);
    }

  }, [moveTarget, id, interactable, disabled, persist]);

  useEffect(() => {
    if (clickTarget !== id) return;

    setClickTarget('');
  }, [clickTarget, setClickTarget, id]);

  const onClickInteractable = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Only start sequence if there's an action else it is only a static display with text
    if(action && interactable) {
      startSequence(action)
    } else {
      // Use a custom onClic function
      // Make sure that onclick is not undefined. TS issue.
      onClick && onClick(e)
    }
  }

  if (!render) return null;

  return (
    <div
      id={`interactable-btn-${id}`}
      data-testid={`interactable-btn-${id}`}
      className={classNames('interactable-btn', { hover, visible })}
      onClick={(e) => hover && onClickInteractable(e)}
      onMouseOver={() => testMode && setHover(true)}
      onMouseOut={() => testMode && setHover(false)}
      style={ offset && {
        position: 'absolute',
        top: offset.y * scale,
        left: offset.x * scale,
        zIndex: offset.z ?? 1,
      }}
    >
      <div className="inner-btn">
        <canvas
          id={id}
          ref={canvas}
          style={{
            width: width * (scale),
            height: height * (scale),
            filter:  `brightness(${hover ? 1.1 : 1})`,
          }}
        >
        </canvas>

        {/* Sub Title Text */}
        {outerText && <div
          className={classNames('outer-text')}
          style={ outerText.offset && {
            position: 'absolute',
            top: outerText.offset.y * scale,
            left: outerText.offset.x * scale
          }}
        >
          {outerText?.title}
        </div>}

        {/* Hint Text */}                             
        { hintText?.title && interactable && hover && (persist ? persist : !phone.open && !inventory.open) && <div
          style={hintText?.offset && {
            top: hintText.offset.y * scale,
            left: hintText.offset.x * scale,
            zIndex: hintText.offset.z ?? 1,
            whiteSpace: hintText.noWrap ? 'nowrap' : 'normal'
          }}
          className={classNames('hint-text')}
        >
          {hintText?.title}
        </div>}

        {children}

      </div>
      
    </div>
  );
};

export default InteractableWithText;
