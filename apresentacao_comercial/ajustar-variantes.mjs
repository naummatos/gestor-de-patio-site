import JSZip from 'jszip';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const input = join(currentDir, 'Gestor_de_Patio_e_Catalogo_Apresentacao_Comercial.pptx');
const cineOutput = join(currentDir, 'Gestor_de_Patio_e_Catalogo_Apresentacao_Cine_Repasse.pptx');
const vrOutput = join(currentDir, 'Gestor_de_Patio_e_Catalogo_Apresentacao_VR.pptx');
const kardianMaterial = '/tmp/kardian-vr-material.jpg';
const croppedCatalogPreview = '/tmp/preview-cliente-recorte.png';

const removerForma = (xml, marker) => {
  let result = xml;
  let markerIndex = result.indexOf(marker);
  while (markerIndex >= 0) {
    const start = result.lastIndexOf('<p:sp>', markerIndex);
    const endTag = '</p:sp>';
    const end = result.indexOf(endTag, markerIndex);
    if (start < 0 || end < 0) {
      throw new Error(`Não foi possível remover a forma ${marker}.`);
    }
    result = result.slice(0, start) + result.slice(end + endTag.length);
    markerIndex = result.indexOf(marker);
  }
  return result;
};

const linha = ({ id, name, x, y, cx, cy, arrow = false }) => `
<p:sp>
  <p:nvSpPr>
    <p:cNvPr id="${id}" name="${name}"/>
    <p:cNvSpPr/>
    <p:nvPr/>
  </p:nvSpPr>
  <p:spPr>
    <a:xfrm>
      <a:off x="${x}" y="${y}"/>
      <a:ext cx="${cx}" cy="${cy}"/>
    </a:xfrm>
    <a:prstGeom prst="line"><a:avLst/></a:prstGeom>
    <a:noFill/>
    <a:ln w="17780">
      <a:solidFill><a:srgbClr val="22C55E"><a:alpha val="70000"/></a:srgbClr></a:solidFill>
      <a:prstDash val="solid"/>
      <a:headEnd type="none"/>
      <a:tailEnd type="${arrow ? 'triangle' : 'none'}"/>
    </a:ln>
  </p:spPr>
</p:sp>`;

const atualizarTransformacao = (xml, marker, { x, y, cx, cy }) => {
  const markerIndex = xml.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Forma não encontrada: ${marker}`);
  const shapeStart = Math.max(
    xml.lastIndexOf('<p:sp>', markerIndex),
    xml.lastIndexOf('<p:pic>', markerIndex),
  );
  const shapeTag = xml.startsWith('<p:pic>', shapeStart) ? 'p:pic' : 'p:sp';
  const shapeEnd = xml.indexOf(`</${shapeTag}>`, markerIndex) + `</${shapeTag}>`.length;
  const updated = xml
    .slice(shapeStart, shapeEnd)
    .replace(/<a:off x="\d+" y="\d+"\/>/, `<a:off x="${x}" y="${y}"/>`)
    .replace(/<a:ext cx="\d+" cy="\d+"\/>/, `<a:ext cx="${cx}" cy="${cy}"/>`);
  return xml.slice(0, shapeStart) + updated + xml.slice(shapeEnd);
};

const corrigirConectores = async (zip) => {
  const path = 'ppt/slides/slide3.xml';
  let xml = await zip.file(path).async('string');

  // Remove as três setas diagonais do gerador original e também os
  // conectores novos, caso o ajuste seja executado novamente.
  for (const marker of [
    'name="Shape 16"',
    'name="Shape 22"',
    'name="Shape 28"',
    'name="Conector estoque"',
    'name="Conector horizontal"',
    'name="Conector Gestor de Pátio"',
    'name="Conector Catálogo Vivo"',
    'name="Conector Publicações"',
  ]) {
    xml = removerForma(xml, marker);
  }

  const connectors = [
    linha({ id: 34, name: 'Conector estoque', x: 6099048, y: 4087368, cx: 0, cy: 312632 }),
    linha({ id: 35, name: 'Conector horizontal', x: 2354580, y: 4400000, cx: 7479792, cy: 0 }),
    linha({ id: 36, name: 'Conector Gestor de Pátio', x: 2354580, y: 4400000, cx: 0, cy: 226864, arrow: true }),
    linha({ id: 37, name: 'Conector Catálogo Vivo', x: 6094476, y: 4400000, cx: 0, cy: 226864, arrow: true }),
    linha({ id: 38, name: 'Conector Publicações', x: 9834372, y: 4400000, cx: 0, cy: 226864, arrow: true }),
  ].join('');

  const firstCard = '<p:sp><p:nvSpPr><p:cNvPr id="14" name="Shape 11"/>';
  const insertionIndex = xml.indexOf(firstCard);
  if (insertionIndex < 0) {
    throw new Error('Não foi possível localizar o primeiro card do slide 3.');
  }
  xml = xml.slice(0, insertionIndex) + connectors + xml.slice(insertionIndex);
  zip.file(path, xml);
};

const ajustarCatalogoVivo = async (zip) => {
  const path = 'ppt/slides/slide5.xml';
  let xml = await zip.file(path).async('string');
  xml = atualizarTransformacao(xml, 'name="Shape 3"', {
    x: 502920,
    y: 658368,
    cx: 3611880,
    cy: 4280916,
  });
  xml = atualizarTransformacao(xml, 'name="Image 1"', {
    x: 576072,
    y: 777240,
    cx: 3465576,
    cy: 4043172,
  });
  xml = xml.replace(
    '“Me manda foto e vídeo do Creta vermelho.”',
    '“Tenho duas opções mais baratas. Quer comparar os preços?”',
  );
  zip.file(path, xml);
  zip.file('ppt/media/image4.png', await readFile(croppedCatalogPreview));
};

const salvar = async (zip, path) => {
  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });
  await writeFile(path, buffer);
};

const source = await readFile(input);
const cineZip = await JSZip.loadAsync(source);
await corrigirConectores(cineZip);
await ajustarCatalogoVivo(cineZip);
await salvar(cineZip, cineOutput);

const vrZip = await JSZip.loadAsync(await readFile(cineOutput));
vrZip.file('ppt/media/image6.jpg', await readFile(kardianMaterial));
await salvar(vrZip, vrOutput);

// O nome original continua sendo a apresentação da Cine Repasse, agora
// também com os conectores corrigidos. As alterações manuais são preservadas.
await writeFile(input, await readFile(cineOutput));

console.log(cineOutput);
console.log(vrOutput);
