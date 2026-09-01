import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Accent, Bubble, colors, fade} from './components';

export const MATERIAL_VIDEO_DURATION = 1172;

const PedidoNoGrupo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{padding: '54px 44px 64px', color: colors.white, fontFamily: 'Inter, Arial, sans-serif', background: `radial-gradient(circle at 50% 10%, rgba(132,255,90,.14), transparent 520px), ${colors.bg}`, opacity: fade(frame, 0, 10)}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <div style={{display: 'grid', width: 64, height: 64, placeItems: 'center', borderRadius: 18, color: '#061008', background: colors.green, fontSize: 31, fontWeight: 950}}>G</div>
        <div>
          <div style={{fontSize: 38, fontWeight: 900}}>Gestor de Pátio e Catálogo</div>
          <div style={{marginTop: 4, color: colors.muted, fontSize: 30}}>Criação de vídeo pelo WhatsApp</div>
        </div>
      </div>

      <div style={{marginTop: 48, overflow: 'hidden', border: '3px solid rgba(132,255,90,.28)', borderRadius: 38, background: '#09120e', boxShadow: '0 34px 90px rgba(0,0,0,.48)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, height: 132, padding: '0 30px', background: '#13251b', borderBottom: '1px solid rgba(255,255,255,.1)'}}>
          <div style={{color: colors.muted, fontSize: 39}}>‹</div>
          <div style={{display: 'grid', width: 64, height: 64, placeItems: 'center', borderRadius: '50%', color: '#061008', background: colors.green, fontSize: 30, fontWeight: 950}}>G</div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 42, fontWeight: 900}}>Grupo da Loja</div>
            <div style={{marginTop: 4, color: '#a9bcae', fontSize: 30}}>Equipe • operação interna</div>
          </div>
          <div style={{fontSize: 32, letterSpacing: 6}}>•••</div>
        </div>

        <div style={{height: 1135, padding: '38px 28px', backgroundImage: 'radial-gradient(rgba(255,255,255,.04) 1px, transparent 1px)', backgroundSize: '20px 20px'}}>
          <Bubble side="out" start={14} time="10:31" width={890} fontSize={39}>
            @Gestor de Pátio, crie o vídeo de anúncio da placa <b>AAA1A00</b>
          </Bubble>
          <Bubble start={52} time="10:31" width={900} fontSize={34}>
            🎬 Montando o vídeo de anúncio. Pode levar de 2 a 3 minutos. Te aviso quando estiver pronto.
          </Bubble>
          <Bubble start={116} time="10:34" width={900} fontSize={36}>
            ✅ Vídeo da placa AAA1A00 pronto para publicar.
          </Bubble>
        </div>
      </div>

      <div style={{marginTop: 46, textAlign: 'center'}}>
        <div style={{fontSize: 60, fontWeight: 950, letterSpacing: -2.4, lineHeight: 1.04}}>Pediu no grupo. <Accent>Recebeu pronto.</Accent></div>
        <div style={{marginTop: 18, color: colors.muted, fontSize: 35}}>O assistente usa as fotos e os dados já cadastrados.</div>
      </div>
    </AbsoluteFill>
  );
};

const ResultadoGerado: React.FC = () => (
  <AbsoluteFill style={{overflow: 'hidden', background: colors.bg}}>
    <OffthreadVideo
      src={staticFile('source/demo-anuncio-atual.mp4')}
      style={{width: '100%', height: '100%', objectFit: 'cover'}}
    />
  </AbsoluteFill>
);

const EncerramentoMaterial: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{display: 'grid', placeItems: 'center', color: colors.white, fontFamily: 'Inter, Arial, sans-serif', background: `radial-gradient(circle at center, rgba(132,255,90,.18), transparent 500px), ${colors.bg}`, opacity: fade(frame, 0, 12)}}>
      <div style={{width: 900, textAlign: 'center'}}>
        <div style={{color: colors.green, fontSize: 20, fontWeight: 950, letterSpacing: 3.2, textTransform: 'uppercase'}}>Gestor de Pátio e Catálogo</div>
        <div style={{marginTop: 28, fontSize: 76, fontWeight: 950, letterSpacing: -4.2, lineHeight: 1.01}}>Pediu no grupo.<br/><Accent>Recebeu pronto.</Accent></div>
        <div style={{margin: '30px auto 0', maxWidth: 760, color: colors.muted, fontSize: 29, lineHeight: 1.38}}>Transforme os carros do pátio em conteúdo para Reels, Stories e Status.</div>
        <div style={{display: 'inline-block', marginTop: 48, padding: '19px 30px', borderRadius: 15, color: '#061008', background: colors.green, fontSize: 23, fontWeight: 950}}>CONHEÇA EM UMA DEMONSTRAÇÃO</div>
      </div>
    </AbsoluteFill>
  );
};

export const MaterialVideo: React.FC = () => (
  <>
    <Sequence durationInFrames={180}><PedidoNoGrupo/></Sequence>
    <Sequence from={180} durationInFrames={872}><ResultadoGerado/></Sequence>
    <Sequence from={1052} durationInFrames={120}><EncerramentoMaterial/></Sequence>
  </>
);
