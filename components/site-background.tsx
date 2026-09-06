'use client';

import { WebGLShader } from '@/components/ui/web-gl-shader';

export function SiteBackground() {
  return (
    <div className="site-background" aria-hidden="true">
      <WebGLShader />
      <div className="site-background__veil" />
    </div>
  );
}
