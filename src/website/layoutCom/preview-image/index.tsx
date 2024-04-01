import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

export interface PreviewImageRef {
  showPreview: (src: string) => void;
}

interface PreviewImageProps {
  ref?: PreviewImageRef | null;
}

export const PreviewImage = React.memo(
  forwardRef<PreviewImageRef, PreviewImageProps>(function (_, ref) {

    const [show, setShow] = useState(false);
    const [src, setSrc] = useState('');
    const [size, setSize] = useState(1);
    // 图片X轴
    const [imageX, setImageX] = useState(0);
    // 图片Y轴
    const [imageY, setImageY] = useState(0);

    // 鼠标X轴原始位置
    const clientX = useRef(0);
    // 鼠标Y轴原始位置
    const clientY = useRef(0);
    // 图片X轴Ref
    const imageXRef = useRef(0);
    // 图片Y轴Ref
    const imageYRef = useRef(0);

    // 拖动结束
    const onMouseUp = useCallback((e) => {
      // 接触绑定
      document.onmousemove = null;
      document.onmouseup = null;

      // 当前鼠标位置
      const _clientX = e.clientX;
      const _clientY = e.clientY;
      // 获得当前位置（使用Ref是为了防止state更新频繁导致没获取到真实位置）
      const currentX = imageXRef.current + _clientX - clientX.current;
      const currentY = imageYRef.current + _clientY - clientY.current
      setImageX(currentX);
      setImageY(currentY);
      imageXRef.current = currentX;
      imageYRef.current = currentY;
    }, []);

    // 拖动进行事件
    const onMouseMove = useCallback((e) => {
      // 当前鼠标位置
      const _clientX = e.clientX;
      const _clientY = e.clientY;
      // 获得当前位置（使用Ref是为了防止state更新频繁导致没获取到真实位置）
      const currentX = imageXRef.current + _clientX - clientX.current;
      const currentY = imageYRef.current + _clientY - clientY.current
      setImageX(currentX);
      setImageY(currentY);
      imageXRef.current = currentX;
      imageYRef.current = currentY;
      // 记录新的鼠标位置
      clientX.current = _clientX;
      clientY.current = _clientY;
    }, []);

    // 开始拖动事件
    const onMouseDown = useCallback((e) => {
      // 绑定拖动移动事件
      document.onmousemove = onMouseMove;
      document.onmouseup = onMouseUp;

      // 记录鼠标位置
      clientX.current = e.clientX;
      clientY.current = e.clientY;
    }, [onMouseUp, onMouseMove]);

    // 预览图片事件
    const showPreview = useCallback((_src: string) => {
      // 重置拖拽位置
      imageX !== 0 && setImageX(0);
      imageY !== 0 && setImageY(0);
      imageXRef.current = 0;
      imageYRef.current = 0;
      size !== 1 && setSize(1);
      _src !== src && setSrc(_src);
      !show && setShow(true);
    }, [imageX, imageY, size, src, show]);

    // 关闭预览
    const closePreview = useCallback(() => {
      show && setShow(false);
    }, [show]);

    // 绑定滚轮事件
    useEffect(() => {
      (window as any).onmousewheel = (e) => {
        setSize(e.wheelDelta > 0 ? Math.min(size + 0.1, 3) : Math.max(size - 0.1, 0.2));
      }
    }, [size]);

    // 暴露函数给ref
    useImperativeHandle(ref, () => ({ showPreview }));

    const Jsx = useMemo(() => {
      return ReactDOM.createPortal(
        <div
          className={`preview ${show && 'active'}`}
          onClick={closePreview}
        >
          <img
            id='preview-image'
            style={{ transform: `scale(${size})`, left: `${imageX}PX`, top: `${imageY}PX` }}
            src={src}
            // 如果不禁止拖拽，就会导致问题
            draggable={false}
            onMouseDown={onMouseDown}
            onClick={e => e.stopPropagation()}
          />
        </div>,
        document.getElementById('app')
      )
    }, [closePreview, imageX, imageY, onMouseDown, show, size, src])

    return Jsx;
  })
)
