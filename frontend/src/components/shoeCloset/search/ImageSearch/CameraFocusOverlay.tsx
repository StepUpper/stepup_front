import { useEffect, useRef } from "react";

const CameraFocusOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const lineLength = 44; // 직선 부분의 길이
    const radius = 28; // 둥근 모서리의 반지름
    const length = lineLength + radius; // 직선 부분의 길이
    const lineWidth = 5; // 선 두께
    const lineColor = "white"; // 선 색상
    const padding = 10;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    // 상단 왼쪽
    ctx.beginPath();
    ctx.moveTo(padding, length + padding);
    ctx.lineTo(padding, lineLength); // 세로 직선
    ctx.quadraticCurveTo(padding, padding, radius + padding, padding); // 모서리
    ctx.lineTo(length + padding, padding); // 가로 직선
    ctx.stroke();

    // 상단 오른쪽
    ctx.beginPath();
    ctx.moveTo(width - length - padding, padding);
    ctx.lineTo(width - radius - padding, padding); // 가로 직선
    ctx.quadraticCurveTo(
      width - padding,
      padding,
      width - padding,
      radius + padding
    );
    ctx.lineTo(width - padding, length + padding); // 세로 직선
    ctx.stroke();

    // 하단 왼쪽
    ctx.beginPath();
    ctx.moveTo(padding, height - length - padding); // 세로 직선 시작점
    ctx.lineTo(padding, height - radius - padding); // 세로 직선
    ctx.quadraticCurveTo(
      padding,
      height - padding,
      radius + padding,
      height - padding
    ); // 둥근 모서리
    ctx.lineTo(length + padding, height - padding); // 가로 직선
    ctx.stroke();

    // 하단 오른쪽
    ctx.beginPath();
    ctx.moveTo(width - length - padding, height - padding); // 가로 직선 시작점
    ctx.lineTo(width - radius - padding, height - padding); // 가로 직선
    ctx.quadraticCurveTo(
      width - padding,
      height - padding,
      width - padding,
      height - radius - padding
    ); // 둥근 모서리
    ctx.lineTo(width - padding, height - length - padding); // 세로 직선
    ctx.stroke();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300} // 캔버스 너비
      height={300} // 캔버스 높이
      className="z-1 absolute -mt-[20%]"
    />
  );
};

export default CameraFocusOverlay;
