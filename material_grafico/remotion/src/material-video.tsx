import React from 'react';
import {AbsoluteFill, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Accent, Bubble, Caption, Phone, StoryShell, colors, fade} from './components';

export const MATERIAL_VIDEO_DURATION = 1172;

const PedidoNoGrupo: React.FC = () => (
  <>
    <Phone title="Grupo da Loja" subtitle="Equipe • operação interna" start={5}>
      <Bubble side="out" start={15} time="10:31" width={760}>
        @Gestor de Pátio Crie o vídeo de anúncio para a placa <b>AAA1A00</b>
      </Bubble>
      <Bubble start={55} time="10:31" width={805} fontSize={22}>
        🎬 Montando o vídeo de anúncio da placa AAA1A00. Pode levar de 2 a 3 minutos. Te aviso aqui quando estiver pronto.
      </Bubble>
      <Bubble start={125} time="10:34" width={805} fontSize={22}>
        🎬 Vídeo de anúncio da placa AAA1A00 pronto.
      </Bubble>
    </Phone>
    <div style={{position: 'absolute', zIndex: 8, top: 1125, left: 0, right: 0, height: 380, background: 'linear-gradient(transparent, rgba(8,13,18,.96) 45%, #080d12)'}} />
    <Caption
      role="No grupo da loja"
      start={12}
      title={<>Pediu pelo WhatsApp.<br/><Accent>Recebe pronto no grupo.</Accent></>}
      body="O assistente usa as fotos e os dados que já estão cadastrados para o veículo."
    />
  </>
);

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
    <Sequence durationInFrames={180}>
      <StoryShell label="Demonstração • material gráfico em vídeo" duration={180}>
        <PedidoNoGrupo/>
      </StoryShell>
    </Sequence>
    <Sequence from={180} durationInFrames={872}><ResultadoGerado/></Sequence>
    <Sequence from={1052} durationInFrames={120}><EncerramentoMaterial/></Sequence>
  </>
);
