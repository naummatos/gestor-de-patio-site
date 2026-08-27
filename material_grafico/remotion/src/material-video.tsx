import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Accent, Bubble, Caption, Phone, RoleBadge, StoryShell, colors, fade, rise} from './components';

const PedidoNoGrupo: React.FC = () => (
  <>
    <Phone title="Grupo da Loja" subtitle="Equipe • operação interna" start={5}>
      <Bubble side="out" start={20} time="10:31" width={760}>
        @Gestor de Pátio Crie o vídeo de anúncio para a placa <b>AAA1A00</b>
      </Bubble>
      <Bubble start={70} time="10:31" width={805} fontSize={22}>
        🎬 Montando o vídeo de anúncio da placa AAA1A00. Levo cerca de 1 minuto e te aviso aqui.
      </Bubble>
      <Bubble start={150} time="10:32" width={805} fontSize={22}>
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

const MarcaGestor: React.FC<{compact?: boolean}> = ({compact = false}) => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: compact ? 12 : 18}}>
    <div style={{display: 'grid', placeItems: 'center', width: compact ? 48 : 66, height: compact ? 48 : 66, borderRadius: compact ? 14 : 19, color: '#061008', background: `linear-gradient(135deg, ${colors.green}, ${colors.greenDark})`, fontSize: compact ? 23 : 32, fontWeight: 950}}>G</div>
    <div style={{fontSize: compact ? 22 : 31, fontWeight: 900, lineHeight: 1.04}}>Gestor de Pátio<br/><span style={{color: colors.green}}>e Catálogo</span></div>
  </div>
);

const FotoFundo: React.FC<{src: string; duration: number}> = ({src, duration}) => {
  const frame = useCurrentFrame();
  return <Img src={staticFile(src)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${interpolate(frame, [0, duration], [1.02, 1.1])})`}} />;
};

const AberturaAnuncio: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{display: 'grid', placeItems: 'center', color: colors.white, background: `radial-gradient(circle at center, rgba(132,255,90,.2), transparent 360px), ${colors.bg}`, opacity: fade(frame, 0, 10)}}><div style={{textAlign: 'center'}}><MarcaGestor/><div style={{display: 'inline-block', marginTop: 34, padding: '12px 24px', borderRadius: 99, color: '#061008', background: colors.green, fontSize: 18, fontWeight: 950, letterSpacing: 3}}>VEÍCULO NO PÁTIO</div></div><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: colors.green}} /></AbsoluteFill>;
};

const VeiculoAnuncio: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{overflow: 'hidden', color: colors.white, opacity: fade(frame, 0, 9)}}><FotoFundo src="source/demo-sedan-rear.png" duration={180}/><div style={{position: 'absolute', inset: 0, background: 'linear-gradient(transparent 35%, rgba(8,13,18,.12) 48%, rgba(8,13,18,.98) 86%)'}}/><div style={{position: 'absolute', left: 54, right: 54, bottom: 68}}><div style={{display: 'flex', flexWrap: 'wrap', gap: 9}}><span style={{padding: '7px 12px', borderRadius: 8, color: '#061008', background: colors.green, fontSize: 15, fontWeight: 950}}>SEDAN</span><span style={{padding: '7px 12px', borderRadius: 8, color: '#061008', background: colors.green, fontSize: 15, fontWeight: 950}}>ABAIXO DA FIPE</span></div><div style={{marginTop: 17, fontSize: 49, fontWeight: 950, letterSpacing: -2.5, lineHeight: .94}}>Toyota COROLLA<br/>XEI 2.0 FLEX</div><div style={{marginTop: 15, color: colors.muted, fontSize: 22, fontWeight: 800}}><span style={{color: colors.green}}>2016/2017</span> · 105.000 km · Automático</div><div style={{marginTop: 14, fontSize: 58, fontWeight: 950, letterSpacing: -2}}>R$ 66.500</div></div><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: colors.green}} /></AbsoluteFill>;
};

const FichaAnuncio: React.FC = () => {
  const frame = useCurrentFrame();
  const dados = [['Quilometragem', '105.000 km'], ['Câmbio', 'Automático'], ['Combustível', 'Flex'], ['Cor', 'Vermelha'], ['Carroceria', 'Sedan'], ['Final da placa', '00']];
  return <AbsoluteFill style={{padding: '68px 50px', color: colors.white, background: colors.bg, opacity: fade(frame, 0, 9)}}><div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, height: 480}}><Img src={staticFile('source/demo-sedan-front.png')} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 22}}/><Img src={staticFile('source/demo-sedan-interior.png')} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 22}}/></div><div style={{display: 'grid', gap: 9, marginTop: 35}}>{dados.map(([label, value], index) => <div key={label} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 69, padding: '0 23px', borderLeft: `6px solid ${colors.green}`, borderRadius: 12, background: colors.panel, opacity: fade(frame, 18 + index * 6, 8)}}><span style={{color: colors.muted, fontSize: 20, fontWeight: 750}}>{label}</span><span style={{fontSize: 23, fontWeight: 900}}>{value}</span></div>)}</div><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: colors.green}} /></AbsoluteFill>;
};

const PrecoAnuncio: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{display: 'grid', placeItems: 'center', color: colors.white, background: `radial-gradient(circle at center, rgba(132,255,90,.15), transparent 360px), ${colors.bg}`, opacity: fade(frame, 0, 9)}}><div style={{textAlign: 'center'}}><div style={{color: colors.muted, fontSize: 24, fontWeight: 900, letterSpacing: 6}}>POR APENAS</div><div style={{marginTop: 15, color: colors.green, fontSize: 78, fontWeight: 950, letterSpacing: -4}}>R$ 66.500</div><div style={{display: 'inline-block', marginTop: 20, padding: '11px 21px', borderRadius: 99, color: '#061008', background: colors.green, fontSize: 19, fontWeight: 950}}>ABAIXO DA FIPE</div><div style={{marginTop: 25, color: colors.muted, fontSize: 19}}>Bancos em couro · Central multimídia<br/>Comandos no volante · Rodas de liga</div></div><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: colors.green}} /></AbsoluteFill>;
};

const ChamadaAnuncio: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{display: 'grid', placeItems: 'center', color: colors.white, background: `radial-gradient(circle at center, rgba(132,255,90,.18), transparent 340px), ${colors.bg}`, opacity: fade(frame, 0, 9)}}><div style={{width: 650, textAlign: 'center'}}><MarcaGestor compact/><div style={{marginTop: 36, fontSize: 41, fontWeight: 950, lineHeight: 1.03}}>Seu próximo carro<br/><span style={{color: colors.green}}>pode estar aqui.</span></div><div style={{display: 'inline-block', marginTop: 30, padding: '16px 25px', borderRadius: 13, color: '#061008', background: colors.green, fontSize: 25, fontWeight: 950}}>(81) 98951-8215</div><div style={{marginTop: 25, color: colors.muted, fontSize: 20}}>Fale com a loja pelo WhatsApp</div></div><div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 8, background: colors.green}} /></AbsoluteFill>;
};

const AnuncioDemonstracao: React.FC = () => (
  <AbsoluteFill style={{overflow: 'hidden', borderRadius: 27, fontFamily: 'Inter, Arial, sans-serif'}}>
    <Sequence durationInFrames={60}><AberturaAnuncio/></Sequence>
    <Sequence from={60} durationInFrames={180}><VeiculoAnuncio/></Sequence>
    <Sequence from={240} durationInFrames={150}><FichaAnuncio/></Sequence>
    <Sequence from={390} durationInFrames={90}><PrecoAnuncio/></Sequence>
    <Sequence from={480} durationInFrames={60}><ChamadaAnuncio/></Sequence>
  </AbsoluteFill>
);

const ResultadoGerado: React.FC = () => {
  const frame = useCurrentFrame();
  const intro = rise(frame, 12);
  return <>
    <div style={{position: 'absolute', zIndex: 4, top: 148, left: 151, width: 778, height: 1383, padding: 6, overflow: 'hidden', border: `2px solid ${colors.green}`, borderRadius: 34, background: '#03070a', boxShadow: '0 30px 90px rgba(0,0,0,.65), 0 0 44px rgba(132,255,90,.14)'}}>
      <AnuncioDemonstracao/>
      <div style={{position: 'absolute', top: 22, right: 22, padding: '9px 14px', borderRadius: 99, color: '#061008', background: colors.green, fontSize: 14, fontWeight: 950, letterSpacing: 1.2}}>VÍDEO GERADO</div>
    </div>
    <div style={{position: 'absolute', zIndex: 12, top: 1552, left: 66, right: 66, opacity: intro}}>
      <RoleBadge>Pronto para divulgar</RoleBadge>
      <div style={{marginTop: 17, fontSize: 51, fontWeight: 950, letterSpacing: -2.4, lineHeight: 1.01}}>Do pátio para as redes. <Accent>Sem editar na mão.</Accent></div>
      <div style={{marginTop: 15, color: colors.muted, fontSize: 23, lineHeight: 1.35}}>Fotos, dados do carro e identidade da loja reunidos em um vídeo vertical.</div>
    </div>
  </>
};

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

const JornadaMaterial: React.FC = () => (
  <StoryShell label="Demonstração • material gráfico em vídeo" duration={765}>
    <Sequence durationInFrames={225}><PedidoNoGrupo/></Sequence>
    <Sequence from={225} durationInFrames={540}><ResultadoGerado/></Sequence>
  </StoryShell>
);

export const MaterialVideo: React.FC = () => (
  <>
    <Sequence durationInFrames={765}><JornadaMaterial/></Sequence>
    <Sequence from={765} durationInFrames={135}><EncerramentoMaterial/></Sequence>
  </>
);
