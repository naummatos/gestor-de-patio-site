import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Accent, Bubble, Caption, Phone, StoryShell, VideoMessage, colors, fade, rise} from './components';

const CadastroInterno: React.FC = () => {
  return (
    <>
      <Phone title="Grupo da Loja" subtitle="Equipe • operação interna" start={5}>
        <Bubble side="out" start={22} time="19:42" width={760}>@Gestor de Pátio Cadastre a placa <b>AAA1A00</b> preço 66 mil 105 mil km</Bubble>
        <Bubble start={70} time="19:43" width={805} fontSize={18}>
          <b>✅ Veículo cadastrado</b><br/><br/>
          <b>Placa:</b> AAA1A00<br/>
          <b>Marca/Modelo:</b> Toyota COROLLA XEI20FLEX<br/>
          <b>Ano:</b> 2016/2017<br/>
          <b>Cor:</b> Vermelha<br/><br/>
          <b>Combustível:</b> ALCOOL/GASOLINA<br/>
          <b>Lotação:</b> 5 lugares<br/>
          <b>Final do chassi:</b> 25949<br/>
          <b>Procedência:</b> NACIONAL<br/>
          <b>Emplacamento:</b> Recife/PE<br/><br/>
          <b>KM:</b> 105.000 km<br/>
          <b>Preço anunciado:</b> R$ 66.500,00<br/>
          <b>FIPE:</b> R$ 87.562,00<br/>
          Corolla XEi 2.0 Flex 16V Aut. — agosto de 2026
        </Bubble>
      </Phone>
      <div style={{position: 'absolute', zIndex: 8, top: 1125, left: 0, right: 0, height: 380, background: 'linear-gradient(transparent, rgba(8,13,18,.96) 45%, #080d12)'}} />
      <Caption role="Vendedor" start={12} title={<>Mandou placa, preço e KM.<br/><Accent>O assistente completa.</Accent></>} body="Consulta os dados, registra a FIPE e coloca o veículo no controle do pátio." />
    </>
  );
};

const CadastroConectado: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = [
    ['ESTOQUE', 'Controle do pátio'],
    ['SITE', 'Catálogo atualizado'],
    ['IA', 'Atendimento ao público'],
  ];
  return (
    <AbsoluteFill style={{padding: '255px 66px 120px'}}>
      <div style={{fontSize: 26, color: colors.muted, fontWeight: 750}}>O cadastro não para na confirmação.</div>
      <div style={{marginTop: 18, maxWidth: 900, fontSize: 72, fontWeight: 950, letterSpacing: -4, lineHeight: 1.02}}>Um carro cadastrado.<br/><Accent>Três pontos atualizados.</Accent></div>
      <div style={{display: 'grid', gap: 18, marginTop: 80}}>
        {nodes.map(([tag, label], index) => {
          const intro = rise(frame, 45 + index * 28);
          return <div key={tag} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '25px 28px', border: '1px solid rgba(132,255,90,.25)', borderRadius: 22, background: 'rgba(17,25,34,.94)', opacity: intro, transform: `translateX(${interpolate(intro, [0, 1], [80, 0])}px)`}}><div style={{display: 'grid', placeItems: 'center', width: 108, height: 62, borderRadius: 14, color: '#061008', background: colors.green, fontSize: 16, fontWeight: 950}}>{tag}</div><div style={{fontSize: 29, fontWeight: 850}}>{label}</div><div style={{marginLeft: 'auto', color: colors.green, fontSize: 15, fontWeight: 900, letterSpacing: 1}}>ATUALIZADO</div></div>;
        })}
      </div>
      <div style={{marginTop: 58, color: colors.muted, fontSize: 27, lineHeight: 1.4}}>A informação muda uma vez e se atualiza no site e assistente IA de atendimento ao público.</div>
    </AbsoluteFill>
  );
};

const CorollaNoCatalogo: React.FC = () => (
  <>
    <Phone title="Atendimento da Loja" subtitle="online • responde 24 horas" start={4}>
      <Bubble side="out" start={20} time="20:16" width={760}>Tem Corolla 2017?</Bubble>
      <Bubble start={62} time="20:16" width={805} fontSize={21}>
        Encontrei um <b>Toyota Corolla XEi 2.0 2016/2017</b> disponível.<br/><br/>
        Vermelho, 105.000 km<br/>
        <b>R$ 66.500</b><br/><br/>
        Quer saber mais sobre ele?
      </Bubble>
    </Phone>
    <div style={{position: 'absolute', zIndex: 8, top: 1125, left: 0, right: 0, height: 380, background: 'linear-gradient(transparent, rgba(8,13,18,.96) 45%, #080d12)'}} />
    <Caption role="Resultado" start={28} title={<>O carro já pode ser<br/><Accent>encontrado pelo cliente.</Accent></>} body="A equipe controla o estoque e o atendimento consulta as mesmas informações." />
  </>
);

const VendedorScene: React.FC = () => (
  <StoryShell label="Demonstração • do cadastro ao atendimento" duration={780}>
    <Sequence durationInFrames={330}><CadastroInterno/></Sequence>
    <Sequence from={330} durationInFrames={180}><CadastroConectado/></Sequence>
    <Sequence from={510} durationInFrames={270}><CorollaNoCatalogo/></Sequence>
  </StoryShell>
);

const GerenteScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <StoryShell label="Demonstração • gerente" duration={360}>
      <Phone title="Grupo da Loja" subtitle="Equipe • operação interna" start={5}>
        <Bubble side="out" start={22} time="11:05" width={760}>@Gestor de Pátio Quem mais vendeu este mês?</Bubble>
        <Bubble start={82} time="11:05" width={790}>Quem mais vendeu em agosto de 2026 foi <b>Carlos</b>, com <b>5 vendas</b>.</Bubble>
        <Bubble side="out" start={145} time="11:06" width={760}>Me mostre o resumo por vendedor.</Bubble>
        <Bubble start={195} time="11:06" width={805} fontSize={21}>
          <b>Resumo de vendas por vendedor em agosto de 2026:</b><br/><br/>
          • Carlos — 5 vendas — R$ 371.500,00<br/>
          • Marina — 4 vendas — R$ 288.000,00<br/><br/>
          <b>Total: 9 vendas — R$ 659.500,00.</b>
        </Bubble>
      </Phone>
      <div style={{position: 'absolute', zIndex: 8, top: 1125, left: 0, right: 0, height: 380, background: 'linear-gradient(transparent, rgba(8,13,18,.96) 45%, #080d12)'}} />
      <Caption role="Gerente" start={frame < 175 ? 12 : 175} title={frame < 175 ? <>Perguntou no grupo.<br/><Accent>O assistente responde.</Accent></> : <>Vendas por vendedor.<br/><Accent>Em texto, sem planilha.</Accent></>} body={frame < 175 ? 'O gerente consulta a operação em linguagem simples, direto pelo WhatsApp.' : 'Ranking, quantidade e valor vendido em uma resposta fácil de conferir.'} />
    </StoryShell>
  );
};

const ClienteScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <StoryShell label="Demonstração • Catálogo Vivo" duration={480}>
      <Phone title="Atendimento da Loja" subtitle="online • responde 24 horas" start={5} scrollFrom={292} scrollAmount={245}>
        <Bubble side="out" start={22} time="22:47" width={760}>Boa noite! Tem Nivus Highline 2021?</Bubble>
        <Bubble start={72} time="22:47" width={805} fontSize={21}>
          Encontrei dois <b>Nivus Highline 2021</b> disponíveis:<br/><br/>
          <b>1.</b> Branco, 48.000 km, R$ 104.900, vídeo disponível<br/><br/>
          <b>2.</b> Cinza, 61.000 km, R$ 99.900<br/><br/>
          Qual deles chamou mais sua atenção?
        </Bubble>
        <Bubble side="out" start={165} time="22:48" width={760}>O branco. Tem vídeo?</Bubble>
        <Bubble start={220} time="22:48" width={805}>Tem sim. Vou enviar o vídeo do Nivus branco para você conhecer melhor o veículo.</Bubble>
        <VideoMessage start={305} time="22:48" />
      </Phone>
      <div style={{position: 'absolute', zIndex: 8, top: 1125, left: 0, right: 0, height: 380, background: 'linear-gradient(transparent, rgba(8,13,18,.96) 45%, #080d12)'}} />
      <Caption role="Cliente" start={frame < 270 ? 12 : 270} title={frame < 270 ? <>O cliente pergunta.<br/><Accent>O assistente conversa.</Accent></> : <>Pediu o vídeo?<br/><Accent>O assistente envia.</Accent></>} body={frame < 270 ? 'A resposta parece uma conversa normal, mas consulta o estoque disponível da loja.' : 'Fotos e vídeos cadastrados ficam disponíveis durante o atendimento, sem depender de um vendedor online.'} />
    </StoryShell>
  );
};

const EndCard: React.FC<{role: string}> = ({role}) => {
  const frame = useCurrentFrame();
  const opacity = fade(frame, 0, 10);
  return <AbsoluteFill style={{display: 'grid', placeItems: 'center', color: colors.white, background: `radial-gradient(circle at center, rgba(132,255,90,.17), transparent 480px), ${colors.bg}`, opacity}}><div style={{width: 880, textAlign: 'center'}}><div style={{color: colors.green, fontSize: 21, fontWeight: 900, letterSpacing: 3.4, textTransform: 'uppercase'}}>{role}</div><div style={{marginTop: 28, fontSize: 74, fontWeight: 950, letterSpacing: -4, lineHeight: 1.02}}>Gestor de Pátio<br/><Accent>e Catálogo</Accent></div><div style={{marginTop: 30, color: colors.muted, fontSize: 29}}>Veja funcionando em uma demonstração.</div><div style={{display: 'inline-block', marginTop: 48, padding: '19px 30px', borderRadius: 15, color: '#061008', background: colors.green, fontSize: 24, fontWeight: 900}}>FALE PELO WHATSAPP</div></div></AbsoluteFill>;
};

export const Vendedor: React.FC = () => <><Sequence durationInFrames={780}><VendedorScene/></Sequence><Sequence from={780} durationInFrames={120}><EndCard role="Para vendedores"/></Sequence></>;
export const Gerente: React.FC = () => <><Sequence durationInFrames={315}><GerenteScene/></Sequence><Sequence from={315} durationInFrames={45}><EndCard role="Para gerentes"/></Sequence></>;
export const Cliente: React.FC = () => <><Sequence durationInFrames={480}><ClienteScene/></Sequence><Sequence from={480} durationInFrames={60}><EndCard role="Para atender seus clientes"/></Sequence></>;

export const SerieCompleta: React.FC = () => (
  <AbsoluteFill style={{background: colors.bg}}>
    <Sequence durationInFrames={900}><Vendedor/></Sequence>
    <Sequence from={900} durationInFrames={360}><Gerente/></Sequence>
    <Sequence from={1260} durationInFrames={540}><Cliente/></Sequence>
  </AbsoluteFill>
);
