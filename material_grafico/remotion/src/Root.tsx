import React from 'react';
import {Composition} from 'remotion';
import {Cliente, Gerente, SerieCompleta, Vendedor} from './compositions';
import {MATERIAL_VIDEO_DURATION, MaterialVideo} from './material-video';

const fps = 30;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Vendedor" component={Vendedor} durationInFrames={900} fps={fps} width={1080} height={1920} />
    <Composition id="Gerente" component={Gerente} durationInFrames={360} fps={fps} width={1080} height={1920} />
    <Composition id="Cliente" component={Cliente} durationInFrames={540} fps={fps} width={1080} height={1920} />
    <Composition id="SerieCompleta" component={SerieCompleta} durationInFrames={1800} fps={fps} width={1080} height={1920} />
    <Composition id="MaterialVideo" component={MaterialVideo} durationInFrames={MATERIAL_VIDEO_DURATION} fps={fps} width={1080} height={1920} />
  </>
);
