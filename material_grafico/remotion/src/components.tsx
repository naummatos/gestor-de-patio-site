import React, {ReactNode} from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const colors = {
  bg: '#080d12',
  panel: '#111922',
  panel2: '#18232e',
  green: '#84ff5a',
  greenDark: '#22c55e',
  white: '#f8fafc',
  muted: '#a4afbd',
  whatsapp: '#0b6b3c',
};

export const fade = (frame: number, from: number, duration = 12) =>
  interpolate(frame, [from, from + duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const rise = (frame: number, from: number) => {
  const {fps} = useVideoConfig();
  return spring({frame: frame - from, fps, config: {damping: 18, stiffness: 130, mass: 0.75}});
};

export const StoryShell: React.FC<{children: ReactNode; label: string; duration: number}> = ({children, label, duration}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, duration - 1], [0, 100], {extrapolateRight: 'clamp'});

  return (
    <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'hidden', color: colors.white, fontFamily: 'Inter, Arial, sans-serif', background: `radial-gradient(circle at 52% 15%, rgba(132,255,90,.14), transparent 520px), ${colors.bg}`}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.13, backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)', backgroundSize: '52px 52px'}} />
      <div style={{position: 'absolute', top: 34, left: 44, right: 44, zIndex: 20}}>
        <div style={{height: 6, borderRadius: 6, background: 'rgba(255,255,255,.24)', overflow: 'hidden'}}>
          <div style={{height: '100%', width: `${progress}%`, background: colors.white}} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 15, marginTop: 22}}>
          <div style={{display: 'grid', placeItems: 'center', width: 48, height: 48, borderRadius: 15, color: '#061008', background: `linear-gradient(135deg, ${colors.green}, ${colors.greenDark})`, fontSize: 24, fontWeight: 950}}>G</div>
          <div>
            <div style={{fontSize: 24, fontWeight: 850}}>Gestor de Pátio e Catálogo</div>
            <div style={{color: colors.muted, fontSize: 16, marginTop: 2}}>{label}</div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export const RoleBadge: React.FC<{children: ReactNode}> = ({children}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 16px', border: '1px solid rgba(132,255,90,.35)', borderRadius: 99, color: colors.green, background: 'rgba(34,197,94,.09)', fontSize: 19, fontWeight: 850, letterSpacing: 1.6, textTransform: 'uppercase'}}>
    <span style={{width: 8, height: 8, borderRadius: '50%', background: colors.green, boxShadow: `0 0 14px ${colors.green}`}} />
    {children}
  </div>
);

export const Caption: React.FC<{role: string; title: ReactNode; body: string; start?: number}> = ({role, title, body, start = 0}) => {
  const frame = useCurrentFrame();
  const intro = rise(frame, start);
  return (
    <div style={{position: 'absolute', zIndex: 12, left: 66, right: 66, bottom: 116, opacity: intro, transform: `translateY(${interpolate(intro, [0, 1], [45, 0])}px)`}}>
      <RoleBadge>{role}</RoleBadge>
      <div style={{marginTop: 28, maxWidth: 920, fontSize: 66, fontWeight: 950, letterSpacing: -3.2, lineHeight: 1.02}}>{title}</div>
      <div style={{marginTop: 24, maxWidth: 860, color: colors.muted, fontSize: 27, fontWeight: 520, lineHeight: 1.35}}>{body}</div>
    </div>
  );
};

export const Accent: React.FC<{children: ReactNode}> = ({children}) => <span style={{color: colors.green}}>{children}</span>;

export const Phone: React.FC<{title: string; subtitle: string; children: ReactNode; start?: number; scrollFrom?: number; scrollAmount?: number}> = ({title, subtitle, children, start = 0, scrollFrom, scrollAmount = 0}) => {
  const frame = useCurrentFrame();
  const intro = rise(frame, start);
  const scroll = scrollFrom === undefined ? 0 : interpolate(frame, [scrollFrom, scrollFrom + 22], [0, scrollAmount], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', zIndex: 5, top: 180, left: 76, right: 76, height: 980, overflow: 'hidden', border: '2px solid rgba(255,255,255,.2)', borderRadius: 48, background: '#09120e', boxShadow: '0 38px 100px rgba(0,0,0,.55), 0 0 0 10px #121a22', opacity: intro, transform: `translateY(${interpolate(intro, [0, 1], [70, 0])}px) scale(${interpolate(intro, [0, 1], [.97, 1])})`}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, height: 108, padding: '0 28px', background: '#13251b', borderBottom: '1px solid rgba(255,255,255,.08)'}}>
        <div style={{fontSize: 34, color: colors.muted}}>‹</div>
        <div style={{display: 'grid', placeItems: 'center', width: 54, height: 54, borderRadius: '50%', color: '#061008', background: colors.green, fontSize: 25, fontWeight: 900}}>G</div>
        <div style={{flex: 1}}>
          <div style={{fontSize: 25, fontWeight: 800}}>{title}</div>
          <div style={{color: '#9fb3a5', fontSize: 17, marginTop: 2}}>{subtitle}</div>
        </div>
        <div style={{fontSize: 28, letterSpacing: 5}}>•••</div>
      </div>
      <div style={{height: 872, overflow: 'hidden', backgroundImage: 'radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px)', backgroundSize: '19px 19px'}}>
        <div style={{padding: '30px 27px', transform: `translateY(-${scroll}px)`}}>{children}</div>
      </div>
    </div>
  );
};

export const Bubble: React.FC<{children: ReactNode; side?: 'in' | 'out'; start: number; width?: number; time?: string; fontSize?: number}> = ({children, side = 'in', start, width = 690, time = '22:47', fontSize = 24}) => {
  const frame = useCurrentFrame();
  const intro = rise(frame, start);
  const isOut = side === 'out';
  return (
    <div style={{maxWidth: width, marginLeft: isOut ? 'auto' : 0, marginBottom: 18, padding: '17px 20px', borderRadius: 18, borderTopLeftRadius: isOut ? 18 : 4, borderTopRightRadius: isOut ? 4 : 18, color: colors.white, background: isOut ? colors.whatsapp : colors.panel2, fontSize, lineHeight: 1.36, boxShadow: '0 8px 26px rgba(0,0,0,.2)', opacity: intro, transform: `translateY(${interpolate(intro, [0, 1], [28, 0])}px)`}}>
      {children}
      <div style={{marginTop: 7, color: 'rgba(255,255,255,.58)', fontSize: 14, textAlign: 'right'}}>{time}</div>
    </div>
  );
};

export const VideoMessage: React.FC<{start: number; time?: string}> = ({start, time = '22:48'}) => {
  const frame = useCurrentFrame();
  const intro = rise(frame, start);
  const pulse = interpolate(Math.sin((frame - start) / 8), [-1, 1], [.96, 1.04]);
  return (
    <div style={{width: 805, marginBottom: 18, padding: 8, borderRadius: 18, borderTopLeftRadius: 4, background: colors.panel2, boxShadow: '0 8px 26px rgba(0,0,0,.2)', opacity: intro, transform: `translateY(${interpolate(intro, [0, 1], [28, 0])}px)`}}>
      <div style={{position: 'relative', height: 235, overflow: 'hidden', borderRadius: 13, background: 'linear-gradient(155deg, #d9e0e5 0%, #76828d 52%, #303942 100%)'}}>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 82, background: 'linear-gradient(#37424a, #161d22)'}} />
        <div style={{position: 'absolute', left: 118, top: 79, width: 560, height: 102, borderRadius: '55% 58% 25% 24%', background: 'linear-gradient(180deg, #f6f7f7, #a9b1b7)', boxShadow: '0 18px 28px rgba(0,0,0,.35)'}} />
        <div style={{position: 'absolute', left: 276, top: 43, width: 274, height: 78, borderRadius: '70% 62% 5px 5px', background: '#263640', border: '11px solid #c8ced2', borderBottom: 0, transform: 'skewX(-13deg)'}} />
        <div style={{position: 'absolute', left: 174, top: 151, width: 66, height: 66, borderRadius: '50%', background: '#172027', border: '13px solid #626d76'}} />
        <div style={{position: 'absolute', right: 164, top: 151, width: 66, height: 66, borderRadius: '50%', background: '#172027', border: '13px solid #626d76'}} />
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent)', transform: `translateX(${interpolate(frame % 90, [0, 89], [-800, 800])}px)`}} />
        <div style={{position: 'absolute', inset: 0, display: 'grid', placeItems: 'center'}}>
          <div style={{display: 'grid', placeItems: 'center', width: 76, height: 76, borderRadius: '50%', background: colors.green, boxShadow: '0 8px 28px rgba(0,0,0,.38)', transform: `scale(${pulse})`}}><span style={{display: 'block', width: 0, height: 0, marginLeft: 6, borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderLeft: '24px solid #061008'}} /></div>
        </div>
        <div style={{position: 'absolute', left: 14, bottom: 12, padding: '5px 9px', borderRadius: 7, color: colors.white, background: 'rgba(0,0,0,.68)', fontSize: 15, fontWeight: 800}}>0:24</div>
      </div>
      <div style={{padding: '5px 8px 1px', color: 'rgba(255,255,255,.58)', fontSize: 14, textAlign: 'right'}}>{time}</div>
    </div>
  );
};

export const VehicleCard: React.FC<{start: number; compact?: boolean}> = ({start, compact = false}) => {
  const frame = useCurrentFrame();
  const intro = rise(frame, start);
  return (
    <div style={{display: 'grid', gridTemplateColumns: compact ? '180px 1fr' : '245px 1fr', gap: 20, maxWidth: 750, marginBottom: 18, marginLeft: 'auto', padding: 16, border: '1px solid rgba(132,255,90,.27)', borderRadius: 20, background: '#101a16', opacity: intro, transform: `translateY(${interpolate(intro, [0, 1], [30, 0])}px)`}}>
      <div style={{position: 'relative', minHeight: compact ? 125 : 155, overflow: 'hidden', borderRadius: 14, background: 'linear-gradient(155deg,#d8dde1,#65717d)'}}>
        <div style={{position: 'absolute', left: '10%', right: '10%', top: '38%', height: '38%', borderRadius: '50% 48% 24% 22%', background: 'linear-gradient(180deg,#f4f6f7,#8c969f)', boxShadow: 'inset 0 -8px 12px rgba(0,0,0,.2)'}} />
        <div style={{position: 'absolute', left: '31%', top: '27%', width: '39%', height: '27%', borderRadius: '70% 60% 0 0', background: '#263640', border: '7px solid #b8c0c6', borderBottom: 0, transform: 'skewX(-16deg)'}} />
      </div>
      <div style={{alignSelf: 'center'}}>
        <div style={{fontSize: 26, fontWeight: 850}}>Onix LT 1.0 • 2021</div>
        <div style={{marginTop: 8, color: colors.muted, fontSize: 19}}>Prata • 54.200 km • Flex</div>
        <div style={{marginTop: 13, color: colors.green, fontSize: 29, fontWeight: 900}}>R$ 74.900</div>
        <div style={{display: 'inline-block', marginTop: 11, padding: '6px 10px', borderRadius: 7, color: '#061008', background: colors.green, fontSize: 14, fontWeight: 900}}>DISPONÍVEL NO PÁTIO</div>
      </div>
    </div>
  );
};

export const MetricGrid: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const metrics = [
    ['42', 'carros no pátio'],
    ['7', 'veículos de repasse'],
    ['3', 'sinais em aberto'],
    ['5', 'vendas no mês'],
  ];
  return (
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12}}>
      {metrics.map(([value, label], index) => {
        const intro = rise(frame, start + index * 5);
        return <div key={label} style={{padding: '20px 22px', border: '1px solid rgba(132,255,90,.18)', borderRadius: 16, background: colors.panel, opacity: intro, transform: `scale(${interpolate(intro, [0, 1], [.94, 1])})`}}><div style={{color: colors.green, fontSize: 42, fontWeight: 950}}>{value}</div><div style={{marginTop: 3, color: colors.muted, fontSize: 18}}>{label}</div></div>;
      })}
    </div>
  );
};

export const Pulse: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(Math.sin((frame - start) / 7), [-1, 1], [.94, 1.08], {easing: Easing.inOut(Easing.ease)});
  return <span style={{display: 'inline-block', width: 11, height: 11, marginRight: 9, borderRadius: '50%', background: colors.green, boxShadow: `0 0 18px ${colors.green}`, transform: `scale(${scale})`}} />;
};
