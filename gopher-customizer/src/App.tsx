import { useMemo, useRef, useState } from 'react';
import './App.css';
import { GopherSvg } from './components/GopherSvg';
import { AccessoryRow } from './components/AccessoryRow';
import { GLASSES, HEADWEAR, NECKWEAR } from './data/accessories';
import { DEFAULT_COLOR, PRESET_COLORS } from './data/colors';
import { renderWithPlacement } from './utils/accessoryPlacement';
import { hexToHsv, hsvToHex, type Hsv } from './utils/color';

function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const [hsv, setHsv] = useState<Hsv>(hexToHsv(DEFAULT_COLOR));
  const bodyColor = useMemo(() => hsvToHex(hsv), [hsv]);
  const [glasses, setGlasses] = useState<string | null>(null);
  const [headwear, setHeadwear] = useState<string | null>(null);
  const [neckwear, setNeckwear] = useState<string | null>(null);

  const pickWheelColor = (clientX: number, clientY: number) => {
    const wheel = wheelRef.current;
    if (!wheel) return;
    const rect = wheel.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const maxR = rect.width / 2;
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxR);
    const s = distance / maxR;
    const rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const h = (rawAngle + 450) % 360; 
    setHsv((prev) => ({ ...prev, h, s }));
  };

  const selectedGlassesItem = glasses ? GLASSES.find((item) => item.id === glasses) : undefined;
  const selectedHeadwearItem = headwear ? HEADWEAR.find((item) => item.id === headwear) : undefined;
  const selectedNeckwearItem = neckwear ? NECKWEAR.find((item) => item.id === neckwear) : undefined;

  const selectedGlasses = renderWithPlacement(selectedGlassesItem);
  const selectedHeadwear = renderWithPlacement(selectedHeadwearItem);
  const selectedNeckwear = renderWithPlacement(selectedNeckwearItem);

  const handleDownload = () => {
    if (!svgRef.current) return;

    const exportViewBox = { x: -2.5, y: -4.5, w: 37, h: 40 };
    const outputWidth = 1800;
    const outputHeight = Math.round((outputWidth * exportViewBox.h) / exportViewBox.w);

    const canvas = document.createElement('canvas');
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgForExport = svgRef.current.cloneNode(true) as SVGSVGElement;
    svgForExport.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgForExport.setAttribute(
      'viewBox',
      `${exportViewBox.x} ${exportViewBox.y} ${exportViewBox.w} ${exportViewBox.h}`,
    );
    svgForExport.setAttribute('width', String(outputWidth));
    svgForExport.setAttribute('height', String(outputHeight));
    const svgData = new XMLSerializer().serializeToString(svgForExport);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      ctx.clearRect(0, 0, outputWidth, outputHeight);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, outputWidth, outputHeight);
      ctx.drawImage(img, 0, 0, outputWidth, outputHeight);
      URL.revokeObjectURL(url);

      const link = document.createElement('a');
      link.download = 'gopher-avatar.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = url;
  };

  return (
    <div className="page">
      <div className="app-layout">
        <main className="workspace">
          <section className="preview-card">
            <GopherSvg
              svgRef={svgRef}
              bodyColor={bodyColor}
              headwear={selectedHeadwear}
              glasses={selectedGlasses}
              neckwear={selectedNeckwear}
            />
          </section>

          <aside className="controls-card">
            <div className="controls-header">CUSTOMIZE YOUR GOPHER</div>

            <section className="option-block">
              <h3>BODY COLOR</h3>
              <div
                ref={wheelRef}
                className="color-wheel"
                onMouseDown={(e) => {
                  pickWheelColor(e.clientX, e.clientY);
                  const onMove = (ev: MouseEvent) => pickWheelColor(ev.clientX, ev.clientY);
                  const onUp = () => {
                    window.removeEventListener('mousemove', onMove);
                    window.removeEventListener('mouseup', onUp);
                  };
                  window.addEventListener('mousemove', onMove);
                  window.addEventListener('mouseup', onUp);
                }}
              >
                <div
                  className="wheel-thumb"
                  style={{
                    left: `${50 + Math.cos(((hsv.h - 90) * Math.PI) / 180) * hsv.s * 50}%`,
                    top: `${50 + Math.sin(((hsv.h - 90) * Math.PI) / 180) * hsv.s * 50}%`,
                  }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(hsv.v * 100)}
                onChange={(e) => setHsv((prev) => ({ ...prev, v: Number(e.target.value) / 100 }))}
                className="brightness-range"
              />
              <div className="swatches">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`swatch ${bodyColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setHsv(hexToHsv(color))}
                    aria-label={`Set body color ${color}`}
                  />
                ))}
              </div>
            </section>

            <section className="option-block">
              <h3>ACCESSORIES</h3>
              <AccessoryRow title="GLASSES" items={GLASSES} selectedId={glasses} onSelect={setGlasses} />
              <AccessoryRow title="HEADWEAR" items={HEADWEAR} selectedId={headwear} onSelect={setHeadwear} />
              <AccessoryRow title="NECKWEAR" items={NECKWEAR} selectedId={neckwear} onSelect={setNeckwear} />
            </section>

            <button type="button" className="download-btn" onClick={handleDownload}>
              Download Avatar
            </button>
          </aside>
        </main>
      </div>
    </div>
  );
}

export default App;