import PptxGenJS from 'pptxgenjs';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const siteDir = dirname(currentDir);
const materialDir = join(siteDir, 'material_grafico');
const favicon = join(currentDir, 'logo-g.png');
const sedanFront = join(materialDir, 'remotion/public/source/demo-sedan-front.png');
const sedanRear = join(materialDir, 'remotion/public/source/demo-sedan-rear.png');
const sedanInterior = join(materialDir, 'remotion/public/source/demo-sedan-interior.png');
const previewSeller = join(materialDir, 'remotion/output/preview-vendedor.png');
const previewCustomer = join(materialDir, 'remotion/output/preview-cliente.png');
const staticAd = '/tmp/corolla-cine-bordas.jpg';
const output = join(currentDir, 'Gestor_de_Patio_e_Catalogo_Apresentacao_Comercial.pptx');

for (const path of [favicon, sedanFront, sedanRear, sedanInterior, previewSeller, previewCustomer]) {
  if (!existsSync(path)) throw new Error(`Ativo obrigatório não encontrado: ${path}`);
}

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Gestor de Pátio e Catálogo';
pptx.company = 'Gestor de Pátio e Catálogo';
pptx.subject = 'Apresentação comercial do Gestor de Pátio e Catálogo';
pptx.title = 'Gestor de Pátio e Catálogo — Automação que vende';
pptx.lang = 'pt-BR';
pptx.theme = {
  headFontFace: 'Inter',
  bodyFontFace: 'Inter',
  lang: 'pt-BR',
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: '0A0F14' },
  objects: [
    { rect: { x: 0, y: 7.43, w: 13.333, h: 0.07, fill: { color: '22C55E' }, line: { color: '22C55E' } } },
  ],
  slideNumber: { x: 12.42, y: 7.06, w: 0.45, h: 0.18, color: '64748B', fontFace: 'Inter', fontSize: 8, align: 'right', margin: 0 },
});

const C = {
  bg: '0A0F14',
  surface: '111827',
  surface2: '151F2E',
  green: '22C55E',
  greenDark: '16A34A',
  neon: '84FF5A',
  white: 'F8FAFC',
  muted: '9AA7B8',
  neutral: '364152',
  line: '263342',
  ink: '061008',
};

const S = pptx.ShapeType;
const noLine = { color: C.bg, transparency: 100 };

const addText = (slide, text, x, y, w, h, options = {}) => {
  slide.addText(text, {
    x, y, w, h,
    fontFace: 'Inter',
    fontSize: 18,
    color: C.white,
    margin: 0,
    breakLine: false,
    valign: 'mid',
    fit: 'shrink',
    ...options,
  });
};

const addBrand = (slide, { compact = false } = {}) => {
  const y = compact ? 0.28 : 0.38;
  slide.addImage({ path: favicon, x: 0.52, y, w: 0.43, h: 0.43 });
  addText(slide, 'GESTOR DE PÁTIO E CATÁLOGO', 1.05, y + 0.01, 3.35, 0.2, {
    fontSize: 9.5,
    bold: true,
    charSpacing: 0.7,
  });
  addText(slide, 'AUTOMAÇÃO QUE VENDE', 1.05, y + 0.23, 2.5, 0.12, {
    fontSize: 5.8,
    color: C.muted,
    charSpacing: 2.5,
  });
};

const addSectionLabel = (slide, label, x = 0.65, y = 1.08) => {
  slide.addShape(S.line, { x, y: y + 0.1, w: 0.24, h: 0, line: { color: C.neon, width: 1.8 } });
  addText(slide, label.toUpperCase(), x + 0.34, y, 3.8, 0.2, {
    fontSize: 8.5,
    color: C.neon,
    bold: true,
    charSpacing: 1.8,
  });
};

const addTitle = (slide, title, accent, subtitle, options = {}) => {
  const x = options.x ?? 0.65;
  const y = options.y ?? 1.38;
  const w = options.w ?? 7.7;
  const titleH = options.titleH ?? 1.35;
  const runs = accent
    ? [
        { text: title, options: { color: C.white, bold: true } },
        { text: accent, options: { color: C.neon, bold: true } },
      ]
    : [{ text: title, options: { color: C.white, bold: true } }];
  slide.addText(runs, {
    x, y, w, h: titleH,
    fontFace: 'Inter',
    fontSize: options.fontSize ?? 32,
    margin: 0,
    breakLine: false,
    valign: 'mid',
    fit: 'shrink',
    breakLine: false,
  });
  if (subtitle) {
    addText(slide, subtitle, x, y + titleH + 0.08, options.subtitleW ?? w, options.subtitleH ?? 0.65, {
      fontSize: options.subtitleSize ?? 14,
      color: C.muted,
      valign: 'top',
      breakLine: false,
      fit: 'shrink',
    });
  }
};

const addFooter = (slide, label = 'Gestor de Pátio e Catálogo') => {
  addText(slide, label, 0.55, 7.05, 4, 0.16, {
    fontSize: 7,
    color: '64748B',
    charSpacing: 0.4,
  });
};

const addGlow = (slide, x, y, w, h, transparency = 78) => {
  slide.addShape(S.ellipse, {
    x, y, w, h,
    fill: { color: C.green, transparency },
    line: { color: C.green, transparency: 100 },
  });
};

const addCard = (slide, x, y, w, h, options = {}) => {
  slide.addShape(S.roundRect, {
    x, y, w, h,
    rectRadius: 0.12,
    fill: { color: options.fill ?? C.surface, transparency: options.transparency ?? 4 },
    line: { color: options.line ?? C.line, transparency: options.lineTransparency ?? 0, width: options.lineWidth ?? 1 },
    shadow: options.shadow === false ? undefined : { type: 'outer', color: '000000', opacity: 0.22, blur: 1.4, angle: 45, distance: 1.2 },
  });
};

const addPill = (slide, text, x, y, w, options = {}) => {
  slide.addShape(S.roundRect, {
    x, y, w, h: options.h ?? 0.34,
    rectRadius: 0.12,
    fill: { color: options.fill ?? C.green, transparency: options.transparency ?? 82 },
    line: { color: options.line ?? C.green, transparency: options.lineTransparency ?? 30, width: 0.8 },
  });
  addText(slide, text.toUpperCase(), x, y + 0.01, w, (options.h ?? 0.34) - 0.02, {
    fontSize: options.fontSize ?? 7.5,
    color: options.color ?? C.neon,
    bold: true,
    charSpacing: options.charSpacing ?? 0.8,
    align: 'center',
  });
};

const addBullet = (slide, text, x, y, w, options = {}) => {
  slide.addShape(S.ellipse, {
    x, y: y + 0.11, w: 0.1, h: 0.1,
    fill: { color: options.dot ?? C.neon },
    line: noLine,
  });
  addText(slide, text, x + 0.22, y, w - 0.22, options.h ?? 0.42, {
    fontSize: options.fontSize ?? 12.5,
    color: options.color ?? C.white,
    valign: 'top',
  });
};

const contain = (imgW, imgH, x, y, w, h) => {
  const scale = Math.min(w / imgW, h / imgH);
  const rw = imgW * scale;
  const rh = imgH * scale;
  return { x: x + (w - rw) / 2, y: y + (h - rh) / 2, w: rw, h: rh };
};

const addImageFrame = (slide, path, imgW, imgH, x, y, w, h, options = {}) => {
  addCard(slide, x, y, w, h, {
    fill: options.fill ?? '080D12',
    line: options.line ?? C.line,
    lineWidth: options.lineWidth ?? 1,
  });
  const inset = options.inset ?? 0.08;
  slide.addImage({ path, ...contain(imgW, imgH, x + inset, y + inset, w - inset * 2, h - inset * 2) });
};

const addNumberCard = (slide, number, title, body, x, y, w, h) => {
  addCard(slide, x, y, w, h);
  addPill(slide, String(number).padStart(2, '0'), x + 0.28, y + 0.28, 0.58, { fontSize: 7.3 });
  addText(slide, title, x + 0.28, y + 0.86, w - 0.56, 0.55, { fontSize: 17, bold: true, valign: 'top' });
  addText(slide, body, x + 0.28, y + 1.52, w - 0.56, h - 1.76, { fontSize: 11.5, color: C.muted, valign: 'top' });
};

const addChatBubble = (slide, text, x, y, w, h, incoming = false) => {
  slide.addShape(S.roundRect, {
    x, y, w, h,
    rectRadius: 0.08,
    fill: { color: incoming ? '1A252D' : '0B5532' },
    line: { color: incoming ? '243342' : '137A49', transparency: 40 },
  });
  addText(slide, text, x + 0.16, y + 0.08, w - 0.32, h - 0.16, {
    fontSize: 9.5,
    color: C.white,
    valign: 'mid',
  });
};

// 01 — Capa
{
  const slide = pptx.addSlide('MASTER');
  addGlow(slide, -1.1, -1.2, 5.1, 5.1, 77);
  slide.addShape(S.rect, { x: 7.72, y: 0, w: 5.61, h: 7.43, fill: { color: '111820' }, line: noLine });
  slide.addImage({ path: sedanFront, x: 7.72, y: 0, w: 5.61, h: 7.43, sizing: 'cover' });
  slide.addShape(S.rect, { x: 7.72, y: 0, w: 5.61, h: 7.43, fill: { color: C.bg, transparency: 56 }, line: noLine });
  slide.addShape(S.rect, { x: 7.4, y: 0, w: 2.4, h: 7.43, fill: { color: C.bg, transparency: 18 }, line: noLine });
  addBrand(slide);
  addPill(slide, 'Apresentação comercial', 0.65, 1.52, 1.9);
  addText(slide, 'Seu estoque trabalha\nmesmo quando a loja\nnão está respondendo.', 0.65, 2.04, 7.55, 2.25, {
    fontSize: 34,
    bold: true,
    breakLine: true,
    valign: 'top',
    fit: 'shrink',
  });
  addText(slide, 'Gestão do pátio, catálogo vivo e publicação nos grupos de repasse — conectados ao mesmo estoque.', 0.65, 4.52, 6.5, 0.92, {
    fontSize: 15,
    color: C.muted,
    valign: 'top',
  });
  addText(slide, 'WhatsApp da equipe  •  site da loja  •  atendimento ao público', 0.65, 6.2, 6.3, 0.32, {
    fontSize: 9.5,
    color: C.neon,
    bold: true,
    charSpacing: 0.5,
  });
  addFooter(slide);
}

// 02 — Dor
{
  const slide = pptx.addSlide('MASTER');
  addBrand(slide, { compact: true });
  addSectionLabel(slide, 'O problema não é falta de canal');
  addTitle(
    slide,
    'A venda trava quando a informação ',
    'não acompanha o carro.',
    'O veículo entra no pátio, mas o cadastro, o atendimento e o anúncio continuam dependendo de tarefas separadas.',
    { w: 11.7, titleH: 0.9, subtitleW: 9.8 },
  );
  addNumberCard(slide, 1, 'Estoque espalhado', 'Preço, fotos, negociação e disponibilidade ficam em conversas, planilhas e sistemas diferentes.', 0.65, 3.2, 3.85, 2.65);
  addNumberCard(slide, 2, 'Atendimento lento', 'Quem pergunta à noite ou no fim de semana espera. Quando a resposta chega, o interesse pode ter esfriado.', 4.74, 3.2, 3.85, 2.65);
  addNumberCard(slide, 3, 'Anúncio manual', 'Cada carro exige texto, arte, vídeo e republicação. Repasse sem divulgação vira custo parado.', 8.83, 3.2, 3.85, 2.65);
  addText(slide, 'O mesmo carro precisa ser explicado várias vezes — e ainda pode aparecer com informação diferente em cada canal.', 0.65, 6.22, 11.7, 0.42, {
    fontSize: 13,
    bold: true,
    color: C.white,
    align: 'center',
  });
  addFooter(slide);
}

// 03 — Arquitetura comercial
{
  const slide = pptx.addSlide('MASTER');
  addGlow(slide, 4.7, 1.3, 4, 4, 88);
  addBrand(slide, { compact: true });
  addSectionLabel(slide, 'A proposta');
  addTitle(slide, 'Um estoque. ', 'Três frentes de IA.', 'Cada assistente tem uma função clara, mas todos trabalham com a mesma informação.', { w: 10.8, titleH: 0.72 });

  addCard(slide, 4.68, 3.05, 3.98, 1.42, { line: C.green, lineTransparency: 18, fill: '102019' });
  addPill(slide, 'Base única', 5.88, 3.28, 1.58, { color: C.ink, fill: C.neon, transparency: 0, line: C.neon, lineTransparency: 0 });
  addText(slide, 'ESTOQUE DO PÁTIO', 5.03, 3.78, 3.28, 0.38, { fontSize: 19, bold: true, align: 'center' });

  const fronts = [
    { x: 0.65, title: 'Gestor de Pátio', tag: 'GRUPO INTERNO', body: 'Cadastro, fotos, preço, FIPE, negociação, venda e relatórios.' },
    { x: 4.74, title: 'Catálogo Vivo', tag: 'ATENDIMENTO PÚBLICO', body: 'Site sincronizado e conversa inteligente no WhatsApp, 24 horas.' },
    { x: 8.83, title: 'Publicações', tag: 'GRUPOS DE REPASSE', body: 'Anúncios recorrentes e respostas aos interessados dentro dos grupos.' },
  ];
  fronts.forEach((front) => {
    addCard(slide, front.x, 5.06, 3.85, 1.38);
    addPill(slide, front.tag, front.x + 0.24, 5.28, 1.92, { fontSize: 6.5 });
    addText(slide, front.title, front.x + 0.24, 5.73, 3.25, 0.28, { fontSize: 15, bold: true });
    addText(slide, front.body, front.x + 0.24, 6.06, 3.33, 0.27, { fontSize: 8.7, color: C.muted, valign: 'top' });
    slide.addShape(S.line, {
      x: front.x + 1.92,
      y: 5.06,
      w: 6.6 - (front.x + 1.92),
      h: 4.47 - 5.06,
      line: { color: C.green, transparency: 34, width: 1.4, beginArrowType: 'none', endArrowType: 'triangle' },
    });
  });
  addFooter(slide);
}

// 04 — Gestor de Pátio
{
  const slide = pptx.addSlide('MASTER');
  addBrand(slide, { compact: true });
  addSectionLabel(slide, 'Dentro da operação');
  addTitle(slide, 'A equipe trabalha no ', 'grupo que já usa.', 'O WhatsApp vira a entrada para manter o estoque organizado sem depender de outro sistema ou planilhas.', { w: 7.05, titleH: 1.02, subtitleW: 6.4 });
  addImageFrame(slide, previewSeller, 1080, 1920, 9.22, 0.72, 3.3, 5.88, { line: C.green, lineWidth: 1.2 });

  const steps = [
    ['01', 'Cadastre pelo básico', 'Placa, preço, quilometragem, fotos e vídeo enviados no grupo.'],
    ['02', 'O cadastro é enriquecido', 'Dados do veículo, FIPE, características e informações do vídeo entram no estoque.'],
    ['03', 'Atualize pela conversa', 'Registre negociação, sinal, venda, correções e novas mídias pela placa.'],
    ['04', 'Pergunte ao pátio', 'Disponibilidade, veículos sem material, vendas do período e desempenho da equipe.'],
  ];
  steps.forEach(([n, title, body], index) => {
    const y = 3.38 + index * 0.79;
    addPill(slide, n, 0.67, y, 0.55, { fontSize: 7 });
    addText(slide, title, 1.42, y - 0.01, 2.2, 0.24, { fontSize: 12.5, bold: true });
    addText(slide, body, 3.65, y - 0.02, 4.85, 0.42, { fontSize: 10.2, color: C.muted, valign: 'top' });
  });
  addPill(slide, 'Sem trocar a rotina da equipe', 0.66, 6.64, 2.64, { color: C.ink, fill: C.neon, transparency: 0, line: C.neon, lineTransparency: 0 });
  addFooter(slide);
}

// 05 — Catálogo Vivo
{
  const slide = pptx.addSlide('MASTER');
  addGlow(slide, -1.1, 4.2, 4.2, 4.2, 88);
  addBrand(slide, { compact: true });
  addImageFrame(slide, previewCustomer, 1080, 1920, 0.72, 0.72, 3.34, 5.92, { line: C.green, lineWidth: 1.2 });
  addSectionLabel(slide, 'Atendimento público', 4.72, 1.08);
  addTitle(slide, 'O cliente pergunta ', 'do jeito dele.', 'O Catálogo Vivo entende modelo, ano, preço, cor, quilometragem e contexto da conversa para apresentar o estoque disponível.', { x: 4.72, y: 1.42, w: 7.55, titleH: 0.98, subtitleW: 7.2 });
  addCard(slide, 4.72, 3.28, 7.72, 2.5, { fill: '0F1A24' });
  addChatBubble(slide, '“Tem outro Hyundai mais barato?”', 5.02, 3.62, 3.22, 0.56, false);
  addChatBubble(slide, '“Me manda foto e vídeo do Creta vermelho.”', 8.63, 4.02, 3.42, 0.64, true);
  addChatBubble(slide, '“Ele tem GNV? Já foi vendido?”', 5.25, 4.54, 2.98, 0.58, false);
  addText(slide, 'Disponibilidade  •  fotos  •  vídeo  •  detalhes  •  formas de pagamento', 5.02, 5.36, 6.75, 0.22, {
    fontSize: 8.5,
    color: C.neon,
    bold: true,
    align: 'center',
  });
  addText(slide, 'A IA informa e orienta. Negociação, troca, reserva e fechamento continuam com o vendedor.', 4.72, 6.18, 7.72, 0.46, {
    fontSize: 11.2,
    color: C.white,
    bold: true,
    align: 'center',
  });
  addFooter(slide);
}

// 06 — Publicações em grupos
{
  const slide = pptx.addSlide('MASTER');
  addBrand(slide, { compact: true });
  addSectionLabel(slide, 'Repasse');
  addTitle(slide, 'O carro entra no pátio. ', 'Os grupos ficam sabendo.', 'O assistente publica as novidades e mantém o estoque circulando nos grupos de repasse em que estiver presente.', { w: 11.65, titleH: 0.88, subtitleW: 10.4 });

  addCard(slide, 0.72, 3.0, 4.15, 3.28, { fill: '0D171F', line: C.green, lineTransparency: 35 });
  addPill(slide, 'Publicação automática', 1.02, 3.26, 1.92);
  addText(slide, '🚘  NOVO NO PÁTIO', 1.02, 3.78, 2.5, 0.28, { fontSize: 12.5, bold: true });
  slide.addImage({ path: sedanRear, ...contain(1024, 1536, 1.02, 4.13, 1.24, 1.82) });
  addText(slide, 'Toyota Corolla\n2016/2017  •  Flex\n105.000 km\nR$ 66.500', 2.5, 4.14, 2.02, 1.42, { fontSize: 11.5, bold: true, valign: 'top', breakLine: true });
  addText(slide, 'Fotos, vídeo e contato da loja acompanham o anúncio.', 2.5, 5.52, 1.96, 0.44, { fontSize: 8.8, color: C.muted, valign: 'top' });

  const groups = [
    { y: 3.08, name: 'Grupo de repasse 01', detail: 'publicado' },
    { y: 4.25, name: 'Grupo de repasse 02', detail: 'publicado' },
    { y: 5.42, name: 'Grupo de repasse 03', detail: 'publicado' },
  ];
  groups.forEach((group, index) => {
    addCard(slide, 5.55, group.y, 2.58, 0.86, { fill: C.surface2, shadow: false });
    slide.addShape(S.ellipse, { x: 5.8, y: group.y + 0.2, w: 0.42, h: 0.42, fill: { color: index === 1 ? C.green : C.neon }, line: noLine });
    addText(slide, group.name, 6.4, group.y + 0.14, 1.42, 0.22, { fontSize: 9.2, bold: true });
    addText(slide, group.detail, 6.4, group.y + 0.42, 1.2, 0.16, { fontSize: 7.2, color: C.neon });
    slide.addShape(S.line, { x: 4.87, y: 4.64, w: 0.68, h: group.y + 0.43 - 4.64, line: { color: C.green, width: 1.5, endArrowType: 'triangle' } });
  });

  addCard(slide, 8.75, 3.0, 3.86, 3.28, { fill: '0D171F' });
  addPill(slide, 'Conversa no grupo', 9.03, 3.26, 1.72);
  addChatBubble(slide, '“Já vendeu?”', 9.02, 3.82, 1.34, 0.5, false);
  addChatBubble(slide, '“Esse Corolla ainda está disponível.”', 9.84, 4.46, 2.42, 0.62, true);
  addChatBubble(slide, '“Tem vídeo dele?”', 9.02, 5.28, 1.54, 0.5, false);
  addText(slide, 'Responde quando é mencionado ou quando alguém cita uma publicação anterior.', 9.03, 5.95, 3.2, 0.25, { fontSize: 8.5, color: C.muted, align: 'center' });
  addFooter(slide);
}

// 07 — Conteúdo
{
  const slide = pptx.addSlide('MASTER');
  addGlow(slide, 8.4, -1.8, 5.2, 5.2, 86);
  addBrand(slide, { compact: true });
  addSectionLabel(slide, 'Material de anúncio');
  addTitle(slide, 'O cadastro vira ', 'conteúdo pronto para divulgar.', 'A equipe pede pelo WhatsApp. O Gestor usa fotos, dados e identidade visual da loja para montar as peças.', { w: 7.2, titleH: 1.0, subtitleW: 6.6 });
  addBullet(slide, 'Arte estática com preço, FIPE, margem, GNV, leilão e formas de pagamento.', 0.72, 3.32, 6.2);
  addBullet(slide, 'Vídeo vertical com fotos, características, estado do veículo e condições de compra.', 0.72, 4.05, 6.2);
  addBullet(slide, 'Identidade de cada cliente e ocultação automática de placa nos planos elegíveis.', 0.72, 4.78, 6.2);
  addPill(slide, 'Sem esperar o designer para cada carro', 0.72, 5.72, 3.5, { color: C.ink, fill: C.neon, transparency: 0, line: C.neon, lineTransparency: 0 });

  if (existsSync(staticAd)) {
    addImageFrame(slide, staticAd, 1170, 1540, 8.36, 0.72, 3.6, 5.8, { line: 'F2B705', lineWidth: 1.3 });
  } else {
    addImageFrame(slide, sedanFront, 1024, 1536, 8.36, 0.72, 3.6, 5.8, { line: C.green, lineWidth: 1.3 });
  }
  addCard(slide, 10.93, 4.4, 1.72, 2.1, { fill: '080D12', line: C.green, lineWidth: 1.2 });
  slide.addImage({ path: sedanInterior, ...contain(1024, 1536, 11.06, 4.55, 1.46, 1.68) });
  addPill(slide, 'VÍDEO 9:16', 11.15, 6.08, 1.2, { fontSize: 6.2 });
  addFooter(slide);
}

// 08 — Ciclo completo
{
  const slide = pptx.addSlide('MASTER');
  addBrand(slide, { compact: true });
  addSectionLabel(slide, 'O ciclo do veículo');
  addTitle(slide, 'Da entrada à venda, ', 'a informação acompanha o carro.', 'Uma atualização no estoque alimenta as experiências internas e públicas.', { w: 10.9, titleH: 0.8 });

  const stages = [
    { n: '01', title: 'ENTRA', body: 'Placa, preço, KM e fotos' },
    { n: '02', title: 'ORGANIZA', body: 'FIPE, detalhes e mídias' },
    { n: '03', title: 'DIVULGA', body: 'Site, WhatsApp e repasse' },
    { n: '04', title: 'NEGOCIA', body: 'Sinal, troca e andamento' },
    { n: '05', title: 'VENDE', body: 'Baixa em todos os canais' },
  ];
  stages.forEach((stage, index) => {
    const x = 0.68 + index * 2.52;
    slide.addShape(S.ellipse, { x: x + 0.68, y: 3.07, w: 0.7, h: 0.7, fill: { color: index === 4 ? C.neon : C.surface2 }, line: { color: C.green, width: 1.4 } });
    addText(slide, stage.n, x + 0.68, 3.07, 0.7, 0.7, { fontSize: 10, color: index === 4 ? C.ink : C.neon, bold: true, align: 'center' });
    addText(slide, stage.title, x, 4.08, 2.06, 0.25, { fontSize: 11, bold: true, align: 'center' });
    addText(slide, stage.body, x + 0.08, 4.47, 1.9, 0.52, { fontSize: 9.4, color: C.muted, align: 'center', valign: 'top' });
    if (index < stages.length - 1) {
      slide.addShape(S.line, { x: x + 1.42, y: 3.42, w: 1.84, h: 0, line: { color: C.green, transparency: 35, width: 1.4, endArrowType: 'triangle' } });
    }
  });
  addCard(slide, 1.25, 5.55, 10.84, 0.84, { fill: '102019', line: C.green, lineTransparency: 35, shadow: false });
  addText(slide, 'A informação muda uma vez e se atualiza no site, no atendimento público e nas publicações.', 1.5, 5.78, 10.34, 0.34, { fontSize: 14, bold: true, color: C.white, align: 'center' });
  addFooter(slide);
}

// 09 — Antes e depois
{
  const slide = pptx.addSlide('MASTER');
  addBrand(slide, { compact: true });
  addSectionLabel(slide, 'Mudança na rotina');
  addTitle(slide, 'Menos tarefas repetidas. ', 'Mais tempo para negociar.', 'O produto não muda o jeito de vender carros. Ele reduz o trabalho que atrasa a venda.', { w: 11.4, titleH: 0.82, subtitleW: 10.2 });

  addCard(slide, 0.72, 3.05, 5.78, 3.25, { fill: '10171F', line: C.neutral, shadow: false });
  addPill(slide, 'Hoje', 1.02, 3.34, 0.82, { fill: C.neutral, transparency: 58, line: C.neutral, color: C.white });
  addBullet(slide, 'Consultar várias conversas para saber se o carro ainda está no pátio.', 1.02, 3.98, 4.96, { dot: C.neutral, color: C.muted, fontSize: 11.2 });
  addBullet(slide, 'Responder as mesmas perguntas e procurar fotos manualmente.', 1.02, 4.72, 4.96, { dot: C.neutral, color: C.muted, fontSize: 11.2 });
  addBullet(slide, 'Refazer anúncio quando preço ou condição muda.', 1.02, 5.46, 4.96, { dot: C.neutral, color: C.muted, fontSize: 11.2 });

  addCard(slide, 6.83, 3.05, 5.78, 3.25, { fill: '102019', line: C.green, lineTransparency: 20, shadow: false });
  addPill(slide, 'Com o Gestor', 7.13, 3.34, 1.55, { color: C.ink, fill: C.neon, transparency: 0, line: C.neon, lineTransparency: 0 });
  addBullet(slide, 'Estoque consultável pela equipe e pelo cliente em tempo real.', 7.13, 3.98, 4.96, { fontSize: 11.2 });
  addBullet(slide, 'Fotos, vídeo e detalhes disponíveis no atendimento 24 horas.', 7.13, 4.72, 4.96, { fontSize: 11.2 });
  addBullet(slide, 'Conteúdo e canais atualizados a partir do mesmo cadastro.', 7.13, 5.46, 4.96, { fontSize: 11.2 });
  addFooter(slide);
}

// 10 — Limites e confiança
{
  const slide = pptx.addSlide('MASTER');
  addGlow(slide, 4.4, 2.1, 4.5, 4.5, 90);
  addBrand(slide, { compact: true });
  addSectionLabel(slide, 'Responsabilidade clara');
  addTitle(slide, 'A IA cuida do repetitivo. ', 'O vendedor cuida do negócio.', 'O assistente apresenta o estoque e prepara o atendimento; decisões comerciais continuam com a loja.', { w: 11.6, titleH: 0.88, subtitleW: 10.7 });

  addCard(slide, 0.72, 3.18, 5.74, 3.02, { fill: '102019', line: C.green, lineTransparency: 30 });
  addPill(slide, 'O assistente resolve', 1.03, 3.48, 1.9);
  addBullet(slide, 'Disponibilidade, preço anunciado e dados do cadastro.', 1.04, 4.08, 4.86, { fontSize: 11.2 });
  addBullet(slide, 'Envio de fotos, vídeo e características do veículo.', 1.04, 4.76, 4.86, { fontSize: 11.2 });
  addBullet(slide, 'Cadastro, atualização, mídia e consultas operacionais.', 1.04, 5.44, 4.86, { fontSize: 11.2 });

  addCard(slide, 6.86, 3.18, 5.74, 3.02, { fill: '101820', line: C.neutral, shadow: false });
  addPill(slide, 'A equipe confirma', 7.17, 3.48, 1.72, { fill: C.neutral, transparency: 60, line: C.neutral, color: C.white });
  addBullet(slide, 'Negociação de preço, avaliação de troca e financiamento.', 7.18, 4.08, 4.86, { dot: C.neutral, fontSize: 11.2 });
  addBullet(slide, 'Reserva mediante sinal e condições finais da compra.', 7.18, 4.76, 4.86, { dot: C.neutral, fontSize: 11.2 });
  addBullet(slide, 'Inspeção presencial e confirmação do estado do veículo.', 7.18, 5.44, 4.86, { dot: C.neutral, fontSize: 11.2 });
  addFooter(slide);
}

// 11 — Planos
{
  const slide = pptx.addSlide('MASTER');
  addBrand(slide, { compact: true });
  addSectionLabel(slide, 'Planos');
  addTitle(slide, 'Comece no tamanho da ', 'sua operação.', 'Cada plano acrescenta uma camada de automação ao anterior.', { w: 9.2, titleH: 0.78, subtitleW: 8.7 });

  const plans = [
    { x: 0.48, name: 'GARAGEM', price: 'R$ 397', setup: 'Implantação R$ 697', plus: ['IA interna', 'IA para o público'], featured: false },
    { x: 3.06, name: 'PÁTIO', price: 'R$ 597', setup: 'Implantação R$ 997', plus: ['Tudo do Garagem', '+ site sincronizado'], featured: false },
    { x: 5.64, name: 'REVENDA', price: 'R$ 897', setup: 'Implantação R$ 1.497', plus: ['Tudo do Pátio', '+ anúncios nos grupos', '+ artes e vídeos'], featured: true },
    { x: 8.22, name: 'FROTA', price: 'R$ 997', setup: 'Implantação R$ 1.997', plus: ['Tudo do Revenda', '+ ocultação de placa'], featured: false },
    { x: 10.8, name: 'REDE', price: 'PROPOSTA', setup: 'Múltiplos pátios', plus: ['Tudo do Frota', '+ integração OLX'], featured: false },
  ];
  plans.forEach((plan) => {
    addCard(slide, plan.x, 3.0, 2.14, 3.22, {
      fill: plan.featured ? '102019' : C.surface,
      line: plan.featured ? C.neon : C.line,
      lineWidth: plan.featured ? 1.6 : 1,
      lineTransparency: plan.featured ? 8 : 0,
    });
    if (plan.featured) addPill(slide, 'Mais escolhido', plan.x + 0.38, 3.18, 1.38, { color: C.ink, fill: C.neon, transparency: 0, line: C.neon, lineTransparency: 0, fontSize: 6.4 });
    addText(slide, `PLANO ${plan.name}`, plan.x + 0.22, plan.featured ? 3.7 : 3.34, 1.7, 0.23, { fontSize: 8.6, color: plan.featured ? C.neon : C.muted, bold: true, charSpacing: 0.6, align: 'center' });
    addText(slide, plan.price, plan.x + 0.15, 4.08, 1.84, 0.42, { fontSize: plan.price === 'PROPOSTA' ? 16 : 20, bold: true, align: 'center' });
    addText(slide, plan.price === 'PROPOSTA' ? 'sob medida' : '/mês', plan.x + 0.25, 4.53, 1.64, 0.18, { fontSize: 7.4, color: C.muted, align: 'center' });
    addText(slide, plan.setup, plan.x + 0.18, 4.89, 1.78, 0.2, { fontSize: 7.7, color: C.muted, align: 'center' });
    plan.plus.forEach((item, index) => {
      addText(slide, item, plan.x + 0.2, 5.24 + index * 0.31, 1.74, 0.22, {
        fontSize: 7.7,
        color: item.startsWith('+') ? C.neon : C.white,
        bold: item.startsWith('+'),
        align: 'center',
      });
    });
  });
  addText(slide, 'Todos os planos incluem suporte 24h. Recursos e implantação são configurados para a operação de cada loja.', 0.72, 6.58, 11.9, 0.25, { fontSize: 8.8, color: C.muted, align: 'center' });
  addFooter(slide);
}

// 12 — CTA
{
  const slide = pptx.addSlide('MASTER');
  addGlow(slide, -1.2, -1.5, 5.5, 5.5, 74);
  addGlow(slide, 10.1, 4.5, 4.4, 4.4, 84);
  addBrand(slide);
  addPill(slide, 'Próximo passo', 5.48, 1.38, 2.36, { color: C.ink, fill: C.neon, transparency: 0, line: C.neon, lineTransparency: 0 });
  addText(slide, 'Veja o produto funcionando\ncom o estoque de uma loja.', 1.22, 2.16, 10.9, 1.34, {
    fontSize: 34,
    bold: true,
    align: 'center',
    breakLine: true,
  });
  addText(slide, 'Na demonstração, mostramos o cadastro no grupo, o catálogo vivo, as publicações de repasse e a criação de materiais.', 2.16, 3.78, 9.02, 0.72, {
    fontSize: 14,
    color: C.muted,
    align: 'center',
  });
  addCard(slide, 4.08, 5.02, 5.18, 0.88, { fill: '102019', line: C.green, lineTransparency: 25, shadow: false });
  addText(slide, 'WhatsApp  •  (81) 98951-8215', 4.35, 5.25, 4.64, 0.3, { fontSize: 15, bold: true, color: C.white, align: 'center' });
  addText(slide, 'gestordepatio.com.br', 4.08, 6.24, 5.18, 0.28, { fontSize: 11, color: C.neon, bold: true, align: 'center' });
  addFooter(slide);
}

await pptx.writeFile({ fileName: output });
console.log(output);
